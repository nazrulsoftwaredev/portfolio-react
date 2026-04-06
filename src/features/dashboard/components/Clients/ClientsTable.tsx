import React from "react";
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

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  onToggleStatus,
  onEdit,
  onDelete,
}) => (
  <div className="overflow-x-auto no-scrollbar">
    <Table className="w-full text-left border-collapse">
      <TableHeader>
        <TableRow className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.02] hover:bg-white/[0.02]">
          <TableHead className="px-10 py-5 font-black text-on-surface-variant">
            Identity
          </TableHead>
          <TableHead className="px-10 py-5 font-black text-on-surface-variant">
            Segment
          </TableHead>
          <TableHead className="px-10 py-5 font-black text-on-surface-variant">
            Protocol
          </TableHead>
          <TableHead className="px-10 py-5 font-black text-on-surface-variant">
            Net Value
          </TableHead>
          <TableHead className="px-10 py-5 font-black text-on-surface-variant">
            Momentum
          </TableHead>
          <TableHead className="px-10 py-5 font-black text-right text-on-surface-variant">
            Ops
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-white/5">
        {clients.map((client) => (
          <TableRow
            key={client.id}
            className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <TableCell className="px-10 py-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-surface border border-white/5 group-hover:border-accent-primary/50 transition-all duration-500 overflow-hidden relative shrink-0">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-full h-full object-cover p-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                </div>
                <div>
                  <p className="font-display font-black text-xl text-white italic tracking-tight uppercase">
                    {client.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg bg-white/5 text-on-surface-variant hover:text-accent-primary hover:bg-accent-primary/10"
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
                      className="h-7 w-7 rounded-lg bg-white/5 text-on-surface-variant hover:text-accent-primary hover:bg-accent-primary/10"
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
                      className="h-7 w-7 rounded-lg bg-white/5 text-on-surface-variant hover:text-emerald-400 hover:bg-emerald-400/10"
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
            <TableCell className="px-10 py-8 text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em]">
              {client.industry}
            </TableCell>
            <TableCell className="px-10 py-8">
              <Button
                type="button"
                onClick={() => onToggleStatus(client.id)}
                variant="outline"
                size="sm"
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                  client.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : client.status === "On Hold"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/10"
                      : "bg-red-500/10 text-red-400 border-red-500/10"
                }`}
              >
                {client.status}
              </Button>
            </TableCell>
            <TableCell className="px-10 py-8 font-display font-black text-2xl text-white italic tracking-tighter tabular-nums">
              {formatCurrency(client.value)}
            </TableCell>
            <TableCell className="px-10 py-8">
              <div
                className={`flex items-center gap-2 text-xs font-black tracking-widest ${
                  client.growth > 0
                    ? "text-emerald-400"
                    : client.growth === 0
                      ? "text-on-surface-variant"
                      : "text-red-400"
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
                  className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 text-on-surface-variant hover:text-white hover:bg-white/10"
                  aria-label="Edit client"
                >
                  <Pencil className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  onClick={() => onDelete(client.id)}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/10 text-red-400 hover:bg-red-500/20"
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
      <div className="p-10 text-center text-on-surface-variant text-sm font-bold uppercase tracking-[0.2em]">
        No clients match your search and filters
      </div>
    )}
  </div>
);
