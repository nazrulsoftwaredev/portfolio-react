import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Calendar
} from 'lucide-react';

const trafficData = [
  { name: 'Mon', desktop: 4000, mobile: 2400, tablet: 1200 },
  { name: 'Tue', desktop: 3000, mobile: 1398, tablet: 900 },
  { name: 'Wed', desktop: 2000, mobile: 9800, tablet: 1500 },
  { name: 'Thu', desktop: 2780, mobile: 3908, tablet: 1100 },
  { name: 'Fri', desktop: 1890, mobile: 4800, tablet: 1300 },
  { name: 'Sat', desktop: 2390, mobile: 3800, tablet: 1400 },
  { name: 'Sun', desktop: 3490, mobile: 4300, tablet: 1600 },
];

const deviceData = [
  { name: 'Desktop', value: 45, color: '#acc7ff' },
  { name: 'Mobile', value: 35, color: '#ffdd79' },
  { name: 'Tablet', value: 20, color: '#2a2a2a' },
];

const PopularRoute = ({ route, views, growth }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
        <Globe className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium text-sm">{route}</p>
        <p className="text-xs text-text-secondary">{views} unique visitors</p>
      </div>
    </div>
    <div className={`flex items-center gap-1 text-xs font-bold ${growth.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
      {growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {growth}
    </div>
  </div>
);

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Analytics</h2>
          <p className="text-text-secondary mt-1">Deep dive into your site performance and audience.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="glass px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold">Traffic Trends</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs text-text-secondary font-medium">Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <span className="text-xs text-text-secondary font-medium">Mobile</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a0a0a0', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a0a0a0', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="desktop" 
                  stroke="#acc7ff" 
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mobile" 
                  stroke="#ffdd79" 
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 space-y-8">
          <h3 className="text-xl font-display font-bold">Device Distribution</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-display font-bold">100%</p>
              <p className="text-xs text-text-secondary font-medium">Total Traffic</p>
            </div>
          </div>
          <div className="space-y-4">
            {deviceData.map((device) => (
              <div key={device.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }}></div>
                  <span className="text-sm font-medium">{device.name}</span>
                </div>
                <span className="text-sm font-bold">{device.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-display font-bold">Popular Routes</h3>
          <div className="space-y-2">
            <PopularRoute route="/work/neon-genesis" views="4,230" growth="+12.4%" />
            <PopularRoute route="/about" views="2,840" growth="+5.2%" />
            <PopularRoute route="/work/aether-flow" views="1,920" growth="-2.1%" />
            <PopularRoute route="/contact" views="1,240" growth="+1.8%" />
            <PopularRoute route="/blog/design-systems" views="980" growth="+15.4%" />
          </div>
        </div>

        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-display font-bold">Audience Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a0a0a0', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a0a0a0', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="desktop" fill="#acc7ff" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="mobile" fill="#ffdd79" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
