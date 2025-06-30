import { Box, Container, Divider, Paper, Typography } from "@mui/material";

import { GuestLoginFunc } from "./GuestLoginFunc";
import { RouteForSignup } from "./RouteForSignup";
import { SigninForm } from "./SigninForm/SigninForm";

export const SigninPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            px: 4,
            py: 5,
            borderRadius: 3,
            border: "1px solid #D3D3D3",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#4A4A4A" }}
          >
            企業ログイン
          </Typography>

          <SigninForm />

          <RouteForSignup />

          <Divider sx={{ my: 3, opacity: 0.5 }} />

          <GuestLoginFunc />
        </Paper>
      </Container>
    </Box>
  );
};
