import { useEffect, useMemo, useState } from "react";
import { INITIAL_CLIENTS, STORAGE_KEY } from "./constants";
import type {
  Client,
  ClientDialogMode,
  ClientStatus,
  ClientValidationErrors,
  ClientsStats,
  SortOption,
} from "./types";
import {
  exportClientsCsv,
  filterAndSortClients,
  formatCurrency,
  formatGrowth,
  nextStatus,
  readStoredClients,
  validateClient,
} from "./utils";

type ToastType = "info" | "success" | "error" | "warning";

interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

const PAGE_SIZE = 5;

export const useClientsManager = () => {
  const [clients, setClients] = useState<Client[]>(() =>
    readStoredClients(STORAGE_KEY),
  );
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ClientStatus>("All");
  const [sortBy, setSortBy] = useState<SortOption>("value-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [draftClient, setDraftClient] = useState<Client | null>(null);
  const [dialogMode, setDialogMode] = useState<ClientDialogMode | null>(null);
  const [errors, setErrors] = useState<ClientValidationErrors>({});
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    setToasts((previous) => [
      ...previous,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        message,
        type,
      },
    ]);
  };

  const dismissToast = (id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    }
  }, [clients]);

  const filteredClients = useMemo(
    () => filterAndSortClients(clients, query, statusFilter, sortBy),
    [clients, query, statusFilter, sortBy],
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE)),
    [filteredClients.length],
  );

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredClients.slice(start, end);
  }, [filteredClients, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const stats = useMemo<ClientsStats>(() => {
    const totalNodes = clients.length;
    const activeCount = clients.filter(
      (client) => client.status === "Active",
    ).length;
    const avgGrowth =
      totalNodes > 0
        ? clients.reduce((sum, client) => sum + client.growth, 0) / totalNodes
        : 0;
    const avgLtv =
      totalNodes > 0
        ? clients.reduce((sum, client) => sum + client.value, 0) / totalNodes
        : 0;

    return {
      totalNodes,
      activeCount,
      trustIndex: `${Math.max(90, Math.min(99.9, 96 + avgGrowth / 10)).toFixed(1)}%`,
      avgLtv: formatCurrency(avgLtv),
      totalTrend: formatGrowth(Math.round(avgGrowth)),
      activeTrend: formatGrowth(Math.max(1, Math.round(avgGrowth / 2))),
    };
  }, [clients]);

  const cycleStatusFilter = () => {
    setStatusFilter((previous) => {
      if (previous === "All") {
        return "Active";
      }
      if (previous === "Active") {
        return "On Hold";
      }
      if (previous === "On Hold") {
        return "Inactive";
      }
      return "All";
    });
    showToast("Client filter updated", "info");
  };

  const openCreateDialog = () => {
    if (dialogMode) {
      return;
    }

    const id = `${Date.now()}`;
    const normalizedSeed =
      query.trim().replace(/\s+/g, "-").toLowerCase() || id;

    setDraftClient({
      id,
      name: query.trim() || "",
      industry: "",
      status: "Active",
      value: 0,
      growth: 0,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${normalizedSeed}`,
      email: "",
      phone: "",
      website: "",
    });
    setErrors({});
    setDialogMode("create");
    showToast("Create client form opened", "info");
  };

  const openEditDialog = (client: Client) => {
    if (dialogMode) {
      return;
    }

    setDraftClient({ ...client });
    setErrors({});
    setDialogMode("edit");
    showToast(`Editing ${client.name}`, "info");
  };

  const closeDialog = () => {
    setDialogMode(null);
    setDraftClient(null);
    setErrors({});
  };

  const updateDraft = (updater: (previous: Client) => Client) => {
    setDraftClient((previous) => {
      if (!previous) {
        return previous;
      }
      return updater(previous);
    });
  };

  const saveDialogClient = () => {
    if (!draftClient) {
      showToast("No client data to save", "error");
      return false;
    }

    const nextErrors = validateClient(draftClient);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showToast("Please fix form validation errors", "warning");
      return false;
    }

    const isUpdate = clients.some((item) => item.id === draftClient.id);

    setClients((previous) => {
      const existingIndex = previous.findIndex(
        (item) => item.id === draftClient.id,
      );
      if (existingIndex === -1) {
        return [{ ...draftClient }, ...previous];
      }

      const next = [...previous];
      next[existingIndex] = { ...draftClient };
      return next;
    });

    closeDialog();
    showToast(
      isUpdate
        ? `Client ${draftClient.name} updated`
        : `Client ${draftClient.name} created`,
      "success",
    );
    return true;
  };

  const removeClient = (id: string) => {
    const removed = clients.find((client) => client.id === id);
    setClients((previous) => previous.filter((client) => client.id !== id));
    if (draftClient?.id === id) {
      closeDialog();
    }
    showToast(
      removed ? `Client ${removed.name} removed` : "Client removed",
      "warning",
    );
  };

  const toggleClientStatus = (id: string) => {
    const target = clients.find((client) => client.id === id);
    if (!target) {
      showToast("Client not found", "error");
      return;
    }

    const updatedStatus = nextStatus(target.status);
    setClients((previous) =>
      previous.map((client) =>
        client.id === id
          ? { ...client, status: nextStatus(client.status) }
          : client,
      ),
    );
    showToast(`Status changed to ${updatedStatus}`, "success");
  };

  const exportVisibleClients = () => {
    if (filteredClients.length === 0) {
      showToast("No clients available to export", "warning");
      return;
    }

    exportClientsCsv(filteredClients);
    showToast(`Exported ${filteredClients.length} clients`, "success");
  };

  const resetAll = () => {
    setClients(INITIAL_CLIENTS);
    setQuery("");
    setStatusFilter("All");
    setSortBy("value-desc");
    setCurrentPage(1);
    closeDialog();
    showToast("Clients reset to default data", "info");
  };

  const goToPage = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(safePage);
  };

  const nextPage = () => {
    setCurrentPage((previous) => Math.min(previous + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((previous) => Math.max(previous - 1, 1));
  };

  return {
    clients: paginatedClients,
    stats,
    query,
    statusFilter,
    sortBy,
    dialogMode,
    draftClient,
    errors,
    setQuery,
    setSortBy,
    cycleStatusFilter,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    updateDraft,
    saveDialogClient,
    removeClient,
    toggleClientStatus,
    exportVisibleClients,
    resetAll,
    toasts,
    dismissToast,
    pagination: {
      currentPage,
      totalPages,
      totalItems: filteredClients.length,
      pageSize: PAGE_SIZE,
    },
    goToPage,
    nextPage,
    prevPage,
  };
};
