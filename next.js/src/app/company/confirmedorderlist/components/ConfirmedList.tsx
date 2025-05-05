"use client";

import { useContext, useEffect, useState } from "react";
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

type ConfirmedList = {
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

type groupedList = {
  [order_id: number]: ConfirmedList[];
};

export const ConfirmedList = () => {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) {
    return <div>Loading...</div>;
  }

  const { myCompany } = companyContext;
  const [groupingList, setGroupingList] = useState<groupedList>({});

  const fetchConfirmedOrderList = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/company/confirmedorder",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data: ConfirmedList[] = await res.json();
      const groupedList = data.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {} as groupedList);
      setGroupingList(groupedList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConfirmedOrderList();
  }, [myCompany]);

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        受注処理済み一覧
      </Typography>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
        {Object.entries(groupingList).map(([order_id, items]) => {
          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          );

          return (
            <Card
              key={order_id}
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
                    注文ID: {order_id}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    顧客: {items[0].user_name}
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
                      {items.map((item, index) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#fafafa" : "white",
                          }}
                        >
                          <TableCell>{item.product_name}</TableCell>
                          <TableCell>{item.model_number}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>¥{item.price.toLocaleString()}</TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "green" }}
                          >
                            ¥{(item.price * item.quantity).toLocaleString()}
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
