import { PoolClient } from "pg";

import pool from "../shared/config/database.js";

export const getCart = async (user_id: number) => {
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

export const createCart = async (user_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO carts (user_id) 
        VALUES ($1)
        RETURNING id,user_id,is_checkedout,created_at,updated_at`,
      [user_id],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getCartAllProducts = async (cart_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT *
        FROM cart_products
        WHERE cart_id = $1`,
      [cart_id],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const createOrUpdateCartProduct = async (
  cartId: number,
  quantity: number,
  productId: number,
  customizationId?: number,
) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      //新規登録ボタンを連続でクリックした際に登録の重複があったため、ON CONFLICTでエラーを回避
      `INSERT INTO cart_products (cart_id,quantity,product_id,customization_id)
        VALUES ($1,$2,$3,$4)
        ON CONFLICT (cart_id,product_id,customization_id)  
        DO UPDATE SET quantity = EXCLUDED.quantity
        RETURNING id`,
      [cartId, quantity, productId, customizationId || null],
    );
    // console.log(cartId, quantity, productId, customizationId);
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteCartProduct = async (cartId: number, productId: number, customizationId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM cart_products
        WHERE cart_id = $1
        AND product_id = $2
        AND customization_id IS NOT DISTINCT FROM $3
        RETURNING cart_id, product_id, customization_id`,
      [cartId, productId, customizationId || null],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteCartAllProducts = async (cartId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM cart_products
        WHERE cart_id = $1
        RETURNING *`,
      [cartId],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const checkoutCart = async (orderId: number, cartId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE carts
        SET is_checkedout = true,order_id =$1
        WHERE id = $2
        RETURNING *
      `,
      [orderId, cartId],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
