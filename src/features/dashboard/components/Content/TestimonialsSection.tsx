import React from "react";
import { Globe, Trash2 } from "lucide-react";
import type { PortfolioData, Testimonial } from "@/shared/types";
import { Input, Textarea } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";

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
    <div className="premium-card space-y-8">
      <IconTitle
        icon={
          <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
            <Globe className="w-5 h-5" />
          </div>
        }
        title="Testimonials"
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <EditorLabel>Client Voices</EditorLabel>
          <button
            type="button"
            onClick={onAddTestimonial}
            className="text-[10px] uppercase tracking-[0.2em] text-accent-primary font-black"
          >
            Add Quote
          </button>
        </div>
        {testimonials.map((item, index) => (
          <div
            key={`${item.author}-${index}`}
            className="space-y-2 bg-white/[0.02] border border-white/10 rounded-xl p-3"
          >
            <Textarea
              rows={3}
              value={item.quote}
              onChange={(event) =>
                onUpdateTestimonial(index, "quote", event.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white resize-none"
            />
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input
                value={item.author}
                onChange={(event) =>
                  onUpdateTestimonial(index, "author", event.target.value)
                }
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white"
              />
              <Input
                value={item.company}
                onChange={(event) =>
                  onUpdateTestimonial(index, "company", event.target.value)
                }
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white"
              />
              <button
                type="button"
                onClick={() => onRemoveTestimonial(index)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-on-surface-variant hover:text-red-500"
                aria-label="Delete testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
