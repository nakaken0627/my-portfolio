import * as dotenv from "dotenv"; // dotenvをインポートして環境変数を読み込む
import * as pg from "pg"; // PostgreSQLのクライアントライブラリをインポート

import { logger } from "./logger.js";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // ssl: { rejectUnauthorized: false }, //RDSでは暗号化されていないものはデフォルトで拒否するためfalseで可
});

//接続状況確認用
pool.on("connect", () => {
  logger.info("PostgreSQLに接続しました。", { component: "database" });
});
pool.on("error", (err) => {
  logger.error(err, { component: "database", action: "connectionError" });
});

export default pool;
