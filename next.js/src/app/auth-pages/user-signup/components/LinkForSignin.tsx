import Link from "next/link";
import { Typography } from "@mui/material";

export const LinkForSignin = () => {
  return (
    <Typography variant="body2" align="center">
      すでにアカウントをお持ちの方は
      <Link
        href="/auth-pages/user-signin"
        style={{
          color: "#2E7D32",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        ログインはこちら
      </Link>
    </Typography>
  );
};
