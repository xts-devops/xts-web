# XTS Mechatronics storefront update

Branch: `codex/xts-mechatronics-ui`.

The user authorized Codex to work in the UI lane for this change. The branch starts
from main and includes the existing coordination and dev-only local-preview commits
as dependencies. Main and production data are untouched.

Shared workflow (2026-10-30): both agents now use `D:\DEV WORKS\XTS PROJECT DEVS\XTS SHOP WEB`
on `codex/xts-mechatronics-ui`, preview port 3001, and PR #5. Claude's inner-page
consistency work and user-requested dotted background are integrated with the hero.
Follow AGENTS.md's fetch/fast-forward, exclusive file claims and commit/checks/next
handoff format. The old `xts-web-claude` worktree is retired and no longer present;
both agents' commit histories are retained. Earlier branch/port references are historical.

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

The existing dark industrial foundation, dotted background, restrained yellow accents,
compact XTS/Mechatronics branding and typography are retained. The refinements follow
this order: hero/search, featured products, categories, engineering services, a compact
factual support section, and the existing footer aligned with page content.

The hero uses natural height rather than forcing every featured card into the first
viewport. Vertical padding and the featured-section transition are tightened. Search
remains primary, with visible shopping/category links. Service, expert and community
shortcuts retain their separate routes and collapse to compact labels on phones.

CatalogSearch reuses the one products response already fetched by the homepage. A
memoized lookup supports up to four product suggestions and two unique category
suggestions after two characters. Arrow keys navigate, Enter selects or searches,
Escape closes, and blur/Tab dismiss the popup. IME composition is respected. Native
GET form semantics remain; no per-keystroke network requests, new endpoint or dependency.
Unavailable suggestions say out of stock. No empty/fake suggestion content is invented.

Product cards use four columns from 1100px, three on tablets/laptops below that, and
two below 768px. Images share aspect ratio and insets with explicit responsive sizes.
Names use two reserved lines; prices, ratings and availability have distinct hierarchy.
The whole card links to details while the separate 44px cart button retains its action.
Cart icons, hover/focus tooltips, added-state feedback and out-of-stock disabling remain.
Pointer hover is limited to 2px/180ms and is disabled with reduced motion. Loading
skeleton dimensions track the real card slots. Small cards wrap price/cart controls.

Six category cards use exact loaded category names where available, with search fallback
otherwise. Counts appear only for actual returned listings. Four engineering cards link
to existing 3D-printing, laser-cutting, PCB and consultation routes. The support section
links to product details, dashboard updates and messaging. No testimonial, certification,
shipping, warranty, payment-security or customer-count claims were added. Footer and
mobile category navigation match the existing routes.

## Verification (2026-10-30)

- TypeScript passes; changed-file ESLint has zero errors and two pre-existing navbar
  profile-image warnings. git diff --check passes.
- HTTP 200 from dev-only port 3001: home, shop search, all three fabrication types and
  consultation. Home HTML contains the expected category, engineering, support and
  combobox sections.
- Real React server-render assertions cover product links, cart icon/tooltip,
  out-of-stock disabling, added feedback, lazy images/sizes, native GET search fallback
  and collapsed combobox semantics. Script: ignored .local-preview/verify-commerce.cjs.
- Selected foreground/background contrast calculations: yellow primary action 9.39:1,
  dark secondary text 6.46:1, dark availability 8.33:1, light availability 6.31:1,
  light accent 5.14:1. These checks do not constitute a full accessibility audit.

The CUA browser tool still cannot initialize (missing kernel-assets path), including
reset/retry. No new screenshot or interactive browser validation is claimed. Before
production signoff, review 320/375/768/1024/1440px widths and short viewport heights;
check search arrow/Enter/Escape/Tab and outside dismissal, card-vs-cart click isolation,
category/service navigation, focus/tooltips, touch behavior, reduced motion, light/dark
contrast, image fallback and horizontal overflow. Earlier checks in PROGRESS predate
this refinement. Physical-device testing and formal performance/a11y audits are pending.

No production data, real orders/payments, auth changes or backend contract changes were
made. The production build requires the real Firebase environment and was not attempted.

## Product detail refinement (2026-10-30)

The detail page uses a bounded 540px-wide 4:3 gallery instead of a full-column square.
Desktop purchase controls appear before specifications; mobile keeps its compact fixed
action bar with safe-area spacing. Titles/prices and vertical spacing are reduced.
Gallery controls include horizontally scrollable thumbnails, previous/next, keyboard
arrows/Home/End and a native dialog for a larger view with Escape/close behavior.
Missing and single images do not create fake thumbnails. Seller image arrays are
preserved and deduplicated. Product changes reset gallery/cart feedback and cancel old
requests; request failures offer retry rather than incorrectly reporting a missing item.

"You may also like" follows the product/purchase area. Up to four unique products from
the existing catalog are ranked by stock availability, exact category, then price
proximity. Current product is excluded. Cards retain detail links/cart controls;
loading, failure and empty catalogs have deliberate fallbacks. Suggestions do not
assert compatibility. No additional API or dependencies were introduced.

Alternate demo image files: public/images/products/{esp32,nema17,mg996r,pla,lidar,
bme280,buck,pi5}-top.webp. Generated with built-in imagegen using each existing sample
as its edit target, then converted to 800px WebP with Sharp. Shared prompt: create one
alternate elevated front view looking more directly from above; preserve geometry,
component count, colors, pins, connectors, cable and visible markings; do not invent
internal parts/unseen rear circuitry; center the complete product with generous margin
on the same warm off-white studio background, soft shadow, no added captions/text.
These are illustrative demo views, not manufacturer photography. Only exact known
local demo records get synthesized alternate image URLs, with production disabled;
real seller galleries remain as supplied. New local seeds include both views.

Checks: TypeScript and changed-file ESLint pass with zero warnings/errors. Product
ranking/gallery-source and React SSR checks pass (ignored verification script under
.local-preview/verify-product-detail.cjs), including duplicate/current exclusions,
stock/category priority, small catalogs, seller-photo preservation, demo-only behavior,
thumbnail labels/selection, larger-view dialog and zero/one-image fallback. HTTP product
and catalog routes return 200. CUA still fails initialization with missing kernel assets;
visual viewport checks, keyboard events, dialog focus/scroll restoration, touch and
real cart/chat interactions are pending. No production orders or data were accessed.
Existing warranty/shipping/return policy-copy confirmation remains in TASKS.
