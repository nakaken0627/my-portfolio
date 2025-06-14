import { API_BASE_URL } from "@/lib/api";
import { getCookies } from "@/lib/getCookies";
import { Transformed } from "@/types/user";

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
