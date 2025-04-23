"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginFrom() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/auth/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("[UserLoginFrom]handleSubmit:ログイン成功");
        router.push("/MyUserPage");
      } else {
        console.log("[UserLoginFrom]handleSubmit:ログイン失敗");
        setError(data.message || "ログインに失敗しました");
      }
    } catch (err) {
      console.error("ログインエラー", err);
      setError("ネットワークエラーが発生しました");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <a style={{ color: "red" }}>{error}</a>}
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputUsername}
            placeholder="ユーザー名"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="text"
            id="password"
            name="password"
            value={inputPassword}
            placeholder="パスワード"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </>
  );
}
