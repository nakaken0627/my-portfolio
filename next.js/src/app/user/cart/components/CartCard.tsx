import { Dispatch, SetStateAction, useContext } from "react";
import { CartContext } from "@/context/cart-context";
import { UserProductWithCustom } from "@/types/user";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { calcProductTotalAmount } from "./calcProductTotalAmount";

type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

type Props = {
  cartId: number;
  products: UserProductWithCustom[];
  cartProducts: CartProduct[];
  setCartProducts: Dispatch<SetStateAction<CartProduct[]>>;
};

export const CartCard = ({ products, cartProducts }: Props) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <Typography>Loading...</Typography>;
  }

  const { addProduct, reduceProduct, handleQuantityChange, deleteProduct } =
    cartContext;

  return (
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
        const product = products.find(
          (item) => item.id === cartProduct.productId,
        );
        if (!product) return null;

        const custom = cartProduct.customizationId
          ? product.custom.find((c) => c.id === cartProduct.customizationId)
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
                {custom?.modelNumber ?? product.modelNumber}
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
                ¥{Math.round(custom?.price ?? product.price).toLocaleString()}
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
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  size="small"
                  sx={{ minWidth: 32, px: 1 }}
                  onClick={() => reduceProduct(product.id, custom?.id ?? null)}
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
                  onClick={() => addProduct(product.id, custom?.id ?? null)}
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
                  products,
                  cartProducts,
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
                onClick={() => deleteProduct(product.id, custom?.id ?? null)}
              >
                削除
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};
