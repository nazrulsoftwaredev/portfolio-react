import { DollarSign, FileText, Users, Zap } from "lucide-react";
import { OverviewStatCard } from "./OverviewStatCard";

const statCards = [
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "$28,550",
    trend: "+18.5%",
    trendPositive: true,
  },
  {
    icon: Users,
    label: "Active Clients",
    value: "12",
    trend: "+3",
    trendPositive: true,
  },
  {
    icon: FileText,
    label: "Pending Invoices",
    value: "5",
    trend: "-2",
    trendPositive: false,
  },
  {
    icon: Zap,
    label: "Pipeline Value",
    value: "$142K",
    trend: "+25.2%",
    trendPositive: true,
  },
];

interface OverviewStatsGridProps {
  onStatClick?: (label: string) => void;
}

export const OverviewStatsGrid = ({ onStatClick }: OverviewStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-5 xl:gap-6">
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
