import { PoolClient } from "pg";

import { OrderedUserRow } from "../../../domain/models/user/orderModel.js";
import pool from "../../../shared/config/database.js";

export const getUserOrders = async (userId: number): Promise<OrderedUserRow[]> => {
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
