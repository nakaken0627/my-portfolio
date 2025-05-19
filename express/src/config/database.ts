// PostgreSQLデータベースへの接続設定

import * as dotenv from "dotenv"; // dotenvをインポートして環境変数を読み込む
import * as pg from "pg"; // PostgreSQLのクライアントライブラリをインポート

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//接続状況確認用
pool.on("connect", () => {});
pool.on("error", (err) => {
  console.error("PostgreSQL接続エラー:", err);
});

export default pool;
