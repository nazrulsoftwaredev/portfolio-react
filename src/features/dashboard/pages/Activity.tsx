import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/common";
import type { ActivityType } from "../components/Overview/overviewData";
import { recentActivities } from "../components/Overview/overviewData";

const activityFilters = [
  { value: "ALL", label: "All" },
  { value: "invoice", label: "Invoices" },
  { value: "client", label: "Clients" },
  { value: "message", label: "Messages" },
] as const;

const destinationByType: Record<ActivityType, string> = {
  invoice: "/dashboard/invoices",
  client: "/dashboard/clients",
  message: "/dashboard/messages",
};

export const Activity: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFocus = searchParams.get("focus") ?? "";
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<"ALL" | ActivityType>("ALL");
  const [selected, setSelected] = React.useState<string>(initialFocus);

  React.useEffect(() => {
    if (!initialFocus) return;
    setSelected(initialFocus);
  }, [initialFocus]);

  const activityCounts = React.useMemo(
    () => ({
      invoice: recentActivities.filter((item) => item.type === "invoice").length,
      client: recentActivities.filter((item) => item.type === "client").length,
      message: recentActivities.filter((item) => item.type === "message").length,
    }),
    [],
  );

  const filteredActivities = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const typeFiltered =
      filter === "ALL"
        ? recentActivities
        : recentActivities.filter((item) => item.type === filter);

    if (!normalizedQuery) return typeFiltered;

    return typeFiltered.filter((item) => {
      const haystack = [
        item.label,
        item.client,
        item.industry,
        item.preview,
        item.amount,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [filter, query]);

  const selectedActivity = React.useMemo(() => {
    if (!selected) return null;
    return recentActivities.find((item) => item.label === selected) ?? null;
  }, [selected]);

  const handleSelect = (label: string) => {
    setSelected(label);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("focus", label);
      return next;
    });
  };

  const handleOpen = () => {
    if (!selectedActivity) return;
    navigate(destinationByType[selectedActivity.type]);
  };

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          className="gap-5 md:gap-6"
          title="Activity"
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle="All recent activity in one place. Select an item to preview details."
        />
      </div>

      <div className="premium-card !p-0 overflow-hidden">
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
                  className={`rounded-full min-h-9 px-3 py-1.5 text-xs font-semibold transition-colors ${
                    filter === item.value
                      ? "bg-background text-foreground shadow-sm"
                      : "bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            <div className="ml-auto w-full sm:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search activity…"
                className="w-full h-10 rounded-xl bg-muted/20 px-3 text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        <div className="dash-card-pad pt-4 md:pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 dash-grid-gap items-start">
            <div className="lg:col-span-2 space-y-3 md:space-y-3.5">
              {filteredActivities.length ? (
                filteredActivities.map((activity, i) => {
                  const isSelected = selected === activity.label;
                  return (
                    <button
                      key={`${activity.label}-${i}`}
                      type="button"
                      onClick={() => handleSelect(activity.label)}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-primary/5"
                          : "bg-muted/20 hover:bg-muted/30"
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg ${activity.color}`}>
                        <activity.icon
                          className={`w-5 h-5 ${activity.textColor}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {activity.label}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground mt-1 truncate">
                          {activity.client ||
                            activity.industry ||
                            activity.preview}
                        </p>
                      </div>
                      {activity.amount ? (
                        <p className="text-xs sm:text-sm font-semibold text-emerald-500 whitespace-nowrap">
                          {activity.amount}
                        </p>
                      ) : null}
                    </button>
                  );
                })
              ) : (
                <div className="rounded-2xl bg-muted/10 p-5 text-sm text-muted-foreground">
                  No activity found.
                </div>
              )}
            </div>

            <div className="premium-card dash-card-pad space-y-4 lg:sticky lg:top-6">
              {selectedActivity ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${selectedActivity.color}`}>
                      <selectedActivity.icon
                        className={`w-5 h-5 ${selectedActivity.textColor}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-display font-semibold tracking-tight text-foreground truncate">
                        {selectedActivity.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedActivity.client ||
                          selectedActivity.industry ||
                          selectedActivity.preview}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-muted/20 px-4 py-3 space-y-1.5">
                    <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Type
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedActivity.type}
                    </p>
                    {selectedActivity.amount ? (
                      <p className="text-sm font-semibold text-emerald-500 pt-1">
                        {selectedActivity.amount}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleOpen}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground min-h-11 text-xs font-semibold hover:opacity-95 transition"
                  >
                    Open details <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Select an activity item to preview it here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

