"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Wrench, MessageSquare, ChevronRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { ProductImage } from '@/components/ui/ProductImage';
import { useCart } from '@/lib/cart-context';
import { productImage } from '@/lib/sample-assets';
import type { ProductDTO } from '@/lib/types';

const services = [
  { icon: Layers, number: '01', title: 'Fabricate your next idea.', text: '3D printing, laser cutting, and PCB fabrication. Go from design files to a part you can hold.', href: '/services', action: 'Explore fabrication' },
  { icon: Wrench, number: '02', title: 'Get a second set of eyes.', text: 'Work through hardware, CAD, and robotics challenges with an engineering expert.', href: '/consultation', action: 'Find an expert' },
  { icon: MessageSquare, number: '03', title: 'Build with the community.', text: 'Share a work in progress, ask a technical question, or discover what other makers are building.', href: '/community', action: 'Join the conversation' },
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
  const heroProduct = products[0];

  return (
    <PageShell>
      <section className="store-hero">
        <div className="store-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> YOUR NEXT BUILD STARTS HERE</p>
            <h1>Good ideas.<br />Real <span>possibilities.</span></h1>
            <p className="hero-description">The parts, precision, and people behind your next project. Electronics, custom fabrication, and engineering expertise — all on one workbench.</p>
            <div className="hero-actions">
              <Link href="/shop" className="store-button">Explore the shop <ArrowRight size={18} /></Link>
              <Link href="/services" className="store-button store-button-outline">Start a custom build <ChevronRight size={18} /></Link>
            </div>
            <div className="hero-footnote"><Cpu size={18} /><span>For makers, engineers, and the endlessly curious.</span></div>
          </div>
          <div className="hero-workbench">
            <div className="workbench-top"><span>THE XTS WORKBENCH</span><span className="workbench-dot" /></div>
            <div className="workbench-image">
              {heroProduct ? <ProductImage src={productImage(heroProduct)} name={heroProduct.name} priority sizes="(max-width: 900px) 90vw, 42vw" /> : <Cpu className="workbench-empty" aria-hidden="true" />}
            </div>
            <div className="workbench-bottom"><div><p className="eyebrow">{heroProduct?.category || 'IMAGINE. MAKE. REPEAT.'}</p><h2>{heroProduct?.name || 'Built around your ideas.'}</h2></div><Link href={heroProduct ? `/shop/${heroProduct.id}` : '/shop'} aria-label={heroProduct ? `View ${heroProduct.name}` : 'Explore shop'}><ArrowRight size={22} /></Link></div>
            {heroProduct && productImage(heroProduct).startsWith('/images/products/') && <p className="workbench-caption">Illustrative sample product image</p>}
          </div>
        </div>
      </section>
      <div className="capability-strip"><div className="store-container"><span>ELECTRONICS & ROBOTICS</span><span>3D PRINTING & FABRICATION</span><span>ENGINEERING EXPERTISE</span></div></div>
      <section className="store-section store-container">
        <div className="store-section-heading"><div><p className="eyebrow">STOCK YOUR WORKBENCH</p><h2>Small parts. Big potential.</h2></div><Link href="/shop" className="text-link">View all products <ArrowRight size={17} /></Link></div>
        {loading ? <div className="store-product-grid">{Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}</div> : products.length ? <div className="store-product-grid">{products.map(product => <ProductCard key={product.id} product={product} onAdd={add} added={addedIds.has(product.id)} />)}</div> : <div className="store-empty"><h3>{error ? 'The workbench is taking a moment.' : 'New parts are on the way.'}</h3><p>{error ? 'We couldn’t load the catalog. Open the shop to try again.' : 'Check the shop for the latest available products.'}</p><Link className="text-link" href="/shop">Open the shop <ArrowRight size={16} /></Link></div>}
      </section>
      <section className="services-section"><div className="store-container store-section">
        <div className="store-section-heading"><div><p className="eyebrow">BEYOND THE COMPONENTS</p><h2>A little help. A lot further.</h2></div><p className="section-description">From your first sketch to the final assembly,<br className="hidden sm:block" /> make the next step with XTS.</p></div>
        <div className="service-grid">{services.map(service => <Link href={service.href} key={service.number} className="service-tile"><div className="service-tile-top"><service.icon size={26} /><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><span className="text-link">{service.action} <ArrowRight size={16} /></span></Link>)}</div>
      </div></section>
      <section className="store-container store-section"><div className="build-banner"><div><p className="eyebrow">LET’S MAKE IT WORK</p><h2>An idea on your desk?<br />Let’s get it off the ground.</h2><p>Find your components or tell us what you need to fabricate.</p></div><Link href="/services" className="store-button">Explore our services <ArrowRight size={18} /></Link></div></section>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </PageShell>
  );
}
