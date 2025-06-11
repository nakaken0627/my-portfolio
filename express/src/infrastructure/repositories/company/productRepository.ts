import { PoolClient } from "pg";

import { CreateCustomProductDTO, CreateProductDTO } from "../../../presentation/dto/company/product.dto.js";
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

export const createCompanyProduct = async (productData: CreateProductDTO) => {
  const client: PoolClient = await pool.connect();
  const { companyId, modelNumber, name, price, description, imageName } = productData;

  try {
    const result = await client.query(
      `INSERT INTO products (company_id, model_number, name, price, description,image_name)
           VALUES ($1,$2,$3,$4,$5,$6)
           RETURNING *`,
      [companyId, modelNumber, name, price, description, imageName],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const createCustomProduct = async (productsData: CreateCustomProductDTO) => {
  const client: PoolClient = await pool.connect();
  const { productId, userId, modelNumber, productName, price, description, startDate, endDate } = productsData;
  try {
    const result = await client.query(
      `
      INSERT INTO product_customizations
       (product_id,
        user_id,
        model_number,
        name,
        price,
        description,
        start_date,
        end_date)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id,product_id
      `,
      [productId, userId, modelNumber, productName, price, description, startDate, endDate],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteProduct = async (companyId: number, productsId: number): Promise<string> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM products
        WHERE company_id = $1 
        AND id = $2
        RETURNING image_name`,
      [companyId, productsId],
    );
    const imageName: string = result.rows[0].image_name;
    return imageName;
  } finally {
    client.release();
  }
};

export const deleteCustomProducts = async (customProductIds: number[]): Promise<number[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM product_customizations
        WHERE id =ANY($1::int[])
        RETURNING *`,
      [customProductIds],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const deleteCustomProduct = async (customProductId: number): Promise<number[]> => {
  console.log("customProductId", customProductId);
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM product_customizations
        WHERE id = $1
        RETURNING *`,
      [customProductId],
    );
    console.log("result", result.rows[0]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
