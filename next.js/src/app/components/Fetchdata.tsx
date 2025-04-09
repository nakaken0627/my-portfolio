//expressサーバからAPIを呼び出して結果を表示する
//成功パターン（メッセージの表示）と失敗パータン（error）を考える

"use client";

import { useEffect, useState } from "react";

const FetchData = () => {
  //受け取ったmessageやエラーを保持する
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //マウント時のみに反映させるための処理
  useEffect(() => {
    //マウント時にexpressサーバにリクエストするための処理
    const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/hello");
        if (!response.ok) {
          throw new Error(`HTTP error! status:${response.status}`);
        }
        const data = await response.json();
        console.log("Setting Message:", data.message);
        setMessage(data.message);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setMessage(null);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      {/* メッセージやエラーを表示させる */}
      <h2>Fetch Data from Express</h2>
      {message && <p>massage: {message}</p>}
      {error && <p>error: {error}</p>}
    </>
  );
};

export default FetchData;
