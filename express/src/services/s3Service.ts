import crypto from "crypto";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

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

export const uploadImage = async (imageFile: Express.Multer.File) => {
  const imageName = randomImageName();
  const buffer = await sharp(imageFile.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: imageFile.mimetype,
  });

  await s3.send(command);
  return imageName;
};

export const getSignedImageUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

export const deleteImage = async (image_name: string) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: image_name,
  });

  await s3.send(command);
};
