"use client";

import { useEffect, useId, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, Package, Folder } from 'lucide-react';
import { formatMoney } from '@/lib/currency';
import type { ProductDTO } from '@/lib/types';

/** Suggestions reuse the page's catalog; typing never starts another request. */
export function CatalogSearch({ products }: { products: ProductDTO[] }) {
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const lookup = useMemo(() => ({
    products: products.map(product => ({ product, text: `${product.name} ${product.sku} ${product.category}`.toLowerCase() })),
    categories: [...new Set(products.map(product => product.category))],
  }), [products]);
  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];
    const matches: ProductDTO[] = [];
    for (const entry of lookup.products) {
      if (entry.text.includes(term)) matches.push(entry.product);
      if (matches.length === 4) break;
    }
    const categories = lookup.categories.filter(category => category.toLowerCase().includes(term)).slice(0, 2);
    return [
      ...matches.map(product => ({ key: product.id, label: product.name, detail: `${product.sku} · ${formatMoney(Number(product.price))}${product.stock <= 0 ? ' · Out of stock' : ''}`, href: '/shop/' + product.id, kind: 'product' })),
      ...categories.map(category => ({ key: 'category-' + category, label: category, detail: 'Browse category', href: '/shop?' + new URLSearchParams({ category }), kind: 'category' })),
    ];
  }, [lookup, query]);
  const expanded = open && suggestions.length > 0;
  const activeSuggestion = expanded ? suggestions[active] : undefined;
  useEffect(() => {
    if (expanded && active >= 0) document.getElementById(id + '-option-' + active)?.scrollIntoView({ block: 'nearest' });
  }, [active, expanded, id]);
  const go = (href: string) => { setOpen(false); setActive(-1); router.push(href); };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    go(term ? '/shop?' + new URLSearchParams({ q: term }) : '/shop');
  };
  const navigateSuggestions = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Escape') { setOpen(false); setActive(-1); return; }
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      setActive(index => {
        const previous = index < suggestions.length ? index : -1;
        return event.key === 'ArrowDown' ? (previous + 1) % suggestions.length : (previous <= 0 ? suggestions.length - 1 : previous - 1);
      });
    }
    if (event.key === 'Enter' && activeSuggestion) {
      event.preventDefault();
      go(activeSuggestion.href);
    }
    if (event.key === 'Tab') setOpen(false);
  };

  return <form action="/shop" method="get" onSubmit={submit} className="catalog-discovery" role="search" aria-label="Search the product catalog"
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setActive(-1); } }}>
    <label className="discovery-label" htmlFor={id}>Find a component</label>
    <div className="welcome-search">
      <Search size={19} aria-hidden="true" />
      <input id={id} name="q" type="search" value={query} maxLength={120}
        placeholder="Search products, categories or SKU" autoComplete="off"
        role="combobox" aria-autocomplete="list" aria-expanded={expanded}
        aria-controls={expanded ? id + '-suggestions' : undefined}
        aria-activedescendant={activeSuggestion ? id + '-option-' + active : undefined}
        onChange={event => { setQuery(event.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)} onKeyDown={navigateSuggestions} />
      <button type="submit">Search <ArrowRight size={16} aria-hidden="true" /></button>
    </div>
    {expanded && <div className="search-popover">
      <ul id={id + '-suggestions'} role="listbox" aria-label="Suggested products and categories">
        {suggestions.map((suggestion, index) => <li key={suggestion.key} role="presentation">
          <button id={id + '-option-' + index} type="button" role="option" tabIndex={-1}
            aria-selected={active === index} onMouseDown={event => event.preventDefault()}
            onMouseEnter={() => setActive(index)} onClick={() => go(suggestion.href)}>
            {suggestion.kind === 'category' ? <Folder size={17} aria-hidden="true" /> : <Package size={17} aria-hidden="true" />}
            <span><strong>{suggestion.label}</strong><span>{suggestion.detail}</span></span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </li>)}
      </ul>
      <span className="search-popover-hint">Enter to search · ↑↓ to browse · Esc to close</span>
    </div>}
    <span role="status" className="sr-only">{expanded ? `${suggestions.length} suggestions available. Use the up and down arrow keys to browse.` : ''}</span>
  </form>;
}
