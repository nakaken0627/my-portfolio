"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function SigninForm() {
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [inputCompanyPassword, setInputCompanyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/auth/company/login", {
        method: "POST",
        credentials: "include", //クロスオリジンであってもcookieをリクエストと一緒に送る場合に必須
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputCompanyName,
          password: inputCompanyPassword,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("ログイン成功", data);
        router.push("/MyCompanyPage");
      } else {
        setError(data.message || "ログインに失敗しました");
      }
    } catch (error) {
      console.error("ログインエラー", error);
      setError("ネットワークエラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="companyName">企業ID : </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={inputCompanyName}
          placeholder="企業ID"
          onChange={(e) => setInputCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyPassword">パスワード : </label>
        <input
          type="text"
          id="companyPassword"
          name="companyPassword"
          value={inputCompanyPassword}
          placeholder="パスワード"
          onChange={(e) => setInputCompanyPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
}

export default SigninForm;
