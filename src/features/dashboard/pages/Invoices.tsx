import React from "react";
import {
  Calendar,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Send,
} from "lucide-react";
import { PageHeader, PanelCard, StatusBadge } from "../components/common";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

const invoices = [
  {
    id: "INV-2024-001",
    client: "Acme Corp",
    amount: "$4,500.00",
    date: "Mar 12, 2024",
    status: "Paid",
    dueDate: "Mar 26, 2024",
  },
  {
    id: "INV-2024-002",
    client: "Global Tech",
    amount: "$12,200.00",
    date: "Mar 15, 2024",
    status: "Pending",
    dueDate: "Mar 29, 2024",
  },
  {
    id: "INV-2024-003",
    client: "Studio X",
    amount: "$2,800.00",
    date: "Mar 18, 2024",
    status: "Overdue",
    dueDate: "Apr 01, 2024",
  },
  {
    id: "INV-2024-004",
    client: "Future Labs",
    amount: "$8,000.00",
    date: "Mar 20, 2024",
    status: "Draft",
    dueDate: "Apr 03, 2024",
  },
  {
    id: "INV-2024-005",
    client: "Eco World",
    amount: "$1,500.00",
    date: "Mar 22, 2024",
    status: "Paid",
    dueDate: "Apr 05, 2024",
  },
];

const summaryCards = [
  {
    label: "Total collected",
    value: "$124,500.00",
    tone: "bg-emerald-500/5 border-emerald-500/20 text-emerald-400",
  },
  {
    label: "Outstanding",
    value: "$18,200.00",
    tone: "bg-amber-500/5 border-amber-500/20 text-amber-400",
  },
  {
    label: "Overdue",
    value: "$4,800.00",
    tone: "bg-red-500/5 border-red-500/20 text-red-400",
  },
];

export const Invoices: React.FC = () => {
  return (
    <div className="space-y-10">
      <div>
        <PageHeader
          title={
            <>
              Invoice <br />
              operations
            </>
          }
          subtitle={
            <>
              Billing channel: <span className="text-emerald-600">Live</span>
            </>
          }
          actions={
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20">
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search invoices"
                className="w-full bg-background border border-border rounded-xl pl-11 pr-4"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-left">
              <TableHeader>
                <TableRow className="text-muted-foreground text-xs font-medium bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-8 py-4 text-muted-foreground">
                    Invoice ID
                  </TableHead>
                  <TableHead className="px-8 py-4 text-muted-foreground">
                    Client
                  </TableHead>
                  <TableHead className="px-8 py-4 text-muted-foreground">
                    Issue Date
                  </TableHead>
                  <TableHead className="px-8 py-4 text-muted-foreground">
                    Due Date
                  </TableHead>
                  <TableHead className="px-8 py-4 text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="px-8 py-4 text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="px-8 py-4 text-right text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="group hover:bg-muted/30"
                  >
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm tracking-tight text-foreground">
                          {invoice.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-semibold text-foreground">
                      {invoice.client}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-xs font-medium text-muted-foreground">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-xs font-medium text-muted-foreground">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell className="px-8 py-6 font-display font-semibold text-base text-foreground tabular-nums">
                      {invoice.amount}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div>
            <PanelCard
              title="Financial summary"
              subtitle="Real-time invoice metrics"
            >
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className={`flex items-center justify-between p-4 rounded-2xl border ${card.tone}`}
                >
                  <div>
                    <p className="text-xs font-medium">{card.label}</p>
                    <h4 className="text-2xl font-display font-semibold mt-1 text-foreground">
                      {card.value}
                    </h4>
                  </div>
                  <Calendar className="w-5 h-5" />
                </div>
              ))}
            </PanelCard>
          </div>

          <div>
            <PanelCard title="Recent activity" subtitle="Latest payment events">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Invoice{" "}
                      <span className="text-primary">#INV-2024-005</span> was
                      paid by Eco World
                    </p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </PanelCard>
          </div>
        </div>
      </div>
    </div>
  );
};
