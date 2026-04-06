import React from "react";
import { Globe, Trash2 } from "lucide-react";
import type { PortfolioData, Testimonial } from "@/shared/types";
import { Input, Textarea } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";
import { PanelCard } from "../common";

interface TestimonialsSectionProps {
  testimonials: PortfolioData["testimonials"];
  onUpdateTestimonial: (
    index: number,
    field: keyof Testimonial,
    value: string,
  ) => void;
  onAddTestimonial: () => void;
  onRemoveTestimonial: (index: number) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onUpdateTestimonial,
  onAddTestimonial,
  onRemoveTestimonial,
}) => {
  return (
    <PanelCard
      className="p-6"
      contentClassName="space-y-8"
      title={
        <IconTitle
          icon={
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Globe className="w-5 h-5" />
            </div>
          }
          title="Testimonials"
        />
      }
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <EditorLabel>Client Voices</EditorLabel>
          <button
            type="button"
            onClick={onAddTestimonial}
            className="text-xs text-primary font-semibold"
          >
            Add Quote
          </button>
        </div>
        {testimonials.map((item, index) => (
          <div
            key={`${item.author}-${index}`}
            className="space-y-2 bg-muted/20 border border-border rounded-xl p-3"
          >
            <Textarea
              rows={3}
              value={item.quote}
              onChange={(event) =>
                onUpdateTestimonial(index, "quote", event.target.value)
              }
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground resize-none"
            />
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input
                value={item.author}
                onChange={(event) =>
                  onUpdateTestimonial(index, "author", event.target.value)
                }
                className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
              />
              <Input
                value={item.company}
                onChange={(event) =>
                  onUpdateTestimonial(index, "company", event.target.value)
                }
                className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground"
              />
              <button
                type="button"
                onClick={() => onRemoveTestimonial(index)}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                aria-label="Delete testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};
