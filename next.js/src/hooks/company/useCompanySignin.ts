import { API_BASE_URL } from "@/lib/api";
import useSWRMutation from "swr/mutation";

type FormData = {
  username: string;
  password: string;
};

type CustomError = Error & {
  info?: { message: string };
};

const fetcher = async (url: string, { arg }: { arg: FormData }) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const error: CustomError = new Error("ログイン時にエラーが発生しました");
    error.info = await res.json();
    throw error;
  }

  return res;
};

export const useCompanySignin = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/auth/company/signin`,
    fetcher,
  );

  return {
    trigger,
    isMutating,
  };
};
