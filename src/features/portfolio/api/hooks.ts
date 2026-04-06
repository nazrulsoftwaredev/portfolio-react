/**
 * Portfolio Feature API Hooks
 * Custom hooks for data fetching and API interactions
 */

import { useState, useCallback } from "react";
import type { ContactFormData, PortfolioApiResponse } from "./types";
import { PORTFOLIO_API_ENDPOINTS } from "./endpoints";

export const usePortfolioContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = useCallback(
    async (
      data: ContactFormData,
    ): Promise<PortfolioApiResponse<{ id: string }>> => {
      setLoading(true);
      setError(null);

      try {
        // In a real app, replace with actual API call
        const response = await fetch(PORTFOLIO_API_ENDPOINTS.contact.submit, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: PortfolioApiResponse<{ id: string }> =
          await response.json();
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to submit contact form";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { submitContact, loading, error };
};

export const usePortfolioProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(PORTFOLIO_API_ENDPOINTS.projects.list);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch projects";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchProjects, loading, error };
};
