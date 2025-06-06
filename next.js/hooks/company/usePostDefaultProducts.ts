import { API_BASE_URL } from "@/components/lib/api";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

type FormInput = {
  modelNumber: string;
  productName: string;
  price: number;
  description: string;
  imageFile?: File;
};

type CustomError = Error & {
  info?: { message: string };
};

const fetcher = async (url: string, { arg }: { arg: FormInput }) => {
  const formData = new FormData();
  // if (!arg.imageFile) return;
  formData.append("model_number", arg.modelNumber);
  formData.append("name", arg.productName);
  formData.append("price", arg.price.toString());
  formData.append("description", arg.description);

  if (arg.imageFile) {
    formData.append("image", arg.imageFile);
  }
  // formData.append("image", arg.imageFile);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const error: CustomError = new Error("登録に失敗しました");
    error.info = await res.json();
    throw error;
  }
  return res;
};

export const usePostDefaultProducts = () => {
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
