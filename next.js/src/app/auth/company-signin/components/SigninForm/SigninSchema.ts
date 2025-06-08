import { z } from "zod";

export const SigninSchema = z.object({
  username: z
    .string()
    .nonempty("IDは必須です")
    .regex(/^[a-zA-Z0-9 -/:-@[-`{-~]+$/, {
      message: "半角英数記号で入力してください",
    }),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(4, "4文字以上で入力して下さい"),
});
