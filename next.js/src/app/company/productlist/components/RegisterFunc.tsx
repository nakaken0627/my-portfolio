"use client";

import { useContext, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export const RegisterFunc = () => {
  const companyContext = useContext(CompanyContext);

  const [modelNum, setModelNum] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  if (!companyContext) return <Typography>Loading...</Typography>;

  const { fetchMyProducts } = companyContext;

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/api/company/addproduct", {
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
      setPrice(0);
      setDescription("");
      await fetchMyProducts();
    } catch (err) {
      console.error("[MyCompanyPage]handleSubmitProduct:通信エラー", err);
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
          />
          <TextField
            label="型番"
            value={modelNum}
            onChange={(e) => {
              setModelNum(e.target.value);
            }}
            required
          />
          <TextField
            label="金額"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            required
          />
          <TextField
            label="説明"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
