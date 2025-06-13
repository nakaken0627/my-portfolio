import { API_BASE_URL } from "@/lib/api";
import useSWR from "swr";

type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("レスポンスエラーが発生");
  const result: CartProduct[] = await res.json();
  return result;
};

export const useFetchCartProducts = (cartId: number | null) => {
  const isFetch = typeof cartId === "number";
  const { data, error, isLoading } = useSWR(
    isFetch
      ? `${API_BASE_URL}/api/cart/products?cartId=${String(cartId)}`
      : null,
    fetcher,
  );

  return {
    cartItems: data,
    isLoadingCartProducts: isLoading,
    isErrorCartProducts: error,
  };
};
