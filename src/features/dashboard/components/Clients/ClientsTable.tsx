import React, { memo } from "react";
import {
  ArrowUpRight,
  Globe,
  Mail,
  Pencil,
  Phone,
  Trash2,
  TrendingDown,
} from "lucide-react";
import type { Client } from "./types";
import { formatCurrency, formatGrowth } from "./utils";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

interface ClientsTableProps {
  clients: Client[];
  selectedClientIds: Set<string>;
  allSelectedOnPage: boolean;
  onToggleSelectAllPage: (checked: boolean) => void;
  onToggleSelectClient: (id: string, checked: boolean) => void;
  onOpen?: (client: Client) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const BADGE_STYLES = [
  "bg-emerald-500/15 text-emerald-400",
  "bg-amber-500/15 text-amber-400",
  "bg-sky-500/15 text-sky-400",
  "bg-violet-500/15 text-violet-400",
  "bg-cyan-500/15 text-cyan-400",
  "bg-slate-500/20 text-slate-300",
] as const;

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase() ?? "")
    .join("");
};

const getBadgeStyle = (name: string) => {
  const hash = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return BADGE_STYLES[hash % BADGE_STYLES.length];
};

export const ClientsTable = memo(function ClientsTable({
  clients,
  selectedClientIds,
  allSelectedOnPage,
  onToggleSelectAllPage,
  onToggleSelectClient,
  onOpen,
  onToggleStatus,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <Table className="w-full text-left border-collapse">
        <TableHeader>
          <TableRow className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-border/60 bg-muted/20 hover:bg-muted/20">
            <TableHead className="w-[56px] px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 text-muted-foreground">
              <Checkbox
                aria-label="Select all clients on current page"
                checked={allSelectedOnPage && clients.length > 0}
                onCheckedChange={(checked) =>
                  onToggleSelectAllPage(checked === true)
                }
              />
            </TableHead>
            <TableHead className="px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 font-semibold text-muted-foreground">
              Identity
            </TableHead>
            <TableHead className="hidden md:table-cell px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 font-semibold text-muted-foreground">
              Segment
            </TableHead>
            <TableHead className="hidden xl:table-cell px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 font-semibold text-muted-foreground">
              Protocol
            </TableHead>
            <TableHead className="px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 font-semibold text-muted-foreground">
              Net Value
            </TableHead>
            <TableHead className="hidden lg:table-cell px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 font-semibold text-muted-foreground">
              Momentum
            </TableHead>
            <TableHead className="px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-5 font-semibold text-right text-muted-foreground">
              Ops
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border/50">
          {clients.map((client) => (
            <TableRow
              key={client.id}
              className={`group hover:bg-muted/20 cursor-pointer ${
                selectedClientIds.has(client.id) ? "bg-muted/20" : ""
              }`}
              onClick={() => onOpen?.(client)}
            >
              <TableCell className="w-[56px] px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7">
                <Checkbox
                  aria-label={`Select ${client.name}`}
                  checked={selectedClientIds.has(client.id)}
                  onCheckedChange={(checked) =>
                    onToggleSelectClient(client.id, checked === true)
                  }
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7">
                <div className="flex items-center gap-4 md:gap-5">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0 grid place-items-center font-mono text-base font-bold tracking-widest ${getBadgeStyle(client.name)}`}
                    aria-label={`${client.name} monogram`}
                  >
                    {getInitials(client.name)}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-lg xl:text-xl text-foreground tracking-tight uppercase">
                      {client.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg bg-muted text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`mailto:${client.email}`, "_self");
                        }}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg bg-muted text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${client.phone}`, "_self");
                        }}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg bg-muted text-muted-foreground hover:text-emerald-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (client.website) {
                            window.open(
                              client.website,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                {client.industry}
              </TableCell>
              <TableCell className="hidden xl:table-cell px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7">
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(client.id);
                  }}
                  variant="outline"
                  size="sm"
                  className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] border border-transparent ${
                    client.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : client.status === "On Hold"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {client.status}
                </Button>
              </TableCell>
              <TableCell className="px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7 font-display font-semibold text-xl sm:text-2xl text-foreground tracking-tighter tabular-nums">
                {formatCurrency(client.value)}
              </TableCell>
              <TableCell className="hidden lg:table-cell px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7">
                <div
                  className={`flex items-center gap-2 text-xs font-semibold tracking-widest ${
                    client.growth > 0
                      ? "text-emerald-600"
                      : client.growth === 0
                        ? "text-muted-foreground"
                        : "text-red-600"
                  }`}
                >
                  {client.growth > 0 ? (
                    <ArrowUpRight className="w-5 h-5 shadow-sm" />
                  ) : client.growth === 0 ? null : (
                    <TrendingDown className="w-5 h-5 shadow-sm" />
                  )}
                  {formatGrowth(client.growth)}
                </div>
              </TableCell>
              <TableCell className="px-4 sm:px-5 md:px-6 lg:px-8 py-5 md:py-7 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(client);
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-2xl bg-muted/60 text-muted-foreground hover:text-foreground"
                    aria-label="Edit client"
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(client.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-2xl bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    aria-label="Delete client"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {clients.length === 0 && (
        <div className="p-10 text-center text-muted-foreground text-sm font-semibold uppercase tracking-[0.2em]">
          No clients match your search and filters
        </div>
      )}
    </div>
  );
});

ClientsTable.displayName = "ClientsTable";
