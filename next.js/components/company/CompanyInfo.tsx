"use client";

import { Typography } from "@mui/material";
import { useContext } from "react";
import { CompanyContext } from "@/context/company-context";

export const CompanyInfo = () => {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) return <Typography>Loading...</Typography>;

  const { myCompany } = companyContext;
  if (!myCompany) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{myCompany.name}様
    </Typography>
  );
};
