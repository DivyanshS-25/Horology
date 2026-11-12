# HOROLOGY — INTERACTION & MICRO-EXPERIENCE SYSTEM

**System Architecture:** Native Vanilla JavaScript & CSS3 Micro-Interactions  
**Version:** Phase 08 — The Signature Luxury Experience  
**File Location:** `docs/INTERACTION_SYSTEM.md`

---

## 1. Overview & Philosophy

The interaction architecture of HOROLOGY is designed to mirror the physical sensation of handling an elite mechanical chronometer: deliberate resistance, smooth dampened movement, razor-sharp optical clarity, and subtle acoustic feedback.

Every interaction operates under four core engineering principles:
1. **Zero-Dependency Lightweight Performance:** Built entirely with native DOM APIs, CSS hardware acceleration, and the Web Audio API. Zero external runtime libraries.
2. **Tactile Feedback with User Governance:** Sound is completely opt-in and silent by default.
3. **Hardware Acceleration:** All animations leverage `transform` and `opacity` properties to ensure a consistent 60+ FPS across mobile, tablet, and desktop viewports.
4. **Universal Accessibility:** Comprehensive keyboard navigation (`Tab`, `Enter`, `Escape`), ARIA roles/expanded states, and full suppression via `@media (prefers-reduced-motion: reduce)`.

---

## 2. Core Interactive Subsystems

### 2.1 The Sapphire Refraction Specular Sheen
- **Element Selector:** `.sapphire-refraction`
- **Optical Simulation:** Replicates the subtle diagonal anti-reflective glare observed when tilting high-grade sapphire crystal under direct gallery spotlights.
- **Implementation:**
  ```css
  .sapphire-refraction {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(212, 175, 55, 0.04) 25%,
      transparent 50%,
      rgba(27, 52, 75, 0.08) 75%,
      rgba(255, 255, 255, 0.03) 100%
    );
    opacity: 0.7;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s ease;
  }
  .card-watch:hover .sapphire-refraction {
    opacity: 0.95;
    transform: scale(1.02) rotate(1deg);
  }
  ```

### 2.2 Curated Vault Card & Timing Telemetry Drawer
- **Trigger:** Desktop `:hover` on `.card-watch` or mobile tap on `[data-action="toggle-telemetry"]`.
- **Motion:** Dampened vertical translation:
  ```css
  .card-telemetry-drawer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(8, 13, 19, 0.94);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--border-gold-subtle);
    transform: translateY(100%);
    transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 4;
  }
  .card-watch:hover .card-telemetry-drawer,
  .card-watch.telemetry-open .card-telemetry-drawer {
    transform: translateY(0);
  }
  ```
- **Factual Integrity:** The drawer dynamically reads from `inspectionReport.mechanicalPerformance`. For demonstration records where physical intake is pending, it displays:
  *"Timing telemetry unrecorded • Physical intake pending"*, honoring anti-fabrication standards.

### 2.3 Interactive Masterwork Hotspot System
- **Location:** Homepage Featured Masterwork Showcase (`#homeMasterworkStage`).
- **Callout Points:** 5 strategic points on the canonical Rolex Submariner Date 126610LN:
  - Bezel (Top-left, 32% x 14%)
  - Dial (Center, 50% x 48%)
  - Winding Crown (Right flank, 84% x 50%)
  - Case & Lugs (Bottom-left, 24% x 72%)
  - Oyster Bracelet (Bottom-center, 50% x 88%)
- **Marker Design:** Multi-tier SVG ring with a central solid dot surrounded by a pulsing beacon ring (`@keyframes hotspotPulse`).
- **Popover Interaction:** Clicking or focusing the beacon toggles `.active` state, smoothly fading and translating the card into view while updating `aria-expanded`. Clicking outside or pressing `Escape` dismisses all popovers.

### 2.4 Acoustic Tactility Engine (`js/audio.js`)
- **Synthesis Engine:** Standalone Web Audio API without pre-recorded sound files.
- **Audio Routing:**
  - `OscillatorNode` (Triangle wave for crisp mechanical snap)
  - `BiquadFilterNode` (Bandpass filter centered at 1800 Hz, Q factor = 4.5)
  - `GainNode` (Exponential decay envelope falling from 0.08 to 0.001 in 18ms)
- **User Governance:** Controlled via persistent localStorage key `horology_audio_enabled`. Silent by default to comply with modern browser autoplay policies and respectful luxury UX standards.

### 2.5 Microscopic Zoom Loupe (2.5× Magnification)
- **Location:** Archival Inspection Dossier (`pages/dossier.js`) and Watch Detail gallery (`pages/watch-detail.js`).
- **Architecture:** 
  - Outer tracking container: `.loupe-container`
  - Magnified optical lens: `.loupe-lens` (140px × 140px circle)
- **Operation:**
  1. On `mousemove` or `touchmove`, computes relative cursor position `(e.clientX - rect.left) / rect.width`.
  2. Offsets the high-resolution background image within `.loupe-lens` using `background-position: -x * zoom + ...`.
  3. Positions the lens smoothly at the cursor coordinates using GPU-accelerated `translate3d()`.
  4. Features an inner specular drop shadow and champagne gold bezel simulating a watchmaker's eye loupe.

### 2.6 Movement Lab Kinematic Simulators
- **Oscillating Balance Wheel:** Canvas simulation running at 60 FPS calculating harmonic angle $\theta(t) = A \cdot \sin(2\pi f t)$ where $f = 4.0\text{ Hz}$ (28,800 vph). Includes interactive 1.0x Realtime, 0.25x Slow Motion, and Freeze-frame state toggles.
- **Witschi Timegrapher Screen:** Canvas twin-trace generator rendering audio pulses received by acoustic microphones. Selecting different watch positions (Dial Up, Dial Down, Crown Down, Crown Left) re-calculates dot slope, spread, and amplitude in real time.

---

## 3. Responsive Gesture & Touch Adaptations

| Interaction | Desktop Behavior | Touch / Mobile Behavior |
| :--- | :--- | :--- |
| **Telemetry Drawer** | Smooth slide-up on card hover | Tap on card info pill toggles drawer open/closed |
| **Masterwork Hotspots** | Hover or click beacon to inspect | Tap beacon to toggle popover; tap outside to dismiss |
| **Microscopic Loupe** | Mouse cursor tracking | Touch drag across image surface to pan magnifier |
| **Gallery Viewer** | Keyboard arrows, prev/next buttons | Touch horizontal swipe gesture + pagination dots |
| **Sound Toggle** | Header utility button | Prominent drawer utility toggle + header button |

---

## 4. Accessibility & Performance Safeguards

- **Reduced Motion:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Keyboard Navigation:** Every interactive marker (`.hotspot-beacon`, `.gallery-nav-btn`, `.timegrapher-pos-btn`) is a semantic `<button>` with distinct `:focus-visible` champagne gold outline (`2px solid var(--accent-primary); outline-offset: 3px`).
- **DOM Teardown:** Page controllers export `mount()` and `unmount()` lifecycle methods ensuring all `requestAnimationFrame` loops, interval timers, and audio nodes are cleanly garbage-collected on route transitions.

