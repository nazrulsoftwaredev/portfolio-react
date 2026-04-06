import React from "react";

export const EditorLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <label className="text-xs md:text-sm font-medium text-muted-foreground">
    {children}
  </label>
);

export const IconTitle: React.FC<{
  icon: React.ReactNode;
  title: string;
}> = ({ icon, title }) => (
  <h3 className="text-xl font-display font-semibold flex items-center gap-4 text-foreground tracking-tight">
    {icon}
    {title}
  </h3>
);
