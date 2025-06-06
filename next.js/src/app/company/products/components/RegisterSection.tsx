"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AddCustomProduct } from "./AddCustomProduct/AddCustomProduct";
import { AddDefaultProduct } from "./AddDefaultProduct/AddDefaultProduct";

export const RegisterSection = () => {
  const [isDefaultForm, setIsDefaultForm] = useState(true);
  return (
    <Container maxWidth="lg">
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
          id="panel-header"
          aria-controls="panel-content"
          sx={{ minHeight: 40, "& .MuiAccordionSummary-content": { my: 0.5 } }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            商品登録（新規 / 個別）
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, pt: 1 }}>
          <Box sx={{ maxWidth: 600, mx: "auto", width: "100%" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mb: 1.5 }}
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
            <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "#fff" }}>
              {isDefaultForm ? <AddDefaultProduct /> : <AddCustomProduct />}
            </Paper>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
