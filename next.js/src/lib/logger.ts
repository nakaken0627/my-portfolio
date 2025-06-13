/* eslint-disable no-console */
type LogContext = Record<string, unknown>;

const currentEnv = process.env.NEXT_PUBLIC_NODE_ENV ?? process.env.NODE_ENV;

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const logger = {
  error: (error: unknown, context?: LogContext) => {
    const errorToLog = isError(error) ? error : new Error(String(error));
    if (currentEnv === "development" || currentEnv === "test") {
      console.error("DEVELOPMENT ERROR:", errorToLog, {
        originalError: error,
        ...context,
      });
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (currentEnv === "development" || currentEnv === "test") {
      console.warn("DEVELOPMENT WARNING:", message, context);
    }
  },

  info: (message: string, context?: LogContext) => {
    if (currentEnv === "development" || currentEnv === "test") {
      console.info("DEVELOPMENT INFO:", message, context);
    }
  },

  debug: (message: string, context?: LogContext) => {
    if (currentEnv === "development" || currentEnv === "test") {
      console.debug("DEVELOPMENT DEBUG:", message, context);
    }
  },
};
