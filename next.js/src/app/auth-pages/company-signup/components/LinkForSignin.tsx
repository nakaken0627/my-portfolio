import Link from "next/link";
import { Typography } from "@mui/material";

export const LinkForSignin = () => {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 2, color: "#4A4A4A" }}>
      すでにアカウントをお持ちの方は{" "}
      <Link
        href="/auth-pages/company-signin"
        style={{
          color: "#0000CD",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        ログインはこちら
      </Link>
    </Typography>
  );
};
