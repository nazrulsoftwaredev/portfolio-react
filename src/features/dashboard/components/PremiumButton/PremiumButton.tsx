import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PremiumButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType;
  children: React.ReactNode;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    secondary: 'bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30 border border-accent-primary/20',
    outline: 'bg-transparent text-white border border-white/10 hover:border-white/30 hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-2xl font-bold flex items-center justify-center gap-2 
        transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {Icon && <Icon className="w-4 h-4 relative z-10" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
