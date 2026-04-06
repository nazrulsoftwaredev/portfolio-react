import React from "react";
import { motion } from "framer-motion";
import { Edit3, Eye, Trash2 } from "lucide-react";
import type { ProjectGalleryItem } from "@/shared/types";
import {
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
  <motion.div className="premium-card !p-0 overflow-hidden group border-white/5 hover:border-accent-primary/40 transition-all duration-500">
    <div className="aspect-video relative overflow-hidden bg-surface">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-2xl bg-white text-black shadow-xl"
          type="button"
        >
          <Edit3 className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-2xl bg-accent-primary text-black shadow-xl"
          type="button"
        >
          <Eye className="w-5 h-5" />
        </motion.button>
      </div>
      <div
        className={`absolute top-5 right-5 px-4 py-1.5 rounded-full backdrop-blur-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
          project.status === "Published"
            ? "bg-emerald-500 text-white border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            : "bg-white/10 text-white border-white/20"
        }`}
      >
        {project.status || "Draft"}
      </div>
    </div>

    <div className="p-6 space-y-3 bg-white/[0.01]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-black text-xl text-white italic tracking-tight uppercase">
            {project.title || "Untitled Project"}
          </h4>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
            {project.category || "Uncategorized"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="p-3 rounded-xl hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 transition-all border border-transparent hover:border-red-500/20 group"
          aria-label="Delete project"
        >
          <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Input
          value={project.title}
          onChange={(event) => onChange(index, "title", event.target.value)}
          placeholder="Project title"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50 outline-none transition-all"
        />
        <Input
          value={project.category}
          onChange={(event) => onChange(index, "category", event.target.value)}
          placeholder="Category"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50 outline-none transition-all"
        />
        <Input
          value={project.img}
          onChange={(event) => onChange(index, "img", event.target.value)}
          placeholder="Image URL"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50 outline-none transition-all"
        />
        <Input
          value={project.liveUrl}
          onChange={(event) => onChange(index, "liveUrl", event.target.value)}
          placeholder="Live URL"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50 outline-none transition-all"
        />
        <Textarea
          value={project.desc}
          onChange={(event) => onChange(index, "desc", event.target.value)}
          rows={3}
          placeholder="Project description"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold tracking-wider text-white focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50 outline-none transition-all resize-none"
        />
        <Select
          value={project.status || "Draft"}
          onValueChange={(value) => onChange(index, "status", value)}
        >
          <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-auto text-xs font-bold tracking-wider text-white focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-white/10 text-white">
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </motion.div>
);
