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
      const data: Company = await res.json();
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
      const data: Product[] = await res.json();
      setMyProducts(data);
    } catch (err) {}
  };

  useEffect(() => {
    void fetchMyCompany();
  }, []);

  useEffect(() => {
    void fetchMyProducts();
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
