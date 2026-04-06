import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";

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
    <div className="premium-card space-y-5">
      <Tabs value={activeSection} onValueChange={onChange}>
        <TabsList className="h-auto w-full flex flex-wrap items-center gap-4 bg-transparent p-0">
          {sections.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className={`rounded-xl border px-5 py-3.5 text-xs md:text-sm font-black uppercase tracking-[0.14em] transition-all ${
                  isActive
                    ? "border-accent-primary bg-accent-primary/95 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                    : "border-white/20 bg-slate-900/70 text-white hover:bg-slate-800/80 hover:border-white/35"
                }`}
              >
                <span>{section.label}</span>
                {typeof section.count === "number" && (
                  <span className="ml-2 rounded-full bg-black/35 px-2.5 py-0.5 text-[10px] font-extrabold">
                    {section.count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <p className="text-xs md:text-sm font-black uppercase tracking-[0.12em] text-white/85">
        Edit one section at a time from the tabs above.
      </p>
    </div>
  );
};
