import useSWRMutation from "swr/mutation";

type LoginData = {
  username: string;
  password: string;
};

type CustomError = Error & {
  info?: { message: string };
};

const fetcher = async (url: string, { arg }: { arg: LoginData }) => {
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

export const useLoginSWR = (url: string) => {
  const { trigger, isMutating } = useSWRMutation(url, fetcher);

  return {
    trigger,
    isMutating,
  };
};
