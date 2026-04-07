import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/shared/components";
import { DashboardApp } from "@/features/dashboard";
import { portfolioRoutes } from "@/features/portfolio/routes";
import {
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
} from "@/shared/pages/errors";

function App() {
  return (
    <ErrorBoundary name="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={portfolioRoutes} />
          <Route path="/dashboard/*" element={<DashboardApp />} />

          {/* Explicit status pages */}
          <Route path="/401" element={<Error401 />} />
          <Route path="/403" element={<Error403 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="/503" element={<Error503 />} />

          {/* Catch-all */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
