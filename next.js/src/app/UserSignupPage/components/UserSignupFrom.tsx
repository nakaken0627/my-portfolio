"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSignupFrom() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmedPassword) {
      return setError("パスワードが一致しません");
    }
    try {
      const response = await fetch("http://localhost:3001/auth/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("[UserSignupPage]handleSubmit:", data);
        router.push("/user/mypage");
      } else {
        console.log("登録済みです");
        setError(data.message || "サインアップに失敗しました");
      }
    } catch (err) {
      console.error("サインアップエラー:", err);
      setError("ネットワークエラー");
    }

    setUsername("");
    setPassword("");
    setConfirmedPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <a style={{ color: "red" }}>{error}</a>}
        <div>
          <label htmlFor="username">ユーザーID</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="ユーザーID"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmedPassword">確認用パスワード</label>
          <input
            type="text"
            id="confirmedPassword"
            name="confirmedPassword"
            value={confirmedPassword}
            placeholder="確認用パスワード"
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </>
  );
}
