import bcrypt from "bcrypt";
import { PoolClient } from "pg";

import { User } from "../../../domain/models/user/userModel.js";
import pool from "../../../shared/config/database.js";

//ユーザー名の重複確認や基本情報取得のための関数
export const findByUsername = async (username: string): Promise<User | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      ` SELECT * 
        FROM users 
        WHERE name=$1`,
      [username],
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

//ユーザー登録用
export const createUser = async (username: string, password: string): Promise<User> => {
  const client: PoolClient = await pool.connect();

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await client.query(
      ` INSERT INTO users(name,password) 
        VALUES ($1,$2) 
        RETURNING id,name,created_at,updated_at`,
      [username, hashedPassword],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
