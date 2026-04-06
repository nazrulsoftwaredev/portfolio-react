import React from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import type { ProjectGalleryItem } from "@/shared/types";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";

interface ProjectCardProps {
  project: ProjectGalleryItem;
  index: number;
  onChange: (
    index: number,
    field: keyof ProjectGalleryItem,
    value: string,
  ) => void;
  onDelete: (index: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onChange,
  onDelete,
}) => (
  <div className="premium-card p-5">
    <div className="grid gap-4 md:grid-cols-[160px_1fr]">
      <div className="space-y-3">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          {project.img ? (
            <img
              src={project.img}
              alt={project.title}
              className="h-32 w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-32 w-full items-center justify-center text-muted-foreground">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="text-[11px] text-muted-foreground truncate">
          {project.img || "No image URL"}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-display font-semibold text-base text-foreground tracking-tight">
              {project.title || "Untitled Project"}
            </h4>
            <p className="text-xs font-medium text-muted-foreground">
              {project.category || "Uncategorized"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                project.status === "Published"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {project.status || "Draft"}
            </div>
            <Button
              type="button"
              onClick={() => onDelete(index)}
              variant="ghost"
              size="icon"
              className="rounded-xl text-muted-foreground hover:text-destructive"
              aria-label="Delete project"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Input
            value={project.title}
            onChange={(event) => onChange(index, "title", event.target.value)}
            placeholder="Project title"
            className="w-full bg-background border border-border rounded-xl px-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              value={project.category}
              onChange={(event) =>
                onChange(index, "category", event.target.value)
              }
              placeholder="Category"
              className="w-full bg-background border border-border rounded-xl px-4"
            />
            <Select
              value={project.status || "Draft"}
              onValueChange={(value) => onChange(index, "status", value)}
            >
              <SelectTrigger className="w-full bg-background border border-border rounded-xl px-4">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border text-foreground">
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            value={project.img}
            onChange={(event) => onChange(index, "img", event.target.value)}
            placeholder="Image URL"
            className="w-full bg-background border border-border rounded-xl px-4"
          />
          <Input
            value={project.liveUrl}
            onChange={(event) => onChange(index, "liveUrl", event.target.value)}
            placeholder="Live URL"
            className="w-full bg-background border border-border rounded-xl px-4"
          />
          <Textarea
            value={project.desc}
            onChange={(event) => onChange(index, "desc", event.target.value)}
            rows={3}
            placeholder="Project description"
            className="w-full bg-background border border-border rounded-xl px-4 resize-none"
          />
        </div>
      </div>
    </div>
  </div>
);
