"use client";

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { ProductImage } from './ProductImage';

export function ProductGallery({ images, name, sample = false }: { images: string[]; name: string; sample?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const count = images.length;
  function select(index: number) {
    const next = (index + count) % count;
    setSelected(next);
    if (!expanded) (thumbnails.current?.children[next] as HTMLElement | undefined)?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }
  const navigation = count > 1 && <div className="gallery-navigation">
    <button type="button" onClick={() => select(selected - 1)} aria-label="Previous product image"><ChevronLeft size={20} /></button>
    <span role="status" aria-live="polite">{selected + 1} / {count}</span>
    <button type="button" onClick={() => select(selected + 1)} aria-label="Next product image"><ChevronRight size={20} /></button>
  </div>;
  return <div className="product-gallery" onKeyDown={event => {
    if (count < 2) return;
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      select(event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }}>
    <div className="gallery-stage">
      <div className="gallery-image"><ProductImage src={images[selected]} name={name + (count > 1 ? ` — view ${selected + 1}` : '')} priority sizes="(max-width: 600px) 90vw, (max-width: 959px) 520px, 45vw" /></div>
      {count > 0 && <button type="button" className="gallery-expand" aria-label="View larger product image" onClick={() => { dialog.current?.showModal(); setExpanded(true); }}><Expand size={17} /><span>View larger</span></button>}
    </div>
    {count > 1 && <div className="gallery-controls">{navigation}<span className="gallery-hint">Select a view</span></div>}
    {count > 1 && <div className="gallery-thumbnails" ref={thumbnails} aria-label="Product image views">
      {images.map((src, index) => <button type="button" key={src} aria-label={`Show ${name}, view ${index + 1}`} aria-pressed={selected === index} onClick={() => select(index)}>
        <ProductImage src={src} name={`${name}, thumbnail ${index + 1}`} sizes="76px" />
      </button>)}
    </div>}
    {sample && <p className="gallery-caption">Illustrative sample views. Refer to specifications for product details.</p>}
    <dialog ref={dialog} className="gallery-dialog" aria-label={name + ' image viewer'} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="gallery-dialog-content">
        <div className="gallery-dialog-header"><span>{name}</span><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close image viewer"><X size={22} /></button></div>
        {expanded && <div className="gallery-large-image"><ProductImage src={images[selected]} name={`${name}, view ${selected + 1}`} sizes="(max-width: 900px) 90vw, 850px" /></div>}
        {navigation}
        {sample && <p className="gallery-caption">Illustrative sample view</p>}
      </div>
    </dialog>
  </div>;
}
