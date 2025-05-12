//DBへの操作など裏側の処理を記載

import bcrypt from "bcrypt";
import { PoolClient } from "pg";

import pool from "../config/database.js";

export type Company = {
  id: number;
  name: string;
  type: "company";
};

export type Product = {
  company_name: string;
  name: string;
  model_number: string;
  price: number;
  description: string;
};

class CompanyModel {
  async findByCompanyName(companyName: string): Promise<Company | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM companies WHERE name = $1",
        [companyName],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  //重複確認後にユーザー登録
  async createCompany(
    companyName: string,
    companyPassword: string,
  ): Promise<Company> {
    const client: PoolClient = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(companyPassword, 12);
      const result = await client.query(
        "INSERT INTO companies(name,password) VALUES ($1,$2) RETURNING id,name,created_at,updated_at",
        [companyName, hashedPassword],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  //企業idを指定して、商品情報を取得
  async findCompanyProducts(companyId: number): Promise<Product[] | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        `SELECT
          companies.name as company_name ,
          model_number, 
          products.id,
          products.name, 
          price, 
          description 
          FROM products 
          INNER JOIN companies ON companies.id = products.company_id 
          WHERE company_id = $1`,
        [companyId],
      );

      return result.rows;
    } finally {
      client.release();
    }
  }

  async addCompanyProduct(
    company_id: string,
    model_number: string,
    name: string,
    price: number,
    description: string,
  ) {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO products (company_id, model_number, name, price, description)
           VALUES ($1,$2,$3,$4,$5)
           RETURNING name,price `,
        [company_id, model_number, name, price, description],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteCompanyProducts(
    companyId: number,
    productsIds: number[],
  ): Promise<number[]> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(
        `DELETE FROM products
        WHERE company_id = $1 
        AND id =ANY($2::int[])
        RETURNING *`,
        [companyId, productsIds],
      );
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default new CompanyModel();

export const getMyOrderList = async (company_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT
      	ORDER_PRODUCTS.ID AS ID,
        COMPANY_ID,
        ORDER_ID,
      	USERS.NAME AS user_name,
        MODEL_NUMBER,
        PRODUCTS.ID AS PRODUCT_ID,
        PRODUCTS.NAME AS PRODUCT_NAME,
        QUANTITY,
        ORDER_PRODUCTS.PRICE
      FROM
        ORDER_PRODUCTS
        INNER JOIN ORDERS ON ORDER_PRODUCTS.ORDER_ID = ORDERS.ID
        INNER JOIN USERS ON ORDERS.USER_ID = USERS.ID
        INNER JOIN PRODUCTS ON ORDER_PRODUCTS.PRODUCT_ID = PRODUCTS.ID
      WHERE
        IS_CONFIRMED = FALSE
        AND PRODUCTS.COMPANY_ID = $1
      ORDER BY
        ORDER_ID
      `,
      [company_id],
    );
    return result.rows;
  } finally {
    client.release();
  }
};

export const confirmingOrder = async (confirmedIds: number[]) => {
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

export const getConfirmedOrderList = async (company_id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT
      	ORDER_PRODUCTS.ID AS ID,
        COMPANY_ID,
        ORDER_ID,
      	USERS.NAME AS user_name,
        MODEL_NUMBER,
        PRODUCTS.ID AS PRODUCT_ID,
        PRODUCTS.NAME AS PRODUCT_NAME,
        QUANTITY,
        ORDER_PRODUCTS.PRICE
      FROM
        ORDER_PRODUCTS
        INNER JOIN ORDERS ON ORDER_PRODUCTS.ORDER_ID = ORDERS.ID
        INNER JOIN USERS ON ORDERS.USER_ID = USERS.ID
        INNER JOIN PRODUCTS ON ORDER_PRODUCTS.PRODUCT_ID = PRODUCTS.ID
      WHERE
        IS_CONFIRMED = TRUE
        AND PRODUCTS.COMPANY_ID = $1
      ORDER BY
        ORDER_ID
      `,
      [company_id],
    );
    return result.rows;
  } finally {
    client.release();
  }
};
