"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Wrench, MessageSquare } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useCart } from '@/lib/cart-context';
import { productImage } from '@/lib/sample-assets';
import type { ProductDTO } from '@/lib/types';

const services = [
  { icon: Layers, title: 'Fabrication', text: '3D printing, laser cutting, and PCB fabrication for custom parts and prototypes.', href: '/services', action: 'View services' },
  { icon: Wrench, title: 'Expert support', text: 'Get help with hardware, CAD, and robotics from an engineering expert.', href: '/consultation', action: 'Find an expert' },
  { icon: MessageSquare, title: 'Community', text: 'Ask technical questions and share your projects with other members.', href: '/community', action: 'Visit community' },
];

export default function Home() {
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

  return (
    <PageShell>
      <section className="store-hero">
        <div className="store-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Mechatronics</p>
            <h1>Electronics, parts<br />& fabrication.</h1>
            <p className="hero-description">Shop components, request custom parts, or get technical support for your project.</p>
            <div className="hero-actions">
              <Link href="/shop" className="store-button">Shop components <ArrowRight size={17} /></Link>
              <Link href="/services" className="store-button store-button-outline">View services</Link>
            </div>
            <nav className="category-shortcuts" aria-label="Browse product categories">
              {['Microcontrollers', 'Motors', 'Sensors'].map(category => <Link key={category} href={'/shop?category=' + encodeURIComponent(category)}>{category}</Link>)}
            </nav>
          </div>
        </div>
      </section>
      <section className="store-section store-container">
        <div className="store-section-heading"><h2>Featured products</h2><Link href="/shop" className="text-link">View all products <ArrowRight size={16} /></Link></div>
        {loading ? <div className="store-product-grid">{Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}</div> : products.length ? <div className="store-product-grid">{products.map(product => <ProductCard key={product.id} product={product} onAdd={add} added={addedIds.has(product.id)} />)}</div> : <div className="store-empty"><h3>{error ? 'Products could not be loaded' : 'No products available'}</h3><p>{error ? 'Open the shop to try again.' : 'Please check back for new listings.'}</p><Link className="text-link" href="/shop">Open shop <ArrowRight size={16} /></Link></div>}
      </section>
      <section className="services-section"><div className="store-container store-section">
        <div className="store-section-heading"><h2>Services & support</h2></div>
        <div className="service-grid">{services.map(service => <Link href={service.href} key={service.title} className="service-tile"><service.icon size={22} aria-hidden="true" /><h3>{service.title}</h3><p>{service.text}</p><span className="text-link">{service.action} <ArrowRight size={16} /></span></Link>)}</div>
      </div></section>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </PageShell>
  );
}
