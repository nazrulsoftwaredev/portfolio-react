import {
  ClientPortfolioCard,
  OverviewHeader,
  OverviewStatsGrid,
  RecentActivityCard,
  RevenueInsightsCard,
} from "@/features/dashboard/components/Overview";
import { Toast } from "@/shared/components";
import { useOverviewActions } from "@/features/dashboard/components/Overview/useOverviewActions";
import type { ActivityType } from "@/features/dashboard/components/Overview/overviewData";

export const Overview: React.FC = () => {
  const { toasts, dismissToast, showToast, navigateTo } = useOverviewActions();

  const handleNewInvoice = () => {
    navigateTo("/dashboard/invoices", "Opening invoices", "info");
  };

  const handleNewProject = () => {
    navigateTo("/dashboard/pipeline", "Starting a new project", "info");
  };

  const handleViewAllActivity = () => {
    navigateTo("/dashboard/messages", "Opening activity feed", "info");
  };

  const handleActivityClick = (type: ActivityType, label: string) => {
    if (type === "invoice") {
      navigateTo("/dashboard/invoices", `Viewing ${label}`, "info");
      return;
    }

    if (type === "client") {
      navigateTo("/dashboard/clients", `Viewing ${label}`, "info");
      return;
    }

    navigateTo("/dashboard/messages", `Opening ${label}`, "info");
  };

  const handleStatClick = (label: string) => {
    showToast(`${label} selected`, "info");
  };

  return (
    <div className="space-y-10">
      <OverviewHeader
        onNewInvoice={handleNewInvoice}
        onNewProject={handleNewProject}
      />
      <OverviewStatsGrid onStatClick={handleStatClick} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RevenueInsightsCard />
        <RecentActivityCard
          onViewAll={handleViewAllActivity}
          onActivityClick={handleActivityClick}
        />
      </div>

      <ClientPortfolioCard />

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          isOpen
          message={toast.message}
          type={toast.type}
          onClose={() => dismissToast(toast.id)}
        />
      ))}
    </div>
  );
};
