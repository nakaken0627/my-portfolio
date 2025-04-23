"use client";

import { useEffect, useState } from "react";

type Product = {
  product_name: string;
  id: number;
  model_number: string;
  price: number;
  description: string;
  company_name: string;
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3001/api/user/productlist", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log("データを取得できませんでした");
    }
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>商品一覧</h1>
      <table>
        <thead>
          <tr>
            <th>販売企業</th>
            <th>商品名</th>
            <th>型番</th>
            <th>価格</th>
            <th>説明</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.company_name}</td>
                <td>{product.product_name}</td>
                <td>{product.model_number}</td>
                <td>{Math.round(product.price)}</td>
                <td>{product.description}</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
