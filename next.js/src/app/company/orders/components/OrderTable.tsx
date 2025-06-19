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
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#F5F8FF",
        border: "1px solid #DDDDDD",
        overflowX: "auto",
      }}
    >
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#E6E6E6" }}>
            {["型番", "商品名", "数量", "単価", "小計"].map((label) => (
              <TableCell
                key={label}
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                  minWidth: 90,
                  padding: "6px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p, index) => {
            const price = p.custom?.price ?? p.price;
            const subtotal = price * p.quantity;
            return (
              <TableRow
                key={`${String(p.id)}-${String(p.custom?.id ?? "no-custom")}`}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <TableCell
                  sx={{
                    minWidth: 110,
                    padding: "6px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.custom?.model_number ?? p.model_number}
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: 130,
                    padding: "6px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.custom?.name ?? p.name}
                </TableCell>
                <TableCell sx={{ minWidth: 50, padding: "6px 12px" }}>
                  {p.quantity}
                </TableCell>
                <TableCell sx={{ minWidth: 70, padding: "6px 12px" }}>
                  ¥{price.toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "green",
                    minWidth: 90,
                    padding: "6px 12px",
                  }}
                >
                  ¥{subtotal.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              align="right"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                whiteSpace: "nowrap",
              }}
            >
              合計
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#d32f2f",
                backgroundColor: "#f0f0f0",
                whiteSpace: "nowrap",
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
