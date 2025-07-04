import { OrderCustom, OrderProduct, Transformed } from "@/types/user";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Props = {
  orders: Transformed[];
};

export const OrderDisplay = ({ orders }: Props) => {
  const orderTotalAmount = (
    data: (OrderProduct & { custom: OrderCustom | null })[],
  ) => {
    return data.reduce((total, p) => {
      const custom = p.custom;
      return custom
        ? total + custom.price * p.quantity
        : total + p.price * p.quantity;
    }, 0);
  };

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          color: "#333333",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        注文履歴
      </Typography>

      {orders.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#E6F4EA",
            borderRadius: 2,
            py: 6,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: 60, color: "#A5D6A7", mb: 2 }}
          />
          <Typography variant="h6" sx={{ color: "#4A4A4A", mb: 1 }}>
            現在、注文履歴はありません。
          </Typography>
          <Typography variant="body2" sx={{ color: "#777" }}>
            ご注文いただいた内容は、こちらに表示されます。
          </Typography>
        </Paper>
      ) : (
        orders.map((o) => (
          <Paper
            key={o.orderId}
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 4,
              borderRadius: 2,
            }}
          >
            <Box
              mb={2}
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333333" }}
              >
                注文ID: {o.orderId}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#4A4A4A", fontWeight: "bold" }}
                >
                  合計金額:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "red", fontWeight: "bold" }}
                >
                  ¥{orderTotalAmount(o.products).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <TableContainer
              sx={{
                overflowX: "auto",
                border: "1px solid #DDDDDD",
                borderRadius: 1,
              }}
            >
              <Table size="small" sx={{ minWidth: 600 }}>
                <TableHead sx={{ backgroundColor: "#EDEDED" }}>
                  <TableRow>
                    <TableCell sx={{ minWidth: 100, fontWeight: "bold" }}>
                      型番
                    </TableCell>
                    <TableCell sx={{ minWidth: 120, fontWeight: "bold" }}>
                      商品名
                    </TableCell>
                    <TableCell sx={{ minWidth: 100, fontWeight: "bold" }}>
                      単価
                    </TableCell>
                    <TableCell sx={{ minWidth: 80, fontWeight: "bold" }}>
                      数量
                    </TableCell>
                    <TableCell sx={{ minWidth: 100, fontWeight: "bold" }}>
                      金額
                    </TableCell>
                    <TableCell sx={{ minWidth: 120, fontWeight: "bold" }}>
                      発注先
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {o.products.map((p) => (
                    <TableRow
                      key={`${String(p.id)}-${String(p.custom?.id)}`}
                      hover
                      sx={{
                        backgroundColor: "#FFFFFF",
                        "&:nth-of-type(even)": { backgroundColor: "#F9F9F9" },
                      }}
                    >
                      <TableCell>
                        {p.custom?.modelNumber ?? p.modelNumber}
                      </TableCell>
                      <TableCell>{p.custom?.name ?? p.name}</TableCell>
                      <TableCell>
                        ¥
                        {Math.round(
                          p.custom?.price ?? p.price,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>{p.quantity}</TableCell>
                      <TableCell>
                        ¥
                        {Math.round(
                          (p.custom?.price ?? p.price) * p.quantity,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>{p.companyName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))
      )}
    </Container>
  );
};
