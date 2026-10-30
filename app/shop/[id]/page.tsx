"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Activity, Check, ShoppingCart, MessageCircle, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useSession } from 'next-auth/react';
import { formatMoney } from '@/lib/currency';
import { ADMIN_INBOX_EMAIL } from '@/lib/admin-email';
import { productImage, productImages } from '@/lib/sample-assets';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { RelatedProducts } from '@/components/ui/RelatedProducts';
import type { ProductDTO } from '@/lib/types';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => { let active = true; params.then(p => { if (active) setId(p.id); }); return () => { active = false; }; }, [params]);
  return id ? <ProductDetailContent key={id} id={id} /> : <PageShell><div className="product-loading" role="status"><Activity className="animate-spin" />Loading product…</div></PageShell>;
}

function ProductDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const res = await fetch('/api/products/' + encodeURIComponent(id), { signal: controller.signal });
        if (res.status === 404) return;
        if (!res.ok) throw new Error('Product unavailable');
        const data: ProductDTO = await res.json();
        if (!controller.signal.aborted) setProduct(data);
      } catch { if (!controller.signal.aborted) setFetchError(true); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    load();
    return () => controller.abort();
  }, [id, attempt]);
  useEffect(() => () => { if (addedTimer.current) clearTimeout(addedTimer.current); }, []);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      category: product.category,
      sku: product.sku,
      tag: product.tag,
      imageUrl: productImage(product),
      sellerId: product.sellerId || undefined,
    });
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product || product.stock <= 0) return;
    handleAddToCart();
    router.push('/cart');
  };

  const handleChatSeller = async () => {
    if (!product) return;
    if (!session?.user?.email) {
      router.push('/login');
      return;
    }
    setChatLoading(true);
    setChatError(null);
    try {
      const productPrice = Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 });
      const initialMessage = `Hi! I'm interested in this product:\n\n📦 ${product.name}\n🏷️ SKU: ${product.sku}\n💰 Price: ₱${productPrice}\n📂 Category: ${product.category}\n\nCould you help me with more details?`;

      // Route to the product's seller if available, otherwise fall back to admin inbox
      const recipientId = product.sellerId || ADMIN_INBOX_EMAIL;

      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId,
          type: 'product',
          productRef: {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrls?.[0] || '',
          },
          initialMessage,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setChatError(payload.error || `Could not start chat (HTTP ${res.status})`);
        return;
      }
      if (payload.id) {
        router.push(`/chat?id=${payload.id}`);
      } else {
        setChatError('Chat created but response was malformed. Check your inbox.');
      }
    } catch (e) {
      console.error('Failed to start chat', e);
      setChatError('Network error while starting chat. Please try again.');
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <div className="product-loading" role="status" aria-label="Loading product">
          <Activity className="w-10 h-10 text-safety-orange animate-spin" />
        </div>
      </PageShell>
    );
  }

  if (!product) {
    return (
      <PageShell>
        <div className="container mx-auto px-4 sm:px-6 py-32 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2">{fetchError ? 'Unable to load product' : 'Product not found'}</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">{fetchError ? 'Please try again or return to the shop.' : 'It may have been removed or the link is wrong.'}</p>
          {fetchError && <Button className="mr-3" onClick={() => { setFetchError(false); setLoading(true); setAttempt(value => value + 1); }}>Try again</Button>}
          <Button onClick={() => router.push('/shop')}>Back to shop</Button>
        </div>
      </PageShell>
    );
  }

  const primaryImage = productImage(product);
  const images = productImages(product);
  const specs = product.specifications || [];

  return (
    <PageShell>
      <div className="store-container product-detail">
        <Link href="/shop" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to shop</span>
        </Link>

        <div className="product-detail-grid">
          <ProductGallery images={images} name={product.name} sample={primaryImage.startsWith('/images/products/')} />

          {/* Details Section */}
          <div className="product-summary flex flex-col">
            <div className="mb-4 sm:mb-6">
              <span className="text-xs font-semibold text-safety-orange block mb-2">{product.category} <span aria-hidden="true">/</span> {product.sku}</span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight mb-3 sm:mb-4">
                {product.name}
              </h1>
              {product.tag && <Badge variant="new" className="mb-3">{product.tag}</Badge>}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-[var(--text-primary)]">{formatMoney(Number(product.price))}</span>
                <Badge variant={product.stock > 0 ? 'completed' : 'warning'} className="text-xs">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </div>
              {/* Rating & Sold */}
              <div className="flex items-center gap-4 mt-3">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-[var(--text-primary)]">{product.rating}</span>
                  </div>
                )}
                {product.totalSold != null && (
                  <span className="text-xs text-[var(--text-muted)] font-medium">{product.totalSold} sold</span>
                )}
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Action Buttons (hidden on mobile — sticky bottom bar replaces these) */}
            <div className="product-purchase space-y-3 hidden sm:block">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className={`h-12 text-sm font-semibold transition-all w-full ${
                    added
                      ? 'bg-green-600 hover:bg-green-600'
                      : 'bg-safety-orange hover:bg-safety-orange/80'
                  }`}
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  {added ? (
                    <><Check className="w-4 h-4 mr-2" /> Added</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 mr-2" /> Add to cart</>
                  )}
                </Button>
                <Button
                  className="h-12 text-sm font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 w-full"
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                >
                  <Zap className="w-4 h-4 mr-2" /> Buy Now
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full h-10 sm:h-12 text-xs font-semibold flex items-center justify-center gap-2"
                onClick={handleChatSeller}
                disabled={chatLoading}
              >
                {chatLoading ? (
                  <><Activity className="w-4 h-4 animate-spin" /> Opening chat…</>
                ) : (
                  <><MessageCircle className="w-4 h-4" /> Message the seller</>
                )}
              </Button>
            </div>

            {chatError && (
              <div role="alert" className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-sm">
                <p className="text-xs text-red-500 font-bold">{chatError}</p>
              </div>
            )}

            {/* Specs */}
            {specs.length > 0 && (
              <div className="mb-5">
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Specifications</h2>
                <div className="border border-[var(--border-primary)] rounded-sm overflow-hidden">
                  {specs.map((spec: { key: string; value: string }, i: number) => (
                    <div key={i} className={`flex text-sm ${i % 2 === 0 ? 'bg-[var(--bg-surface)]' : 'bg-[var(--bg-secondary)]'}`}>
                      <span className="w-1/3 sm:w-2/5 shrink-0 break-words px-3 py-2 font-medium text-[var(--text-secondary)] text-xs border-r border-[var(--border-secondary)]">{spec.key}</span>
                      <span className="flex-grow min-w-0 break-words px-3 py-2 text-[var(--text-primary)] text-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-sm text-center">
                <ShieldCheck className="w-4 h-4 text-safety-orange mx-auto mb-1.5" />
                <h4 className="text-xs font-medium text-[var(--text-primary)]">1-year warranty</h4>
              </div>
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-sm text-center">
                <Truck className="w-4 h-4 text-safety-orange mx-auto mb-1.5" />
                <h4 className="text-xs font-medium text-[var(--text-primary)]">Fast shipping</h4>
              </div>
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-sm text-center">
                <RotateCcw className="w-4 h-4 text-safety-orange mx-auto mb-1.5" />
                <h4 className="text-xs font-medium text-[var(--text-primary)]">30-day returns</h4>
              </div>
            </div>


          </div>
        </div>
        <RelatedProducts key={product.id} product={product} />
        <p className="sr-only" role="status">{added ? product.name + ' added to cart' : ''}</p>
      </div>

      {/* Mobile Sticky Action Bar */}
      {product && (
        <div className="product-mobile-actions fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)] border-t border-[var(--border-primary)] p-3 flex gap-2 sm:hidden">
          <Button
            className={`flex-1 h-11 text-xs font-semibold ${
              added
                ? 'bg-green-600 hover:bg-green-600'
                : 'bg-safety-orange hover:bg-safety-orange/80'
            }`}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {added ? <><Check className="w-3.5 h-3.5 mr-1" /> Added</> : <><ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add</>}
          </Button>
          <Button
            className="flex-1 h-11 text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90"
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
          >
            <Zap className="w-3.5 h-3.5 mr-1" /> Buy
          </Button>
          <Button
            variant="outline"
            className="h-11 px-3"
            aria-label="Message the seller"
            onClick={handleChatSeller}
            disabled={chatLoading}
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageShell>
  );
}
