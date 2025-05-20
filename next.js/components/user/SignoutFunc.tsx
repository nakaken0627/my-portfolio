"use client";

import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/components/lib/api";
import { Button } from "@mui/material";

export const SignoutFunc = () => {
  const router = useRouter();

  const handleClickSignout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/user/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("ログアウト失敗");

      router.push("/auth/user-signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      color="inherit"
      variant="outlined"
      size="small"
      onClick={handleClickSignout}
      sx={{ ml: 2 }}
    >
      ログアウト
    </Button>
  );
};
