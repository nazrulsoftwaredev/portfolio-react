import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui";

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  onClick?: () => void;
}

export const OverviewStatCard = React.memo(
  ({
    icon: Icon,
    label,
    value,
    trend,
    trendPositive = true,
    onClick,
  }: StatCardProps) => (
    <div
      className={`premium-card min-h-[176px] p-5 md:p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${label} details` : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted/50 text-foreground">
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <Badge
            variant="outline"
            className={`h-7 gap-1.5 px-2.5 text-[11px] font-semibold border border-transparent ${
              trendPositive
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-red-500/10 text-red-600"
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

      <div className="mt-5 space-y-1.5">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          {label}
        </p>
        <h3 className="text-2xl md:text-[28px] font-display font-semibold text-foreground tabular-nums leading-tight">
          {value}
        </h3>
        <p className="text-xs text-muted-foreground">
          Compared to previous period
        </p>
      </div>

      <div className="mt-4 h-px w-full bg-border/50" />
    </div>
  ),
);

OverviewStatCard.displayName = "OverviewStatCard";
