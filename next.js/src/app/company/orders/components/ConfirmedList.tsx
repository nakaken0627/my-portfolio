"use client";

import { useFetchConfirmedList } from "@/hooks/company/useFetchConfirmedList";
import { Box, Container, Typography } from "@mui/material";

import { OrderCard } from "./OrderCard";

export const ConfirmedList = () => {
  const { data, isError, isLoading } = useFetchConfirmedList();
  if (!data) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isError) return <Typography>データを取得中に失敗しました</Typography>;
  if (isLoading) return <Typography>データを取得中です...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        受注処理済み一覧
      </Typography>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
        {data.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </Box>
    </Container>
  );
};
