"use client";

import { useEffect, useState } from "react";

export default function MyCompanyPage() {
  const [myCompany, setMyCompany] = useState("");

  useEffect(() => {
    const fetchMycompany = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/mycompany", {
          method: "GET",
          credentials: "include", //cookieデータをつけて送る
        });
        const data = await res.json();
        setMyCompany(data.name);
      } catch (e) {
        console.error("[MycompanyPage]myCompanyデータ取得エラー");
      }
    };
    fetchMycompany();
  }, []);

  return (
    <>
      <h1>登録済み画面(販売企業様)</h1>
      <a>ようこそ、{myCompany}様</a>
    </>
  );
}
