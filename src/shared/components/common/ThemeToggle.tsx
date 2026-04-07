import React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/theme";

type ThemeToggleProps = {
  className?: string;
  variant?: "compact" | "pill";
};

const options = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "Auto", icon: Monitor },
] as const;

export function ThemeToggle({ className = "", variant = "pill" }: ThemeToggleProps) {
  const { mode, setMode } = useTheme();

  const base =
    variant === "compact"
      ? "inline-flex items-center rounded-xl border border-border bg-muted/40 p-1"
      : "inline-flex items-center rounded-full border border-border bg-muted/30 p-1";

  const btn =
    variant === "compact"
      ? "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition"
      : "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition";

  return (
    <div className={`${base} ${className}`} role="group" aria-label="Theme">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = mode === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMode(opt.id)}
            aria-pressed={active}
            className={`${btn} ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

