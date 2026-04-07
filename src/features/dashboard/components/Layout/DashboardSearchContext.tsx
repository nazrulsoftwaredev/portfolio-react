import React from "react";

interface DashboardSearchContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DashboardSearchContext =
  React.createContext<DashboardSearchContextValue | null>(null);

export const DashboardSearchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const value = React.useMemo(
    () => ({ searchQuery, setSearchQuery }),
    [searchQuery],
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
