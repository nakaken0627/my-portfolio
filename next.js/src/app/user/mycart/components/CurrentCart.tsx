"use client";

import { useContext } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { CartContext } from "@/context/cart-context";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const CurrentCart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <Typography>Loading...</Typography>;
  }

  const {
    myUser,
    cartId,
    cartProducts,
    setCartProducts,
    productWithCustomList,
    calcProductTotalAmount,
    calcCartTotalAmount,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    deleteProduct,
  } = cartContext;

  if (!myUser || !cartId) return null;

  type CartProduct = {
    productId: number;
    customizationId?: number | null;
    quantity: number;
  };

  type CartProductWithPrice = CartProduct & { price: number | null };

  const cartProductsWithPrice = (): CartProductWithPrice[] => {
    return cartProducts.map((cp) => {
      const product = productWithCustomList.find(
        (item) => item.id === cp.productId,
      );
      if (!product) return { ...cp, price: null };

      const custom = cp.customizationId
        ? product.customization.find((c) => c.id === cp.customizationId)
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
          cartId: cartId.id,
          cartProducts: cartProductWithPriceData,
        }),
      });
      setCartProducts([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        カート
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        {cartProducts.length === 0 ? (
          <Typography>カートが空です</Typography>
        ) : (
          cartProducts.map((cartProduct) => {
            const product = productWithCustomList.find(
              (item) => item.id === cartProduct.productId,
            );
            if (!product) return null;
            const custom =
              cartProduct.customizationId !== null
                ? product.customization.find(
                    (c) => c.id === cartProduct.customizationId,
                  )
                : null;

            const displayItem = custom ?? product;

            return (
              <Box
                key={`${String(cartProduct.productId)}-${String(cartProduct.customizationId)}`}
                sx={{ mb: 3 }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  sx={{ backgroundColor: "#E3F2FD", p: 2, borderRadius: 2 }}
                >
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <Typography sx={{ ml: 2 }}>
                      {displayItem.model_number}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Typography>{displayItem.name}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 1 }}>
                    <Typography>
                      ¥{Math.round(displayItem.price).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Box display="flex" alignItems="center">
                      <Button
                        onClick={() =>
                          reduceProduct(product.id, custom?.id ?? null)
                        }
                      >
                        -
                      </Button>
                      <TextField
                        value={cartProduct.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id,
                            custom?.id ?? null,
                            Number(e.target.value),
                          )
                        }
                        type="number"
                        size="small"
                        sx={{
                          width: 80,
                          "& input": {
                            textAlign: "center",
                            padding: 0,
                          },
                          "& input[type=number]": {
                            MozAppearance: "textfield",
                          },
                          "& input[type=number]::-webkit-inner-spin-button": {
                            WebkitAppearance: "none",
                            margin: 0,
                          },
                          "& input[type=number]::-webkit-outer-spin-button": {
                            WebkitAppearance: "none",
                            margin: 0,
                          },
                        }}
                        slotProps={{
                          input: {
                            style: {
                              height: "30px",
                              padding: 0,
                              lineHeight: "30px",
                            },
                          },
                        }}
                      />
                      <Button
                        onClick={() =>
                          addProduct(product.id, custom?.id ?? null)
                        }
                      >
                        +
                      </Button>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <Typography>
                      ¥
                      {calcProductTotalAmount(
                        product.id,
                        custom?.id ?? null,
                      ).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 1 }}>
                    <Button
                      color="error"
                      sx={{ mr: 2 }}
                      onClick={() =>
                        deleteProduct(product.id, custom?.id ?? null)
                      }
                    >
                      削除
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            );
          })
        )}
        <Divider sx={{ my: 4 }} />
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            合計: ¥{calcCartTotalAmount().toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            sx={{ px: 4, py: 1.5 }}
          >
            チェックアウト
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
