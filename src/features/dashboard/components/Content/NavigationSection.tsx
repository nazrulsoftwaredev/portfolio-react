import React from "react";
import { GripVertical, Plus, Trash2, Type } from "lucide-react";
import type { PortfolioData } from "@/shared/types";
import { Button, Checkbox, Input } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";
import { PanelCard } from "../common";

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
    <PanelCard
      className="p-6"
      contentClassName="space-y-8"
      title={
        <IconTitle
          icon={
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary-foreground border border-border">
              <Type className="w-5 h-5" />
            </div>
          }
          title="Navigation Log"
        />
      }
    >
      <div className="space-y-3">
        {(navigation || []).map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <Input
                value={item.label}
                onChange={(event) =>
                  onUpdate(index, "label", event.target.value)
                }
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
              />
              <Button
                type="button"
                onClick={() => onMove(index, -1)}
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground h-8"
                aria-label="Move navigation up"
              >
                ↑
              </Button>
              <Button
                type="button"
                onClick={() => onMove(index, 1)}
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground h-8"
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
                className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
              />
              <label className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
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
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                aria-label="Delete navigation item"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <EditorLabel>Navigation Nodes</EditorLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="rounded-xl border-dashed px-4 py-2 text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            New Node
          </Button>
        </div>
      </div>
    </PanelCard>
  );
};
