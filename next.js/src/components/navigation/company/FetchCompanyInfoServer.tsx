import { Typography } from "@mui/material";

import { fetchCompanyServer } from "./fetchCompanyServer";

export const FetchCompanyInfoServer = async () => {
  const company = await fetchCompanyServer();
  if (!company) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{company.name === "test" ? "ゲスト" : company.name}様
    </Typography>
  );
};
