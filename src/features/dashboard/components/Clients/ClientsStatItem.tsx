import React from "react";
import { motion, type Variants } from "framer-motion";

interface ClientsStatItemProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
  variants: Variants;
}

export const ClientsStatItem: React.FC<ClientsStatItemProps> = ({
  label,
  value,
  trend,
  icon: Icon,
  variants,
}) => (
  <motion.div
    variants={variants}
    className="premium-card group relative overflow-hidden"
  >
    <div className="absolute -right-4 -top-4 w-20 h-20 bg-accent-primary/5 rounded-full blur-2xl group-hover:bg-accent-primary/10 transition-colors" />
    <div className="flex items-center justify-between relative z-10">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-on-surface-variant group-hover:text-white transition-colors group-hover:scale-110 duration-500">
        <Icon className="w-5 h-5" />
      </div>
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider border ${
          trend.startsWith("+")
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
            : trend === "0%"
              ? "bg-white/5 text-on-surface-variant border-white/5"
              : "bg-red-500/10 text-red-400 border-red-500/10"
        }`}
      >
        {trend}
      </div>
    </div>
    <div className="mt-6 relative z-10">
      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">
        {label}
      </p>
      <h3 className="text-3xl font-display font-black text-white mt-1 italic tracking-tight">
        {value}
      </h3>
    </div>
  </motion.div>
);
