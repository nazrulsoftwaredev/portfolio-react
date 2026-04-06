import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  GripVertical,
  Calendar,
  DollarSign,
  Layout,
  List as ListIcon,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { PremiumButton } from "../components/PremiumButton";
import { PageHeader } from "../components/common";
import {
  dashboardContainerVariants,
  dashboardItemVariants,
} from "../constants/animationVariants";

const pipelineData = [
  {
    title: "LEADS",
    count: 3,
    color: "accent-primary",
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
    color: "accent-secondary",
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
    color: "emerald",
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
    color: "purple",
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
  <motion.div
    whileHover={{ y: -5, x: 2 }}
    whileTap={{ scale: 0.98 }}
    className="premium-card !p-5 group cursor-grab active:cursor-grabbing border-white/5 hover:border-accent-primary/30 transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <GripVertical className="w-4 h-4 text-on-surface-variant/40" />
    </div>

    <div className="flex items-center justify-between mb-4">
      <div
        className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border ${
          priority === "High"
            ? "bg-red-500/10 text-red-500 border-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
            : priority === "Medium"
              ? "bg-amber-500/10 text-amber-500 border-amber-500/10"
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
        }`}
      >
        {priority} PRIORITY
      </div>
      <button className="p-1 rounded-lg hover:bg-white/5 text-on-surface-variant transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    <div className="space-y-1">
      <h4 className="font-display font-black text-xl text-white italic tracking-tight uppercase">
        {client}
      </h4>
      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
        {project}
      </p>
    </div>

    <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/5">
      <div className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.15em]">
        <Calendar className="w-3.5 h-3.5 text-accent-primary" />
        {date}
      </div>
      <div className="flex items-center gap-1.5 text-lg font-display font-black text-white italic tabular-nums">
        {value}
      </div>
    </div>
  </motion.div>
);

export const Pipeline: React.FC = () => {
  return (
    <motion.div
      variants={dashboardContainerVariants}
      initial={false}
      animate="visible"
      className="h-[calc(100vh-12rem)] flex flex-col space-y-10"
    >
      <motion.div variants={dashboardItemVariants}>
        <PageHeader
          title={
            <>
              PROJECT <br />
              PIPELINE
            </>
          }
          subtitle={
            <>
              FLOW STATUS: <span className="text-emerald-400">OPTIMAL</span>
            </>
          }
          actions={
            <>
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-black text-[10px] font-black uppercase tracking-widest transition-all">
                  <Layout className="w-3.5 h-3.5" />
                  BOARD
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-on-surface-variant hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
                  <ListIcon className="w-3.5 h-3.5" />
                  LIST
                </button>
              </div>
              <PremiumButton variant="primary" icon={Plus}>
                ADD LEAD
              </PremiumButton>
            </>
          }
        />
      </motion.div>

      <div className="flex-1 flex gap-8 overflow-x-auto no-scrollbar pb-10 min-h-0">
        {pipelineData.map((column, idx) => (
          <motion.div
            key={column.title}
            variants={dashboardItemVariants}
            className="flex-shrink-0 w-[22rem] flex flex-col gap-6"
          >
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-6 rounded-full bg-${column.color === "accent-primary" ? "accent-primary" : column.color === "accent-secondary" ? "accent-secondary" : column.color}-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                />
                <h3 className="font-display font-black text-xl text-white italic tracking-tight uppercase">
                  {column.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-white text-[10px] font-black tabular-nums border border-white/10">
                  {column.count}
                </span>
              </div>
              <button className="p-2 rounded-xl hover:bg-white/5 text-on-surface-variant hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 p-3 rounded-3xl bg-white/[0.015] border border-dashed border-white/10 hover:border-white/20 transition-colors overflow-y-auto no-scrollbar">
              <AnimatePresence mode="popLayout">
                {column.items.map((item) => (
                  <PipelineCard key={item.id} {...item} />
                ))}
              </AnimatePresence>

              <motion.button
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-6 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant hover:text-accent-primary hover:border-accent-primary/40 transition-all flex items-center justify-center gap-3 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                INITIATE NEW ITEM
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
