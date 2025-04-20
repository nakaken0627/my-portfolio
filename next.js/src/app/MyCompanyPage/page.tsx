"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  company_name: string;
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
};

type Company = {
  name: string;
};

export default function MyCompanyPage() {
  const router = useRouter();
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myCompany, setMyCompany] = useState<Company | null>(null); //バックエンド側からオブジェクトとして受け取る（配列ではない）

  useEffect(() => {
    const fetchMyCompany = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/mycompany", {
          method: "GET",
          credentials: "include",
        });
        console.log(res.ok);
        if (!res.ok) {
          throw new Error("[MyCompanyPage]レスポンスエラー(company)");
        }
        const data = await res.json();
        setMyCompany(data);
      } catch (err) {}
    };

    const fetchMyProduct = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/myproducts", {
          method: "GET",
          credentials: "include", //cookieデータをつけて送る
        });
        if (!res.ok) {
          throw new Error("[MyCompanyPage]レスポンスエラー(products)");
        }
        const data = await res.json();
        // console.log("[MyCompanyPage]myCompanyデータ取得成功", data);
        setMyProducts(data);
      } catch (err) {
        console.error("[MycompanyPage]myCompanyデータ取得エラー", err);
      }
    };
    fetchMyProduct();
    fetchMyCompany();
  }, []);

  const handleClickLogout = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/company/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return console.error("[MyCompanyPage]ログアウト失敗");
      }
      router.push("/CompanyLoginPage");
    } catch (err) {
      console.error("[MyCompanyPage]通信エラー", err);
    }
  };

  return (
    <>
      <h1>登録済み画面(販売企業様)</h1>
      <div>ようこそ、{myCompany?.name}様</div>
      <button onClick={handleClickLogout}>ログアウト</button>
      <hr />
      <h2>商品一覧</h2>
      <table>
        <thead>
          <tr>
            <th>型番</th>
            <th>商品名</th>
            <th>価格</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {myProducts.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.model_number}</td>
                <td>{Math.round(product.price)}</td>
                <td>{product.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
