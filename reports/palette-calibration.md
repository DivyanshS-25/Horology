# HOROLOGY — Palette Calibration Report
**Reference Image:** `_source/reference/horology-midnight-navy-board.png` (Dimensions: 1024×682)
**Direction:** MIDNIGHT NAVY (Direction C)
**Calibration Date:** 2026-11-12

## 1. Pixel Sampling Log & Color Verification

| Token Name | Reference Board Sampled Hex | H4 Guideline Hex | Status / Resolution | Notes |
|---|---|---|---|---|
| `navy-950` (Deep Base) | `#050B16` – `#070C12` | `#050B16` | **Confirmed Match** | Lowest dark field, outer margins & shadow floor |
| `navy-900` (Canvas Surface) | `#07111F` – `#10141D` | `#07111F` | **Confirmed Match** | Main page canvas and card perimeter |
| `navy-800` (Card Base) | `#0B1A2E` – `#0E151B` | `#0B1A2E` | **Confirmed Match** | Primary component background |
| `navy-700` (Card Hover / Accent) | `#10294A` – `#172A48` | `#10294A` | **Confirmed Match** | Subtle container elevation and glow floor |
| `navy-500` (Deep Azure Glow) | `#1E4C84` – `#274166` | `#1E4C84` | **Confirmed Match** | Upper right dial radial backlights |
| `azure-500` (Primary Accent Fill) | `#80C1F9` – `#88BFF7` | `#2F86E0` | **Refined to Image** | Primary CTA button in Panel 01 is luminous azure ice (`#80C1F9`–`#92C9F0`) |
| `azure-400` (Hover State) | `#95CFF7` – `#A3C8E5` | `#4A9BF0` | **Refined to Image** | Button highlight and active indicator edge |
| `steel-300` (Brushed Highlight) | `#C9D3E0` – `#C1C5CE` | `#C9D3E0` | **Confirmed Match** | Bevel specular highlights and hand finishes |
| `steel-500` (Muted Metal / Border) | `#8FA0B8` – `#848894` | `#8FA0B8` | **Confirmed Match** | Hairline borders (1px) and secondary markers |
| `ink` (Text Primary) | `#F2F5FA` – `#FFFFFF` | `#F2F5FA` | **Confirmed Match** | Pristine off-white typography |
| `ink-muted` (Text Secondary) | `#9FB0C6` – `#A3AAB2` | `#9FB0C6` | **Confirmed Match** | Secondary descriptions and reference strings |
| `verified-green` (Status Only) | `#1E9E6A` – `#2DD4BF` | `#1E9E6A` | **Confirmed Match** | Exclusively used on verification checks and availability tags |

## 2. Palette Corrections & Rules
1. **Zero Gold / Zero Olive:** Strictly enforced across all photography, UI, and vector assets.
2. **Warm Tones Containment:** Warm brass/rhodium is strictly localized to internal movement calibres and tungsten salon lighting in Panel 15 (occupying <10% frame area).
3. **Contrast & Luminance Threshold:** Text negative-space copy zones adhere strictly to a mean luminance of &le; 18% with dark gradient falloff toward `#050B16`.

