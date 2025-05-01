"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export const GetUserInfo = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return;

  const { myUser } = cartContext;

  return <h1>ようこそ、{myUser?.name}様</h1>;
};
