import { API_BASE_URL } from "@/components/lib/api";
import { UserProductWithCustom } from "@/types/user";
import useSWR from "swr";

type Transform = {
  data: UserProductWithCustom[];
  total: number;
};
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("レスポンスエラーが発生");
  const result: Transform = await res.json();
  return result;
};

export const useFetchPageProducts = (page: number, limit: number) => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/user/products/custom?page=${String(page)}&limit=${String(limit)}`,

    fetcher,
  );

  return {
    result: data,
    isLoading,
    isError: error,
  };
};
