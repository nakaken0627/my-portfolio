"use client";

import { Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export const GetUserInfo = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return;

  const { myUser } = cartContext;
  if (!myUser) return null;

  return (
    <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
      ようこそ、{myUser.name}様
    </Typography>
  );
};
