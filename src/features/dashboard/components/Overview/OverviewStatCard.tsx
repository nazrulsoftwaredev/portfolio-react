import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui";

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  bgGradient: string;
  onClick?: () => void;
}

export const OverviewStatCard = React.memo(
  ({
    icon: Icon,
    label,
    value,
    trend,
    trendPositive = true,
    bgGradient,
    onClick,
  }: StatCardProps) => (
    <div
      className={`premium-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
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
      <div
        className={`absolute -right-3 -top-3 h-16 w-16 rounded-full opacity-15 ${bgGradient}`}
      />
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-2xl bg-muted/70 border border-border/70 text-foreground">
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

      <div className="mt-5">
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        <h3 className="text-2xl font-display font-semibold mt-2 text-foreground tabular-nums">
          {value}
        </h3>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-1 bg-muted/60 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-gradient-to-r from-primary/70 via-secondary/60 to-primary/40" />
        </div>
      </div>
    </div>
  ),
);

OverviewStatCard.displayName = "OverviewStatCard";
