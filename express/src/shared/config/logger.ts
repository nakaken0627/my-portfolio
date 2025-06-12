/* eslint-disable no-console */
type LogContext = Record<string, unknown>;

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const logger = {
  error: (error: unknown, context?: LogContext) => {
    const errorToLog = isError(error) ? error : new Error(String(error));
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
      console.error("DEVELOPMENT ERROR:", errorToLog, { originalError: errorToLog, ...context });
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
      console.warn("DEVELOPMENT WARNING:", message, context);
    }
  },

  info: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
      console.info("DEVELOPMENT INFO:", message, context);
    }
  },

  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
      console.debug("DEVELOPMENT DEBUG:", message, context);
    }
  },
};
