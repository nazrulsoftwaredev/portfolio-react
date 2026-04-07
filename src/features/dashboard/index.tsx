import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Skeleton } from "@/shared/components";
import { Error404 } from "@/shared/pages/errors";
import { useDashboardAuth } from "./api";

const Overview = React.lazy(() =>
  import("./pages/Overview").then((mod) => ({ default: mod.Overview })),
);
const Clients = React.lazy(() =>
  import("./pages/Clients").then((mod) => ({ default: mod.Clients })),
);
const NewClientForm = React.lazy(() =>
  import("./pages/ClientForm").then((mod) => ({ default: mod.NewClientForm })),
);
const EditClientForm = React.lazy(() =>
  import("./pages/ClientForm").then((mod) => ({
    default: mod.EditClientForm,
  })),
);
const ClientDetails = React.lazy(() =>
  import("./pages/ClientDetails").then((mod) => ({
    default: mod.ClientDetails,
  })),
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
const EditProfile = React.lazy(() =>
  import("./pages/EditProfile").then((mod) => ({ default: mod.EditProfile })),
);
const Settings = React.lazy(() =>
  import("./pages/Settings").then((mod) => ({ default: mod.Settings })),
);
const Security = React.lazy(() =>
  import("./pages/Security").then((mod) => ({ default: mod.Security })),
);
const Help = React.lazy(() =>
  import("./pages/Help").then((mod) => ({ default: mod.Help })),
);
const Activity = React.lazy(() =>
  import("./pages/Activity").then((mod) => ({ default: mod.Activity })),
);

const DashboardLoadingSkeleton: React.FC = () => {
  return (
    <div className="dashboard-shell min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 py-6 md:py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
          <aside className="hidden lg:block rounded-2xl border border-border bg-muted/20 p-5 space-y-4">
            <Skeleton height="h-8" width="w-40" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={`nav-${index}`}
                  height="h-10"
                  width="w-full"
                  variant="rect"
                />
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/20 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <Skeleton height="h-8" width="w-64" />
                <Skeleton height="h-4" width="w-40" />
              </div>
              <Skeleton height="h-11" width="w-36" variant="rect" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`stat-${index}`}
                  className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3"
                >
                  <Skeleton height="h-3" width="w-24" />
                  <Skeleton height="h-8" width="w-28" />
                  <Skeleton height="h-4" width="w-20" />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-muted/20 p-4 md:p-5 space-y-4">
              <div className="flex flex-col xl:flex-row gap-3">
                <Skeleton height="h-11" width="w-full" variant="rect" />
                <div className="flex gap-2">
                  <Skeleton height="h-11" width="w-24" variant="rect" />
                  <Skeleton height="h-11" width="w-32" variant="rect" />
                  <Skeleton height="h-11" width="w-32" variant="rect" />
                </div>
              </div>

              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={`row-${index}`}
                    height="h-16"
                    width="w-full"
                    variant="rect"
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/**
 * Dashboard Feature Component
 * Main feature entry point for the dashboard application
 */
export const DashboardFeature: React.FC = () => {
  const { login, logout, isAuthenticated, loading, error, user } =
    useDashboardAuth();

  React.useEffect(() => {
    document.body.classList.add("dashboard-mode");

    return () => {
      document.body.classList.remove("dashboard-mode");
    };
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={login} loading={loading} error={error} />;
  }

  return (
    <div className="dashboard-shell min-h-screen bg-background text-foreground">
      <React.Suspense fallback={<DashboardLoadingSkeleton />}>
        <Routes>
          <Route element={<Layout onSignOut={logout} />}>
            <Route index element={<Overview />} />
            <Route path="activity" element={<Activity />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/new" element={<NewClientForm />} />
            <Route path="clients/:clientId" element={<ClientDetails />} />
            <Route path="clients/:clientId/edit" element={<EditClientForm />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="help" element={<Help />} />
            <Route path="settings" element={<Settings />}>
              <Route path="security" element={<Security />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
};

// Backward compatibility export
export { DashboardFeature as DashboardApp };
