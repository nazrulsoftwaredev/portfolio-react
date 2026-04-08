import * as Sentry from "@sentry/react";

export interface ErrorContext {
  [key: string]: unknown;
}

export type LogLevel = "info" | "warning" | "error" | "fatal";

export interface UserInfo {
  id: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}

type ConsoleLevel = "log" | "info" | "warn" | "error";

const LOG_LEVEL_TO_CONSOLE: Record<LogLevel, ConsoleLevel> = {
  fatal: "error",
  error: "error",
  warning: "warn",
  info: "info",
};

/**
 * Centralized error reporting service
 * Handles both Sentry and console logging based on environment
 */
export const errorReporter = {
  /**
   * Capture an exception error
   */
  captureException: (
    error: Error | unknown,
    context: ErrorContext = {},
  ): void => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.withScope((scope) => {
        if (Object.keys(context).length > 0) {
          scope.setContext("extra", context);
        }
        Sentry.captureException(error);
      });
    }

    if (import.meta.env.DEV) {
      console.error("[Error Report]", error, context);
    }
  },

  /**
   * Capture a message/event
   */
  captureMessage: (
    message: string,
    level: LogLevel = "info",
    context: ErrorContext = {},
  ): void => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.withScope((scope) => {
        if (Object.keys(context).length > 0) {
          scope.setContext("message_context", context);
        }
        Sentry.captureMessage(message, level);
      });
    }

    if (import.meta.env.DEV) {
      const consoleMethod: ConsoleLevel = LOG_LEVEL_TO_CONSOLE[level] ?? "log";
      console[consoleMethod]("[Report]", message, context);
    }
  },

  /**
   * Set user context for error tracking
   */
  setUser: (user: UserInfo | null): void => {
    if (import.meta.env.VITE_SENTRY_DSN && user) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    }
  },

  /**
   * Clear user context
   */
  clearUser: (): void => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.setUser(null);
    }
  },

  /**
   * Add breadcrumb for tracking user actions.
   * Uses Sentry.addBreadcrumb (not captureMessage) so it attaches to the
   * next event rather than creating a standalone Sentry issue.
   */
  addBreadcrumb: (message: string, data: ErrorContext = {}): void => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.addBreadcrumb({ message, data });
    }

    if (import.meta.env.DEV) {
      console.log("[Breadcrumb]", message, data);
    }
  },
};
