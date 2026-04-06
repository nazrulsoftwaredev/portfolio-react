import React from "react";
import {
  Users,
  FileText,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ArrowRight,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

type RevenuePoint = {
  label: string;
  revenue: number;
  invoices: number;
};

type ActivityType = "invoice" | "client" | "message";

interface ActivityItem {
  type: ActivityType;
  label: string;
  amount?: string;
  client?: string;
  industry?: string;
  preview?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
}

type RevenueRange =
  | "THIS_WEEK"
  | "LAST_WEEK"
  | "THIS_MONTH"
  | "MONTHLY_ARCHIVE";

const rangeOptions: Array<{ value: RevenueRange; label: string }> = [
  { value: "THIS_WEEK", label: "THIS WEEK" },
  { value: "LAST_WEEK", label: "LAST WEEK" },
  { value: "THIS_MONTH", label: "THIS MONTH" },
  { value: "MONTHLY_ARCHIVE", label: "MONTHLY ARCHIVE" },
];

const revenueSeriesByRange: Record<RevenueRange, RevenuePoint[]> = {
  THIS_WEEK: [
    { label: "Mon", revenue: 4000, invoices: 2 },
    { label: "Tue", revenue: 3000, invoices: 1 },
    { label: "Wed", revenue: 5000, invoices: 3 },
    { label: "Thu", revenue: 2780, invoices: 1 },
    { label: "Fri", revenue: 4890, invoices: 2 },
    { label: "Sat", revenue: 2390, invoices: 1 },
    { label: "Sun", revenue: 6490, invoices: 4 },
  ],
  LAST_WEEK: [
    { label: "Mon", revenue: 3100, invoices: 1 },
    { label: "Tue", revenue: 3620, invoices: 2 },
    { label: "Wed", revenue: 4200, invoices: 2 },
    { label: "Thu", revenue: 2960, invoices: 1 },
    { label: "Fri", revenue: 5150, invoices: 3 },
    { label: "Sat", revenue: 1980, invoices: 1 },
    { label: "Sun", revenue: 4420, invoices: 2 },
  ],
  THIS_MONTH: [
    { label: "W1", revenue: 16200, invoices: 8 },
    { label: "W2", revenue: 18400, invoices: 9 },
    { label: "W3", revenue: 20850, invoices: 11 },
    { label: "W4", revenue: 23100, invoices: 12 },
  ],
  MONTHLY_ARCHIVE: [
    { label: "Jan", revenue: 48200, invoices: 25 },
    { label: "Feb", revenue: 51800, invoices: 28 },
    { label: "Mar", revenue: 56400, invoices: 30 },
    { label: "Apr", revenue: 60200, invoices: 33 },
    { label: "May", revenue: 58800, invoices: 31 },
    { label: "Jun", revenue: 64200, invoices: 36 },
  ],
};

const recentActivities: ActivityItem[] = [
  {
    type: "invoice",
    label: "INV-2024-001",
    client: "Acme Corp",
    amount: "+$4,500",
    icon: FileText,
    color: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },
  {
    type: "client",
    label: "New Client: Global Tech",
    industry: "Finance",
    amount: "$12.2K",
    icon: Users,
    color: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  {
    type: "invoice",
    label: "INV-2024-002",
    client: "Studio X",
    amount: "+$2,800",
    icon: FileText,
    color: "bg-purple-500/10",
    textColor: "text-purple-400",
  },
  {
    type: "message",
    label: "New message from Future Labs",
    preview: "Partnership proposal",
    icon: MessageCircle,
    color: "bg-amber-500/10",
    textColor: "text-amber-400",
  },
  {
    type: "invoice",
    label: "INV-2024-003",
    client: "Eco World",
    amount: "+$1,500",
    icon: FileText,
    color: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },
];

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  bgGradient: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendPositive = true,
  bgGradient,
}: StatCardProps) => (
  <div className="premium-card relative overflow-hidden">
    <div
      className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 ${bgGradient}`}
    />

    <div className="flex items-center justify-between">
      <div className="p-3 rounded-2xl bg-muted border border-border text-foreground">
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <Badge
          variant="outline"
          className={`gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-wider border ${
            trendPositive
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              : "bg-red-500/10 text-red-600 border-red-500/20"
          }`}
        >
          {trendPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {trend}
        </Badge>
      )}
    </div>

    <div className="mt-6">
      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
        {label}
      </p>
      <h3 className="text-3xl font-display font-semibold mt-2 text-foreground tabular-nums">
        {value}
      </h3>
    </div>

    <div className="mt-4 flex items-center gap-2">
      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full w-[70%] bg-gradient-to-r from-primary/70 to-secondary/60" />
      </div>
    </div>
  </div>
);

export const Overview: React.FC = () => {
  const [selectedRange, setSelectedRange] =
    React.useState<RevenueRange>("THIS_WEEK");
  const [selectedStat, setSelectedStat] = React.useState<
    "revenue" | "invoices" | "ticket"
  >("revenue");
  const [activityFilter, setActivityFilter] = React.useState<
    "ALL" | ActivityType
  >("ALL");
  const [selectedPoint, setSelectedPoint] = React.useState<RevenuePoint | null>(
    null,
  );

  const selectedRevenueData = React.useMemo(
    () => revenueSeriesByRange[selectedRange],
    [selectedRange],
  );

  const chartSummary = React.useMemo(() => {
    const totalRevenue = selectedRevenueData.reduce(
      (acc, point) => acc + point.revenue,
      0,
    );
    const totalInvoices = selectedRevenueData.reduce(
      (acc, point) => acc + point.invoices,
      0,
    );

    const averageTicket = totalInvoices > 0 ? totalRevenue / totalInvoices : 0;

    return {
      totalRevenue,
      totalInvoices,
      averageTicket,
    };
  }, [selectedRevenueData]);

  const formatCurrency = React.useCallback((value: number) => {
    return `$${value.toLocaleString()}`;
  }, []);

  const formatCompactCurrency = React.useCallback(
    (value: number) => {
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`;
      }

      return formatCurrency(value);
    },
    [formatCurrency],
  );

  const topRevenuePoint = React.useMemo(() => {
    return selectedRevenueData.reduce((top, point) =>
      point.revenue > top.revenue ? point : top,
    );
  }, [selectedRevenueData]);

  const filteredActivities = React.useMemo(() => {
    if (activityFilter === "ALL") {
      return recentActivities;
    }

    return recentActivities.filter((item) => item.type === activityFilter);
  }, [activityFilter]);

  React.useEffect(() => {
    setSelectedPoint(
      selectedRevenueData[selectedRevenueData.length - 1] ?? null,
    );
  }, [selectedRevenueData]);

  const statInsight = React.useMemo(() => {
    if (selectedStat === "revenue") {
      return `Strongest period: ${topRevenuePoint.label} at ${formatCurrency(topRevenuePoint.revenue)}.`;
    }

    if (selectedStat === "invoices") {
      return `Total invoices in current view: ${chartSummary.totalInvoices}. Keep throughput above this baseline.`;
    }

    return `Average ticket value is ${formatCurrency(Math.round(chartSummary.averageTicket))} for the selected range.`;
  }, [
    chartSummary.averageTicket,
    chartSummary.totalInvoices,
    formatCurrency,
    selectedStat,
    topRevenuePoint.label,
    topRevenuePoint.revenue,
  ]);

  return (
    <div className="space-y-10">
      <div>
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-foreground leading-tight">
            BUSINESS <br />
            COMMAND CENTER
          </h2>
          <p className="text-muted-foreground font-semibold mt-2 text-sm uppercase tracking-[0.2em]">
            STATUS: <span className="text-emerald-600">OPERATIONS ACTIVE</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Key Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Monthly Revenue"
          value="$28,550"
          trend="+18.5%"
          trendPositive={true}
          bgGradient="bg-emerald-500/20"
        />
        <StatCard
          icon={Users}
          label="Active Clients"
          value="12"
          trend="+3"
          trendPositive={true}
          bgGradient="bg-blue-500/20"
        />
        <StatCard
          icon={FileText}
          label="Pending Invoices"
          value="5"
          trend="-2"
          trendPositive={false}
          bgGradient="bg-amber-500/20"
        />
        <StatCard
          icon={Zap}
          label="Pipeline Value"
          value="$142K"
          trend="+25.2%"
          trendPositive={true}
          bgGradient="bg-purple-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
                REVENUE INSIGHTS
              </h3>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mt-1">
                Revenue and invoice trends by selected period
              </p>
            </div>
            <Select
              value={selectedRange}
              onValueChange={(value) => setSelectedRange(value as RevenueRange)}
            >
              <SelectTrigger className="bg-background border border-border rounded-xl px-4 py-2.5 h-auto text-xs font-semibold text-foreground cursor-pointer">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border text-foreground">
                {rangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSelectedStat("revenue")}
              className={`rounded-2xl border bg-muted/30 p-4 text-left ${
                selectedStat === "revenue"
                  ? "border-primary/40 ring-1 ring-primary/30"
                  : "border-border"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Period Revenue
              </p>
              <p className="mt-2 text-xl font-display font-semibold text-foreground tabular-nums">
                {formatCurrency(chartSummary.totalRevenue)}
              </p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStat("invoices")}
              className={`rounded-2xl border bg-muted/30 p-4 text-left ${
                selectedStat === "invoices"
                  ? "border-primary/40 ring-1 ring-primary/30"
                  : "border-border"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Total Invoices
              </p>
              <p className="mt-2 text-xl font-display font-semibold text-foreground tabular-nums">
                {chartSummary.totalInvoices}
              </p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStat("ticket")}
              className={`rounded-2xl border bg-muted/30 p-4 text-left ${
                selectedStat === "ticket"
                  ? "border-primary/40 ring-1 ring-primary/30"
                  : "border-border"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Avg Ticket
              </p>
              <p className="mt-2 text-xl font-display font-semibold text-foreground tabular-nums">
                {formatCurrency(Math.round(chartSummary.averageTicket))}
              </p>
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground font-semibold tracking-wide">
              {statInsight}
            </p>
          </div>

          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={selectedRevenueData}
                onClick={(state: any) => {
                  if (!state.activePayload?.length) {
                    return;
                  }

                  const point = state.activePayload[0].payload as RevenuePoint;
                  setSelectedPoint(point);
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#acc7ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#acc7ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="10 10"
                  vertical={false}
                  stroke="rgba(100,100,100,0.15)"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666", fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#666", fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{
                    stroke: "#acc7ff",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  formatter={(value: any, name: any) => {
                    if (name === "revenue") {
                      return [formatCurrency(Number(value || 0)), "Revenue"];
                    }

                    return [value, "Invoices"];
                  }}
                  labelFormatter={(label: any) => `Period: ${label}`}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  itemStyle={{
                    color: "var(--foreground)",
                    fontWeight: 800,
                    fontSize: "14px",
                  }}
                  labelStyle={{
                    color: "var(--muted-foreground)",
                    marginBottom: "4px",
                    fontWeight: 700,
                    fontSize: "10px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#acc7ff"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  activeDot={{
                    r: 6,
                    stroke: "#acc7ff",
                    strokeWidth: 2,
                    fill: "#0d111b",
                  }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {selectedPoint && (
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-muted/30 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Selected: {selectedPoint.label}
              </p>
              <p className="text-sm font-semibold text-foreground">
                Revenue: {formatCurrency(selectedPoint.revenue)}
              </p>
              <p className="text-sm font-semibold text-foreground">
                Invoices: {selectedPoint.invoices}
              </p>
              <p className="text-sm font-semibold text-primary">
                Ticket:{" "}
                {formatCompactCurrency(
                  selectedPoint.revenue / selectedPoint.invoices,
                )}
              </p>
            </div>
          )}
        </div>

        <div className="premium-card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold tracking-tight text-foreground">
              RECENT ACTIVITY
            </h3>
            <button className="text-primary text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1">
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: "ALL", label: `All (${recentActivities.length})` },
              {
                value: "invoice",
                label: `Invoices (${recentActivities.filter((item) => item.type === "invoice").length})`,
              },
              {
                value: "client",
                label: `Clients (${recentActivities.filter((item) => item.type === "client").length})`,
              },
              {
                value: "message",
                label: `Messages (${recentActivities.filter((item) => item.type === "message").length})`,
              },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActivityFilter(filter.value as "ALL" | ActivityType)
                }
                className={`rounded-xl px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                  activityFilter === filter.value
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-muted/40 text-muted-foreground border border-border"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {filteredActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-2 rounded-2xl hover:bg-muted/40"
              >
                <div className={`p-3 rounded-xl ${activity.color}`}>
                  <activity.icon className={`w-5 h-5 ${activity.textColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground tracking-tight">
                    {activity.label}
                  </p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
                    {activity.client || activity.industry || activity.preview}
                  </p>
                </div>
                <p className="text-sm font-semibold text-emerald-600">
                  {activity.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="premium-card !p-0 overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-border">
          <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
            CLIENT PORTFOLIO
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-2xl border-4 border-background bg-muted overflow-hidden"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                    alt="Client"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-[10px] font-semibold text-primary">
              +6
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] bg-muted/30">
                <th className="px-8 py-4">Client Name</th>
                <th className="px-8 py-4">Industry</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Client Value</th>
                <th className="px-8 py-4 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  name: "Acme Corp",
                  type: "Technology",
                  status: "ACTIVE",
                  value: "$45,000",
                  growth: "+12%",
                },
                {
                  name: "Global Tech",
                  type: "Finance",
                  status: "ACTIVE",
                  value: "$12,200",
                  growth: "+5%",
                },
                {
                  name: "Studio X",
                  type: "Design",
                  status: "ACTIVE",
                  value: "$8,800",
                  growth: "+8%",
                },
                {
                  name: "Future Labs",
                  type: "R&D",
                  status: "ACTIVE",
                  value: "$62,000",
                  growth: "+25%",
                },
              ].map((client, i) => (
                <tr key={i} className="group hover:bg-muted/30">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs border border-primary/20">
                        {client.name[0]}
                      </div>
                      <span className="font-semibold text-sm tracking-tight text-foreground">
                        {client.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    {client.type}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-display font-semibold text-sm text-foreground tabular-nums">
                    {client.value}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-emerald-600 font-semibold text-sm">
                      {client.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
