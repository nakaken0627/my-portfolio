import { OrderTransformed } from "@/types/company";
import { Card, CardContent } from "@mui/material";

import { OrderHeader } from "./OrderHeader";
import { OrderTable } from "./OrderTable";

type Props = {
  order: OrderTransformed;
};

export const OrderCard = ({ order }: Props) => {
  const total = order.products.reduce(
    (sum, p) =>
      p.custom ? sum + p.custom.price * p.quantity : sum + p.price * p.quantity,
    0,
  );
  return (
    <Card
      key={order.orderId}
      variant="outlined"
      sx={{
        mb: 4,
        boxShadow: 3,
        borderRadius: 2,
        overflowX: "auto",
      }}
    >
      <CardContent>
        <OrderHeader order={order} />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            注文ID: {o.orderId}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            顧客: {o.products[0].userName}
          </Typography>
        </Box> */}
        <OrderTable products={order.products} total={total} />
        {/* <TableContainer component={Paper} variant="outlined">
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
              {o.products.map((p, index) => (
                <TableRow
                  key={`${String(p.id)}-${String(p.custom?.id ?? "no-custom")}`}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                  }}
                >
                  <TableCell>{p.custom?.name ?? p.name}</TableCell>
                  <TableCell>
                    {p.custom?.model_number ?? p.model_number}
                  </TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>
                    ¥{(p.custom?.price ?? p.price).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>
                    ¥
                    {(
                      (p.custom?.price ?? p.price) * p.quantity
                    ).toLocaleString()}
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
        </TableContainer> */}
      </CardContent>
    </Card>
  );
};
