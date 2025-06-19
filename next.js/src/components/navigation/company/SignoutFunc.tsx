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
      variant="outlined"
      size="small"
      onClick={handleClickSignout}
      sx={{
        borderColor: "#B0C4DE",
        color: "#333",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#E6F0FA",
          borderColor: "#A2BBD7",
        },
      }}
    >
      ログアウト
    </Button>
  );
};
