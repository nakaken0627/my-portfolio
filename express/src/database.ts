// PostgreSQLデータベースへの接続設定

// PostgreSQLのクライアントライブラリをインポート
// dotenvをインポートして環境変数を読み込む
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// PostgreSQLに接続する
pool
  .connect()
  .then(() => console.log("PostgreSQLに接続しました"))
  .catch((err) => console.error("PostgreSQLへの接続に失敗しました", err));

export default pool;
