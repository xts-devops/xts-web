/** Local demo asset index. Never substitutes photos on a real seller listing. */
export const sampleAssets = [
  { id: 'p-esp32', sku: 'XTS-MCU-001', file: 'esp32' },
  { id: 'p-nema17', sku: 'XTS-MOT-017', file: 'nema17' },
  { id: 'p-mg996r', sku: 'XTS-MOT-996', file: 'mg996r' },
  { id: 'p-pla', sku: 'XTS-FIL-PLA', file: 'pla' },
  { id: 'p-lidar', sku: 'XTS-SEN-LUN', file: 'lidar' },
  { id: 'p-bme280', sku: 'XTS-SEN-280', file: 'bme280' },
  { id: 'p-buck', sku: 'XTS-PWR-596', file: 'buck' },
  { id: 'p-pi5', sku: 'XTS-SBC-PI5', file: 'pi5' },
] as const;

export function productImage(product: { id: string; sku: string; imageUrls?: string[] }): string {
  const original = product.imageUrls?.[0];
  if (original && !original.startsWith('data:image/svg+xml')) return original;
  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_LOCAL_PREVIEW === 'true') {
    const sample = sampleAssets.find(asset => asset.id === product.id && asset.sku === product.sku);
    if (sample) return `/images/products/${sample.file}.webp`;
  }
  return original || '';
}

/** Preserve seller galleries; supply alternate views only for known local demos. */
export function productImages(product: { id: string; sku: string; imageUrls?: string[] }): string[] {
  const originals = [...new Set((product.imageUrls || []).filter(Boolean))];
  const primary = productImage(product);
  const sample = sampleAssets.find(asset => asset.id === product.id && asset.sku === product.sku);
  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_LOCAL_PREVIEW === 'true'
    && sample && originals.length <= 1 && primary === `/images/products/${sample.file}.webp`) {
    return [primary, `/images/products/${sample.file}-top.webp`];
  }
  return originals.length ? originals : primary ? [primary] : [];
}
