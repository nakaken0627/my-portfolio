"use client";

import { CartContextProvider } from "./cart-context";

export const CartContextClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
