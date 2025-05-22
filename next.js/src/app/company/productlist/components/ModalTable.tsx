import { useContext } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import { ProductCustomizations } from "@/types/company";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Props = {
  customs: ProductCustomizations[];
};

export const ModalTable = ({ customs }: Props) => {
  const companyContext = useContext(CompanyContext);

  if (!companyContext) return <Typography>Loading...</Typography>;
  const { fetchCompanyCustomProducts } = companyContext;

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
    <Box>
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
            {customs.map((c) => (
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

      {customs.length === 0 && (
        <Typography sx={{ mt: 2 }}>
          カスタマイズは登録されていません。
        </Typography>
      )}
    </Box>
  );
};
