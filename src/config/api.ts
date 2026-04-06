/**
 * API Configuration
 */

export const API_CONFIG = {
  // Base URL for API calls
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",

  // API timeout in milliseconds
  timeout: 30000,

  // Default headers for all requests
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

/**
 * Get full API URL for an endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};
