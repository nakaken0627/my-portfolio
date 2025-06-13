import { Container, Divider, Paper, Typography } from "@mui/material";

import { GuestLoginFunc } from "./GuestLoginFunc";
import { RouteForSignup } from "./RouteForSignup";
import { SigninForm } from "./SigninForm/SigninForm";

export const SigninPage = () => {
  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Paper elevation={4} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          企業ログイン
        </Typography>
        <SigninForm />

        <RouteForSignup />
        <Divider sx={{ my: 3, opacity: 0.8 }}></Divider>
        <GuestLoginFunc />
      </Paper>
    </Container>
  );
};
