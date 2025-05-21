import { useContext } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import { DefaultProduct } from "@/types/company";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AddCustomProduct } from "./AddCustomProduct";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  productWithCustoms?: DefaultProduct;
};

export const ProductsDetailModal = ({
  open,
  onClose,
  productWithCustoms,
}: ModalProps) => {
  const companyContext = useContext(CompanyContext);

  if (!companyContext) return <Typography>Loading...</Typography>;
  const { fetchCompanyCustomProducts } = companyContext;

  if (!productWithCustoms) return;

  const handleDeleteCustomProduct = async (customId: number) => {
    try {
      await fetch(`${API_BASE_URL}/api/company/custom-product`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customProductId: customId }),
      });
      await fetchCompanyCustomProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* タイトル部分 */}
      <DialogTitle sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>
        商品詳細
      </DialogTitle>

      {/* 本体コンテンツ */}
      <DialogContent dividers sx={{ backgroundColor: "#fafafa" }}>
        <Grid container spacing={3} alignItems="flex-start">
          {/* 左側：商品画像 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              component="img"
              src="/images/sample.jpg"
              alt={productWithCustoms.name}
              sx={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          </Grid>

          {/* 右側：商品名・型番・価格・説明 */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="h6" gutterBottom>
              {productWithCustoms.name}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              型番: {productWithCustoms.model_number}
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              価格: ¥{Number(productWithCustoms.price).toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 2, whiteSpace: "pre-line", color: "text.secondary" }}
            >
              {productWithCustoms.description}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* カスタム品登録フォーム */}
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            my: 1,
          }}
        >
          <Accordion
            sx={{
              bgcolor: "#f9f9f9",
              border: "1px solid #e0e0e0",
              boxShadow: "none",
              borderRadius: 1,
              mt: 2,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="custom-product-panel-header"
              aria-controls="custom-product-panel-content"
              sx={{
                minHeight: "40px",
                "& .MuiAccordionSummary-content": { my: 0.5 },
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                カスタム品登録（オプション）
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5, pt: 0 }}>
              <Paper elevation={0} sx={{ p: 1, backgroundColor: "#fff" }}>
                <AddCustomProduct />
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* カスタマイズ一覧テーブル */}
        <Typography variant="h6" gutterBottom>
          カスタマイズ一覧
        </Typography>

        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ overflowX: "auto" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", minWidth: 80 }}
                >
                  操作
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", minWidth: 60 }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", minWidth: 200 }}
                >
                  商品名
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", minWidth: 150 }}
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
                  sx={{ fontWeight: "bold", minWidth: 250 }}
                >
                  説明
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", minWidth: 120 }}
                >
                  適用開始日
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", minWidth: 120 }}
                >
                  適用終了日
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productWithCustoms.customization.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => void handleDeleteCustomProduct(c.id)}
                    >
                      削除
                    </Button>
                  </TableCell>
                  <TableCell align="center">{c.id}</TableCell>
                  <TableCell align="center">{c.name}</TableCell>
                  <TableCell align="center">{c.model_number}</TableCell>
                  <TableCell align="center">
                    ¥{Number(c.price).toLocaleString()}
                  </TableCell>
                  <TableCell align="left">{c.description}</TableCell>
                  <TableCell align="center">{c.start_date || "-"}</TableCell>
                  <TableCell align="center">{c.end_date || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* カスタマイズがない場合のメッセージ */}
        {productWithCustoms.customization.length === 0 && (
          <Typography sx={{ mt: 2 }}>
            カスタマイズは登録されていません。
          </Typography>
        )}
      </DialogContent>

      {/* 閉じるボタン */}
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: "bold" }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
