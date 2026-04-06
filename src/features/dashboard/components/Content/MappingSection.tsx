import React from "react";
import { Link as LinkIcon } from "lucide-react";
import type { PortfolioData } from "@/shared/types";
import { IconTitle } from "./shared";

interface MappingSectionProps {
  draft: PortfolioData;
}

export const MappingSection: React.FC<MappingSectionProps> = ({ draft }) => {
  return (
    <div className="premium-card space-y-6">
      <IconTitle
        icon={
          <div className="p-2 rounded-xl bg-white/5 text-on-surface-variant border border-white/10">
            <LinkIcon className="w-5 h-5" />
          </div>
        }
        title="Live Field Mapping"
      />
      <div className="space-y-2 text-xs text-on-surface-variant uppercase tracking-[0.2em] font-bold">
        <p>Hero + Header + Footer Name: {draft.hero.name || "-"}</p>
        <p>Contact Email: {draft.hero.email || "-"}</p>
        <p>Hero Availability: {draft.hero.availability || "-"}</p>
        <p>About Focus Items: {(draft.about.focusItems || []).length}</p>
        <p>Projects on Website: {draft.projects.length}</p>
        <p>Expertise Cards: {draft.expertise.length}</p>
        <p>Tech Domains: {draft.techStack.length}</p>
        <p>Testimonials: {draft.testimonials.length}</p>
      </div>
    </div>
  );
};
