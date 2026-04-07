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

const MOCK_USER: DashboardUser = {
  id: "demo-user",
  email: "demo@curator.local",
  name: "Demo User",
  role: "admin",
};

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

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

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
        await wait(250);

        if (!credentials.email.trim() || !credentials.password.trim()) {
          throw new Error("Please enter both email and password");
        }

        const user = {
          ...MOCK_USER,
          email: credentials.email,
          name: credentials.email.split("@")[0] || MOCK_USER.name,
        };
        const result: DashboardApiResponse<{
          token: string;
          user: DashboardUser;
        }> = {
          status: "success",
          message: "UI-only login successful",
          data: {
            token: "ui-only-token",
            user,
          },
        };
        setUser(user);
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
      await wait(250);
      return MOCK_ANALYTICS;
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
