"use client";

import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type OrderProductForCompany = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  model_number: string;
  price: number;
  quantity: number;
  custom: {
    id: number;
    model_number: string;
    name: string;
    price: number;
  } | null;
};

type TransformedForCompany = {
  orderId: number;
  products: OrderProductForCompany[];
};

export const ConfirmedList = () => {
  const companyContext = useContext(CompanyContext);
  const [orderList, setOrderList] = useState<TransformedForCompany[]>([]);

  const { myCompany } = companyContext ?? {};

  console.log(orderList);

  const fetchConfirmedOrderList = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company/orders?is_confirmed=true`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data: TransformedForCompany[] = await res.json();
      setOrderList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!myCompany) return;
    void fetchConfirmedOrderList();
  }, [myCompany]);

  if (!companyContext) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        受注処理済み一覧
      </Typography>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
        {orderList.map((o) => {
          const total = o.products.reduce(
            (sum, p) =>
              p.custom
                ? sum + p.custom.price * p.quantity
                : sum + p.price * p.quantity,
            0,
          );
          return (
            <Card
              key={o.orderId}
              variant="outlined"
              sx={{
                mb: 4,
                boxShadow: 3,
                borderRadius: 2,
                overflowX: "auto",
              }}
            >
              <CardContent>
                <Box
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
                </Box>

                <TableContainer component={Paper} variant="outlined">
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
                            backgroundColor:
                              index % 2 === 0 ? "#fafafa" : "white",
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
                          <TableCell
                            sx={{ fontWeight: "bold", color: "green" }}
                          >
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
                </TableContainer>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};
