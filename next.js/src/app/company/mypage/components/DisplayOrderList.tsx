"use client";

import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type OrderList = {
  id: number;
  company_id: number;
  order_id: number;
  user_name: string;
  model_number: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};

type GroupedOrderList = Record<number, OrderList[]>;

export const DisplayOrderList = () => {
  const companyContext = useContext(CompanyContext);
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const [groupedOrderList, setGroupedOrderList] = useState<GroupedOrderList>(
    {},
  );
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  const { myCompany } = companyContext ?? {};

  const fetchMyOrderList = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/company/orders`, {
        method: "GET",
        credentials: "include",
      });
      const data: OrderList[] = await res.json();
      setOrderList(data);

      const groupedOrders = data.reduce<GroupedOrderList>((acc, item) => {
        acc[item.order_id] ??= [];
        acc[item.order_id].push(item);
        return acc;
      }, {});
      setGroupedOrderList(groupedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const orderTotalAmount = (order_id: number, items: OrderList[]) =>
    items
      .filter((item) => item.order_id === order_id)
      .reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckBoxStatus = (id: number) => {
    setConfirmedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleClickChangeStatus = async (confirmedIds: number[]) => {
    try {
      await fetch(`${API_BASE_URL}/api/company/orders/confirmed`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ confirmedIds }),
      });
      setConfirmedIds([]);
      await fetchMyOrderList();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePushAllIds = () => {
    if (confirmedIds.length > 0) {
      setConfirmedIds([]);
    } else {
      const idArray = orderList.map((item) => item.id);
      setConfirmedIds(idArray);
    }
  };

  useEffect(() => {
    void fetchMyOrderList();
  }, [myCompany]);

  if (!companyContext) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        注文一覧
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickChangeStatus(confirmedIds)}
          >
            受注確定
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            onClick={() => {
              handlePushAllIds();
            }}
          >
            一括選択
          </Button>
        </Grid>
      </Grid>

      {Object.entries(groupedOrderList).map(([order_id, items]) => {
        const totalAmount = orderTotalAmount(Number(order_id), items);

        return (
          <Card
            key={order_id}
            sx={{
              mb: 4,
              border: totalAmount >= 50000 ? "2px solid red" : "1px solid #ccc",
              backgroundColor: totalAmount >= 50000 ? "#fff5f5" : "white",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                オーダーID: {order_id}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                合計金額: ¥{totalAmount.toLocaleString()}
              </Typography>
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
                    {items.map((item) => (
                      <TableRow
                        key={`${String(item.order_id)}-${String(item.product_id)}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={confirmedIds.includes(item.id)}
                            onChange={() => {
                              handleCheckBoxStatus(item.id);
                            }}
                          />
                        </TableCell>
                        <TableCell>{item.model_number}</TableCell>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>
                          ¥{Math.round(item.price).toLocaleString()}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          ¥
                          {Math.round(
                            item.price * item.quantity,
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>{item.user_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};
