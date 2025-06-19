"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCompanySignin } from "@/hooks/company/useCompanySignin";
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
  const { trigger, isMutating } = useCompanySignin();

  const onSubmit: SubmitHandler<FormData> = async (inputData: FormData) => {
    try {
      await trigger(inputData);
      router.push("/company/mypage");
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
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="username"
            label="企業ID"
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            focused
            color="info"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="companyPassword"
            label="パスワード"
            type="password"
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            focused
            color="info"
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isMutating}
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#0000CD",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#00008B",
          },
        }}
      >
        ログイン
      </Button>
    </Box>
  );
};
