"use client";

import { CartContextProvider } from "./cart-context";

export const CartContextClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // return <p>a</p>;
  return <CartContextProvider>{children}</CartContextProvider>;
};
