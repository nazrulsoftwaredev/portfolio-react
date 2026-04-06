import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { PanelCard } from "../common";

export interface ContentSectionOption {
  id: string;
  label: string;
  count?: number;
}

interface SectionSwitcherProps {
  sections: ContentSectionOption[];
  activeSection: string;
  onChange: (sectionId: string) => void;
}

export const SectionSwitcher: React.FC<SectionSwitcherProps> = ({
  sections,
  activeSection,
  onChange,
}) => {
  return (
    <PanelCard className="p-6" contentClassName="space-y-5">
      <Tabs value={activeSection} onValueChange={onChange}>
        <TabsList className="h-auto w-full flex flex-wrap items-center gap-4 bg-transparent p-0">
          {sections.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className={`rounded-xl border px-5 py-3 text-xs md:text-sm font-semibold ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground"
                }`}
              >
                <span>{section.label}</span>
                {typeof section.count === "number" && (
                  <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold">
                    {section.count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <p className="text-xs md:text-sm font-medium text-muted-foreground">
        Edit one section at a time from the tabs above.
      </p>
    </PanelCard>
  );
};
