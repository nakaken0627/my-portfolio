import express from "express";
import * as dotenv from "dotenv"; //環境変数が設定可能
import cors from "cors";
import apiRouter from "./routes/api";
import usersRouter from "./routes/users";
import type { Express, Request, Response } from "express";

import session from "express-session";

const app: Express = express();

import cookieParser from "cookie-parser";
app.use(cookieParser("mysecret"));

//環境変数を設定するdotenv(未設定)
dotenv.config();
const port = process.env.PORT || 3001;

//特定のサーバからのアクセスを許可するcors設定
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

const verifyPass = app.use("/secret", (req, res, next) => {
  const { password } = req.query;
  if (password === "supersecret") {
    return next();
  } else {
    // res.send("パスワードが必要です");
    throw new Error("パスワードが必要です");
  }
});

//ルートパスにリクエストがきた際の処理
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

//apiにリクエストが来た際の処理
app.use("/api", apiRouter);

//DBに接続するための設定
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
