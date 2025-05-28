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

export const findProductsForUser = async () => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT 
          companies.name as company_name,
          products.id as id,
          model_number,
          products.name as product_name, 
          price, 
          description,
          image_name
          FROM products
          INNER JOIN companies
          ON companies.id = products.company_id
          ORDER BY company_id`,
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const orderedProductList = async (user_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT
        ORDER_ID,
        CARTS.ID as cart_id,
        CART_PRODUCTS.PRODUCT_ID,
        MODEL_NUMBER,
        PRODUCTS.NAME as product_name,
        PRICE,
        QUANTITY,
        COMPANIES.NAME as company_name
      FROM
        CARTS
        INNER JOIN USERS ON USERS.ID = CARTS.USER_ID
        INNER JOIN CART_PRODUCTS ON CART_PRODUCTS.CART_ID = CARTS.ID
        INNER JOIN PRODUCTS ON CART_PRODUCTS.PRODUCT_ID = PRODUCTS.ID
        INNER JOIN COMPANIES ON PRODUCTS.COMPANY_ID= COMPANIES.ID
      WHERE
        USER_ID = $1
        AND IS_CHECKEDOUT = TRUE
      ORDER BY
        ORDER_ID DESC,
        CART_PRODUCTS.PRODUCT_ID ASC`,
      [user_id],
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
        FROM products p
        INNER JOIN companies c
        ON c.id = p.company_id
        LEFT JOIN product_customizations pc
        ON p.id = pc.product_id
          AND (pc.user_id = $1 OR pc.user_id is NULL)
          AND (pc.start_date IS NULL OR pc.start_date <= CURRENT_DATE)
          AND (pc.end_date IS NULL OR pc.end_date >= CURRENT_DATE)
        ORDER BY p.id
        LIMIT $2 OFFSET $3
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
