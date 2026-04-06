import React from "react";
import { Link as LinkIcon } from "lucide-react";
import type { PortfolioData } from "@/shared/types";
import { IconTitle } from "./shared";
import { PanelCard } from "../common";

interface MappingSectionProps {
  draft: PortfolioData;
}

export const MappingSection: React.FC<MappingSectionProps> = ({ draft }) => {
  return (
    <PanelCard
      className="p-6"
      contentClassName="space-y-6"
      title={
        <IconTitle
          icon={
            <div className="p-2 rounded-xl bg-muted text-muted-foreground border border-border">
              <LinkIcon className="w-5 h-5" />
            </div>
          }
          title="Live Field Mapping"
        />
      }
    >
      <div className="space-y-2 text-xs text-muted-foreground font-medium">
        <p>Hero + Header + Footer Name: {draft.hero.name || "-"}</p>
        <p>Contact Email: {draft.hero.email || "-"}</p>
        <p>Hero Availability: {draft.hero.availability || "-"}</p>
        <p>About Focus Items: {(draft.about.focusItems || []).length}</p>
        <p>Projects on Website: {draft.projects.length}</p>
        <p>Expertise Cards: {draft.expertise.length}</p>
        <p>Tech Domains: {draft.techStack.length}</p>
        <p>Testimonials: {draft.testimonials.length}</p>
      </div>
    </PanelCard>
  );
};
