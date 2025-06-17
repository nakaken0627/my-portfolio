import { OrderCustom, OrderProduct, Transformed } from "@/types/user";
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

type Props = {
  orders: Transformed[];
};

export const OrderDisplay = ({ orders }: Props) => {
  const orderTotalAmount = (
    data: (OrderProduct & { custom: OrderCustom | null })[],
  ) => {
    return data.reduce((total, p) => {
      const custom = p.custom;
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
                <TableCell>型番</TableCell>
                <TableCell>商品名</TableCell>
                <TableCell>単価</TableCell>
                <TableCell>数量</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>発注先</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {o.products.map((p) => (
                <TableRow key={`${String(p.id)}-${String(p.custom?.id)}`} hover>
                  <TableCell>
                    {p.custom?.modelNumber ?? p.modelNumber}
                  </TableCell>
                  <TableCell>{p.custom?.name ?? p.name}</TableCell>
                  <TableCell>
                    ¥{Math.round(p.custom?.price ?? p.price).toLocaleString()}
                  </TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>
                    ¥
                    {Math.round(
                      (p.custom?.price ?? p.price) * p.quantity,
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>{p.companyName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Container>
  );
};
