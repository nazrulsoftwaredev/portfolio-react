import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  Command,
  ChevronRight,
  LogOut,
  Settings,
  HelpCircle,
  Edit,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui";
import { ThemeToggle } from "@/shared/components";
import { NotificationsMenu } from "./NotificationsMenu";
import { useDashboardSearch } from "../Layout/DashboardSearchContext";

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onSignOut: () => void;
}

const spring = {
  type: "spring",
  stiffness: 320,
  damping: 30,
};

const workspaceLabels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/clients": "Clients",
  "/dashboard/invoices": "Invoices",
  "/dashboard/analytics": "Analytics",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/messages": "Messages",
  "/dashboard/profile/edit": "Edit Profile",
  "/dashboard/settings": "Settings",
  "/dashboard/settings/security": "Security",
  "/dashboard/help": "Help",
};

const formatWorkspaceLabel = (pathname: string): string => {
  if (workspaceLabels[pathname]) {
    return workspaceLabels[pathname];
  }

  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) {
    return "Workspace";
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

type BreadcrumbItem = { label: string; href: string };
type SearchItem = { label: string; href: string; category: string };

const searchItems: SearchItem[] = [
  { label: "Dashboard Overview", href: "/dashboard", category: "Page" },
  { label: "Clients", href: "/dashboard/clients", category: "Page" },
  { label: "Invoices", href: "/dashboard/invoices", category: "Page" },
  { label: "Analytics", href: "/dashboard/analytics", category: "Page" },
  { label: "Pipeline", href: "/dashboard/pipeline", category: "Page" },
  { label: "Messages", href: "/dashboard/messages", category: "Page" },
  { label: "Edit Profile", href: "/dashboard/profile/edit", category: "Page" },
  { label: "Settings", href: "/dashboard/settings", category: "Page" },
  { label: "Security", href: "/dashboard/settings/security", category: "Page" },
  { label: "Help", href: "/dashboard/help", category: "Page" },
  {
    label: "Client Relations",
    href: "/dashboard/clients",
    category: "Section",
  },
  {
    label: "Invoice Operations",
    href: "/dashboard/invoices",
    category: "Section",
  },
  { label: "Communications", href: "/dashboard/messages", category: "Section" },
];

const buildBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split("/").filter(Boolean);
  const dashboardIndex = segments.indexOf("dashboard");
  if (dashboardIndex === -1) return [];

  const crumbs: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];
  const rest = segments.slice(dashboardIndex + 1);

  if (rest.length === 0) {
    crumbs.push({
      label: workspaceLabels["/dashboard"] ?? "Overview",
      href: "/dashboard",
    });
    return crumbs;
  }

  // Special-case client details/edit so we don't show raw IDs.
  if (rest[0] === "clients") {
    crumbs.push({ label: "Clients", href: "/dashboard/clients" });

    const maybeId = rest[1];
    const isEdit = rest[2] === "edit";
    if (maybeId) {
      let clientLabel = "Client";
      if (typeof window !== "undefined") {
        try {
          const raw = window.localStorage.getItem("dashboard-clients-v1");
          const parsed = raw ? (JSON.parse(raw) as any) : null;
          if (Array.isArray(parsed)) {
            const match = parsed.find((c) => c?.id === maybeId);
            if (match?.name) clientLabel = String(match.name);
          }
        } catch {
          // ignore
        }
      }

      crumbs.push({
        label: clientLabel,
        href: `/dashboard/clients/${maybeId}`,
      });

      if (isEdit) {
        crumbs.push({
          label: "Edit",
          href: `/dashboard/clients/${maybeId}/edit`,
        });
      }
    }

    return crumbs;
  }

  // Default: build up crumbs incrementally.
  let running = "/dashboard";
  rest.forEach((seg) => {
    running += `/${seg}`;
    crumbs.push({ label: formatWorkspaceLabel(running), href: running });
  });
  return crumbs;
};

const highlightMatch = (label: string, query: string, active = false) => {
  const normalized = query.trim();
  if (!normalized) {
    return label;
  }

  const matchIndex = label.toLowerCase().indexOf(normalized.toLowerCase());
  if (matchIndex === -1) {
    return label;
  }

  const matchEnd = matchIndex + normalized.length;
  const before = label.slice(0, matchIndex);
  const match = label.slice(matchIndex, matchEnd);
  const after = label.slice(matchEnd);

  return (
    <>
      {before}
      <mark
        className={`rounded px-1 font-semibold ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-foreground text-background"
        }`}
      >
        {match}
      </mark>
      {after}
    </>
  );
};

export const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  onSignOut,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useDashboardSearch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const notificationsAnchorRef = useRef<HTMLButtonElement | null>(null);
  const workspaceName = formatWorkspaceLabel(pathname);
  const breadcrumbs = buildBreadcrumbs(pathname);
  const unreadCount = 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSearchItems = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return searchItems
      .filter((item) => item.label.toLowerCase().includes(normalizedQuery))
      .slice(0, 6);
  }, [normalizedQuery]);

  const showSearchResults = normalizedQuery.length > 0;

  useEffect(() => {
    setActiveSearchIndex(0);
  }, [normalizedQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 h-16 px-5 md:px-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4
                 border-b border-border bg-card"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        {/* SIDEBAR TOGGLE */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-muted/40 hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </motion.button>

        {breadcrumbs.length ? (
          <nav
            aria-label="Breadcrumb"
            className="hidden md:flex items-center gap-2 min-w-0"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.href}>
                  {idx > 0 ? (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : null}

                  {isLast ? (
                    <span className="text-xs font-semibold text-foreground truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition truncate"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        ) : (
          <div className="hidden lg:flex items-center rounded-xl bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {workspaceName}
          </div>
        )}
      </div>

      {/* SEARCH */}
      <motion.div
        layout
        className="relative w-full max-w-2xl justify-self-center group"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-foreground" />
        </div>

        <Input
          ref={searchInputRef}
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {
            if (!showSearchResults) {
              return;
            }

            if (event.key === "ArrowDown" && filteredSearchItems.length > 0) {
              event.preventDefault();
              setActiveSearchIndex((prev) =>
                prev >= filteredSearchItems.length - 1 ? 0 : prev + 1,
              );
              return;
            }

            if (event.key === "ArrowUp" && filteredSearchItems.length > 0) {
              event.preventDefault();
              setActiveSearchIndex((prev) =>
                prev <= 0 ? filteredSearchItems.length - 1 : prev - 1,
              );
              return;
            }

            if (event.key === "Escape") {
              setSearchQuery("");
              return;
            }

            if (
              event.key === "Enter" &&
              filteredSearchItems[activeSearchIndex]
            ) {
              event.preventDefault();
              navigate(filteredSearchItems[activeSearchIndex].href);
              setSearchQuery("");
            }
          }}
          className="w-full pl-10 pr-12 h-10 sm:h-11 rounded-xl
                     bg-background border border-input
                     text-sm text-foreground placeholder:text-muted-foreground/70
                     focus:ring-2 focus:ring-ring/30
                     transition-all"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
          <Command className="w-3 h-3" /> K
        </div>

        <AnimatePresence>
          {showSearchResults ? (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl bg-popover/95 backdrop-blur-md shadow-xl overflow-hidden"
              role="listbox"
              aria-label="Search suggestions"
            >
              {filteredSearchItems.length > 0 ? (
                <div className="p-2 space-y-1">
                  {filteredSearchItems.map((item, idx) => {
                    const isActive = idx === activeSearchIndex;
                    return (
                      <motion.div
                        key={`${item.href}-${item.label}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.14, delay: idx * 0.025 }}
                        whileHover={{ x: 3 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setSearchQuery("")}
                          onMouseEnter={() => setActiveSearchIndex(idx)}
                          className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                            isActive
                              ? "border-primary/30 bg-primary/10"
                              : "border-transparent hover:border-border hover:bg-muted/50"
                          }`}
                          role="option"
                          aria-selected={isActive}
                        >
                          <span className="text-sm font-medium text-foreground">
                            {highlightMatch(item.label, searchQuery, isActive)}
                          </span>
                          <span
                            className={`text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-md border border-transparent ${
                              isActive
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground bg-muted/30"
                            }`}
                          >
                            {item.category}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-4 text-sm text-muted-foreground"
                >
                  No search items found.
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <ThemeToggle variant="compact" className="hidden sm:inline-flex" />
        {/* NOTIFICATIONS */}
        <div className="relative">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            ref={notificationsAnchorRef}
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfile(false);
            }}
            className="p-2 rounded-xl bg-muted/40 hover:bg-muted transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            aria-haspopup="menu"
            aria-expanded={showNotifications}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold grid place-items-center border border-background">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </motion.button>

          <NotificationsMenu
            open={showNotifications}
            onOpenChange={(next) => setShowNotifications(next)}
            anchorRef={notificationsAnchorRef}
            unreadCount={unreadCount}
          />
        </div>

        {/* PROFILE */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setShowProfile((prev) => !prev);
              setShowNotifications(false);
            }}
            className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setShowProfile((prev) => !prev);
                setShowNotifications(false);
              }
            }}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nazrul"
              alt="Profile avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <AnimatePresence initial={false}>
            {showProfile && (
              <>
                {/* OVERLAY */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowProfile(false)}
                  className="fixed inset-0 z-40"
                />

                {/* MENU */}
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={spring}
                  className="absolute right-0 mt-3 w-60 rounded-2xl
                             bg-popover
                             shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-border/60">
                    <p className="text-sm font-semibold">Nazrul Islam</p>
                    <p className="text-xs text-muted-foreground">
                      Creative Lead
                    </p>
                  </div>

                  {[
                    {
                      icon: Edit,
                      label: "Edit Profile",
                      href: "/dashboard/profile/edit",
                    },
                    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
                    {
                      icon: Shield,
                      label: "Security",
                      href: "/dashboard/settings/security",
                    },
                    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        type="button"
                        key={item.href}
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          setShowProfile(false);
                          navigate(item.href);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition"
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </motion.button>
                    );
                  })}

                  <div className="border-t border-border/60" />

                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setShowProfile(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
