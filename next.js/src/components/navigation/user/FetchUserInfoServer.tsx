import { Typography } from "@mui/material";

import { fetchUserServer } from "./fetchUserServer";

export const FetchUserInfoServer = async () => {
  const user = await fetchUserServer();
  if (!user) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{user.name === "test" ? "ゲスト" : user.name}様
    </Typography>
  );
};
