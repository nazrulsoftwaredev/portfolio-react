import { DollarSign, FileText, Users, Zap } from "lucide-react";
import { OverviewStatCard } from "./OverviewStatCard";

const statCards = [
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "$28,550",
    trend: "+18.5%",
    trendPositive: true,
    bgGradient: "bg-emerald-500/20",
  },
  {
    icon: Users,
    label: "Active Clients",
    value: "12",
    trend: "+3",
    trendPositive: true,
    bgGradient: "bg-blue-500/20",
  },
  {
    icon: FileText,
    label: "Pending Invoices",
    value: "5",
    trend: "-2",
    trendPositive: false,
    bgGradient: "bg-amber-500/20",
  },
  {
    icon: Zap,
    label: "Pipeline Value",
    value: "$142K",
    trend: "+25.2%",
    trendPositive: true,
    bgGradient: "bg-purple-500/20",
  },
];

interface OverviewStatsGridProps {
  onStatClick?: (label: string) => void;
}

export const OverviewStatsGrid = ({ onStatClick }: OverviewStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card) => (
        <OverviewStatCard
          key={card.label}
          {...card}
          onClick={onStatClick ? () => onStatClick(card.label) : undefined}
        />
      ))}
    </div>
  );
};
