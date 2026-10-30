"use client";

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Wrench, MessageSquare, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useCart } from '@/lib/cart-context';
import { productImage } from '@/lib/sample-assets';
import type { ProductDTO } from '@/lib/types';

const services = [
  { icon: Layers, title: 'Custom fabrication', text: '3D printing, laser cutting & PCB services', href: '/services' },
  { icon: Wrench, title: 'Talk to an expert', text: 'Help with hardware, CAD & robotics', href: '/consultation' },
  { icon: MessageSquare, title: 'Explore the community', text: 'Questions, projects & shared experience', href: '/community' },
];

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error('Products unavailable'); return res.json(); })
      .then((data: ProductDTO[]) => setProducts(data.slice(0, 4)))
      .catch(err => { if (err.name !== 'AbortError') setError(true); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const add = (product: ProductDTO) => {
    if (product.stock <= 0) return;
    addToCart({ ...product, price: Number(product.price), imageUrl: productImage(product) });
    setAddedIds(previous => new Set(previous).add(product.id));
    setAnnouncement(`${product.name} added to cart`);
    setTimeout(() => setAddedIds(previous => { const next = new Set(previous); next.delete(product.id); return next; }), 1800);
  };

  const searchShop = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get('q') || '').trim();
    router.push(query ? '/shop?' + new URLSearchParams({ q: query }).toString() : '/shop');
  };

  return (
    <PageShell>
      <section className="store-hero welcome-hero" aria-labelledby="welcome-title">
        <div className="store-container welcome-layout">
          <div className="hero-copy welcome-copy">
            <p className="welcome-greeting">Welcome to XTS <span>Mechatronics</span></p>
            <h1 id="welcome-title">Parts and support<br />for your next project.</h1>
            <p className="hero-description">Find electronics and robotics components, request custom parts, or get help with your project.</p>
            <form action="/shop" method="get" onSubmit={searchShop} className="welcome-search" role="search" aria-label="Search the product catalog">
              <label className="sr-only" htmlFor="welcome-search-input">Search components, categories, or SKU</label>
              <Search size={19} aria-hidden="true" />
              <input id="welcome-search-input" name="q" type="search" placeholder="Search parts, boards, sensors…" autoComplete="off" maxLength={120} />
              <button type="submit">Search <ArrowRight size={16} aria-hidden="true" /></button>
            </form>
            <nav className="category-shortcuts" aria-label="Browse product categories">
              <span>Browse</span>
              {['Microcontrollers', 'Motors', 'Sensors'].map(category => <Link key={category} href={'/shop?category=' + encodeURIComponent(category)}>{category}</Link>)}
            </nav>
            <Link href="/shop" className="welcome-catalog-link">View all products <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <aside className="welcome-guide" aria-labelledby="welcome-guide-title">
            <h2 id="welcome-guide-title">More ways we can help</h2>
            {services.map(service => <Link href={service.href} key={service.title} className="welcome-route"><service.icon size={21} aria-hidden="true" /><span><strong>{service.title}</strong><span>{service.text}</span></span><ArrowRight size={17} aria-hidden="true" /></Link>)}
          </aside>
        </div>
      </section>
      <section className="store-section store-container">
        <div className="store-section-heading"><h2>Featured products</h2><Link href="/shop" className="text-link">View all products <ArrowRight size={16} /></Link></div>
        {loading ? <div className="store-product-grid">{Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}</div> : products.length ? <div className="store-product-grid">{products.map(product => <ProductCard key={product.id} product={product} onAdd={add} added={addedIds.has(product.id)} />)}</div> : <div className="store-empty"><h3>{error ? 'Products could not be loaded' : 'No products available'}</h3><p>{error ? 'Open the shop to try again.' : 'Please check back for new listings.'}</p><Link className="text-link" href="/shop">Open shop <ArrowRight size={16} /></Link></div>}
      </section>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </PageShell>
  );
}
