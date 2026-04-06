import React from "react";
import { Edit3, Eye, Trash2 } from "lucide-react";
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
  <div className="premium-card !p-0 overflow-hidden">
    <div className="aspect-video relative overflow-hidden bg-muted">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[1px]">
        <Button size="icon-lg" variant="secondary" type="button">
          <Edit3 className="w-5 h-5" />
        </Button>
        <Button size="icon-lg" type="button">
          <Eye className="w-5 h-5" />
        </Button>
      </div>
      <div
        className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] border ${
          project.status === "Published"
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            : "bg-muted text-muted-foreground border-border"
        }`}
      >
        {project.status || "Draft"}
      </div>
    </div>

    <div className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-semibold text-xl text-foreground tracking-tight uppercase">
            {project.title || "Untitled Project"}
          </h4>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            {project.category || "Uncategorized"}
          </p>
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

      <div className="grid grid-cols-1 gap-3">
        <Input
          value={project.title}
          onChange={(event) => onChange(index, "title", event.target.value)}
          placeholder="Project title"
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs font-semibold tracking-wider text-foreground"
        />
        <Input
          value={project.category}
          onChange={(event) => onChange(index, "category", event.target.value)}
          placeholder="Category"
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs font-semibold tracking-wider text-foreground"
        />
        <Input
          value={project.img}
          onChange={(event) => onChange(index, "img", event.target.value)}
          placeholder="Image URL"
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs font-semibold tracking-wider text-foreground"
        />
        <Input
          value={project.liveUrl}
          onChange={(event) => onChange(index, "liveUrl", event.target.value)}
          placeholder="Live URL"
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs font-semibold tracking-wider text-foreground"
        />
        <Textarea
          value={project.desc}
          onChange={(event) => onChange(index, "desc", event.target.value)}
          rows={3}
          placeholder="Project description"
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs font-semibold tracking-wider text-foreground resize-none"
        />
        <Select
          value={project.status || "Draft"}
          onValueChange={(value) => onChange(index, "status", value)}
        >
          <SelectTrigger className="w-full bg-background border border-border rounded-xl px-4 py-3 h-auto text-xs font-semibold tracking-wider text-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-foreground">
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);
