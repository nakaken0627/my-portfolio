"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserSignin } from "@/hooks/user/useUserSignin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";

import { SigninSchema } from "./SigninSchema";

type FormData = {
  username: string;
  password: string;
};

type CustomError = Error & {
  info?: { message: string };
};

export const SigninForm = () => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(SigninSchema),
  });

  const router = useRouter();
  const { trigger, isMutating } = useUserSignin();

  const onSubmit: SubmitHandler<FormData> = async (inputData) => {
    try {
      await trigger(inputData);
      router.push("/user/dashboard");
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "ログインに失敗しました");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="username"
            label="ユーザーID"
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            focused
            color="success"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="password"
            label="パスワード"
            type="password"
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            focused
            color="success"
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#E6F4EA",
          color: "#333333",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#C8E6C9",
          },
        }}
        disabled={isMutating}
      >
        ログイン
      </Button>
    </Box>
  );
};
