"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const SignupForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [confirmedCompanyPassword, setConfirmedCompanyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (companyPassword !== confirmedCompanyPassword) {
      return setError("パスワードが一致しません");
    }

    try {
      const response = await fetch(
        "http://localhost:3001/auth/company/signup",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName, companyPassword }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/company/mypage");
      } else {
        setError(data.message || "サインアップに失敗しました");
      }
    } catch (error) {
      setError("ネットワークエラーが発生しました");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          企業新規登録
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            required
            id="companyName"
            label="企業ID"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="companyPassword"
            label="パスワード"
            type="password"
            value={companyPassword}
            onChange={(e) => setCompanyPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="confirmedCompanyPassword"
            label="パスワード（確認用）"
            type="password"
            value={confirmedCompanyPassword}
            onChange={(e) => setConfirmedCompanyPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登録
          </Button>
        </Box>

        <Typography variant="body2" align="center">
          すでにアカウントをお持ちの方は{" "}
          <Link
            href="/auth/company-signin"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            ログインはこちら
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
