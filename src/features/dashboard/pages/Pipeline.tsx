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

const pipelineData = [
  {
    title: "LEADS",
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
    title: "PROPOSAL",
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
    title: "ACTIVE",
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
    title: "COMPLETED",
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

const PipelineCard = ({ client, project, value, date, priority }: any) => (
  <div className="premium-card !p-5 cursor-grab active:cursor-grabbing relative overflow-hidden">
    <div className="absolute top-0 right-0 p-2">
      <GripVertical className="w-4 h-4 text-muted-foreground" />
    </div>

    <div className="flex items-center justify-between mb-4">
      <div
        className={`px-2 py-0.5 rounded-lg text-[9px] font-semibold uppercase tracking-[0.2em] border ${
          priority === "High"
            ? "bg-red-500/10 text-red-600 border-red-500/20"
            : priority === "Medium"
              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
        }`}
      >
        {priority} PRIORITY
      </div>
      <button className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    <div className="space-y-1">
      <h4 className="font-display font-semibold text-xl text-foreground tracking-tight uppercase">
        {client}
      </h4>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        {project}
      </p>
    </div>

    <div className="flex items-center justify-between pt-5 mt-5 border-t border-border">
      <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
        <Calendar className="w-3.5 h-3.5 text-primary" />
        {date}
      </div>
      <div className="flex items-center gap-1.5 text-lg font-display font-semibold text-foreground tabular-nums">
        {value}
      </div>
    </div>
  </div>
);

export const Pipeline: React.FC = () => {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-10">
      <div>
        <PageHeader
          title={
            <>
              PROJECT <br />
              PIPELINE
            </>
          }
          subtitle={
            <>
              FLOW STATUS: <span className="text-emerald-600">OPTIMAL</span>
            </>
          }
          actions={
            <>
              <div className="flex bg-muted/30 p-1 rounded-2xl border border-border">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-widest">
                  <Layout className="w-3.5 h-3.5" />
                  BOARD
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-muted-foreground text-[10px] font-semibold uppercase tracking-widest">
                  <ListIcon className="w-3.5 h-3.5" />
                  LIST
                </button>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
            </>
          }
        />
      </div>

      <div className="flex-1 flex gap-8 overflow-x-auto no-scrollbar pb-10 min-h-0">
        {pipelineData.map((column, idx) => (
          <div
            key={column.title}
            className="flex-shrink-0 w-[22rem] flex flex-col gap-6"
          >
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-6 rounded-full ${column.indicatorClass}`}
                />
                <h3 className="font-display font-semibold text-xl text-foreground tracking-tight uppercase">
                  {column.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-lg bg-muted text-foreground text-[10px] font-semibold tabular-nums border border-border">
                  {column.count}
                </span>
              </div>
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 p-3 rounded-3xl bg-muted/20 border border-dashed border-border overflow-y-auto no-scrollbar">
              {column.items.map((item) => (
                <PipelineCard key={item.id} {...item} />
              ))}

              <button className="w-full py-6 rounded-2xl border border-dashed border-border text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-center gap-3">
                <Plus className="w-4 h-4" />
                INITIATE NEW ITEM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
