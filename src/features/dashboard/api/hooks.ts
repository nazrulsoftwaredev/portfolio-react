/**
 * Dashboard Feature API Hooks
 * Custom hooks for data fetching and API interactions
 */

import { useState, useCallback } from "react";
import type {
  AuthCredentials,
  DashboardApiResponse,
  AnalyticsData,
  DashboardUser,
} from "./types";
import { DASHBOARD_API_ENDPOINTS } from "./endpoints";

export const useDashboardAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<DashboardUser | null>(null);

  const login = useCallback(
    async (
      credentials: AuthCredentials,
    ): Promise<
      DashboardApiResponse<{ token: string; user: DashboardUser }>
    > => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(DASHBOARD_API_ENDPOINTS.auth.login, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.status}`);
        }

        const result: DashboardApiResponse<{
          token: string;
          user: DashboardUser;
        }> = await response.json();
        setUser(result.data.user);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

  return { login, logout, user, loading, error, setUser };
};

export const useDashboardAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(DASHBOARD_API_ENDPOINTS.analytics.overview);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
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
