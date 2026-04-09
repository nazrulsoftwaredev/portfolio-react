import React from "react";
import {
  Plus,
  MoreHorizontal,
  GripVertical,
  Calendar,
  Layout,
  List as ListIcon,
} from "lucide-react";
import { Button } from "@/components/ui";
import { PageHeader } from "../components/common";
import { Toast } from "@/shared/components";
import { AnimatePresence } from "framer-motion";

const pipelineData = [
  {
    title: "Leads",
    count: 3,
    indicatorClass: "bg-primary",
    items: [
      {
        id: 1,
        client: "Nike",
        project: "Global Campaign",
        value: "$25K",
        date: "Mar 24",
        priority: "High",
      },
      {
        id: 2,
        client: "Apple",
        project: "Vision Pro UI",
        value: "$42K",
        date: "Mar 26",
        priority: "Medium",
      },
      {
        id: 3,
        client: "Tesla",
        project: "Dashboard Redesign",
        value: "$18K",
        date: "Mar 28",
        priority: "Low",
      },
    ],
  },
  {
    title: "Proposal",
    count: 2,
    indicatorClass: "bg-secondary",
    items: [
      {
        id: 4,
        client: "Spotify",
        project: "Artist Portal",
        value: "$12K",
        date: "Mar 22",
        priority: "High",
      },
      {
        id: 5,
        client: "Airbnb",
        project: "Experience Design",
        value: "$35K",
        date: "Mar 25",
        priority: "Medium",
      },
    ],
  },
  {
    title: "Active",
    count: 2,
    indicatorClass: "bg-emerald-500",
    items: [
      {
        id: 6,
        client: "Netflix",
        project: "TUDUM 2024",
        value: "$85K",
        date: "Apr 12",
        priority: "High",
      },
      {
        id: 7,
        client: "Google",
        project: "Gemini Branding",
        value: "$120K",
        date: "May 05",
        priority: "High",
      },
    ],
  },
  {
    title: "Completed",
    count: 5,
    indicatorClass: "bg-purple-500",
    items: [
      {
        id: 8,
        client: "Meta",
        project: "Quest 3 Launch",
        value: "$45K",
        date: "Feb 15",
        priority: "Medium",
      },
    ],
  },
];

const PipelineCard = ({
  client,
  project,
  value,
  date,
  priority,
  onPromote,
  onDemote,
}: any) => (
  <div className="premium-card !p-5 cursor-grab active:cursor-grabbing relative overflow-hidden">
    <div className="absolute top-0 right-0 p-2">
      <GripVertical className="w-4 h-4 text-muted-foreground" />
    </div>

    <div className="flex items-center justify-between mb-4">
      <div
        className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border ${
          priority === "High"
            ? "bg-red-500/10 text-red-600 border-red-500/20"
            : priority === "Medium"
              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
        }`}
      >
        {priority} priority
      </div>
      <button
        className="p-1 rounded-lg hover:bg-muted text-muted-foreground"
        onClick={onPromote}
        type="button"
        title="Move to next stage"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    <div className="space-y-1">
      <h4 className="font-display font-semibold text-lg text-foreground tracking-tight">
        {client}
      </h4>
      <p className="text-xs font-medium text-muted-foreground">{project}</p>
    </div>

    <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/60">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Calendar className="w-3.5 h-3.5 text-primary" />
        {date}
      </div>
      <div className="flex items-center gap-1.5 text-lg font-display font-semibold text-foreground tabular-nums">
        {value}
      </div>
    </div>
    <div className="mt-3 flex items-center gap-2">
      <Button type="button" variant="outline" size="sm" className="h-8" onClick={onDemote}>
        Back
      </Button>
      <Button type="button" variant="outline" size="sm" className="h-8" onClick={onPromote}>
        Next
      </Button>
    </div>
  </div>
);

export const Pipeline: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<"board" | "list">("board");
  const [columns, setColumns] = React.useState(pipelineData);
  const [toasts, setToasts] = React.useState<
    Array<{ id: string; message: string; type: "info" | "success" | "error" | "warning" }>
  >([]);

  const pushToast = React.useCallback(
    (message: string, type: "info" | "success" | "error" | "warning" = "info") =>
      setToasts((previous) => [
        ...previous,
        { id: crypto.randomUUID(), message, type },
      ]),
    [],
  );

  const moveItem = React.useCallback((itemId: number, direction: 1 | -1) => {
    setColumns((previous) => {
      const fromIndex = previous.findIndex((column) =>
        column.items.some((item) => item.id === itemId),
      );
      if (fromIndex === -1) {
        return previous;
      }
      const toIndex = fromIndex + direction;
      if (toIndex < 0 || toIndex >= previous.length) {
        return previous;
      }
      const sourceItems = [...previous[fromIndex].items];
      const itemIndex = sourceItems.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        return previous;
      }
      const [item] = sourceItems.splice(itemIndex, 1);
      const targetItems = [...previous[toIndex].items, item];

      const next = previous.map((column, index) => {
        if (index === fromIndex) {
          return { ...column, items: sourceItems, count: sourceItems.length };
        }
        if (index === toIndex) {
          return { ...column, items: targetItems, count: targetItems.length };
        }
        return column;
      });
      pushToast(`${item.client} moved to ${next[toIndex].title}.`, "success");
      return next;
    });
  }, [pushToast]);

  const addLead = React.useCallback(() => {
    setColumns((previous) => {
      const first = previous[0];
      const newLead = {
        id: Date.now(),
        client: "New Lead",
        project: "Qualification call",
        value: "$10K",
        date: "Today",
        priority: "Medium",
      };
      const items = [newLead, ...first.items];
      const next = [...previous];
      next[0] = { ...first, items, count: items.length };
      return next;
    });
    pushToast("Lead added to pipeline.", "success");
  }, [pushToast]);

  return (
    <div className="dash-stack flex flex-col min-h-0">
      <div>
        <PageHeader
          title={
            <>
              Project <br />
              pipeline
            </>
          }
          subtitle={
            <>
              Flow status: <span className="text-emerald-600">Optimal</span>
            </>
          }
          actions={
            <>
              <div className="flex bg-muted/30 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("board")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold ${viewMode === "board" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  Board
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <ListIcon className="w-3.5 h-3.5" />
                  List
                </button>
              </div>
              <Button className="gap-2" type="button" onClick={addLead}>
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
            </>
          }
        />
      </div>

      {viewMode === "board" ? (
      <div className="flex-1 min-h-0 flex dash-grid-gap overflow-x-auto no-scrollbar pb-10">
        {columns.map((column) => (
          <div
            key={column.title}
            className="flex-shrink-0 w-[22rem] flex flex-col gap-6"
          >
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-6 rounded-full ${column.indicatorClass}`}
                />
                <h3 className="font-display font-semibold text-xl text-foreground tracking-tight">
                  {column.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-lg bg-muted/70 text-foreground text-[10px] font-semibold tabular-nums">
                  {column.count}
                </span>
              </div>
              <button
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground"
                type="button"
                onClick={addLead}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 p-3 rounded-3xl bg-muted/20 ring-1 ring-border/40 overflow-y-auto no-scrollbar">
              {column.items.map((item) => (
                <PipelineCard
                  key={item.id}
                  {...item}
                  onPromote={() => moveItem(item.id, 1)}
                  onDemote={() => moveItem(item.id, -1)}
                />
              ))}

              <button
                type="button"
                className="w-full py-5 rounded-2xl bg-muted/20 text-xs font-medium text-muted-foreground flex items-center justify-center gap-3 hover:bg-muted/30 transition"
                onClick={addLead}
              >
                <Plus className="w-4 h-4" />
                Add new item
              </button>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="premium-card !p-0 overflow-hidden">
          <div className="divide-y divide-border/50">
            {columns.flatMap((column) =>
              column.items.map((item) => (
                <div key={item.id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.client}</p>
                    <p className="text-xs text-muted-foreground">{item.project} · {column.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">{item.value}</span>
                    <Button type="button" size="sm" variant="outline" onClick={() => moveItem(item.id, -1)}>
                      Back
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => moveItem(item.id, 1)}>
                      Next
                    </Button>
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      )}
      <div className="fixed bottom-6 left-6 z-[1060] flex max-w-sm flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              isOpen
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToasts((previous) => previous.filter((item) => item.id !== toast.id))
              }
              inline
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
