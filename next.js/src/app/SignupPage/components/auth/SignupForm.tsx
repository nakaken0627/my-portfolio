"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function SignupForm() {
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
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("サインアップ成功", data);
        router.push("/dashboard");
      } else {
        console.log("登録済み");
        setError(data.message || "サインアップに失敗しました");
      }
    } catch (error) {
      console.error("サインアップエラー", error);
      setError("ネットワークエラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="username">ユーザー名 : </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="ユーザー名"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">パスワード : </label>
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
        <label htmlFor="confirmedPassword">パスワード（確認用） : </label>
        <input
          type="text"
          id="confirmedPassword"
          name="confirmedPassword"
          value={confirmedPassword}
          placeholder="パスワード（確認用）"
          onChange={(e) => setConfirmedPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">登録</button>
    </form>
  );
}

export default SignupForm;
