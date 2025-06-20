"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProducts";
import { API_BASE_URL } from "@/lib/api";
import { CartProductWithPrice } from "@/types/cart";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import { calcCartTotalAmount } from "./calcCartTotalAmount";
import { CartCard } from "./CartCard";

export const CurrentCart = () => {
  const { products } = useFetchUserProducts();
  const cartContext = useContext(CartContext);
  const handleError = useErrorHandling();

  if (!cartContext) {
    return <Typography>Loading...</Typography>;
  }

  const { cartId, cartProducts, setCartProducts } = cartContext;

  if (!products) return;
  if (!cartId) return null;

  const cartProductsWithPrice = (): CartProductWithPrice[] => {
    return cartProducts.map((cp) => {
      const product = products.find((item) => item.id === cp.productId);
      if (!product) return { ...cp, price: null };

      const custom = cp.customizationId
        ? product.custom.find((c) => c.id === cp.customizationId)
        : null;

      const price = custom ? custom.price : product.price;

      return { ...cp, price };
    });
  };

  const handleCheckout = async () => {
    const cartProductWithPriceData = cartProductsWithPrice();
    try {
      await fetch(`${API_BASE_URL}/api/cart/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId,
          cartProducts: cartProductWithPriceData,
        }),
      });
      setCartProducts([]);
    } catch (err) {
      handleError(err, { component: "CurrentCart", action: "handleCheckout" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        カート
      </Typography>

      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f1f8e9" }}>
        {cartProducts.length === 0 ? (
          <Typography>カートが空です</Typography>
        ) : (
          <CartCard
            cartId={cartId}
            products={products}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        )}

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            合計: ¥
            {calcCartTotalAmount(cartProducts, products).toLocaleString()}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#81c784",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#66bb6a",
              },
            }}
            onClick={handleCheckout}
          >
            チェックアウト
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
