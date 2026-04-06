import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/components';
import { DashboardApp } from '@/features/dashboard';
import { portfolioRoutes } from '@/features/portfolio/routes';

function App() {
  return (
    <ErrorBoundary name="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={portfolioRoutes} />
          <Route path="/dashboard/*" element={<DashboardApp />} />
          <Route path="*" element={portfolioRoutes} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
