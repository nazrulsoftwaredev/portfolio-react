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
import { useDashboardSearch } from "../components/Layout/DashboardSearchContext";

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
    tone: "bg-emerald-500/8 text-emerald-500",
  },
  {
    label: "Outstanding",
    value: "$18,200.00",
    tone: "bg-amber-500/8 text-amber-500",
  },
  {
    label: "Overdue",
    value: "$4,800.00",
    tone: "bg-red-500/8 text-red-500",
  },
];

export const Invoices: React.FC = () => {
  const { searchQuery, setSearchQuery } = useDashboardSearch();

  const filteredInvoices = React.useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    if (!normalized) {
      return invoices;
    }

    return invoices.filter((invoice) => {
      return [
        invoice.id,
        invoice.client,
        invoice.amount,
        invoice.date,
        invoice.status,
        invoice.dueDate,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [searchQuery]);

  return (
    <div className="dash-stack">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 dash-grid-gap">
        <div className="lg:col-span-2 premium-card !p-0 overflow-hidden">
          <div className="p-5 md:p-6 border-b border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20">
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search invoices"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-background rounded-xl pl-11 pr-4"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" className="gap-2 border-transparent bg-muted/20 hover:bg-muted/30">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-left">
              <TableHeader>
                <TableRow className="text-muted-foreground text-xs font-medium bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-4 sm:px-6 lg:px-8 py-4 text-muted-foreground">
                    Invoice ID
                  </TableHead>
                  <TableHead className="hidden sm:table-cell px-4 sm:px-6 lg:px-8 py-4 text-muted-foreground">
                    Client
                  </TableHead>
                  <TableHead className="hidden md:table-cell px-4 sm:px-6 lg:px-8 py-4 text-muted-foreground">
                    Issue Date
                  </TableHead>
                  <TableHead className="hidden lg:table-cell px-4 sm:px-6 lg:px-8 py-4 text-muted-foreground">
                    Due Date
                  </TableHead>
                  <TableHead className="px-4 sm:px-6 lg:px-8 py-4 text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="hidden sm:table-cell px-4 sm:px-6 lg:px-8 py-4 text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="px-4 sm:px-6 lg:px-8 py-4 text-right text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border/50">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      className="group hover:bg-muted/30"
                    >
                      <TableCell className="px-4 sm:px-6 lg:px-8 py-5">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-sm tracking-tight text-foreground">
                            {invoice.id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell px-4 sm:px-6 lg:px-8 py-5 text-sm font-semibold text-foreground">
                        {invoice.client}
                      </TableCell>
                      <TableCell className="hidden md:table-cell px-4 sm:px-6 lg:px-8 py-5 text-xs font-medium text-muted-foreground">
                        {invoice.date}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell px-4 sm:px-6 lg:px-8 py-5 text-xs font-medium text-muted-foreground">
                        {invoice.dueDate}
                      </TableCell>
                      <TableCell className="px-4 sm:px-6 lg:px-8 py-5 font-display font-semibold text-base text-foreground tabular-nums">
                        {invoice.amount}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell px-4 sm:px-6 lg:px-8 py-5">
                        <StatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="px-4 sm:px-6 lg:px-8 py-5 text-right">
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="px-4 sm:px-6 lg:px-8 py-10 text-center text-sm font-medium text-muted-foreground"
                    >
                      No invoices match your search.
                    </TableCell>
                  </TableRow>
                )}
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
                  className={`flex items-center justify-between p-4 rounded-2xl ${card.tone}`}
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
                  <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
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
