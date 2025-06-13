"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFetchCart } from "@/hooks/user/useFetchCart";
import { useFetchCartProducts } from "@/hooks/user/useFetchCartProducts";
import { API_BASE_URL } from "@/lib/api";
import { logger } from "@/lib/logger";

type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

type CartContent = {
  cartId: number | null;
  cartProducts: CartProduct[];
  setCartProducts: Dispatch<SetStateAction<CartProduct[]>>;
  addProduct: (
    productId: number,
    customizationId: number | null,
  ) => Promise<void>;
  reduceProduct: (
    productId: number,
    customizationID: number | null,
  ) => Promise<void>;
  deleteProduct: (
    productId: number,
    customizationID: number | null,
  ) => Promise<void>;
  handleQuantityChange: (
    ProductId: number,
    customizationID: number | null,
    newQuantity: number,
  ) => Promise<void>;
};

export const CartContext = createContext<CartContent | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { cart, isLoadingCart } = useFetchCart();
  const cartId = cart?.id ?? null;
  const { cartItems, isLoadingCartProducts } = useFetchCartProducts(cartId);

  useEffect(() => {
    if (cartItems) {
      setCartProducts(cartItems);
    }
  }, [cartItems]);

  if (isLoadingCart || isLoadingCartProducts) {
    return <div>Loading cart...</div>;
  }

  const sendCartLatestData = async (
    productId: number,
    customizationId: number | null,
    quantity: number,
  ) => {
    if (!cartId) return;
    try {
      await fetch(`${API_BASE_URL}/api/cart/product`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cartId,
          productId,
          customizationId,
          quantity,
        }),
      });
    } catch (err) {
      logger.error(err, {
        component: "CartContextProvider",
        action: "sendCartLatestData",
      });
    }
  };

  const sendCartDeleteProduct = async (
    productId: number,
    customizationId: number | null,
  ) => {
    if (!cartId) return;
    try {
      await fetch(`${API_BASE_URL}/api/cart/products`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cartId,
          productId,
          customizationId,
        }),
      });
    } catch (err) {
      logger.error(err, {
        component: "CartContextProvider",
        action: "sendCartDeleteProduct",
      });
      throw err;
    }
  };

  const isSameProduct = (
    aProductId: number,
    aCustomizationId: number | null,
    bProductId: number,
    bCustomizationId: number | null,
  ): boolean => {
    return (
      aProductId === bProductId &&
      ((aCustomizationId === null && bCustomizationId === null) ||
        aCustomizationId === bCustomizationId)
    );
  };

  const addProduct = async (
    addProductId: number,
    addCustomizationId: number | null,
  ) => {
    let newQuantity = 1;

    setCartProducts((prev) => {
      const existingProduct = prev.find((cartItem) => {
        return isSameProduct(
          cartItem.productId,
          cartItem.customizationId,
          addProductId,
          addCustomizationId,
        );
      });

      newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;

      const updateCart = existingProduct
        ? prev.map((item) => {
            return isSameProduct(
              item.productId,
              item.customizationId,
              addProductId,
              addCustomizationId,
            )
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          })
        : [
            ...prev,
            {
              productId: addProductId,
              customizationId: addCustomizationId,
              quantity: 1,
            },
          ];
      return updateCart;
    });

    await sendCartLatestData(addProductId, addCustomizationId, newQuantity);
  };

  const reduceProduct = async (
    reduceProductId: number,
    reduceCustomizationId: number | null,
  ) => {
    let newQuantity = 0;

    setCartProducts((prev) => {
      const updatedCart = prev.map((item) => {
        if (
          isSameProduct(
            item.productId,
            item.customizationId,
            reduceProductId,
            reduceCustomizationId,
          )
        ) {
          if (typeof item.quantity === "number") {
            newQuantity = Math.max(item.quantity - 1, 0);
            return { ...item, quantity: newQuantity };
          }
        }

        return item;
      });
      return updatedCart;
    });
    await sendCartLatestData(
      reduceProductId,
      reduceCustomizationId,
      newQuantity,
    );
  };

  const deleteProduct = async (
    deleteProductId: number,
    deleteCustomizationId: number | null,
  ) => {
    setCartProducts((prev) => {
      return prev.filter((item) => {
        return !isSameProduct(
          item.productId,
          item.customizationId,
          deleteProductId,
          deleteCustomizationId,
        );
      });
    });
    await sendCartDeleteProduct(deleteProductId, deleteCustomizationId);
  };

  const handleQuantityChange = async (
    targetProductId: number,
    targetCustomizationId: number | null,
    newQuantity: number,
  ) => {
    if (newQuantity < 0) return;
    setCartProducts((prev) => {
      return prev.map((item) =>
        item.productId === targetProductId &&
        item.customizationId === targetCustomizationId
          ? { ...item, quantity: newQuantity }
          : item,
      );
    });
    await sendCartLatestData(
      targetProductId,
      targetCustomizationId,
      newQuantity,
    );
  };

  const contextValue = {
    cartId,
    cartProducts,
    setCartProducts,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    deleteProduct,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
