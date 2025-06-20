"use client";

import { useCallback, useState } from "react";
import { useDeleteProducts } from "@/hooks/company/useDeleteProducts";
import { useFetchCompanyProducts } from "@/hooks/company/useFetchCompanyProducts";
import { ProductWithCustomization } from "@/types/company";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Box,
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

import { ProductsDetailModal } from "./Modal/ProductDetailModal";

type CustomError = Error & {
  info?: { message: string };
};

export const ProductList = () => {
  const { products, isErrorProducts, isLoadingProducts, mutateProducts } =
    useFetchCompanyProducts();

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
      alert(msg || "関連データが存在するため削除できません");
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    void mutateProducts();
  };

  const handleAddSuccess = useCallback(async () => {
    const updatedProductsData = await mutateProducts();
    if (updatedProductsData && selectedProduct) {
      const newSelectedProduct = updatedProductsData.find(
        (p) => p.id === selectedProduct.id,
      );
      setSelectedProduct(newSelectedProduct);
    }
  }, [mutateProducts, selectedProduct]);

  const handleCustomDeleteSuccess = useCallback(async () => {
    // 削除処理時に商品一覧を再フェッチし、SWRのキャッシュを最新の状態に更新
    const updatedProductsData = await mutateProducts();
    // selectedProductも更新されたデータから最新のものを探し直すことで削除後の状態を反映
    if (updatedProductsData && selectedProduct) {
      const newSelectedProduct = updatedProductsData.find(
        (p) => p.id === selectedProduct.id,
      );
      setSelectedProduct(newSelectedProduct);
    } else {
      setSelectedProduct(undefined);
    }
  }, [mutateProducts, selectedProduct]);

  if (!products) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isErrorProducts)
    return <Typography>データを取得中に失敗しました</Typography>;
  if (isLoadingProducts) return <Typography>データを取得中です...</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        商品一覧
      </Typography>

      {/*  データがないときの表示 */}
      {products.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#E6F0FA",
            py: 6,
            px: 3,
            textAlign: "center",
            borderRadius: 2,
            mt: 4,
          }}
        >
          <InventoryIcon sx={{ fontSize: 60, color: "#A2BBD7", mb: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: "#4A4A4A", fontWeight: "bold", mb: 1 }}
          >
            商品がまだ登録されていません
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#666666", whiteSpace: "pre-line" }}
          >
            {`上部の商品登録から「新規商品登録」を選択し、
            商品を登録してください`}
          </Typography>
        </Paper>
      ) : (
        <Box>
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
                    <TableCell align="center">{p.modelNumber}</TableCell>
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
            onAddSuccess={handleAddSuccess}
            onCustomDeleteSuccess={handleCustomDeleteSuccess}
          />
        </Box>
      )}
    </Container>
  );
};
