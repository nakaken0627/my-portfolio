"use client";

import { useContext, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export const AddDefaultProduct = () => {
  const companyContext = useContext(CompanyContext);

  const [modelNum, setModelNum] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  if (!companyContext) return <Typography>Loading...</Typography>;

  const { fetchMyCustomProducts } = companyContext;

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
      setPrice("");
      setDescription("");
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
            label="単価"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
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
