import type {
  AuthCredentials,
  DashboardApiResponse,
  DashboardAuthSession,
  DashboardUser,
  ClientsPage,
  ClientsQueryParams,
  ClientActivityEvent,
  ClientInvoice,
  ClientMessage,
  ClientProject,
  PagedResponse,
} from "./types";
import type { Client } from "../components/Clients/types";
import { nextStatus } from "../components/Clients/utils";

/**
 * Dashboard Feature API Services
 * Business logic and data processing for dashboard feature
 */

type ApiSuccess<T> = {
  status: "success";
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
};

type ApiError = {
  status: "error";
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

const API_BASE = "/api/v1";

const toQueryString = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      return;
    }
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

const toErrorMessage = (payload: unknown, fallback: string) => {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const errorPayload = payload as ApiError;
  if (errorPayload.error?.message) {
    return errorPayload.error.message;
  }

  return fallback;
};

const requestJson = async <T>(
  path: string,
  init?: RequestInit,
): Promise<ApiSuccess<T>> => {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = (await response.json().catch(() => null)) as unknown;
  if (!response.ok) {
    throw new Error(toErrorMessage(payload, `HTTP ${response.status}`));
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid API response");
  }

  const successPayload = payload as ApiSuccess<T>;
  if (successPayload.status !== "success") {
    throw new Error(toErrorMessage(payload, "API request failed"));
  }

  return successPayload;
};

const normalizePaged = <TItem>(
  payload: ApiSuccess<PagedResponse<TItem> | { items: TItem[] }>,
): PagedResponse<TItem> => {
  const data = payload.data as Partial<PagedResponse<TItem>> & {
    items: TItem[];
  };
  const meta = payload.meta ?? {};

  const page = Number(data.page ?? meta.page ?? 1);
  const pageSize = Number(
    data.pageSize ?? meta.pageSize ?? data.items.length ?? 1,
  );
  const totalItems = Number(
    data.totalItems ?? meta.totalItems ?? data.items.length ?? 0,
  );
  const totalPages = Number(
    data.totalPages ??
      meta.totalPages ??
      Math.max(1, Math.ceil(totalItems / Math.max(pageSize, 1))),
  );

  return {
    items: data.items ?? [],
    page,
    pageSize,
    totalItems,
    totalPages,
  };
};

type ClientWritePayload = Omit<Client, "id" | "growth">;
type ClientUpdatePayload = Partial<ClientWritePayload>;

export const dashboardService = {
  /**
   * Validate login credentials
   */
  validateLoginCredentials: (
    email: string,
    password: string,
  ): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    return errors;
  },

  /**
   * Check if user has permission for resource
   */
  hasPermission: (userRole: string, requiredRole: string): boolean => {
    const roleHierarchy: Record<string, number> = {
      admin: 3,
      user: 2,
      guest: 1,
    };

    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  },

  /**
   * Format metric change percentage
   */
  formatMetricChange: (change: number | undefined): string => {
    if (!change) return "No change";
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
  },

  /**
   * Parse API errors to user-friendly messages
   */
  parseApiError: (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred. Please try again.";
  },

  /**
   * Authenticate the admin user.
   *
   * Replace the body of this function with a real API request later.
   */
  loginAdmin: async (
    credentials: AuthCredentials,
  ): Promise<DashboardApiResponse<DashboardAuthSession>> => {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      throw new Error("Please enter both email and password");
    }

    const payload = await requestJson<DashboardAuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      }),
    });

    return {
      status: "success",
      message: payload.message,
      data: payload.data,
    };
  },

  getCurrentSession: async (): Promise<DashboardAuthSession | null> => {
    try {
      const me = await requestJson<DashboardUser>("/auth/me", {
        method: "GET",
      });
      return {
        token: "cookie-session",
        user: me.data,
        expiresAt: Date.now() + 15 * 60 * 1000,
      };
    } catch {
      return null;
    }
  },

  logoutAdmin: async (): Promise<void> => {
    await requestJson<{ ok: boolean }>("/auth/logout", { method: "POST" });
  },

  /**
   * Check if user session is valid
   */
  isSessionValid: (token: string | null, expiresAt: number | null): boolean => {
    if (!token || !expiresAt) return false;
    return Date.now() < expiresAt;
  },

  /**
   * Fetch a server-paginated slice of clients.
   *
   * This is a UI-only mock that behaves like a real API: it applies query + filter
   * + sort, returns totals, and only returns the requested page.
   */
  getClientsPage: async (
    params: ClientsQueryParams,
  ): Promise<DashboardApiResponse<ClientsPage<Client>>> => {
    const query = toQueryString({
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      status: params.status,
      sort: params.sort,
    });
    const payload = await requestJson<{ items: Client[] }>(`/clients${query}`, {
      method: "GET",
    });
    const stats = (payload.meta?.stats as
      | ClientsPage<Client>["stats"]
      | undefined) ?? {
      totalNodes: payload.data.items.length,
      activeCount: payload.data.items.filter(
        (client) => client.status === "Active",
      ).length,
      trustIndex: "0%",
      avgLtv: "$0",
      totalTrend: "+0%",
      activeTrend: "+0%",
    };
    return {
      status: "success",
      data: {
        items: payload.data.items,
        page: Number(payload.meta?.page ?? 1),
        pageSize: Number(payload.meta?.pageSize ?? params.pageSize ?? 25),
        totalItems: Number(
          payload.meta?.totalItems ?? payload.data.items.length,
        ),
        totalPages: Number(payload.meta?.totalPages ?? 1),
        stats,
      },
    };
  },

  getClientById: async (
    clientId: string,
  ): Promise<DashboardApiResponse<Client>> => {
    const payload = await requestJson<Client>(`/clients/${clientId}`, {
      method: "GET",
    });
    return { status: "success", data: payload.data, message: payload.message };
  },

  createClient: async (
    payload: ClientWritePayload,
  ): Promise<DashboardApiResponse<Client>> => {
    const response = await requestJson<Client>("/clients", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return {
      status: "success",
      data: response.data,
      message: response.message,
    };
  },

  updateClient: async (
    clientId: string,
    payload: ClientUpdatePayload,
  ): Promise<DashboardApiResponse<Client>> => {
    const response = await requestJson<Client>(`/clients/${clientId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return {
      status: "success",
      data: response.data,
      message: response.message,
    };
  },

  archiveClient: async (clientId: string) => {
    await requestJson<{ id: string }>(`/clients/${clientId}`, {
      method: "DELETE",
    });
  },

  cycleClientStatus: async (clientId: string): Promise<Client> => {
    const existing = await dashboardService.getClientById(clientId);
    const updated = await dashboardService.updateClient(clientId, {
      status: nextStatus(existing.data.status),
    });
    return updated.data;
  },

  getClientProjects: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientProject>>> => {
    const query = toQueryString({ page, pageSize });
    const payload = await requestJson<
      PagedResponse<ClientProject> | { items: ClientProject[] }
    >(`/clients/${clientId}/projects${query}`, { method: "GET" });
    return { status: "success", data: normalizePaged(payload) };
  },

  getClientInvoices: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientInvoice>>> => {
    const query = toQueryString({ page, pageSize });
    const payload = await requestJson<
      PagedResponse<ClientInvoice> | { items: ClientInvoice[] }
    >(`/clients/${clientId}/invoices${query}`, { method: "GET" });
    return { status: "success", data: normalizePaged(payload) };
  },

  getClientMessages: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientMessage>>> => {
    const query = toQueryString({ page, pageSize });
    const payload = await requestJson<
      PagedResponse<ClientMessage> | { items: ClientMessage[] }
    >(`/clients/${clientId}/messages${query}`, { method: "GET" });
    return { status: "success", data: normalizePaged(payload) };
  },

  getClientActivity: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientActivityEvent>>> => {
    const query = toQueryString({ page, pageSize });
    const payload = await requestJson<
      PagedResponse<ClientActivityEvent> | { items: ClientActivityEvent[] }
    >(`/clients/${clientId}/activity${query}`, { method: "GET" });
    return { status: "success", data: normalizePaged(payload) };
  },
};
