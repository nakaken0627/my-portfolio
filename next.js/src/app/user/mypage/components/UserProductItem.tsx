import { useState } from "react";
import Image from "next/image";
import { UserProductWithCustomization } from "@/types/user";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { Box, Button, Card, Grid, Typography } from "@mui/material";

import { UserDrawer } from "./UserDrawer";

type Props = {
  id: number;
  product: UserProductWithCustomization;
};

export const UserProductItem = ({ id, product }: Props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const DrawerProps = {
    openDrawer: openDrawer,
    handleDrawerClose: handleDrawerClose,
    customization: product.customization,
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
              <Typography variant="body2" sx={{ my: 1 }}>
                型番: {product.model_number}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                企業: {product.company_name}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                説明:
              </Typography>
              <Typography variant="body2">・{product.description}</Typography>
              <Typography
                variant="subtitle1"
                sx={{ my: 1, mt: 1, fontWeight: "bold" }}
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
                sx={{ px: 3, whiteSpace: "nowrap" }}
              >
                カートへ
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<FormatListBulletedOutlinedIcon />}
          onClick={handleDrawerOpen}
          sx={{
            px: 3,
            mt: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#4caf50",
            borderColor: "#4caf50",
          }}
        >
          個別商品一覧 （{String(product.customization.length)}）
        </Button>
      </Card>

      <UserDrawer drawerProps={DrawerProps} />
    </Box>
  );
};
