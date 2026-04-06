import React from "react";
import { Layout, CloudUpload } from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioData } from "@/shared/types";
import { Input } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";

interface SiteIdentitySectionProps {
  hero: PortfolioData["hero"];
  onUpdateHero: (field: keyof PortfolioData["hero"], value: string) => void;
}

export const SiteIdentitySection: React.FC<SiteIdentitySectionProps> = ({
  hero,
  onUpdateHero,
}) => {
  return (
    <motion.div className="premium-card space-y-8">
      <IconTitle
        icon={
          <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
            <Layout className="w-5 h-5" />
          </div>
        }
        title="Site Identity"
      />
      <div className="space-y-6">
        <div className="space-y-3">
          <EditorLabel>Site Title</EditorLabel>
          <Input
            type="text"
            value={hero.name || ""}
            onChange={(event) => onUpdateHero("name", event.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-black tracking-widest text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 outline-none transition-all"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Contact Email</EditorLabel>
          <Input
            type="email"
            value={hero.email || ""}
            onChange={(event) => onUpdateHero("email", event.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-black tracking-widest text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 outline-none transition-all"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Availability</EditorLabel>
          <Input
            type="text"
            value={hero.availability || ""}
            onChange={(event) =>
              onUpdateHero("availability", event.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-black tracking-widest text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 outline-none transition-all"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Hero Image Metadata</EditorLabel>
          <div className="w-full h-28 rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center gap-3 transition-all group">
            <CloudUpload className="w-6 h-6 text-on-surface-variant group-hover:text-accent-primary" />
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
              Use /public/identity.png in current build
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
