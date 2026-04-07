import React from "react";

interface ClientsStatItemProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
}

export const ClientsStatItem: React.FC<ClientsStatItemProps> = ({
  label,
  value,
  trend,
  icon: Icon,
}) => (
  <div className="premium-card min-h-[176px] p-5 md:p-6">
    <div className="flex items-center justify-between gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted/50 text-foreground">
        <Icon className="w-5 h-5" />
      </div>
      <div
        className={`flex h-7 items-center gap-1.5 px-2.5 text-[11px] font-semibold rounded-full ${
          trend.startsWith("+")
            ? "bg-emerald-500/10 text-emerald-600"
            : trend === "0%"
              ? "bg-muted/60 text-muted-foreground"
              : "bg-red-500/10 text-red-600"
        }`}
      >
        {trend}
      </div>
    </div>

    <div className="mt-5 space-y-1.5">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
        {label}
      </p>
      <h3 className="text-2xl md:text-[28px] font-display font-semibold text-foreground tracking-tight leading-tight tabular-nums">
        {value}
      </h3>
    </div>

    <div className="mt-4 h-px w-full bg-border/50" />
  </div>
);
