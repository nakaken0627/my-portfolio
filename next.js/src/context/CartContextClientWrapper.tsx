"use client";

import { CartContextProvider } from "./CartContext";

export const CartContextClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
