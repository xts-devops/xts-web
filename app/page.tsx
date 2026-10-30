"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, Layers, Wrench, MessageSquare, Cpu, ScanLine, Cog, Zap, CircuitBoard, Printer, Scissors, FileText, ClipboardList } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { CatalogSearch } from '@/components/ui/CatalogSearch';
import { useCart } from '@/lib/cart-context';
import { productImage } from '@/lib/sample-assets';
import type { ProductDTO } from '@/lib/types';

const quickLinks = [
  { icon: Layers, title: 'Custom fabrication', short: 'Services', text: '3D printing, laser cutting & PCB services', href: '/services' },
  { icon: Wrench, title: 'Talk to an expert', short: 'Experts', text: 'Help with hardware, CAD & robotics', href: '/consultation' },
  { icon: MessageSquare, title: 'Explore the community', short: 'Community', text: 'Questions, projects & shared experience', href: '/community' },
];

const categoryLinks = [
  { name: 'Microcontrollers', category: 'Microcontrollers', query: 'microcontrollers', icon: Cpu, detail: 'Development boards & controllers' },
  { name: 'Sensors', category: 'Sensors', query: 'sensors', icon: ScanLine, detail: 'Sensing & measurement modules' },
  { name: 'Motors', category: 'Motors', query: 'motors', icon: Cog, detail: 'Motion & robotics components' },
  { name: 'Power modules', category: 'Power', query: 'power', icon: Zap, detail: 'Converters & power electronics' },
  { name: 'Single-board computers', category: 'Single-Board Computers', query: 'single-board', icon: CircuitBoard, detail: 'Compact computing platforms' },
  { name: '3D printing', category: '3D Printing', query: '3d printing', icon: Layers, detail: 'Filament & printing supplies' },
];

const engineeringServices = [
  { icon: Printer, name: '3D printing', description: 'Turn a 3D model into a prototype, enclosure, or functional part.', href: '/services?type=3d-printing', action: 'Start a print request' },
  { icon: Scissors, name: 'Laser cutting', description: 'Submit your design for custom panels, profiles, and cut parts.', href: '/services?type=laser-cutting', action: 'Explore laser cutting' },
  { icon: CircuitBoard, name: 'PCB fabrication', description: 'Upload your board files and configure a fabrication request.', href: '/services?type=pcb-fabrication', action: 'Start a PCB request' },
  { icon: Wrench, name: 'Technical consultation', description: 'Discuss hardware, CAD, or robotics challenges with an expert.', href: '/consultation', action: 'Find technical help' },
];

const supportLinks = [
  { icon: FileText, name: 'Product information', description: 'Review specifications, pricing, and availability before ordering.', href: '/shop' },
  { icon: ClipboardList, name: 'Order updates', description: 'Keep track of orders and their status in your dashboard.', href: '/dashboard' },
  { icon: MessageSquare, name: 'Direct support', description: 'Message sellers or contact the XTS team about your order.', href: '/chat' },
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
      .then((data: ProductDTO[]) => setProducts(data))
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
      <section className="store-hero welcome-hero" aria-labelledby="welcome-title">
        <div className="store-container welcome-layout">
          <div className="hero-copy welcome-copy">
            <p className="welcome-greeting">Welcome to XTS <span>Mechatronics</span></p>
            <h1 id="welcome-title">Parts and support<br />for your next project.</h1>
            <p className="hero-description">Find electronics and robotics components, request custom parts, or get help with your project.</p>
            <CatalogSearch products={products} />
            <nav className="category-shortcuts" aria-label="Browse product categories">
              <span>Browse</span>
              {['Microcontrollers', 'Motors', 'Sensors'].map(category => <Link key={category} href={'/shop?category=' + encodeURIComponent(category)}>{category}</Link>)}
            </nav>
            <div className="welcome-shopping-actions"><Link href="/shop" className="welcome-catalog-link">Shop all products <ArrowRight size={15} aria-hidden="true" /></Link><Link href="#categories" className="welcome-category-link">Shop by category <ArrowDown size={14} aria-hidden="true" /></Link></div>
          </div>
          <aside className="welcome-guide" aria-labelledby="welcome-guide-title">
            <h2 id="welcome-guide-title">More ways we can help</h2>
            {quickLinks.map(service => <Link href={service.href} key={service.title} className="welcome-route"><service.icon size={21} aria-hidden="true" /><span><strong><span className="route-full-label">{service.title}</span><span className="route-short-label">{service.short}</span></strong><span className="route-description">{service.text}</span></span><ArrowRight size={17} aria-hidden="true" /></Link>)}
          </aside>
        </div>
      </section>
      <section className="store-section store-container featured-section" id="featured-products" aria-labelledby="featured-heading">
        <div className="store-section-heading"><div><h2 id="featured-heading">Featured products</h2><p className="section-description">Components and essentials from the catalog.</p></div><Link href="/shop" className="text-link">View all products <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div aria-busy={loading}>
          {loading ? <><span className="sr-only" role="status">Loading featured products</span><div className="store-product-grid">{Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}</div></> : products.length ? <div className="store-product-grid">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} onAdd={add} added={addedIds.has(product.id)} />)}</div> : <div className="store-empty"><h3>{error ? 'Products could not be loaded' : 'No products available'}</h3><p>{error ? 'Open the shop to try again.' : 'Please check back for new listings.'}</p><Link className="text-link" href="/shop">Open shop <ArrowRight size={16} /></Link></div>}
        </div>
      </section>
      <section className="store-section store-container category-section" id="categories" aria-labelledby="categories-heading">
        <div className="store-section-heading"><div><h2 id="categories-heading">Shop by category</h2><p className="section-description">Go straight to the parts you need.</p></div></div>
        <div className="commerce-category-grid">{categoryLinks.map(category => {
          const count = products.filter(product => product.category === category.category).length;
          const href = '/shop?' + new URLSearchParams(count ? { category: category.category } : { q: category.query });
          return <Link key={category.category} href={href} className="commerce-category"><category.icon size={23} strokeWidth={1.6} aria-hidden="true" /><div><h3>{category.name}</h3><span>{category.detail}</span>{!loading && !error && count > 0 && <small>{count} {count === 1 ? 'product' : 'products'}</small>}</div><ArrowRight size={16} aria-hidden="true" /></Link>;
        })}</div>
      </section>
      <section className="engineering-section" aria-labelledby="engineering-heading"><div className="store-container store-section">
        <div className="store-section-heading"><div><h2 id="engineering-heading">Engineering services</h2><p className="section-description">From a design file to a custom part, with help along the way.</p></div><Link href="/services" className="text-link">View services <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="engineering-grid">{engineeringServices.map(service => <Link href={service.href} key={service.name} className="engineering-card"><service.icon size={25} strokeWidth={1.6} aria-hidden="true" /><h3>{service.name}</h3><p>{service.description}</p><span>{service.action} <ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div>
      </div></section>
      <section className="store-section store-container support-section" aria-labelledby="support-heading">
        <h2 id="support-heading">Information and support, before and after your order.</h2>
        <div className="commerce-support-grid">{supportLinks.map(item => <Link href={item.href} key={item.name}><item.icon size={22} strokeWidth={1.6} aria-hidden="true" /><div><h3>{item.name}</h3><span>{item.description}</span></div></Link>)}</div>
      </section>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </PageShell>
  );
}
