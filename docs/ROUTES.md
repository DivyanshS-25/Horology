# HOROLOGY — Route & Sitemap Registry

The application implements client-side hash routing supporting static paths, parameterized `:slug` and `:watchId` routes, dynamic `document.title` synchronization, and scroll restoration across all 22 sitemap destinations.

---

## Complete 22-Route Registry

| # | Sitemap Page | Hash Route | Template Module | Dynamic Parameters | View Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Home** | `#/` | `pages/home.js` | None | Full 10-section flagship homepage: Cinematic Hero, 2-column intro, 4 manufacture gateways, curated collection showcase, inspection dossier schematic preview, movement lab preview, collector's selection 1+2 spotlight, journal strip, security chamber, and closing chamber. |
| 2 | **Collection** | `#/collection` | `pages/catalog.js` | `query.brand` (optional) | Curated marketplace featuring debounced multi-token search, 8-facet filter sidebar + mobile drawer, active filter chips, 6-mode sorting, dynamic facet counters, pagination, and Quick View modal. |
| 3 | **Rolex Collection** | `#/brands/rolex` | `pages/catalog.js` | `brand: 'rolex'` | Dedicated Rolex collection view: Hero with non-affiliation disclaimer, philosophy, model family filter (Submariner, GMT-Master II, Datejust, Daytona, Explorer), spotlight card, preview grid, and collection CTA. |
| 4 | **Omega Collection** | `#/brands/omega` | `pages/catalog.js` | `brand: 'omega'` | Dedicated Omega collection view: Hero with non-affiliation disclaimer, philosophy, model family filter (Speedmaster, Seamaster, Aqua Terra, Constellation), spotlight card, preview grid, and collection CTA. |
| 5 | **Tudor Collection** | `#/brands/tudor` | `pages/catalog.js` | `brand: 'tudor'` | Dedicated Tudor collection view: Hero with non-affiliation disclaimer, philosophy, model family filter (Black Bay, Pelagos, Ranger, Royal), spotlight card, preview grid, and collection CTA. |
| 6 | **Grand Seiko Collection** | `#/brands/grand-seiko` | `pages/catalog.js` | `brand: 'grand-seiko'` | Dedicated Grand Seiko view: Hero with non-affiliation disclaimer, philosophy, model family filter (Heritage, Evolution 9, Elegance, Sport), spotlight card, preview grid, and collection CTA. |
| 7 | **Watch Detail** | `#/watch/:slug` | `pages/watch-detail.js` | `:slug` or `:watchId` | Full 7-section individual timepiece profile: Section A 58%/42% Hero with 2.2× interactive loupe, touch swipe, thumbnail rail, lightbox, sticky action panel, Wishlist/Compare toggles, share, enquiry modal; Section B Overview; Section C 6-Group Specs Matrix; Section D Movement Intelligence; Section E Condition Assessment; Section F Dossier Preview; Section G Related Watches. |
| 8 | **Inspection Dossier** | `#/inspection/:watchId` | `pages/dossier.js` | `:watchId` or `:slug` | Canonical forensic archival report: Part A Intake Scope; Part B Mechanical Telemetry with strict demonstration honesty disclosure; Part C 8-Point Authenticity Review Table; Part D Documentation Inventory; Part E Inspection Photography; Print / Save as PDF engine (`window.print()`). |
| 8b | *Dossier Legacy Alias* | `#/dossier/:slug` | `pages/dossier.js` | `:slug` | Backward-compatible alias routing directly to canonical Inspection Dossier handler. |
| 9 | **Watch Comparison** | `#/compare` | `pages/compare.js` | None (reads state, supports `?ids=`) | Side-by-side comparison matrix for 2 to 4 watches; sticky specification column, mobile snap track, difference highlighting toggle, 6 horological domains, curated presets, factual comparative insights, and quick watch-picker modal. |
| 10 | **Watch Finder** | `#/watch-finder` | `pages/finder.js` | None (supports `#/finder` alias) | 9-step interactive consultation wizard (Budget, Manufacture, Typology, Movement, Case Diameter, Character, Dial, Metallurgy, Provenance) with weighted scoring, criteria relaxation, match badges, and preference saving. |
| 10b | *Watch Finder Alias* | `#/finder` | `pages/finder.js` | None | Backward-compatible alias routing directly to canonical Watch Finder consultation wizard. |
| 10c | **Recently Viewed** | `#/recently-viewed` | `pages/recently-viewed.js` | None (reads state) | Persistent 12-watch examination history queue with deduplication, clear history action, and embedded shelves across views. |
| 11 | **Movement Lab** | `#/movement-lab` | `pages/movement-lab.js` | None | Educational laboratory detailing mainspring, barrel, gear train, Swiss lever escapement, balance oscillator, and rotor mechanics. |
| 12 | **Authenticity Centre** | `#/authenticity` | `pages/authenticity.js` | None | Comprehensive explanation of the 7-Stage Forensic Verification Standard, testing laboratory instrumentation, and lifetime guarantee. |
| 13 | **Collector's Journal** | `#/journal` | `pages/journal.js` | None | Editorial landing with category navigation tabs, featured lead essay, and responsive grid of horological analyses. |
| 14 | **Journal Article** | `#/journal/:slug` | `pages/article.js` | `:slug` (article slug) | Full reader view with editorial typography, author bylines, pull quotes, technical prose, and referenced timepieces strip. |
| 15 | **Saved Wishlist** | `#/wishlist` | `pages/wishlist.js` | None (reads state) | Saved timepieces vault; portfolio valuation metrics, multi-item batch selection, Compare Selected (2-4), batch removal, Clear Vault with accessible Undo toast, Enquiry triggers, and Share. |
| 16 | **Sell / Consign** | `#/consign` | `pages/consign.js` | None | 4-stage consignment journey, valuation models, insured armored courier logistics, and digital appraisal inquiry form. |
| 17 | **About HOROLOGY** | `#/about` | `pages/about.js` | None | Institutional narrative, horological credo, WOSTEP watchmaker credentials, and international private salon network. |
| 18 | **Contact & Appointment**| `#/contact` | `pages/contact.js` | `query.ref` (optional) | Salon locations (Geneva, London, Tokyo, New York) and private viewing appointment booking form. |
| 19 | **Privacy Policy** | `#/legal/privacy` | `pages/legal.js` | `topic: 'privacy'` | Swiss FADP-compliant privacy standards and client data governance terms. |
| 20 | **Terms & Conditions** | `#/legal/terms` | `pages/legal.js` | `topic: 'terms'` | Institutional terms of service, trademark acknowledgments, and 24-month mechanical warranty terms. |
| 21 | **Shipping & Returns** | `#/legal/shipping` | `pages/legal.js` | `topic: 'shipping'` | Armored insured transit logistics, 14-day private inspection policy, and return protocol. |
| 22 | **404 Recovery** | `#/404` | `pages/not-found.js` | None (fallback) | Custom horological recovery view with animated balance motif and direct recovery links to Home and Collection. |
