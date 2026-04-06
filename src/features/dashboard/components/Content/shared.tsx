import React from "react";

export const EditorLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <label className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-[0.12em]">
    {children}
  </label>
);

export const IconTitle: React.FC<{
  icon: React.ReactNode;
  title: string;
}> = ({ icon, title }) => (
  <h3 className="text-xl font-display font-semibold flex items-center gap-4 text-foreground uppercase tracking-tight">
    {icon}
    {title}
  </h3>
);
