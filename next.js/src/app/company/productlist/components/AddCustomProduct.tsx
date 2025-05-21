"use client";

import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type User = {
  id: number;
  name: string;
};

export const AddCustomProduct = () => {
  const companyContext = useContext(CompanyContext);

  const [userList, setUserList] = useState<User[]>([]);
  const [inputProductId, setInputProductId] = useState<string>("");
  const [productId, setProductId] = useState("");
  const [inputProductName, setInputProductName] = useState("");
  const [inputModelNum, setInputModelNum] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputUserId, setInputUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { myProducts, fetchMyCustomProducts } = companyContext ?? {};

  const fetchUserList = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/company/users", {
        method: "GET",
      });
      const data: User[] = await res.json();
      setUserList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const isExistingUser = userList.find(
    (user) => String(user.id) === inputUserId,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/api/company/custom-products", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_id: inputUserId,
          model_number: inputModelNum,
          product_name: inputProductName,
          price: inputPrice,
          description: inputDescription,
          start_date: startDate || null,
          end_date: endDate || null,
        }),
      });
      setInputProductId("");
      setInputUserId("");
      setInputModelNum("");
      setInputProductName("");
      setInputPrice("");
      setInputDescription("");
      setProductId("");
      setStartDate("");
      setEndDate("");
      if (fetchMyCustomProducts) {
        await fetchMyCustomProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    void fetchUserList();
  }, []);

  useEffect(() => {
    const searchDefaultProduct = () => {
      if (!myProducts) return;
      const existingProduct = myProducts.find(
        (product) => product.product_id === Number(inputProductId),
      );
      if (!existingProduct) {
        setInputProductName("");
        setInputModelNum("");
        setInputPrice("");
        setInputDescription("");
      } else {
        setProductId(String(existingProduct.product_id));
        setInputProductName(existingProduct.product_name);
        setInputModelNum(existingProduct.model_number);
        setInputPrice(String(Math.floor(existingProduct.default_price)));
        setInputDescription(existingProduct.description);
      }
    };
    searchDefaultProduct();
  }, [inputProductId, myProducts]);

  if (!companyContext) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        個別商品登録
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack>
          <Grid container alignItems="center" spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                id="product-box"
                options={myProducts ?? []}
                size="small"
                getOptionLabel={(option) =>
                  `${String(option.product_id)}-${option.product_name}`
                }
                onChange={(e, newValue) => {
                  if (newValue) {
                    setInputProductId(String(newValue.product_id));
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="商品ID" />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="ユーザーID"
                placeholder="ユーザーID"
                value={inputUserId}
                onChange={(e) => {
                  setInputUserId(e.target.value);
                }}
                required
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              {inputUserId.trim() !== "" && (
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    color={isExistingUser ? "primary" : "error"}
                  >
                    {isExistingUser
                      ? `ユーザー名：${isExistingUser.name}`
                      : " ※ユーザーは存在しません"}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="商品名"
                value={inputProductName}
                onChange={(e) => {
                  setInputProductName(e.target.value);
                }}
                required
                size="small"
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="型番"
                value={inputModelNum}
                onChange={(e) => {
                  setInputModelNum(e.target.value);
                }}
                required
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                type="number"
                label="個別単価"
                value={inputPrice}
                onChange={(e) => {
                  setInputPrice(e.target.value);
                }}
                required
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                label="適用開始日"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                label="適用終了日"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          <Box mb={2}>
            <TextField
              label="説明"
              value={inputDescription}
              onChange={(e) => {
                setInputDescription(e.target.value);
              }}
              size="small"
              fullWidth
            />
          </Box>

          <Button type="submit" variant="contained">
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
