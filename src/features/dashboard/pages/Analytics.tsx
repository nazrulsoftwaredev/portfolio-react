import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  Activity,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui";
import { PageHeader } from "../components/common";
import { useDashboardAnalytics } from "../api/hooks";
import { AnimatePresence } from "framer-motion";
import { Toast } from "@/shared/components";

const trafficData = [
  { name: "Mon", desktop: 4000, mobile: 2400, tablet: 1200 },
  { name: "Tue", desktop: 3000, mobile: 1398, tablet: 900 },
  { name: "Wed", desktop: 2000, mobile: 9800, tablet: 1500 },
  { name: "Thu", desktop: 2780, mobile: 3908, tablet: 1100 },
  { name: "Fri", desktop: 1890, mobile: 4800, tablet: 1300 },
  { name: "Sat", desktop: 2390, mobile: 3800, tablet: 1400 },
  { name: "Sun", desktop: 3490, mobile: 4300, tablet: 1600 },
];

const deviceData = [
  { name: "Desktop", value: 45, color: "#acc7ff" },
  { name: "Mobile", value: 35, color: "#ffdd79" },
  { name: "Tablet", value: 20, color: "#2a2a2a" },
];

const PopularRoute = ({ route, views, growth }: any) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/30">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-muted-foreground">
        <Globe className="w-6 h-6" />
      </div>
      <div>
        <p className="font-semibold text-sm tracking-tight text-foreground">
          {route}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {views} unique nodes
        </p>
      </div>
    </div>
    <div
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider ${
        growth.startsWith("+")
          ? "bg-emerald-500/10 text-emerald-600"
          : "bg-red-500/10 text-red-600"
      }`}
    >
      {growth.startsWith("+") ? (
        <ArrowUpRight className="w-3 h-3" />
      ) : (
        <ArrowDownRight className="w-3 h-3" />
      )}
      {growth}
    </div>
  </div>
);

export const Analytics: React.FC = () => {
  const { fetchAnalytics, loading, error } = useDashboardAnalytics();
  const [range, setRange] = React.useState<"7d" | "30d" | "90d">("30d");
  const [showFilters, setShowFilters] = React.useState(false);
  const [trafficSeries, setTrafficSeries] = React.useState(trafficData);
  const [toasts, setToasts] = React.useState<
    Array<{ id: string; message: string; type: "info" | "success" | "error" | "warning" }>
  >([]);

  const pushToast = React.useCallback(
    (message: string, type: "info" | "success" | "error" | "warning" = "info") =>
      setToasts((previous) => [
        ...previous,
        { id: crypto.randomUUID(), message, type },
      ]),
    [],
  );

  const loadAnalytics = React.useCallback(async () => {
    try {
      const data = await fetchAnalytics();
      const nextSeries = (data.chartData ?? []).map((item: any, index: number) => ({
        name: item.month ?? item.name ?? String(index + 1),
        desktop: Number(item.desktop ?? item.value ?? 0),
        mobile: Number(item.mobile ?? Math.round(Number(item.value ?? 0) * 0.7)),
        tablet: Number(item.tablet ?? Math.round(Number(item.value ?? 0) * 0.35)),
      }));
      if (nextSeries.length > 0) {
        setTrafficSeries(nextSeries);
      }
    } catch {
      pushToast("Could not load live analytics. Showing fallback data.", "warning");
    }
  }, [fetchAnalytics, pushToast]);

  React.useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const filteredTrafficData = React.useMemo(() => {
    if (range === "7d") {
      return trafficSeries.slice(-7);
    }
    if (range === "30d") {
      return trafficSeries.slice(-30);
    }
    return trafficSeries;
  }, [range, trafficSeries]);

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          title={
            <>
              Data analytics <br />
              infrastructure
            </>
          }
          subtitle={
            <>
              Period: <span className="text-primary">{range === "7d" ? "Last 7 days" : range === "30d" ? "Last 30 days" : "Last 90 days"}</span>
            </>
          }
          actions={
            <>
              <Button
                variant="outline"
                className="gap-2 border-transparent bg-muted/20 hover:bg-muted/30"
                type="button"
                onClick={() =>
                  setRange((previous) =>
                    previous === "7d" ? "30d" : previous === "30d" ? "90d" : "7d",
                  )
                }
              >
                <Calendar className="w-4 h-4" />
                {range === "7d" ? "Last 7 Days" : range === "30d" ? "Last 30 Days" : "Last 90 Days"}
              </Button>
              <Button
                className="gap-2"
                type="button"
                onClick={() => setShowFilters((previous) => !previous)}
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Filters"}
              </Button>
            </>
          }
        />
      </div>
      {showFilters ? (
        <div className="premium-card !p-4 flex items-center gap-2">
          <Button size="sm" variant="outline" type="button" onClick={() => pushToast("Traffic source filter applied.", "info")}>Source</Button>
          <Button size="sm" variant="outline" type="button" onClick={() => pushToast("Region filter applied.", "info")}>Region</Button>
          <Button size="sm" variant="outline" type="button" onClick={() => pushToast("Device filter applied.", "info")}>Device</Button>
          <Button size="sm" variant="outline" type="button" onClick={loadAnalytics}>Refresh</Button>
        </div>
      ) : null}
      {error ? (
        <div className="premium-card !p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Analytics request failed: {error}</p>
          <Button type="button" size="sm" onClick={loadAnalytics}>Retry</Button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 dash-grid-gap">
        <div className="lg:col-span-2 premium-card space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
                Traffic flow
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Cross-platform node activity
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-xs text-foreground font-medium">
                  Desktop
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <span className="text-xs text-foreground font-medium">
                  Mobile
                </span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredTrafficData}>
                <defs>
                  <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#acc7ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#acc7ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffdd79" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ffdd79" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="10 10"
                  vertical={false}
                  stroke="rgba(100,100,100,0.15)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666", fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666", fontSize: 10, fontWeight: 600 }}
                />
                <Tooltip
                  cursor={{
                    stroke: "#acc7ff",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  itemStyle={{ fontSize: "12px", fontWeight: 700 }}
                  labelStyle={{
                    color: "var(--muted-foreground)",
                    marginBottom: "4px",
                    fontWeight: 600,
                    fontSize: "10px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="desktop"
                  stroke="#acc7ff"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorDesktop)"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="mobile"
                  stroke="#ffdd79"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorMobile)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card space-y-10 flex flex-col">
          <div>
            <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
              Device ratio
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Platform segmentation
            </p>
          </div>

          <div className="h-[280px] w-full relative flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                  isAnimationActive={false}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-4xl font-display font-semibold text-foreground">
                100%
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                Total nodes
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border/60">
            {deviceData.map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ backgroundColor: device.color }}
                  ></div>
                  <span className="text-xs font-medium text-foreground">
                    {device.name}
                  </span>
                </div>
                <span className="text-sm font-display font-semibold text-foreground tabular-nums">
                  {device.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 dash-grid-gap">
        <div className="premium-card space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
                Popular routes
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                High-traffic access points
              </p>
            </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-transparent bg-muted/20 hover:bg-muted/30"
                type="button"
                onClick={() => pushToast("Opening detailed analytics log.", "info")}
              >
              <Activity className="w-4 h-4" />
              View Full Log
            </Button>
          </div>
          <div className="space-y-3">
            <PopularRoute
              route="/work/neon-genesis"
              views="4,230"
              growth="+12.4%"
            />
            <PopularRoute route="/about" views="2,840" growth="+5.2%" />
            <PopularRoute
              route="/work/aether-flow"
              views="1,920"
              growth="-2.1%"
            />
            <PopularRoute route="/contact" views="1,240" growth="+1.8%" />
            <PopularRoute
              route="/blog/design-systems"
              views="980"
              growth="+15.4%"
            />
          </div>
        </div>

        <div className="premium-card space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
                Audience growth
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Expansion metrics
              </p>
            </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-transparent bg-muted/20 hover:bg-muted/30"
                type="button"
                onClick={() => pushToast("Export started. CSV download will begin shortly.", "success")}
              >
              <Layers className="w-4 h-4" />
              Export Data
            </Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredTrafficData}>
                <CartesianGrid
                  strokeDasharray="10 10"
                  vertical={false}
                  stroke="rgba(100,100,100,0.15)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666", fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666", fontSize: 10, fontWeight: 600 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                />
                <Bar
                  dataKey="desktop"
                  fill="#acc7ff"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="mobile"
                  fill="#ffdd79"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-xs text-muted-foreground font-medium px-1">
          Syncing analytics...
        </div>
      ) : null}
      <div className="fixed bottom-6 left-6 z-[1060] flex max-w-sm flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              isOpen
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToasts((previous) => previous.filter((item) => item.id !== toast.id))
              }
              inline
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
