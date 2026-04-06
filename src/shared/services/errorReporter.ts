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
    // Always log to Sentry if available
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.captureException(
        error as Error,
        {
          contexts: context,
        } as any,
      );
    }

    // Also log to console in development
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
      Sentry.captureMessage(message, level);
      if (Object.keys(context).length > 0) {
        Sentry.setContext("message_context", context);
      }
    }

    if (import.meta.env.DEV) {
      const consoleMethod =
        {
          fatal: "error",
          warning: "warn",
          info: "info",
          error: "error",
        }[level] || "log";
      (console[consoleMethod as keyof typeof console] as any)(
        "[Report]",
        message,
        context,
      );
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
   * Add breadcrumb for tracking user actions
   */
  addBreadcrumb: (message: string, data: ErrorContext = {}): void => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.captureMessage(message, "info");
    }

    if (import.meta.env.DEV) {
      console.log("[Breadcrumb]", message, data);
    }
  },
};
