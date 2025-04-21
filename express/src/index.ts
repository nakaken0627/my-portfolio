import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import type { Express, Request, Response } from "express";

import apiRouter from "./routes/api.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

import session from "express-session";
import passportCompany from "../config/passportCompany.js"; //user用を作成する際に確認必須
import pool from "../config/database.js";
import connectPgSimple from "connect-pg-simple";

//expressのインスタンスを作成
const app: Express = express();

//環境変数を設定するdotenv(未設定)
dotenv.config();
const port = process.env.PORT || 3001;
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined in the environment variables.");
}

//特定のサーバからのアクセスを許可するcors設定
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
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
  secret: sessionSecret, //署名付きcookieの秘密鍵
  resave: false, //セッションが変更されていない場合でも保存するかどうか
  saveUninitialized: false, //セッションが初期化されていない場合でも保存するかどうか
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true }, // secure: trueにするとhttpsでないとcookieが送信されない、httpOnly: trueにすると外部の悪質なJavaScriptからcookieがアクセスできなくなる
  createTableIfMissing: true, //sessionテーブルが存在しない場合に自動作成するオプション
};

//現状のままだとセッション時にCompanyとUserで競合が発生するため注意
app.use(session(sessionOptions));
app.use(passportCompany.initialize());
app.use(passportCompany.session());

app.use((req, res, next) => {
  // console.log("[index.ts]Session data:", req.session);
  next();
});

//ルートパスにリクエストがきた際の処理
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

//認証用
app.use("/auth", authRouter);

//情報取得用
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
