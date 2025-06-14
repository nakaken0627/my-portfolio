import { OrderProduct } from "@/types/company";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

type Props = {
  products: OrderProduct[];
  total: number;
};

export const OrderTable = ({ products, total }: Props) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>商品名</TableCell>
            <TableCell>型番</TableCell>
            <TableCell>数量</TableCell>
            <TableCell>単価</TableCell>
            <TableCell>小計</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p, index) => (
            <TableRow
              key={`${String(p.id)}-${String(p.custom?.id ?? "no-custom")}`}
              sx={{
                backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
              }}
            >
              <TableCell>{p.custom?.name ?? p.name}</TableCell>
              <TableCell>{p.custom?.model_number ?? p.model_number}</TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>
                ¥{(p.custom?.price ?? p.price).toLocaleString()}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                ¥{((p.custom?.price ?? p.price) * p.quantity).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              align="right"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
              }}
            >
              合計
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#d32f2f",
                backgroundColor: "#f0f0f0",
              }}
            >
              ¥{total.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
