import React, { memo, useMemo } from "react";
import {
  ArrowUpRight,
  Globe,
  Mail,
  Pencil,
  Phone,
  Trash2,
  TrendingDown,
  Minus,
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
import { cn } from "@/lib/utils"; // Assuming standard shadcn utility

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

// --- Constants & Helpers ---

const BADGE_STYLES = [
  "bg-emerald-500/15 text-emerald-400",
  "bg-amber-500/15 text-amber-400",
  "bg-sky-500/15 text-sky-400",
  "bg-violet-500/15 text-violet-400",
  "bg-cyan-500/15 text-cyan-400",
  "bg-slate-500/20 text-slate-300",
] as const;

const STATUS_CONFIG = {
  Active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "On Hold": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Inactive: "bg-red-500/10 text-red-600 border-red-500/20",
} as const;

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  return parts.length === 1
    ? parts[0].substring(0, 2).toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getBadgeStyle = (name: string) => {
  const hash = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return BADGE_STYLES[hash % BADGE_STYLES.length];
};

const CELL_PADDING = "px-4 sm:px-6 py-5 md:py-7";

// --- Sub-component: ClientRow ---

const ClientRow = memo(
  ({
    client,
    isSelected,
    onToggleSelect,
    onOpen,
    onEdit,
    onDelete,
    onToggleStatus,
  }: {
    client: Client;
    isSelected: boolean;
    onToggleSelect: (id: string, checked: boolean) => void;
    onOpen?: (client: Client) => void;
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
  }) => {
    const badgeColor = useMemo(() => getBadgeStyle(client.name), [client.name]);

    const growthConfig = useMemo(() => {
      if (client.growth > 0)
        return { color: "text-emerald-600", Icon: ArrowUpRight };
      if (client.growth < 0)
        return { color: "text-red-600", Icon: TrendingDown };
      return { color: "text-muted-foreground", Icon: Minus };
    }, [client.growth]);

    return (
      <TableRow
        className={cn(
          "group hover:bg-muted/30 transition-colors cursor-pointer",
          isSelected && "bg-muted/40",
        )}
        onClick={() => onOpen?.(client)}
      >
        <TableCell className={cn(CELL_PADDING, "w-[56px]")}>
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) =>
              onToggleSelect(client.id, checked === true)
            }
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select ${client.name}`}
          />
        </TableCell>

        <TableCell className={CELL_PADDING}>
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0 grid place-items-center font-mono text-base font-bold tracking-widest",
                badgeColor,
              )}
            >
              {getInitials(client.name)}
            </div>
            <div>
              <p className="font-display font-semibold text-lg text-foreground tracking-tight uppercase leading-none mb-2">
                {client.name}
              </p>
              <div className="flex items-center gap-2">
                {[
                  {
                    icon: Mail,
                    href: `mailto:${client.email}`,
                    color: "hover:text-primary",
                  },
                  {
                    icon: Phone,
                    href: `tel:${client.phone}`,
                    color: "hover:text-primary",
                  },
                  {
                    icon: Globe,
                    href: client.website,
                    color: "hover:text-emerald-600",
                    external: true,
                  },
                ].map((action, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-lg bg-muted/50 text-muted-foreground transition-colors",
                      action.color,
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (action.href)
                        window.open(
                          action.href,
                          action.external ? "_blank" : "_self",
                        );
                    }}
                  >
                    <action.icon className="w-3.5 h-3.5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell
          className={cn(
            CELL_PADDING,
            "hidden md:table-cell text-[11px] font-semibold text-muted-foreground uppercase tracking-widest",
          )}
        >
          {client.industry}
        </TableCell>

        <TableCell className={cn(CELL_PADDING, "hidden xl:table-cell")}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(client.id);
            }}
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all hover:brightness-95",
              STATUS_CONFIG[client.status as keyof typeof STATUS_CONFIG] ||
                "bg-muted text-muted-foreground",
            )}
          >
            {client.status}
          </button>
        </TableCell>

        <TableCell
          className={cn(
            CELL_PADDING,
            "font-display font-semibold text-xl text-foreground tabular-nums",
          )}
        >
          {formatCurrency(client.value)}
        </TableCell>

        <TableCell className={cn(CELL_PADDING, "hidden lg:table-cell")}>
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold tracking-widest",
              growthConfig.color,
            )}
          >
            <growthConfig.Icon className="w-4 h-4" />
            {formatGrowth(client.growth)}
          </div>
        </TableCell>

        <TableCell className={cn(CELL_PADDING, "text-right")}>
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(client);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(client.id);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  },
);

ClientRow.displayName = "ClientRow";

// --- Main Component: ClientsTable ---

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
    <div className="rounded-xl border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm">
      <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/60">
              <TableHead className="w-[56px] px-4 sm:px-6 py-4">
                <Checkbox
                  checked={allSelectedOnPage && clients.length > 0}
                  onCheckedChange={(checked) =>
                    onToggleSelectAllPage(checked === true)
                  }
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Identity
              </TableHead>
              <TableHead className="hidden md:table-cell px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Segment
              </TableHead>
              <TableHead className="hidden xl:table-cell px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Protocol
              </TableHead>
              <TableHead className="px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Net Value
              </TableHead>
              <TableHead className="hidden lg:table-cell px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Momentum
              </TableHead>
              <TableHead className="px-4 sm:px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Ops
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                isSelected={selectedClientIds.has(client.id)}
                onToggleSelect={onToggleSelectClient}
                onOpen={onOpen}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </TableBody>
        </Table>

        {clients.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              No results found
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

ClientsTable.displayName = "ClientsTable";
