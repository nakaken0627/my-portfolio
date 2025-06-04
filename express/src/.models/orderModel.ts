import { PoolClient } from "pg";

import pool from "../shared/config/database.js";

export const createOrder = async (user_id: number) => {
  const client: PoolClient = await pool.connect();

  try {
    const result = await client.query(
      `INSERT INTO orders (user_id) 
        VALUES ($1)
        RETURNING id`,
      [user_id],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

type OrderProducts = {
  productId: number;
  customizationId?: number;
  quantity: number;
  price: number;
};

export const createOrderProduct = async (order_id: number, orderProducts: OrderProducts[]) => {
  const client: PoolClient = await pool.connect();

  try {
    await client.query("BEGIN");

    await Promise.all(
      orderProducts
        .filter((p) => p.quantity > 0)
        .map((p) =>
          client.query(
            `INSERT INTO order_products (order_id,product_id,customization_id,quantity,price)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id,order_id,product_id,quantity,price,created_at,updated_at`,
            [order_id, p.productId, p.customizationId, p.quantity, p.price],
          ),
        ),
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
