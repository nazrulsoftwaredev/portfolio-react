/**
 * Environment Configuration
 */

export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  isPreviewing: import.meta.env.PREVIEW,

  // Sentry configuration
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || "",

  // Feature flags
  enableErrorReporting: import.meta.env.VITE_ERROR_REPORTING === "true",
  enableAnalytics: import.meta.env.VITE_ANALYTICS === "true",
};

/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (
  featureName: "errorReporting" | "analytics",
): boolean => {
  const featureMap: Record<string, boolean> = {
    errorReporting: ENV.enableErrorReporting,
    analytics: ENV.enableAnalytics,
  };

  return featureMap[featureName] || false;
};
