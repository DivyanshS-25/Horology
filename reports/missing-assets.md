# HOROLOGY — Missing & Pending Assets Report
**Phase:** Phase 01: Visual Asset Library
**Date:** 2026-11-12
**Provenance Tracking Protocol:** H3 Strict Honesty

## 1. Tier 1 Licensed Photography Slots
As established in Part C and Section H3 of the Master Execution Package, no genuine manufacturer press imagery has been licensed yet. All product slots are currently supported by **Tier 2 (AI-generated unbranded archetypes)** and **Tier 3 (Programmatic vector illustrations)**. 

The following 24 slots are reserved in `assets/manifest.json` for when genuine manufacturer photography is licensed by the client:

| Asset Slot ID | Target Model Reference | Required Views | Current Fallback Tier | Status |
|---|---|---|---|---|
| `SLOT-LIC-001` | Rolex Submariner Date 126610LN | Front, Flank, Clasp, Caseback | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-002` | Rolex GMT-Master II 126710BLRO | Front, Flank, Clasp, Bezel | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-003` | Rolex Daytona 116500LN | Front, Pushers, Caseback | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-004` | Rolex Datejust 36 126234 | Front, Fluted Bezel, Clasp | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-005` | Rolex Sea-Dweller 126600 | Front, Helium Valve, Caseback | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-006` | Rolex Explorer II 226570 | Front, Bezel, Hand Pivot | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-007` | Omega Speedmaster Pro 311.30.42.30.01.001 | 12-View Demo Set | Tier 2 AI Archetype (Calibrated) | Awaiting Licensed Imagery |
| `SLOT-LIC-008` | Omega Seamaster Diver 300M | Front, Wave Dial, Bezel | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-009` | Omega Speedmaster Calibre 321 | Front, Exhibition Caseback | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-010` | Omega Aqua Terra 150M | Front, Teak Dial, Profile | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-011` | Omega Constellation Co-Axial | Front, Claws, Clasp | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-012` | Omega Planet Ocean 600M | Front, Bezel, Caseback | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-013` | Tudor Black Bay 58 M79030N | Front, Gilt Dial, Rivet Clasp | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-014` | Tudor Pelagos 39 M25407N | Front, Titanium Case, Bezel | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-015` | Tudor Black Bay Chrono Panda | Front, Sub-dials, Pushers | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-016` | Tudor Black Bay Pro M79470 | Front, Fixed Bezel, Crown | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-017` | Tudor Black Bay GMT M79830RB | Front, Pepsi Bezel, Clasp | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-018` | Tudor Royal M28600 | Front, Notched Bezel, Dial | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-019` | Grand Seiko Snowflake SBGA211 | Front, Texture Dial, Zaratsu | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-020` | Grand Seiko White Birch SLGH005 | Front, Birch Dial, Caseback | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-021` | Grand Seiko Shunbun SBGA413 | Front, Sakura Dial, Box | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-022` | Grand Seiko Sport GMT SBGE257 | Front, Green Bezel, Clasp | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-023` | Grand Seiko Omiwatari SBGY007 | Front, Lake Suwa Dial | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |
| `SLOT-LIC-024` | Grand Seiko Evolution 9 SLGA009 | Front, 5-Day Power Reserve | Tier 3 Programmatic Vector | Awaiting Licensed Imagery |

## 2. Ingest Instructions
When licensed high-resolution photography is supplied:
1. Place raw assets in `assets/images/watches/{brand}/`.
2. Update the corresponding entry in `assets/manifest.json` from `null` to the relative asset path.
3. Update the provenance tier from `tier2_ai_illustrative` or `tier3_programmatic` to `tier1_licensed`.

