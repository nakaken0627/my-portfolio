import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .nonempty("ユーザーIDの入力は必須です")
      .regex(/^[a-zA-Z0-9 -/:-@[-`{-~]+$/, {
        message: "半角英数記号で入力してください",
      }),
    password: z
      .string()
      .nonempty("パスワードの入力は必須です")
      .min(4, "4文字以上で入力して下さい"),
    confirmedPassword: z.string().nonempty("確認用パスワードの入力は必須です"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "パスワードが一致しません",
    path: ["confirmedPassword"],
  });
