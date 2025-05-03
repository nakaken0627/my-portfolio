"use client";

import { useRouter } from "next/navigation";

export const LogoutFunc = () => {
  const router = useRouter();
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
  return <button onClick={handleClickLogout}>ログアウト</button>;
};
