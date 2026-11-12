# HOROLOGY — Beyond Time. Beyond Ordinary.

> Luxury pre-owned mechanical chronometer marketplace specializing in Rolex, Omega, Tudor, and Grand Seiko. Engineered in pure semantic HTML5, CSS3, and Native ES Modules in **Direction C — Midnight Navy**.

---

## Architecture Highlights

- **Static Zero-Build Modular SPA:** Runs natively in modern browsers with `<script type="module">` and zero build tooling (no Webpack, Vite, Node, or npm required).
- **Client Hash-Based Router (`#/route`):** 100% resilient on GitHub Pages and nested subdirectories (`https://<user>.github.io/HOROLOGY/`); deep links never throw 404 errors.
- **Direction C — Midnight Navy Design System:** Deep nocturnal navy canvas (`#07111F`, `#0B192A`, `#102238`), icy pale-blue accents (`#8DB8E8`), editorial serif typography (Cormorant Garamond), and tabular chronometer specs (JetBrains Mono).
- **Phase 01 Asset Manifest Resolver (`js/assets.js`):** Manifest-driven relative path normalization (`./assets/...`) and fallback horological SVG frames.
- **Central Reactive State Store (`js/state.js`):** Pub/sub state management with `localStorage` persistence powering live Wishlist and Compare header counter badges.

---

## Directory Layout

```text
HOROLOGY/
│
├── index.html                  # Single SPA entry point, Google Fonts, semantic shell, portals
├── 404.html                    # Subdirectory SPA fallback redirector
├── README.md                   # Project overview & local server instructions
├── ASSET_CATALOG.md            # [Phase 01] Human-readable asset inventory
├── asset-manifest.json         # [Phase 01] Machine-readable asset registry
│
├── assets/                     # [Phase 01] Photography, brand marks, icons
│   ├── images/                 # Hero, background, and OpenGraph photography
│   ├── logos/                  # HOROLOGY vector logos
│   ├── icons/                  # SVG icons & sprite.svg
│   ├── favicons/               # Brand favicons
│   └── fonts/                  # OFL licenses & font declarations
│
├── css/
│   ├── tokens.css              # Direction C Midnight Navy palette & token system
│   ├── reset.css               # Accessible CSS reset & normalization
│   ├── typography.css          # Fluid serif, sans, and tabular monospace scales
│   ├── global.css              # Base body styling, custom scrollbars, utility classes
│   ├── layout.css              # 12-column grid, responsive containers
│   ├── components.css          # Buttons, watch/brand cards, badges, spec rows, modals, toasts
│   ├── navigation.css          # Header, Brands dropdown, Search overlay, Mobile drawer, Footer
│   ├── animations.css          # Subtle luxury transitions & reduced-motion overrides
│   └── responsive.css          # Mobile-first adaptive rules (360px through 1920px)
│
├── js/
│   ├── app.js                  # Application bootstrap & error boundary
│   ├── router.js               # Hash SPA router supporting 22 routes & dynamic params
│   ├── state.js                # Pub/sub reactive store with localStorage persistence
│   ├── assets.js               # Manifest asset resolver & fallback SVG generator
│   ├── data.js                 # Seed data: 4 brands, 24 timepieces, articles, legal copy
│   ├── components.js           # Pure UI component factories
│   ├── navigation.js           # Header scroll observer, search overlay, drawer, footer
│   └── utilities.js            # Formatters, focus trap, debounce, DOM helpers
│
├── pages/
│   ├── home.js                 # Route 1: Home
│   ├── catalog.js              # Routes 2–6: Master Collection & 4 Brand Views
│   ├── watch-detail.js         # Route 7: Watch Details
│   ├── dossier.js              # Route 8: Forensic Inspection Dossier
│   ├── compare.js              # Route 9: Watch Comparison Matrix
│   ├── finder.js               # Route 10: Guided Watch Finder
│   ├── movement-lab.js         # Route 11: Movement Lab
│   ├── authenticity.js         # Route 12: Authenticity Centre
│   ├── journal.js              # Route 13: Collector's Journal
│   ├── article.js              # Route 14: Journal Article Reader
│   ├── wishlist.js             # Route 15: Saved Wishlist Vault
│   ├── consign.js              # Route 16: Sell / Consign
│   ├── about.js                # Route 17: About HOROLOGY
│   ├── contact.js              # Route 18: Contact & Private Appointment
│   ├── legal.js                # Routes 19–21: Legal & Governance (Privacy, Terms, Shipping)
│   └── not-found.js            # Route 22: 404 Recovery Fallback
│
└── docs/
    ├── ARCHITECTURE.md         # System architecture & module contracts
    ├── DESIGN_SYSTEM.md        # Midnight Navy tokens, type scale, component visual specs
    ├── ROUTES.md               # 22-route registry & template mappings
    ├── COMPONENTS.md           # Reusable UI component catalog
    └── PROJECT_PROGRESS.md     # Phase milestone tracker & completion record
```

---

## Local Development & Testing

Native ES modules (`<script type="module">`) require serving over an HTTP origin (CORS restrictions prevent loading modules over raw `file://`).

Run any static server from the repository root:

```bash
# Python 3
python -m http.server 8000

# Node / npx
npx serve .

# PHP
php -S localhost:8000
```

Then navigate to:
```text
http://localhost:8000/#/
```

---

## Complete 22 Sitemap Routes

1. `#/` — Home (Hero, Pillars, Featured Watches, Verification Standard)
2. `#/collection` — Master Collection (24 timepieces)
3. `#/brands/rolex` — Rolex Collection
4. `#/brands/omega` — Omega Collection
5. `#/brands/tudor` — Tudor Collection
6. `#/brands/grand-seiko` — Grand Seiko Collection
7. `#/watch/:slug` — Timepiece Details & Telemetry
8. `#/dossier/:slug` — Forensic Inspection Dossier & Timegrapher Certification
9. `#/compare` — Side-by-Side Comparison Matrix
10. `#/finder` — Guided 6-Step Watch Finder
11. `#/movement-lab` — Movement Lab & Mechanical Calibre Science
12. `#/authenticity` — Authenticity Centre & 7-Stage Inspection Standard
13. `#/journal` — Collector's Journal Editorial Index
14. `#/journal/:slug` — Full Article Reader
15. `#/wishlist` — Saved Timepieces Vault
16. `#/consign` — Sell / Consign Valuation Workflow
17. `#/about` — About HOROLOGY Institutional Narrative
18. `#/contact` — Contact & Private Salon Appointment
19. `#/legal/privacy` — Privacy Policy
20. `#/legal/terms` — Terms & Conditions
21. `#/legal/shipping` — Shipping & Returns Policy
22. `#/404` — Chronometer Out of Alignment (404 Fallback)
