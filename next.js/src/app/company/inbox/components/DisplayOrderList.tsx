"use client";

import { useState } from "react";
import { useConfirmedOrders } from "@/hooks/company/useConfirmedOrders";
import { useFetchOrderList } from "@/hooks/company/useFetchOrderList";
import { Box, Container, Typography } from "@mui/material";

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
        backgroundColor: "#F5F5F5",
        borderRadius: 2,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
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

      {data.map((order) => (
        <OrderCard
          key={order.orderId}
          order={order}
          confirmedIds={confirmedIds}
          onCheck={handleCheckBoxStatus}
        />
      ))}
    </Container>
  );
};
