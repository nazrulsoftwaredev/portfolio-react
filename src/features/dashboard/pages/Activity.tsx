import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  CircleDot,
  FileText,
  MessageSquare,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PageHeader } from "../components/common";
import type { ActivityType } from "../components/Overview/overviewData";
import { recentActivities } from "../components/Overview/overviewData";

const activityFilters = [
  { value: "ALL", label: "All" },
  { value: "invoice", label: "Invoices" },
  { value: "client", label: "Clients" },
  { value: "message", label: "Messages" },
] as const;

const typeLabels: Record<ActivityType, string> = {
  invoice: "Invoice",
  client: "Client",
  message: "Message",
};

const typeIcon: Record<
  ActivityType,
  React.ComponentType<{ className?: string }>
> = {
  invoice: FileText,
  client: Building2,
  message: MessageSquare,
};

export const Activity: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = React.useState<"ALL" | ActivityType>("ALL");

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

  const filteredActivities = React.useMemo(() => {
    return filter === "ALL"
      ? recentActivities
      : recentActivities.filter((item) => item.type === filter);
  }, [filter]);

  const openActivityDetails = (activity: {
    type: ActivityType;
    label: string;
  }) => {
    const params = new URLSearchParams({
      type: activity.type,
      label: activity.label,
    });
    navigate(`/dashboard/activity/details?${params.toString()}`);
  };

  return (
    <motion.div
      className="dash-stack"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
      >
        <PageHeader
          className="gap-5 md:gap-6"
          title="Activity"
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle="Track important updates and open any event to view full details on its own page."
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      >
        <div className="premium-card dash-card-pad space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
            Total Events
          </p>
          <p className="text-2xl font-display font-bold tracking-tight text-foreground">
            {recentActivities.length}
          </p>
        </div>
        <div className="premium-card dash-card-pad space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
            Invoices
          </p>
          <p className="text-2xl font-display font-bold tracking-tight text-foreground">
            {activityCounts.invoice}
          </p>
        </div>
        <div className="premium-card dash-card-pad space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
            Clients
          </p>
          <p className="text-2xl font-display font-bold tracking-tight text-foreground">
            {activityCounts.client}
          </p>
        </div>
        <div className="premium-card dash-card-pad space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
            Messages
          </p>
          <p className="text-2xl font-display font-bold tracking-tight text-foreground">
            {activityCounts.message}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="premium-card !p-0 overflow-hidden"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
      >
        <div className="dash-card-pad border-b border-border/60 bg-muted/10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {activityFilters.map((item) => {
              const label =
                item.value === "ALL"
                  ? `All (${recentActivities.length})`
                  : `${item.label} (${activityCounts[item.value]})`;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value as "ALL" | ActivityType)}
                  aria-pressed={filter === item.value}
                  className={`rounded-full min-h-9 px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    filter === item.value
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="dash-card-pad pt-4 md:pt-5">
          <div className="space-y-3 md:space-y-3.5">
            {filteredActivities.length ? (
              filteredActivities.map((activity, i) => {
                const TypeIcon = typeIcon[activity.type];
                return (
                  <button
                    key={`${activity.label}-${i}`}
                    type="button"
                    onClick={() => openActivityDetails(activity)}
                    className="w-full text-left rounded-2xl border border-border/60 bg-muted/20 p-4 md:p-5 transition-all hover:bg-muted/35 hover:border-border"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`p-2.5 rounded-lg ${activity.color}`}>
                        <activity.icon
                          className={`w-5 h-5 ${activity.textColor}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-sm md:text-base text-foreground break-words">
                            {activity.label}
                          </p>
                          <span className="inline-flex items-center gap-1 rounded-full bg-background/70 px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                            <TypeIcon className="w-3 h-3" />
                            {typeLabels[activity.type]}
                          </span>
                        </div>

                        <p className="text-xs md:text-sm font-medium text-muted-foreground break-words">
                          {activity.client ||
                            activity.industry ||
                            activity.preview ||
                            "No additional details"}
                        </p>

                        <div className="inline-flex items-center gap-1 text-[11px] md:text-xs font-semibold text-muted-foreground">
                          <CircleDot className="w-3.5 h-3.5" />
                          Updated moments ago
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {activity.amount ? (
                          <p className="text-xs sm:text-sm font-semibold text-emerald-500 whitespace-nowrap">
                            {activity.amount}
                          </p>
                        ) : null}
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          View details
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="rounded-2xl bg-muted/10 p-5 text-sm text-muted-foreground">
                No activity found for this filter.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
