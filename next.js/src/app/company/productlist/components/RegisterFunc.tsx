"use client";

import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

import { AddCustomProduct } from "./AddCustomProduct";
import { AddDefaultProduct } from "./AddDefaultProduct";

export const RegisterFunc = () => {
  const [isDefaultForm, setIsDefaultForm] = useState(true);
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setIsDefaultForm(true);
          }}
        >
          新規商品登録
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setIsDefaultForm(false);
          }}
        >
          個別商品登録
        </Button>
      </Stack>
      <Box sx={{ my: 2 }}>
        {isDefaultForm ? <AddDefaultProduct /> : <AddCustomProduct />}
      </Box>
    </Box>
  );
};
