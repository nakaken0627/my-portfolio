"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/components/lib/api";
import { loginValidationSchema } from "@/utils/loginValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useLoginSWR } from "hooks/company/useLoginSWR";

type LoginData = {
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
    resolver: zodResolver(loginValidationSchema),
  });

  const router = useRouter();

  const { trigger, isMutating } = useLoginSWR(
    `${API_BASE_URL}/auth/company/login`,
  );

  const onSubmit: SubmitHandler<LoginData> = async (inputData: LoginData) => {
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
        ログイン
      </Button>
    </Box>
  );
};
