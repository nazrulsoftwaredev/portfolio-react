import React from "react";
import { useLocation } from "react-router-dom";

interface DashboardSearchContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DashboardSearchContext =
  React.createContext<DashboardSearchContextValue | null>(null);

export const DashboardSearchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { pathname } = useLocation();
  const [queriesByPath, setQueriesByPath] = React.useState<Record<string, string>>(
    {},
  );
  const searchQuery = queriesByPath[pathname] ?? "";
  const setSearchQuery = React.useCallback(
    (query: string) =>
      setQueriesByPath((previous) => ({ ...previous, [pathname]: query })),
    [pathname],
  );

  const value = React.useMemo(
    () => ({ searchQuery, setSearchQuery }),
    [searchQuery, setSearchQuery],
  );

  return (
    <DashboardSearchContext.Provider value={value}>
      {children}
    </DashboardSearchContext.Provider>
  );
};

export const useDashboardSearch = () => {
  const context = React.useContext(DashboardSearchContext);

  if (!context) {
    throw new Error(
      "useDashboardSearch must be used within a DashboardSearchProvider",
    );
  }

  return context;
};
