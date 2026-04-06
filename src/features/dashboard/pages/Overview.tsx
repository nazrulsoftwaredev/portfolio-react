import React from "react";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
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

const data = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const statIconTone = {
  primary: "bg-primary/10 text-primary",
  tertiary: "bg-tertiary/10 text-tertiary",
  emerald: "bg-emerald-400/10 text-emerald-400",
  purple: "bg-purple-400/10 text-purple-400",
};

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass rounded-3xl p-6 flex flex-col gap-4 group hover:border-primary/30 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div
        className={`p-3 rounded-2xl ${statIconTone[color] || statIconTone.primary}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
        <TrendingUp className="w-4 h-4" />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-text-secondary text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-display font-bold mt-1">{value}</h3>
    </div>
  </div>
);

export const Overview: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">
            Overview
          </h2>
          <p className="text-text-secondary mt-1">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <button className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          label="Total Views"
          value="12.4K"
          trend="+12%"
          color="primary"
        />
        <StatCard
          icon={Users}
          label="Active Clients"
          value="48"
          trend="+5%"
          color="tertiary"
        />
        <StatCard
          icon={Clock}
          label="Avg. Session"
          value="4m 32s"
          trend="+8%"
          color="emerald"
        />
        <StatCard
          icon={ArrowUpRight}
          label="Conversion Rate"
          value="3.2%"
          trend="+2%"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold">Site Performance</h3>
            <select className="bg-secondary/50 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#acc7ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#acc7ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a0a0a0", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a0a0a0", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#acc7ff"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold">Recent Updates</h3>
            <button className="text-primary text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                  <img
                    src={`https://picsum.photos/seed/project${i}/100/100`}
                    alt="Project"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Project Neon Genesis</p>
                  <p className="text-xs text-text-secondary">Updated 2h ago</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/5 text-text-secondary">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-display font-bold">Active Clients</h3>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background bg-secondary overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?u=${i}`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-accent flex items-center justify-center text-xs font-bold">
                +12
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-secondary text-sm border-b border-border">
                <th className="pb-4 font-medium">Client Name</th>
                <th className="pb-4 font-medium">Project Type</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Value</th>
                <th className="pb-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  name: "Acme Corp",
                  type: "Branding",
                  status: "In Progress",
                  value: "$12,500",
                },
                {
                  name: "Global Tech",
                  type: "Web Design",
                  status: "Completed",
                  value: "$8,200",
                },
                {
                  name: "Studio X",
                  type: "Motion Graphics",
                  status: "Review",
                  value: "$4,800",
                },
              ].map((client, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {client.name[0]}
                      </div>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-text-secondary">
                    {client.type}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        client.status === "Completed"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : client.status === "Review"
                            ? "bg-tertiary/10 text-tertiary"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 font-medium">{client.value}</td>
                  <td className="py-4 text-right">
                    <button className="text-text-secondary hover:text-text-primary transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
