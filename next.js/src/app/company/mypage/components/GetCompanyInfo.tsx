"use client";

import { useContext } from "react";
import { CompanyContext } from "@/context/company-context";

export const GetCompanyInfo = () => {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) return <div>Loading...</div>;

  const { myCompany } = companyContext;
  if (!myCompany) return;

  return <div>ようこそ、{myCompany.name}様</div>;
};
