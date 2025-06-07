import { ProductWithCustomization } from "@/types/company";
import { Box, Grid, Typography } from "@mui/material";

type Props = {
  product: ProductWithCustomization;
};

export const ModalDefaultInfo = ({ product }: Props) => {
  return (
    <Box>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            component="img"
            src={product.imageUrl || "/images/sample.jpg"}
            alt={product.name}
            sx={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography sx={{ mb: 1 }}>型番: {product.model_number}</Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            価格: ¥{Number(product.price).toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 2, whiteSpace: "pre-line", color: "text.secondary" }}
          >
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
