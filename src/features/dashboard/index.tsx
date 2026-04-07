import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";

const Overview = React.lazy(() =>
  import("./pages/Overview").then((mod) => ({ default: mod.Overview })),
);
const Clients = React.lazy(() =>
  import("./pages/Clients").then((mod) => ({ default: mod.Clients })),
);
const Invoices = React.lazy(() =>
  import("./pages/Invoices").then((mod) => ({ default: mod.Invoices })),
);
const Analytics = React.lazy(() =>
  import("./pages/Analytics").then((mod) => ({ default: mod.Analytics })),
);
const Pipeline = React.lazy(() =>
  import("./pages/Pipeline").then((mod) => ({ default: mod.Pipeline })),
);
const Messages = React.lazy(() =>
  import("./pages/Messages").then((mod) => ({ default: mod.Messages })),
);

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
      <React.Suspense
        fallback={
          <div className="p-8 text-sm text-muted-foreground">
            Loading dashboard...
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="clients" element={<Clients />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="messages" element={<Messages />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
};

// Backward compatibility export
export { DashboardFeature as DashboardApp };
