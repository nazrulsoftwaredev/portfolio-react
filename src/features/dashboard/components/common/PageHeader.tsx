import React from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const subtitleContent = subtitle ? (
    typeof subtitle === "string" ? (
      <p
        className={`text-muted-foreground mt-1.5 text-xs sm:text-sm ${subtitleClassName}`}
      >
        {subtitle}
      </p>
    ) : (
      <div className={`mt-1.5 text-xs sm:text-sm ${subtitleClassName}`}>
        {subtitle}
      </div>
    )
  ) : null;

  return (
    <div
      className={`flex flex-col xl:flex-row xl:items-end justify-between gap-3 md:gap-4 ${className}`}
    >
      <div className="max-w-2xl">
        <h2
          className={`text-xl sm:text-2xl font-display font-semibold tracking-tight text-foreground leading-tight ${titleClassName}`}
        >
          {title}
        </h2>
        {subtitleContent}
      </div>

      {actions ? (
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 xl:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
};
