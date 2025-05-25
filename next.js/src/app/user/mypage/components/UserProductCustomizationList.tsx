import { UserProductCustomization } from "@/types/user";
import { Box, Button, Divider, Typography } from "@mui/material";

type Props = {
  customization: UserProductCustomization[];
};

export const UserProductCustomizationList = ({ customization }: Props) => {
  if (!customization.length)
    return <Typography>カスタマイズ品はありません。</Typography>;

  return (
    <Box>
      {customization.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Typography variant="body2">型番: {item.model_number}</Typography>
          <Typography variant="body2">説明: {item.description}</Typography>
          <Typography variant="body2">
            ¥{Math.round(item.price).toLocaleString()}
          </Typography>
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>
            カートに追加
          </Button>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};
