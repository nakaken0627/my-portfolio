"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const SignoutFunc = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickLogout = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/company/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("ログアウト失敗");

      router.push("/auth/company-signin");
    } catch (err) {
      console.error("[SignoutFunc] 通信エラー", err);
    }
  };

  // モバイル時はDrawer内で使いやすいListItemButtonに切り替え
  return (
    // isMobile ? (
    //   <ListItemButton onClick={handleClickLogout}>
    //     <ListItemText primary="ログアウト" sx={{ justifyContent: "center" }} />
    //   </ListItemButton>
    // ) : (
    <Button
      color="inherit"
      variant="outlined"
      size="small"
      onClick={handleClickLogout}
      sx={{ ml: 2 }}
    >
      ログアウト
    </Button>
  );
};
