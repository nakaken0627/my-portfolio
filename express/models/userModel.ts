import { PoolClient } from "pg";
import pool from "../config/database";
import bcrypt from "bcrypt";

class UserModel {
  async findByUsername(username: string): Promise<string | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
      );
      //リターンが２以上になる可能性はないのか？→ユーザー名を一意に設定
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

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

  async comparePassword(
    plainPassword: string,
    hashedPassword?: string
  ): Promise<boolean> {
    if (!hashedPassword) {
      return false;
    }
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new UserModel();
