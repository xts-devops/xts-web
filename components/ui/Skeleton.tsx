import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Animated placeholder used in loading states. Wraps a div with a shimmer
 * pulse so list rows don't pop in cold while data is fetched.
 */
export const Skeleton = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      'animate-pulse rounded-sm bg-zinc-800/60',
      className
    )}
  />
);

/** A shop product card placeholder, same shape and surface as ProductCard. */
export const ProductCardSkeleton = () => (
  <div className="catalog-card catalog-skeleton" aria-hidden="true">
    <div className="catalog-photo">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
    <div className="catalog-info">
      <Skeleton className="skeleton-category w-1/3" />
      <Skeleton className="skeleton-name w-3/4" />
      <Skeleton className="skeleton-meta w-1/3" />
    </div>
    <div className="catalog-bottom">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-11 w-11" />
    </div>
  </div>
);

/** A horizontal row placeholder for dashboards / tables. */
export const RowSkeleton = () => (
  <div className="flex items-center justify-between gap-6 p-6 border border-white/5 rounded-sm">
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <Skeleton className="h-10 w-24" />
  </div>
);
