"use client";

import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
};

export default function GetUserInfo() {
  const [myUser, setMyUser] = useState<User | null>(null);

  const fetchMyUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/myuser", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("[MyUserPage]getUserInfo:データ取得に失敗しました");
        throw new Error("[[MyUserPage]getUserInfo:レスポンスエラー");
      }
      const data = await response.json();
      setMyUser(data);
    } catch (err) {
      console.error("サーバエラーが発生しました", err);
    }
  };

  useEffect(() => {
    fetchMyUser();
  }, []);

  return (
    <>
      <h1>ようこそ、{myUser?.name}様</h1>
    </>
  );
}
