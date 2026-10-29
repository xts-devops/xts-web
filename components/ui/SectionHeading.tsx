import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  annotation?: string;
  className?: string;
  dark?: boolean;
}

// Page heading for inner pages. Matches the storefront style: sentence case,
// plain weight, short muted label above (no decorative rule or handwriting).
export const SectionHeading = ({ title, annotation, className, dark = false }: SectionHeadingProps) => {
  return (
    <div className={cn("mb-10", className)}>
      {annotation && (
        <p className="text-xs font-semibold text-safety-orange mb-2">{annotation}</p>
      )}
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold tracking-tight leading-tight",
        dark ? "text-[var(--text-primary)]" : "text-esd-dark"
      )}>
        {title}
      </h2>
    </div>
  );
};
