import bcrypt from "bcrypt";
import { PoolClient } from "pg";

import pool from "../config/database.js";

export type User = {
  id: number;
  name: string;
  type: "user";
};

//ユーザー名の重複確認や基本情報取得のための関数
export const findByUsername = async (username: string): Promise<User | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE name=$1", [username]);
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
      "INSERT INTO users(name,password) VALUES ($1,$2) RETURNING id,name,created_at,updated_at",
      [username, hashedPassword],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const orderedProductList = async (userId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
        SELECT 
          order_id ,
          (to_jsonb(p) || jsonb_build_object('company_name',co.name,'quantity',cp.quantity)) AS product,
          to_jsonb(pc) AS customization
        FROM carts c
        INNER JOIN users u ON c.user_id = u.id
        INNER JOIN cart_products cp ON cp.cart_id = c.id 
        INNER JOIN products p ON cp.product_id = p.id
        LEFT JOIN product_customizations pc ON cp.customization_id = pc.id
        INNER JOIN companies co ON p.company_id = co.id
        WHERE
          c.user_id = $1 
        AND is_checkedout = TRUE
        ORDER BY
          order_id DESC,
          cp.product_id ASC`,
      [userId],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const findProductsWithCustomization = async (userId: number, limit: number, offset: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
        SELECT 
          (to_jsonb(p) || jsonb_build_object('company_name', c.name)) AS product,
          to_jsonb(pc) AS customization
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

export const countAllProducts = async () => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(`SELECT COUNT(*) FROM products`);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const findAllProductsWithCustomization = async (userId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
        SELECT 
          (to_jsonb(p) || jsonb_build_object('company_name', c.name)) AS product,
          to_jsonb(pc) AS customization
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
