"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useSignup } from "hooks/company/useSignup";

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
  const { trigger, isMutating } = useSignup();

  const onSubmit: SubmitHandler<FormData> = async (inputData: FormData) => {
    try {
      await trigger(inputData);
      router.push("/company/mypage");
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "新規登録に失敗しました");
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="name"
            label="企業ID"
            error={!!error}
            helperText={error?.message}
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
            id="password"
            label="パスワード"
            type="password"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="confirmedPassword"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="confirmedCompanyPassword"
            label="パスワード（確認用）"
            type="password"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isMutating}
      >
        登録
      </Button>
    </Box>
  );
};
