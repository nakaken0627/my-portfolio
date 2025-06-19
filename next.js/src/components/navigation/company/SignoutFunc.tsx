"use client";

import { useRouter } from "next/navigation";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { API_BASE_URL } from "@/lib/api";
import { Button } from "@mui/material";

export const SignoutFunc = () => {
  const router = useRouter();
  const handleError = useErrorHandling();

  const handleClickSignout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/company/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("ログアウト失敗");

      router.push("/auth/company-signin");
    } catch (err) {
      handleError(err, {
        component: "SignoutFunc",
        action: "handleClickSignout",
      });
    }
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleClickSignout}
      sx={{
        backgroundColor: "#B0C4DE",
        color: "#333333",
        fontWeight: "bold",
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#91B0D8",
        },
      }}
    >
      ログアウト
    </Button>
  );
};
