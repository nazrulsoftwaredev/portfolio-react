import React from "react";
import { Trash2, Type } from "lucide-react";
import type { Expertise, PortfolioData, TechDomain } from "@/shared/types";
import { Input, Textarea } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";
import { PanelCard } from "../common";

interface ExpertiseTechSectionProps {
  expertise: PortfolioData["expertise"];
  techStack: PortfolioData["techStack"];
  onUpdateExpertise: (
    index: number,
    field: keyof Expertise,
    value: string,
  ) => void;
  onAddExpertise: () => void;
  onRemoveExpertise: (index: number) => void;
  onUpdateTechDomain: (
    index: number,
    field: keyof TechDomain,
    value: string,
  ) => void;
  onAddTechDomain: () => void;
  onRemoveTechDomain: (index: number) => void;
}

export const ExpertiseTechSection: React.FC<ExpertiseTechSectionProps> = ({
  expertise,
  techStack,
  onUpdateExpertise,
  onAddExpertise,
  onRemoveExpertise,
  onUpdateTechDomain,
  onAddTechDomain,
  onRemoveTechDomain,
}) => {
  const fieldClassName =
    "bg-background border border-border rounded-xl px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none";

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
          title="Expertise + Tech"
        />
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <EditorLabel>Expertise Items</EditorLabel>
            <button
              type="button"
              onClick={onAddExpertise}
              className="text-xs text-primary font-semibold"
            >
              Add Expertise
            </button>
          </div>
          {expertise.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="space-y-2 bg-muted/20 border border-border rounded-xl p-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  value={item.title}
                  onChange={(event) =>
                    onUpdateExpertise(index, "title", event.target.value)
                  }
                  className={fieldClassName}
                />
                <Input
                  value={item.category}
                  onChange={(event) =>
                    onUpdateExpertise(index, "category", event.target.value)
                  }
                  className={fieldClassName}
                />
              </div>
              <div className="flex gap-2">
                <Textarea
                  rows={2}
                  value={item.description}
                  onChange={(event) =>
                    onUpdateExpertise(index, "description", event.target.value)
                  }
                  className={`${fieldClassName} flex-1 resize-none`}
                />
                <button
                  type="button"
                  onClick={() => onRemoveExpertise(index)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  aria-label="Delete expertise item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <EditorLabel>Tech Stack Domains</EditorLabel>
            <button
              type="button"
              onClick={onAddTechDomain}
              className="text-xs text-primary font-semibold"
            >
              Add Domain
            </button>
          </div>
          {techStack.map((domain, index) => (
            <div
              key={`${domain.category}-${index}`}
              className="space-y-2 bg-muted/20 border border-border rounded-xl p-3"
            >
              <Input
                value={domain.category}
                onChange={(event) =>
                  onUpdateTechDomain(index, "category", event.target.value)
                }
                className={`w-full ${fieldClassName}`}
              />
              <div className="flex gap-2">
                <Input
                  value={domain.items.join(", ")}
                  onChange={(event) =>
                    onUpdateTechDomain(index, "items", event.target.value)
                  }
                  className={`flex-1 ${fieldClassName}`}
                />
                <button
                  type="button"
                  onClick={() => onRemoveTechDomain(index)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  aria-label="Delete tech domain"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Separate tools with commas
              </p>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  );
};
