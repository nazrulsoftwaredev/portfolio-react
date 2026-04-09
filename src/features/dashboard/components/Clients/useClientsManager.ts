import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_CLIENTS } from "./constants";
import type {
  Client,
  ClientStatus,
  ClientValidationErrors,
  ClientsStats,
  SortOption,
} from "./types";
import { exportClientsCsv, validateClient } from "./utils";
import { useDashboardClients } from "../../api/hooks";
import { dashboardService } from "../../api/services";

type ToastType = "info" | "success" | "error" | "warning";

interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

interface UseClientsManagerOptions {
  query: string;
  statusFilter: "All" | ClientStatus;
  sortBy: SortOption;
  page: number;
  pageSize: number;
}

export const useClientsManager = ({
  query,
  statusFilter,
  sortBy,
  page,
  pageSize,
}: UseClientsManagerOptions) => {
  const [allClients, setAllClients] = useState<Client[]>(() => INITIAL_CLIENTS);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { fetchClientsPage, loading, error } = useDashboardClients();
  const [pageData, setPageData] = useState<{
    items: Client[];
    totalItems: number;
    totalPages: number;
    resolvedPage: number;
    resolvedPageSize: number;
    stats: ClientsStats;
  }>(() => ({
    items: [],
    totalItems: 0,
    totalPages: 1,
    resolvedPage: 1,
    resolvedPageSize: Math.min(Math.max(pageSize, 1), 100),
    stats: {
      totalNodes: 0,
      activeCount: 0,
      trustIndex: "0%",
      avgLtv: "$0",
      totalTrend: "+0%",
      activeTrend: "+0%",
    },
  }));

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToasts((previous) => [
      ...previous,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        message,
        type,
      },
    ]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchClientsPage({
      q: query,
      status: statusFilter,
      sort: sortBy,
      page,
      pageSize,
    })
      .then((result) => {
        if (cancelled) return;
        setAllClients((previous) => {
          const merged = new Map(previous.map((item) => [item.id, item]));
          result.items.forEach((item) => {
            merged.set(item.id, item);
          });
          return Array.from(merged.values());
        });
        setPageData({
          items: result.items,
          totalItems: result.totalItems,
          totalPages: result.totalPages,
          resolvedPage: result.page,
          resolvedPageSize: result.pageSize,
          stats: result.stats,
        });
      })
      .catch(() => {
        if (cancelled) return;
        showToast("Failed to load clients", "error");
      });

    return () => {
      cancelled = true;
    };
  }, [
    fetchClientsPage,
    query,
    statusFilter,
    sortBy,
    page,
    pageSize,
    refreshKey,
  ]);

  const buildClientDraft = (seedQuery = ""): Client => {
    const id = `${Date.now()}`;
    const normalizedSeed =
      seedQuery.trim().replace(/\s+/g, "-").toLowerCase() || id;

    return {
      id,
      name: seedQuery.trim() || "",
      industry: "",
      status: "Active",
      value: 0,
      growth: 0,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${normalizedSeed}`,
      email: "",
      phone: "",
      website: "",
    };
  };

  const getClientById = (id: string) => {
    return allClients.find((client) => client.id === id);
  };

  const saveClient = async (client: Client) => {
    const nextErrors = validateClient(client);
    if (Object.keys(nextErrors).length > 0) {
      return {
        success: false,
        errors: nextErrors,
      };
    }

    const isUpdate = allClients.some((item) => item.id === client.id);

    try {
      const payload = {
        name: client.name,
        industry: client.industry,
        status: client.status,
        value: client.value,
        avatar: client.avatar,
        email: client.email,
        phone: client.phone,
        website: client.website,
      };

      const result = isUpdate
        ? await dashboardService.updateClient(client.id, payload)
        : await dashboardService.createClient(payload);

      setAllClients((previous) => {
        const existingIndex = previous.findIndex(
          (item) => item.id === result.data.id,
        );
        if (existingIndex === -1) {
          return [result.data, ...previous];
        }

        const next = [...previous];
        next[existingIndex] = result.data;
        return next;
      });

      showToast(
        isUpdate
          ? `Client ${result.data.name} updated`
          : `Client ${result.data.name} created`,
        "success",
      );
      setRefreshKey((previous) => previous + 1);

      return {
        success: true,
        errors: {},
      };
    } catch {
      showToast("Unable to save client", "error");
      return {
        success: false,
        errors: {
          name: "Unable to save client right now",
        } as ClientValidationErrors,
      };
    }
  };

  const removeClient = (id: string) => {
    const removed = allClients.find((client) => client.id === id);
    void dashboardService
      .archiveClient(id)
      .then(() => {
        setAllClients((previous) =>
          previous.filter((client) => client.id !== id),
        );
        showToast(
          removed ? `Client ${removed.name} removed` : "Client removed",
          "warning",
        );
        setRefreshKey((previous) => previous + 1);
      })
      .catch(() => {
        showToast("Unable to remove client", "error");
      });
  };

  const toggleClientStatus = (id: string) => {
    void dashboardService
      .cycleClientStatus(id)
      .then((updatedClient) => {
        setAllClients((previous) =>
          previous.map((client) =>
            client.id === id
              ? { ...client, status: updatedClient.status }
              : client,
          ),
        );
        showToast(`Status changed to ${updatedClient.status}`, "success");
        setRefreshKey((previous) => previous + 1);
      })
      .catch(() => {
        showToast("Unable to update status", "error");
      });
  };

  const exportCurrentPage = () => {
    if (pageData.items.length === 0) {
      showToast("No clients available to export", "warning");
      return;
    }

    exportClientsCsv(pageData.items);
    showToast(`Exported ${pageData.items.length} clients`, "success");
  };

  const exportAllFiltered = useCallback(async () => {
    const targetPageSize = 100;
    const first = await fetchClientsPage({
      q: query,
      status: statusFilter,
      sort: sortBy,
      page: 1,
      pageSize: targetPageSize,
    });

    if (first.totalItems === 0) {
      showToast("No clients available to export", "warning");
      return;
    }

    if (first.totalItems > 5000) {
      showToast("Large export: this may take a moment", "info");
    }

    const all: Client[] = [...first.items];
    for (let p = 2; p <= first.totalPages; p += 1) {
      const next = await fetchClientsPage({
        q: query,
        status: statusFilter,
        sort: sortBy,
        page: p,
        pageSize: targetPageSize,
      });
      all.push(...next.items);
    }

    exportClientsCsv(all);
    showToast(`Exported ${all.length} clients`, "success");
  }, [fetchClientsPage, query, showToast, sortBy, statusFilter]);

  const resetData = () => {
    showToast("Refreshing clients from server", "info");
    setRefreshKey((previous) => previous + 1);
  };

  const selectedClientIds = useMemo(() => new Set<string>(), []);
  const allSelectedOnPage = false;
  const toggleSelectAllPage = () => undefined;
  const toggleSelectClient = () => undefined;

  return {
    loading,
    error,
    allClients,
    clients: pageData.items,
    stats: pageData.stats,
    selectedClientIds,
    allSelectedOnPage,
    toggleSelectAllPage,
    toggleSelectClient,
    buildClientDraft,
    getClientById,
    saveClient,
    removeClient,
    toggleClientStatus,
    exportCurrentPage,
    exportAllFiltered,
    resetData,
    toasts,
    dismissToast,
    pagination: {
      currentPage: pageData.resolvedPage,
      totalPages: pageData.totalPages,
      totalItems: pageData.totalItems,
      pageSize: pageData.resolvedPageSize,
    },
  };
};
