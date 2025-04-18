//DBへの操作など裏側の処理を記載

import { PoolClient } from "pg";
import pool from "../config/database.js";
import bcrypt from "bcrypt";

export type Product = {
  name: string;
  model_number: string;
  price: number;
  description: string;
  findCompanyProducts(companyId: number): Promise<any[]>;
};

class CompanyModel {
  async findByCompanyName(companyName: string): Promise<Product | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM companies WHERE name = $1", [companyName]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  //重複確認後にユーザー登録
  async createCompany(companyName: string, companyPassword: string): Promise<Company> {
    const client: PoolClient = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(companyPassword, 12);
      const result = await client.query(
        "INSERT INTO companies(name,password) VALUES ($1,$2) RETURNING id,name,created_at,updated_at",
        [companyName, hashedPassword]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findCompanyProducts(companyId: number) {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        "SELECT companies.name, model_number, products.name, price, description FROM products INNER JOIN companies ON companies.id = products.company_id WHERE company_id = $1",
        [companyId]
      );

      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }
}

export default new CompanyModel();
