import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  Command,
  LogOut,
  Settings,
  HelpCircle,
  Edit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const spring = {
  type: "spring",
  stiffness: 320,
  damping: 30,
};

const workspaceLabels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/content": "Content",
  "/dashboard/clients": "Clients",
  "/dashboard/invoices": "Invoices",
  "/dashboard/analytics": "Analytics",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/messages": "Messages",
};

const formatWorkspaceLabel = (pathname: string): string => {
  if (workspaceLabels[pathname]) {
    return workspaceLabels[pathname];
  }

  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) {
    return "Workspace";
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const workspaceName = formatWorkspaceLabel(pathname);

  return (
    <header
      className="sticky top-0 z-30 h-20 px-5 md:px-6 flex items-center justify-between gap-4
                 border-b border-white/10 bg-[#131824]/90 backdrop-blur-xl"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 w-full max-w-2xl">
        {/* SIDEBAR TOGGLE */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleSidebar}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </motion.button>

        <div className="hidden lg:flex items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
          {workspaceName}
        </div>

        {/* SEARCH */}
        <motion.div layout className="relative flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-white/40 group-focus-within:text-white" />
          </div>

          <input
            placeholder="Search..."
            className="w-full pl-11 pr-14 py-3 rounded-2xl
                       bg-white/5 border border-white/10
                       text-sm outline-none
                       focus:ring-2 focus:ring-cyan-300/30
                       transition-all"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/50">
            <Command className="w-3 h-3" /> K
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* NOTIFICATIONS */}
        <div className="relative">
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-300 rounded-full" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <>
                {/* OVERLAY */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowNotifications(false)}
                  className="fixed inset-0 z-40"
                />

                {/* DROPDOWN */}
                <motion.div
                  layoutId="dropdown"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={spring}
                  className="absolute right-0 mt-3 w-80 rounded-2xl
                             bg-[#121724]/95 backdrop-blur-xl
                             border border-white/10 shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10 text-sm font-semibold">
                    Notifications
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 hover:bg-white/5 transition cursor-pointer"
                      >
                        <p className="text-sm font-medium">New update #{i}</p>
                        <p className="text-xs text-white/50">
                          This is a notification message
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="w-11 h-11 rounded-2xl overflow-hidden cursor-pointer border border-white/10"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nazrul"
              alt="Profile avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <>
                {/* OVERLAY */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowProfile(false)}
                  className="fixed inset-0 z-40"
                />

                {/* MENU */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={spring}
                  className="absolute right-0 mt-3 w-60 rounded-2xl
                             bg-[#121724]/95 backdrop-blur-xl
                             border border-white/10 shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <p className="text-sm font-semibold">Nazrul Islam</p>
                    <p className="text-xs text-white/50">Creative Lead</p>
                  </div>

                  {[
                    { icon: Edit, label: "Edit Profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: HelpCircle, label: "Help" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        type="button"
                        key={i}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition"
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </motion.button>
                    );
                  })}

                  <div className="border-t border-white/10" />

                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
