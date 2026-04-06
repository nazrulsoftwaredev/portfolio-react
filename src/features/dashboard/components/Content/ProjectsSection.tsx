import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { PortfolioData, ProjectGalleryItem } from "@/shared/types";
import { PremiumButton } from "../PremiumButton";
import { ProjectCard } from "./ProjectCard";

type ViewMode = "grid" | "list";

interface ProjectsSectionProps {
  projects: PortfolioData["projects"];
  onUpdateProject: (
    index: number,
    field: keyof ProjectGalleryItem,
    value: string,
  ) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onUpdateProject,
  onAddProject,
  onRemoveProject,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tight">
            Portfolio Index
          </h3>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-1">
            MASTER ARCHIVE DATA
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === "grid"
                  ? "bg-accent-primary text-black"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              GRID
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === "list"
                  ? "bg-accent-primary text-black"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              LIST
            </button>
          </div>
          <PremiumButton
            variant="primary"
            icon={Plus}
            size="sm"
            className="!h-10 !w-10 !rounded-xl !p-0"
            type="button"
            onClick={onAddProject}
          >
            <span className="sr-only">ADD</span>
          </PremiumButton>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-8"
            : "space-y-8"
        }
      >
        <AnimatePresence>
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              project={project}
              index={index}
              onChange={onUpdateProject}
              onDelete={onRemoveProject}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
