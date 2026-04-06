import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface PanelCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  title,
  subtitle,
  className = "",
  contentClassName = "space-y-6",
  children,
}) => {
  return (
    <Card className={`premium-card ${className}`}>
      {(title || subtitle) && (
        <CardHeader className="mb-0 p-0 pb-6">
          {title ? (
            <CardTitle className="text-xl font-display font-semibold tracking-tight text-foreground uppercase">
              {title}
            </CardTitle>
          ) : null}
          {subtitle ? (
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mt-1">
              {subtitle}
            </p>
          ) : null}
        </CardHeader>
      )}
      <CardContent className={`p-0 ${contentClassName}`}>
        {children}
      </CardContent>
    </Card>
  );
};
