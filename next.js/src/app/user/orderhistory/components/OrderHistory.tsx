"use client";

import { useContext, useEffect, useState } from "react";
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

export const OrderHistory = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { myUser } = cartContext;

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

  type GroupedOrder = {
    [order_id: number]: Order[];
  };

  const [orders, setOrders] = useState<GroupedOrder>({});

  const fetchOrder = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/user/orderhistory", {
        method: "GET",
        credentials: "include",
      });
      const data: Order[] = await res.json();

      const groupedOrder = data.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {} as GroupedOrder);

      setOrders(groupedOrder);
    } catch (err) {
      console.error("注文履歴の取得に失敗しました", err);
    }
  };

  const orderTotalAmount = (order_id: number, data: Order[]) => {
    const orderData = data.filter((item) => item.order_id === order_id);
    return orderData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    fetchOrder();
  }, [myUser]);

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
                  <TableRow key={`${item.cart_id}-${item.model_number}`} hover>
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
