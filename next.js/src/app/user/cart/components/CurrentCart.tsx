"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProducts";
import { API_BASE_URL } from "@/lib/api";
import { CartProductWithPrice } from "@/types/cart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
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
    <Container maxWidth="lg" sx={{ borderRadius: 2, p: { xs: 1, sm: 2 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#333333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        カート
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          border: "1px solid #DDDDDD",
        }}
      >
        {cartProducts.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              py: 6,
              borderRadius: 2,
            }}
          >
            <ShoppingCartCheckoutIcon
              sx={{ fontSize: 80, color: "#A0A0A0", mb: 2 }}
            />
            <Typography
              variant="h6"
              sx={{ color: "#555555", fontWeight: "bold", mb: 1 }}
            >
              カートは空です
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#777777", textAlign: "center" }}
            >
              商品ページからお好きな商品を選んで
              <br />
              カートに追加してください。
            </Typography>
          </Box>
        ) : (
          <CartCard
            cartId={cartId}
            products={products}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        )}
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1">合計:</Typography>
          <Typography variant="h6" sx={{ color: "red" }}>
            ¥{calcCartTotalAmount(cartProducts, products).toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            onClick={handleCheckout}
            sx={{
              backgroundColor: "#81C784",
              px: 3,
              py: 1,
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#66BB6A" },
            }}
          >
            チェックアウト
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
