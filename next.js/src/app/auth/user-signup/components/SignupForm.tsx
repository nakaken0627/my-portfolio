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
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmedPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data: { message: string } = await response.json();

      if (response.ok) {
        router.push("/user/mypage");
      } else {
        setError(data.message || "サインアップに失敗しました");
      }
    } catch (err) {
      setError("ネットワークエラー");
      console.error(err);
    }

    setUsername("");
    setPassword("");
    setConfirmedPassword("");
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          ユーザー新規登録
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
            label="ユーザーID"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="password"
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            id="confirmedPassword"
            label="パスワード（確認用）"
            type="password"
            value={confirmedPassword}
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
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
            href="/auth/user-signin"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            ログインはこちら
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
