"use client";

import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { DefaultProduct } from "@/types/company";

type Company = {
  id: number;
  name: string;
};

type Product = {
  product_id: number;
  product_name: string;
  model_number: string;
  default_price: number;
  description: string;
};

type CustomProduct = {
  customization_id: number;
  product_id: number;
  user_name: string;
  model_number: string;
  display_name: string;
  display_price: number;
  description: string;
  start_date: string;
  end_date: string;
};

type CompanyContext = {
  myCompany: Company | null;
  myProducts: Product[];
  myCustomProducts: CustomProduct[];
  companyCustomProducts: DefaultProduct[];
  fetchMyProducts: () => Promise<void>;
  fetchMyCustomProducts: () => Promise<void>;
  fetchCompanyCustomProducts: () => Promise<void>;
};

export const CompanyContext = createContext<CompanyContext | null>(null);

export const CompanyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myCompany, setMyCompany] = useState<Company | null>(null);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myCustomProducts, setMyCustomProducts] = useState<CustomProduct[]>([]);
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
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyCustomProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/company/products/all`, {
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
    void fetchMyProducts();
    void fetchMyCustomProducts();
    void fetchCompanyCustomProducts();
  }, [myCompany]);

  const contextValue = {
    myCompany,
    myProducts,
    myCustomProducts,
    companyCustomProducts,
    fetchMyProducts,
    fetchMyCustomProducts,
    fetchCompanyCustomProducts,
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
