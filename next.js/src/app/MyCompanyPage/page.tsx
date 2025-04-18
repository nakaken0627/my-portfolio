"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyCompanyPage() {
  const router = useRouter();
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
      } catch (err) {
        console.error("[MycompanyPage]myCompanyデータ取得エラー", err);
      }
    };
    fetchMycompany();
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
      <div>ようこそ、{myCompany}様</div>
      <button onClick={handleClickLogout}>ログアウト</button>
    </>
  );
}
