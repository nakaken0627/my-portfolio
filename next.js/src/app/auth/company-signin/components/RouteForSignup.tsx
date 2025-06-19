import Link from "next/link";
import { Typography } from "@mui/material";

export const RouteForSignup = () => {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 2, color: "#4A4A4A" }}>
      アカウントをお持ちでない方は{" "}
      <Link
        href="/auth/company-signup"
        style={{
          color: "#0000CD",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        新規登録はこちら
      </Link>
    </Typography>
  );
};
