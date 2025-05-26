"use client";

import { useContext } from "react";
import { CompanyContext } from "@/context/company-context";
import { Typography } from "@mui/material";

export const CompanyInfo = () => {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) return <Typography>Loading...</Typography>;

  const { myCompany } = companyContext;
  if (!myCompany) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{myCompany.name === "test" ? "ゲスト" : myCompany.name}様
    </Typography>
  );
};
