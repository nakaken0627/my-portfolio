import { API_BASE_URL } from "@/lib/api";
import { getCookies } from "@/lib/getCookies";

type Company = {
  id: number;
  name: string;
};

export const fetchCompanyServer = async () => {
  const cookie = await getCookies();

  try {
    const response = await fetch(`${API_BASE_URL}/api/company/profile`, {
      method: "GET",
      headers: { cookie },
      cache: "no-store",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("レスポンスエラー発生");
    }
    const data: Company = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};
