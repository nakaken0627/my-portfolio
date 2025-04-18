//DBへの操作など裏側の処理を記載

import { PoolClient } from "pg";
import pool from "../config/database.js";
import bcrypt from "bcrypt";

export interface User {
  id: number;
  username: string;
}

class UserModel {
  //ユーザー名の重複がないか確認
  async findByUsername(username: string): Promise<string | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users WHERE username=$1", [username]);

      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  //重複確認後にユーザー登録
  async createUser(username: string, password: string): Promise<any> {
    const client: PoolClient = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await client.query(
        "INSERT INTO users(username,password) VALUES ($1,$2) RETURNING id,username,created_at,updated_at",
        [username, hashedPassword]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

export default new UserModel();
