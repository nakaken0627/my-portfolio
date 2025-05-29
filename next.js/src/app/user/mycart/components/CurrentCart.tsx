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
    customizationId: number | null;
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
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        カート
      </Typography>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f1f8e9" }}>
        {cartProducts.length === 0 ? (
          <Typography>カートが空です</Typography>
        ) : (
          <Box sx={{ overflowY: "auto", overflowX: "auto" }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                fontWeight: "bold",
                mb: 1,
                px: 2,
                py: 1,
                minWidth: 1000,
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <Grid
                size={{ xs: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                型番
              </Grid>
              <Grid
                size={{ xs: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                商品名
              </Grid>
              <Grid
                size={{ xs: 1 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                種別
              </Grid>
              <Grid
                size={{ xs: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                価格
              </Grid>
              <Grid
                size={{ xs: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                数量
              </Grid>
              <Grid
                size={{ xs: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                小計
              </Grid>
              <Grid
                size={{ xs: 1 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minWidth: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                操作
              </Grid>
            </Grid>

            {cartProducts.map((cartProduct) => {
              const product = productWithCustomList.find(
                (item) => item.id === cartProduct.productId,
              );
              if (!product) return null;

              const custom = cartProduct.customizationId
                ? product.customization.find(
                    (c) => c.id === cartProduct.customizationId,
                  )
                : null;

              return (
                <Grid
                  container
                  key={`${String(cartProduct.productId)}-${String(cartProduct.customizationId ?? "null")}`}
                  spacing={2}
                  alignItems="center"
                  sx={{
                    backgroundColor: "#e8f5e9",
                    borderRadius: 2,
                    mb: 1,
                    px: 2,
                    py: 1,
                    minWidth: 1000,
                    overflowY: "auto",
                    overflowX: "auto",
                  }}
                >
                  <Grid
                    size={{ xs: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>
                      {custom?.model_number ?? product.model_number}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>{custom?.name ?? product.name}</Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 1 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>{custom ? `個別品` : "共通品"}</Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>
                      ¥
                      {Math.round(
                        custom?.price ?? product.price,
                      ).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 2 }}
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        size="small"
                        sx={{ minWidth: 32, px: 1 }}
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
                          mx: 0.5,
                          width: 50,
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
                        size="small"
                        sx={{ minWidth: 32, px: 1 }}
                        onClick={() =>
                          addProduct(product.id, custom?.id ?? null)
                        }
                      >
                        +
                      </Button>
                    </Box>
                  </Grid>
                  <Grid
                    size={{ xs: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>
                      ¥
                      {calcProductTotalAmount(
                        product.id,
                        custom?.id ?? null,
                      ).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 1 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      minWidth: 10,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Button
                      color="error"
                      size="small"
                      onClick={() =>
                        deleteProduct(product.id, custom?.id ?? null)
                      }
                    >
                      削除
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        )}

        <Divider sx={{ my: 3 }} />
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            合計: ¥{calcCartTotalAmount().toLocaleString()}
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
