import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import type { Express, Request, Response } from "express";

import apiRouter from "./routes/api";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
// import pgSession from "connect-pg-simple";

import session from "express-session";
import passport from "../config/passport";
import pool from "../config/database";
import connectPgSimple from "connect-pg-simple";

//expressのインスタンスを作成
const app: Express = express();

//環境変数を設定するdotenv(未設定)
dotenv.config();
const port = process.env.PORT || 3001;

//特定のサーバからのアクセスを許可するcors設定
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

//body-parser の代替 (フォームデータ用)
app.use(express.urlencoded({ extended: false }));
// body-parser の代替 (JSON データ用)
app.use(express.json());

//セッションの初期設定
const sessionOptions = {
  store: new (connectPgSimple(session))({
    pool: pool,
    tableName: "session",
  }),
  secret: "mysecret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  createTableIfMissing: true,
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//ルートパスにリクエストがきた際の処理
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

//サインアップ機能
app.use("/auth", authRouter);

//エンドポイントの動作確認用
app.use("/api", apiRouter);

//DBとの接続確認用
app.use("/users", usersRouter);

//エラーハンドラー
app.use((req, res) => {
  res.status(404).send("ページが見つかりません");
});

//サーバを起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
