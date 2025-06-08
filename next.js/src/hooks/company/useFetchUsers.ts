import { API_BASE_URL } from "@/lib/api";
import useSWR from "swr";

type User = {
  id: number;
  name: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  const result: User[] = await res.json();
  return result;
};

export const useFetchUsers = () => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/company/users`,
    fetcher,
  );
  return {
    users: data,
    isErrorUsers: error,
    isLoadingUsers: isLoading,
  };
};
