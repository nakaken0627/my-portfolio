"use client";

import { useRouter } from "next/navigation";

export default function LogoutFunc() {
  const router = useRouter();

  const handleClickLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/user/logout", {
        method: "GET",
        credentials: "include",
      });
      console.log("[LogoutFunc]ログアウトに成功しました", response);
      router.push("/user/login");
    } catch (err) {
      console.error("サーバエラー", err);
    }
  };

  return <button onClick={handleClickLogout}>ログアウト</button>;
}
