import { API_BASE_URL } from "@/lib/api";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

const fetcher = async (url: string, { arg }: { arg: number[] }) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productIds: arg }),
  });
  if (!res.ok) throw new Error("正常に完了しませんでした");
  return res;
};

export const useDeleteProducts = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/api/company/products`,
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
