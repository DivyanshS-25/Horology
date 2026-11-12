# HOROLOGY — Watch Detail Experience Specification
**Route:** `#/watch/:watchId` (and `#/watch/:slug`)  
**Controller:** `pages/watch-detail.js`  
**Stylesheet:** `css/watch-detail.css`  
**Components:** `js/gallery.js`, `js/enquiry.js`, `js/components.js`  
**Creative Direction:** Direction C — Midnight Navy (`#07111F` / `#8DB8E8` / `#263A50`)

---

## 1. Architectural Overview

The Watch Detail Page delivers an observatory-grade individual chronometer examination environment. Designed as a flexible, zero-build Vanilla ES Module component, it maps dynamically from `#/watch/:watchId` and `#/watch/:slug` using the unified `findWatchByIdentifier(identifier)` selector.

The layout is partitioned into seven cohesive sections:
- **Section A:** Editorial Product Hero (58% / 42% asymmetric desktop split)
- **Section B:** Curatorial Overview & Historical Provenance
- **Section C:** Six-Point Technical Specifications Matrix (Collapsible on mobile)
- **Section D:** Movement Intelligence & Architecture
- **Section E:** Condition Assessment & Expandable 5-Tier Grading Rubric
- **Section F:** Embedded HOROLOGY Inspection Dossier Summary Banner
- **Section G:** Curated Related Allocations (3–4 card grid)

---

## 2. Interactive Gallery Stage & Loupe Zoom Mechanics (`js/gallery.js`)

The gallery is encapsulated inside `GalleryController` (`js/gallery.js`):
- **Responsive Staging:** 1:1 square framing on desktop; 4:5 aspect ratio constrained to `max-height: 62vh` on mobile screens.
- **Interactive Loupe Magnification:**
  - 150px circular lens with `2.2×` magnification.
  - Activated on desktop hover (`mouseenter` / `mousemove`).
  - Follows cursor coordinates precisely across the stage without causing document layout reflows or DOM jitter.
- **Touch Swipe Gestures:**
  - Native `touchstart` and `touchend` listeners calculate horizontal displacement ($\Delta X > 40\text{px}$) to advance or rewind slides naturally on mobile viewports.
- **Keyboard Navigation:**
  - `ArrowLeft` / `ArrowRight` navigate previous and next slides.
  - Ignored while focus is inside inputs or textareas.
- **Fullscreen Lightbox Modal:**
  - Triggered via top-right fullscreen button or double-click on stage image.
  - Deep Midnight Navy backdrop with `backdrop-filter: blur(16px)` and centered pan/zoom capability.
  - Dismissible via `Escape` key, backdrop click, or close button.
- **Strict Provenance & Placeholder Rules:**
  - Displays only verified Phase 01 assets with clear illustrative category tags (`Studio Master`, `Dial Macro`).
  - Renders a bespoke Midnight Navy architectural frame for unphotographed physical angles.
- **Condition Cross-Linking API:**
  - Exposes `gallery.selectIndex(idx)` allowing buttons in Section E (Condition Assessment) to smoothly jump the gallery stage to specific angles.

---

## 3. Sticky Identity & Action Panel

Positioned at `top: 96px` on desktop viewports:
- **Manufacture Eyebrow:** Brand wordmark, origin country (`Switzerland` / `Japan`).
- **Display Typography:** Cormorant Garamond display headline, monospace reference number and production year.
- **Badge Cluster:** Condition status badge, 7-Stage Inspection badge, and Demonstration Record pill.
- **Price Architecture:** Large format INR price display with VAT/duty and armored courier delivery notice.
- **Interactive Action Cluster:**
  - `Enquire About This Watch`: Primary button opening the accessible acquisition modal.
  - `Add to Wishlist`: Toggle button synced reactively with `store.toggleWishlist()`.
  - `Add to Compare`: Toggle button synced reactively with `store.toggleCompare()`.
  - `Share`: Triggers `navigator.share()` where supported, falling back to `navigator.clipboard.writeText()` with a confirmation toast.
- **Trust Reassurance:** Escrow protection, armored courier logistics, 24-month mechanical guarantee, lifetime authenticity warranty.

---

## 4. Technical Specifications Matrix (6 Structured Domains)

Organized into six logical domains:
1. **Identity & Origin:** Manufacturer, Model, Collection Family, Reference Number, Production Year, Country of Origin, Archival Serial Status.
2. **Case Architecture:** Metallurgy, Diameter, Lug-to-Lug span, Thickness, Lug Width, Crystal, Water Resistance, Bezel.
3. **Dial & Handset:** Dial Color, Surface Finish, Index Style, Luminescent Fill, Handset Geometry, Date Complication Placement.
4. **Movement Mechanics:** Calibre, Movement Type, Frequency (vph/Hz), Power Reserve, Jewel Count, Chronometer Standard.
5. **Bracelet & Ergonomics:** Type, Metallurgy, Clasp Architecture, Originality Status, Extra Straps.
6. **Archival Accessories:** Presentation Box, Papers, Service History, Warranty Backing.
- **Mobile Accordions:** Collapsible `<button class="specs-group-header" aria-expanded="...">` elements ensure mobile users can scan long technical lists effortlessly.
- **Null-Safety:** All unverified or non-standard measurements render graceful `"Not specified"` labels rather than invented numbers.

---

## 5. Movement Intelligence Panel

- Technical schematic card with calibre architecture, frequency, power autonomy, and jewels.
- Comprehensive explanation of proprietary escapements (Rolex Chronergy, Omega Co-Axial, Grand Seiko Spring Drive, Tudor Kenissi).
- Clear notice distinguishing manufacturer claims from lot-specific physical measurements.
- Direct link to the interactive Movement Lab (`#/movement-lab`).

---

## 6. Condition Assessment & Expandable 5-Tier Rubric

- **Overall Grade:** Matches watch `condition` (`Unworn`, `Excellent`, `Very Good`, `Good`, `Fair`).
- **Disclaimer Banner:** Explicitly notes that grades reflect HOROLOGY internal standards rather than a universal third-party standard.
- **Expandable Rubric:** Defines all five grading tiers with criteria for case lines, dial preservation, bracelet stretch, and movement cleanliness.
- **Component Breakdown Grid:** Eight individual assemblies (Case, Bezel, Crystal, Dial, Hands, Bracelet, Clasp, Movement) with quick-jump links (`gallery-jump-btn`) to the main gallery.

---

## 7. Private Acquisition Inquiry Modal (`js/enquiry.js`)

- Accessible modal dialog rendered into `#modalPortal`.
- Pre-populated with watch identity (`${watch.brand} ${watch.model} Ref. ${watch.referenceNumber}`).
- Validates Full Name, Email, Telephone, Salon Selector (Geneva, London, Tokyo, New York, Virtual), and Notes.
- Prominent demonstration honesty banner: *"Demonstration Inquiry — HOROLOGY is a demonstration platform. No commercial transaction or personal data transfer will occur."*
- Form submission logs the demonstration request and triggers an accessible toast notification.

