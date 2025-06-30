import Link from "next/link";
import { Typography } from "@mui/material";

export const LinkForSignup = () => {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 2, color: "#4A4A4A" }}>
      アカウントをお持ちでない方は{" "}
      <Link
        href="/auth-pages/user-signup"
        style={{
          color: "#2E7D32",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        新規登録はこちら
      </Link>
    </Typography>
  );
};
