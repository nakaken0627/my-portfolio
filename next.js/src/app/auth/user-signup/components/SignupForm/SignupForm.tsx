"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserSignup } from "@/hooks/user/useUserSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";

import { SignupSchema } from "./SignupSchema";

type FormData = {
  name: string;
  password: string;
  confirmedPassword: string;
};

type CustomError = Error & {
  info?: { message: string };
};

export const SignupForm = () => {
  const { handleSubmit, control } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { name: "", password: "", confirmedPassword: "" },
    resolver: zodResolver(SignupSchema),
  });

  const router = useRouter();
  const { trigger, isMutating } = useUserSignup();

  const onSubmit: SubmitHandler<FormData> = async (inputData: FormData) => {
    try {
      await trigger(inputData);
      router.push("/user/dashboard");
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "新規登録に失敗しました");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ユーザーID */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="name"
            label="ユーザーID"
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            focused
            color="success"
          />
        )}
      />

      {/* パスワード */}
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

      {/* パスワード確認 */}
      <Controller
        name="confirmedPassword"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="confirmedPassword"
            label="パスワード（確認用）"
            type="password"
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            focused
            color="success"
          />
        )}
      />

      {/* 登録ボタン */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isMutating}
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
      >
        登録
      </Button>
    </Box>
  );
};
