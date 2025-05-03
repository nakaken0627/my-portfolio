"use client";

import { useContext, useState } from "react";
import { CompanyContext } from "@/context/company-context";

export const RegisterFunc = () => {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) return <div>Loading...</div>;

  const { fetchMyProducts } = companyContext;

  const [modelNum, setModelNum] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3001/api/company/addproduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_number: modelNum,
          name: productName,
          price: price,
          description: description,
        }),
      });

      //登録後にデータがinputに残らないように初期化
      setProductName("");
      setModelNum("");
      setPrice(0);
      setDescription("");

      //登録したデータ含めて再度DBから取得
      fetchMyProducts();
    } catch (err) {
      console.error("[MyCompanyPage]handleSubmitProduct:通信エラー", err);
    }
  };

  return (
    <div>
      <h2>【登録機能】</h2>
      <form onSubmit={handleSubmitProduct}>
        <div>
          <label htmlFor="name">商品名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productName}
            placeholder="商品名"
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="modelNum">型番</label>
          <input
            type="text"
            id="modelNum"
            name="model_number"
            value={modelNum}
            placeholder="model_number"
            onChange={(e) => setModelNum(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">金額</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            placeholder="金額"
            onChange={(e) => setPrice(Number(e.target.value))} //e.target.valueだけだとstring型で値を取得するため、number型に変換が必要
            required
          />
        </div>
        <div>
          <label htmlFor="modelNum">説明</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            placeholder="説明"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
        <hr />
      </form>
    </div>
  );
};
