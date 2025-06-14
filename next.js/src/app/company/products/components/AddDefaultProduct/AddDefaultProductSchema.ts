import { z } from "zod";

export const AddDefaultProductSchema = z.object({
  modelNumber: z.string().nonempty("型番は必須です"),

  name: z.string().nonempty("商品名は必須です"),

  price: z
    .number({
      required_error: "価格は必須です",
      invalid_type_error: "数値で入力して下さい",
    })
    .int()
    .positive("価格は0より大きい数値で入力してください"),

  description: z.string(),

  imageFile: z
    .union([z.instanceof(File), z.undefined()])
    .refine((file) => !file || file.size > 0, {
      message: "画像ファイルを選択してください。",
    })
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "JPEG, PNG, WEBP形式の画像のみアップロードできます。",
      },
    )
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "画像サイズは5MB以下にしてください。",
    })
    .optional(),
});
