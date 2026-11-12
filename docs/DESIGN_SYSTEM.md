# HOROLOGY — Design System Specification

## Direction C — Midnight Navy Edition

HOROLOGY’s visual character is defined by astronomical nocturnal navy tones, icy pale-blue luminescence, hairline 1px architectural borders, and editorial typography.

---

## 1. Color Palette Tokens (`css/tokens.css`)

### Canvas & Surface Layers
| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#07111F` | Base canvas background; deep nocturnal navy |
| `--bg-secondary` | `#0B192A` | Secondary section background, header solid state, footer |
| `--bg-surface` | `#102238` | Primary elevated card, dialog, and panel surface |
| `--bg-surface-hover` | `#152C47` | Interactive card and list row hover state |
| `--bg-surface-active` | `#1A375A` | Pressed or selected container state |
| `--bg-overlay` | `rgba(7, 17, 31, 0.88)` | Dialog backdrop with Gaussian blur (12px) |
| `--bg-overlay-heavy` | `rgba(7, 17, 31, 0.96)` | Full-viewport search overlay backdrop |

### Accents & Luminescence
| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| `--accent-primary` | `#8DB8E8` | Primary horological ice-blue; CTAs, active indicators, focus rings |
| `--accent-secondary` | `#B9CDE2` | Secondary mist blue; subtle borders, secondary highlights |
| `--accent-subtle` | `rgba(141, 184, 232, 0.12)` | Subtle badge fills, button outline hover fills |
| `--accent-hover` | `#A5CBF5` | Primary CTA hover state |
| `--accent-glow` | `rgba(141, 184, 232, 0.25)` | Focus ring and elevated card glow |

### Typography Colors
| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| `--text-primary` | `#F1F4F8` | Primary editorial headings and high-contrast body |
| `--text-secondary` | `#A6B2C2` | Secondary body text, descriptive summaries |
| `--text-muted` | `#6E8098` | Metadata, breadcrumbs, specifications labels |
| `--text-dim` | `#45566B` | Disclaimer footnotes, disabled placeholders |
| `--text-inverse` | `#07111F` | Text on primary accent buttons |

### Hairlines & Borders
| Token | Hex / RGBA Value | Role & Usage |
| :--- | :--- | :--- |
| `--border-subtle` | `#263A50` | Hairline dividers, card outlines, table borders |
| `--border-strong` | `#385370` | Modal frames, active input outlines |
| `--border-accent` | `rgba(141, 184, 232, 0.45)` | Accent card hover outlines |

### Status & Verification Semantics
| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| `--status-verified` | `#5CB88A` | 7-Stage certified status, COSC tolerance pass |
| `--status-reserved` | `#D4A857` | Reserved client allocation, rare gold reference |
| `--status-archived` | `#7B8FA6` | Sold archive reference |
| `--status-danger` | `#D96B6B` | Timing tolerance failure, error alerts |

---

## 2. Typography Hierarchy (`css/typography.css`)

### Font Families
- **Editorial Display & Headings:** `'Cormorant Garamond', 'Times New Roman', Georgia, serif`
- **Body & Interface Sans:** `'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- **Tabular Specs & Telemetry:** `'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace`

### Scale
- **Display Hero:** `clamp(3.2rem, 2.8rem + 3.2vw, 5.25rem)` — 400 weight, line-height 1.05
- **Heading 1:** `clamp(2.75rem, 2.3rem + 2.25vw, 3.85rem)` — 500 weight, line-height 1.1
- **Heading 2:** `clamp(2.1rem, 1.85rem + 1.25vw, 2.75rem)` — 500 weight, line-height 1.15
- **Heading 3:** `clamp(1.65rem, 1.5rem + 0.75vw, 2.0rem)` — 500 weight, line-height 1.25
- **Heading 4:** `clamp(1.35rem, 1.25rem + 0.5vw, 1.55rem)` — 600 weight, line-height 1.3
- **Overline / Small Caps:** `clamp(0.72rem, 0.68rem + 0.2vw, 0.78rem)` — 600 weight, uppercase, letter-spacing `0.24em`

---

## 3. Structural Geometry & Elevation

- **Border Radii:** Restrained luxury radius: `--radius-xs: 2px; --radius-sm: 4px; --radius-md: 6px;` (no large rounded corners).
- **Elevation Shadows:**
  - Card: `0 4px 20px rgba(0, 0, 0, 0.45), 0 0 1px rgba(141, 184, 232, 0.12)`
  - Card Hover: `0 12px 36px rgba(0, 0, 0, 0.65), 0 0 1px rgba(141, 184, 232, 0.35)`
  - Dropdown: `0 16px 40px rgba(3, 7, 14, 0.85), 0 0 0 1px var(--border-subtle)`
  - Modal Portal: `0 24px 60px rgba(3, 7, 14, 0.92), 0 0 0 1px var(--border-strong)`

