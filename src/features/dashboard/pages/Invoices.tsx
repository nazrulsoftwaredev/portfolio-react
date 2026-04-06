import React from "react";
import { motion } from "framer-motion";
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
import { PremiumButton } from "../components/PremiumButton";
import { PageHeader, PanelCard, StatusBadge } from "../components/common";
import {
  dashboardContainerVariants,
  dashboardItemVariants,
} from "../constants/animationVariants";
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
    label: "TOTAL COLLECTED",
    value: "$124,500.00",
    tone: "bg-emerald-500/5 border-emerald-500/20 text-emerald-400",
  },
  {
    label: "OUTSTANDING",
    value: "$18,200.00",
    tone: "bg-amber-500/5 border-amber-500/20 text-amber-400",
  },
  {
    label: "OVERDUE",
    value: "$4,800.00",
    tone: "bg-red-500/5 border-red-500/20 text-red-400",
  },
];

export const Invoices: React.FC = () => {
  return (
    <motion.div
      variants={dashboardContainerVariants}
      initial={false}
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={dashboardItemVariants}>
        <PageHeader
          title={
            <>
              INVOICE <br />
              OPERATIONS
            </>
          }
          subtitle={
            <>
              BILLING CHANNEL: <span className="text-emerald-400">LIVE</span>
            </>
          }
          actions={
            <PremiumButton variant="primary" icon={Plus}>
              CREATE INVOICE
            </PremiumButton>
          }
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          variants={dashboardItemVariants}
          className="lg:col-span-2 premium-card !p-0 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-accent-primary transition-colors" />
              <Input
                type="text"
                placeholder="SEARCH INVOICES..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-black tracking-[0.15em] text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/40 transition-all uppercase placeholder:text-on-surface-variant/40"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <PremiumButton variant="outline" icon={Filter}>
                FILTER
              </PremiumButton>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-left">
              <TableHeader>
                <TableRow className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] bg-white/[0.02] hover:bg-white/[0.02]">
                  <TableHead className="px-8 py-4 text-on-surface-variant">
                    Invoice ID
                  </TableHead>
                  <TableHead className="px-8 py-4 text-on-surface-variant">
                    Client
                  </TableHead>
                  <TableHead className="px-8 py-4 text-on-surface-variant">
                    Issue Date
                  </TableHead>
                  <TableHead className="px-8 py-4 text-on-surface-variant">
                    Due Date
                  </TableHead>
                  <TableHead className="px-8 py-4 text-on-surface-variant">
                    Amount
                  </TableHead>
                  <TableHead className="px-8 py-4 text-on-surface-variant">
                    Status
                  </TableHead>
                  <TableHead className="px-8 py-4 text-right text-on-surface-variant">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-white/5">
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="group hover:bg-white/[0.03] transition-colors"
                  >
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-accent-primary" />
                        <span className="font-black text-sm tracking-tight text-white">
                          {invoice.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-semibold text-white">
                      {invoice.client}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell className="px-8 py-6 font-display font-black text-base text-white tabular-nums">
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
                          className="h-10 w-10 rounded-xl text-on-surface-variant hover:text-accent-primary hover:bg-white/10"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl text-on-surface-variant hover:text-accent-primary hover:bg-white/10"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl text-on-surface-variant hover:text-accent-primary hover:bg-white/10"
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
        </motion.div>

        <div className="lg:col-span-1 space-y-8">
          <motion.div variants={dashboardItemVariants}>
            <PanelCard
              title="FINANCIAL SUMMARY"
              subtitle="Real-time invoice metrics"
            >
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className={`flex items-center justify-between p-4 rounded-2xl border ${card.tone}`}
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {card.label}
                    </p>
                    <h4 className="text-2xl font-display font-black mt-1 text-white">
                      {card.value}
                    </h4>
                  </div>
                  <Calendar className="w-5 h-5" />
                </div>
              ))}
            </PanelCard>
          </motion.div>

          <motion.div variants={dashboardItemVariants}>
            <PanelCard title="RECENT ACTIVITY" subtitle="Latest payment events">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Invoice{" "}
                      <span className="text-accent-primary">#INV-2024-005</span>{" "}
                      was paid by Eco World
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] mt-1">
                      2 HOURS AGO
                    </p>
                  </div>
                </div>
              ))}
            </PanelCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
