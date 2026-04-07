import React from "react";
import { Briefcase, Plus, ShieldCheck, Target, Users } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { Toast } from "@/shared/components";
import { PageHeader } from "../components/common";
import {
  ClientDialog,
  ClientsStatItem,
  ClientsTable,
  ClientsToolbar,
  useClientsManager,
} from "../components/Clients";
import { formatGrowth } from "../components/Clients/utils";

export const Clients: React.FC = () => {
  const {
    clients,
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
    pagination,
    goToPage,
    nextPage,
    prevPage,
  } = useClientsManager();

  return (
    <div className="space-y-10">
      <div>
        <PageHeader
          title={
            <>
              Client relations <br />
              management
            </>
          }
          subtitle={
            <>
              Database status:{" "}
              <span className="text-emerald-600">Live active</span>
            </>
          }
          actions={
            <Button className="gap-2" type="button" onClick={openCreateDialog}>
              <Plus className="w-4 h-4" />
              Add client
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ClientsStatItem
          icon={Users}
          label="TOTAL NODES"
          value={String(stats.totalNodes)}
          trend={stats.totalTrend}
        />
        <ClientsStatItem
          icon={Briefcase}
          label="ACTIVE SPRINT"
          value={String(stats.activeCount)}
          trend={stats.activeTrend}
        />
        <ClientsStatItem
          icon={ShieldCheck}
          label="TRUST INDEX"
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

      <div className="premium-card !p-0 overflow-hidden">
        <ClientsToolbar
          query={query}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onQueryChange={setQuery}
          onCycleStatusFilter={cycleStatusFilter}
          onSortChange={setSortBy}
          onExport={exportVisibleClients}
          onReset={resetAll}
        />

        <ClientsTable
          clients={clients}
          onToggleStatus={toggleClientStatus}
          onEdit={openEditDialog}
          onDelete={removeClient}
        />

        <div className="px-8 py-5 border-t border-border bg-muted/20 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-muted-foreground">
            Page {pagination.currentPage} / {pagination.totalPages} - Total{" "}
            {pagination.totalItems}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={prevPage}
              disabled={pagination.currentPage === 1}
              variant="outline"
              size="sm"
              className="rounded-lg text-xs font-semibold"
            >
              Prev
            </Button>

            {Array.from({ length: pagination.totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <Button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  variant="outline"
                  size="sm"
                  className={`rounded-lg border text-xs font-semibold ${
                    pagination.currentPage === page
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground bg-transparent"
                  }`}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              type="button"
              onClick={nextPage}
              disabled={pagination.currentPage === pagination.totalPages}
              variant="outline"
              size="sm"
              className="rounded-lg text-xs font-semibold"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <ClientDialog
        mode={dialogMode}
        draftClient={draftClient}
        errors={errors}
        onClose={closeDialog}
        onSave={saveDialogClient}
        onDraftChange={updateDraft}
      />

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
    </div>
  );
};
