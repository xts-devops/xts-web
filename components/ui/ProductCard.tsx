"use client";

import Link from 'next/link';
import { useId } from 'react';
import { Check, ShoppingCart, Star } from 'lucide-react';
import type { ProductDTO } from '@/lib/types';
import { productImage } from '@/lib/sample-assets';
import { ProductImage } from './ProductImage';
import { formatMoney } from '@/lib/currency';

export function ProductCard({ product, added, onAdd }: {
  product: ProductDTO; added: boolean; onAdd: (product: ProductDTO) => void;
}) {
  const image = productImage(product);
  const tooltipId = useId();
  const description = product.description?.replace(/\s+/g, ' ').trim() || '';
  const inStock = product.stock > 0;
  const actionLabel = !inStock ? 'Out of stock' : added ? 'Added to cart' : 'Add to cart';
  return (
    <article className="catalog-card group">
      <Link href={`/shop/${product.id}`} className="catalog-link" aria-label={'View ' + product.name} aria-describedby={description ? tooltipId + '-description' : undefined}>
        <div className="catalog-photo">
          <div className="catalog-image-frame"><ProductImage src={image} name={product.name} /></div>
          {product.tag && <span className="product-tag">{product.tag}</span>}
          {image.startsWith('/images/products/') && <span className="sample-caption">Sample image</span>}
        </div>
        <div className="catalog-info">
          <p className="eyebrow">{product.category}</p>
          <h3 title={product.name}>{product.name}</h3>
          <p id={tooltipId + '-description'} className="product-card-description" aria-hidden={!description || undefined}>{description}</p>
          <div className="product-meta">
            {product.rating != null && product.rating > 0 && <span className="product-rating" aria-label={`Rated ${product.rating} out of 5`}><Star size={12} fill="currentColor" aria-hidden="true" /> {product.rating}</span>}
            <span className={inStock ? product.stock <= 5 ? 'stock-low' : 'stock-available' : 'stock-unavailable'}>{inStock ? product.stock <= 5 ? 'Low stock' : 'In stock' : 'Out of stock'}</span>
          </div>
        </div>
      </Link>
      <div className="catalog-bottom">
        <strong>{formatMoney(Number(product.price))}</strong>
        <div className="cart-action">
          <button type="button" disabled={!inStock} onClick={() => onAdd(product)}
            aria-label={!inStock ? `${product.name} is out of stock` : added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
            aria-describedby={tooltipId} data-added={added || undefined}
            className="add-product">{added ? <Check size={18} aria-hidden="true" /> : <ShoppingCart size={18} aria-hidden="true" />}</button>
          <span id={tooltipId} className="cart-tooltip" role="tooltip">{actionLabel}</span>
        </div>
      </div>
    </article>
  );
}
