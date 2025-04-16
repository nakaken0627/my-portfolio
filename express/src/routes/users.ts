import express, { Request, Response } from "express";
import pool from "../../config/database.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("ユーザー一覧の取得に失敗しました", err);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

export default router;
