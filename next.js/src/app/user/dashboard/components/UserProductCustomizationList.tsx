import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import { UserProductCustom } from "@/types/user";
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
  customization: UserProductCustom[];
  productId: number;
};

export const UserProductCustomizationList = ({
  customization,
  productId,
}: Props) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return <Typography>Loading...</Typography>;

  const { addProduct } = cartContext;

  if (!customization.length)
    return <Typography>カスタマイズ品はありません。</Typography>;

  return (
    <Box
      sx={{
        maxHeight: "60vh",
        overflowY: "auto",
        overflowX: "auto",
        bgcolor: "#f0fdf4",
        textOverflow: "ellipsis",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "60vh",
          minWidth: "800px",
          overflow: "auto",
          bgcolor: "#f0fdf4",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 100 }}
                align="center"
              >
                操作
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 100 }}
                align="center"
              >
                商品名
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 100 }}
                align="center"
              >
                型番
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 150 }}
                align="center"
              >
                説明
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 100 }}
                align="center"
              >
                価格
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 100 }}
                align="center"
              >
                適用開始日
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#e0f2f1", fontWeight: "bold", minWidth: 100 }}
                align="center"
              >
                適用終了日
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customization.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={() => addProduct(productId, item.id)}
                  >
                    カートに追加
                  </Button>
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.model_number}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">
                  ¥{Math.round(item.price).toLocaleString()}
                </TableCell>
                <TableCell align="center">{item.start_date}</TableCell>
                <TableCell align="center">{item.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
