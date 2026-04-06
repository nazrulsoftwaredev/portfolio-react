import React from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-6 ${className}`}
    >
      <div>
        <h2 className="text-4xl font-display font-semibold tracking-tighter text-foreground leading-tight uppercase">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-muted-foreground font-semibold mt-2 text-sm uppercase tracking-[0.2em]">
            {subtitle}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex items-center gap-4">{actions}</div>
      ) : null}
    </div>
  );
};
