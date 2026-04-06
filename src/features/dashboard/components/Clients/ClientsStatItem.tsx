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
  <div className="premium-card">
    <div className="flex items-center justify-between">
      <div className="p-3 rounded-2xl bg-muted border border-border text-muted-foreground">
        <Icon className="w-5 h-5" />
      </div>
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider border ${
          trend.startsWith("+")
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            : trend === "0%"
              ? "bg-muted text-muted-foreground border-border"
              : "bg-red-500/10 text-red-500 border-red-500/20"
        }`}
      >
        {trend}
      </div>
    </div>
    <div className="mt-6">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
        {label}
      </p>
      <h3 className="text-3xl font-display font-semibold text-foreground mt-1 tracking-tight">
        {value}
      </h3>
    </div>
  </div>
);
