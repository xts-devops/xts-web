"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Wrench, MessageSquare, ChevronRight, MoveUpRight, ScanLine, Cog, CircuitBoard } from 'lucide-react';
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

const startingPoints = [
  { icon: CircuitBoard, category: 'Microcontrollers', label: 'Give your ideas a brain.', detail: 'Microcontrollers & development boards', code: 'CONTROL' },
  { icon: Cog, category: 'Motors', label: 'Put something in motion.', detail: 'Motors & robotics components', code: 'MOTION' },
  { icon: ScanLine, category: 'Sensors', label: 'Make sense of the world.', detail: 'Sensors & environment modules', code: 'SENSING' },
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
      <section className="store-hero marketing-hero">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="store-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> A WORKBENCH FOR WHAT’S NEXT</p>
            <h1>Ideas deserve<br />to be <span>built.</span><span className="headline-period" aria-hidden="true">✳</span></h1>
            <p className="hero-description">Turn that “what if” into something you can hold. Discover electronics, custom fabrication, and the engineering minds to help bring it all together.</p>
            <div className="hero-actions">
              <Link href="/shop" className="store-button">Explore the shop <ArrowRight size={18} /></Link>
              <Link href="/services" className="store-button store-button-outline">Bring us your idea <ChevronRight size={18} /></Link>
            </div>
            <div className="hero-footnote"><span className="maker-symbols" aria-hidden="true"><Cpu size={15} /><Cog size={15} /><Layers size={15} /></span><span>For the makers. The problem-solvers. The “what if” people.</span></div>
          </div>
          <div className="hero-scene">
            <span className="scene-coordinate" aria-hidden="true">FIG. 01 / THE POSSIBILITIES ARE OPEN</span>
            <div className="scene-orbit" aria-hidden="true" />
          <div className="hero-workbench">
            <div className="workbench-top"><span><span className="workbench-dot" /> ON THE WORKBENCH</span><span aria-hidden="true">XTS / 001</span></div>
            <div className="workbench-image">
              {heroProduct ? <ProductImage src={productImage(heroProduct)} name={heroProduct.name} priority sizes="(max-width: 900px) 90vw, 42vw" /> : <Cpu className="workbench-empty" aria-hidden="true" />}
            </div>
            <div className="workbench-bottom"><div><p className="eyebrow">{heroProduct?.category || 'IMAGINE. MAKE. REPEAT.'}</p><h2>{heroProduct?.name || 'Built around your ideas.'}</h2></div><Link href={heroProduct ? `/shop/${heroProduct.id}` : '/shop'} aria-label={heroProduct ? `View ${heroProduct.name}` : 'Explore shop'}><ArrowRight size={22} /></Link></div>
            {heroProduct && productImage(heroProduct).startsWith('/images/products/') && <p className="workbench-caption">Illustrative sample product image</p>}
          </div>
            <span className="scene-note" aria-hidden="true"><span>+ ONE COMPONENT.</span><strong>Endless starting points.</strong></span>
          </div>
        </div>
      </section>
      <div className="capability-strip marketing-capabilities"><div className="store-container"><Link href="/shop"><span>01</span> Source the parts <Cpu size={17} /></Link><Link href="/services"><span>02</span> Make it your own <Layers size={17} /></Link><Link href="/consultation"><span>03</span> Work with an expert <Wrench size={17} /></Link></div></div>
      <section className="store-container starting-section" aria-labelledby="starting-heading">
        <div className="starting-heading"><p className="eyebrow">FOLLOW YOUR CURIOSITY</p><h2 id="starting-heading">Find your starting point.</h2></div>
        <div className="starting-grid">{startingPoints.map(point => <Link href={`/shop?category=${encodeURIComponent(point.category)}`} className="starting-card" key={point.code}><div className="starting-card-top"><point.icon size={28} strokeWidth={1.4} /><span>{point.code}</span><MoveUpRight size={17} /></div><h3>{point.label}</h3><p>{point.detail}</p></Link>)}</div>
      </section>
      <section className="store-section store-container">
        <div className="store-section-heading"><div><p className="eyebrow"><span className="section-index" aria-hidden="true">01 /</span> STOCK YOUR WORKBENCH</p><h2>Small parts. <em>Big potential.</em></h2></div><Link href="/shop" className="text-link">View all products <ArrowRight size={17} /></Link></div>
        {loading ? <div className="store-product-grid">{Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}</div> : products.length ? <div className="store-product-grid">{products.map(product => <ProductCard key={product.id} product={product} onAdd={add} added={addedIds.has(product.id)} />)}</div> : <div className="store-empty"><h3>{error ? 'The workbench is taking a moment.' : 'New parts are on the way.'}</h3><p>{error ? 'We couldn’t load the catalog. Open the shop to try again.' : 'Check the shop for the latest available products.'}</p><Link className="text-link" href="/shop">Open the shop <ArrowRight size={16} /></Link></div>}
      </section>
      <section className="services-section"><div className="store-container store-section">
        <div className="store-section-heading"><div><p className="eyebrow"><span className="section-index" aria-hidden="true">02 /</span> BEYOND THE COMPONENTS</p><h2>Your ambition.<br /><em>Our kind of challenge.</em></h2></div><p className="section-description">A part that doesn’t exist yet. A circuit that won’t cooperate.<br className="hidden sm:block" /> A question you can’t quite crack. Start here.</p></div>
        <div className="service-grid">{services.map(service => <Link href={service.href} key={service.number} className="service-tile"><div className="service-tile-top"><service.icon size={26} /><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><span className="text-link">{service.action} <ArrowRight size={16} /></span></Link>)}</div>
      </div></section>
      <section className="store-container store-section"><div className="build-banner marketing-banner"><div className="banner-drawing" aria-hidden="true"><svg viewBox="0 0 250 190" fill="none"><path d="M30 55 125 8l95 47v80l-95 47-95-47V55Z" /><path d="m30 55 95 48 95-48M125 103v79M30 95l95 47 95-47M78 31l95 48v80M172 31 78 79v80" /><circle cx="125" cy="103" r="26" /><path d="M3 103h45m154 0h45M125 0v24m0 143v23" /></svg><span>IMAGINATION → REALIZATION</span></div><div><p className="eyebrow">A SKETCH IS A GREAT START</p><h2>You bring the idea.<br />Let’s build <em>what’s next.</em></h2><p>Explore fabrication options, share your design files, and take the next step toward a working part.</p><Link href="/services" className="store-button">Start your project <ArrowRight size={18} /></Link><Link href="/consultation" className="banner-secondary">Need guidance first? Talk to an expert <MoveUpRight size={14} /></Link></div></div></section>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </PageShell>
  );
}
