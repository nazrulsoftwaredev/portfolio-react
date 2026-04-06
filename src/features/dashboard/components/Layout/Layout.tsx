import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { TopBar } from "../TopBar";
import { motion, AnimatePresence } from "framer-motion";

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen((prev) => !prev);
      return;
    }

    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative z-10 p-4 md:p-6">
        <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] flex gap-4">
          <div className="hidden md:block">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          </div>

          <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
            <TopBar
              onToggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />

            <motion.main layout className="flex-1 overflow-y-auto p-5 md:p-7">
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
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed left-4 top-4 bottom-4 z-50 md:hidden"
            >
              <Sidebar isOpen onClose={closeSidebar} className="h-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
