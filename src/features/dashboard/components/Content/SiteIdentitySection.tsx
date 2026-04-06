import React from "react";
import { Layout, CloudUpload } from "lucide-react";
import type { PortfolioData } from "@/shared/types";
import { Input } from "@/components/ui";
import { EditorLabel, IconTitle } from "./shared";
import { PanelCard } from "../common";

interface SiteIdentitySectionProps {
  hero: PortfolioData["hero"];
  onUpdateHero: (field: keyof PortfolioData["hero"], value: string) => void;
}

export const SiteIdentitySection: React.FC<SiteIdentitySectionProps> = ({
  hero,
  onUpdateHero,
}) => {
  return (
    <PanelCard
      className="p-6"
      contentClassName="space-y-8"
      title={
        <IconTitle
          icon={
            <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Layout className="w-5 h-5" />
            </div>
          }
          title="Site Identity"
        />
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <EditorLabel>Site Title</EditorLabel>
          <Input
            type="text"
            value={hero.name || ""}
            onChange={(event) => onUpdateHero("name", event.target.value)}
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm text-foreground focus:ring-2 focus:ring-ring/30 outline-none"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Contact Email</EditorLabel>
          <Input
            type="email"
            value={hero.email || ""}
            onChange={(event) => onUpdateHero("email", event.target.value)}
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm text-foreground focus:ring-2 focus:ring-ring/30 outline-none"
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
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm text-foreground focus:ring-2 focus:ring-ring/30 outline-none"
          />
        </div>
        <div className="space-y-3">
          <EditorLabel>Hero Image Metadata</EditorLabel>
          <div className="w-full h-28 rounded-3xl border-2 border-dashed border-border flex items-center justify-center gap-3">
            <CloudUpload className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Use /public/identity.png in current build
            </span>
          </div>
        </div>
      </div>
    </PanelCard>
  );
};
