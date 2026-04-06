import React from "react";
import { motion } from "framer-motion";
import { GripVertical, Plus, Trash2, Type } from "lucide-react";
import type { PortfolioData } from "@/shared/types";
import { Button, Checkbox, Input } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";

interface NavigationSectionProps {
  navigation: PortfolioData["hero"]["navigation"];
  onUpdate: (
    index: number,
    field: "label" | "href" | "isRoute",
    value: string | boolean,
  ) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  navigation,
  onUpdate,
  onMove,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="premium-card space-y-8">
      <IconTitle
        icon={
          <div className="p-2 rounded-xl bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20">
            <Type className="w-5 h-5" />
          </div>
        }
        title="Navigation Log"
      />
      <div className="space-y-3">
        {(navigation || []).map((item, index) => (
          <motion.div
            key={`${item.label}-${index}`}
            whileHover={{ x: 5 }}
            className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 group hover:border-accent-secondary/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-on-surface-variant/40 group-hover:text-accent-secondary transition-colors" />
              <Input
                value={item.label}
                onChange={(event) =>
                  onUpdate(index, "label", event.target.value)
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black tracking-[0.2em] text-white"
              />
              <Button
                type="button"
                onClick={() => onMove(index, -1)}
                variant="ghost"
                size="sm"
                className="text-xs text-on-surface-variant hover:text-white h-8"
                aria-label="Move navigation up"
              >
                ↑
              </Button>
              <Button
                type="button"
                onClick={() => onMove(index, 1)}
                variant="ghost"
                size="sm"
                className="text-xs text-on-surface-variant hover:text-white h-8"
                aria-label="Move navigation down"
              >
                ↓
              </Button>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <Input
                value={item.href}
                onChange={(event) =>
                  onUpdate(index, "href", event.target.value)
                }
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-bold tracking-[0.1em] text-white"
              />
              <label className="flex items-center gap-2 text-[10px] uppercase text-on-surface-variant font-bold">
                <Checkbox
                  checked={Boolean(item.isRoute)}
                  onCheckedChange={(value) =>
                    onUpdate(index, "isRoute", Boolean(value))
                  }
                />
                Route
              </label>
              <Button
                type="button"
                onClick={() => onRemove(index)}
                variant="ghost"
                size="icon"
                className="p-2 rounded-lg hover:bg-red-500/10 text-on-surface-variant hover:text-red-500"
                aria-label="Delete navigation item"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}

        <div className="flex items-center justify-between">
          <EditorLabel>Navigation Nodes</EditorLabel>
          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdd}
            className="rounded-xl border border-dashed border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-accent-secondary hover:border-accent-secondary/40 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Node
          </motion.button>
        </div>
      </div>
    </div>
  );
};
