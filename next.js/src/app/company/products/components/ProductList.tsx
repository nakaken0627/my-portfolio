"use client";

import { useState } from "react";
import { ProductWithCustomization } from "@/types/company";
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
import { useDeleteProducts } from "hooks/company/useDeleteProducts";
import { useFetchProducts } from "hooks/company/useFetchProducts";

import { ProductsDetailModal } from "./ProductDetailModal";

type CustomError = Error & {
  info?: { message: string };
};

export const ProductList = () => {
  const { products, isErrorProducts, isLoadingProducts } = useFetchProducts();
  const { trigger, isMutating } = useDeleteProducts();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithCustomization>();

  const handleCheckBoxStatus = (productId: number) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleDeleteProducts = async () => {
    try {
      await trigger(selectedIds);
      setSelectedIds([]);
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "削除に失敗しました");
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!products) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isErrorProducts)
    return <Typography>データを取得中に失敗しました</Typography>;
  if (isLoadingProducts) return <Typography>データを取得中です...</Typography>;

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
            {products.map((p) => (
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
                    詳細 : {p.custom.length}
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
        disabled={isMutating}
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
