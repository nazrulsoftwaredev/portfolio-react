import { INITIAL_CLIENTS, STATUS_ORDER } from "./constants";
import type {
  Client,
  ClientStatus,
  ClientValidationErrors,
  SortOption,
} from "./types";

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatGrowth = (growth: number): string => {
  if (growth > 0) {
    return `+${growth}%`;
  }

  return `${growth}%`;
};

export const nextStatus = (status: ClientStatus): ClientStatus => {
  const currentIndex = STATUS_ORDER.indexOf(status);
  const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
  return STATUS_ORDER[nextIndex];
};

export const readStoredClients = (storageKey: string): Client[] => {
  if (typeof window === "undefined") {
    return INITIAL_CLIENTS;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return INITIAL_CLIENTS;
    }

    const parsed = JSON.parse(stored) as Client[];
    return parsed.length > 0 ? parsed : INITIAL_CLIENTS;
  } catch {
    return INITIAL_CLIENTS;
  }
};

export const validateClient = (client: Client): ClientValidationErrors => {
  const nextErrors: ClientValidationErrors = {};

  if (!client.name.trim()) {
    nextErrors.name = "Client name is required";
  }

  if (!client.industry.trim()) {
    nextErrors.industry = "Industry is required";
  }

  if (!client.email.trim()) {
    nextErrors.email = "Email is required";
  } else {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email);
    if (!isValidEmail) {
      nextErrors.email = "Enter a valid email";
    }
  }

  if (client.website.trim()) {
    const hasProtocol = /^(https?:\/\/)/.test(client.website);
    if (!hasProtocol) {
      nextErrors.website = "Website should start with http:// or https://";
    }
  }

  return nextErrors;
};

export const filterAndSortClients = (
  clients: Client[],
  query: string,
  statusFilter: "All" | ClientStatus,
  sortBy: SortOption,
): Client[] => {
  const normalizedQuery = query.trim().toLowerCase();

  const scoped = clients.filter((client) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      client.name.toLowerCase().includes(normalizedQuery) ||
      client.industry.toLowerCase().includes(normalizedQuery) ||
      client.email.toLowerCase().includes(normalizedQuery);
    const matchesStatus =
      statusFilter === "All" || client.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return [...scoped].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "value-asc") {
      return a.value - b.value;
    }

    return b.value - a.value;
  });
};

export const exportClientsCsv = (clients: Client[]): void => {
  const rows = [
    [
      "Name",
      "Industry",
      "Status",
      "Value",
      "Growth",
      "Email",
      "Phone",
      "Website",
    ],
    ...clients.map((client) => [
      client.name,
      client.industry,
      client.status,
      String(client.value),
      String(client.growth),
      client.email,
      client.phone,
      client.website,
    ]),
  ];

  const csvContent = rows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "clients-export.csv";
  link.click();
  URL.revokeObjectURL(url);
};
