"use client";

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  disabled,
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-[var(--brand-accent)] text-[#191b1e] hover:bg-[#eaca92] shadow-[0_3px_0_0_#92743e]',
    secondary: 'bg-steel-grey text-esd-dark hover:bg-zinc-200 shadow-[0_4px_0_0_#66757f]',
    ghost: 'bg-transparent text-white hover:bg-white/10',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-[0_4px_0_0_#991b1b]',
    outline: 'border-2 border-safety-orange text-safety-orange hover:bg-safety-orange/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base font-semibold',
    lg: 'px-8 py-4 text-lg font-semibold',
  };

  return (
    <motion.button
      whileTap={{ y: 2 }}
      whileHover={{ y: -1 }}
      className={cn(
        'btn-press inline-flex items-center justify-center rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </motion.button>
  );
};
