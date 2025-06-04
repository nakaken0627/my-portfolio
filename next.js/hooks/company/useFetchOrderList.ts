import { API_BASE_URL } from "@/components/lib/api";
import { OrderTransformed } from "@/types/company";
import useSWR from "swr";

const fetcher = async (url: string): Promise<OrderTransformed[]> => {
  const res = await fetch(url, {
    credentials: "include",
  });
  const result: Promise<OrderTransformed[]> = res.json();
  return result;
};

export const useFetchOrderList = () => {
  const { data, error, isLoading } = useSWR<OrderTransformed[]>(
    `${API_BASE_URL}/api/company/orders?is_confirmed=false`,
    fetcher,
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};
