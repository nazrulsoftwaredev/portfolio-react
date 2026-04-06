import { memo, useCallback } from "react";
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

export const Sidebar = memo(function Sidebar({
  isOpen,
  onClose,
  className,
}: SidebarProps) {
  const handleNavClick = useCallback(() => {
    if (window.innerWidth < 768) onClose();
  }, [onClose]);

  return (
    <aside
      className={`relative h-full flex flex-col rounded-3xl border border-border
                 bg-card
                 shadow-sm overflow-hidden
                 transition-[width] duration-300 ease-out ${className ?? ""}`}
      style={{ width: isOpen ? 264 : 88 }}
    >
      {/* HEADER */}
      <div
        className={`p-4 flex items-center ${isOpen ? "" : "justify-center"}`}
      >
        <div
          className={`flex items-center ${isOpen ? "w-full" : "justify-center"}`}
        >
          {/* LOGO */}
          <div className="w-10 h-10 rounded-2xl overflow-hidden bg-muted border border-border">
            <img
              src="/logo.png"
              alt="Dashboard logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE */}
          {isOpen && (
            <div className="ml-3">
              <h1 className="text-sm font-semibold text-foreground">
                Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Control center</p>
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
                               bg-muted
                               border border-border"
                  />
                )}

                {/* HOVER BG */}
                <div className="absolute inset-0 rounded-2xl bg-transparent group-hover:bg-muted/60 transition-colors" />

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
                      className={`w-5 h-5 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  {!isOpen && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] font-semibold text-foreground opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}

                  {/* LABEL */}
                  {isOpen && (
                    <span className="ml-2 text-sm font-medium text-foreground transition-all duration-200 group-hover:text-foreground group-hover:translate-x-0.5">
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
        <div className="h-px bg-border mb-3" />

        <button
          type="button"
          className={`relative w-full flex items-center h-12 rounded-2xl
          ${isOpen ? "px-3" : "justify-center"}
          text-muted-foreground hover:text-foreground`}
        >
          <div className="absolute inset-0 rounded-2xl bg-transparent hover:bg-muted/60 transition" />

          <LogOut className="w-5 h-5 relative z-10" />

          {isOpen && <span className="ml-2 text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
