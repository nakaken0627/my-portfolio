// "use client";

import { Typography } from "@mui/material";

import { fetchUser } from "./fetchUser";

export const GetUserInfo = async () => {
  const myUser = await fetchUser();
  if (!myUser) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{myUser.name === "test" ? "ゲスト" : myUser.name}様
    </Typography>
  );
};
