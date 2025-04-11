"use client";

// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3001/api/signup", {
//         method: "POST",
//         headers: {
//           "content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       console.log(response);

//       if (response.ok) {
//         const data = await response.json();
//         console.log("サインアップ成功：", data);
//         router.push("/dashboard");
//       } else {
//         console.log("サインアップ失敗：");
//       }
//     } catch (error) {
//       console.error("サインアップリクエストエラー", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <p>Please enter your credentials to log in.</p>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">ユーザー名</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="ユーザー名"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <label htmlFor="password">パスワード</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="パスワード"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">登録</button>
//         </div>
//       </form>
//     </div>
//   );
// }
