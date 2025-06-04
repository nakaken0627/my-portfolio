import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().nonempty("ユーザーIDは必須です"),
    password: z
      .string()
      .nonempty("パスワードの入力は必須です")
      .min(4, "4文字以上で入力して下さい"),
    confirmedPassword: z
      .string()
      .nonempty("確認用パスワードの入力は必須です")
      .min(4, "確認用パスワードを入力して下さい"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "パスワードが一致しません",
    path: ["confirmedPassword"],
  });
