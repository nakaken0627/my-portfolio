import { PoolClient } from "pg";

import { UserProductRow } from "../../../domain/models/user/productModel.js";
import pool from "../../../shared/config/database.js";

export const getUserProductListWithCustom = async (userId: number): Promise<UserProductRow[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
          SELECT 
            (to_jsonb(p) || jsonb_build_object('company_name', c.name)) AS product,
            to_jsonb(pc) AS custom
          FROM products p
          INNER JOIN companies c
          ON c.id = p.company_id
          LEFT JOIN product_customizations pc
          ON p.id = pc.product_id
            AND (pc.user_id = $1 OR pc.user_id is NULL)
            AND (pc.start_date IS NULL OR pc.start_date <= CURRENT_DATE)
            AND (pc.end_date IS NULL OR pc.end_date >= CURRENT_DATE)
          ORDER BY p.id
        `,
      [userId],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const countAllProducts = async (): Promise<number> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(`SELECT COUNT(*) FROM products`);
    return result.rows[0].count;
  } finally {
    client.release();
  }
};

export const getPaginatedProductsWithCustom = async (
  userId: number,
  limit: number,
  offset: number,
): Promise<UserProductRow[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT 
        (to_jsonb(p) || jsonb_build_object('company_name', c.name)) AS product,
        to_jsonb(pc) AS custom
      FROM (
        SELECT * 
        FROM products
        ORDER BY id
        LIMIT $2 OFFSET $3
      ) p
      INNER JOIN companies c
      ON c.id = p.company_id
      LEFT JOIN product_customizations pc
      ON p.id = pc.product_id
        AND (pc.user_id = $1 OR pc.user_id is NULL)
        AND (pc.start_date IS NULL OR pc.start_date <= CURRENT_DATE)
        AND (pc.end_date IS NULL OR pc.end_date >= CURRENT_DATE)
      ORDER BY p.id
        `,
      [userId, limit, offset],
    );
    return result.rows;
  } finally {
    client.release();
  }
};
