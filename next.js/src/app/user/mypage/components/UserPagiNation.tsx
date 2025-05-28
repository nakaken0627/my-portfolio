import { Pagination, Stack } from "@mui/material";

type Props = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  totalCount: number;
};

export const UserPagiNation = ({ page, setPage, limit, totalCount }: Props) => {
  const totalPages = Math.ceil(totalCount / limit);

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
