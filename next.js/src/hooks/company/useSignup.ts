import { API_BASE_URL } from "@/lib/api";
import useSWRMutation from "swr/mutation";

type FormData = {
  name: string;
  password: string;
  confirmedPassword: string;
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
    body: JSON.stringify({
      companyName: arg.name,
      companyPassword: arg.password,
    }),
  });
  if (!res.ok) {
    const error: CustomError = new Error();
    error.info = await res.json();
    throw error;
  }
  return res;
};

export const useSignup = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/auth/company/signup`,
    fetcher,
  );

  return {
    trigger,
    isMutating,
  };
};
