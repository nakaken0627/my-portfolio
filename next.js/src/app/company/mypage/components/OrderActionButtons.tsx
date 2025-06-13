import { Button, Grid } from "@mui/material";

type Props = {
  onConfirm: () => void;
  onToggleAll: () => void;
};

export const OrderActionButtons = ({ onConfirm, onToggleAll }: Props) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          受注確定
        </Button>
      </Grid>
      <Grid>
        <Button variant="outlined" onClick={onToggleAll}>
          一括選択
        </Button>
      </Grid>
    </Grid>
  );
};
