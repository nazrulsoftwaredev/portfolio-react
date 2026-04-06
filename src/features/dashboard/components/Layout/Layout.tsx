import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { TopBar } from "../TopBar";

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-text-primary">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`flex min-h-screen flex-col min-w-0 ${
          isSidebarOpen ? "md:pl-64" : "md:pl-20"
        }`}
      >
        <TopBar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
