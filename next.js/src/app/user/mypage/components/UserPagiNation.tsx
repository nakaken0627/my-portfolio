"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/components/lib/api";
import { Pagination, Stack } from "@mui/material";

type Props = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
};

export const UserPagiNation = ({ page, setPage, limit }: Props) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    const fetchTotalProductsNum = async () => {
      const response = await fetch(`${API_BASE_URL}/api/user/products/count`, {
        method: "GET",
      });
      const data: { count: number } = await response.json();
      setTotalCount(data.count);
    };
    void fetchTotalProductsNum();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };
  return (
    <Stack alignItems="center" sx={{ mt: 4 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
};
