"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const SignoutFunc = () => {
  const router = useRouter();

  const handleClickSignout = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/company/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("ログアウト失敗");

      router.push("/auth/company-signin");
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
