import { API_BASE_URL } from "@/components/lib/api";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("レスポンスエラーが発生");
  const result: { id: number } = await res.json();
  return result;
};

export const useFetchCart = () => {
  const { data } = useSWR(`${API_BASE_URL}/api/cart`, fetcher);

  // if (!data) return;

  return {
    cart: data,
  };
};
