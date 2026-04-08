import type {
  AuthCredentials,
  DashboardApiResponse,
  DashboardAuthSession,
  DashboardUser,
  ClientsPage,
  ClientsQueryParams,
  ClientActivityEvent,
  ClientInvoice,
  ClientMessage,
  ClientProject,
  PagedResponse,
} from "./types";
import type { Client } from "../components/Clients/types";
import { INITIAL_CLIENTS, STORAGE_KEY } from "../components/Clients/constants";
import {
  filterAndSortClients,
  formatCurrency,
  formatGrowth,
} from "../components/Clients/utils";

/**
 * Dashboard Feature API Services
 * Business logic and data processing for dashboard feature
 */

/**
 * DEMO ONLY — These are placeholder credentials for the UI prototype.
 * They are intentionally visible in source for demo purposes.
 * Replace with a real authentication API (e.g., JWT endpoint) before
 * deploying to any environment with real data.
 */
const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@mdnazrul.com",
  password: "admin123",
};

const MOCK_ADMIN_USER: DashboardUser = {
  id: "admin-user",
  email: MOCK_ADMIN_CREDENTIALS.email,
  name: "Admin",
  role: "admin",
};

const AUTH_TTL_MS = 1000 * 60 * 60 * 8;

const PROJECTS_STORAGE_KEY = "dashboard-client-projects-v1";
const INVOICES_STORAGE_KEY = "dashboard-client-invoices-v1";
const MESSAGES_STORAGE_KEY = "dashboard-client-messages-v1";
const ACTIVITY_STORAGE_KEY = "dashboard-client-activity-v1";

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const clampInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Math.floor(value), min), max);

const paginate = <TItem,>(
  items: TItem[],
  page: number,
  pageSize: number,
): PagedResponse<TItem> => {
  const safePageSize = clampInt(pageSize || 25, 1, 100);
  const safePage = Math.max(1, Math.floor(page || 1));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const clampedPage = Math.min(safePage, totalPages);
  const start = (clampedPage - 1) * safePageSize;
  return {
    items: items.slice(start, start + safePageSize),
    page: clampedPage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
  };
};

const readJsonArray = <TItem,>(key: string, fallback: TItem[]): TItem[] => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as TItem[]) : fallback;
  } catch {
    return fallback;
  }
};

const writeJsonArray = <TItem,>(key: string, value: TItem[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
};

const seedCrmIfMissing = () => {
  if (typeof window === "undefined") return;

  const hasAny = (key: string) => {
    try {
      return Boolean(window.localStorage.getItem(key));
    } catch {
      return false;
    }
  };

  if (
    hasAny(PROJECTS_STORAGE_KEY) &&
    hasAny(INVOICES_STORAGE_KEY) &&
    hasAny(MESSAGES_STORAGE_KEY) &&
    hasAny(ACTIVITY_STORAGE_KEY)
  ) {
    return;
  }

  const now = Date.now();
  const projects: ClientProject[] = [];
  const invoices: ClientInvoice[] = [];
  const messages: ClientMessage[] = [];
  const events: ClientActivityEvent[] = [];

  INITIAL_CLIENTS.forEach((client, idx) => {
    const base = now - (idx + 1) * 1000 * 60 * 60 * 24 * 7;
    const p1: ClientProject = {
      id: `prj-${client.id}-1`,
      clientId: client.id,
      name: `${client.name} — Brand system`,
      stage: "Design",
      value: Math.max(1800, Math.round(client.value * 0.12)),
      updatedAt: base + 1000 * 60 * 60 * 24 * 2,
    };
    const p2: ClientProject = {
      id: `prj-${client.id}-2`,
      clientId: client.id,
      name: `${client.name} — Website revamp`,
      stage: idx % 2 === 0 ? "Build" : "Discovery",
      value: Math.max(2400, Math.round(client.value * 0.18)),
      updatedAt: base + 1000 * 60 * 60 * 24 * 5,
    };
    projects.push(p1, p2);

    const inv1: ClientInvoice = {
      id: `inv-${client.id}-1`,
      clientId: client.id,
      code: `INV-${new Date(base).getFullYear()}-${String(idx + 1).padStart(3, "0")}`,
      amount: Math.max(900, Math.round(p1.value * 0.6)),
      issuedAt: base + 1000 * 60 * 60 * 24 * 1,
      dueAt: base + 1000 * 60 * 60 * 24 * 14,
      status: idx % 4 === 0 ? "Paid" : idx % 4 === 1 ? "Pending" : idx % 4 === 2 ? "Overdue" : "Draft",
    };
    invoices.push(inv1);

    const msg1: ClientMessage = {
      id: `msg-${client.id}-1`,
      clientId: client.id,
      subject: "Kickoff details",
      preview: "Sharing next steps and timeline. Let’s align on the deliverables…",
      unread: idx % 2 === 0,
      createdAt: base + 1000 * 60 * 60 * 20,
    };
    const msg2: ClientMessage = {
      id: `msg-${client.id}-2`,
      clientId: client.id,
      subject: "Invoice & payment",
      preview: "Invoice is ready. Let me know if you need PO details or billing updates…",
      unread: false,
      createdAt: base + 1000 * 60 * 60 * 24 * 3,
    };
    messages.push(msg1, msg2);

    events.push(
      {
        id: `evt-${client.id}-p1`,
        clientId: client.id,
        kind: "project",
        label: `Project created: ${p1.name}`,
        createdAt: p1.updatedAt - 1000 * 60 * 60 * 6,
      },
      {
        id: `evt-${client.id}-i1`,
        clientId: client.id,
        kind: "invoice",
        label: `Invoice issued: ${inv1.code}`,
        createdAt: inv1.issuedAt,
        meta: { amount: inv1.amount, status: inv1.status },
      },
      {
        id: `evt-${client.id}-m1`,
        clientId: client.id,
        kind: "message",
        label: `Message received: ${msg1.subject}`,
        createdAt: msg1.createdAt,
      },
    );
  });

  writeJsonArray(PROJECTS_STORAGE_KEY, projects);
  writeJsonArray(INVOICES_STORAGE_KEY, invoices);
  writeJsonArray(MESSAGES_STORAGE_KEY, messages);
  writeJsonArray(ACTIVITY_STORAGE_KEY, events);
};

export const dashboardService = {
  /**
   * Validate login credentials
   */
  validateLoginCredentials: (
    email: string,
    password: string,
  ): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    return errors;
  },

  /**
   * Check if user has permission for resource
   */
  hasPermission: (userRole: string, requiredRole: string): boolean => {
    const roleHierarchy: Record<string, number> = {
      admin: 3,
      user: 2,
      guest: 1,
    };

    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  },

  /**
   * Format metric change percentage
   */
  formatMetricChange: (change: number | undefined): string => {
    if (!change) return "No change";
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
  },

  /**
   * Parse API errors to user-friendly messages
   */
  parseApiError: (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred. Please try again.";
  },

  /**
   * Authenticate the admin user.
   *
   * Replace the body of this function with a real API request later.
   */
  loginAdmin: async (
    credentials: AuthCredentials,
  ): Promise<DashboardApiResponse<DashboardAuthSession>> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 350));

    const email = credentials.email.trim().toLowerCase();

    if (!email || !credentials.password.trim()) {
      throw new Error("Please enter both email and password");
    }

    if (
      email !== MOCK_ADMIN_CREDENTIALS.email ||
      credentials.password !== MOCK_ADMIN_CREDENTIALS.password
    ) {
      throw new Error("Invalid admin credentials");
    }

    const expiresAt = Date.now() + AUTH_TTL_MS;
    const session: DashboardAuthSession = {
      token: "ui-only-admin-token",
      user: MOCK_ADMIN_USER,
      expiresAt,
    };

    return {
      status: "success",
      message: "Admin login successful",
      data: session,
    };
  },

  /**
   * Check if user session is valid
   */
  isSessionValid: (token: string | null, expiresAt: number | null): boolean => {
    if (!token || !expiresAt) return false;
    return Date.now() < expiresAt;
  },

  /**
   * Fetch a server-paginated slice of clients.
   *
   * This is a UI-only mock that behaves like a real API: it applies query + filter
   * + sort, returns totals, and only returns the requested page.
   */
  getClientsPage: async (
    params: ClientsQueryParams,
  ): Promise<DashboardApiResponse<ClientsPage<Client>>> => {
    await wait(220);

    const safePageSize = Math.min(Math.max(Math.floor(params.pageSize || 25), 1), 100);
    const safePage = Math.max(1, Math.floor(params.page || 1));

    const readAllClients = (): Client[] => {
      if (typeof window === "undefined") {
        return INITIAL_CLIENTS;
      }

      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          return INITIAL_CLIENTS;
        }

        const parsed = JSON.parse(stored) as unknown;
        if (!Array.isArray(parsed)) {
          return INITIAL_CLIENTS;
        }

        return parsed as Client[];
      } catch {
        return INITIAL_CLIENTS;
      }
    };

    const allClients = readAllClients();
    const filtered = filterAndSortClients(
      allClients,
      params.q ?? "",
      params.status ?? "All",
      params.sort ?? "value-desc",
    );

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
    const clampedPage = Math.min(safePage, totalPages);
    const start = (clampedPage - 1) * safePageSize;
    const items = filtered.slice(start, start + safePageSize);

    const totalNodes = allClients.length;
    const activeCount = allClients.filter((client) => client.status === "Active").length;
    const avgGrowth =
      totalNodes > 0
        ? allClients.reduce((sum, client) => sum + client.growth, 0) / totalNodes
        : 0;
    const avgLtv =
      totalNodes > 0
        ? allClients.reduce((sum, client) => sum + client.value, 0) / totalNodes
        : 0;

    return {
      status: "success",
      data: {
        items,
        page: clampedPage,
        pageSize: safePageSize,
        totalItems,
        totalPages,
        stats: {
          totalNodes,
          activeCount,
          trustIndex: `${Math.max(90, Math.min(99.9, 96 + avgGrowth / 10)).toFixed(1)}%`,
          avgLtv: formatCurrency(avgLtv),
          totalTrend: formatGrowth(Math.round(avgGrowth)),
          activeTrend: formatGrowth(Math.max(1, Math.round(avgGrowth / 2))),
        },
      },
    };
  },

  getClientById: async (
    clientId: string,
  ): Promise<DashboardApiResponse<Client>> => {
    await wait(160);

    const allClients = readJsonArray<Client>(STORAGE_KEY, INITIAL_CLIENTS);
    const client = allClients.find((c) => c.id === clientId) ?? null;
    if (!client) {
      throw new Error("Client not found");
    }

    return { status: "success", data: client };
  },

  getClientProjects: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientProject>>> => {
    await wait(200);
    seedCrmIfMissing();
    const all = readJsonArray<ClientProject>(PROJECTS_STORAGE_KEY, []);
    const scoped = all
      .filter((p) => p.clientId === clientId)
      .sort((a, b) => b.updatedAt - a.updatedAt);
    return { status: "success", data: paginate(scoped, page, pageSize) };
  },

  getClientInvoices: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientInvoice>>> => {
    await wait(200);
    seedCrmIfMissing();
    const all = readJsonArray<ClientInvoice>(INVOICES_STORAGE_KEY, []);
    const scoped = all
      .filter((inv) => inv.clientId === clientId)
      .sort((a, b) => b.issuedAt - a.issuedAt);
    return { status: "success", data: paginate(scoped, page, pageSize) };
  },

  getClientMessages: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientMessage>>> => {
    await wait(220);
    seedCrmIfMissing();
    const all = readJsonArray<ClientMessage>(MESSAGES_STORAGE_KEY, []);
    const scoped = all
      .filter((m) => m.clientId === clientId)
      .sort((a, b) => b.createdAt - a.createdAt);
    return { status: "success", data: paginate(scoped, page, pageSize) };
  },

  getClientActivity: async ({
    clientId,
    page,
    pageSize,
  }: {
    clientId: string;
    page: number;
    pageSize: number;
  }): Promise<DashboardApiResponse<PagedResponse<ClientActivityEvent>>> => {
    await wait(180);
    seedCrmIfMissing();
    const all = readJsonArray<ClientActivityEvent>(ACTIVITY_STORAGE_KEY, []);
    const scoped = all
      .filter((e) => e.clientId === clientId)
      .sort((a, b) => b.createdAt - a.createdAt);
    return { status: "success", data: paginate(scoped, page, pageSize) };
  },
};
