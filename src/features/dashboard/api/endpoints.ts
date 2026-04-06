/**
 * Dashboard API Endpoints Configuration
 */

export const DASHBOARD_API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: "/api/dashboard/auth/login",
    logout: "/api/dashboard/auth/logout",
    verify: "/api/dashboard/auth/verify",
  },
  // Analytics endpoints
  analytics: {
    overview: "/api/dashboard/analytics/overview",
    detailed: "/api/dashboard/analytics/detailed",
  },
  // User management
  users: {
    list: "/api/dashboard/users",
    get: (id: string) => `/api/dashboard/users/${id}`,
    create: "/api/dashboard/users",
    update: (id: string) => `/api/dashboard/users/${id}`,
    delete: (id: string) => `/api/dashboard/users/${id}`,
  },
  // Message endpoints
  messages: {
    list: "/api/dashboard/messages",
    get: (id: string) => `/api/dashboard/messages/${id}`,
  },
  // Invoice endpoints
  invoices: {
    list: "/api/dashboard/invoices",
    get: (id: string) => `/api/dashboard/invoices/${id}`,
  },
};
