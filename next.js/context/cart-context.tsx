"use client";

import { createContext, useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
};

type CartProduct = {
  product_id: number;
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
  myUser: User | null;
  cartId: { id: number } | null;
  productList: Product[];
  cartProducts: CartProduct[];
  addProduct: (productId: number) => Promise<void>;
  reduceProduct: (productId: number) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  handleQuantityChange: (
    targetProductId: number,
    newQuantity: number,
  ) => Promise<void>;
  calcProductTotalAmount: (productId: number) => number;
  calcCartTotalAmount: () => number;
};

export const CartContext = createContext<CartContentType | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myUser, setMyUser] = useState<User | null>(null);
  const [cartId, setCartId] = useState<{ id: number } | null>(null);
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
    if (!myUser) return;
    try {
      const response = await fetch("http://localhost:3001/api/cart/mycart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: myUser.id,
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

  const getCartLatestData = async () => {
    if (!cartId) return;
    try {
      const response = await fetch(
        "http://localhost:3001/api/cart/getproducts",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart_id: cartId.id,
          }),
        },
      );
      const data = await response.json();
      setCartProducts(data);
    } catch (err) {
      console.error("cartデータの取得に失敗しました", err);
    }
  };

  const sendCartLatestData = async (productId: number, quantity: number) => {
    if (!cartId) return;
    try {
      await fetch("http://localhost:3001/api/cart/updataproduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId.id,
          product_id: productId,
          quantity: quantity,
        }),
      });
    } catch (err) {
      console.error("更新失敗", err);
    }
  };

  const sendCartDeleteProduct = async (productId: number) => {
    if (!cartId) return;
    try {
      await fetch("http://localhost:3001/api/cart/deleteproduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId.id,
          product_id: productId,
        }),
      });
    } catch (err) {
      console.error("削除更新失敗", err);
    }
  };

  const addProduct = async (addProductId: number) => {
    setCartProducts((prev) => {
      const existingProduct = prev.find(
        (cartItem) => cartItem.product_id === addProductId,
      );
      const updateCart = existingProduct
        ? prev.map((item) =>
            item.product_id === addProductId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { product_id: addProductId, quantity: 1 }];

      return updateCart;
    });

    const existingProduct = cartProducts.find(
      (cartItem) => cartItem.product_id === addProductId,
    );
    const newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;
    sendCartLatestData(addProductId, newQuantity);
  };

  const reduceProduct = async (reduceProductId: number) => {
    setCartProducts((prev) => {
      const updateCart = prev.map((item) =>
        item.product_id === reduceProductId
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item,
      );
      const targetItem = prev.find(
        (item) => item.product_id === reduceProductId,
      );
      if (targetItem) {
        const newQuantity = Math.max(targetItem.quantity - 1, 0);
        sendCartLatestData(reduceProductId, newQuantity);
      }
      return updateCart;
    });
  };

  const deleteProduct = async (deleteProductId: number) => {
    setCartProducts((prev) => {
      const updateCart = prev.filter(
        (item) => item.product_id !== deleteProductId,
      );
      sendCartDeleteProduct(deleteProductId);
      return updateCart;
    });
  };

  const handleQuantityChange = async (
    targetProductId: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 0) return;
    setCartProducts((prev) => {
      const updateCart = prev.map((item) =>
        item.product_id === targetProductId
          ? { ...item, quantity: newQuantity }
          : item,
      );
      sendCartLatestData(targetProductId, newQuantity);
      return updateCart;
    });
  };

  const calcProductTotalAmount = (productId: number) => {
    const product = productList.find((item) => item.id === productId);
    const cartItem = cartProducts.find((item) => item.product_id === productId);
    const quantity = cartItem?.quantity ?? 0; //quantityがundefinedになる可能性を排除する
    return product ? product.price * quantity : 0;
  };

  const calcCartTotalAmount = () => {
    return cartProducts.reduce((total, item) => {
      const product = productList.find((p) => p.id === item.product_id);
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
    deleteProduct,
    calcProductTotalAmount,
    calcCartTotalAmount,
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

  useEffect(() => {
    if (cartId) {
      getCartLatestData();
    }
  }, [cartId]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
