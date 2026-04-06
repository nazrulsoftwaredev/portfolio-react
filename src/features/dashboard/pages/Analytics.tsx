import React from 'react';
import { motion } from 'framer-motion';
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
  Line,
  AreaChart,
  Area
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
  Calendar,
  Activity,
  Layers,
  Zap
} from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

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

const PopularRoute = ({ route, views, growth }: any) => (
  <motion.div 
    whileHover={{ x: 8 }}
    className="flex items-center justify-between p-5 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group cursor-pointer"
  >
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-text-secondary group-hover:text-accent-primary group-hover:rotate-3 transition-all duration-500">
        <Globe className="w-6 h-6" />
      </div>
      <div>
        <p className="font-black text-sm tracking-tight text-white uppercase">{route}</p>
        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mt-1">{views} UNIQUE NODES</p>
      </div>
    </div>
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider border ${
      growth.startsWith('+') 
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' 
        : 'bg-red-500/10 text-red-400 border-red-500/10'
    }`}>
      {growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {growth}
    </div>
  </motion.div>
);

export const Analytics: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-gradient leading-tight">
            DATA ANALYTICS <br />INFRASTRUCTURE
          </h2>
          <p className="text-on-surface-variant font-bold mt-2 text-sm uppercase tracking-[0.2em]">
            PERIOD: <span className="text-accent-primary">ACTIVE SPRINT</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PremiumButton variant="outline" icon={Calendar}>
            Last 30 Days
          </PremiumButton>
          <PremiumButton variant="primary" icon={Filter}>
            Filters
          </PremiumButton>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 premium-card space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-black tracking-tight text-white italic">TRAFFIC FLOW</h3>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-1">Cross-platform node activity</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(172,199,255,0.5)]"></div>
                <span className="text-[10px] text-white font-black uppercase tracking-widest">DESKTOP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-secondary shadow-[0_0_10px_rgba(255,221,121,0.5)]"></div>
                <span className="text-[10px] text-white font-black uppercase tracking-widest">MOBILE</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#acc7ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#acc7ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffdd79" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ffdd79" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ stroke: '#acc7ff', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    backgroundColor: '#111', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    padding: '12px'
                  }} 
                  itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                  labelStyle={{ color: '#888', marginBottom: '4px', fontWeight: 700, fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="desktop" 
                  stroke="#acc7ff" 
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorDesktop)"
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="mobile" 
                  stroke="#ffdd79" 
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorMobile)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="premium-card space-y-10 flex flex-col">
          <div>
            <h3 className="text-xl font-display font-black tracking-tight text-white italic">DEVICE RATIO</h3>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-1">Platform segmentation</p>
          </div>
          
          <div className="h-[280px] w-full relative flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-4xl font-display font-black text-white italic">100%</p>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em]">TOTAL NODES</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-6 border-t border-white/5">
            {deviceData.map((device) => (
              <div key={device.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: device.color }}></div>
                  <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-accent-primary transition-colors">{device.name}</span>
                </div>
                <span className="text-sm font-display font-black text-white tabular-nums italic">{device.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="premium-card space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-black tracking-tight text-white italic">POPULAR ROUTES</h3>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-1">High-traffic access points</p>
            </div>
            <PremiumButton variant="outline" size="sm" icon={Activity}>
              VIEW FULL LOG
            </PremiumButton>
          </div>
          <div className="space-y-3">
            <PopularRoute route="/work/neon-genesis" views="4,230" growth="+12.4%" />
            <PopularRoute route="/about" views="2,840" growth="+5.2%" />
            <PopularRoute route="/work/aether-flow" views="1,920" growth="-2.1%" />
            <PopularRoute route="/contact" views="1,240" growth="+1.8%" />
            <PopularRoute route="/blog/design-systems" views="980" growth="+15.4%" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="premium-card space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-black tracking-tight text-white italic">AUDIENCE GROWTH</h3>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-1">Expansion metrics</p>
            </div>
            <PremiumButton variant="outline" size="sm" icon={Layers}>
              EXPORT DATA
            </PremiumButton>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: '#111', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                  }} 
                />
                <Bar dataKey="desktop" fill="#acc7ff" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="mobile" fill="#ffdd79" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
