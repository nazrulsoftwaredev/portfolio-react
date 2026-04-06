import React from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  GripVertical,
  Calendar,
  DollarSign
} from 'lucide-react';

const pipelineData = [
  {
    title: 'Leads',
    count: 3,
    items: [
      { id: 1, client: 'Nike', project: 'Global Campaign', value: '$25K', date: 'Mar 24', priority: 'High' },
      { id: 2, client: 'Apple', project: 'Vision Pro UI', value: '$42K', date: 'Mar 26', priority: 'Medium' },
      { id: 3, client: 'Tesla', project: 'Dashboard Redesign', value: '$18K', date: 'Mar 28', priority: 'Low' },
    ]
  },
  {
    title: 'Proposal',
    count: 2,
    items: [
      { id: 4, client: 'Spotify', project: 'Artist Portal', value: '$12K', date: 'Mar 22', priority: 'High' },
      { id: 5, client: 'Airbnb', project: 'Experience Design', value: '$35K', date: 'Mar 25', priority: 'Medium' },
    ]
  },
  {
    title: 'Active',
    count: 2,
    items: [
      { id: 6, client: 'Netflix', project: 'TUDUM 2024', value: '$85K', date: 'Apr 12', priority: 'High' },
      { id: 7, client: 'Google', project: 'Gemini Branding', value: '$120K', date: 'May 05', priority: 'High' },
    ]
  },
  {
    title: 'Completed',
    count: 5,
    items: [
      { id: 8, client: 'Meta', project: 'Quest 3 Launch', value: '$45K', date: 'Feb 15', priority: 'Medium' },
    ]
  }
];

const PipelineCard = ({ client, project, value, date, priority }: any) => (
  <div className="glass rounded-2xl p-5 space-y-4 group cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
        priority === 'High' ? 'bg-red-400/10 text-red-400' : 
        priority === 'Medium' ? 'bg-tertiary/10 text-tertiary' : 'bg-primary/10 text-primary'
      }`}>
        {priority}
      </div>
      <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    
    <div>
      <h4 className="font-display font-bold text-lg">{client}</h4>
      <p className="text-sm text-text-secondary">{project}</p>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-border">
      <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
        <Calendar className="w-3.5 h-3.5" />
        {date}
      </div>
      <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
        <DollarSign className="w-3.5 h-3.5" />
        {value}
      </div>
    </div>
  </div>
);

export const Pipeline: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-8 animate-in slide-in-from-left-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Client Pipeline</h2>
          <p className="text-text-secondary mt-1">Track your leads and active projects through the workflow.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
            <button className="px-4 py-1.5 rounded-lg bg-primary text-background text-xs font-bold">Board</button>
            <button className="px-4 py-1.5 rounded-lg text-text-secondary text-xs font-bold hover:text-text-primary">List</button>
          </div>
          <button className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" />
            Add Lead
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-8 min-h-[600px]">
        {pipelineData.map((column) => (
          <div key={column.title} className="flex-shrink-0 w-80 flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-bold text-lg">{column.title}</h3>
                <span className="px-2 py-0.5 rounded-lg bg-secondary text-text-secondary text-xs font-bold">{column.count}</span>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 p-2 rounded-3xl bg-white/[0.02] border border-dashed border-border/50">
              {column.items.map((item) => (
                <PipelineCard key={item.id} {...item} />
              ))}
              <button className="w-full py-4 rounded-2xl border border-dashed border-border text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
