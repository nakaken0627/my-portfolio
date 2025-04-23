import { PoolClient } from "pg";
import pool from "../config/database.js";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  name: string;
  password: string;
};

class UserModel {
  //ユーザー名の重複確認や基本情報取得のための関数
  async findByUsername(username: string): Promise<User | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users WHERE name=$1", [username]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  //ユーザー登録用
  async createUser(username: string, password: string): Promise<User> {
    const client: PoolClient = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await client.query(
        "INSERT INTO users(name,password) VALUES ($1,$2) RETURNING id,name,created_at,updated_at",
        [username, hashedPassword]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findProductsForUser() {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        `SELECT 
          companies.name as company_name,
          products.id,
          model_number,
          products.name as product_name, 
          price, 
          description
          FROM products
          INNER JOIN companies
          ON companies.id = products.company_id
          ORDER BY company_id`
      );
      // console.log(result);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default new UserModel();
