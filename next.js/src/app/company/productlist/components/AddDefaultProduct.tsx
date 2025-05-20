"use client";

import { useContext, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export const AddDefaultProduct = () => {
  const companyContext = useContext(CompanyContext);

  const [modelNum, setModelNum] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  if (!companyContext) return <Typography>Loading...</Typography>;

  const { fetchMyProducts, fetchMyCustomProducts } = companyContext;

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/api/company/products`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_number: modelNum,
          name: productName,
          price,
          description,
        }),
      });

      setProductName("");
      setModelNum("");
      setPrice("");
      setDescription("");
      await fetchMyProducts();
      await fetchMyCustomProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        商品登録
      </Typography>
      <Box component="form" onSubmit={handleSubmitProduct} noValidate>
        <Stack spacing={2}>
          <TextField
            label="商品名"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            required
            size="small"
          />
          <TextField
            label="型番"
            value={modelNum}
            onChange={(e) => {
              setModelNum(e.target.value);
            }}
            required
            size="small"
          />
          <TextField
            label="単価"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
            size="small"
          />
          <TextField
            label="説明"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
            size="small"
          />
          <Button type="submit" variant="contained" color="primary">
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
