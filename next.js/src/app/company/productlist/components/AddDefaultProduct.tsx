"use client";

import { useContext, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import {
  Box,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const AddDefaultProduct = () => {
  const companyContext = useContext(CompanyContext);

  const [modelNum, setModelNum] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  if (!companyContext) return <Typography>Loading...</Typography>;

  const { fetchCompanyCustomProducts } = companyContext;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const inputFIle = e.target.files[0];
    setImageFile(inputFIle);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (!imageFile) return;
    formData.append("model_number", modelNum);
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", imageFile);

    try {
      await fetch(`${API_BASE_URL}/api/company/product`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      setProductName("");
      setModelNum("");
      setPrice("");
      setDescription("");
      setImageFile(undefined);
      await fetchCompanyCustomProducts();
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
          <Input
            type="file"
            size="small"
            fullWidth
            inputProps={{ accept: "image/*" }}
            onChange={handleImageChange}
          />
          <Button type="submit" variant="contained" color="primary">
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
