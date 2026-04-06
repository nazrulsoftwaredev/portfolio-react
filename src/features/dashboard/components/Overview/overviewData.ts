import type React from "react";
import { FileText, MessageCircle, Users } from "lucide-react";

export type RevenuePoint = {
  label: string;
  revenue: number;
  invoices: number;
};

export type ActivityType = "invoice" | "client" | "message";

export interface ActivityItem {
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

export type RevenueRange =
  | "THIS_WEEK"
  | "LAST_WEEK"
  | "THIS_MONTH"
  | "MONTHLY_ARCHIVE";

export const rangeOptions: Array<{ value: RevenueRange; label: string }> = [
  { value: "THIS_WEEK", label: "This week" },
  { value: "LAST_WEEK", label: "Last week" },
  { value: "THIS_MONTH", label: "This month" },
  { value: "MONTHLY_ARCHIVE", label: "Monthly archive" },
];

export const revenueSeriesByRange: Record<RevenueRange, RevenuePoint[]> = {
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

export const recentActivities: ActivityItem[] = [
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

export type ClientPortfolioItem = {
  name: string;
  type: string;
  status: string;
  value: string;
  growth: string;
};

export const clientPortfolio: ClientPortfolioItem[] = [
  {
    name: "Acme Corp",
    type: "Technology",
    status: "Active",
    value: "$45,000",
    growth: "+12%",
  },
  {
    name: "Global Tech",
    type: "Finance",
    status: "Active",
    value: "$12,200",
    growth: "+5%",
  },
  {
    name: "Studio X",
    type: "Design",
    status: "Active",
    value: "$8,800",
    growth: "+8%",
  },
  {
    name: "Future Labs",
    type: "R&D",
    status: "Active",
    value: "$62,000",
    growth: "+25%",
  },
];
