import { PoolClient } from "pg";

import { AddProductDTO } from "../../../presentation/dto/product.dto";
import pool from "../../../shared/config/database.js";

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

export const addCompanyProduct = async (productData: AddProductDTO) => {
  const client: PoolClient = await pool.connect();
  const { companyId, modelNumber, productName, price, description, imageName } = productData;

  try {
    const result = await client.query(
      `INSERT INTO products (company_id, model_number, name, price, description,image_name)
           VALUES ($1,$2,$3,$4,$5,$6)
           RETURNING *`,
      [companyId, modelNumber, productName, price, description, imageName],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
