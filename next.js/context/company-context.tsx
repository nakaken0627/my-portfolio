"use client";

import { createContext, useEffect, useState } from "react";

type Company = {
  id: number;
  name: string;
};

type Product = {
  custom_product_id: number;
  company_name: string;
  product_id: number;
  custom_product_name: string;
  custom_model_number: string;
  user_name: string;
  custom_price: number;
  custom_description: string;
  start_date: string;
  end_date: string;
};

type CompanyContext = {
  myCompany: Company | null;
  myProducts: Product[];
  fetchMyProducts: () => Promise<void>;
  fetchMyCustomProducts: () => Promise<void>;
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
      const res = await fetch("http://localhost:3001/api/company/mycompany", {
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
      const res = await fetch(
        "http://localhost:3001/api/company/myproductlist",
        {
          method: "GET",
          credentials: "include", //cookieデータをつけて送る
        },
      );
      if (!res.ok) {
        throw new Error("[MyCompanyPage]レスポンスエラー(products)");
      }
      const data: Product[] = await res.json();
      setMyProducts(data);
    } catch (err) {
      console.error("[MycompanyPage]myCompanyデータ取得エラー", err);
    }
  };

  const fetchMyCustomProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/company/mycustomproductlist",
        {
          method: "GET",
          credentials: "include", //cookieデータをつけて送る
        },
      );
      if (!res.ok) {
        throw new Error("[MyCompanyPage]レスポンスエラー(products)");
      }
      const data: Product[] = await res.json();
      setMyProducts(data);
    } catch (err) {
      console.error("[MycompanyPage]myCompanyデータ取得エラー", err);
    }
  };

  useEffect(() => {
    void fetchMyCompany();
  }, []);

  useEffect(() => {
    void fetchMyCustomProducts();
  }, [myCompany]);

  const contextValue = {
    myCompany,
    myProducts,
    fetchMyProducts,
    fetchMyCustomProducts,
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
