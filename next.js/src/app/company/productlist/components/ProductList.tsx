"use client";

import { useContext, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
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
  const { myProducts, fetchMyProducts } = companyContext;

  const handleCheckBoxStatus = (productId: number) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleDeleteProducts = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/company/custom-products`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productsIds: selectedIds }),
      });

      setSelectedIds([]);
      await fetchMyProducts();
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
              <TableCell>選択</TableCell>
              <TableCell>商品名</TableCell>
              <TableCell>型番</TableCell>
              <TableCell>価格</TableCell>
              <TableCell>説明</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onChange={() => {
                      handleCheckBoxStatus(product.id);
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.model_number}</TableCell>
                <TableCell>{Math.round(product.price)}</TableCell>
                <TableCell>{product.description}</TableCell>
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
