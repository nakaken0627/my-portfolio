import { PoolClient } from "pg";

import pool from "../../../shared/config/database.js";

export const getOrders = async (isConfirmed: boolean, companyId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
        SELECT 
          o.id AS order_id,
          (to_jsonb(p) || jsonb_build_object
            ('userName',u.name,'quantity',op.quantity,'orderProductId',op.id))
            AS product,
          to_jsonb(pc) AS custom
        FROM
          orders o
        INNER JOIN users u 
          ON u.id = o.user_id
        INNER JOIN order_products op
          ON op.order_id = o.id
        INNER JOIN products p
          ON p.id = op.product_id
        LEFT JOIN product_customizations pc
          ON pc.id = op.customization_id
        WHERE op.is_confirmed = $1
        AND p.company_id = $2
        ORDER BY o.id
        `,
      [isConfirmed, companyId],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const updateConfirm = async (confirmedIds: number[]) => {
  const client: PoolClient = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const id of confirmedIds) {
      await client.query(
        `
        UPDATE ORDER_PRODUCTS
        SET IS_CONFIRMED = TRUE
        WHERE ID = $1
        RETURNING ID,IS_CONFIRMED  
          `,
        [id],
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
