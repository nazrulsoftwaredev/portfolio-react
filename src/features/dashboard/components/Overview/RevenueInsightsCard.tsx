import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { PanelCard } from "../common";
import {
  rangeOptions,
  RevenuePoint,
  RevenueRange,
  revenueSeriesByRange,
} from "./overviewData";
import { formatCompactCurrency, formatCurrency } from "./overviewUtils";

export const RevenueInsightsCard = () => {
  const [selectedRange, setSelectedRange] =
    React.useState<RevenueRange>("THIS_WEEK");
  const [selectedStat, setSelectedStat] = React.useState<
    "revenue" | "invoices" | "ticket"
  >("revenue");
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

  const topRevenuePoint = React.useMemo(() => {
    return selectedRevenueData.reduce((top, point) =>
      point.revenue > top.revenue ? point : top,
    );
  }, [selectedRevenueData]);

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
    selectedStat,
    topRevenuePoint.label,
    topRevenuePoint.revenue,
  ]);

  return (
    <PanelCard
      className="lg:col-span-2 p-6"
      contentClassName="space-y-8"
      title="Revenue insights"
      subtitle="Revenue and invoice trends by selected period"
      actions={
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
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setSelectedStat("revenue")}
          aria-pressed={selectedStat === "revenue"}
          className={`rounded-2xl border bg-muted/30 p-4 text-left ${
            selectedStat === "revenue"
              ? "border-primary/40 ring-1 ring-primary/30"
              : "border-border"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground">
            Period Revenue
          </p>
          <p className="mt-2 text-xl font-display font-semibold text-foreground tabular-nums">
            {formatCurrency(chartSummary.totalRevenue)}
          </p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedStat("invoices")}
          aria-pressed={selectedStat === "invoices"}
          className={`rounded-2xl border bg-muted/30 p-4 text-left ${
            selectedStat === "invoices"
              ? "border-primary/40 ring-1 ring-primary/30"
              : "border-border"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground">
            Total Invoices
          </p>
          <p className="mt-2 text-xl font-display font-semibold text-foreground tabular-nums">
            {chartSummary.totalInvoices}
          </p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedStat("ticket")}
          aria-pressed={selectedStat === "ticket"}
          className={`rounded-2xl border bg-muted/30 p-4 text-left ${
            selectedStat === "ticket"
              ? "border-primary/40 ring-1 ring-primary/30"
              : "border-border"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground">
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

      <div className="h-[350px] w-full mt-4 rounded-2xl border border-border/60 bg-muted/20 p-3">
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
          <p className="text-xs font-medium text-muted-foreground">
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
    </PanelCard>
  );
};
