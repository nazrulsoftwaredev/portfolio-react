import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface PanelCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  title,
  subtitle,
  actions,
  className = "",
  headerClassName = "",
  contentClassName = "space-y-5",
  children,
}) => {
  const titleContent = title ? (
    typeof title === "string" ? (
      <CardTitle className="text-lg font-display font-semibold tracking-tight text-foreground">
        {title}
      </CardTitle>
    ) : (
      title
    )
  ) : null;

  const subtitleContent = subtitle ? (
    typeof subtitle === "string" ? (
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    ) : (
      <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
    )
  ) : null;

  return (
    <Card className={`premium-card ${className}`}>
      {(title || subtitle || actions) && (
        <CardHeader className={`mb-0 p-0 pb-5 ${headerClassName}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              {titleContent}
              {subtitleContent}
            </div>
            {actions ? (
              <div className="flex items-center gap-2">{actions}</div>
            ) : null}
          </div>
        </CardHeader>
      )}
      <CardContent className={`p-0 ${contentClassName}`}>
        {children}
      </CardContent>
    </Card>
  );
};
