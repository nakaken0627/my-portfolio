import { API_BASE_URL } from "@/components/lib/api";

type User = {
  id: number;
  name: string;
};

export const fetchUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("レスポンスエラー発生");
    }
    const data: User = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};
