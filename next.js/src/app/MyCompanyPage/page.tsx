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
  id: number;
  name: string;
};

export default function MyCompanyPage() {
  const router = useRouter();
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myCompany, setMyCompany] = useState<Company | null>(null); //バックエンド側からオブジェクトとして受け取る（配列ではない）

  const [modelNum, setModelNum] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

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

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault(); //今回の場合なくても動作はするが、環境によっては意図しないリロードやリダイレクトが起きるため必要。

    //データ送付用にプロパティ名を変更
    const company_id = myCompany?.id;
    const model_number = modelNum;

    try {
      const req = await fetch("http://localhost:3001/api/addproduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id,
          model_number,
          name,
          price,
          description,
        }),
      });

      //登録後にデータinputに残らないように初期化
      setName("");
      setModelNum("");
      setPrice(0);
      setDescription("");

      //登録したデータ含めて再度DBから取得
      fetchMyProduct();
    } catch (err) {
      console.error("[MyCompanyPage]handleSubmitProduct:通信エラー", err);
    }
  };

  useEffect(() => {
    fetchMyProduct();
    fetchMyCompany();
  }, []);

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
                <td>{product.name}</td>
                <td>{product.model_number}</td>
                <td>{Math.round(product.price)}</td>
                <td>{product.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      {/* company_id, model_number, name, price, description */}
      <form onSubmit={handleSubmitProduct}>
        <div>
          <label htmlFor="name">商品名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="商品名"
            onChange={(e) => setName(e.target.value)}
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
      </form>
    </>
  );
}
