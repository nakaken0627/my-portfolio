import type { Express, Request, Response } from "express";
import connectPgSimple from "connect-pg-simple";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";

import pool from "./config/database.js";
import passport from "./config/passport.js";
import apiRouter from "./routes/api.js";
import authRouter from "./routes/auth.js";

//expressのインスタンスを作成
const app: Express = express();

//環境変数を設定
dotenv.config();
const port = Number(process.env.PORT) || 3001;
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined in the environment variables.");
}

const frontIp = process.env.FRONT_IP || "localhost";
const host = process.env.HOST || "localhost";

//特定のサーバからのアクセスを許可するcors設定
const corsOptions = {
  origin: `http://${frontIp}:3000`,
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

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//ルートパスにリクエストがきた際の処理
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

//認証用
app.use("/auth", authRouter);

//情報取得用
app.use("/api", apiRouter);

//エラーハンドラー
app.use((req, res) => {
  res.status(404).send("ページが見つかりません");
});

//サーバを起動
app
  .listen(port, host, () => {
    console.warn(`Server is running at http://${host}:${port}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
