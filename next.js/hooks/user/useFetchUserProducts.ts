import { API_BASE_URL } from "@/components/lib/api";
import { UserProductWithCustom } from "@/types/user";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("レスポンスエラーが発生");
  const result: UserProductWithCustom[] = await res.json();
  return result;
};

export const useFetchUserProducts = () => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/user/products`,
    fetcher,
  );
  return {
    products: data,
    isLoadingProducts: isLoading,
    isErrorProducts: error,
  };
};
