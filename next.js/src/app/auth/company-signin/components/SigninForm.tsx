"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/components/lib/api";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { GuestLoginFunc } from "../components/GuestLoginFunc";

export const SigninForm = () => {
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [inputCompanyPassword, setInputCompanyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/company/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputCompanyName,
          password: inputCompanyPassword,
        }),
      });

      const data: { message: string } = await response.json();

      if (response.ok) {
        router.push("/company/mypage");
      } else {
        setError(data.message || "ログインに失敗しました");
      }
    } catch (err) {
      setError("ネットワークエラーが発生しました");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          企業ログイン
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
            value={inputCompanyName}
            onChange={(e) => {
              setInputCompanyName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="companyPassword"
            label="パスワード"
            type="password"
            value={inputCompanyPassword}
            onChange={(e) => {
              setInputCompanyPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
        </Box>
        <Typography variant="body2" align="center">
          アカウントをお持ちでない方は{" "}
          <Link
            href="/auth/company-signup"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            新規登録はこちら
          </Link>
        </Typography>
        <Divider sx={{ my: 3, opacity: 0.8 }}></Divider>
        <GuestLoginFunc />
      </Paper>
    </Container>
  );
};
