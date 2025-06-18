"use server";

import { cookies } from "next/headers";

export const getCookies = async () => {
  const cookiesObject = await cookies();
  const cookie = cookiesObject
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return cookie;
};
