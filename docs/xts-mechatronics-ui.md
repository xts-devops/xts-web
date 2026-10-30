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

## Brief product descriptions (2026-10-30)
Shared ProductCard now displays the existing description below each product name,
clamped to two lines at 12px with secondary text contrast. The two-line slot remains
reserved for missing descriptions to keep adjacent cards aligned; no invented copy.
The detail link references the description for assistive technology. Featured, shop
and related cards all inherit this change. Related loading now reuses the shared
ProductCardSkeleton, including its matching description slot. All eight local products
already contain brief descriptions. No data/API change or local database reset.
TypeScript, changed-file ESLint, existing SSR/helper regressions and HTTP home/catalog
checks pass. Browser visual testing remains pending due the previously recorded CUA
initialization failure.

## Mobile product refinement and third views (2026-10-30)

At phone widths (up to 639px), the main image stage is bounded to 180–240px using
viewport height. Thumbnails and 44px navigation controls share one strip. Horizontal
touch gestures change the main image; vertical page scrolling is retained. The native
larger-view dialog locks background scrolling while open and restores it on close.
Long descriptions have a four-line preview with Read more/Show less. Specifications
use an expandable 48px control; desktop retains full descriptions and specifications.
Mobile purchase controls keep full Add to cart/Buy now labels with 44px touch targets,
stock disabling, seller-chat loading feedback and safe-area spacing. Existing policy
copy is compacted; its outstanding owner-confirmation task is unchanged.

Recommendations become one horizontally scrollable, snap-aligned row on phones,
showing a partial next card to indicate more content. Images use a compact 1.6 aspect
ratio, names/descriptions retain two-line slots, and price/cart stay on one row with a
44px cart control. The rail can receive keyboard focus. Desktop grids are unchanged.
No entire recommendation list is hidden behind an extra button.

Third demo views are stored as public/images/products/{esp32,nema17,mg996r,pla,lidar,
bme280,buck,pi5}-angle.webp. Built-in imagegen prompt set: edit each original sample
into one additional low front three-quarter view from the other front corner; preserve
the design, proportions, geometry, component count, connectors/pins/cables/colors and
markings; do not invent backside circuitry or new features; center the entire product
with 15% margin, warm off-white studio background and soft shadow; no added text or
graphics. Converted to 800px WebP via Sharp, with originals retained. Each demo now
has original/top/angle views. The exact-id/SKU helper also upgrades existing one/two-
image demo records without a database reset; any gallery containing a seller URL is
preserved. Production never synthesizes these demo URLs. All views remain labeled
illustrative; they are not manufacturer photos or technical reference.

TypeScript, changed-file ESLint, SSR/helper regressions and local HTTP product/catalog
checks pass. The generated asset contact sheet is inspected separately from UI QA.
CUA still fails initialization with the missing kernel-assets path, so viewport,
actual swipe/scroll, accordion, keyboard/dialog focus and cart/chat interaction QA
remain pending. No production data, dependencies or API/DTO changes.

## Four recommendation rows (2026-10-30)
The user's latest request replaces the horizontal phone rail and desktop recommendation
grid with four stacked rows (one product per row) across viewport sizes. Each row uses
a compact left image, middle name/description/availability, and right price/44px cart
control. Loading uses the same row geometry; real card links and stock guards remain.
The existing limit of four is unchanged; smaller catalogs show only actual available
suggestions. Homepage and shop grids remain unchanged. TypeScript, changed-file lint,
SSR/helper regressions and HTTP preview checks pass; visual browser QA remains pending.

## Recommendation column correction (2026-10-30)
The user clarified that "four" means four products across on desktop, not four stacked
rows. The earlier stacked-row interpretation is superseded. Recommendations now use
four columns from 1024px and two columns below that. Removed the stacked-row overrides
and retained standard shared cards/skeletons. Phone cards use compact image ratios,
two-line names/descriptions, 44px cart buttons and wrapping price/actions when needed.
No horizontal rail, duplicate suggestions or empty placeholder products. Homepage/shop
layouts and product-detail/gallery behavior are unchanged. TypeScript, changed-file
ESLint, existing SSR/helper regressions, HTTP preview and git diff --check pass. Visual
browser QA remains pending because of the previously recorded CUA initialization issue.
