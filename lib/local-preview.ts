/**
 * Local preview mode: run the UI on localhost with sample data and a
 * dev-only login, no Firebase or Google credentials needed.
 * Enable with LOCAL_PREVIEW=true and NEXT_PUBLIC_LOCAL_PREVIEW=true in
 * .env.local. Always off in production builds.
 */
export const isLocalPreview = (): boolean =>
  process.env.NODE_ENV !== 'production' && process.env.LOCAL_PREVIEW === 'true';

/** Client-side check (for showing the dev login buttons). */
export const isLocalPreviewClient = (): boolean =>
  process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_LOCAL_PREVIEW === 'true';
