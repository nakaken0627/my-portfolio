"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function CompanySignupForm() {
  const [companyName, setCompanyName] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [confirmedCompanyPassword, setConfirmedCompanyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (companyPassword !== confirmedCompanyPassword) {
      return setError("パスワードが一致しません");
    }

    try {
      const response = await fetch(
        "http://localhost:3001/auth/company/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName, companyPassword }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("サインアップ成功", data);
        router.push("/dashboardForCompany");
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
        <label htmlFor="companyName">企業ID : </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={companyName}
          placeholder="企業ID"
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="companyPassword">パスワード : </label>
        <input
          type="text"
          id="companyPassword"
          name="companyPassword"
          value={companyPassword}
          placeholder="パスワード"
          onChange={(e) => setCompanyPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmedCompanyPassword">
          パスワード（確認用） :{" "}
        </label>
        <input
          type="text"
          id="confirmedCompanyPassword"
          name="confirmedCompanyPassword"
          value={confirmedCompanyPassword}
          placeholder="パスワード（確認用）"
          onChange={(e) => setConfirmedCompanyPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">登録</button>
    </form>
  );
}

export default CompanySignupForm;
