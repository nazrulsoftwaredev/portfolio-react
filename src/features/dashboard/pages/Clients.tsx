import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Plus, ShieldCheck, Target, Users } from "lucide-react";
import { Button } from "@/components/ui";
import { Toast } from "@/shared/components";
import { PremiumButton } from "../components/PremiumButton";
import { PageHeader } from "../components/common";
import {
  ClientDialog,
  ClientsStatItem,
  ClientsTable,
  ClientsToolbar,
  useClientsManager,
} from "../components/Clients";
import { formatGrowth } from "../components/Clients/utils";
import {
  dashboardContainerVariants,
  dashboardItemVariants,
} from "../constants/animationVariants";

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
    <motion.div
      variants={dashboardContainerVariants}
      initial={false}
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={dashboardItemVariants}>
        <PageHeader
          title={
            <>
              CLIENT RELATIONS <br />
              MANAGEMENT
            </>
          }
          subtitle={
            <>
              DATABASE STATUS:{" "}
              <span className="text-emerald-400">LIVE ACTIVE</span>
            </>
          }
          actions={
            <PremiumButton
              variant="primary"
              icon={Plus}
              type="button"
              onClick={openCreateDialog}
            >
              INITIATE CLIENT
            </PremiumButton>
          }
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ClientsStatItem
          icon={Users}
          label="TOTAL NODES"
          value={String(stats.totalNodes)}
          trend={stats.totalTrend}
          variants={dashboardItemVariants}
        />
        <ClientsStatItem
          icon={Briefcase}
          label="ACTIVE SPRINT"
          value={String(stats.activeCount)}
          trend={stats.activeTrend}
          variants={dashboardItemVariants}
        />
        <ClientsStatItem
          icon={ShieldCheck}
          label="TRUST INDEX"
          value={stats.trustIndex}
          trend={formatGrowth(Math.max(1, Math.round(stats.totalNodes / 10)))}
          variants={dashboardItemVariants}
        />
        <ClientsStatItem
          icon={Target}
          label="AVG. LTV"
          value={stats.avgLtv}
          trend={stats.totalTrend}
          variants={dashboardItemVariants}
        />
      </div>

      <motion.div
        variants={dashboardItemVariants}
        className="premium-card !p-0 overflow-hidden"
      >
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

        <div className="px-8 py-5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
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
              className="rounded-lg border-white/10 text-xs font-black uppercase tracking-wider text-white bg-transparent hover:bg-white/5"
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
                  className={`rounded-lg border text-xs font-black uppercase tracking-wider transition-all ${
                    pagination.currentPage === page
                      ? "border-accent-primary bg-accent-primary text-white"
                      : "border-white/10 text-white bg-transparent hover:bg-white/5"
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
              className="rounded-lg border-white/10 text-xs font-black uppercase tracking-wider text-white bg-transparent hover:bg-white/5"
            >
              Next
            </Button>
          </div>
        </div>
      </motion.div>

      <ClientDialog
        mode={dialogMode}
        draftClient={draftClient}
        errors={errors}
        onClose={closeDialog}
        onSave={saveDialogClient}
        onDraftChange={updateDraft}
      />

      <div className="fixed bottom-6 left-6 z-[1060] flex max-w-sm flex-col gap-3">
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
      </div>
    </motion.div>
  );
};
