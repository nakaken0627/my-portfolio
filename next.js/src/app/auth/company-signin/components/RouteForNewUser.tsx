import Link from "next/link";
import { Typography } from "@mui/material";

export const RouteForNewUser = () => {
  return (
    <Typography variant="body2" align="center">
      アカウントをお持ちでない方は{" "}
      <Link
        href="/auth/company-signup"
        style={{ color: "#1976d2", textDecoration: "none" }}
      >
        新規登録はこちら
      </Link>
    </Typography>
  );
};
