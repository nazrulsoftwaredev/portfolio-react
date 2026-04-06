import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  FileText, 
  BarChart3, 
  Kanban, 
  MessageSquare, 
  X,
  LogOut
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Globe, label: 'Content', path: '/dashboard/content' },
  { icon: Users, label: 'Clients', path: '/dashboard/clients' },
  { icon: FileText, label: 'Invoices', path: '/dashboard/invoices' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Kanban, label: 'Pipeline', path: '/dashboard/pipeline' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const handleNavClick = React.useCallback(() => {
    if (window.innerWidth < 768) {
      onClose();
    }
  }, [onClose]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 border-r border-border bg-secondary/30 flex flex-col overflow-hidden will-change-transform transition-[width,transform] duration-300 ease-out ${
        isOpen
          ? 'translate-x-0 w-64'
          : '-translate-x-full w-64 md:translate-x-0 md:w-20'
      }`}
    >
      <div className={`p-6 ${isOpen ? 'md:p-8' : 'md:px-4 md:py-6'}`}>
        <div className="flex items-center justify-between gap-3">
          <div className={`flex items-center gap-3 ${isOpen ? '' : 'md:justify-center md:w-full'}`}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-lg">C</span>
            </div>
            <h1
              className={`text-xl font-display font-bold tracking-tight whitespace-nowrap transition-all duration-200 ease-out ${
                isOpen
                  ? 'opacity-100 translate-x-0 md:max-w-[220px]'
                  : 'md:opacity-0 md:-translate-x-2 md:max-w-0'
              }`}
            >
              The Curator
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <nav className={`flex-1 space-y-1 overflow-y-auto ${isOpen ? 'px-4' : 'px-2 md:px-3'}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            onClick={handleNavClick}
            title={!isOpen ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-xl transition-all duration-200 group ${
                isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-2 py-3 md:px-3'
              } ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 text-inherit" />
            <span
              className={`font-medium whitespace-nowrap transition-all duration-200 ease-out ${
                isOpen
                  ? 'opacity-100 translate-x-0 md:max-w-[180px]'
                  : 'md:opacity-0 md:-translate-x-2 md:max-w-0 md:overflow-hidden'
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className={`mt-auto border-t border-border ${isOpen ? 'p-4' : 'p-2 md:p-3'}`}>
        <button
          className={`w-full rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 group ${
            isOpen ? 'flex items-center gap-3 px-4 py-3' : 'flex items-center justify-center px-2 py-3'
          }`}
          title={!isOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span
            className={`font-medium whitespace-nowrap transition-all duration-200 ease-out ${
              isOpen
                ? 'opacity-100 translate-x-0 md:max-w-[120px]'
                : 'md:opacity-0 md:-translate-x-2 md:max-w-0 md:overflow-hidden'
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};
