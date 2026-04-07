export type ClientStatus = "Active" | "On Hold" | "Inactive";
export type SortOption = "name-asc" | "value-desc" | "value-asc";

export interface Client {
  id: string;
  name: string;
  industry: string;
  status: ClientStatus;
  value: number;
  growth: number;
  avatar: string;
  email: string;
  phone: string;
  website: string;
}

export interface ClientValidationErrors {
  name?: string;
  industry?: string;
  email?: string;
  website?: string;
}

export interface ClientsStats {
  totalNodes: number;
  activeCount: number;
  trustIndex: string;
  avgLtv: string;
  totalTrend: string;
  activeTrend: string;
}
