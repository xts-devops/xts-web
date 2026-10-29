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

## UI evaluation and changes

- Replaced the oversized text-only hero with a responsive product workbench and
  clear shop/fabrication links. Preserved service, expert and community destinations.
- Unified homepage/shop cards, readable mobile typography, prices, stock state,
  accessible add buttons, sample labels and consistent image framing.
- Search now includes category names and ignores surrounding spaces. Filters expose
  their selected state; empty searches can reset and fetch errors can retry.
- Added image sizes, lazy loading, priority loading for the hero/detail image, and a
  broken-image state. Product photos preserve aspect ratio rather than cropping.
- Matched navbar/footer/metadata/icons and updated the displayed company name.
- Added keyboard focus outlines, skip link, menu labels, Escape handling, and reduced
  motion styling. Mobile menu scrolls within the viewport.
- Removed nonfunctional social tiles, fake community posts and the newsletter form
  that showed success without persisting a subscription. Community remains linked.
- Removed the external paper texture request and corrected accent contrast on pale cards.
- Kept checkout, payment, authentication and API contracts unchanged by the UI commit.

## Verification scope

Use `LOCAL_PREVIEW=true` and `NEXT_PUBLIC_LOCAL_PREVIEW=true` in `.env.local`, then
`npm run dev`. The current checkout already has these flags enabled.

Verified at the available 585px in-app browser width: homepage, all eight product
images, ESP32 search (one result), Motors filter (two results), add-to-cart count and
cart image, out-of-stock disabled add control, light and dark themes. Product detail
and mobile menu are also included in the manual smoke check. No real orders,
payments or production-data operations were performed. Wider desktop and physical
phone QA remain a review item; no production build was attempted because it requires
the real Firebase build environment.

TypeScript and changed-file ESLint are required before committing. Remaining lint
warnings concern the pre-existing thumbnail/profile `<img>` elements.
