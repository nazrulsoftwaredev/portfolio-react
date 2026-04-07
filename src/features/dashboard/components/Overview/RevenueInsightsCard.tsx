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

  const latestPoint = React.useMemo<RevenuePoint | null>(() => {
    return selectedRevenueData[selectedRevenueData.length - 1] ?? null;
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
      className="xl:col-span-2 p-5 md:p-6"
      contentClassName="space-y-5 md:space-y-6"
      title="Revenue insights"
      subtitle="Revenue and invoice trends by selected period"
      actions={
        <Select
          value={selectedRange}
          onValueChange={(value) => setSelectedRange(value as RevenueRange)}
        >
          <SelectTrigger className="h-10 min-w-[148px] md:min-w-[168px] bg-background border border-border rounded-xl px-3 text-xs font-semibold text-foreground cursor-pointer">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => setSelectedStat("revenue")}
          aria-pressed={selectedStat === "revenue"}
          className={`rounded-xl border bg-muted/20 p-4 text-left transition-colors ${
            selectedStat === "revenue"
              ? "border-primary/40 bg-primary/5"
              : "border-border"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground">
            Period Revenue
          </p>
          <p className="mt-2 text-xl md:text-2xl font-display font-semibold text-foreground tabular-nums">
            {formatCurrency(chartSummary.totalRevenue)}
          </p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedStat("invoices")}
          aria-pressed={selectedStat === "invoices"}
          className={`rounded-xl border bg-muted/20 p-4 text-left transition-colors ${
            selectedStat === "invoices"
              ? "border-primary/40 bg-primary/5"
              : "border-border"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground">
            Total Invoices
          </p>
          <p className="mt-2 text-xl md:text-2xl font-display font-semibold text-foreground tabular-nums">
            {chartSummary.totalInvoices}
          </p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedStat("ticket")}
          aria-pressed={selectedStat === "ticket"}
          className={`rounded-xl border bg-muted/20 p-4 text-left transition-colors ${
            selectedStat === "ticket"
              ? "border-primary/40 bg-primary/5"
              : "border-border"
          }`}
        >
          <p className="text-xs font-medium text-muted-foreground">
            Avg Ticket
          </p>
          <p className="mt-2 text-xl md:text-2xl font-display font-semibold text-foreground tabular-nums">
            {formatCurrency(Math.round(chartSummary.averageTicket))}
          </p>
        </button>
      </div>

      <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
        <p className="text-xs text-muted-foreground font-semibold tracking-wide leading-relaxed">
          {statInsight}
        </p>
      </div>

      <div className="h-[260px] sm:h-[300px] lg:h-[330px] w-full rounded-xl border border-border bg-background p-2 sm:p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={selectedRevenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="8%"
                  stopColor="var(--primary)"
                  stopOpacity={0.18}
                />
                <stop offset="92%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="5 5"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 600,
              }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <Tooltip
              cursor={{
                stroke: "var(--primary)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              formatter={(value: number | string, name: string) => {
                if (name === "revenue") {
                  return [formatCurrency(Number(value || 0)), "Revenue"];
                }

                return [value, "Invoices"];
              }}
              labelFormatter={(label: string) => `Period: ${label}`}
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "10px",
              }}
              itemStyle={{
                color: "var(--foreground)",
                fontWeight: 700,
                fontSize: "12px",
              }}
              labelStyle={{
                color: "var(--muted-foreground)",
                marginBottom: "4px",
                fontWeight: 600,
                fontSize: "10px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{
                r: 5,
                stroke: "var(--primary)",
                strokeWidth: 2,
                fill: "var(--background)",
              }}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {latestPoint && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-border bg-muted/20 px-3.5 py-3">
            <p className="text-xs font-medium text-muted-foreground">
            Latest: {latestPoint.label}
          </p>
            <p className="text-xs sm:text-sm font-semibold text-foreground">
            Revenue: {formatCurrency(latestPoint.revenue)}
          </p>
            <p className="text-xs sm:text-sm font-semibold text-foreground">
            Invoices: {latestPoint.invoices}
          </p>
            <p className="text-xs sm:text-sm font-semibold text-primary">
            Ticket:{" "}
            {formatCompactCurrency(latestPoint.revenue / latestPoint.invoices)}
          </p>
        </div>
      )}
    </PanelCard>
  );
};
