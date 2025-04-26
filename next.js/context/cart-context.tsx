"use client";

import { createContext, useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
};

type CartProduct = {
  productId: number;
  quantity: number;
};

type Product = {
  product_name: string;
  id: number;
  model_number: string;
  price: number;
  description: string;
  company_name: string;
};

type CartContentType = {
  cartProducts: CartProduct[];
  addProduct: (productId: number) => Promise<void>;
  reduceProduct: (productId: number) => Promise<void>;
  handleQuantityChange: (
    targetProductId: number,
    newQuantity: number,
  ) => Promise<void>;
};

export const CartContext = createContext<CartContentType | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myUser, setMyUser] = useState<User | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const fetchMyUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/myuser", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("[cart-context]fetchMyUserでエラー発生");
      }
      const data = await response.json();
      setMyUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyCart = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cart/mycart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: myUser?.id,
        }),
      });
      if (!response.ok) {
        throw new Error("[cart-context]fetchMyCartでエラー発生");
      }
      const data = await response.json();
      setCartId(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/user/productlist",
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("[cart-context]fetchProductsでエラー発生");
      }
      const data = await response.json();
      setProductList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyUser();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (myUser) {
      //確実にmyUserがある状態でないとバックエンド側でnot nullタイプなのにnullの可能性があるためエラーになる
      fetchMyCart();
    }
  }, [myUser]); //myUserが貼ってからfetchMyCartを実行しないとエラーになる

  const addProduct = async (addProductId: number) => {
    setCartProducts((prev) => {
      const isExistingCart = prev.find(
        (cartItem) => cartItem.productId === addProductId,
      );
      if (isExistingCart) {
        return prev.map((item) =>
          item.productId === addProductId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { productId: addProductId, quantity: 1 }];
    });
  };

  const reduceProduct = async (reduceProductId: number) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId === reduceProductId
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item,
      ),
    );
  };

  const handleQuantityChange = async (
    targetProductId: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 0) return;
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId === targetProductId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const calcProductTotalAmount = (productId: number) => {
    const product = productList.find((item) => item.id === productId);
    const cartItem = cartProducts.find((item) => item.productId === productId);
    const quantity = cartItem?.quantity ?? 0; //quantityがundefinedになる可能性を排除する
    return product ? product.price * quantity : 0;
  };

  const calcCartTotalAmount = () => {
    return cartProducts.reduce((total, item) => {
      const product = productList.find((p) => p.id === item.productId);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  const contextValue = {
    myUser,
    cartId,
    productList,
    cartProducts,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    calcProductTotalAmount,
    calcCartTotalAmount,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
