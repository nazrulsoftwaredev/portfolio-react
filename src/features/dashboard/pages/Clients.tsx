import React from "react";
import { Briefcase, Plus, ShieldCheck, Target, Users } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ConfirmDialog, Toast } from "@/shared/components";
import { Pagination } from "@/shared/components/common";
import { PageHeader } from "../components/common";
import {
  ClientsStatItem,
  ClientsTable,
  ClientsToolbar,
  useClientsManager,
} from "../components/Clients";
import { formatGrowth } from "../components/Clients/utils";
import type {
  Client,
  ClientStatus,
  SortOption,
} from "../components/Clients/types";

export const Clients: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const qParam = searchParams.get("q") ?? "";
  const statusParam = (searchParams.get("status") ?? "All") as
    | "All"
    | ClientStatus;
  const sortParam = (searchParams.get("sort") ?? "value-desc") as SortOption;
  const pageParam = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const pageSizeParam = Number.parseInt(
    searchParams.get("pageSize") ?? "25",
    10,
  );

  const query = qParam;
  const statusFilter: "All" | ClientStatus =
    statusParam === "Active" ||
    statusParam === "On Hold" ||
    statusParam === "Inactive"
      ? statusParam
      : "All";
  const sortBy: SortOption =
    sortParam === "value-asc" ||
    sortParam === "name-asc" ||
    sortParam === "value-desc"
      ? sortParam
      : "value-desc";
  const currentPage =
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const pageSize =
    Number.isFinite(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : 25;

  const updateParams = (
    next: Record<string, string | number | null>,
    options?: { replace?: boolean },
  ) => {
    setSearchParams((prev) => {
      const copy = new URLSearchParams(prev);
      Object.entries(next).forEach(([key, value]) => {
        if (value === null || value === "" || value === undefined) {
          copy.delete(key);
        } else {
          copy.set(key, String(value));
        }
      });
      return copy;
    }, options);
  };

  const {
    clients,
    stats,
    removeClient,
    toggleClientStatus,
    exportAllFiltered,
    resetData,
    toasts,
    dismissToast,
    pagination,
    loading,
  } = useClientsManager({
    query,
    statusFilter,
    sortBy,
    page: currentPage,
    pageSize,
  });

  React.useEffect(() => {
    if (pagination.currentPage !== currentPage) {
      updateParams({ page: pagination.currentPage }, { replace: true });
    }
  }, [currentPage, pagination.currentPage]);

  React.useEffect(() => {
    if (pagination.pageSize !== pageSize) {
      updateParams(
        { pageSize: pagination.pageSize, page: 1 },
        { replace: true },
      );
    }
  }, [pageSize, pagination.pageSize]);

  const [draftQuery, setDraftQuery] = React.useState(query);
  const [clientToDelete, setClientToDelete] = React.useState<Client | null>(
    null,
  );
  const [selectedClientIds, setSelectedClientIds] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = React.useState(false);

  const pageClientIds = React.useMemo(
    () => clients.map((client) => client.id),
    [clients],
  );

  const selectedCount = selectedClientIds.size;
  const allSelectedOnPage =
    clients.length > 0 &&
    clients.every((client) => selectedClientIds.has(client.id));

  const handleToggleSelectClient = React.useCallback(
    (id: string, checked: boolean) => {
      setSelectedClientIds((previous) => {
        const next = new Set(previous);
        if (checked) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    },
    [],
  );

  const handleToggleSelectAllPage = React.useCallback(
    (checked: boolean) => {
      setSelectedClientIds((previous) => {
        const next = new Set(previous);
        for (const id of pageClientIds) {
          if (checked) {
            next.add(id);
          } else {
            next.delete(id);
          }
        }
        return next;
      });
    },
    [pageClientIds],
  );

  const clearSelection = React.useCallback(() => {
    setSelectedClientIds(new Set());
  }, []);

  const handleDeleteRequest = React.useCallback(
    (id: string) => {
      const targetClient = clients.find((client) => client.id === id) ?? null;
      setClientToDelete(targetClient);
    },
    [clients],
  );

  const handleCancelDelete = React.useCallback(() => {
    setClientToDelete(null);
  }, []);

  const handleConfirmDelete = React.useCallback(() => {
    if (!clientToDelete) {
      return;
    }

    removeClient(clientToDelete.id);
    setSelectedClientIds((previous) => {
      const next = new Set(previous);
      next.delete(clientToDelete.id);
      return next;
    });
    setClientToDelete(null);
  }, [clientToDelete, removeClient]);

  const handleOpenBulkDelete = React.useCallback(() => {
    if (selectedClientIds.size === 0) {
      return;
    }
    setIsBulkDeleteOpen(true);
  }, [selectedClientIds.size]);

  const handleCancelBulkDelete = React.useCallback(() => {
    setIsBulkDeleteOpen(false);
  }, []);

  const handleConfirmBulkDelete = React.useCallback(() => {
    if (selectedClientIds.size === 0) {
      setIsBulkDeleteOpen(false);
      return;
    }

    for (const id of selectedClientIds) {
      removeClient(id);
    }

    setIsBulkDeleteOpen(false);
    setSelectedClientIds(new Set());
  }, [removeClient, selectedClientIds]);

  React.useEffect(() => setDraftQuery(query), [query]);
  React.useEffect(() => {
    setSelectedClientIds((previous) => {
      if (previous.size === 0) {
        return previous;
      }

      const pageIdSet = new Set(pageClientIds);
      const next = new Set<string>();
      for (const id of previous) {
        if (pageIdSet.has(id)) {
          next.add(id);
        }
      }

      return next;
    });
  }, [pageClientIds]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handle = window.setTimeout(() => {
      updateParams({ q: draftQuery, page: 1 }, { replace: true });
    }, 250);
    return () => window.clearTimeout(handle);
  }, [draftQuery]);

  const cycleStatusFilter = () => {
    const next =
      statusFilter === "All"
        ? "Active"
        : statusFilter === "Active"
          ? "On Hold"
          : statusFilter === "On Hold"
            ? "Inactive"
            : "All";
    updateParams({ status: next, page: 1 });
  };

  const setSortBy = (next: SortOption) => updateParams({ sort: next, page: 1 });

  const onReset = () => {
    resetData();
    clearSelection();
    setSearchParams({}, { replace: true });
  };

  const setPage = (p: number) => updateParams({ page: p });
  const setPageSize = (size: number) =>
    updateParams({ pageSize: size, page: 1 });

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          className="gap-5 md:gap-6"
          title={
            <>
              Client relations <br />
              management
            </>
          }
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle={
            <>
              Database status:{" "}
              <span className="text-emerald-600">Live active</span>
            </>
          }
          actions={
            <Button
              className="gap-2 min-h-11"
              type="button"
              onClick={() => navigate("/dashboard/clients/new")}
            >
              <Plus className="w-4 h-4" />
              Add client
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-5 xl:gap-6">
        <ClientsStatItem
          icon={Users}
          label="TOTAL CLIENTS"
          value={String(stats.totalNodes)}
          trend={stats.totalTrend}
        />
        <ClientsStatItem
          icon={Briefcase}
          label="ACTIVE CLIENTS"
          value={String(stats.activeCount)}
          trend={stats.activeTrend}
        />
        <ClientsStatItem
          icon={ShieldCheck}
          label="TRUST SCORE"
          value={stats.trustIndex}
          trend={formatGrowth(Math.max(1, Math.round(stats.totalNodes / 10)))}
        />
        <ClientsStatItem
          icon={Target}
          label="AVG. LTV"
          value={stats.avgLtv}
          trend={stats.totalTrend}
        />
      </div>

      <div className="premium-card overflow-hidden">
        <ClientsToolbar
          query={draftQuery}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onQueryChange={setDraftQuery}
          onCycleStatusFilter={cycleStatusFilter}
          onSortChange={setSortBy}
          onExport={exportAllFiltered}
          onReset={onReset}
          selectedCount={selectedCount}
          onClearSelection={clearSelection}
          onDeleteSelected={handleOpenBulkDelete}
        />

        <ClientsTable
          clients={clients}
          selectedClientIds={selectedClientIds}
          allSelectedOnPage={allSelectedOnPage}
          onToggleSelectAllPage={handleToggleSelectAllPage}
          onToggleSelectClient={handleToggleSelectClient}
          onOpen={(client) => navigate(`/dashboard/clients/${client.id}`)}
          onToggleStatus={toggleClientStatus}
          onEdit={(client) => navigate(`/dashboard/clients/${client.id}/edit`)}
          onDelete={handleDeleteRequest}
        />

        <div className="px-5 md:px-6 lg:px-8 py-4 md:py-5 border-t border-border/60 bg-muted/20 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-xs font-medium text-muted-foreground">
              {pagination.totalItems === 0
                ? "Showing 0 results"
                : `Showing ${
                    (pagination.currentPage - 1) * pagination.pageSize + 1
                  }–${Math.min(
                    pagination.currentPage * pagination.pageSize,
                    pagination.totalItems,
                  )} of ${pagination.totalItems}`}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Rows
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={(value) =>
                  setPageSize(Number.parseInt(value, 10))
                }
              >
                <SelectTrigger className="min-h-9 h-9 w-[120px] rounded-lg bg-muted/20 hover:bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/60 text-foreground">
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="25">25 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                  <SelectItem value="100">100 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            className={loading ? "opacity-60 pointer-events-none" : ""}
          />
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-[1060] flex max-w-sm flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              isOpen
              message={toast.message}
              type={toast.type}
              onClose={() => dismissToast(toast.id)}
              action={undefined}
              inline
            />
          ))}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={clientToDelete !== null}
        title="Delete client"
        message={
          clientToDelete
            ? `Delete ${clientToDelete.name}? This action cannot be undone.`
            : "Delete this client?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        title="Delete selected clients"
        message={`Delete ${selectedCount} selected client${selectedCount === 1 ? "" : "s"}? This action cannot be undone.`}
        confirmText="Delete Selected"
        cancelText="Cancel"
        isDangerous
        onConfirm={handleConfirmBulkDelete}
        onCancel={handleCancelBulkDelete}
      />
    </div>
  );
};
