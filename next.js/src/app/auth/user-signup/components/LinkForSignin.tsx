import Link from "next/link";
import { Typography } from "@mui/material";

export const LinkForSignin = () => {
  return (
    <Typography variant="body2" align="center">
      すでにアカウントをお持ちの方は{" "}
      <Link
        href="/auth/user-signin"
        style={{ color: "#1976d2", textDecoration: "none" }}
      >
        ログインはこちら
      </Link>
    </Typography>
  );
};
