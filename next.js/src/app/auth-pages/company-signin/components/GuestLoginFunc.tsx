"use client";

import { useRouter } from "next/navigation";
import { useCompanySignin } from "@/hooks/company/useCompanySignin";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Button, Tooltip } from "@mui/material";

type CustomError = Error & {
  info?: { message: string };
};

export const GuestLoginFunc = () => {
  const router = useRouter();
  const { trigger, isMutating } = useCompanySignin();

  const handleGuestLogin = async () => {
    try {
      await trigger({ username: "test", password: "test" });
      router.push("/company/inbox");
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "ログインに失敗しました");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Tooltip title="登録なしですぐに試せます" arrow>
        <Button
          onClick={handleGuestLogin}
          fullWidth
          startIcon={<PersonOutlineIcon />}
          disabled={isMutating}
          sx={{
            fontWeight: "bold",
            border: "2px solid #0000CD",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#D0E2F0",
            },
          }}
        >
          ゲストとして試す
        </Button>
      </Tooltip>
    </Box>
  );
};
