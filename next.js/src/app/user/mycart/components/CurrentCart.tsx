"use client";

import { useContext } from "react";
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
    productList,
    calcProductTotalAmount,
    calcCartTotalAmount,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    deleteProduct,
  } = cartContext;

  if (!myUser || !cartId) return null;

  const cartProductsWithPrice = () => {
    if (!cartProducts) return [];
    return cartProducts.map((product) => {
      const findItem = productList.find(
        (item) => item.id === product.product_id,
      );
      const price = findItem?.price;
      return { ...product, price };
    });
  };

  const handleCheckout = async () => {
    const cartProductWithPriceData = cartProductsWithPrice();
    try {
      const data = await fetch("http://localhost:3001/api/cart/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cartId.id,
          cartProducts: cartProductWithPriceData,
        }),
      });
      if (!data) return;
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
            const product = productList.find(
              (item) => item.id === cartProduct.product_id,
            );
            if (!product) return null;

            return (
              <Box key={cartProduct.product_id} sx={{ mb: 3 }}>
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  sx={{ backgroundColor: "#E3F2FD", p: 2, borderRadius: 2 }}
                >
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Typography>{product.product_name}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <Typography>
                      ¥{Math.round(product.price).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box display="flex" alignItems="center">
                      <Button onClick={() => reduceProduct(product.id)}>
                        -
                      </Button>
                      <TextField
                        value={cartProduct.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id,
                            Number(e.target.value),
                          )
                        }
                        type="number"
                        size="small"
                        sx={{
                          width: 60,
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
                      />
                      <Button onClick={() => addProduct(product.id)}>+</Button>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <Typography>
                      ¥{calcProductTotalAmount(product.id).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 1 }}>
                    <Button
                      color="error"
                      onClick={() => deleteProduct(product.id)}
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
