import React from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import type { AboutContent, FocusItem, PortfolioData } from "@/shared/types";
import { Input, Textarea } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";
import { PanelCard } from "../common";

interface AboutSectionProps {
  about: PortfolioData["about"];
  onUpdateAbout: (field: keyof AboutContent, value: string) => void;
  onUpdateFocusItem: (
    index: number,
    field: keyof FocusItem,
    value: string,
  ) => void;
  onAddFocusItem: () => void;
  onRemoveFocusItem: (index: number) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  onUpdateAbout,
  onUpdateFocusItem,
  onAddFocusItem,
  onRemoveFocusItem,
}) => {
  return (
    <PanelCard
      className="p-6"
      contentClassName="space-y-8"
      title={
        <IconTitle
          icon={
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <ImageIcon className="w-5 h-5" />
            </div>
          }
          title="About Section"
        />
      }
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <EditorLabel>Scrub Text</EditorLabel>
          <Textarea
            rows={2}
            value={about.scrubText || ""}
            onChange={(event) => onUpdateAbout("scrubText", event.target.value)}
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm text-foreground resize-none"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Bio Text</EditorLabel>
          <Textarea
            rows={3}
            value={about.bioText || ""}
            onChange={(event) => onUpdateAbout("bioText", event.target.value)}
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm text-foreground resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <EditorLabel>Focus Items</EditorLabel>
            <button
              type="button"
              onClick={onAddFocusItem}
              className="text-xs text-primary font-semibold"
            >
              Add Item
            </button>
          </div>
          {(about.focusItems || []).map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="space-y-2 bg-muted/20 border border-border rounded-xl p-3"
            >
              <div className="flex items-center gap-2">
                <Input
                  value={item.title}
                  onChange={(event) =>
                    onUpdateFocusItem(index, "title", event.target.value)
                  }
                  className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
                />
                <button
                  type="button"
                  onClick={() => onRemoveFocusItem(index)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  aria-label="Delete focus item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Textarea
                rows={2}
                value={item.description}
                onChange={(event) =>
                  onUpdateFocusItem(index, "description", event.target.value)
                }
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  );
};
