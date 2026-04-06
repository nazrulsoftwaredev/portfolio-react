import React from "react";
import { ArrowRight } from "lucide-react";
import { ActivityType, recentActivities } from "./overviewData";
import { PanelCard } from "../common";

const activityFilters = [
  { value: "ALL", label: "All" },
  { value: "invoice", label: "Invoices" },
  { value: "client", label: "Clients" },
  { value: "message", label: "Messages" },
] as const;

interface RecentActivityCardProps {
  onViewAll?: () => void;
  onActivityClick?: (type: ActivityType, label: string) => void;
}

export const RecentActivityCard = ({
  onViewAll,
  onActivityClick,
}: RecentActivityCardProps) => {
  const [activityFilter, setActivityFilter] = React.useState<
    "ALL" | ActivityType
  >("ALL");

  const filteredActivities = React.useMemo(() => {
    if (activityFilter === "ALL") {
      return recentActivities;
    }

    return recentActivities.filter((item) => item.type === activityFilter);
  }, [activityFilter]);

  const activityCounts = React.useMemo(
    () => ({
      invoice: recentActivities.filter((item) => item.type === "invoice")
        .length,
      client: recentActivities.filter((item) => item.type === "client").length,
      message: recentActivities.filter((item) => item.type === "message")
        .length,
    }),
    [],
  );

  return (
    <PanelCard
      className="p-6"
      contentClassName="space-y-6"
      title="Recent activity"
      actions={
        <button
          className="text-primary text-xs font-semibold flex items-center gap-1"
          type="button"
          onClick={onViewAll}
        >
          View all <ArrowRight className="w-3 h-3" />
        </button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {activityFilters.map((filter) => {
          const label =
            filter.value === "ALL"
              ? `All (${recentActivities.length})`
              : `${filter.label} (${activityCounts[filter.value]})`;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                setActivityFilter(filter.value as "ALL" | ActivityType)
              }
              aria-pressed={activityFilter === filter.value}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                activityFilter === filter.value
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted/40 text-muted-foreground border border-border"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        {filteredActivities.map((activity, i) => (
          <button
            key={`${activity.label}-${i}`}
            type="button"
            onClick={() => onActivityClick?.(activity.type, activity.label)}
            className="w-full text-left flex items-center gap-4 p-2 rounded-2xl border border-transparent transition hover:border-border/80 hover:bg-muted/40"
          >
            <div className={`p-3 rounded-xl ${activity.color}`}>
              <activity.icon className={`w-5 h-5 ${activity.textColor}`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground tracking-tight">
                {activity.label}
              </p>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                {activity.client || activity.industry || activity.preview}
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-600">
              {activity.amount}
            </p>
          </button>
        ))}
      </div>
    </PanelCard>
  );
};
