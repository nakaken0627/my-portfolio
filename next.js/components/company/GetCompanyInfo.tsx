"use client";

import { useContext } from "react";
import { CompanyContext } from "@/context/company-context";
import {
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const GetCompanyInfo = () => {
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
