import { API_BASE_URL } from "@/components/lib/api";
import { OrderTransformed } from "@/types/company";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  const result: OrderTransformed[] = await res.json();
  return result;
};

export const useFetchConfirmedList = () => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/company/orders?is_confirmed=true`,
    fetcher,
  );
  return {
    data,
    isLoading,
    isError: error,
  };
};
