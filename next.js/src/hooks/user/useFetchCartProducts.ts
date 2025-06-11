import { API_BASE_URL } from "@/lib/api";
import useSWR from "swr";

type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

const fetcher = async (url: string) => {
  // console.log("url", url);
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("レスポンスエラーが発生");
  const result: CartProduct[] = await res.json();
  return result;
};

export const useFetchCartProducts = (cartId: number | null) => {
  const isFetch = typeof cartId === "number";
  // console.log("isFetch", isFetch, "cartId", cartId);

  const { data, error, isLoading } = useSWR(
    isFetch
      ? `${API_BASE_URL}/api/cart/products?cartId=${String(cartId)}`
      : null,
    fetcher,
  );

  // console.log(`${API_BASE_URL}/api/cart/products?cartId=${String(cartId)}`);
  // console.log("data", data);

  return {
    cartItems: data,
    isLoadingCartProducts: isLoading,
    isErrorCartProducts: error,
  };
};
