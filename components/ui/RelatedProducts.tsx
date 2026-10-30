"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProductDTO } from '@/lib/types';
import { recommendProducts } from '@/lib/product-recommendations';
import { productImage } from '@/lib/sample-assets';
import { useCart } from '@/lib/cart-context';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './Skeleton';

export function RelatedProducts({ product }: { product: ProductDTO }) {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [added, setAdded] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const { addToCart } = useCart();
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Catalog unavailable');
      const catalog: ProductDTO[] = await response.json();
      if (!Array.isArray(catalog)) throw new Error('Invalid catalog');
      if (!controller.signal.aborted) setProducts(recommendProducts(product, catalog));
    }).catch(() => { if (!controller.signal.aborted) setFailed(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [product]);
  useEffect(() => {
    const activeTimers = timers.current;
    return () => { activeTimers.forEach(clearTimeout); activeTimers.clear(); };
  }, []);
  function add(item: ProductDTO) {
    if (item.stock <= 0) return;
    addToCart({ id: item.id, name: item.name, price: Number(item.price), category: item.category, sku: item.sku, tag: item.tag, imageUrl: productImage(item), sellerId: item.sellerId || undefined });
    setAnnouncement(item.name + ' added to cart');
    setAdded(previous => [...new Set([...previous, item.id])]);
    clearTimeout(timers.current.get(item.id));
    timers.current.set(item.id, setTimeout(() => { setAdded(previous => previous.filter(id => id !== item.id)); timers.current.delete(item.id); }, 2000));
  }
  if (!loading && !failed && products.length === 0) return null;
  return <section className="related-products" aria-labelledby="related-heading" aria-busy={loading}>
    <div className="store-section-heading"><div><h2 id="related-heading">You may also like</h2><p className="section-description">Explore more from the shop. Check specifications for compatibility.</p></div><Link href="/shop" className="text-link">Browse all <ArrowRight size={16} /></Link></div>
    {failed ? <p className="text-sm text-[var(--text-secondary)]">Suggestions are unavailable right now. <Link href="/shop" className="underline">Explore the shop</Link></p>
      : <div className="store-product-grid recommendation-rows" role="group" aria-label="Recommended products">{loading ? Array.from({ length: 4 }, (_, index) => <ProductCardSkeleton key={index} />) : products.map(item => <ProductCard key={item.id} product={item} added={added.includes(item.id)} onAdd={add} />)}</div>}
    <p className="sr-only" role="status">{loading ? 'Loading product suggestions' : announcement}</p>
  </section>;
}
