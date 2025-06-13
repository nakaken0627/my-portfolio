import bcrypt from "bcrypt";
import { PoolClient } from "pg";

import { Company } from "../../../domain/models/company/companyModel.js";
import pool from "../../../shared/config/database.js";

export const findByCompanyName = async (companyName: string): Promise<Company | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      ` SELECT * 
        FROM companies 
        WHERE name = $1 `,
      [companyName],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const createCompany = async (companyName: string, companyPassword: string): Promise<Company> => {
  const client: PoolClient = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(companyPassword, 12);
    const result = await client.query(
      ` INSERT INTO companies(name,password)
        VALUES ($1,$2)
        RETURNING id,name,created_at,updated_at`,
      [companyName, hashedPassword],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getUserIds = async () => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      ` SELECT id,name 
        FROM users`,
    );
    return result.rows;
  } finally {
    client.release();
  }
};
