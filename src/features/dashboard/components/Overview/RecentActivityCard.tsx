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
      className="p-5 md:p-6"
      contentClassName="space-y-5"
      title="Recent activity"
      actions={
        <button
          className="text-primary text-xs font-semibold flex items-center gap-1.5 rounded-lg px-2 py-1 hover:bg-primary/10"
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
              className={`rounded-full min-h-9 px-3 py-1.5 text-xs font-semibold transition-colors ${
                activityFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3 md:space-y-3.5">
        {filteredActivities.map((activity, i) => (
          <button
            key={`${activity.label}-${i}`}
            type="button"
            onClick={() => onActivityClick?.(activity.type, activity.label)}
            className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-muted/20 transition-colors hover:bg-muted/30"
          >
            <div className={`p-2.5 rounded-lg ${activity.color}`}>
              <activity.icon className={`w-5 h-5 ${activity.textColor}`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">
                {activity.label}
              </p>
              <p className="text-xs font-medium text-muted-foreground mt-1">
                {activity.client || activity.industry || activity.preview}
              </p>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-500">
              {activity.amount}
            </p>
          </button>
        ))}
      </div>
    </PanelCard>
  );
};
