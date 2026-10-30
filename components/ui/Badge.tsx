import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pending' | 'in-progress' | 'completed' | 'confirmed' | 'cancelled' | 'new' | 'warning';
  className?: string;
}

// Status words arrive as "PENDING", "pending" or "in-progress". Show them in
// sentence case ("In progress"). Leave mixed-case text, ids and numbers alone.
const toLabel = (children: React.ReactNode) => {
  if (typeof children !== 'string' || !/^[A-Za-z _-]+$/.test(children)) return children;
  if (children !== children.toUpperCase() && children !== children.toLowerCase()) return children;
  const words = children.toLowerCase().replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export const Badge = ({ children, variant = 'new', className }: BadgeProps) => {
  const variants = {
    pending: 'bg-zinc-200 text-zinc-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    confirmed: 'bg-sky-100 text-sky-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    new: 'bg-safety-orange text-white',
    warning: 'bg-red-100 text-red-800',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold border border-black/10',
      variants[variant],
      className
    )}>
      {toLabel(children)}
    </span>
  );
};
