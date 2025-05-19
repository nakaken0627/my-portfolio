"use strict";
// PostgreSQLデータベースへの接続設定
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv"); // dotenvをインポートして環境変数を読み込む
var pg = require("pg"); // PostgreSQLのクライアントライブラリをインポート
dotenv.config();
var pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
//接続状況確認用
pool.on("connect", function () { });
pool.on("error", function (err) {
    console.error("PostgreSQL接続エラー:", err);
});
exports.default = pool;
