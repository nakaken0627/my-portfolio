"use client";

import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

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
  const [inputDescriptin, setInputDescriptin] = useState("");
  const [inputUserId, setInputUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { myProducts, fetchMyCustomProducts } = companyContext ?? {};

  const fetchUserList = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/company/getuserlist", {
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
      await fetch("http://localhost:3001/api/company/addcustomproduct", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_id: inputUserId,
          custom_model_number: inputModelNum,
          custom_product_name: inputProductName,
          custom_price: inputPrice,
          description: inputDescriptin,
          start_date: startDate || null,
          end_date: endDate || null,
        }),
      });
      setInputProductId("");
      setInputUserId("");
      setInputModelNum("");
      setInputProductName("");
      setInputPrice("");
      setInputDescriptin("");
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
        (product) => product.custom_product_id === Number(inputProductId),
      );
      if (!existingProduct) {
        setInputProductName("");
        setInputModelNum("");
        setInputPrice("");
        setInputDescriptin("");
      } else {
        setProductId(String(existingProduct.product_id));
        setInputProductName(existingProduct.company_name);
        setInputModelNum(existingProduct.custom_model_number);
        setInputPrice(String(Math.floor(existingProduct.custom_price)));
        setInputDescriptin(existingProduct.custom_description);
      }
    };
    searchDefaultProduct();
  }, [inputProductId, myProducts]);

  if (!companyContext) return;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        個別商品登録
      </Typography>
      <Box onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="商品ID検索"
            placeholder="対象の商品IDを入力して下さい"
            value={inputProductId}
            onChange={(e) => {
              setInputProductId(e.target.value);
            }}
            required
          />

          <TextField
            label="商品名"
            value={inputProductName}
            onChange={(e) => {
              setInputProductName(e.target.value);
            }}
            required
          />

          <TextField
            label="ユーザーID"
            placeholder="対象のユーザーIDを入力して下さい"
            value={inputUserId}
            onChange={(e) => {
              setInputUserId(e.target.value);
            }}
            required
          />
          {inputUserId.trim() !== "" &&
            (isExistingUser ? (
              <span>ユーザー名:{isExistingUser.name}</span>
            ) : (
              <span> ※ ユーザーは存在しません</span>
            ))}

          <TextField
            label="型番"
            value={inputModelNum}
            onChange={(e) => {
              setInputModelNum(e.target.value);
            }}
            required
          />

          <TextField
            type="number"
            label="個別単価"
            value={inputPrice}
            onChange={(e) => {
              setInputPrice(e.target.value);
            }}
            required
          />

          <TextField
            label="説明"
            value={inputDescriptin}
            onChange={(e) => {
              setInputDescriptin(e.target.value);
            }}
          />

          <TextField
            type="date"
            id="startdate"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />

          <TextField
            type="date"
            id="enddate"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />

          <Button type="submit" variant="contained">
            登録
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
