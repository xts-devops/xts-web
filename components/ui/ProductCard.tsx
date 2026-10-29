"use client";

import Link from 'next/link';
import { Check, Plus, Star } from 'lucide-react';
import type { ProductDTO } from '@/lib/types';
import { productImage } from '@/lib/sample-assets';
import { ProductImage } from './ProductImage';

export function ProductCard({ product, added, onAdd }: {
  product: ProductDTO; added: boolean; onAdd: (product: ProductDTO) => void;
}) {
  const image = productImage(product);
  return (
    <article className="catalog-card group">
      <Link href={`/shop/${product.id}`} className="catalog-link">
        <div className="catalog-photo">
          <ProductImage src={image} name={product.name} />
          {product.tag && <span className="product-tag">{product.tag}</span>}
          {image.startsWith('/images/products/') && <span className="sample-caption">Sample image</span>}
        </div>
        <div className="catalog-info">
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <div className="product-meta">
            {product.rating != null && product.rating > 0 && <span><Star size={12} fill="currentColor" /> {product.rating}</span>}
            <span className={product.stock > 0 ? 'stock-available' : ''}>{product.stock > 0 ? product.stock <= 5 ? 'Low stock' : 'In stock' : 'Out of stock'}</span>
          </div>
        </div>
      </Link>
      <div className="catalog-bottom">
        <strong>₱{Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
        <button type="button" disabled={product.stock <= 0} onClick={() => onAdd(product)}
          aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          className="add-product">{added ? <Check size={18} /> : <Plus size={18} />}</button>
      </div>
    </article>
  );
}
