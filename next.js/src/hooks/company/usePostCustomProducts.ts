import { API_BASE_URL } from "@/lib/api";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

type FormData = {
  productId: number | null;
  userId: number | null;
  modelNumber: string;
  productName: string;
  price: number | null;
  description: string;
  startDate: string | null;
  endDate: string | null;
};

type CustomError = Error & {
  info?: { message: string };
};

const fetcher = async (url: string, { arg }: { arg: FormData }) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: arg.productId,
      userId: arg.userId,
      modelNumber: arg.modelNumber,
      productName: arg.productName,
      price: arg.price,
      description: arg.description,
      startDate: arg.startDate !== "" ? arg.startDate : null,
      endDate: arg.endDate !== "" ? arg.endDate : null,
    }),
  });
  if (!res.ok) {
    const error: CustomError = new Error("登録に失敗しました");
    error.info = await res.json();
    throw error;
  }
  return res;
};

export const usePostCustomProducts = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/api/company/products/custom`,
    fetcher,
    {
      onSuccess: async () => {
        await mutate(`${API_BASE_URL}/api/company/products/custom`, undefined, {
          revalidate: true,
        });
      },
    },
  );
  return { trigger, isMutating };
};
