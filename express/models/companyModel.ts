//DBへの操作など裏側の処理を記載

import { PoolClient } from "pg";
import pool from "../config/database.js";
import bcrypt from "bcrypt";

export interface CompanyType {
  companyId: number;
  companyName: string;
  companyPassword: string;
  company_id: number;
  company_name: string;
}

class CompanyModel {
  async findByCompanyName(companyName: string): Promise<CompanyType | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM companies WHERE company_name = $1", [companyName]);

      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  //重複確認後にユーザー登録
  async createCompany(companyName: string, companyPassword: string): Promise<CompanyType> {
    const client: PoolClient = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(companyPassword, 12);
      const result = await client.query(
        "INSERT INTO companies(company_name,company_password) VALUES ($1,$2) RETURNING company_id,company_name,company_created_at,company_updated_at",
        [companyName, hashedPassword]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

export default new CompanyModel();
