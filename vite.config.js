import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const apiTarget = process.env.VITE_API_PROXY_TARGET ?? "http://localhost:5000";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Upload source maps to Sentry (only when VITE_SENTRY_DSN is set)
    ...(process.env.VITE_SENTRY_DSN
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
    strictPort: false,
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    // "hidden" uploads source maps to Sentry but does NOT serve them publicly,
    // preventing full source exposure to end-users.
    sourcemap: "hidden",
  },
});
