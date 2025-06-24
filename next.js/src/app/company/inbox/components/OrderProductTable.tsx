import { OrderProduct } from "@/types/company";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type Props = {
  products: OrderProduct[];
  confirmedIds: number[];
  onCheck: (id: number) => void;
};

export const OrderProductTable = ({
  products,
  confirmedIds,
  onCheck,
}: Props) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid #DDDDDD",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#E6E6E6" }}>
            <TableCell />
            <TableCell
              align="center"
              sx={{ color: "#333333", fontWeight: "bold", minWidth: 100 }}
            >
              型番
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#333333", fontWeight: "bold", minWidth: 120 }}
            >
              商品名
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#333333", fontWeight: "bold", minWidth: 80 }}
            >
              単価
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#333333", fontWeight: "bold", minWidth: 60 }}
            >
              数量
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#333333", fontWeight: "bold", minWidth: 100 }}
            >
              小計
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#333333", fontWeight: "bold", minWidth: 120 }}
            >
              発注者
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow
              key={`${String(p.id)}-${String(p.custom?.id)}`}
              sx={{
                borderBottom: "1px solid #DDDDDD",
                color: "#666666",
              }}
            >
              <TableCell align="center">
                <Checkbox
                  checked={confirmedIds.includes(p.orderProductId)}
                  onChange={() => {
                    onCheck(p.orderProductId);
                  }}
                />
              </TableCell>
              <TableCell align="center">
                {p.custom?.modelNumber ?? p.modelNumber}
              </TableCell>
              <TableCell align="center">{p.custom?.name ?? p.name}</TableCell>
              <TableCell align="center">
                ¥{Math.round(p.custom?.price ?? p.price).toLocaleString()}
              </TableCell>
              <TableCell align="center">{p.quantity}</TableCell>
              <TableCell align="center">
                ¥
                {Math.round(
                  (p.custom?.price ?? p.price) * p.quantity,
                ).toLocaleString()}
              </TableCell>
              <TableCell align="center">{p.userName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
