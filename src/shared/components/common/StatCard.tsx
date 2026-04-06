import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const StatCard = ({
  label,
  value,
  icon: Icon,
  color = "#ba9eff",
  gradient = "from-primary/20 to-primary/5",
  border = "border-primary/20",
  subtext,
  trend = null, // { value: number, direction: 'up' | 'down' | 'neutral' }
  onClick,
  isLoading = false,
  layout = "default", // 'default' | 'compact' | 'large'
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-on-surface-variant" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "text-on-surface-variant";
    switch (trend.direction) {
      case "up":
        return "text-emerald-400";
      case "down":
        return "text-red-400";
      default:
        return "text-on-surface-variant";
    }
  };

  const layoutClasses = {
    default: "p-6",
    compact: "p-4",
    large: "p-8",
  };

  const valueSize = {
    default: "text-3xl",
    compact: "text-2xl",
    large: "text-4xl",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gradient-to-br ${gradient} ${border} border backdrop-blur-xl rounded-2xl ${layoutClasses[layout]} cursor-pointer hover:border-primary/40 transition-all group relative overflow-hidden text-left w-full disabled:opacity-50`}
    >
      {/* Gradient Background */}
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: color }}
      />

      <div className="relative z-10 space-y-4">
        {/* Header with Icon */}
        <div className="flex items-start justify-between">
          {Icon && <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />}
          {isLoading && (
            <div className="w-5 h-5 rounded-full border-2 border-on-surface-variant border-t-primary animate-spin" />
          )}
        </div>

        {/* Value */}
        <div>
          <p
            className={`${valueSize[layout]} font-light font-mono mb-1 tracking-tight text-on-surface`}
          >
            {value}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            {label}
          </p>
        </div>

        {/* Trend Indicator & Subtext */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] font-mono text-on-surface-variant">
            {subtext}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-[10px] font-semibold">
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};
