"use client";

import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";

type Company = {
  id: number;
  name: string;
};

type Product = {
  company_name: string;
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
};

type CompanyContext = {
  myCompany: Company | null;
  myProducts: Product[];
  fetchMyProducts: () => Promise<void>;
};

export const CompanyContext = createContext<CompanyContext | null>(null);

export const CompanyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myCompany, setMyCompany] = useState<Company | null>(null);
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  const fetchMyCompany = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/company/profile`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("レスポンスエラーが発生");
      const data = await res.json();
      setMyCompany(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/company/products`, {
        method: "GET",
        credentials: "include", //cookieデータをつけて送る
      });
      if (!res.ok) {
        throw new Error("[MyCompanyPage]レスポンスエラー(products)");
      }
      const data = await res.json();
      // console.log("[MyCompanyPage]myCompanyデータ取得成功", data);
      setMyProducts(data);
    } catch (err) {
<<<<<<< Updated upstream
      console.error("[MycompanyPage]myCompanyデータ取得エラー", err);
=======
      console.error(err);
    }
  };

  const fetchMyCustomProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/company/custom-products`, {
        method: "GET",
        credentials: "include", //cookieデータをつけて送る
      });
      if (!res.ok) {
        throw new Error("[MyCompanyPage]レスポンスエラー(products)");
      }
      const data: CustomProduct[] = await res.json();
      setMyCustomProducts(data);
    } catch (err) {
      console.error(err);
>>>>>>> Stashed changes
    }
  };

  useEffect(() => {
    fetchMyCompany();
  }, []);

  useEffect(() => {
    fetchMyProducts();
  }, [myCompany]);

  const contextValue = {
    myCompany,
    myProducts,
    fetchMyProducts,
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
