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
import { DefaultProductWithCustomization } from "@/types/company";

type User = {
  id: number;
  name: string;
};

type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

type CartContent = {
  myUser: User | null;
  cartId: { id: number } | null;
  productWithCustomList: DefaultProductWithCustomization[];
  cartProducts: CartProduct[];
  setCartProducts: Dispatch<SetStateAction<CartProduct[]>>;
  getCartLatestData: () => Promise<void>;
  addProduct: (
    productId: number,
    customizationID: number | null,
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
  calcProductTotalAmount: (
    productId: number,
    customizationID: number | null,
  ) => number;
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
  const [productWithCustomList, setProductWithCustomList] = useState<
    DefaultProductWithCustomization[]
  >([]);
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
      const data: DefaultProductWithCustomization[] = await response.json();
      setProductWithCustomList(data);
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
          cartId: cartId.id,
          productId,
          customizationId,
          quantity,
        }),
      });
    } catch (err) {
      console.error("更新失敗", err);
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
          cartId: cartId.id,
          productId,
          customizationId,
        }),
      });
    } catch (err) {
      console.error("削除更新失敗", err);
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

    // console.log(cartProducts);

    setCartProducts((prev) => {
      const existingProduct = prev.find((cartItem) => {
        // console.log(cartItem);
        return isSameProduct(
          cartItem.productId,
          cartItem.customizationId,
          addProductId,
          addCustomizationId,
        );
        // console.log("比較対象:", {
        //   id1: cartItem.productId,
        //   customizationId1: cartItem.customizationId,
        //   id2: addProductId,
        //   customizationId2: addCustomizationId,
        // });
      });

      // console.log(existingProduct);

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

        return true;
      });
    });
    // setCartProducts((prev) => {
    //   return prev.filter((item) => {
    //     if (deleteCustomizationId === null) {
    //       return item.productId !== deleteProductId;
    //     } else {
    //       return !(
    //         item.productId === deleteProductId &&
    //         item.customizationId === deleteCustomizationId
    //       );
    //     }
    //   });
    // });
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

  const calcProductTotalAmount = (
    productId: number,
    customizationId: number | null,
  ) => {
    const product = productWithCustomList.find((item) => item.id === productId);
    if (!product) return 0;

    const cartItem = cartProducts.find(
      (item) =>
        item.productId === productId &&
        (item.customizationId ?? null) === customizationId,
    );
    const quantity = cartItem?.quantity ?? 0; //quantityがundefinedになる可能性を排除する

    if (customizationId === null) {
      return product.price * quantity;
    }

    const customization = product.customization.find(
      (custom) => custom.id === customizationId,
    );
    if (!customization) return 0;
    return customization.price * quantity;
  };

  const calcCartTotalAmount = () => {
    return cartProducts.reduce((total, item) => {
      const product = productWithCustomList.find(
        (p) => p.id === item.productId,
      );
      if (!product) return total;

      const custom =
        item.customizationId !== null
          ? product.customization.find((c) => c.id === item.customizationId)
          : null;

      const targetPrice = custom ? custom.price : product.price;

      return total + targetPrice * item.quantity;
    }, 0);
  };

  const contextValue = {
    myUser,
    cartId,
    productWithCustomList,
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
