import { Box, Container, Paper, Typography } from "@mui/material";

import { LinkForSignin } from "./LinkForSignin";
import { SignupForm } from "./SignupForm/SignupForm";

export const SignupPage = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={4}
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
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "#4A4A4A" }}
          >
            企業新規登録
          </Typography>
          <SignupForm />
          <LinkForSignin />
        </Paper>
      </Container>
    </Box>
  );
};
