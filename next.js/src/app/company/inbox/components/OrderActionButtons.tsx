import { Box, Button, Grid } from "@mui/material";

type Props = {
  onConfirm: () => void;
  onToggleAll: () => void;
};

export const OrderActionButtons = ({ onConfirm, onToggleAll }: Props) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ mb: 3, width: "auto", flexWrap: "nowrap" }}
      >
        <Grid>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            注文確定
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={onToggleAll}>
            一括選択
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
