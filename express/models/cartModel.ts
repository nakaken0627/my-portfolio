import { PoolClient } from "pg";
import pool from "../config/database.js";

export const getCart = async (user_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT carts.id 
        FROM carts 
        WHERE is_checkedout = false 
        AND user_id = $1`,
      [user_id]
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
      [user_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getCartALLProducts = async (cart_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT product_id,quantity
        FROM cart_products
        WHERE cart_id = $1
        ORDER BY id ASC `,
      [cart_id]
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const findCartProduct = async (cart_id: number, product_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * 
        FROM cart_products
        WHERE cart_id = $1
        AND product_id = $2 `,
      [cart_id, product_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const createCartProduct = async (cart_id: number, product_id: number, quantity: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO cart_products (cart_id,product_id,quantity)
        VALUES ($1,$2,$3)
        RETURNING id,cart_id,product_id,quantity,created_at,updated_at`,
      [cart_id, product_id, quantity]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const changeCartProduct = async (cart_id: number, product_id: number, quantity: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE cart_products
        SET quantity = $1
        WHERE cart_id = $2
        AND product_id = $3
        RETURNING id,cart_id,product_id,quantity,created_at,updated_at`,
      [quantity, cart_id, product_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteCartProduct = async (cart_id: number, product_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM cart_products
        WHERE cart_id = $1
        AND product_id = $2
        RETURNING id,cart_id,product_id,quantity,created_at,updated_at`,
      [cart_id, product_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// export const deleteCartAllProducts = async (cart_id: number) => {
//   const client: PoolClient = await pool.connect();
//   try {
//     const result = await client.query(
//       `DELETE FROM cart_products
//         WHERE cart_id = $1
//         RETURNING id,cart_id,product_id,quantity,created_at,updated_at`,
//       [cart_id]
//     );
//     return result.rows;
//   } finally {
//     client.release();
//   }
// };

// export const checkoutCart = async (cart_id: number) => {
//   const client: PoolClient = await pool.connect();
//   try {
//     const result = await client.query(
//       `UPDATE carts
//         SET is_checkedout = true
//         WHERE id = $1
//         RETURNING id,user_id,is_checkedout,created_at,updated_at`,
//       [cart_id]
//     );
//     return result.rows[0];
//   } finally {
//     client.release();
//   }
// };
