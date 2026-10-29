"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Package } from 'lucide-react';

/** Optimizes bundled samples; leaves arbitrary seller storage URLs compatible. */
export function ProductImage({ src, name, priority = false, sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw' }: {
  src: string; name: string; priority?: boolean; sizes?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src) return (
    <div className="image-unavailable"><Package size={36} aria-hidden="true" /><span>Image unavailable</span></div>
  );
  return <Image src={src} alt={name} fill sizes={sizes} priority={priority}
    unoptimized={!src.startsWith('/images/products/')}
    onError={() => setFailedSrc(src)} className="object-contain transition-transform duration-300 group-hover:scale-105" />;
}
