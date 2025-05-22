"use client";

import { useContext, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import { DefaultProductWithCustomization } from "@/types/company";
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

import { ProductsDetailModal } from "./ProductDetailModal";

export const ProductList = () => {
  const companyContext = useContext(CompanyContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    useState<DefaultProductWithCustomization>();

  if (!companyContext) return <Typography>Loading...</Typography>;
  const { companyCustomProducts, fetchCompanyCustomProducts } = companyContext;

  const handleCheckBoxStatus = (productId: number) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleDeleteProducts = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/company/products`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productsIds: selectedIds }),
      });

      setSelectedIds([]);
      await fetchCompanyCustomProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom>
        商品一覧
      </Typography>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ overflowX: "auto", backgroundColor: "#fafafa" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 80 }}
              >
                選択
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 80 }}
              >
                商品ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 120 }}
              >
                商品名
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                型番
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                価格
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 200 }}
              >
                説明
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                詳細
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyCustomProducts.map((p) => (
              <TableRow
                key={String(p.id)}
                hover
                sx={{ "&:hover": { backgroundColor: "#f0f8ff" } }}
              >
                <TableCell align="center">
                  <Checkbox
                    checked={selectedIds.includes(p.id)}
                    onChange={() => {
                      handleCheckBoxStatus(p.id);
                    }}
                  />
                </TableCell>
                <TableCell align="center">{p.id}</TableCell>
                <TableCell align="center">{p.name}</TableCell>
                <TableCell align="center">{p.model_number}</TableCell>
                <TableCell align="center">
                  ¥{Number(p.price).toLocaleString()}
                </TableCell>
                <TableCell align="left">{p.description}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleModalOpen();
                      setSelectedProduct(p);
                    }}
                  >
                    詳細 : {p.customization.length}
                  </Button>
                </TableCell>
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

      <ProductsDetailModal
        open={modalOpen}
        onClose={handleModalClose}
        productWithCustoms={selectedProduct}
      />
    </Container>
  );
};
