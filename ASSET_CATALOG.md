# HOROLOGY — Visual Asset Catalog (Phase 01)
> **Creative Direction:** Direction C, Midnight Navy  
> **Tagline:** Beyond Time. Beyond Ordinary.  
> **Manifest Version:** 1.0.0  
> **Strict Phase Boundary:** Phase 01 Visual Asset Library Only

---

## 1. Executive Summary & Calibration Shoot
This visual asset library provides the foundational design tokens, photography, vector iconography, and brand marks for the **HOROLOGY** mechanical watch marketplace.

All photographic assets have been calibrated against `_source/reference/horology-midnight-navy-board.png` and verified against the strict Midnight Navy criteria:
- **Canvas Base:** `#050B16` to `#07111F`
- **Lighting:** Soft key from upper left (45°), cool steel-blue rim light, deep shadow falloff.
- **Copy Space:** Left or bottom 45% of hero frames maintain low luminance (&le; 18%) for headline typography legibility.
- **Dial Fidelity & Text-Free Rule:** No manufacturer trademarks, zero illegible numerals, hands set to 10:10:35, sub-dials reset.
- **Warm Tone Limitation:** Warm brass/rhodium strictly confined to internal movement calibres and lounge tungsten lighting (<10% frame area). Zero gold or olive grading.

---

## 2. Hero & Key Photography (Tier 2 AI Illustrative)

| Asset ID | Filename | Ratio | Resolution | Category | Copy Space | Provenance Tier |
|---|---|---|---|---|---|---|
| `HZ-HERO-001` | `assets/images/hero/hero-home-primary-16x9.jpg` | 16:9 | 3840×2160 Master | Home Primary Hero | Left 45% Dark Negative | `tier2_ai_illustrative` |
| `HZ-HERO-002` | `assets/images/hero/hero-home-secondary-dial-macro-16x9.jpg` | 16:9 | 3840×2160 Master | Secondary Dial Macro | Left 50% Dark Negative | `tier2_ai_illustrative` |
| `HZ-HERO-003` | `assets/images/hero/hero-home-mobile-4x5.jpg` | 3:4 / 4:5 | Portrait Master | Mobile Hero Header | Lower 45% Navy Gradient | `tier2_ai_illustrative` |

---

## 3. Brand Identity & Vector Assets (Tier 3 Programmatic)

| Asset ID | Relative Path | Format | Usage Context |
|---|---|---|---|
| `HZ-LOGO-001` | `assets/logos/horology-wordmark.svg` | Clean SVG | Site header & desktop brand wordmark |
| `HZ-LOGO-002` | `assets/logos/horology-emblem.svg` | Clean SVG | Circular horological dial emblem & certificate seal |
| `HZ-FAV-001` | `assets/favicons/favicon.svg` | Vector SVG | Modern browser vector favicon |
| `HZ-FAV-002` | `assets/favicons/favicon-32x32.png` | 32×32 PNG | Legacy browser raster favicon |
| `HZ-BG-001` | `assets/images/backgrounds/bg-radial-azure.svg` | Vector SVG | Radial azure hero glow backdrop |
| `HZ-BG-002` | `assets/images/backgrounds/bg-grid-calibration.svg` | Vector SVG | Precision calibration grid texture |
| `HZ-OG-001` | `assets/images/og/og-horology-summary.png` | 1200×630 PNG | Social media OpenGraph preview card |

---

## 4. Comprehensive SVG Icon Suite (53 Assets + Sprite Sheet)

All icons are authored with a uniform **1.75px stroke width**, **24×24px viewBox**, **round line-caps**, and **zero external font dependencies**. Available individually and bundled into `assets/icons/sprite.svg`:

- **Navigation & Search:** `search`, `heart`, `compare`, `menu`, `close`, `grid`, `list`, `filter`, `sort`, `refresh`, `share`, `download`, `print`
- **Directional & Arrows:** `arrow-right`, `arrow-left`, `chevron-down`, `chevron-up`, `chevron-right`, `chevron-left`
- **Horological Mechanics:** `gauge`, `chronograph`, `diver`, `escapement`, `balance-wheel`, `rotor`, `mainspring`, `gear-train`, `crown`, `water-resist`, `dual-time`, `moonphase`, `calendar`
- **Forensic Verification:** `shield`, `shield-check`, `loupe`, `microscope`, `caliper`, `file-text`, `seal`, `timegrapher`, `tool`, `sparkles`, `award`, `check`
- **Client Salon & Logistics:** `safe`, `truck`, `lounge`, `clock`, `phone`, `mail`, `map-pin`, `eye`, `zoom-in`

---

## 5. Typography & Fonts
- **Editorial Serif:** Cormorant Garamond (`assets/fonts/OFL-Cormorant.txt`)
- **Modern UI Sans:** Inter (`assets/fonts/OFL-Inter.txt`)
- **Technical Monospace:** JetBrains Mono (`assets/fonts/OFL-JetBrainsMono.txt`)
- Fallback stylesheet configured in `assets/fonts/fonts.css`.

---

## 6. Provenance & Substitution Protocol
- In accordance with Section H3 of the Master Execution Package, all watch imagery generated is unbranded archetype imagery (`representsGenuineProduct: false`).
- Slots for genuine manufacturer photography are inventoried in `reports/missing-assets.md` and indexed in `assets/manifest.json`.

