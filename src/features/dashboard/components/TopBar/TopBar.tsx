import React from 'react';
import { Search, Bell, User, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="h-20 border-b border-border px-8 flex items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </button>
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects, clients, or invoices..." 
            className="w-full bg-secondary/50 border border-border rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-text-secondary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Nazrul Islam</p>
            <p className="text-xs text-text-secondary">Creative Director</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-tertiary p-[1px]">
            <div className="w-full h-full rounded-[11px] bg-secondary flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
