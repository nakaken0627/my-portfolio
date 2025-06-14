import Link from "next/link";
import { Typography } from "@mui/material";

export const LinkForSignup = () => {
  return (
    <Typography variant="body2" align="center">
      アカウントをお持ちでない方は{" "}
      <Link
        href="/auth/user-signup"
        style={{ color: "#1976d2", textDecoration: "none" }}
      >
        新規登録はこちら
      </Link>
    </Typography>
  );
};
