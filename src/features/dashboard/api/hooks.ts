/**
 * Dashboard Feature API Hooks
 * Custom hooks for data fetching and API interactions
 */

import { useState, useCallback, useEffect } from "react";
import type {
  AuthCredentials,
  DashboardApiResponse,
  AnalyticsData,
  DashboardUser,
  DashboardAuthSession,
  ClientsPage,
  ClientsQueryParams,
  ClientActivityEvent,
  ClientInvoice,
  ClientMessage,
  ClientProject,
  PagedResponse,
} from "./types";
import { dashboardService } from "./services";
import type { Client } from "../components/Clients/types";

const AUTH_STORAGE_KEY = "dashboardAdminSession";

const MOCK_ANALYTICS: AnalyticsData = {
  metrics: [
    { label: "Revenue", value: "$128,400", change: 12, trend: "up" },
    { label: "Clients", value: 43, change: 6, trend: "up" },
    { label: "Retention", value: "94%", change: 2, trend: "up" },
    { label: "Churn", value: "3.1%", change: -1, trend: "down" },
  ],
  chartData: [
    { month: "Jan", value: 62 },
    { month: "Feb", value: 71 },
    { month: "Mar", value: 76 },
    { month: "Apr", value: 84 },
    { month: "May", value: 88 },
    { month: "Jun", value: 93 },
  ],
};

const readStoredSession = (): DashboardAuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as DashboardAuthSession;
    if (
      !parsed?.token ||
      !parsed?.user ||
      !dashboardService.isSessionValid(parsed.token, parsed.expiresAt)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const useDashboardAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<DashboardAuthSession | null>(() =>
    readStoredSession(),
  );

  const user = session?.user ?? null;
  const isAuthenticated = Boolean(session);

  useEffect(() => {
    if (session) {
      return;
    }

    void dashboardService.getCurrentSession().then((restored) => {
      if (!restored) {
        return;
      }
      setSession(restored);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify(restored),
        );
      }
    });
  }, [session]);

  const login = useCallback(
    async (
      credentials: AuthCredentials,
    ): Promise<DashboardApiResponse<DashboardAuthSession>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await dashboardService.loginAdmin(credentials);
        setSession(result.data);

        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify(result.data),
          );
        }

        return result;
      } catch (err) {
        const errorMessage =
          dashboardService.parseApiError(err) || "Login failed";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    await dashboardService.logoutAdmin();
    setSession(null);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  return { login, logout, user, session, isAuthenticated, loading, error };
};

export const useDashboardAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/analytics/overview", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = (await response.json()) as {
        status: "success" | "error";
        data?: AnalyticsData;
      };

      if (payload.status !== "success" || !payload.data) {
        return MOCK_ANALYTICS;
      }

      return payload.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch analytics";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchAnalytics, loading, error };
};

export const useDashboardClients = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientsPage = useCallback(
    async (params: ClientsQueryParams): Promise<ClientsPage<Client>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await dashboardService.getClientsPage(params);
        return result.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch clients";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { fetchClientsPage, loading, error };
};

export const useClientCrm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClient = useCallback(async (clientId: string): Promise<Client> => {
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getClientById(clientId);
      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch client";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjects = useCallback(
    async ({
      clientId,
      page,
      pageSize,
    }: {
      clientId: string;
      page: number;
      pageSize: number;
    }): Promise<PagedResponse<ClientProject>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await dashboardService.getClientProjects({
          clientId,
          page,
          pageSize,
        });
        return result.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch projects";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchInvoices = useCallback(
    async ({
      clientId,
      page,
      pageSize,
    }: {
      clientId: string;
      page: number;
      pageSize: number;
    }): Promise<PagedResponse<ClientInvoice>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await dashboardService.getClientInvoices({
          clientId,
          page,
          pageSize,
        });
        return result.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch invoices";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchMessages = useCallback(
    async ({
      clientId,
      page,
      pageSize,
    }: {
      clientId: string;
      page: number;
      pageSize: number;
    }): Promise<PagedResponse<ClientMessage>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await dashboardService.getClientMessages({
          clientId,
          page,
          pageSize,
        });
        return result.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch messages";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchActivity = useCallback(
    async ({
      clientId,
      page,
      pageSize,
    }: {
      clientId: string;
      page: number;
      pageSize: number;
    }): Promise<PagedResponse<ClientActivityEvent>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await dashboardService.getClientActivity({
          clientId,
          page,
          pageSize,
        });
        return result.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch activity";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    fetchClient,
    fetchProjects,
    fetchInvoices,
    fetchMessages,
    fetchActivity,
  };
};
