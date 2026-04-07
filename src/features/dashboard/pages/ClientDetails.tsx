import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
} from "lucide-react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Skeleton } from "@/shared/components";
import { Pagination } from "@/shared/components/common";
import { PageHeader } from "../components/common";
import { useClientCrm } from "../api/hooks";
import type {
  ClientActivityEvent,
  ClientInvoice,
  ClientMessage,
  ClientProject,
} from "../api/types";
import { formatCurrency } from "../components/Clients/utils";
import type { Client } from "../components/Clients/types";

const formatDate = (ms: number) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(ms));

const StatusPill = ({ status }: { status: Client["status"] }) => {
  const tone =
    status === "Active"
      ? "bg-emerald-500/10 text-emerald-600 border-transparent"
      : status === "On Hold"
        ? "bg-amber-500/10 text-amber-600 border-transparent"
        : "bg-red-500/10 text-red-600 border-transparent";
  return (
    <span
      className={`inline-flex items-center rounded-full border border-transparent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${tone}`}
    >
      {status}
    </span>
  );
};

const MetaChip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  );
};

type PagedState<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const emptyPaged = <T,>(): PagedState<T> => ({
  items: [],
  page: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 1,
});

export const ClientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { clientId = "" } = useParams();
  const {
    loading,
    error,
    fetchClient,
    fetchProjects,
    fetchInvoices,
    fetchMessages,
    fetchActivity,
  } = useClientCrm();

  const [client, setClient] = React.useState<Client | null>(null);
  const [tab, setTab] = React.useState("overview");

  const [projects, setProjects] = React.useState<PagedState<ClientProject>>(
    () => emptyPaged<ClientProject>(),
  );
  const [invoices, setInvoices] = React.useState<PagedState<ClientInvoice>>(
    () => emptyPaged<ClientInvoice>(),
  );
  const [messages, setMessages] = React.useState<PagedState<ClientMessage>>(
    () => emptyPaged<ClientMessage>(),
  );
  const [activity, setActivity] = React.useState<
    PagedState<ClientActivityEvent>
  >(() => emptyPaged<ClientActivityEvent>());

  React.useEffect(() => {
    let cancelled = false;
    fetchClient(clientId)
      .then((result) => {
        if (cancelled) return;
        setClient(result);
      })
      .catch(() => {
        if (cancelled) return;
        setClient(null);
      });
    return () => {
      cancelled = true;
    };
  }, [clientId, fetchClient]);

  React.useEffect(() => {
    if (!clientId) return;
    let cancelled = false;

    const load = async () => {
      try {
        if (tab === "projects") {
          const res = await fetchProjects({
            clientId,
            page: projects.page,
            pageSize: projects.pageSize,
          });
          if (!cancelled) setProjects(res);
        }
        if (tab === "invoices") {
          const res = await fetchInvoices({
            clientId,
            page: invoices.page,
            pageSize: invoices.pageSize,
          });
          if (!cancelled) setInvoices(res);
        }
        if (tab === "comms") {
          const res = await fetchMessages({
            clientId,
            page: messages.page,
            pageSize: messages.pageSize,
          });
          if (!cancelled) setMessages(res);
        }
        if (tab === "activity") {
          const res = await fetchActivity({
            clientId,
            page: activity.page,
            pageSize: activity.pageSize,
          });
          if (!cancelled) setActivity(res);
        }
      } catch {
        // error handled by hook state
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [
    clientId,
    tab,
    fetchProjects,
    fetchInvoices,
    fetchMessages,
    fetchActivity,
    projects.page,
    projects.pageSize,
    invoices.page,
    invoices.pageSize,
    messages.page,
    messages.pageSize,
    activity.page,
    activity.pageSize,
  ]);

  if (loading && !client) {
    return (
      <div className="dash-stack">
        <div className="premium-card p-6 space-y-4">
          <Skeleton height="h-7" width="w-64" />
          <Skeleton height="h-4" width="w-96" />
          <Skeleton height="h-40" width="w-full" variant="rect" />
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="dash-stack">
        <PageHeader
          title="Client not found"
          subtitle={error || "The client you’re looking for does not exist."}
          actions={
            <Button
              type="button"
              variant="outline"
              className="gap-2 min-h-11"
              onClick={() => navigate("/dashboard/clients")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to clients
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          className="gap-5 md:gap-6"
          title={client.name}
          titleClassName="text-2xl sm:text-3xl lg:text-4xl tracking-tight"
          subtitle={
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={client.status} />
              <MetaChip>{client.industry}</MetaChip>
              <MetaChip>{formatCurrency(client.value)} LTV</MetaChip>
              <MetaChip>
                {client.growth > 0 ? "+" : ""}
                {client.growth}% momentum
              </MetaChip>
            </div>
          }
          actions={
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="gap-2 min-h-11 bg-muted/20 hover:bg-muted/30"
                onClick={() => navigate("/dashboard/clients")}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                type="button"
                className="gap-2 min-h-11"
                onClick={() => navigate(`/dashboard/clients/${client.id}/edit`)}
              >
                <Pencil className="w-4 h-4" />
                Edit client
              </Button>
            </div>
          }
        />
      </div>

      <div className="premium-card !p-0 overflow-hidden">
        <div className="px-5 md:px-6 lg:px-8 py-4 md:py-5 border-b border-border bg-muted/20">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-transparent p-0 h-auto flex flex-wrap gap-2">
              {[
                { value: "overview", label: "Overview" },
                { value: "projects", label: "Projects" },
                { value: "invoices", label: "Invoices" },
                { value: "comms", label: "Comms" },
                { value: "activity", label: "Activity" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="rounded-full text-xs font-semibold px-3 py-2 bg-muted/20 text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground border border-border"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="pt-5 md:pt-6 lg:pt-7 px-5 md:px-6 lg:px-8">
              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 xl:gap-6">
                  <div className="lg:col-span-8">
                    <div className="rounded-2xl border border-border bg-muted/10 p-5 md:p-6">
                      <p className="text-xs font-semibold text-foreground">
                        Snapshot
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Quick read. Use tabs for related records.
                      </p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            LTV
                          </p>
                          <p className="mt-2 font-display font-semibold text-xl text-foreground tabular-nums">
                            {formatCurrency(client.value)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            Momentum
                          </p>
                          <p className="mt-2 font-display font-semibold text-xl text-foreground tabular-nums">
                            {client.growth > 0 ? "+" : ""}
                            {client.growth}%
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            Status
                          </p>
                          <p className="mt-2 font-display font-semibold text-xl text-foreground">
                            {client.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-2xl border border-border bg-muted/10 p-5 md:p-6">
                      <p className="text-xs font-semibold text-foreground">
                        Contact
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Email
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-1 break-all">
                            {client.email}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Phone
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-1">
                            {client.phone}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Website
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-1 break-all">
                            {client.website || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <div className="overflow-hidden rounded-2xl border border-border bg-muted/10">
                  <Table className="w-full text-left border-collapse">
                    <TableHeader>
                      <TableRow className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-border bg-transparent hover:bg-transparent">
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Project
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Stage
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Value
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Updated
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border">
                      {projects.items.map((p) => (
                        <TableRow key={p.id} className="hover:bg-muted/20">
                          <TableCell className="px-5 py-5 font-semibold text-foreground">
                            {p.name}
                          </TableCell>
                          <TableCell className="px-5 py-5 text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em]">
                            {p.stage}
                          </TableCell>
                          <TableCell className="px-5 py-5 font-display font-semibold text-foreground tabular-nums">
                            {formatCurrency(p.value)}
                          </TableCell>
                          <TableCell className="px-5 py-5 text-xs font-medium text-muted-foreground">
                            {formatDate(p.updatedAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {projects.totalItems === 0 && (
                    <div className="p-10 text-center text-muted-foreground text-sm font-medium">
                      No projects yet.
                    </div>
                  )}
                </div>
                <div className="py-5 flex justify-end">
                  <Pagination
                    currentPage={projects.page}
                    totalPages={projects.totalPages}
                    onPageChange={(p) =>
                      setProjects((prev) => ({ ...prev, page: p }))
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="invoices">
                <div className="overflow-hidden rounded-2xl border border-border bg-muted/10">
                  <Table className="w-full text-left border-collapse">
                    <TableHeader>
                      <TableRow className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] border-b border-border bg-transparent hover:bg-transparent">
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Invoice
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Status
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Amount
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Issued
                        </TableHead>
                        <TableHead className="px-5 py-4 text-muted-foreground">
                          Due
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border">
                      {invoices.items.map((inv) => (
                        <TableRow key={inv.id} className="hover:bg-muted/20">
                          <TableCell className="px-5 py-5 font-semibold text-foreground">
                            {inv.code}
                          </TableCell>
                          <TableCell className="px-5 py-5 text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em]">
                            {inv.status}
                          </TableCell>
                          <TableCell className="px-5 py-5 font-display font-semibold text-foreground tabular-nums">
                            {formatCurrency(inv.amount)}
                          </TableCell>
                          <TableCell className="px-5 py-5 text-xs font-medium text-muted-foreground">
                            {formatDate(inv.issuedAt)}
                          </TableCell>
                          <TableCell className="px-5 py-5 text-xs font-medium text-muted-foreground">
                            {formatDate(inv.dueAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {invoices.totalItems === 0 && (
                    <div className="p-10 text-center text-muted-foreground text-sm font-medium">
                      No invoices yet.
                    </div>
                  )}
                </div>
                <div className="py-5 flex justify-end">
                  <Pagination
                    currentPage={invoices.page}
                    totalPages={invoices.totalPages}
                    onPageChange={(p) =>
                      setInvoices((prev) => ({ ...prev, page: p }))
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="comms">
                <div className="space-y-3">
                  {messages.items.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-2xl border p-4 md:p-5 transition-colors ${
                        m.unread
                          ? "border-primary/30 bg-primary/5"
                          : "border-border bg-muted/10 hover:bg-muted/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-foreground">
                          {m.subject}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                          {formatDate(m.createdAt)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground font-medium">
                        {m.preview}
                      </p>
                    </div>
                  ))}
                  {messages.totalItems === 0 && (
                    <div className="p-10 text-center text-muted-foreground text-sm font-medium rounded-2xl border border-border bg-muted/10">
                      No messages yet.
                    </div>
                  )}
                </div>
                <div className="py-5 flex justify-end">
                  <Pagination
                    currentPage={messages.page}
                    totalPages={messages.totalPages}
                    onPageChange={(p) =>
                      setMessages((prev) => ({ ...prev, page: p }))
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <div className="space-y-3">
                  {activity.items.map((evt) => (
                    <div
                      key={evt.id}
                      className="rounded-2xl border border-border bg-muted/10 p-4 md:p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">
                          {evt.label}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                          {formatDate(evt.createdAt)}
                        </p>
                      </div>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {evt.kind.replace("_", " ")}
                      </p>
                    </div>
                  ))}
                  {activity.totalItems === 0 && (
                    <div className="p-10 text-center text-muted-foreground text-sm font-medium rounded-2xl border border-border bg-muted/10">
                      No activity yet.
                    </div>
                  )}
                </div>
                <div className="py-5 flex justify-end">
                  <Pagination
                    currentPage={activity.page}
                    totalPages={activity.totalPages}
                    onPageChange={(p) =>
                      setActivity((prev) => ({ ...prev, page: p }))
                    }
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
