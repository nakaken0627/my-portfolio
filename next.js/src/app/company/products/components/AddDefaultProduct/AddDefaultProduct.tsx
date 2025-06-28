"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { usePostDefaultProducts } from "@/hooks/company/usePostDefaultProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";

import { AddDefaultProductSchema } from "./AddDefaultProductSchema";

type FormInput = {
  modelNumber: string;
  name: string;
  price: number;
  description: string;
  imageFile?: File;
};

type CustomError = Error & {
  info?: { message: string };
};

export const AddDefaultProduct = () => {
  const { handleSubmit, control, reset } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      modelNumber: "",
      name: "",
      price: 0,
      description: "",
      imageFile: undefined,
    },
    resolver: zodResolver(AddDefaultProductSchema),
  });

  const { trigger, isMutating } = usePostDefaultProducts();

  const onSubmit: SubmitHandler<FormInput> = async (inputData: FormInput) => {
    try {
      await trigger(inputData);
      reset();
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "登録に失敗しました");
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="商品名"
                required
                size="small"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="modelNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="型番"
                required
                size="small"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="単価"
                type="number"
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newVal = e.target.value;
                  const registerVal = newVal === "" ? 0 : Number(newVal);
                  field.onChange(registerVal);
                }}
                required
                size="small"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="説明"
                required
                size="small"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="imageFile"
            control={control}
            render={({ field: { onChange, ref }, fieldState: { error } }) => (
              <TextField
                type="file"
                size="small"
                variant="standard"
                fullWidth
                slotProps={{
                  htmlInput: { accept: "image/*" },
                  inputLabel: { shrink: true },
                }}
                inputRef={ref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                  }
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isMutating}
          >
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
