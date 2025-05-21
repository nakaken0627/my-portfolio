"use client";

import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { DefaultProduct } from "@/types/company";

type Company = {
  id: number;
  name: string;
};

type CompanyContext = {
  myCompany: Company | null;
  companyCustomProducts: DefaultProduct[];
  fetchCompanyCustomProducts: () => Promise<void>;
};

export const CompanyContext = createContext<CompanyContext | null>(null);

export const CompanyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myCompany, setMyCompany] = useState<Company | null>(null);
  const [companyCustomProducts, setCompanyCustomProducts] = useState<
    DefaultProduct[]
  >([]);

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

  const fetchCompanyCustomProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/company/products/custom`, {
        method: "GET",
        credentials: "include", //cookieデータをつけて送る
      });
      if (!res.ok) {
        throw new Error("レスポンスエラー");
      }
      const data: DefaultProduct[] = await res.json();
      setCompanyCustomProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    void fetchMyCompany();
  }, []);

  useEffect(() => {
    void fetchCompanyCustomProducts();
  }, [myCompany]);

  const contextValue = {
    myCompany,
    companyCustomProducts,
    fetchCompanyCustomProducts,
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
