"use client";

import { useEffect, useState } from 'react';
import { Search, ArrowRight, Package, X } from 'lucide-react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useCart } from '@/lib/cart-context';
import { productImage } from '@/lib/sample-assets';
import type { ProductDTO } from '@/lib/types';

export default function ShopPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState('');
  const [attempt, setAttempt] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error('Catalog unavailable'); return res.json(); })
      .then((data: ProductDTO[]) => {
        setProducts(data);
        const params = new URLSearchParams(window.location.search);
        const requestedCategory = params.get('category');
        setCategory(requestedCategory && data.some(product => product.category === requestedCategory) ? requestedCategory : 'All');
        setSearch(params.get('q')?.trim() || '');
      })
      .catch(err => { if (err.name !== 'AbortError') setError(true); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [attempt]);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const query = search.trim().toLowerCase();
  const filtered = products.filter(p => (category === 'All' || p.category === category) && (!query || `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(query)));
  const updateFilters = (nextCategory: string, nextSearch: string) => {
    setCategory(nextCategory);
    setSearch(nextSearch);
    const url = new URL(window.location.href);
    if (nextCategory === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', nextCategory);
    if (nextSearch.trim()) url.searchParams.set('q', nextSearch.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  };
  const add = (product: ProductDTO) => {
    if (product.stock <= 0) return;
    addToCart({ ...product, price: Number(product.price), imageUrl: productImage(product) });
    setAdded(previous => new Set(previous).add(product.id));
    setAnnouncement(`${product.name} added to cart`);
    setTimeout(() => setAdded(previous => { const next = new Set(previous); next.delete(product.id); return next; }), 1800);
  };

  return <PageShell><div className="store-container store-section shop-section">
    <div className="shop-intro"><p className="eyebrow">Product catalog</p><h1>Shop</h1><p>Browse electronics, motors, sensors, and other components.</p></div>
    <div className="shop-toolbar"><label className="shop-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Search products, categories, or SKU</span><input type="search" placeholder="Find a part, board, or SKU…" value={search} onChange={e => updateFilters(category, e.target.value)} />{search && <button type="button" aria-label="Clear search" onClick={() => updateFilters(category, '')}><X size={18} /></button>}</label><span className="shop-count" role="status">{loading ? 'Loading catalog…' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}</span></div>
    <div className="category-filters" aria-label="Product categories">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => updateFilters(item, search)}>{item}</button>)}</div>
    {error ? <div className="store-empty" role="alert"><h2>We couldn’t load the catalog.</h2><p>Please try again in a moment.</p><button className="store-button" onClick={() => { setError(false); setLoading(true); setAttempt(value => value + 1); }}>Try again</button></div> : loading ? <div className="store-product-grid">{Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}</div> : filtered.length ? <div className="store-product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} added={added.has(product.id)} onAdd={add} />)}</div> : <div className="store-empty"><Package size={36} /><h2>No parts found.</h2><p>Try another keyword or explore a different category.</p><button className="store-button store-button-outline" onClick={() => updateFilters('All', '')}>Reset filters</button></div>}
    <div className="shop-help"><span>Need a part made to your design?</span><Link href="/services" className="text-link">Explore custom fabrication <ArrowRight size={16} /></Link></div>
    <span className="sr-only" aria-live="polite">{announcement}</span>
  </div></PageShell>;
}
