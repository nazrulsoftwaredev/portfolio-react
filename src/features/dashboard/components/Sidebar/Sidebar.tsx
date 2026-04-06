import { FC, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  Users,
  FileText,
  BarChart3,
  Kanban,
  MessageSquare,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Globe, label: "Content", path: "/dashboard/content" },
  { icon: Users, label: "Clients", path: "/dashboard/clients" },
  { icon: FileText, label: "Invoices", path: "/dashboard/invoices" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Kanban, label: "Pipeline", path: "/dashboard/pipeline" },
  { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, className }) => {
  const handleNavClick = useCallback(() => {
    if (window.innerWidth < 768) onClose();
  }, [onClose]);

  return (
    <aside
      className={`relative h-full flex flex-col rounded-3xl border border-white/10
                 bg-[#11141d]/90 backdrop-blur-xl
                 shadow-[0_16px_50px_rgba(0,0,0,0.45)] overflow-hidden
                 transition-[width] duration-300 ease-out ${className ?? ""}`}
      style={{ width: isOpen ? 280 : 96 }}
    >
      {/* LIGHT GLOW */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

      {/* HEADER */}
      <div
        className={`p-4 flex items-center ${isOpen ? "" : "justify-center"}`}
      >
        <div
          className={`flex items-center ${isOpen ? "w-full" : "justify-center"}`}
        >
          {/* LOGO */}
          <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white/10 border border-white/10">
            <img
              src="/logo.png"
              alt="Dashboard logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE */}
          {isOpen && (
            <div className="ml-3">
              <h1 className="text-sm font-semibold tracking-wide text-white">
                Dashboard
              </h1>
              <p className="text-xs text-white/50">Control center</p>
            </div>
          )}
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item, i) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={handleNavClick}
            className="block"
          >
            {({ isActive }) => (
              <div className="relative group">
                {/* ACTIVE BACKGROUND */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl
                               bg-gradient-to-r from-cyan-400/20 to-sky-300/10
                               border border-cyan-200/20"
                  />
                )}

                {/* HOVER BG */}
                <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/[0.06] transition-colors" />

                {/* CONTENT */}
                <div
                  className={`relative flex items-center h-12 rounded-2xl
                  ${isOpen ? "px-3" : "justify-center"}`}
                >
                  {/* ICON */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 transition-opacity duration-200 ${
                      isOpen ? "" : "group-hover:opacity-0"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-all ${
                        isActive
                          ? "text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]"
                          : "text-white/65"
                      }`}
                    />
                  </div>

                  {!isOpen && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-semibold text-cyan-100 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}

                  {/* LABEL */}
                  {isOpen && (
                    <span className="ml-2 text-sm font-medium text-white transition-all duration-200 group-hover:text-cyan-100 group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-3">
        <div className="h-px bg-white/10 mb-3" />

        <button
          type="button"
          className={`relative w-full flex items-center h-12 rounded-2xl
          ${isOpen ? "px-3" : "justify-center"}
          text-white/65 hover:text-rose-300`}
        >
          <div className="absolute inset-0 rounded-2xl bg-rose-400/0 hover:bg-rose-400/15 transition" />

          <LogOut className="w-5 h-5 relative z-10" />

          {isOpen && <span className="ml-2 text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
