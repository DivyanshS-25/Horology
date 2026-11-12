# HOROLOGY — Archival Inspection Dossier Specification
**Canonical Route:** `#/inspection/:watchId`  
**Legacy Alias Route:** `#/dossier/:slug`  
**Controller:** `pages/dossier.js`  
**Stylesheet:** `css/inspection-dossier.css`  
**Creative Direction:** Direction C — Midnight Navy (`#07111F` / `#8DB8E8` / `#263A50`) + A4 Print Engine

---

## 1. Architectural Overview

The Archival Inspection Dossier is an institutional forensic document that accompanies every certified chronometer in the HOROLOGY vault. It is rendered on-screen using Direction C Midnight Navy surface tokens and provides a dedicated `@media print` stylesheet optimized for standard A4 paper printing (`window.print()`) or Save as PDF.

The document is organized into five structured parts:
- **Top Navigation & Action Bar:** Back to Watch Details link, Document Reference ID, Print / Save as PDF button.
- **Part A:** Forensic Intake & Examination Scope.
- **Part B:** Mechanical Performance Telemetry (Timegrapher Diagnostics).
- **Part C:** Eight-Point Authenticity & Originality Review Table.
- **Part D:** Accompanying Documentation & Accessories Inventory.
- **Part E:** Visual Evidence & Physical Macro Inspection Grid.
- **Closing Sign-Off:** Cryptographic checksum, inspection desk coordinates, and lifetime warranty backing.

---

## 2. Strict Honesty Layer & Ethical Telemetry Handling

In strict accordance with the HOROLOGY Anti-Fabrication Guidelines:
- **Demonstration Telemetry Isolation:** Demonstration catalog references do not possess physical timing machine recordings. Therefore, `mechanicalPerformance` fields are stored strictly as `null` with `measuredValuesAvailable: false`.
- **Authoritative Unavailable State:**
  - The UI renders a prominent, transparent **"Timegrapher Telemetry Pending / Unavailable for Demonstration Record"** notice.
  - Rate Deviation, Balance Amplitude, and Beat Error display `"Unrecorded (Demo)"` with complete educational explanations of target manufacturer tolerances.
  - Zero fabricated rates, zero synthetic timing data, zero simulated COSC certificates.
- **Serial & Documentation Integrity:**
  - Serial numbers remain `null` or marked as "Confidential / Archival Ledger".
  - Documentation checklist displays real inventory presence without generating fake downloadable files or simulated certificates.

---

## 3. Five-Part Document Structure

### Part A — Forensic Intake & Examination Scope
Articulates the non-destructive physical examination protocol adhered to under HOROLOGY Standard Rev 4.2. Lists certified inspection desk (`HOROLOGY Horological Inspection Desk (Geneva / London)`), overall result (`Passed 7-Stage Examination`), and clear scope limitations.

### Part B — Mechanical Performance Telemetry
Details the three core pillars of acoustic chronometric evaluation:
1. **Daily Rate Deviation (`s/d`):** Measures time gain or loss over 24 hours against manufacturer standards.
2. **Balance Amplitude (`°`):** Degrees of balance wheel rotation (target 270°–310° in flat positions) indicating mainspring torque.
3. **Beat Error (`ms`):** Symmetry of impulse pin between banking pins (target $\le 0.3\text{ms}$).

### Part C — Eight-Point Authenticity & Originality Review Table
A structured matrix auditing all eight essential horological assemblies:
1. Case and reference consistency
2. Dial originality
3. Hands originality
4. Bezel originality
5. Movement identification
6. Bracelet and clasp verification
7. Serial/reference consistency
8. Component replacement observations
- Uses controlled statuses: `Verified`, `Observed`, `Requires further verification`, `Not assessed`, `Not applicable`.

### Part D — Accompanying Documentation & Accessories Inventory
Itemizes verified physical deliverables:
- Original presentation box
- Serialized warranty card
- Chronometer papers & instruction manual
- Authorized service history receipts
- Included links and accessories

### Part E — Inspection Photography
High-resolution macro photography of verified assemblies (dial, bezel, crown, caseback, clasp) using verified non-AI Phase 01 assets, plus clean architectural placeholders for unattached angles.

---

## 4. Dedicated Print Engine (`@media print`)

When `window.print()` is invoked (via the header "Print Official Report" button or browser shortcut):
- Suppresses site navigation (`.site-header`), footer (`.site-footer`), action buttons (`.btn`), mobile drawers, and modals.
- Replaces nocturnal dark canvas (`#07111F`) with pure white paper (`#FFFFFF`) and dark typography (`#111827`) to eliminate ink waste.
- Replaces colored cards with subtle `1px solid #CCCCCC` architectural borders.
- Enforces `@page { size: A4 portrait; margin: 10mm; }` with `page-break-inside: avoid` on tables and section blocks.

