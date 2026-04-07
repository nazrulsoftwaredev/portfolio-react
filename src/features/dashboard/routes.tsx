import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Skeleton } from "@/shared/components";
import { Login } from "./pages/Login";

// Lazy load dashboard pages
const DashboardLayout = lazy(() =>
  import("./pages/Overview").then((module) => ({
    default: module.Overview,
  })),
);

const DashboardLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login onLogin={() => setIsLoggedIn(true)} />;
};

const LoadingFallback = () => <Skeleton className="w-full h-96" />;

/**
 * Dashboard Feature Routes
 * All routes for the dashboard section of the application
 */
export const dashboardRoutes = (
  <Routes>
    <Route
      path="/login"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <DashboardLogin />
        </Suspense>
      }
    />
    <Route
      path="/*"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <DashboardLayout />
        </Suspense>
      }
    />
  </Routes>
);
