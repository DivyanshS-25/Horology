# HOROLOGY — UI Component Library Documentation

The HOROLOGY component library is implemented as pure, stateless UI component factories in `js/components.js`, styled strictly via `css/components.css` and scoped sheets using Direction C Midnight Navy design tokens.

---

## Component Catalog

### 1. `createButton(options)`
Generates accessible button elements or styled anchor links.
- **Options:**
  - `label`: Button text string (escaped automatically).
  - `href`: Optional URL. If provided, renders an `<a>` tag; otherwise renders `<button type="button">`.
  - `variant`: `'primary'` | `'secondary'` | `'outline'` | `'ghost'`.
  - `size`: `'sm'` | `'md'` | `'lg'`.
  - `icon`: Optional inline SVG icon string.
  - `iconPosition`: `'left'` | `'right'`.
  - `ariaLabel`: Accessible screen-reader label.
  - `disabled`: Boolean indicating disabled state (`aria-disabled="true"`).

### 2. `createWatchCard(watch, options)`
Generates a luxury timepiece card in 1:1 square media framing.
- **Features:**
  - Status badge overlay (`Verified`, `Reserved`, etc.).
  - Quick View trigger hover overlay bar (`data-action="quick-view"`).
  - Interactive Wishlist heart toggle button with reactive state binding (`data-action="toggle-wishlist"`).
  - Interactive Compare scale toggle button (`data-action="toggle-compare"`).
  - Fallback-safe image resolution via `resolveAsset()`.
  - Condition pill and box/papers pill.
  - Demonstration record honesty disclosure label.
  - Manufacture brand, model name, reference number, year, and formatted price.
  - Quick spec strip (Case diameter, Movement type, Material).
  - Direct detail link (`#/watch/:slug`).

### 3. `createBrandCard(brand)`
Generates an architectural manufacture gateway card.
- **Features:**
  - Balance wheel brand emblem.
  - Manufacture name, origin, and founding year.
  - Authoritative horological thesis summary.
  - Direct route link (`#/brands/:id`).

### 4. `createActiveFilterPill(filterKey, value, label)`
Generates a dismissible filter chip for the active filter bar.
- **Features:**
  - Displays readable facet category and active value.
  - Integrated dismiss button with `data-action="remove-filter"`, `data-filter-key`, and `data-filter-val`.
  - Keyboard accessible.

### 5. `quickView` Modal Controller (`js/quick-view.js`)
Full-screen modal dialog providing deep timepiece examination without route navigation.
- **Features:**
  - Focus trapping and `Escape` key dismissal.
  - 4:5 aspect ratio image presentation frame.
  - Live Wishlist & Compare toggle buttons reflecting global state.
  - 8-point horological specification table.
  - Demonstration record honesty disclosure.
  - Direct route navigation CTA (`#/watch/:slug`).

### 6. Interactive Gallery Stage & Loupe Zoom (`pages/watch-detail.js`, `css/watch-detail.css`)
Observed in Section A of the Watch Detail Page.
- **Features:**
  - Aspect-ratio 1:1 (desktop) or 4:5 (mobile max 62vh).
  - 2.2× magnification loupe overlay following the cursor on desktop without causing layout shift.
  - Touch-swipe gesture tracking on touchscreens (`touchstart` and `touchend`).
  - Keyboard arrow key navigation (ArrowLeft / ArrowRight).
  - Active thumbnail rail with verified assets and architectural placeholder for unphotographed angles.
  - Fullscreen lightbox button opening high-res view with `Escape` key dismissal.

### 7. Private Acquisition Inquiry Modal (`pages/watch-detail.js`, `css/watch-detail.css`)
Accessible modal dialog rendered into `#modalPortal`.
- **Features:**
  - Structured fields: Full Name, Email, Salon selection (Geneva, London, Tokyo, New York, Virtual), Horological notes.
  - Prominent demonstration honesty banner: *"Demonstration Inquiry — HOROLOGY is a demonstration platform. No commercial transaction or personal data transfer will occur."*
  - Instant client-side validation and toast feedback.

### 8. Six-Point Technical Specifications Matrix (`pages/watch-detail.js`)
Hairline specifications table organized into six logical domains:
1. Identity & Origin
2. Case Architecture
3. Dial & Handset
4. Movement Mechanics
5. Bracelet & Ergonomics
6. Archival Accessories
- Mobile viewport: Clickable accordion headers to collapse and expand groups.

### 9. Printable Inspection Dossier Sheet (`pages/dossier.js`, `css/print.css`)
Institutional technical document presenting complete forensic provenance.
- **Sections:**
  - Part A: Protocol Framework & Intake Scope
  - Part B: Mechanical Performance Telemetry with strict demonstration honesty disclosure (`measuredValuesAvailable: false`)
  - Part C: Eight-Point Authenticity & Originality Review Table
  - Part D: Accompanying Documentation & Accessories Inventory
  - Part E: Physical Inspection Photography Grid
- **Print Optimization:** Formatted for A4 paper via `@media print`, suppressing site navigation and buttons, and presenting high-contrast monochrome tables.

### 10. `createStatusBadge(status, text)`
Compact monospace status indicator.
- **Variants:**
  - `badge-verified` (`#5CB88A` on dark green tint): Passed 7-stage inspection.
  - `badge-reserved` (`#D4A857` on gold tint): Client allocation reserved.
  - `badge-archived` (`#7B8FA6` on slate tint): Retired vault reference.
  - `badge-subtle` (`#8DB8E8` on icy blue tint): Neutral reference tag.

### 11. `createBreadcrumb(crumbs)`
Monospace path trail for orientation.
- **Structure:**
  - Semantic `<nav aria-label="Breadcrumb"><ol>` with hairline separators (`/`).
  - Active item marked with `aria-current="page"`.

### 12. `createSpecRow(label, value, isMono)`
Hairline key-value row for horological specification tables.
- **Layout:** Label left (sans-serif muted), tabular value right (JetBrains Mono).

### 13. `createEmptyState(options)`
Centered Midnight Navy recovery panel.
- **Usage:** Rendered when wishlist is empty, comparison tray has no watches, or search yield is zero.
- **Options:** `title`, `description`, `actionText`, `actionHref`, `icon`.

### 14. `createLoadingState(options)`
Subtle animated pulse skeleton placeholder matching midnight navy tokens.

### 15. `createErrorState(options)`
Horological diagnostic error panel with return CTA and danger accenting.
