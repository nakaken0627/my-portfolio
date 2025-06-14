import { API_BASE_URL } from "@/lib/api";
import { getCookies } from "@/lib/getCookies";

type OrderProduct = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  quantity: number;
};

type OrderCustom = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

type Transformed = {
  orderId: number;
  products: (OrderProduct & { customization: OrderCustom | null })[];
};

export const fetchOrderServer = async () => {
  const cookie = await getCookies();

  try {
    const response = await fetch(`${API_BASE_URL}/api/user/orders/history`, {
      method: "GET",
      headers: { cookie },
      cache: "no-store",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("レスポンスエラー発生");
    }
    const data: Transformed[] = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};
