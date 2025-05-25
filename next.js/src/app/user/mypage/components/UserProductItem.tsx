import { useState } from "react";
import Image from "next/image";
import { UserProductWithCustomization } from "@/types/user";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

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
    <Grid container spacing={2}>
      <Grid>
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
            p: 2,
          }}
          key={id}
        >
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Grid>
                <Box
                  sx={{
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
              <Grid>
                <Box>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    型番: {product.model_number}
                  </Typography>
                  <Typography variant="body2">
                    企業: {product.company_name}
                  </Typography>
                  <Typography variant="body2">
                    説明: {product.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    ¥{Math.round(product.price).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<AddShoppingCartIcon />}
                sx={{ whiteSpace: "nowrap" }}
              >
                カートへ
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<TuneIcon />}
                onClick={handleDrawerOpen}
                sx={{ whiteSpace: "nowrap" }}
              >
                カスタマイズ
              </Button>
            </Stack>
          </Grid>
        </Card>

        <UserDrawer drawerProps={DrawerProps} />
      </Grid>
    </Grid>
  );
};
