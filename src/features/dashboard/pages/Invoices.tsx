import React from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

const invoices = [
  { id: 'INV-2024-001', client: 'Acme Corp', amount: '$4,500.00', date: 'Mar 12, 2024', status: 'Paid', dueDate: 'Mar 26, 2024' },
  { id: 'INV-2024-002', client: 'Global Tech', amount: '$12,200.00', date: 'Mar 15, 2024', status: 'Pending', dueDate: 'Mar 29, 2024' },
  { id: 'INV-2024-003', client: 'Studio X', amount: '$2,800.00', date: 'Mar 18, 2024', status: 'Overdue', dueDate: 'Apr 01, 2024' },
  { id: 'INV-2024-004', client: 'Future Labs', amount: '$8,000.00', date: 'Mar 20, 2024', status: 'Draft', dueDate: 'Apr 03, 2024' },
  { id: 'INV-2024-005', client: 'Eco World', amount: '$1,500.00', date: 'Mar 22, 2024', status: 'Paid', dueDate: 'Apr 05, 2024' },
];

export const Invoices: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Invoices</h2>
          <p className="text-text-secondary mt-1">Create and manage professional invoices for your clients.</p>
        </div>
        <button className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search invoices..." 
                  className="w-full bg-secondary/50 border border-border rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="glass px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-text-secondary text-sm border-b border-border bg-white/[0.02]">
                    <th className="px-8 py-4 font-medium">Invoice ID</th>
                    <th className="px-8 py-4 font-medium">Client</th>
                    <th className="px-8 py-4 font-medium">Amount</th>
                    <th className="px-8 py-4 font-medium">Status</th>
                    <th className="px-8 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map((invoice, i) => (
                    <tr key={i} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-medium">{invoice.id}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium">{invoice.client}</td>
                      <td className="px-8 py-6 font-display font-bold text-lg">{invoice.amount}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${
                          invoice.status === 'Paid' ? 'bg-emerald-400/10 text-emerald-400' : 
                          invoice.status === 'Pending' ? 'bg-tertiary/10 text-tertiary' : 
                          invoice.status === 'Overdue' ? 'bg-red-400/10 text-red-400' : 'bg-white/10 text-text-secondary'
                        }`}>
                          {invoice.status === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                          {invoice.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {invoice.status === 'Overdue' && <AlertCircle className="w-3 h-3" />}
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-xl hover:bg-white/10 text-text-secondary hover:text-primary transition-all">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-white/10 text-text-secondary hover:text-primary transition-all">
                            <Send className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-white/10 text-text-secondary hover:text-primary transition-all">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="glass rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-display font-bold">Financial Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-400/5 border border-emerald-400/10">
                <div>
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Total Collected</p>
                  <h4 className="text-2xl font-display font-bold mt-1">$124,500.00</h4>
                </div>
                <div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-tertiary/5 border border-tertiary/10">
                <div>
                  <p className="text-xs text-tertiary font-bold uppercase tracking-wider">Outstanding</p>
                  <h4 className="text-2xl font-display font-bold mt-1">$18,200.00</h4>
                </div>
                <div className="p-3 rounded-xl bg-tertiary/10 text-tertiary">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-red-400/5 border border-red-400/10">
                <div>
                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Overdue</p>
                  <h4 className="text-2xl font-display font-bold mt-1">$4,800.00</h4>
                </div>
                <div className="p-3 rounded-xl bg-red-400/10 text-red-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-display font-bold">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Invoice <span className="text-primary">#INV-2024-005</span> was paid by Eco World</p>
                    <p className="text-xs text-text-secondary mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
