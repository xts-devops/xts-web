import type { ProductDTO } from './types';

/** Catalog suggestions, not a claim of electrical compatibility. */
export function recommendProducts(current: ProductDTO, catalog: ProductDTO[], limit = 4): ProductDTO[] {
  const unique = [...new Map(catalog.map(product => [product.id, product])).values()];
  return unique.filter(product => product.id !== current.id)
    .sort((a, b) => Number(b.stock > 0) - Number(a.stock > 0)
      || Number(b.category === current.category) - Number(a.category === current.category)
      || Math.abs(Number(a.price) - Number(current.price)) - Math.abs(Number(b.price) - Number(current.price))
      || a.id.localeCompare(b.id))
    .slice(0, Math.max(0, limit));
}
