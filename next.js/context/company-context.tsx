// "use client";

// import { createContext, useEffect, useState } from "react";

// type Company = {
//   id: number;
//   name: string;
// };

// type CompanyContext = {
//   myCompany: Company | null;
// };

// export const CompanyContext = createContext<CompanyContext | null>(null);

// export const CompanyContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [myCompany, setMyCompany] = useState<Company | null>(null);

//   const fetchMyCompany = async () => {
//     console.log("ここはきている");
//     try {
//       const res = await fetch("http://localhost:3001/api/company/mycompany", {
//         method: "GET",
//         credentials: "include",
//       });
//       console.log(res);
//       if (!res.ok) throw new Error("レスポンスエラーが発生");
//       const data = await res.json();
//       console.log(data);
//       setMyCompany(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const contextValue = {
//     myCompany,
//   };

//   useEffect(() => {
//     console.log("a");
//     fetchMyCompany();
//   }, []);

//   return (
//     <CompanyContext.Provider value={contextValue}>
//       {children}
//     </CompanyContext.Provider>
//   );
// };
