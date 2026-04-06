import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  FileText,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Eye,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PremiumButton } from "../components/PremiumButton";

type RevenuePoint = {
  label: string;
  revenue: number;
  invoices: number;
};

type RevenueRange =
  | "THIS_WEEK"
  | "LAST_WEEK"
  | "THIS_MONTH"
  | "MONTHLY_ARCHIVE";

const rangeOptions: Array<{ value: RevenueRange; label: string }> = [
  { value: "THIS_WEEK", label: "THIS WEEK" },
  { value: "LAST_WEEK", label: "LAST WEEK" },
  { value: "THIS_MONTH", label: "THIS MONTH" },
  { value: "MONTHLY_ARCHIVE", label: "MONTHLY ARCHIVE" },
];

const revenueSeriesByRange: Record<RevenueRange, RevenuePoint[]> = {
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  bgGradient: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendPositive = true,
  bgGradient,
}: StatCardProps) => (
  <motion.div
    variants={itemVariants}
    className="premium-card group relative overflow-hidden"
  >
    {/* Background Aura */}
    <div
      className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${bgGradient}`}
    />

    <div className="flex items-center justify-between relative z-10">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider border ${
            trendPositive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
              : "bg-red-500/10 text-red-400 border-red-500/10"
          }`}
        >
          {trendPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {trend}
        </div>
      )}
    </div>

    <div className="mt-6 relative z-10">
      <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">
        {label}
      </p>
      <h3 className="text-3xl font-display font-black mt-2 text-white tabular-nums">
        {value}
      </h3>
    </div>

    <div className="mt-4 flex items-center gap-2 relative z-10">
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
        />
      </div>
    </div>
  </motion.div>
);

export const Overview: React.FC = () => {
  const [selectedRange, setSelectedRange] =
    React.useState<RevenueRange>("THIS_WEEK");

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

  const formatCurrency = React.useCallback((value: number) => {
    return `$${value.toLocaleString()}`;
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-gradient leading-tight">
            BUSINESS <br />
            COMMAND CENTER
          </h2>
          <p className="text-on-surface-variant font-bold mt-2 text-sm uppercase tracking-[0.2em]">
            STATUS: <span className="text-emerald-400">OPERATIONS ACTIVE</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PremiumButton variant="outline" icon={Plus}>
            New Invoice
          </PremiumButton>
          <PremiumButton variant="primary" icon={Plus}>
            New Project
          </PremiumButton>
        </div>
      </motion.div>

      {/* Key Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Monthly Revenue"
          value="$28,550"
          trend="+18.5%"
          trendPositive={true}
          bgGradient="bg-emerald-500/20"
        />
        <StatCard
          icon={Users}
          label="Active Clients"
          value="12"
          trend="+3"
          trendPositive={true}
          bgGradient="bg-blue-500/20"
        />
        <StatCard
          icon={FileText}
          label="Pending Invoices"
          value="5"
          trend="-2"
          trendPositive={false}
          bgGradient="bg-amber-500/20"
        />
        <StatCard
          icon={Zap}
          label="Pipeline Value"
          value="$142K"
          trend="+25.2%"
          trendPositive={true}
          bgGradient="bg-purple-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 premium-card space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-black tracking-tight text-white italic">
                REVENUE INSIGHTS
              </h3>
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">
                Revenue and invoice trends by selected period
              </p>
            </div>
            <select
              value={selectedRange}
              onChange={(event) =>
                setSelectedRange(event.target.value as RevenueRange)
              }
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
            >
              {rangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                Period Revenue
              </p>
              <p className="mt-2 text-xl font-display font-black text-white tabular-nums">
                {formatCurrency(chartSummary.totalRevenue)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                Total Invoices
              </p>
              <p className="mt-2 text-xl font-display font-black text-white tabular-nums">
                {chartSummary.totalInvoices}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                Avg Ticket
              </p>
              <p className="mt-2 text-xl font-display font-black text-white tabular-nums">
                {formatCurrency(Math.round(chartSummary.averageTicket))}
              </p>
            </div>
          </div>

          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#acc7ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#acc7ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="10 10"
                  vertical={false}
                  stroke="rgba(255,255,255,0.03)"
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
                  formatter={(value: number, name: string) => {
                    if (name === "revenue") {
                      return [formatCurrency(value), "Revenue"];
                    }

                    return [value, "Invoices"];
                  }}
                  labelFormatter={(label: string) => `Period: ${label}`}
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    padding: "12px",
                  }}
                  itemStyle={{
                    color: "#acc7ff",
                    fontWeight: 800,
                    fontSize: "14px",
                  }}
                  labelStyle={{
                    color: "#888",
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
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="premium-card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-black tracking-tight text-white italic">
              RECENT ACTIVITY
            </h3>
            <button className="text-accent-primary text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-1 group">
              VIEW ALL{" "}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-5">
            {[
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
            ].map((activity, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-all"
              >
                <div
                  className={`p-3 rounded-xl ${activity.color} transition-colors`}
                >
                  <activity.icon className={`w-5 h-5 ${activity.textColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm text-white tracking-tight">
                    {activity.label}
                  </p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                    {activity.client || activity.industry || activity.preview}
                  </p>
                </div>
                <p className="text-sm font-bold text-emerald-400">
                  {activity.amount}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="premium-card !p-0 overflow-hidden"
      >
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <h3 className="text-xl font-display font-black tracking-tight text-white italic">
            CLIENT PORTFOLIO
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, zIndex: 10 }}
                  className="w-10 h-10 rounded-2xl border-4 border-surface bg-surface overflow-hidden cursor-pointer"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                    alt="Client"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-accent-primary">
              +6
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] bg-white/[0.02]">
                <th className="px-8 py-4">Client Name</th>
                <th className="px-8 py-4">Industry</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Client Value</th>
                <th className="px-8 py-4 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  name: "Acme Corp",
                  type: "Technology",
                  status: "ACTIVE",
                  value: "$45,000",
                  growth: "+12%",
                },
                {
                  name: "Global Tech",
                  type: "Finance",
                  status: "ACTIVE",
                  value: "$12,200",
                  growth: "+5%",
                },
                {
                  name: "Studio X",
                  type: "Design",
                  status: "ACTIVE",
                  value: "$8,800",
                  growth: "+8%",
                },
                {
                  name: "Future Labs",
                  type: "R&D",
                  status: "ACTIVE",
                  value: "$62,000",
                  growth: "+25%",
                },
              ].map((client, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-black text-xs border border-accent-primary/20 group-hover:rotate-6 transition-transform">
                        {client.name[0]}
                      </div>
                      <span className="font-black text-sm tracking-tight text-white">
                        {client.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    {client.type}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border bg-emerald-500/10 text-emerald-400 border-emerald-500/10">
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-display font-bold text-sm text-white tabular-nums">
                    {client.value}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-emerald-400 font-bold text-sm">
                      {client.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};
