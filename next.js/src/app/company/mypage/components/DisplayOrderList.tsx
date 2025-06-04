"use client";

import { useContext, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CompanyContext } from "@/context/company-context";
import { OrderProduct } from "@/types/company";
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
import { useCompany } from "hooks/company/useCompanySWR";

export const DisplayOrderList = () => {
  const companyContext = useContext(CompanyContext);
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  const { data, isError, isLoading } = useCompany(
    `${API_BASE_URL}/api/company/orders?is_confirmed=false`,
  );
  if (!data) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const orderTotalAmount = (data: OrderProduct[]) => {
    return data.reduce((total, p) => {
      const custom = p.customization;
      return custom
        ? total + custom.price * p.quantity
        : total + p.price * p.quantity;
    }, 0);
  };

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
    } catch (err) {
      console.error(err);
    }
  };

  const handlePushAllIds = () => {
    if (confirmedIds.length > 0) {
      setConfirmedIds([]);
    } else {
      const idArray = data.flatMap((item) =>
        item.products.map((i) => i.orderProductId),
      );
      setConfirmedIds(idArray);
    }
  };

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

      {data.map((o) => {
        const totalAmount = orderTotalAmount(o.products);

        return (
          <Card
            key={o.orderId}
            sx={{
              mb: 4,
              border: totalAmount >= 50000 ? "2px solid red" : "1px solid #ccc",
              backgroundColor: totalAmount >= 50000 ? "#fff5f5" : "white",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                オーダーID: {o.orderId}
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
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};
