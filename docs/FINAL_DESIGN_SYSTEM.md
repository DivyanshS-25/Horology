# HOROLOGY — FINAL DESIGN SYSTEM SPECIFICATION (DIRECTION OBSIDIAN LUXURY)

**Brand Identity:** HOROLOGY  
**Tagline:** *Beyond Time. Beyond Ordinary.*  
**Specialization:** Certified Pre-Owned Mechanical Chronometry (Rolex, Omega, Tudor, Grand Seiko)  
**Version:** Phase 08 — The Signature Luxury Experience  
**Hosting Environment:** GitHub Pages Compatible (Zero-build Static Vanilla ES Module SPA)

---

## 1. Executive Summary & Design Vision

Phase 08 marks the definitive evolution of HOROLOGY from an e-commerce platform into an exclusive, museum-grade **Digital Horology Gallery**. The visual identity transcends conventional dark themes to embrace **Direction Obsidian Luxury**: a curated, multi-layered nocturnal atmosphere inspired by haute horlogerie atelier lighting, anti-reflective sapphire crystal physics, and fine guilloché metalwork.

The interface communicates:
- **Exclusivity & Discretion:** Understated wealth conveyed through deep obsidian canvases and warm champagne gold accents.
- **Microscopic Precision:** Razor-thin hairline borders (`0.5px` to `1px`), monospace telemetry readouts, and 2.5× optical loupe magnification.
- **Acoustic Tactility:** Synthesized metallic frequency feedback emulating escapement clicks and crown winding resistance.
- **Architectural Credibility:** Honest forensic intake tracking and unadorned demonstration notices in strict compliance with truth-in-commerce ethics.

---

## 2. Color Palette & Surface Architecture

### 2.1 Obsidian Canvas & Nocturne Surfaces
| Token Name | Hex Value | Purpose / Optical Weight |
| :--- | :--- | :--- |
| `--bg-base` / `--canvas-obsidian` | `#050608` | Primary Infinite Canvas; deepest nocturnal ground |
| `--bg-secondary` / `--canvas-secondary` | `#0B131D` | Recessed containers, table zebra stripes, subtle wells |
| `--bg-surface` / `--canvas-surface` | `#101923` | Primary elevated panels, section cards, modal bodies |
| `--bg-card` / `--canvas-card` | `#121C27` | Curated Vault Product Cards, interactive tiles |
| `--bg-inset` / `--canvas-inset` | `#080D13` | Recessed telemetry bays, timegrapher screen bezels |
| `--surface-elevated` | `#152230` | Hover states, dropdown menus, popovers, active drawers |

### 2.2 Noble Metallic Accents
| Token Name | Hex Value | Purpose / Horological Association |
| :--- | :--- | :--- |
| `--accent-primary` / `--accent-gold` | `#D4AF37` | Champagne Gold: primary CTAs, active indicators, brand emblem |
| `--accent-gold-gilt` | `#E5C58E` | Gilt Graining: text highlights, dial typography, fine accents |
| `--accent-gold-muted` | `#9C7E24` | Muted Gold: borders, inactive icons, subtle dividers |
| `--accent-gold-dim` | `rgba(212, 175, 55, 0.12)` | Subtle Gold Aura: focus rings, card halos, pill backgrounds |
| `--accent-secondary` / `--accent-rosegold`| `#B76E79` | Rose Gold: secondary badges, warm tactile highlights |
| `--accent-petrol` | `#1B344B` | Petrol Blue: deep horological steel sheen, background radial tints |

### 2.3 Editorial & Technical Typography
| Token Name | Hex Value | Contrast / Purpose |
| :--- | :--- | :--- |
| `--text-primary` / `--text-alabaster` | `#F4F4F0` | Alabaster Paper: Primary headlines, watch titles, key metrics (15.8:1 contrast) |
| `--text-secondary` / `--text-titanium` | `#949AAB` | Muted Titanium: Curatorial body text, specification labels (7.2:1 contrast) |
| `--text-muted` / `--text-slate` | `#636B7E` | Archival Slate: Secondary footnotes, serial metadata, timestamps (4.6:1 contrast) |
| `--text-gold` | `#D4AF37` | Champagne Gold: Overlines, kicker tags, currency symbols |

### 2.4 Status & Verification Semantics
| Token Name | Hex / Fill | Purpose |
| :--- | :--- | :--- |
| `--status-verified` | `#34D399` (Emerald) | Forensic Verification passed, COSC tolerance achieved |
| `--status-reserved` | `#F59E0B` (Amber) | Private viewing scheduled, intake pending |
| `--status-danger` | `#EF4444` (Ruby) | Chronometric deviation alert, critical requirement |

---

## 3. Typographic System

HOROLOGY employs a hierarchical tri-font system calibrated for editorial luxury and technical authority:

1. **Editorial Serif:** `Cormorant Garamond`, Georgia, serif
   - *Weights:* 400 (Regular), 500 (Medium), 600 (Semi-bold), Italic
   - *Usage:* Display headlines (`H1`, `H2`), brand wordmarks, curatorial storytelling, collection families.
   - *Character:* Elegant serifs, high stroke contrast, traditional Swiss publishing proportions.

2. **Technical Sans:** `Inter`, -apple-system, BlinkMacSystemFont, sans-serif
   - *Weights:* 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
   - *Usage:* Body prose, UI navigation, button labels, form inputs, dialog content.
   - *Character:* High x-height, neutral geometry, legible at micro sizes on high-DPI displays.

3. **Chronometer Mono:** `JetBrains Mono`, Menlo, monospace
   - *Weights:* 400 (Regular), 500 (Medium), 600 (Semi-bold)
   - *Usage:* Reference numbers, calibre nomenclature, daily rate telemetry (`+2 s/d`), amplitude (`288°`), serial ledgers.
   - *Character:* Tabular figures, zero ambiguity between `0` and `O`, technical instruments.

---

## 4. Components & Elevation Hierarchy

### 4.1 The Curated Vault Card (`.card-watch`)
- **Structure:** 
  - Framed in Obsidian Card (`#121C27`) with `1px solid var(--border-hairline)`.
  - Image chamber featuring the **Sapphire Refraction Overlay** (`.sapphire-refraction`), creating a diagonal 45° specular light sheen.
  - Hover state: Smooth image scale (`transform: scale(1.05); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`).
  - **Timing Telemetry Drawer (`.card-telemetry-drawer`):** Slides smoothly upward from card bottom upon desktop hover or mobile tap, revealing honest Witschi daily rate, amplitude, and beat error telemetry.

### 4.2 Interactive Masterwork Hotspots (`.hotspot-item`)
- Beacon marker positioned precisely over dial, bezel, crown, case, and bracelet.
- Concentric pulsing radar ring (`@keyframes hotspotPulse`) styled in champagne gold.
- Expanding technical popover (`.hotspot-popover`) containing architectural callouts, metallurgy descriptions, and micro-metric specifications.

### 4.3 Eight-Stage Forensic Diagnostic Timeline (`.diagnostic-timeline`)
- Staggered timeline tracking stages `01 — Initial Intake & Identification` through `08 — Final Condition Assessment`.
- Connected by hairline metallic progress tracks with status glyphs (Verified, Pending, Archived).
- Non-fabrication guarantee: Demonstration lots display honest unrecorded physical disclaimers.

### 4.4 Microscopic Zoom Loupe (`.loupe-container`, `.loupe-lens`)
- Floating circular optical viewport (140px diameter) providing 2.5× hardware-accelerated magnification.
- Framed in champagne gold ring with inner specular bevel and high-contrast backdrop filter.
- Tracks mouse coordinates smoothly without layout thrashing.

---

## 5. Micro-Interactions & Acoustic System

### 5.1 Acoustic Tactility Engine (`js/audio.js`)
- **Philosophy:** Completely non-intrusive, user-governed, silent by default.
- **Implementation:** Pure Web Audio API synthesis (zero MP3/WAV network dependencies).
  - *Mechanical Click:* Bandpass-filtered triangle wave decaying over 18ms at 1800 Hz.
  - *Winding Tick:* High-pass filtered noise burst decaying over 12ms at 2600 Hz.
- **Controls:** Header and mobile drawer toggle button with persistent `localStorage` preference (`horology_audio_enabled`).

### 5.2 Transition Curves
- Fast Micro: `150ms cubic-bezier(0.4, 0, 0.2, 1)` (button hovers, badge fades)
- Standard Ease: `240ms cubic-bezier(0.16, 1, 0.3, 1)` (drawer slides, modals)
- Luxury Pan: `600ms cubic-bezier(0.16, 1, 0.3, 1)` (image loupe, masterwork zooms)
- Reduced Motion: `@media (prefers-reduced-motion: reduce)` instantly disables all transforms, loops, and pulse animations.

---

## 6. Layout Grid & Responsive Architecture

- **Canvas Max Width:** `1440px` centered with fluid horizontal margins.
- **Breakpoints:**
  - `mobile`: `< 768px` (Single column, full-width drawers, bottom-anchored actions)
  - `tablet`: `768px – 1023px` (Two-column grids, collapsed filters)
  - `desktop`: `1024px – 1439px` (Four-column grids, split 58/42 watch details)
  - `wide`: `≥ 1440px` (Full curatorial asymmetric masterwork layouts)

