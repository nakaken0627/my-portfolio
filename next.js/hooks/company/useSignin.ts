import { API_BASE_URL } from "@/components/lib/api";
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
    const error: CustomError = new Error("ログインエラーが発生");
    error.info = await res.json();
    throw error;
  }

  return res;
};

export const useSignin = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/auth/company/login`,
    fetcher,
  );

  return {
    trigger,
    isMutating,
  };
};
