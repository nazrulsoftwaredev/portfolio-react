import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Globe, 
  ArrowUpRight, 
  TrendingDown,
  Plus,
  Download,
  ShieldCheck,
  Briefcase,
  Target
} from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

const clients = [
  { name: 'Acme Corp', industry: 'Technology', status: 'Active', value: '$45,000', growth: '+12%', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=acme' },
  { name: 'Global Tech', industry: 'Finance', status: 'On Hold', value: '$12,200', growth: '-5%', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=global' },
  { name: 'Studio X', industry: 'Design', status: 'Active', value: '$8,800', growth: '+8%', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=studio' },
  { name: 'Future Labs', industry: 'R&D', status: 'Active', value: '$62,000', growth: '+25%', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=future' },
  { name: 'Eco World', industry: 'Environment', status: 'Inactive', value: '$2,500', growth: '0%', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=eco' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

const StatItem = ({ label, value, trend, icon: Icon }: any) => (
  <motion.div variants={itemVariants} className="premium-card group relative overflow-hidden">
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-accent-primary/5 rounded-full blur-2xl group-hover:bg-accent-primary/10 transition-colors" />
    <div className="flex items-center justify-between relative z-10">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-on-surface-variant group-hover:text-white transition-colors group-hover:scale-110 duration-500">
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider border ${
        trend.startsWith('+') 
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' 
          : trend === '0%' 
            ? 'bg-white/5 text-on-surface-variant border-white/5'
            : 'bg-red-500/10 text-red-400 border-red-500/10'
      }`}>
        {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : (trend === '0%' ? null : <TrendingDown className="w-3 h-3" />)}
        {trend}
      </div>
    </div>
    <div className="mt-6 relative z-10">
      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">{label}</p>
      <h3 className="text-3xl font-display font-black text-white mt-1 italic italic tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export const Clients: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-gradient leading-tight uppercase">
            CLIENT RELATIONS <br />MANAGEMENT
          </h2>
          <p className="text-on-surface-variant font-bold mt-2 text-sm uppercase tracking-[0.2em]">
            DATABASE STATUS: <span className="text-emerald-400">SYNCHRONIZED</span>
          </p>
        </div>
        <PremiumButton variant="primary" icon={Plus}>
          INITIATE CLIENT
        </PremiumButton>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem icon={Users} label="TOTAL NODES" value="1,284" trend="+12.4%" />
        <StatItem icon={Briefcase} label="ACTIVE SPRINT" value="48" trend="+5.2%" />
        <StatItem icon={ShieldCheck} label="TRUST INDEX" value="98.2%" trend="+2.1%" />
        <StatItem icon={Target} label="AVG. LTV" value="$14.8K" trend="+8.4%" />
      </div>

      <motion.div variants={itemVariants} className="premium-card !p-0 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8 bg-white/[0.01]">
          <div className="relative w-full xl:w-2/5 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-accent-primary transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH CLIENT DATABASE..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[11px] font-black tracking-widest text-white focus:outline-none focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 transition-all uppercase placeholder:text-on-surface-variant/40"
            />
          </div>
          <div className="flex items-center gap-4 w-full xl:w-auto">
            <PremiumButton variant="outline" icon={Filter} className="flex-1 xl:flex-none">
              FILTERS
            </PremiumButton>
            <PremiumButton variant="outline" icon={Download} className="flex-1 xl:flex-none">
              EXPORT DATA
            </PremiumButton>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-5 font-black">Identity</th>
                <th className="px-10 py-5 font-black">Segment</th>
                <th className="px-10 py-5 font-black">Protocol</th>
                <th className="px-10 py-5 font-black">Net Value</th>
                <th className="px-10 py-5 font-black">Momentum</th>
                <th className="px-10 py-5 font-black text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map((client, i) => (
                <tr key={i} className="group hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-surface border border-white/5 group-hover:border-accent-primary/50 transition-all duration-500 overflow-hidden relative shrink-0">
                        <img src={client.avatar} alt={client.name} className="w-full h-full object-cover p-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      </div>
                      <div>
                        <p className="font-display font-black text-xl text-white italic tracking-tight uppercase">{client.name}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="p-1.5 rounded-lg bg-white/5 text-on-surface-variant hover:text-accent-primary hover:bg-accent-primary/10 transition-all">
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg bg-white/5 text-on-surface-variant hover:text-accent-primary hover:bg-accent-primary/10 transition-all">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg bg-white/5 text-on-surface-variant hover:text-emerald-400 hover:bg-emerald-400/10 transition-all">
                            <Globe className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em]">{client.industry}</td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                      client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
                      client.status === 'On Hold' ? 'bg-amber-500/10 text-amber-400 border-amber-500/10' : 'bg-red-500/10 text-red-400 border-red-500/10'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 font-display font-black text-2xl text-white italic tracking-tighter tabular-nums">{client.value}</td>
                  <td className="px-10 py-8">
                    <div className={`flex items-center gap-2 text-xs font-black tracking-widest ${
                      client.growth.startsWith('+') ? 'text-emerald-400' : 
                      client.growth === '0%' ? 'text-on-surface-variant' : 'text-red-400'
                    }`}>
                      {client.growth.startsWith('+') ? <ArrowUpRight className="w-5 h-5 shadow-sm" /> : 
                       client.growth === '0%' ? null : <TrendingDown className="w-5 h-5 shadow-sm" />}
                      {client.growth}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all group">
                      <MoreHorizontal className="w-6 h-6" />
                    </button>
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
