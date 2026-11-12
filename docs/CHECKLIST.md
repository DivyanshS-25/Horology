# HOROLOGY — Phase Checklist & Verification Matrix

## Phase 00 — Foundation Checklist
- [x] Clean directory structure created
- [x] Reference image analyzed & color sampled into `css/tokens.css`
- [x] Hash-based client router with parametric routes and meta management
- [x] Central reactive store with namespaced `localStorage` and schema validation
- [x] Data schemas defined for watches, brands, articles, finder questions
- [x] Developer smoke test suite route `/#/__smoke` implemented
- [x] Branded 404 handler and safe navigation fallback
- [x] Zero console errors budget maintained

## Phase 01 — Shell & Design System Checklist
- [x] CSS Cascade layers (`reset`, `tokens`, `base`, `layout`, `components`, `pages`, `utilities`, `print`)
- [x] Midnight navy color system & typography scale with Google Fonts
- [x] Site header with desktop mega-menu navigation and search bar trigger
- [x] Mobile drawer navigation with smooth slide-over animation
- [x] Persistent sticky comparison dock / counter
- [x] Footer with brand philosophy, navigation columns, newsletter and copyright
- [x] Toast notification system for user actions (wishlist, compare, copy)
- [x] Accessible modal / dialog wrapper with focus trapping and ESC support

## Phase 02 — Seed Catalogue & Homepage Checklist
- [x] 24 comprehensive luxury watch records (6 Rolex, 6 Omega, 6 Tudor, 6 Grand Seiko)
- [x] Hero section matching panel 01 of reference with luxury timepiece visual
- [x] 4 Core Value Pillars (Authenticity, Movement Testing, Service History, Condition)
- [x] Curated Featured Timepieces carousel / grid
- [x] Brand family spotlight showcase (Rolex, Omega, Tudor, Grand Seiko)
- [x] Teaser blocks for Movement Lab and Authenticity Centre
- [x] Recent Collector's Journal articles teaser

## Phase 03 — Collection & Brand Pages Checklist
- [x] Dynamic collection view with real-time text search
- [x] Multi-faceted filtering (Brand, Price slider/bands, Movement type, Case size, Condition)
- [x] Sorting (Featured, Price Low-High, Price High-Low, Newest, Case Size)
- [x] Grid view with luxury watch cards, status tags, price in INR, wishlist heart, compare button
- [x] Quick-view modal with high-res preview and immediate specs
- [x] Brand directory page (`#/brands`)
- [x] Brand landing pages (`#/brand/omega`, `#/brand/rolex`, etc.) with heritage story & family tabs

## Phase 04 — Watch Detail Page Checklist
- [x] Full breadcrumb navigation
- [x] Multi-angle image gallery with interactive thumbnail switcher and full lightbox
- [x] Primary specs overview (Ref, Movement, Case size, Material, Power reserve, Price in INR, Availability)
- [x] 6-tab detailed inspection data panel:
  - 1. Overview & Heritage
  - 2. Technical Specifications
  - 3. Movement Performance Report with timegrapher readings
  - 4. Physical Condition Report & Grading
  - 5. Box, Papers & Accessories
  - 6. Service & Provenance History
- [x] Honest data status badges on each block
- [x] "Request This Watch" modal with demonstration reservation form and client validation

## Phase 05 — Inspection Dossier Checklist
- [x] Standalone printable dossier route (`#/watch/:slug/dossier`)
- [x] Horologist verification sign-off and serial identity verification
- [x] Timegrapher readings dial & positional matrix
- [x] Macro visual assessment breakdown
- [x] Print-optimized CSS (`@media print`) formatted cleanly for A4 export
- [x] Download / Print trigger button

## Phase 06 — Comparison & Wishlist Checklist
- [x] Comparison engine supporting 2 or 3 watches side-by-side
- [x] Spec-by-spec comparison matrix highlighting differences
- [x] Compare bar with quick add/remove and URL shareable state (`#/compare?ids=...`)
- [x] Dedicated Wishlist page (`#/wishlist`) with batch compare and clear actions
- [x] Recently viewed carousel tracking browsing history

## Phase 07 — Watch Finder Wizard Checklist
- [x] Step-by-step 6-stage wizard matching reference panel 08:
  - Step 1: Budget (Under ₹2L, ₹2-5L, ₹5-10L, ₹10-25L, Above ₹25L)
  - Step 2: Brand preference (Rolex, Omega, Tudor, Grand Seiko, Open to all)
  - Step 3: Style & Purpose (Diver, Chronograph, Dress, Pilot, Everyday)
  - Step 4: Movement Type (Automatic, Manual Wind, Spring Drive)
  - Step 5: Case Dimension (<39mm, 39-41mm, >41mm)
  - Step 6: Priority Traits (Heritage, Water Resistance, High Accuracy, Collectibility)
- [x] Transparent scoring engine providing percentage match and explanation tags
- [x] Shareable finder result deep-links

## Phase 08 — Movement Lab & Timegrapher Checklist
- [x] Interactive SVG mechanical escapement & balance wheel diagram matching panel 09
- [x] Component callout highlights (Mainspring, Barrel, Gear Train, Escapement, Balance Wheel, Rotor)
- [x] Interactive frequency controller (18,000 vph, 21,600 vph, 28,800 vph, 36,000 vph)
- [x] Live timegrapher acoustic trace visualizer on canvas
- [x] Interactive Amplitude, Daily Rate, and Beat Error controls with educational explanations

## Phase 09 — Authenticity Centre Checklist
- [x] 5-pillar forensic verification guide matching panel 10
- [x] Interactive loupe / zoom inspection simulator showcasing dial printing and engraving
- [x] Counterfeit detection education and database verification criteria

## Phase 10 — Collector's Journal Checklist
- [x] Editorial journal landing page with category filtering (Movements, Collecting, Buying Guides, Brand Histories)
- [x] Full article reader for core guides:
  - "Understanding Watch Amplitude: The Pulse of Mechanical Health"
  - "Box and Papers: What Really Matters in Pre-Owned Horology?"
  - "Automatic vs Manual Movements: The Collector's Dilemma"
- [x] Related timepieces cross-recommendations

## Phase 11 — Consignment, Salon & Legal Checklist
- [x] Sell / Consign multi-step evaluation calculator and submission form
- [x] Private salon appointment booking (`#/contact`) with date/time and timepiece interest selector
- [x] About HOROLOGY page detailing founding manifesto and horological curation standards
- [x] Complete legal pages (Privacy Policy, Terms of Service, Shipping & Returns)

## Phase 12 — Integration & Phase 13/14 Polish Checklist
- [x] End-to-end smoke test verifying all 30 routes pass with zero errors
- [x] Full keyboard navigation and ARIA attributes
- [x] Mobile drawer responsiveness and touch ergonomics
- [x] Performance optimization with zero external heavy dependencies
