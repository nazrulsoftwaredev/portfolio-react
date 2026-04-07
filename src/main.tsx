import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./shared/theme";

// Initialize Sentry for error tracking
if (import.meta.env.VITE_SENTRY_DSN) {
  const shouldEnableReplay =
    import.meta.env.PROD &&
    (import.meta.env.VITE_SENTRY_ENABLE_REPLAY ?? "false") === "true";

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || "development",
    release: import.meta.env.VITE_SENTRY_RELEASE || "1.0.0",
    integrations: shouldEnableReplay
      ? [
          new Sentry.Replay({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ]
      : [],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    replaysSessionSampleRate: shouldEnableReplay ? 0.1 : 0,
    replaysOnErrorSampleRate: shouldEnableReplay ? 1.0 : 0,
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
