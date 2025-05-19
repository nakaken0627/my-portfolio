"use client";

import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
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
        <Box mb={2}>
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
            renderInput={(params) => <TextField {...params} label="商品ID" />}
          />
        </Box>

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

        <TextField
          label="ユーザーID"
          placeholder="対象のユーザーIDを入力して下さい"
          value={inputUserId}
          onChange={(e) => {
            setInputUserId(e.target.value);
          }}
          required
          size="small"
        />
        {inputUserId.trim() !== "" &&
          (isExistingUser ? (
            <span>ユーザー名:{isExistingUser.name}</span>
          ) : (
            <span> ※ ユーザーは存在しません</span>
          ))}

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
        />
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
        />
        <TextField
          label="説明"
          value={inputDescription}
          onChange={(e) => {
            setInputDescription(e.target.value);
          }}
          size="small"
        />
        {/* ユーザー確認 */}
        {inputUserId.trim() !== "" &&
          (isExistingUser ? (
            <Typography variant="body2" color="primary">
              ユーザー名: {isExistingUser.name}
            </Typography>
          ) : (
            <Typography variant="body2" color="error">
              ※ ユーザーは存在しません
            </Typography>
          ))}
        <Box textAlign="right">
          <Button type="submit" variant="contained" size="small">
            登録
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
