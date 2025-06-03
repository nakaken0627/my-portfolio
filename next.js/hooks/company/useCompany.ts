import { OrderTransformed } from "@/types/company";
import useSWR from "swr";

const fetcher = async (url: string): Promise<OrderTransformed[]> => {
  const res = await fetch(url, {
    credentials: "include",
  });
  const result: Promise<OrderTransformed[]> = res.json();
  return result;
};

export const useCompany = (url: string) => {
  const { data, error, isLoading } = useSWR<OrderTransformed[]>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};
