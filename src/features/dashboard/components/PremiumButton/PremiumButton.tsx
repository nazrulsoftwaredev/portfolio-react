import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Button } from "@/components/ui";

interface PremiumButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children" | "size" | "type"
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
    primary:
      "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    secondary:
      "bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30 border border-accent-primary/20",
    outline:
      "bg-transparent text-white border border-white/10 hover:border-white/30 hover:bg-white/5",
  };

  const sizes = {
    sm: "h-auto px-4 py-2 text-xs",
    md: "h-auto px-6 py-3 text-sm",
    lg: "h-auto px-8 py-4 text-base",
  };

  return (
    <Button
      asChild
      type={type}
      className={`relative overflow-hidden rounded-2xl font-bold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {Icon && <Icon className="w-4 h-4 relative z-10" />}
        <span className="relative z-10">{children}</span>
      </motion.button>
    </Button>
  );
};
