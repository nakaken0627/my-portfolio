"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import { Typography } from "@mui/material";

export const GetUserInfo = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return;

  const { myUser } = cartContext;
  if (!myUser) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{myUser.name === "test" ? "ゲスト" : myUser.name}様
    </Typography>
  );
};
