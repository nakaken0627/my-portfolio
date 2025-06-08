import { API_BASE_URL } from "@/lib/api";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

const fetcher = async (url: string, { arg }: { arg: number[] }) => {
  await fetch(url, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ confirmedIds: arg }),
  });
};

export const useConfirmedOrders = () => {
  const { trigger } = useSWRMutation(
    `${API_BASE_URL}/api/company/orders/confirmed`,
    fetcher,
    {
      onSuccess: async () => {
        await mutate(
          `${API_BASE_URL}/api/company/orders?is_confirmed=false`,
          undefined,
          { revalidate: true },
        );
      },
    },
  );
  return { trigger };
};
