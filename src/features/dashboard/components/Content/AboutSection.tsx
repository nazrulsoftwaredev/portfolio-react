import React from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import type { AboutContent, FocusItem, PortfolioData } from "@/shared/types";
import { Input, Textarea } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";

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
    <div className="premium-card space-y-8">
      <IconTitle
        icon={
          <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
            <ImageIcon className="w-5 h-5" />
          </div>
        }
        title="About Section"
      />

      <div className="space-y-4">
        <div className="space-y-3">
          <EditorLabel>Scrub Text</EditorLabel>
          <Textarea
            rows={2}
            value={about.scrubText || ""}
            onChange={(event) => onUpdateAbout("scrubText", event.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold tracking-wide text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 outline-none transition-all resize-none"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Bio Text</EditorLabel>
          <Textarea
            rows={3}
            value={about.bioText || ""}
            onChange={(event) => onUpdateAbout("bioText", event.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold tracking-wide text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <EditorLabel>Focus Items</EditorLabel>
            <button
              type="button"
              onClick={onAddFocusItem}
              className="text-[10px] uppercase tracking-[0.2em] text-accent-primary font-black"
            >
              Add Item
            </button>
          </div>
          {(about.focusItems || []).map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="space-y-2 bg-white/[0.02] border border-white/10 rounded-xl p-3"
            >
              <div className="flex items-center gap-2">
                <Input
                  value={item.title}
                  onChange={(event) =>
                    onUpdateFocusItem(index, "title", event.target.value)
                  }
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white"
                />
                <button
                  type="button"
                  onClick={() => onRemoveFocusItem(index)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-on-surface-variant hover:text-red-500"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
