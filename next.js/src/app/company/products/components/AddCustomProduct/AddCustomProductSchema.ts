import { z } from "zod";

export const AddCustomProductSchema = z
  .object({
    productId: z
      .number({ required_error: "商品IDの入力は必須です" })
      .nullable(),
    userId: z
      .number({ invalid_type_error: "数値で入力してください" })
      .nullable(),
    modelNumber: z.string().nonempty("型番は必須です"),
    productName: z.string().nonempty("商品名は必須です"),
    price: z
      .number({
        required_error: "価格は必須です",
        invalid_type_error: "数値で入力して下さい",
      })
      .int()
      .positive(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })

  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate).getTime();
      const end = new Date(data.endDate).getTime();

      if (start >= end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "適用開始日は適用終了日より前の日付を指定してください",
          path: ["startDate"],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "適用終了日は適用開始日より後の日付を指定してください",
          path: ["endDate"],
        });
      }
    }
  });
