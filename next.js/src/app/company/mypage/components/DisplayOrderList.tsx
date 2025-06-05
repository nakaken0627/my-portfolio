"use client";

import { useContext, useState } from "react";
import { CompanyContext } from "@/context/company-context";
import { Container, Typography } from "@mui/material";
import { useConfirmedOrders } from "hooks/company/useConfirmedOrders";
import { useFetchOrderList } from "hooks/company/useFetchOrderList";

import { OrderActionButtons } from "./OrderActionButtons";
import { OrderCard } from "./OrderCard";

export const DisplayOrderList = () => {
  const companyContext = useContext(CompanyContext);
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  const { data, isError, isLoading } = useFetchOrderList();
  const { trigger } = useConfirmedOrders();
  if (!data) {
    return <Typography>データを取得中です...</Typography>;
  }
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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

  if (!companyContext) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        注文一覧
      </Typography>
      <OrderActionButtons
        onConfirm={() => handleClickChangeStatus(confirmedIds)}
        onToggleAll={handlePushAllIds}
      />

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
