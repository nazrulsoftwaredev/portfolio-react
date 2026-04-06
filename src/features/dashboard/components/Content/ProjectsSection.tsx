import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { PortfolioData, ProjectGalleryItem } from "@/shared/types";
import { Button, Tabs, TabsList, TabsTrigger } from "@/components/ui";
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
          <h3 className="text-2xl font-display font-semibold text-foreground uppercase tracking-tight">
            Portfolio Index
          </h3>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mt-1">
            MASTER ARCHIVE DATA
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as ViewMode)}
          >
            <TabsList className="bg-muted/40 border border-border rounded-2xl">
              <TabsTrigger
                value="grid"
                className="text-[10px] uppercase tracking-widest"
              >
                Grid
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="text-[10px] uppercase tracking-widest"
              >
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-xl"
            type="button"
            onClick={onAddProject}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Add</span>
          </Button>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-8"
            : "space-y-8"
        }
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            project={project}
            index={index}
            onChange={onUpdateProject}
            onDelete={onRemoveProject}
          />
        ))}
      </div>
    </div>
  );
};
