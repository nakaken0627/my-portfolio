"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";

import { AddCustomProduct } from "./AddCustomProduct";
import { AddDefaultProduct } from "./AddDefaultProduct";

export const RegisterFunc = () => {
  const [isDefaultForm, setIsDefaultForm] = useState(true);
  return (
    <Box>
      <Button
        onClick={() => {
          setIsDefaultForm(true);
        }}
      >
        新規商品登録
      </Button>
      <Button
        onClick={() => {
          setIsDefaultForm(false);
        }}
      >
        個別商品登録
      </Button>
      {isDefaultForm ? <AddDefaultProduct /> : <AddCustomProduct />}
    </Box>
  );
};
