import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";

import { AddCustomProduct } from "../AddCustomProduct/AddCustomProduct";

type Props = {
  onAddSuccess?: () => void;
};

export const ModalForm = ({ onAddSuccess }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 1,
      }}
    >
      <Accordion
        sx={{
          bgcolor: "#f9f9f9",
          border: "1px solid #e0e0e0",
          boxShadow: "none",
          borderRadius: 1,
          mt: 2,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="custom-product-panel-header"
          aria-controls="custom-product-panel-content"
          sx={{
            minHeight: "40px",
            "& .MuiAccordionSummary-content": { my: 0.5 },
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            カスタム品登録
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 1.5, pt: 0 }}>
          <Paper elevation={0} sx={{ p: 1, backgroundColor: "#fff" }}>
            <AddCustomProduct onAddSuccess={onAddSuccess} />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
