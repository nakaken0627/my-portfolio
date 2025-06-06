import { API_BASE_URL } from "@/components/lib/api";
import { ProductWithCustomization } from "@/types/company";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("レスポンスエラーが発生");
  const result: ProductWithCustomization[] = await res.json();
  return result;
};

export const useFetchProducts = () => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/company/products/custom`,
    fetcher,
  );
  return {
    products: data,
    isLoadingProducts: isLoading,
    isErrorProducts: error,
  };
};
