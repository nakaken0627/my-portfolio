import express from "express";
import dotenv from "dotenv"; //環境変数が設定可能
import cors from "cors";
import type { Express, Request, Response } from "express";

import apiRouter from "./routes/api";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";

import session, { Cookie } from "express-session";
import passport from "passport";

const app: Express = express();

//環境変数を設定するdotenv(未設定)
dotenv.config();
const port = process.env.PORT || 3001;

//特定のサーバからのアクセスを許可するcors設定
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false })); // body-parser の代替 (フォームデータ用)
app.use(express.json()); // body-parser の代替 (JSON データ用)

//セッションの初期設定
const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" },
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

//ルートパスにリクエストがきた際の処理
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.use("/api/signup", authRouter);

//エンドポイントの動作確認
app.use("/api", apiRouter);

//DBとの接続確認
app.use("/users", usersRouter);

app.get("/greet", (req, res) => {
  const { name } = req.cookies;
  res.send(`ようこそ${name}さん`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "yamada");
  res.cookie("animal", "cat");
  res.send("クッキー送ったよ");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("署名付きクッキー");
});

app.get("/verifyfuruit", (req, res) => {
  console.log(req.signedCookies);
  res.send(req.signedCookies);
});

app.use((req, res) => {
  res.status(404).send("ページが見つかりません");
});

//サーバを起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
