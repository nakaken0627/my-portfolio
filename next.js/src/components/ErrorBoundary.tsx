"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

import { logger } from "../lib/logger";

const currentEnv = process.env.NEXT_PUBLIC_NODE_ENV ?? process.env.NODE_ENV;

type Props = {
  children: ReactNode; // エラー境界でラップする子要素
  fallback?: ReactNode; // エラー発生時に表示する代替UI
};

type State = {
  hasError: boolean; // エラーが発生したかどうかのフラグ
  error: Error | null; // キャッチされたエラーオブジェクト
  errorInfo: ErrorInfo | null; // エラー情報（コンポーネントスタックなど）
  showDetails: boolean; // 開発環境での詳細表示のトグル
};

// 詳細表示ボタンのスタイル
const ExpandMore = styled(
  (props: { expand: boolean; onClick: () => void; children?: ReactNode }) => {
    const { ...other } = props;
    return <IconButton {...other} />;
  },
)(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false, // 初期状態では詳細を非表示
    };
  }

  // エラーが発生した場合に state を更新し、次のレンダーでフォールバックUIを表示する
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error,
      errorInfo: null,
      showDetails: false,
    };
  }

  // エラー情報（コンポーネントスタックなど）をログに記録する
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const logContext: Record<string, unknown> = {
      componentName: this.constructor.name,
    };

    if (errorInfo.componentStack) {
      logContext.componentStack = errorInfo.componentStack;
    }
    // ロガーを使ってエラー情報を出力（開発環境のみconsoleに出力）
    logger.error(error, logContext);

    // stateにエラー情報を保存（開発環境での表示用）
    this.setState({ errorInfo });
  }

  // 詳細表示のトグル
  handleToggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            padding: 4,
            textAlign: "center",
          }}
        >
          <Alert severity="error" sx={{ maxWidth: 600, width: "100%", mb: 3 }}>
            <AlertTitle>問題が発生しました。</AlertTitle>
            <Typography variant="body1">
              大変申し訳ございません。予期せぬエラーが発生しました。
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              時間をおいて再度お試しいただくか、管理者にご連絡ください。
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                window.location.reload();
              }}
              sx={{ mt: 2 }}
            >
              ページをリロード
            </Button>
          </Alert>

          {/* 開発環境の場合のみ、詳細なエラー情報を表示 */}
          {(currentEnv === "development" || currentEnv === "test") &&
            this.state.error && (
              <Box sx={{ maxWidth: 600, width: "100%", mt: 2 }}>
                <Button
                  variant="text"
                  onClick={this.handleToggleDetails}
                  endIcon={
                    <ExpandMore
                      expand={this.state.showDetails}
                      onClick={this.handleToggleDetails}
                      aria-expanded={this.state.showDetails}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  }
                  sx={{ textTransform: "none" }}
                >
                  {this.state.showDetails ? "詳細を非表示" : "エラー詳細を表示"}
                </Button>
                <Collapse in={this.state.showDetails}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: 2,
                      mt: 1,
                      textAlign: "left",
                      overflowWrap: "break-word",
                    }}
                  >
                    <Typography variant="subtitle2" color="error">
                      エラーメッセージ:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{ bgcolor: "#eee", p: 1, overflowX: "auto" }}
                    >
                      {this.state.error.message}
                    </Typography>

                    {this.state.errorInfo?.componentStack && (
                      <>
                        <Typography
                          variant="subtitle2"
                          color="error"
                          sx={{ mt: 2 }}
                        >
                          コンポーネントスタック:
                        </Typography>
                        <Typography
                          variant="body2"
                          component="pre"
                          sx={{ bgcolor: "#eee", p: 1, overflowX: "auto" }}
                        >
                          {this.state.errorInfo.componentStack}
                        </Typography>
                      </>
                    )}

                    {this.state.error.stack && (
                      <>
                        <Typography
                          variant="subtitle2"
                          color="error"
                          sx={{ mt: 2 }}
                        >
                          スタックトレース:
                        </Typography>
                        <Typography
                          variant="body2"
                          component="pre"
                          sx={{ bgcolor: "#eee", p: 1, overflowX: "auto" }}
                        >
                          {this.state.error.stack}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Collapse>
              </Box>
            )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
