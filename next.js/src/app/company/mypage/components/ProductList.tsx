"use client";

import { useContext, useState } from "react";
import { CompanyContext } from "@/context/company-context";

export const ProductList = () => {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) return <div>Loading...</div>;

  const { myProducts, fetchMyProducts } = companyContext;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckBoxStatus = (ProductId: number) => {
    setSelectedIds((prev) =>
      prev.includes(ProductId)
        ? prev.filter((item) => item !== ProductId)
        : [...prev, ProductId],
    );
  };

  const handleDeleteProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/company/deleteproducts",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productsIds: selectedIds,
          }),
        },
      );

      const data = await res.json();
      if (!data) throw new Error();

      setSelectedIds([]);
      fetchMyProducts();
    } catch (err) {
      console.error("[MyCompanyPage]handleDeleteProducts:通信エラー");
    }
  };

  return (
    <div>
      <h2>【商品一覧】</h2>
      <table>
        <thead>
          <tr>
            <th>商品名</th>
            <th>型番</th>
            <th>価格</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {myProducts.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id)}
                    onChange={() => handleCheckBoxStatus(product.id)}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.model_number}</td>
                <td>{Math.round(product.price)}</td>
                <td>{product.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleDeleteProducts}>削除ボタン</button>
    </div>
  );
};
