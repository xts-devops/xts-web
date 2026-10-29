# XTS Mechatronics storefront update

Branch: `codex/xts-mechatronics-ui`.

The user authorized Codex to work in the UI lane for this change. The branch starts
from main and includes the existing coordination and dev-only local-preview commits
as dependencies. Main and production data are untouched.

## Brand asset index

- Reference selected: `Screenshot 2026-10-15 023555.png` (white mark).
- `components/icons/index.tsx`: scalable SVG interpretation of the selected mark.
- `components/layout/Brand.tsx`: responsive mark + XTS Mechatronics wordmark.
- `public/brand/xts-mechatronics.svg`: standalone white wordmark for dark surfaces.
- `public/icon.svg`, `public/favicon.svg`, `public/favicon.ico`, `app/favicon.ico`:
  matching browser icons. The screenshot's old company name is not embedded.
- Palette: charcoal `#151719`, warm brass `#dfba76`, light product-photo surfaces.
  Light mode uses a darker amber for readable accent text.

## Product asset index

`lib/sample-assets.ts` maps all eight local-preview product IDs and SKUs to these
files in `public/images/products/`. Original seller URLs take priority. Only the
known demo IDs and SKUs can replace the old inline placeholders, and only in
development preview. New seeds point directly to the assets. Existing preview data
does not need to be deleted. No products are inserted into production.

| File | Product | WebP bytes |
| --- | --- | ---: |
| `esp32.webp` | ESP32 DevKit V1 | 54656 |
| `nema17.webp` | NEMA 17 Stepper Motor | 38890 |
| `mg996r.webp` | MG996R Metal Gear Servo | 34382 |
| `pla.webp` | PLA+ Filament 1.75mm | 46714 |
| `lidar.webp` | TF-Luna LiDAR Sensor | 27916 |
| `bme280.webp` | BME280 Environment Sensor | 35450 |
| `buck.webp` | LM2596 Buck Converter | 56964 |
| `pi5.webp` | Raspberry Pi 5 (8GB) | 65882 |

These are AI-generated illustrative samples, not manufacturer photographs. They
are labeled as samples in the UI and must be replaced with actual item photos
before using them to represent sale inventory. Built-in image generation was used;
Sharp converted the results to 800px WebP at quality 82 (360854 bytes total).

Generation prompt, once per subject below:

> Use case: product-mockup. Asset type: sample ecommerce catalog image.
> Photorealistic studio product photograph of [subject]. One isolated product at a
> three-quarter angle, entirely visible, centered with generous 15% margins on a
> warm very light gray seamless background. Soft natural shadow, crisp component
> detail, neutral accurate colors. Square composition. No added text, no price,
> no watermark. Illustrative sample photograph, not a technical reference.

Subjects:

- ESP32 DevKit V1 development board, black PCB, metal shield Wi-Fi module and two parallel rows of pin headers, micro USB.
- NEMA 17 stepper motor, square silver faceplate, cylindrical steel shaft and black motor body with four colored wires.
- MG996R hobby servo, black rectangular plastic body, metal spline and cross-shaped black servo horn, three-wire orange red brown cable.
- One spool of matte black PLA 1.75mm 3D printer filament on black plastic reel.
- TF-Luna compact LiDAR distance sensor module, small black rectangular dual optical window housing and white JST connector.
- BME280 environmental sensor breakout, tiny purple PCB with metallic sensor and six gold header pins.
- LM2596 DC buck converter module, blue PCB with blue adjustment potentiometer, large copper inductor and two electrolytic capacitors.
- Raspberry Pi 5 single board computer, green PCB with silver USB and ethernet ports, black chips, two micro HDMI ports and 40-pin GPIO header.

## Current public UI

The latest user direction replaces the earlier marketing and enlarged-header
iterations. The header uses a compact XTS mark and a separate Mechatronics department
label. Below 400px, the department moves out of the header row; it remains in the
homepage context, mobile menu and footer. The header is a stable 64px high and shares
the page content alignment.

The homepage contains a direct introduction, category shortcuts, featured products,
and services/support links. Removed the signature slogans, serif headline, glows,
orbits, background dot grid, tilt, decorative diagram, numbered panels, redundant
hero product display, repeated calls to action, and entrance/hover movement.
Product photos remain labeled, with working catalog search, categories, cart feedback
and stock states. Focus outlines, skip link, mobile menu/Escape, reduced-motion
support and light/dark themes remain. The footer, shop heading and metadata use plain
language. No new dependency or third-party request was added.

The storefront CSS was consolidated instead of layering further overrides onto the
marketing treatment. The header no longer attaches a scroll listener or changes size
while scrolling. Narrow 320px product cards wrap the price and add button to avoid
collisions; long category labels truncate while product names remain readable.

## Verification

TypeScript passes. Changed-file ESLint reports zero errors and two pre-existing
profile-image warnings in Navbar. Browser review uses the main 585px view plus
320px, 375px and 1280px iframe viewports in an ignored local review harness, including
light/dark phone views and catalog/navigation smoke checks. Existing local sample
data and seller uploads are preserved. No production data, real orders, payments or
real login were used. Physical-device testing and formal accessibility/performance
audits remain outside these checks. A production build requires the real Firebase
environment and was not attempted.
