import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type OrderProduct = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  quantity: number;
};

type OrderCustom = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

type Transformed = {
  orderId: number;
  products: (OrderProduct & { customization: OrderCustom | null })[];
};

type Props = {
  orders: Transformed[];
};

export const OrderDisplay = ({ orders }: Props) => {
  const orderTotalAmount = (
    data: (OrderProduct & { customization: OrderCustom | null })[],
  ) => {
    return data.reduce((total, p) => {
      const custom = p.customization;
      return custom
        ? total + custom.price * p.quantity
        : total + p.price * p.quantity;
    }, 0);
  };

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        注文履歴
      </Typography>

      {orders.map((o) => (
        <Paper key={o.orderId} elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box mb={2}>
            <Typography variant="h6">注文ID: {o.orderId}</Typography>
            <Typography variant="h6" color="primary">
              合計金額: ¥{orderTotalAmount(o.products).toLocaleString()}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>商品番号</TableCell>
                <TableCell>商品名</TableCell>
                <TableCell>価格</TableCell>
                <TableCell>数量</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>発注先</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {o.products.map((p) => (
                <TableRow
                  key={`${String(p.id)}-${String(p.customization?.id)}`}
                  hover
                >
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
                  <TableCell>{p.company_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Container>
  );
};
