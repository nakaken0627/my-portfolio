"use client";

import { useContext, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import {
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const ProductList = () => {
  const companyContext = useContext(CompanyContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  if (!companyContext) return <Typography>Loading...</Typography>;
  const { myCustomProducts, fetchMyCustomProducts } = companyContext;

  const handleCheckBoxStatus = (customId: number) => {
    setSelectedIds((prev) =>
      prev.includes(customId)
        ? prev.filter((id) => id !== customId)
        : [...prev, customId],
    );
  };

  const handleDeleteProducts = async () => {
    try {
      await fetch("http://localhost:3001/api/company/deletecustomproducts", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customProductIds: selectedIds }),
      });

      setSelectedIds([]);
      await fetchMyCustomProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        商品一覧
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">選択</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">商品ID</TableCell>
              <TableCell align="center">商品名</TableCell>
              <TableCell align="center">型番</TableCell>
              <TableCell align="center">単価種別</TableCell>
              <TableCell align="center">価格</TableCell>
              <TableCell align="center">説明</TableCell>
              <TableCell align="center">適用開始日</TableCell>
              <TableCell align="center">適用終了日</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myCustomProducts.map((product) => (
              <TableRow key={product.custom_product_id}>
                <TableCell align="center">
                  <Checkbox
                    checked={selectedIds.includes(product.custom_product_id)}
                    onChange={() => {
                      handleCheckBoxStatus(product.custom_product_id);
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {product.custom_product_id}
                </TableCell>
                <TableCell align="center">{product.product_id}</TableCell>
                <TableCell align="center">
                  {product.custom_product_name}
                </TableCell>
                <TableCell align="center">
                  {product.custom_model_number}
                </TableCell>
                <TableCell align="center">
                  {product.user_name === "dummy" ? "共通品" : product.user_name}
                </TableCell>
                <TableCell align="center">
                  {Math.round(product.custom_price)}
                </TableCell>
                <TableCell align="center">
                  {product.custom_description}
                </TableCell>
                <TableCell align="center">{product.start_date}</TableCell>
                <TableCell align="center">{product.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteProducts}
        sx={{ mt: 2 }}
      >
        選択商品を削除
      </Button>
    </Container>
  );
};
