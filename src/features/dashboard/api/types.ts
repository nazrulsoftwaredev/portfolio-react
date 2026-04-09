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

export interface DashboardAuthSession {
  token: string;
  user: DashboardUser;
  expiresAt: number;
}

export type ClientsStatusFilter = "All" | "Active" | "On Hold" | "Inactive";

export type ClientsSortOption = "value-desc" | "value-asc" | "name-asc";

export interface ClientsQueryParams {
  q: string;
  status: ClientsStatusFilter;
  sort: ClientsSortOption;
  page: number;
  pageSize: number;
}

export interface ClientsStats {
  totalNodes: number;
  activeCount: number;
  trustIndex: string;
  avgLtv: string;
  totalTrend: string;
  activeTrend: string;
}

export interface ClientsPage<TItem> {
  items: TItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  stats: ClientsStats;
}

export interface PagedResponse<TItem> {
  items: TItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type ClientProjectStage = "Lead" | "Active" | "Completed" | "Archived";

export interface ClientProject {
  id: string;
  clientId: string;
  name: string;
  stage: ClientProjectStage;
  value: number;
  updatedAt: number;
}

export type ClientInvoiceStatus =
  | "Draft"
  | "Sent"
  | "Paid"
  | "Overdue"
  | "Cancelled";

export interface ClientInvoice {
  id: string;
  clientId: string;
  code: string;
  amount: number;
  issuedAt: number;
  dueAt: number;
  status: ClientInvoiceStatus;
}

export interface ClientMessage {
  id: string;
  clientId: string;
  subject: string;
  preview: string;
  unread: boolean;
  createdAt: number;
}

export type ClientActivityKind =
  | "project"
  | "invoice"
  | "message"
  | "status_change";

export interface ClientActivityEvent {
  id: string;
  clientId: string;
  kind: ClientActivityKind;
  label: string;
  createdAt: number;
  meta?: Record<string, string | number | boolean | null | undefined>;
}
