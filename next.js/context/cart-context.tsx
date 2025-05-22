"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { API_BASE_URL } from "@/components/lib/api";

type User = {
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

type CartContent = {
  myUser: User | null;
  cartId: { id: number } | null;
  productList: Product[];
  cartProducts: CartProduct[];
  setCartProducts: Dispatch<SetStateAction<CartProduct[]>>;
  getCartLatestData: () => Promise<void>;
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

export const CartContext = createContext<CartContent | null>(null);

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
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("[cart-context]fetchMyUserでエラー発生");
      }
      const data: User = await response.json();
      setMyUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/cart`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("[cart-context]fetchMyCartでエラー発生");
      }
      const data: { id: number } = await response.json();
      setCartId(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/products`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("[cart-context]fetchProductsでエラー発生");
      }
      const data: Product[] = await response.json();
      setProductList(data);
    } catch (err) {
      console.error(err);
    }
  };

  //useEffectで呼び出す際にcartIdとの依存関係がないためwarningとなるのを防ぐため、useCallbackで回避
  const getCartLatestData = useCallback(async () => {
    if (!cartId) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/products?cartId=${String(cartId.id)}`,
        {
          method: "GET",
        },
      );

      const data: CartProduct[] = await response.json();
      setCartProducts(data);
    } catch (err) {
      console.error("cartデータの取得に失敗しました", err);
    }
  }, [cartId]);

  const sendCartLatestData = async (productId: number, quantity: number) => {
    if (!cartId) return;
    try {
      await fetch(`${API_BASE_URL}/api/cart/product/${String(productId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId.id,
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
      await fetch(`${API_BASE_URL}/api/cart/products`, {
        method: "DELETE",
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
    let newQuantity = 1;

    setCartProducts((prev) => {
      const existingProduct = prev.find(
        (cartItem) => cartItem.product_id === addProductId,
      );
      newQuantity = existingProduct ? existingProduct.quantity + 1 : 1;

      const updateCart = existingProduct
        ? prev.map((item) =>
            item.product_id === addProductId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { product_id: addProductId, quantity: 1 }];

      return updateCart;
    });

    await sendCartLatestData(addProductId, newQuantity);
  };

  const reduceProduct = async (reduceProductId: number) => {
    setCartProducts((prev) => {
      return prev.map((item) =>
        item.product_id === reduceProductId
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item,
      );
    });
    const targetItem = cartProducts.find(
      (item) => item.product_id === reduceProductId,
    );
    if (targetItem) {
      const newQuantity = Math.max(targetItem.quantity - 1, 0);
      await sendCartLatestData(reduceProductId, newQuantity);
    }
  };

  const deleteProduct = async (deleteProductId: number) => {
    setCartProducts((prev) => {
      return prev.filter((item) => item.product_id !== deleteProductId);
    });
    await sendCartDeleteProduct(deleteProductId);
  };

  const handleQuantityChange = async (
    targetProductId: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 0) return;
    setCartProducts((prev) => {
      return prev.map((item) =>
        item.product_id === targetProductId
          ? { ...item, quantity: newQuantity }
          : item,
      );
    });
    await sendCartLatestData(targetProductId, newQuantity);
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
    setCartProducts,
    getCartLatestData,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    deleteProduct,
    calcProductTotalAmount,
    calcCartTotalAmount,
  };

  useEffect(() => {
    void fetchMyUser();
    void fetchProducts();
    void fetchMyCart();
  }, []);

  useEffect(() => {
    if (cartId) {
      void getCartLatestData();
    }
  }, [cartId, getCartLatestData]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
