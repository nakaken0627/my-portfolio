import express from "express";
import * as dotenv from "dotenv"; //環境変数が設定可能
import cors from "cors";
import apiRouter from "./routes/api";
import usersRouter from "./routes/users";
import type { Express, Request, Response } from "express";

const app: Express = express();

//環境変数を設定するdotenv(未設定)
dotenv.config();
const port = process.env.PORT || 3001;

//特定のサーバからのアクセスを許可するcors設定
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

//apiにリクエストが来た際の処理
app.use("/api", apiRouter);

//DBに接続するための設定
app.use("/api", usersRouter);

//ルートパスにリクエストがきた際の処理
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

//サーバを起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
