import crypto from "crypto";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express, { Request, Response } from "express";
import multer from "multer";
import { PoolClient } from "pg";
import sharp from "sharp";

import pool from "../config/database.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

type ImageRequest = Request & {
  file?: Express.Multer.File;
  body: {
    caption: string;
  };
};

if (!accessKeyId || !secretAccessKey || !bucketRegion) {
  throw new Error("AWS S3 credentials are not defined in the environment variables.");
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

router.post("/image", upload.single("image"), async (req: ImageRequest, res: Response): Promise<void> => {
  if (!req.file) return;

  const buffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();
  const imageName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const client: PoolClient = await pool.connect();
  try {
    const data = await client.query(
      `INSERT INTO images (caption,image_url)
        VALUES ($1,$2)
        RETURNING *`,
      [req.body.caption, imageName],
    );
    res.send(data);
  } finally {
    client.release();
  }
});

router.get("/image", async (req, res) => {
  const client: PoolClient = await pool.connect();

  try {
    const images = await client.query(`SELECT * FROM images`);

    for (const image of images.rows) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: image.image_url,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      image.imageUrl = url;
    }

    res.send(images.rows);
  } finally {
    client.release();
  }
});

router.delete("/image/:id", async (req, res) => {
  const id = req.params.id;
  const client: PoolClient = await pool.connect();
  try {
    const image = await client.query(`SELECT * FROM images WHERE id = $1`, [id]);

    if (!image) {
      res.status(404).send("Image not found");
      return;
    }

    const params = {
      Bucket: bucketName,
      Key: image.rows[0].image_url,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    await client.query(`DELETE FROM images WHERE id = $1`, [id]);

    res.send({});
  } finally {
    client.release();
  }
});

export default router;
