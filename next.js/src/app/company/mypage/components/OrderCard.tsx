import { OrderProduct, OrderTransformed } from "@/types/company";
import { Card, CardContent, Typography } from "@mui/material";

import { OrderProductTable } from "./OrderProductTable";

type Props = {
  order: OrderTransformed;
  confirmedIds: number[];
  onCheck: (id: number) => void;
};

export const OrderCard = ({ order, confirmedIds, onCheck }: Props) => {
  const orderTotalAmount = (data: OrderProduct[]) => {
    return data.reduce((total, p) => {
      const custom = p.customization;
      return custom
        ? total + custom.price * p.quantity
        : total + p.price * p.quantity;
    }, 0);
  };

  const totalAmount = orderTotalAmount(order.products);

  return (
    <Card
      key={order.orderId}
      sx={{
        mb: 4,
        border: totalAmount >= 50000 ? "2px solid red" : "1px solid #ccc",
        backgroundColor: totalAmount >= 50000 ? "#fff5f5" : "white",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          オーダーID: {order.orderId}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          合計金額: ¥{totalAmount.toLocaleString()}
        </Typography>
        <OrderProductTable
          products={order.products}
          confirmedIds={confirmedIds}
          onCheck={onCheck}
        />
        {/* <TableContainer component={Paper}>
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
              {o.products.map((p) => (
                <TableRow
                  key={`${String(p.id)}-${String(p.customization?.id)}`}
                >
                  <TableCell>
                    <Checkbox
                      checked={confirmedIds.includes(p.orderProductId)}
                      onChange={() => {
                        handleCheckBoxStatus(p.orderProductId);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {p.customization?.model_number ?? p.model_number}
                  </TableCell>
                  <TableCell>{p.customization?.name ?? p.name}</TableCell>
                  <TableCell>
                    ¥
                    {Math.round(
                      p.customization?.price ?? p.price,
                    ).toLocaleString()}
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
        </TableContainer> */}
      </CardContent>
    </Card>
  );
};
