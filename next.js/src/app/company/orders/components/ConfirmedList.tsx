"use client";

import { useFetchConfirmedList } from "@/hooks/company/useFetchConfirmedList";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Box, Container, Paper, Typography } from "@mui/material";

import { OrderCard } from "./OrderCard";

export const ConfirmedList = () => {
  const { data, isError, isLoading } = useFetchConfirmedList();

  if (!data) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isError) return <Typography>データを取得中に失敗しました</Typography>;
  if (isLoading) return <Typography>データを取得中です...</Typography>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 3,
        backgroundColor: "#F5F5F5",
        borderRadius: 2,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#333333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        確定済一覧
      </Typography>

      {/* データがない場合の表示 */}
      {data.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#E6F0FA",
            borderRadius: 2,
            py: 6,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Inventory2OutlinedIcon
            sx={{ fontSize: 60, color: "#A2BBD7", mb: 2 }}
          />
          <Typography variant="h6" sx={{ color: "#4A4A4A", mb: 1 }}>
            現在、確定済みの注文はありません
          </Typography>
          <Typography variant="body2" sx={{ color: "#777" }}>
            注文を受けて「注文一覧」から確定すると、 こちらに表示されます。
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
          {data.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </Box>
      )}
    </Container>
  );
};
