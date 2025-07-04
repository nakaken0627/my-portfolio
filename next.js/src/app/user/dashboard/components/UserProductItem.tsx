import { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { UserProductWithCustom } from "@/types/user";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { Box, Button, Card, Grid, Typography } from "@mui/material";

import { UserDrawer } from "./UserDrawer";

type Props = {
  id: number;
  product: UserProductWithCustom;
};

export const UserProductItem = ({ id, product }: Props) => {
  const cartContext = useContext(CartContext);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  if (!cartContext) {
    return <Typography>Loading...</Typography>;
  }

  const { addProduct } = cartContext;

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const DrawerProps = {
    openDrawer: openDrawer,
    handleDrawerClose: handleDrawerClose,
    productId: product.id,
    customization: product.custom,
  };

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          bgcolor: "#f0fff4",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
        }}
        key={id}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box
              sx={{
                mt: 2,
                width: "100%",
                height: 200,
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src={product.imageUrl ?? "/images/sample.jpg"}
                alt={product.name}
                width={400}
                height={180}
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 7 }}>
            <Box
              sx={{
                mx: 3,
                whiteSpace: "nowrap",
                overflowX: "auto",
                display: "block",
                maxWidth: "100%",
                fontSize: "14px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  my: 1,
                  mt: 1,
                  fontWeight: "bold",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ my: 1, fontSize: 13, color: "gray" }}
              >
                販売企業: {product.companyName}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                型番: {product.modelNumber}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                説明:
              </Typography>
              <Typography variant="body2">・{product.description}</Typography>
              <Typography
                variant="subtitle1"
                sx={{ my: 1, mt: 1, fontWeight: "bold", color: "red" }}
              >
                ¥{Math.round(product.price).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ mx: 2 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<AddShoppingCartIcon />}
                sx={{ px: 3, whiteSpace: "nowrap", fontWeight: "bold" }}
                onClick={() => addProduct(product.id, null)}
              >
                カートへ
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="success"
          fullWidth
          startIcon={<FormatListBulletedOutlinedIcon />}
          onClick={handleDrawerOpen}
          sx={{
            px: 3,
            mt: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderColor: "#4caf50",
            fontWeight: "bold",
          }}
        >
          カスタム品一覧 （{String(product.custom.length)}）
        </Button>
      </Card>

      <UserDrawer drawerProps={DrawerProps} />
    </Box>
  );
};
