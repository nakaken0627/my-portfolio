import { useCallback, useEffect, useState } from "react";
import { logger } from "@/lib/logger";

export const useErrorHandling = () => {
  const [error, setError] = useState<Error | null>(null);

  // useEffectでerrorを監視し、handleErrorでerrを捕捉した際にスローすることで
  // ErrorBoundary がキャッチしてUIを更新する
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const handleError = useCallback(
    (err: unknown, context?: Record<string, unknown>) => {
      logger.error(err, context);
      setError(err instanceof Error ? err : new Error(String(err))); // Stateを更新することでuseEffectが発火する
    },
    [],
  );

  return handleError;
};
