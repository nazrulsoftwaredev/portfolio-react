import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { Content } from "./pages/Content";
import { Clients } from "./pages/Clients";
import { Invoices } from "./pages/Invoices";
import { Analytics } from "./pages/Analytics";
import { Pipeline } from "./pages/Pipeline";
import { Messages } from "./pages/Messages";
import { Login } from "./pages/Login";

/**
 * Dashboard Feature Component
 * Main feature entry point for the dashboard application
 */
export const DashboardFeature: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  React.useEffect(() => {
    document.body.classList.add("dashboard-mode");

    return () => {
      document.body.classList.remove("dashboard-mode");
    };
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="dashboard-shell min-h-screen bg-background text-foreground">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="content" element={<Content />} />
          <Route path="clients" element={<Clients />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="." replace />} />
        </Route>
      </Routes>
    </div>
  );
};

// Backward compatibility export
export { DashboardFeature as DashboardApp };
