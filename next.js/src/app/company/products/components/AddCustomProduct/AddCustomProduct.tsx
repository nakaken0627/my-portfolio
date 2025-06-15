"use client";

import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useFetchCompanyProducts } from "@/hooks/company/useFetchCompanyProducts";
import { useFetchUsers } from "@/hooks/company/useFetchUsers";
import { usePostCustomProducts } from "@/hooks/company/usePostCustomProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AddCustomProductSchema } from "./AddCustomProductSchema";

type FormData = {
  productId: number | null;
  userId: number | null;
  modelNumber: string;
  productName: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};

type CustomError = Error & {
  info?: { message: string };
};

type Props = {
  onAddSuccess?: () => void;
};

export const AddCustomProduct = ({ onAddSuccess }: Props) => {
  const { handleSubmit, control, watch, setValue, reset } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      productId: null,
      userId: null,
      modelNumber: "",
      productName: "",
      price: 0,
      description: "",
      startDate: "",
      endDate: "",
    },
    resolver: zodResolver(AddCustomProductSchema),
    criteriaMode: "all",
  });

  const { products, isErrorProducts, isLoadingProducts } =
    useFetchCompanyProducts();
  const { users, isErrorUsers, isLoadingUsers } = useFetchUsers();
  const { trigger, isMutating } = usePostCustomProducts();

  const watchedProductId = watch("productId");
  const watchedUserId = watch("userId");

  const onSubmit: SubmitHandler<FormData> = async (inputData: FormData) => {
    try {
      await trigger(inputData);
      reset();
      if (onAddSuccess) {
        onAddSuccess();
      }
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "登録に失敗しました");
    }
  };

  useEffect(() => {
    if (!products) return;
    const matchedProduct = products.find(
      (product) => product.id === watchedProductId,
    );
    if (matchedProduct) {
      setValue("productName", matchedProduct.name);
      setValue("modelNumber", matchedProduct.model_number);
      setValue("price", matchedProduct.price);
      setValue("description", matchedProduct.description);
    } else {
      setValue("productName", "");
      setValue("modelNumber", "");
      setValue("price", 0);
      setValue("description", "");
    }
  }, [watchedProductId, products, setValue]);

  if (!products || !users) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isErrorProducts || isErrorUsers)
    return <Typography>データを取得中に失敗しました</Typography>;
  if (isLoadingProducts || isLoadingUsers)
    return <Typography>データを取得中です...</Typography>;

  const isExistingUser = users.find((user) => user.id === watchedUserId);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        個別商品登録
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Grid container alignItems="center" spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="productId"
                control={control}
                rules={{ required: "商品を選択して下さい" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    id="product-box"
                    options={products}
                    size="small"
                    getOptionLabel={(product) =>
                      `${String(product.id)}-${product.name}`
                    }
                    value={products.find((p) => p.id === value) ?? null}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        onChange(newValue.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="商品ID"
                        required
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="userId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="number"
                    onChange={(e) => {
                      const newVal = e.target.value;
                      field.onChange(newVal === "" ? null : Number(newVal));
                    }}
                    label="ユーザーID"
                    placeholder="ユーザーID"
                    error={!!error}
                    helperText={error?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              {watchedUserId !== null &&
                String(watchedUserId).trim() !== "" && (
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      color={isExistingUser ? "primary" : "error"}
                    >
                      {isExistingUser
                        ? `ユーザー名 : ${isExistingUser.name}`
                        : " ※ユーザーは存在しません"}
                    </Typography>
                  </Box>
                )}
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="productName"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="商品名"
                    required
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="modelNumber"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="型番"
                    required
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      const registerVal = newVal === "" ? 0 : Number(newVal);
                      field.onChange(registerVal);
                    }}
                    type="number"
                    label="個別単価"
                    required
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    value={field.value}
                    type="date"
                    label="適用開始日"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="endDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="適用終了日"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    size="small"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mb={2}>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="説明"
                  size="small"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>

          <Button type="submit" variant="contained" disabled={isMutating}>
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
