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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

interface ClientsTableProps {
  clients: Client[];
  onToggleStatus: (id: string) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export const ClientsTable = memo(function ClientsTable({
  clients,
  onToggleStatus,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <Table className="w-full text-left border-collapse">
        <TableHeader>
          <TableRow className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-border bg-muted/20 hover:bg-muted/20">
            <TableHead className="px-10 py-5 font-semibold text-muted-foreground">
              Identity
            </TableHead>
            <TableHead className="px-10 py-5 font-semibold text-muted-foreground">
              Segment
            </TableHead>
            <TableHead className="px-10 py-5 font-semibold text-muted-foreground">
              Protocol
            </TableHead>
            <TableHead className="px-10 py-5 font-semibold text-muted-foreground">
              Net Value
            </TableHead>
            <TableHead className="px-10 py-5 font-semibold text-muted-foreground">
              Momentum
            </TableHead>
            <TableHead className="px-10 py-5 font-semibold text-right text-muted-foreground">
              Ops
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border">
          {clients.map((client) => (
            <TableRow
              key={client.id}
              className="group hover:bg-muted/20 cursor-pointer"
            >
              <TableCell className="px-10 py-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-muted border border-border overflow-hidden relative shrink-0">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-full h-full object-cover p-3 opacity-70"
                    />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-xl text-foreground tracking-tight uppercase">
                      {client.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg bg-muted text-muted-foreground hover:text-primary"
                        onClick={() =>
                          window.open(`mailto:${client.email}`, "_self")
                        }
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg bg-muted text-muted-foreground hover:text-primary"
                        onClick={() =>
                          window.open(`tel:${client.phone}`, "_self")
                        }
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg bg-muted text-muted-foreground hover:text-emerald-600"
                        onClick={() => {
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
              <TableCell className="px-10 py-8 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                {client.industry}
              </TableCell>
              <TableCell className="px-10 py-8">
                <Button
                  type="button"
                  onClick={() => onToggleStatus(client.id)}
                  variant="outline"
                  size="sm"
                  className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] border ${
                    client.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : client.status === "On Hold"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : "bg-red-500/10 text-red-600 border-red-500/20"
                  }`}
                >
                  {client.status}
                </Button>
              </TableCell>
              <TableCell className="px-10 py-8 font-display font-semibold text-2xl text-foreground tracking-tighter tabular-nums">
                {formatCurrency(client.value)}
              </TableCell>
              <TableCell className="px-10 py-8">
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
              <TableCell className="px-10 py-8 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    onClick={() => onEdit(client)}
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-2xl bg-muted border border-border text-muted-foreground hover:text-foreground"
                    aria-label="Edit client"
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onDelete(client.id)}
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/20"
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
