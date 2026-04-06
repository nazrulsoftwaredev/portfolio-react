/**
 * Dashboard API Types
 */

export interface DashboardApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

export interface DashboardUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "guest";
  avatar?: string;
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

export interface AnalyticsData {
  metrics: DashboardMetric[];
  chartData: any[];
}

export interface AuthCredentials {
  email: string;
  password: string;
}
