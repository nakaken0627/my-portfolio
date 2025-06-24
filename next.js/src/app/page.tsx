import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/navigation/top/TopNav";
import { Box, Button, Toolbar, Typography } from "@mui/material";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <TopNav />
      <Toolbar />

      {/* ロゴ＋コンセプトエリア */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1000px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: 4,
          gap: 4,
        }}
      >
        {/* ロゴ */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Image
            src="/logo.png"
            alt="Smart Deal EC ロゴ"
            width={400}
            height={100}
            priority
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* コンセプト */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ color: "#4A4A4A", fontWeight: "bold", mb: 2 }}
          >
            企業とユーザーをつなぐ、新しい取引のかたち
          </Typography>
          <Typography sx={{ color: "#4A4A4A" }}>
            Smart Deal
            ECは、信頼できる企業とユーザーが安心して取引できるプラットフォームを提供します。
            スムーズな注文管理と柔軟なサービス設計で、双方にとって最適なショッピング体験を実現します。
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {/* ユーザー用ボタン */}
        <Box
          sx={{
            m: 2,
            p: 2,
            width: { xs: "90%", sm: "40%" },
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            border: `1px solid #D3D3D3`,
          }}
        >
          <Button
            component={Link}
            href="/auth/user-signin"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#E6F4EA",
              color: "#333333",
              borderRadius: 2,
              fontSize: "1.2rem",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#C8E6C9",
              },
            }}
          >
            ユーザー様はこちら
          </Button>
        </Box>

        {/* 企業用ボタン */}
        <Box
          sx={{
            m: 2,
            p: 2,
            width: { xs: "90%", sm: "40%" },
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            border: `1px solid #D3D3D3`,
          }}
        >
          <Button
            component={Link}
            href="/auth/company-signin"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#E6F0FA",
              color: "#333333",
              borderRadius: 2,
              fontSize: "1.2rem",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#D0E2F0",
              },
            }}
          >
            販売企業様はこちら
          </Button>
        </Box>
      </Box>

      {/* フッターアクセント */}
      <Box
        sx={{
          mt: 6,
          py: 3,
          bgcolor: "#FCE8E6",
          textAlign: "center",
          borderTop: "1px solid #D3D3D3",
        }}
      >
        <Typography variant="h6" sx={{ color: "#4A4A4A" }}>
          Smart Deal ECへようこそ
        </Typography>
      </Box>
    </div>
  );
}
