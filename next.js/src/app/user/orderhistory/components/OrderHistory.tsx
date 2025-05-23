"use client";

import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CartContext } from "@/context/cart-context";
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

type Order = {
  order_id: number;
  cart_id: number;
  product_id: number;
  model_number: string;
  product_name: string;
  price: number;
  quantity: number;
  company_name: string;
};

type GroupedOrder = Record<number, Order[]>;

export const OrderHistory = () => {
  const cartContext = useContext(CartContext);
  const { myUser } = cartContext ?? {};

  const [orders, setOrders] = useState<GroupedOrder>({});

  const orderTotalAmount = (order_id: number, data: Order[]) => {
    const orderData = data.filter((item) => item.order_id === order_id);
    return orderData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    if (!myUser) return;

    //myUserとの依存関係を保持し、エラーを避けるためにuseEffect内で定義
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/orders/history`, {
          method: "GET",
          credentials: "include",
        });
        const data: Order[] = await res.json();

        const groupedOrder = data.reduce<GroupedOrder>((acc, item) => {
          acc[item.order_id] ??= [];
          acc[item.order_id].push(item);
          return acc;
        }, {});

        setOrders(groupedOrder);
      } catch (err) {
        console.error(err);
      }
    };

    void fetchOrder();
  }, [myUser]);

  if (!cartContext) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        注文履歴
      </Typography>

      {/* バックエンド側で並び順を変えても、reduceを使用した際にorder_idの昇順になってしまうため
      こちらで.sort()を使って並び替えをすることにしております。 */}
      {Object.entries(orders)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([orderId, items]) => (
          <Paper key={orderId} elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box mb={2}>
              <Typography variant="h6">注文ID: {orderId}</Typography>
              <Typography variant="h6" color="primary">
                合計金額: ¥
                {orderTotalAmount(Number(orderId), items).toLocaleString()}
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
                {items.map((item) => (
                  <TableRow
                    key={`${String(item.cart_id)}-${item.model_number}`}
                    hover
                  >
                    <TableCell>{item.model_number}</TableCell>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>
                      ¥{Math.round(item.price).toLocaleString()}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      ¥{Math.round(item.price * item.quantity).toLocaleString()}
                    </TableCell>
                    <TableCell>{item.company_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ))}
    </Container>
  );
};
