"use client";

import { Container, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

import { ProductCard } from "./ProductCard";

export default function ProductsList() {
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { productList } = cartContext;

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        商品一覧
      </Typography>
      <Grid container spacing={4}>
        {productList.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <ProductCard product={product} priority={index === 0} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
