import { z } from "zod";

export const loginValidationSchema = z.object({
  username: z.string().nonempty("IDは必須です"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(4, "4文字以上で入力して下さい"),
});
