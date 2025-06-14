import { Container, Paper, Typography } from "@mui/material";

import { LinkForSignin } from "./LinkForSignin";
import { SignupForm } from "./SignupForm";

export const SignupPage = () => {
  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          ユーザー新規登録
        </Typography>
        <SignupForm />
        <LinkForSignin />
      </Paper>
    </Container>
  );
};
