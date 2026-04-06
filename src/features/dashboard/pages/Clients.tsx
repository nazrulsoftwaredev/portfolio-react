import React from 'react';
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
  Plus
} from 'lucide-react';

const clients = [
  { name: 'Acme Corp', industry: 'Technology', status: 'Active', value: '$45,000', growth: '+12%', avatar: 'https://i.pravatar.cc/100?u=acme' },
  { name: 'Global Tech', industry: 'Finance', status: 'On Hold', value: '$12,200', growth: '-5%', avatar: 'https://i.pravatar.cc/100?u=global' },
  { name: 'Studio X', industry: 'Design', status: 'Active', value: '$8,800', growth: '+8%', avatar: 'https://i.pravatar.cc/100?u=studio' },
  { name: 'Future Labs', industry: 'R&D', status: 'Active', value: '$62,000', growth: '+25%', avatar: 'https://i.pravatar.cc/100?u=future' },
  { name: 'Eco World', industry: 'Environment', status: 'Inactive', value: '$2,500', growth: '0%', avatar: 'https://i.pravatar.cc/100?u=eco' },
];

export const Clients: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Client Manager</h2>
          <p className="text-text-secondary mt-1">Manage your client relationships and project history.</p>
        </div>
        <button className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass rounded-3xl p-6 space-y-2">
          <p className="text-text-secondary text-sm font-medium">Total Clients</p>
          <h3 className="text-3xl font-display font-bold">124</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +8% from last month
          </div>
        </div>
        <div className="glass rounded-3xl p-6 space-y-2">
          <p className="text-text-secondary text-sm font-medium">Active Projects</p>
          <h3 className="text-3xl font-display font-bold">48</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +12% from last month
          </div>
        </div>
        <div className="glass rounded-3xl p-6 space-y-2">
          <p className="text-text-secondary text-sm font-medium">Retention Rate</p>
          <h3 className="text-3xl font-display font-bold">94%</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +2% from last month
          </div>
        </div>
        <div className="glass rounded-3xl p-6 space-y-2">
          <p className="text-text-secondary text-sm font-medium">Avg. LTV</p>
          <h3 className="text-3xl font-display font-bold">$12.4K</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +5% from last month
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search clients by name, industry, or status..." 
              className="w-full bg-secondary/50 border border-border rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none glass px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex-1 sm:flex-none glass px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-secondary text-sm border-b border-border bg-white/[0.02]">
                <th className="px-8 py-4 font-medium">Client</th>
                <th className="px-8 py-4 font-medium">Industry</th>
                <th className="px-8 py-4 font-medium">Status</th>
                <th className="px-8 py-4 font-medium">Total Value</th>
                <th className="px-8 py-4 font-medium">Growth</th>
                <th className="px-8 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                        <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-lg">{client.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Mail className="w-3 h-3 text-text-secondary hover:text-primary" />
                          <Phone className="w-3 h-3 text-text-secondary hover:text-primary" />
                          <Globe className="w-3 h-3 text-text-secondary hover:text-primary" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-text-secondary">{client.industry}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      client.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400' : 
                      client.status === 'On Hold' ? 'bg-tertiary/10 text-tertiary' : 'bg-red-400/10 text-red-400'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-display font-bold text-lg">{client.value}</td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-1 text-sm font-bold ${
                      client.growth.startsWith('+') ? 'text-emerald-400' : 
                      client.growth === '0%' ? 'text-text-secondary' : 'text-red-400'
                    }`}>
                      {client.growth.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : 
                       client.growth === '0%' ? null : <TrendingDown className="w-4 h-4" />}
                      {client.growth}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 rounded-xl hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all">
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
