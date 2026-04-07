import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Shield, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "../components/common";

const tabs = [
  { to: "/dashboard/settings", label: "General", icon: SlidersHorizontal, end: true },
  { to: "/dashboard/settings/security", label: "Security", icon: Shield },
];

export const Settings: React.FC = () => {
  const location = useLocation();
  const isIndex = location.pathname === "/dashboard/settings";

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          className="gap-5 md:gap-6"
          title={
            <>
              Workspace <br />
              settings
            </>
          }
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle="Configure billing, security, and dashboard preferences."
        />
      </div>

      <div className="premium-card !p-0 overflow-hidden">
        <div className="px-5 md:px-6 pt-5 md:pt-6">
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl bg-muted/20 p-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={tab.end}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      isActive
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="dash-card-pad pt-4 md:pt-5">
          {isIndex ? (
            <div className="dash-section">
              <div className="space-y-1">
                <h3 className="text-base font-display font-semibold tracking-tight text-foreground">
                  General
                </h3>
                <p className="text-xs text-muted-foreground">
                  High-level preferences for your dashboard workspace.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 dash-grid-gap">
                <div className="rounded-2xl bg-muted/20 p-5 md:p-6">
                  <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                    Theme
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-2">
                    Toggle light/dark mode from the TopBar.
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/20 p-5 md:p-6">
                  <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                    Search
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-2">
                    Use the global search to jump between pages.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

