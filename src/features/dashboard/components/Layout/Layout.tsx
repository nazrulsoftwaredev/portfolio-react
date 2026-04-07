import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { TopBar } from "../TopBar";
import { DashboardSearchProvider } from "./DashboardSearchContext";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  onSignOut: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onSignOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (isDesktop) {
      setIsMobileSidebarOpen(false);
    }
  }, [isDesktop]);

  const toggleSidebar = React.useCallback(() => {
    if (!isDesktop) {
      setIsMobileSidebarOpen((prev) => !prev);
      return;
    }

    setIsSidebarOpen((prev) => !prev);
  }, [isDesktop]);

  const closeSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  const effectiveSidebarOpen = isDesktop ? isSidebarOpen : isMobileSidebarOpen;

  return (
    <DashboardSearchProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <div className="relative z-10 min-h-screen flex">
          <div className="hidden md:block h-screen sticky top-0 shrink-0">
            <div className="h-full p-4 md:p-6 md:pr-0">
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                onSignOut={onSignOut}
                className="h-full"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 p-4 md:p-6 min-h-screen">
            <div className="min-w-0 h-full rounded-2xl bg-card shadow-sm overflow-hidden flex flex-col">
              <TopBar
                onToggleSidebar={toggleSidebar}
                isSidebarOpen={effectiveSidebarOpen}
                onSignOut={onSignOut}
              />

              <motion.main
                layout
                className="flex-1 min-h-0 overflow-y-auto p-5 md:p-7"
              >
                <div className="mx-auto w-full max-w-[1400px]">
                  <Outlet />
                </div>
              </motion.main>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="fixed inset-0 z-40 bg-foreground/40 md:hidden"
              />

              <motion.div
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="fixed left-4 top-4 bottom-4 z-50 md:hidden"
              >
                <Sidebar
                  isOpen
                  onClose={closeSidebar}
                  onSignOut={onSignOut}
                  className="h-full"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardSearchProvider>
  );
};
