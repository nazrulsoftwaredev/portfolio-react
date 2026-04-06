import React from "react";
import { Button } from "@/components/ui";

interface PremiumButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ElementType;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-transparent hover:bg-muted",
  };

  const sizes = {
    sm: "h-auto px-4 py-2 text-xs",
    md: "h-auto px-6 py-3 text-sm",
    lg: "h-auto px-8 py-4 text-base",
  };

  return (
    <Button
      type={type}
      className={`rounded-2xl font-bold ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </Button>
  );
};
