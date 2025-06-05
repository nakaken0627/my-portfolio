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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>商品番号</TableCell>
            <TableCell>商品名</TableCell>
            <TableCell>価格</TableCell>
            <TableCell>数量</TableCell>
            <TableCell>金額</TableCell>
            <TableCell>発注者</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={`${String(p.id)}-${String(p.customization?.id)}`}>
              <TableCell>
                <Checkbox
                  checked={confirmedIds.includes(p.orderProductId)}
                  onChange={() => {
                    onCheck(p.orderProductId);
                  }}
                />
              </TableCell>
              <TableCell>
                {p.customization?.model_number ?? p.model_number}
              </TableCell>
              <TableCell>{p.customization?.name ?? p.name}</TableCell>
              <TableCell>
                ¥
                {Math.round(p.customization?.price ?? p.price).toLocaleString()}
              </TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>
                ¥
                {Math.round(
                  (p.customization?.price ?? p.price) * p.quantity,
                ).toLocaleString()}
              </TableCell>
              <TableCell>{p.userName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
