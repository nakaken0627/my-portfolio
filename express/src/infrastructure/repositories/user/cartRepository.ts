import { PoolClient } from "pg";

import pool from "../../../shared/config/database.js";

export const getUserCart = async (user_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT carts.id 
          FROM carts 
          WHERE is_checkedout = false 
          AND user_id = $1`,
      [user_id],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const createUserCart = async (user_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO carts (user_id) 
          VALUES ($1)
          RETURNING id`,
      [user_id],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
