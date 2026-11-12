# HOROLOGY — Wishlist System Architecture ("My Collection of Desires")
**Route:** `#/wishlist`  
**Controller:** `pages/wishlist.js`  
**Stylesheet:** `css/collector-tools.css`  
**Shared State Module:** `js/state.js`  
**Creative Direction:** Direction C — Midnight Navy

---

## 1. Architectural Overview

"My Collection of Desires" transforms the traditional e-commerce "save for later" feature into an observatory-grade private collector vault. It enables collectors to curate shortlisted timepieces, analyze total portfolio valuation, initiate comparative studies, execute batch operations, and share curated references.

---

## 2. Vault Header & Valuation Metrics Bar

At the top of `#/wishlist`:
- **Editorial Eyebrow:** *"Private Observatory Vault"*
- **Title:** Cormorant Garamond display headline *"My Collection of Desires"*
- **Subtitle:** *"Timepieces worth remembering. Curate, monitor valuation, and evaluate for private acquisition."*
- **Action Buttons:** Quick links to *"Find More Timepieces"* (`#/watch-finder`) and *"Continue Browsing"* (`#/collection`).
- **Valuation Metrics Bar (`.vault-summary-panel`):**
  - **Saved Timepieces:** Total count of active references in the vault.
  - **Total Portfolio Valuation:** Cumulative acquisition value of all saved timepieces, formatted in Indian Rupees (INR) with standard lac and crore notation.
  - **Average Reference Value:** Mean price per saved timepiece.
  - **Collector Full Sets:** Ratio and percentage of saved watches retaining both their original presentation box and stamped international guarantee papers.

---

## 3. Product Cards & Per-Watch Actions

Each saved timepiece is rendered inside `.vault-watch-card` with:
- **Media Presentation:** High-resolution product thumbnail with fallback SVG resolver (`js/assets.js`).
- **Timestamp Metadata:** Dynamic `Added [Formatted Date]` string (e.g., `Added 12 Nov 2026`) recorded upon save.
- **Brand & Model Hierarchy:** Eyebrow manufacture, Cormorant title link to `#/watch/:watchId`, reference number, and production year.
- **Condition & Archival Badges:** Visual status badge (`Unworn`, `Excellent`, `Very Good`, `Good`) and documentation pill (`Box & Papers`, `Watch Only`).
- **Valuation Display:** High-contrast formatted price.
- **Interactive Action Matrix:**
  1. **Checkbox:** Individual selection input synchronized with the multi-select batch toolbar.
  2. **View Details:** Direct link to the Individual Watch Intelligence view.
  3. **Compare Toggle:** Add or remove from active comparison with immediate header badge counter update. If 4 watches are already in comparison, opens the 5th-Watch Replacement Modal.
  4. **Remove (`×`):** Removes timepiece from vault and triggers an accessible 5-second Undo toast.
  5. **Share Link:** Invokes native `navigator.share()` on mobile devices or copies the canonical deep link (`#/watch/:slug`) to clipboard on desktop with a success notification.
  6. **Enquire Modal Trigger:** Opens the pre-filled HOROLOGY Acquisition Consultation modal (`js/enquiry.js`).

---

## 4. Batch Operations Toolbar

When one or more timepieces are present in the vault:
- **Select All:** Toggles selection of all saved watches simultaneously.
- **Selection Counter:** Real-time count display `Selected (K/N)`.
- **Compare Selected (2–4):**
  - Enabled when 2, 3, or 4 watches are checked.
  - Replaces active comparison array with the selected subset and navigates directly to `#/compare`.
  - Disables with informative tooltips if $< 2$ or $> 4$ watches are selected.
- **Remove Selected:** Deletes all selected watches simultaneously and displays a floating Undo toast with a restore button.
- **Clear All Vault:** Wipes all saved items after capturing the current list in memory, immediately presenting an 8-second floating Undo toast with 1-click restoration.

---

## 5. Empty State & Browsing Continuity

When zero watches remain in the vault:
- An elegant empty state is displayed:
  - Icon: Refined horological bookmark graphic.
  - Heading: *"Your Saved Vault is Empty"*.
  - Prose: *"You have not saved any timepieces to your collection yet. Explore our curated selection or consult our Watch Finder."*
  - Dual CTAs: *"Browse Collection"* (`#/collection`) and *"Consult Watch Finder"* (`#/watch-finder`).
- **Embedded Observatory History:** If the collector has recently viewed any watches, an embedded Recently Viewed carousel automatically renders beneath the empty state, allowing 1-click re-curation without leaving the page.

