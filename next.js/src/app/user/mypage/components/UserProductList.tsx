"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { UserProductWithCustomization } from "@/types/user";
import { Box, Container, Grid, Typography } from "@mui/material";

import { UserPagiNation } from "./UserPagiNation";
import { UserProductItem } from "./UserProductItem";

const limit = 4; //商品の表示数の制限

export const UserProductList = () => {
  const [products, setProducts] = useState<UserProductWithCustomization[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/products/custom?page=${String(page)}&limit=${String(limit)}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("[UserProductList]fetchProductsでエラー発生");
        }
        const data: UserProductWithCustomization[] = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    void fetchProducts();
  }, [page]);

  return (
    <Container maxWidth="lg" sx={{ padding: 2, py: 1 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "green", textAlign: "center" }}
      >
        商品一覧
      </Typography>
      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
            <UserProductItem id={p.id} product={p} />
          </Grid>
        ))}
      </Grid>
      <UserPagiNation page={page} setPage={setPage} limit={limit} />
    </Container>
  );
};
