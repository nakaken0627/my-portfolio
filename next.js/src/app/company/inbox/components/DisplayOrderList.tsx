"use client";

import { useState } from "react";
import { useConfirmedOrders } from "@/hooks/company/useConfirmedOrders";
import { useFetchOrderList } from "@/hooks/company/useFetchOrderList";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { Box, Container, Paper, Typography } from "@mui/material";

import { OrderActionButtons } from "./OrderActionButtons";
import { OrderCard } from "./OrderCard";

export const DisplayOrderList = () => {
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);
  const { data, isError, isLoading } = useFetchOrderList();
  const { trigger } = useConfirmedOrders();

  if (!data) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isError) return <Typography>データを取得中に失敗しました</Typography>;
  if (isLoading) return <Typography>データを取得中です...</Typography>;

  const handleCheckBoxStatus = (id: number) => {
    setConfirmedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleClickChangeStatus = async (confirmedIds: number[]) => {
    await trigger(confirmedIds);
    setConfirmedIds([]);
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

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 3,
        borderRadius: 2,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#4A4A4A", whiteSpace: "nowrap" }}
        >
          注文一覧
        </Typography>
        <OrderActionButtons
          onConfirm={() => handleClickChangeStatus(confirmedIds)}
          onToggleAll={handlePushAllIds}
        />
      </Box>

      {/* データがない場合の表示画面 */}
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
          <PlaylistAddOutlinedIcon
            sx={{ fontSize: 60, color: "#A2BBD7", mb: 2 }}
          />
          <Typography variant="h6" sx={{ color: "#4A4A4A", mb: 1 }}>
            現在、注文は登録されていません
          </Typography>
          <Typography variant="body2" sx={{ color: "#777" }}>
            ユーザーから注文が届くと、こちらに表示されます。
          </Typography>
        </Paper>
      ) : (
        data.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            confirmedIds={confirmedIds}
            onCheck={handleCheckBoxStatus}
          />
        ))
      )}
    </Container>
  );
};
