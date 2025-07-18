import { API_BASE_URL } from "@/lib/api";
import { getCookies } from "@/lib/getCookies";
import { logger } from "@/lib/logger";

type Company = {
  id: number;
  name: string;
};

export const fetchCompanyServer = async () => {
  const cookie = await getCookies();

  try {
    const response = await fetch(`${API_BASE_URL}/auth/company/profile`, {
      method: "GET",
      headers: { cookie },
      cache: "no-store",
      credentials: "include",
    });
    if (!response.ok) {
      const errorText = await response.text();
      // サーバーサイドでのエラーログをthrowしてクライアントサイドで確認できるようにする
      logger.error(
        new Error(
          `APIレスポンスエラー: ${String(response.status)} - ${errorText}`,
        ),
        {
          component: "fetchCompanyServer",
          action: "fetchCompanyServer",
          statusCode: response.status,
        },
      );
      throw new Error("会社情報の取得に失敗しました。");
    }
    const data: Company = await response.json();
    return data;
  } catch (err) {
    logger.error(err, {
      component: "fetchCompanyServer",
      action: "fetchCompanyServer",
    });
    throw err;
  }
};
