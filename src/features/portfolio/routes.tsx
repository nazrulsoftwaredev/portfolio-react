import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Skeleton } from "@/shared/components";

const PortfolioHome = lazy(() =>
  import("./pages/Home").then((module) => ({
    default: module.Home,
  })),
);

const LoadingFallback = () => <Skeleton className="w-full h-screen" />;

/**
 * Portfolio Feature Routes
 * All routes for the portfolio section of the application
 */
export const portfolioRoutes = (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <PortfolioHome />
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <PortfolioHome />
        </Suspense>
      }
    />
  </Routes>
);
