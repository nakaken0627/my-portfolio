import { useDeleteCustomProducts } from "@/hooks/company/useDeleteCustomProducts";
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
  onCustomDeleteSuccess?: () => void;
};

type CustomError = Error & {
  info?: { message: string };
};

export const ModalTable = ({ customs, onCustomDeleteSuccess }: Props) => {
  const { trigger, isMutating } = useDeleteCustomProducts();

  const handleDeleteCustomProduct = async (customId: number) => {
    try {
      await trigger(customId);
      if (onCustomDeleteSuccess) {
        onCustomDeleteSuccess();
      }
    } catch (err) {
      const error = err as CustomError;
      const msg = error.info?.message ?? "";
      alert(msg || "削除に失敗しました");
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
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                ユーザー
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", minWidth: 150 }}
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
                    disabled={isMutating}
                  >
                    削除
                  </Button>
                </TableCell>
                <TableCell align="center">{c.id}</TableCell>
                <TableCell align="center">{c.user_name ?? "共通品"}</TableCell>
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
