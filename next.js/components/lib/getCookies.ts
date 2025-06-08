import { cookies } from "next/headers";

export const getCookies = async () => {
  const cookiesObject = await cookies(); // 非同期で取得
  const cookie = cookiesObject
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return cookie;
};
