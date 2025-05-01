import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/cart-context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

type ProductProps = {
  product_name: string;
  id: number;
  model_number: string;
  price: number;
  description: string;
  company_name: string;
  priority: boolean;
};

export const ProductCard = ({
  id,
  product_name,
  model_number,
  price,
  description,
  company_name,
  priority = false,
}: ProductProps) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { addProduct } = cartContext;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Image
        alt={product_name}
        src="/images/sample.jpg"
        width={400}
        height={300}
        priority={priority}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6">{product_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          型番: {model_number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          説明: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          企業: {company_name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          ¥{Math.round(price).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button variant="contained" fullWidth onClick={() => addProduct(id)}>
          カートに追加
        </Button>
      </CardActions>
    </Card>
  );
};
