"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
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

import { GuestLoginFunc } from "./GuestLoginFunc";

export const SigninForm = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });

      const data: { message: string } = await response.json();

      if (response.ok) {
        router.push("/user/dashboard");
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
          ユーザーログイン
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
            id="username"
            label="ユーザー名"
            value={inputUsername}
            onChange={(e) => {
              setInputUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="password"
            label="パスワード"
            type="password"
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
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
            href="/auth/user-signup"
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
