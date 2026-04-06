import React from "react";
import { AlertCircle, CheckCircle2, Clock, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui";

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  overdue: "bg-red-500/10 text-red-400 border-red-500/20",
  draft: "bg-white/10 text-on-surface-variant border-white/10",
  inactive: "bg-white/10 text-on-surface-variant border-white/10",
};

const statusIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  paid: CheckCircle2,
  active: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
  draft: CircleDashed,
  inactive: CircleDashed,
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const statusKey = status.trim().toLowerCase();
  const tone =
    statusStyles[statusKey] ?? "bg-white/10 text-white border-white/10";
  const Icon = statusIcons[statusKey] ?? CircleDashed;

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${tone} ${className}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
};
