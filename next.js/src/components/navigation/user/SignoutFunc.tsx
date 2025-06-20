import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { logger } from "@/lib/logger";
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
      logger.error(err, {
        component: "SignoutFunc",
        action: "handleClickSignout",
      });
      throw err;
    }
  };

  return (
    <Button
      variant="contained"
      size="small"
      onClick={handleClickSignout}
      sx={{
        backgroundColor: "#A5C8B1",
        color: "#333333",
        fontWeight: "bold",
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#8CB39A",
        },
      }}
    >
      ログアウト
    </Button>
  );
};
