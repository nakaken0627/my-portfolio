"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AddCustomProduct } from "./AddCustomProduct";
import { AddDefaultProduct } from "./AddDefaultProduct";

export const RegisterSection = () => {
  const [isDefaultForm, setIsDefaultForm] = useState(true);
  return (
    <Accordion
      sx={{
        bgcolor: "#fafafa",
        border: "1px solid #ddd",
        boxShadow: 0,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id="panel-header"
        aria-controls="panel-content"
      >
        <Typography variant="h6">商品登録</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ maxWidth: 600, mx: "auto", width: "100%" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Button
              variant={isDefaultForm ? "contained" : "outlined"}
              fullWidth
              onClick={() => {
                setIsDefaultForm(true);
              }}
            >
              新規商品登録
            </Button>
            <Button
              variant={isDefaultForm ? "outlined" : "contained"}
              fullWidth
              onClick={() => {
                setIsDefaultForm(false);
              }}
            >
              個別商品登録
            </Button>
          </Stack>
          <Box sx={{ my: 2 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              {isDefaultForm ? <AddDefaultProduct /> : <AddCustomProduct />}
            </Paper>
          </Box>
        </Box>
        {/* <RegisterSection /> */}
      </AccordionDetails>
    </Accordion>
  );
};
