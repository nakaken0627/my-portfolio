import { PoolClient } from "pg";

import pool from "../../shared/config/database.js";

export const fetchMergedCompanyProducts = async (companyId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      ` SELECT
            row_to_json(p.*) AS product,
            row_to_json(pc.*) AS customization
          FROM products p
          LEFT JOIN product_customizations pc
            ON p.id = pc.product_id
          WHERE p.company_id =$1
          ORDER BY p.id `,
      [companyId],
    );
    return result.rows;
  } finally {
    client.release();
  }
};
