# HOROLOGY — Watch Comparison System Architecture
**Route:** `#/compare`  
**Controller:** `pages/compare.js`  
**Stylesheet:** `css/collector-tools.css`  
**Shared State Module:** `js/state.js`  
**Capacity Limit:** Up to 4 watches (`MAX_COMPARE = 4`)

---

## 1. Architectural Overview

The HOROLOGY Timepiece Comparison System delivers an unbiased, analytical matrix that empowers collectors to examine between 2 and 4 mechanical watches side-by-side. The interface prioritizes factual horological telemetry over marketing hyperbole, strictly refusing to declare arbitrary "winners" and never penalizing timepieces for missing non-essential attributes.

---

## 2. Capacity Constraints & 5th-Watch Replacement Modal

- **Hard Capacity:** The comparison tray enforces a strict maximum of 4 watches (`MAX_COMPARE = 4`).
- **Graceful Replacement Flow:**
  - When a user attempts to add a 5th timepiece anywhere across the application (Homepage, Collection cards, Watch Detail, Wishlist, or Quick View modal), the action does **not** fail silently.
  - Instead, the application triggers `openCompareLimitModal(newWatchId, currentCompareIds)`.
  - The modal displays the prospective 5th watch alongside the 4 currently compared timepieces.
  - The collector can replace any of the 4 existing watches with a single click or cancel the operation without modifying state.

---

## 3. Responsive Matrix Architecture & Sticky Column

- **Desktop Viewport ($\ge 1024\text{px}$):**
  - Rigid tabular structure with a sticky left specification column (`.sticky-col`) remaining locked in place during horizontal scrolling.
  - Persistent product card headers pinned to the top of each watch column with thumbnail, reference number, acquisition price, condition badge, and individual remove (`×`) buttons.
- **Mobile Viewport ($< 1024\text{px}$):**
  - Smooth horizontal touch track with CSS scroll-snap (`scroll-snap-type: x mandatory`).
  - Column cards snap cleanly into the center of the mobile screen while the sticky specification label stays visible.

---

## 4. Difference Highlighting Toggle Logic

At the top of the matrix, the user can toggle between:
- **"Highlight Differences"** (Default inactive): Visually illuminates rows where attributes genuinely differ.
- **"Show All Specifications"**: Returns the matrix to uniform neutral styling.

### Strict Non-Null Evaluation Contract
To avoid misleading collectors:
1. Missing, unrecorded, or placeholder values (`null`, `undefined`, `'—'`, `'Not specified'`, `'N/A'`) are **never** treated as differences.
2. Difference highlighting only triggers if $\ge 2$ valid, non-null values are present across the compared watches AND at least two of those values differ:
   ```javascript
   const nonNullValues = values.filter(v => 
     v !== null && v !== undefined && v !== '—' && 
     v !== 'Not specified' && v !== 'N/A' && String(v).trim() !== ''
   );
   const isDifferent = nonNullValues.length >= 2 && 
     new Set(nonNullValues.map(v => String(v).trim().toLowerCase())).size > 1;
   ```
3. When active, divergent rows receive a subtle Midnight Navy accent background (`--navy-light`) and a monospace `"Diff"` badge in the specification column.

---

## 5. Seven Grouped Horological Domains

The comparison matrix maps 1:1 with the Phase 04 Watch Intelligence data schema, organizing attributes into seven structured domains:

| # | Domain | Specifications Evaluated |
|---|--------|--------------------------|
| 1 | **Identity & Provenance** | Manufacture Brand, Model Name, Reference Number, Production Year |
| 2 | **Case Architecture** | Case Metallurgy, Diameter (mm), Thickness, Lug-to-Lug, Crystal, Bezel Type, Water Resistance |
| 3 | **Movement Mechanics** | Propulsion Type, Calibre Number, Winding Mechanism, Beat Frequency (vph), Jewel Count, Power Reserve (Hours), Complications |
| 4 | **Design & Finish** | Dial Colour, Dial Finish & Texture, Case Geometry, Bracelet/Strap Construction, Clasp Mechanism |
| 5 | **Condition Assessment** | Overall Grade (5-Tier Rubric), Case Chamfer Score, Crystal Integrity, Dial Originality, Bracelet Sag Score, 7-Stage Inspection Status |
| 6 | **Ownership & Documentation** | Original Presentation Box, Stamped Guarantee Papers, Service History Records, Included Accessories |
| 7 | **Pricing & Availability** | Acquisition Price (INR), Currency, Commercial Availability Status |

---

## 6. Factual Comparative Insights Engine

Beneath the matrix, an empirical synthesis engine (`generateComparativeInsights`) computes objective contrasts across the active set without subjective scoring:
1. **Acquisition Valuation Spectrum:** Reports the price delta and identifies the high and low valuations.
2. **Case Geometry & Wrist Profile:** Analyzes the physical wrist footprint delta (e.g., contrasting a 36 mm dress profile with a 43 mm diver).
3. **Power Autonomy:** Contrasts mechanical run-times, highlighting extended 70-hour reserves versus standard 48-hour movements.
4. **Propulsion Architecture Variety:** Highlights differences in winding systems (Self-winding Automatic vs. Manual Wind vs. Spring Drive).
5. **Archival Completeness:** Audits the proportion of full presentation sets against watch-only references.

---

## 7. Curated Comparison Presets & Quick Picker Modal

- When fewer than 2 watches are selected, the empty state displays three curated horological comparison presets:
  1. **Iconic Chronographs:** Rolex Cosmograph Daytona vs. Omega Speedmaster Moonwatch.
  2. **Modern Heritage Divers:** Rolex Submariner Date vs. Tudor Black Bay 58.
  3. **High-Precision Innovation:** Grand Seiko Spring Drive Snowflake vs. Omega Seamaster 300M.
- **Quick Watch-Picker Modal:** Clicking *"Add Timepiece"* or empty matrix column slots opens a searchable modal displaying all remaining demonstration references with 1-click addition.