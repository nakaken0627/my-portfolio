"use client";

import { useState } from "react";
import { useFetchPageProducts } from "@/hooks/user/useFetchPageProducts";
import { Container, Grid, Typography } from "@mui/material";

import { UserPagiNation } from "./UserPagiNation";
import { UserProductItem } from "./UserProductItem";

const limit = 4; //商品の表示数を指定

export const UserProductList = () => {
  const [page, setPage] = useState(1);

  const { result, isLoading, isError } = useFetchPageProducts(page, limit);

  if (!result) return <Typography>読み込み中...</Typography>;
  if (isLoading) return <Typography>読み込み中...</Typography>;
  if (isError) return <Typography>エラーが発生しました。</Typography>;

  return (
    <Container maxWidth="lg" sx={{ padding: 2, py: 1 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#333333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        商品一覧
      </Typography>

      <Grid container spacing={4}>
        {result.data.map((p) => (
          <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
            <UserProductItem id={p.id} product={p} />
          </Grid>
        ))}
      </Grid>

      <UserPagiNation
        page={page}
        setPage={setPage}
        limit={limit}
        totalCount={result.total}
      />
    </Container>
  );
};
