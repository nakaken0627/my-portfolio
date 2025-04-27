"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export function GetUserInfo() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return; //cartContextの戻り値があることを確実にするために必要
  }

  const { myUser } = cartContext;

  return (
    <>
      <h1>ようこそ、{myUser?.name}様</h1>
    </>
  );
}
