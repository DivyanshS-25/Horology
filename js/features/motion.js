/**
 * HOROLOGY — Motion, Tactile Interaction & Micro-Mechanics Engine
 * Pure Vanilla JavaScript & CSS (Zero External Libraries)
 * Direction: Obsidian Luxury Edition
 * 
 * Features:
 * 1. 3D Mouse-Tracking Watch Card Tilt & Radial Sapphire Crystal Specular Glare
 * 2. Lume Mode (Super-LumiNova Nocturnal Dial Glow)
 * 3. Staggered Scroll-Reveal Choreography & Animated Number Counters
 * 4. 28,800 vph Live Ticking Chronometer & Escapement Simulator
 * 5. 120-Click Tactile Rotating Diver Bezel Micro-Widget
 * 6. Smooth View Transitions & Sliding Active Nav Indicator Bar
 */

import { isAudioEnabled, playEscapementTick, playBezelClick, playMechanicalClick } from '../audio.js';

// =========================================================================
// 1. LUME MODE CONTROLLER (Daylight vs. Night-Lume View)
// =========================================================================
const LUME_STORAGE_KEY = 'horology_lume_mode';

export function isLumeMode() {
  try {
    return localStorage.getItem(LUME_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function toggleLumeMode(forceState) {
  const nextState = forceState !== undefined ? Boolean(forceState) : !isLumeMode();
  try {
    localStorage.setItem(LUME_STORAGE_KEY, String(nextState));
  } catch {}

  applyLumeState(nextState);
  playMechanicalClick(2600, 0.02);
  window.dispatchEvent(new CustomEvent('horology-lume-toggled', { detail: { enabled: nextState } }));
  return nextState;
}

export function applyLumeState(enabled) {
  const root = document.documentElement;
  const body = document.body;
  
  if (enabled) {
    root.classList.add('lume-mode');
    body.classList.add('lume-mode');
  } else {
    root.classList.remove('lume-mode');
    body.classList.remove('lume-mode');
  }

  // Update all Lume buttons on page
  document.querySelectorAll('.lume-mode-toggle-btn').forEach(btn => {
    btn.classList.toggle('lume-active', enabled);
    btn.setAttribute('aria-pressed', String(enabled));
    btn.setAttribute('title', enabled ? 'Lume Mode: Active (Click for Daylight)' : 'Lume Mode: Off (Click for Super-LumiNova Nocturnal View)');
  });
}

export function initLumeMode() {
  applyLumeState(isLumeMode());
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lume-mode-toggle-btn');
    if (btn) {
      e.preventDefault();
      toggleLumeMode();
    }
  });
}

// =========================================================================
// 2. 3D WATCH CARD TILT & SPECULAR SAPPHIRE GLARE
// =========================================================================
export function initCard3DTilt() {
  // Check reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let activeCard = null;

  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card-watch');
    if (!card) {
      if (activeCard) {
        resetCardTilt(activeCard);
        activeCard = null;
      }
      return;
    }

    activeCard = card;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Percentages (0% to 100%)
    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));

    // Subtle 3D tilt capped at +/- 5 degrees
    const rotY = ((x / rect.width) - 0.5) * 10;
    const rotX = -((y / rect.height) - 0.5) * 10;

    // Apply coordinate variables for radial specular glare
    card.style.setProperty('--mouse-x', `${xPct.toFixed(1)}%`);
    card.style.setProperty('--mouse-y', `${yPct.toFixed(1)}%`);
    card.style.transition = 'transform 0.08s ease-out, box-shadow 0.25s ease';
    card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
  }, { passive: true });

  document.addEventListener('pointerleave', (e) => {
    const card = e.target.closest('.card-watch');
    if (card) resetCardTilt(card);
  }, { passive: true, capture: true });
}

function resetCardTilt(card) {
  if (!card) return;
  card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  card.style.removeProperty('--mouse-x');
  card.style.removeProperty('--mouse-y');
}

// =========================================================================
// 3. STAGGERED SCROLL-REVEAL & ANIMATED NUMBER COUNTERS
// =========================================================================
export function initScrollReveal() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const items = document.querySelectorAll(
    '.card-watch:not(.reveal-init), .card-editorial:not(.reveal-init), .feature-grid > div:not(.reveal-init), .home-hero-pillar-item:not(.reveal-init), .dossier-photo-card:not(.reveal-init)'
  );

  if (prefersReduced || items.length === 0) {
    items.forEach(el => {
      el.classList.add('reveal-init', 'reveal-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('reveal-visible');
        obs.unobserve(el);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  items.forEach((el, idx) => {
    el.classList.add('reveal-init');
    const delay = (idx % 6) * 60; // 60ms stagger delay capped per row
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });

  // GUARANTEED FAILSAFE: Never leave elements stuck invisible
  setTimeout(() => {
    items.forEach(el => el.classList.add('reveal-visible'));
  }, 850);
}

export function initNumberCounters() {
  const elements = document.querySelectorAll('[data-counter-target]:not(.counter-done)');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('counter-done');
        obs.unobserve(el);
        animateCounter(el);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const rawTarget = el.getAttribute('data-counter-target');
  const target = parseFloat(rawTarget.replace(/[^0-9.-]/g, ''));
  if (isNaN(target)) return;

  const prefix = el.getAttribute('data-counter-prefix') || '';
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const isCurrency = el.hasAttribute('data-counter-currency');
  const duration = 950;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Ease-out cubic: 1 - (1 - t)^3
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.round(target * ease);

    let formatted = currentVal.toLocaleString('en-IN');
    if (isCurrency) {
      formatted = '₹' + formatted;
    }

    el.textContent = `${prefix}${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      let finalFormatted = target.toLocaleString('en-IN');
      if (isCurrency) finalFormatted = '₹' + finalFormatted;
      el.textContent = `${prefix}${finalFormatted}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

// =========================================================================
// 4. LIVE 28,800 VPH TICKING CHRONOMETER RING / ESCAPEMENT WIDGET
// =========================================================================
export class MechanicalChronometerWidget {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.frequencyVph = options.frequency || 28800; // 28800, 21600, 36000
    this.isPaused = false;
    this.currentAngle = 0;
    this.totalTicks = 0;
    this.rafId = null;
    this.lastTickTime = performance.now();
    this.render();
    this.start();
  }

  getTicksPerSecond() {
    return this.frequencyVph / 3600; // 28800/3600 = 8 ticks/s (4Hz)
  }

  getTickIntervalMs() {
    return 1000 / this.getTicksPerSecond();
  }

  getStepAngle() {
    // 360 degrees per 60 seconds -> 6 degrees per second
    return 6 / this.getTicksPerSecond();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="chronometer-widget-stage">
        <!-- Mechanical Dial & Graduation Track -->
        <div class="chronometer-dial-housing">
          <svg class="chronometer-track-svg" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(212,175,55,0.18)" stroke-width="1.5"/>
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(141,184,232,0.12)" stroke-width="1"/>
            ${this.generateDialTicks()}
          </svg>

          <!-- Sweep Seconds Hand -->
          <div class="chronometer-hand-pinion">
            <div class="chronometer-seconds-hand" id="chronoSecondsHand">
              <div class="hand-counterpoise"></div>
              <div class="hand-needle"></div>
              <div class="hand-lume-dot"></div>
            </div>
            <div class="chronometer-cap-jewel"></div>
          </div>

          <!-- Luminous Centre Jewel Telemetry Badge -->
          <div class="chronometer-center-telemetry">
            <span class="chrono-vph-display" id="chronoVphBadge">${this.frequencyVph.toLocaleString()} VPH</span>
            <span class="chrono-hz-display" id="chronoHzBadge">${(this.frequencyVph / 7200).toFixed(1)} Hz</span>
          </div>
        </div>

        <!-- Micro-Controller Controls -->
        <div class="chronometer-controls-rail">
          <button type="button" class="btn btn-outline btn-xs chrono-rate-btn ${this.frequencyVph === 21600 ? 'active' : ''}" data-vph="21600" title="Vintage Standard: 6 beats/sec">21,600 vph</button>
          <button type="button" class="btn btn-outline btn-xs chrono-rate-btn ${this.frequencyVph === 28800 ? 'active' : ''}" data-vph="28800" title="Modern Benchmark: 8 beats/sec">28,800 vph</button>
          <button type="button" class="btn btn-outline btn-xs chrono-rate-btn ${this.frequencyVph === 36000 ? 'active' : ''}" data-vph="36000" title="Grand Seiko / Zenith Hi-Beat: 10 beats/sec">36,000 Hi-Beat</button>
          <button type="button" class="btn btn-outline btn-xs chrono-pause-btn" id="chronoPauseBtn" title="Freeze Escapement Motion">
            <span id="chronoPauseLabel">${this.isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>
    `;

    this.secondsHandEl = this.container.querySelector('#chronoSecondsHand');
    this.vphBadgeEl = this.container.querySelector('#chronoVphBadge');
    this.hzBadgeEl = this.container.querySelector('#chronoHzBadge');
    this.pauseBtnEl = this.container.querySelector('#chronoPauseBtn');
    this.pauseLabelEl = this.container.querySelector('#chronoPauseLabel');

    this.bindEvents();
  }

  generateDialTicks() {
    let ticks = '';
    // 60-second markings with 5-minute major numerals
    for (let i = 0; i < 60; i++) {
      const angle = i * 6;
      const isMajor = i % 5 === 0;
      const r1 = isMajor ? 82 : 87;
      const r2 = 93;
      const rad = (angle - 90) * (Math.PI / 180);
      const x1 = (100 + r1 * Math.cos(rad)).toFixed(2);
      const y1 = (100 + r1 * Math.sin(rad)).toFixed(2);
      const x2 = (100 + r2 * Math.cos(rad)).toFixed(2);
      const y2 = (100 + r2 * Math.sin(rad)).toFixed(2);
      const color = isMajor ? '#D4AF37' : 'rgba(241,244,248,0.3)';
      const width = isMajor ? 2 : 1;
      ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
    }
    return ticks;
  }

  bindEvents() {
    this.container.querySelectorAll('.chrono-rate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vph = parseInt(btn.getAttribute('data-vph'), 10);
        this.setFrequency(vph);
        this.container.querySelectorAll('.chrono-rate-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playMechanicalClick(2800, 0.015);
      });
    });

    this.pauseBtnEl?.addEventListener('click', () => {
      this.togglePause();
      playMechanicalClick(2400, 0.018);
    });
  }

  setFrequency(vph) {
    this.frequencyVph = vph;
    if (this.vphBadgeEl) this.vphBadgeEl.textContent = `${vph.toLocaleString()} VPH`;
    if (this.hzBadgeEl) this.hzBadgeEl.textContent = `${(vph / 7200).toFixed(1)} Hz`;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.pauseLabelEl) {
      this.pauseLabelEl.textContent = this.isPaused ? 'Resume' : 'Pause';
    }
    if (this.pauseBtnEl) {
      this.pauseBtnEl.classList.toggle('active', this.isPaused);
    }
  }

  start() {
    const loop = (now) => {
      if (!this.isPaused) {
        const interval = this.getTickIntervalMs();
        const delta = now - this.lastTickTime;

        if (delta >= interval) {
          // Advance one precise mechanical gear step
          const steps = Math.floor(delta / interval);
          const stepAngle = this.getStepAngle();
          this.currentAngle = (this.currentAngle + (stepAngle * steps)) % 360;
          this.totalTicks += steps;
          this.lastTickTime = now - (delta % interval);

          if (this.secondsHandEl) {
            this.secondsHandEl.style.transform = `rotate(${this.currentAngle.toFixed(2)}deg)`;
          }

          // Mechanical tick-tock audio impulse
          playEscapementTick();
        }
      } else {
        this.lastTickTime = now;
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

// =========================================================================
// 5. DRAGGABLE & CLICK-TO-ROTATE 120-CLICK DIVER BEZEL WIDGET
// =========================================================================
export class DiverBezelWidget {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.currentDegrees = options.initialDegrees || 0;
    this.isDragging = false;
    this.center = { x: 0, y: 0 };
    this.lastAngleRad = 0;
    this.render();
    this.bind();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="diver-bezel-module">
        <div class="bezel-case-stage">
          <!-- 120-Click Knurled Outer Rotating Bezel Ring -->
          <div class="bezel-rotating-ring" id="diverRotatingRing" role="slider" aria-valuemin="0" aria-valuemax="60" aria-valuenow="0" aria-label="120-Click Unidirectional Diver Bezel" tabindex="0">
            <!-- Coin Edge Serrations -->
            <div class="bezel-coin-edge"></div>

            <!-- Ceramic Bezel Insert with 60-Minute Graduations -->
            <div class="bezel-insert">
              <!-- 12 o'clock Lumed Triangular Pip -->
              <div class="bezel-marker-pip" title="Luminous Super-LumiNova Zero Marker">
                <span class="bezel-pip-triangle">&#9660;</span>
                <span class="bezel-pip-pearl"></span>
              </div>

              <!-- Key 10-Minute Arabic Numerals -->
              <span class="bezel-num bezel-num-10">10</span>
              <span class="bezel-num bezel-num-20">20</span>
              <span class="bezel-num bezel-num-30">30</span>
              <span class="bezel-num bezel-num-40">40</span>
              <span class="bezel-num bezel-num-50">50</span>

              <!-- Bezel Minute Hash Marks -->
              ${this.generateBezelHashes()}
            </div>
          </div>

          <!-- Central Stationary Crystal Dial -->
          <div class="bezel-center-dial">
            <span class="bezel-dial-emblem">&#x2316;</span>
            <span class="bezel-dial-brand">HOROLOGY</span>
            <span class="bezel-dial-spec">120-CLICK RATCHET</span>
            <div class="bezel-elapsed-readout">
              <span class="bezel-elapsed-label">ELAPSED TIME</span>
              <span class="bezel-elapsed-val" id="bezelElapsedMinutes">00 MIN</span>
            </div>
          </div>
        </div>

        <!-- Tactile Step Adjustment Controls -->
        <div class="bezel-controls-bar">
          <button type="button" class="btn btn-outline btn-xs" id="bezelRotate1Min" title="Rotate Bezel 1 Minute (2 Clicks)">
            <span>&#x21B6; +1 Min (2 Clicks)</span>
          </button>
          <button type="button" class="btn btn-outline btn-xs" id="bezelRotate5Min" title="Rotate Bezel 5 Minutes (10 Clicks)">
            <span>&#x21B6; +5 Min (10 Clicks)</span>
          </button>
          <button type="button" class="btn btn-ghost btn-xs" id="bezelResetZero" title="Reset Bezel Pip to 12 o'clock">
            <span>Reset Zero</span>
          </button>
        </div>
        <p class="bezel-instruction-hint">
          <span style="color:var(--accent-primary);">&#x21BB;</span> Click buttons or drag ring counter-clockwise with mouse/touch to test 120-click detent.
        </p>
      </div>
    `;

    this.ringEl = this.container.querySelector('#diverRotatingRing');
    this.elapsedEl = this.container.querySelector('#bezelElapsedMinutes');
  }

  generateBezelHashes() {
    let hashes = '';
    // Individual minute marks for the first 15 minutes of dive decompression
    for (let m = 1; m <= 60; m++) {
      if (m % 10 === 0) continue;
      const deg = m * 6;
      hashes += `<span class="bezel-hash ${m <= 15 ? 'bezel-hash-bold' : ''}" style="transform: rotate(${deg}deg);"></span>`;
    }
    return hashes;
  }

  bind() {
    const rotate1 = this.container.querySelector('#bezelRotate1Min');
    const rotate5 = this.container.querySelector('#bezelRotate5Min');
    const reset = this.container.querySelector('#bezelResetZero');

    // 1 Minute = 6 degrees = 2 clicks
    rotate1?.addEventListener('click', () => this.stepClicks(2));
    // 5 Minutes = 30 degrees = 10 clicks
    rotate5?.addEventListener('click', () => this.stepClicks(10));
    reset?.addEventListener('click', () => this.resetZero());

    // Drag / Touch Pointer Tracking
    if (this.ringEl) {
      this.ringEl.addEventListener('pointerdown', (e) => this.onPointerDown(e));
      window.addEventListener('pointermove', (e) => this.onPointerMove(e));
      window.addEventListener('pointerup', () => this.onPointerUp());
      window.addEventListener('pointercancel', () => this.onPointerUp());

      // Keyboard arrow left/right support
      this.ringEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.stepClicks(2);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          this.stepClicks(-2);
        }
      });
    }
  }

  stepClicks(clicks) {
    // 1 click = 3 degrees (120 clicks = 360 deg)
    const degPerClick = 3;
    this.currentDegrees = (this.currentDegrees - (clicks * degPerClick)) % 360;
    if (this.currentDegrees < 0) this.currentDegrees += 360;

    this.updateVisuals();
    playBezelClick();
  }

  resetZero() {
    this.currentDegrees = 0;
    this.updateVisuals();
    playBezelClick();
  }

  onPointerDown(e) {
    e.preventDefault();
    this.isDragging = true;
    const rect = this.ringEl.getBoundingClientRect();
    this.center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    this.lastAngleRad = Math.atan2(e.clientY - this.center.y, e.clientX - this.center.x);
    this.ringEl.classList.add('bezel-dragging');
  }

  onPointerMove(e) {
    if (!this.isDragging) return;
    const curAngleRad = Math.atan2(e.clientY - this.center.y, e.clientX - this.center.x);
    let deltaRad = curAngleRad - this.lastAngleRad;

    // Handle 180deg wrapping
    if (deltaRad > Math.PI) deltaRad -= 2 * Math.PI;
    if (deltaRad < -Math.PI) deltaRad += 2 * Math.PI;

    const deltaDeg = deltaRad * (180 / Math.PI);

    // Detent check: 3 degrees per click
    if (Math.abs(deltaDeg) >= 3) {
      const clicks = Math.round(deltaDeg / 3);
      this.currentDegrees = (this.currentDegrees + (clicks * 3)) % 360;
      if (this.currentDegrees < 0) this.currentDegrees += 360;
      this.lastAngleRad = curAngleRad;

      this.updateVisuals();
      playBezelClick();
    }
  }

  onPointerUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.ringEl?.classList.remove('bezel-dragging');
    }
  }

  updateVisuals() {
    if (this.ringEl) {
      this.ringEl.style.transform = `rotate(${this.currentDegrees}deg)`;
    }
    if (this.elapsedEl) {
      // 360 deg = 60 mins -> 6 deg = 1 min
      const normalizedDeg = (360 - (this.currentDegrees % 360)) % 360;
      const elapsedMins = Math.round(normalizedDeg / 6);
      this.elapsedEl.textContent = `${String(elapsedMins).padStart(2, '0')} MIN`;
      this.ringEl?.setAttribute('aria-valuenow', String(elapsedMins));
    }
  }
}

// =========================================================================
// 6. HERO 3D MULTI-LAYERED EXPLODED WATCH CALIBRE SHOWCASE
// =========================================================================
export class Hero3DExplodedCalibre {
  constructor(containerEl) {
    this.container = containerEl;
    this.isExploded = false;
    this.isDragging = false;
    this.rotX = 14;
    this.rotY = -18;
    this.targetRotX = 14;
    this.targetRotY = -18;
    this.startX = 0;
    this.startY = 0;
    this.rafId = null;
    this.secondsAngle = 0;
    this.render();
    this.bindEvents();
    this.startLoop();
  }

  render() {
    if (!this.container) return;

    // Perlage engine-turned decorative circles for mainplate
    let perlage = '';
    const centers = [
      [170, 110], [130, 140], [210, 140], [110, 180], [170, 180],
      [230, 180], [140, 220], [200, 220], [170, 145], [170, 80]
    ];
    centers.forEach(([cx, cy]) => {
      perlage += `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="rgba(212,175,55,0.18)" stroke-width="1.2"/>`;
      perlage += `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="rgba(212,175,55,0.12)" stroke-width="0.8"/>`;
    });

    // 12 Applied Champagne Gold Indices for Dial
    let indices = '';
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const rad = (angle - 90) * (Math.PI / 180);
      const isQuarter = i % 3 === 0;
      const rInner = isQuarter ? 124 : 132;
      const rOuter = 148;
      const x1 = (170 + rInner * Math.cos(rad)).toFixed(1);
      const y1 = (170 + rInner * Math.sin(rad)).toFixed(1);
      const x2 = (170 + rOuter * Math.cos(rad)).toFixed(1);
      const y2 = (170 + rOuter * Math.sin(rad)).toFixed(1);
      const width = isQuarter ? 4 : 2;
      indices += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#D4AF37" stroke-width="${width}" stroke-linecap="round"/>`;
      // Luminous dot pip at outer index
      const pipR = 153;
      const px = (170 + pipR * Math.cos(rad)).toFixed(1);
      const py = (170 + pipR * Math.sin(rad)).toFixed(1);
      indices += `<circle cx="${px}" cy="${py}" r="2" fill="#38f2af"/>`;
    }

    this.container.innerHTML = `
      <div class="hero-3d-calibre-stage" id="calibreStage" title="Drag to tilt in 3D &bull; Toggle Explode to expand Z-axis layers">
        <div class="calibre-3d-assembly" id="calibreAssembly">
          <!-- Connecting Exploded Depth Rods & Layer Labels -->
          <div class="calibre-exploded-guides" aria-hidden="true">
            <div class="calibre-guide-pillar calibre-guide-p1"></div>
            <div class="calibre-guide-pillar calibre-guide-p2"></div>
            <div class="calibre-guide-pillar calibre-guide-p3"></div>
            <div class="calibre-guide-pillar calibre-guide-p4"></div>

            <span class="calibre-layer-tag calibre-tag-5">05 / Domed Sapphire Crystal</span>
            <span class="calibre-layer-tag calibre-tag-4">04 / Cerachrom Fluted Bezel</span>
            <span class="calibre-layer-tag calibre-tag-3">03 / Sunburst Dial &amp; Handset</span>
            <span class="calibre-layer-tag calibre-tag-2">02 / Calibre 3235 Gear Train</span>
            <span class="calibre-layer-tag calibre-tag-1">01 / Monobloc Mainplate</span>
          </div>

          <!-- Layer 1 (translateZ(0px)): Engraved Caseback & Mainplate Grid -->
          <div class="calibre-layer calibre-layer-1">
            <svg class="calibre-mainplate-svg" viewBox="0 0 340 340" aria-hidden="true">
              <circle cx="170" cy="170" r="162" fill="#06090e" stroke="rgba(212,175,55,0.45)" stroke-width="2"/>
              ${perlage}
              <circle cx="170" cy="170" r="38" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4 2"/>
              <!-- Calibre Archival Text -->
              <text x="170" y="248" text-anchor="middle" fill="#D4AF37" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="bold" letter-spacing="2">CALIBRE 3235 &bull; 31 JEWELS</text>
              <text x="170" y="262" text-anchor="middle" fill="rgba(241,244,248,0.45)" font-family="'JetBrains Mono', monospace" font-size="7" letter-spacing="1.5">ADJUSTED TO 5 POSITIONS</text>
            </svg>
          </div>

          <!-- Layer 2 (translateZ(25px)): Animated Rotating Gear Train & Balance Wheel -->
          <div class="calibre-layer calibre-layer-2">
            <svg class="calibre-gears-cluster" viewBox="0 0 310 310" aria-hidden="true">
              <!-- Center Wheel Gear (Brass) -->
              <g id="gearCenter" style="transform-origin: 155px 155px;">
                <circle cx="155" cy="155" r="42" fill="none" stroke="#D4AF37" stroke-width="6" stroke-dasharray="7 3"/>
                <circle cx="155" cy="155" r="36" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.5)" stroke-width="1"/>
                <line x1="155" y1="120" x2="155" y2="190" stroke="#D4AF37" stroke-width="2"/>
                <line x1="120" y1="155" x2="190" y2="155" stroke="#D4AF37" stroke-width="2"/>
              </g>

              <!-- Third Wheel (Left Upper) -->
              <g id="gearThird" style="transform-origin: 95px 125px;">
                <circle cx="95" cy="125" r="28" fill="none" stroke="#caa538" stroke-width="5" stroke-dasharray="5 2.5"/>
                <circle cx="95" cy="125" r="5" fill="#f43f5e" stroke="#D4AF37" stroke-width="1"/>
              </g>

              <!-- Fourth Wheel (Seconds Driver) -->
              <g id="gearFourth" style="transform-origin: 195px 115px;">
                <circle cx="195" cy="115" r="22" fill="none" stroke="#D4AF37" stroke-width="4" stroke-dasharray="4 2"/>
                <circle cx="195" cy="115" r="4" fill="#f43f5e" stroke="#D4AF37" stroke-width="1"/>
              </g>

              <!-- Oscillating Variable-Inertia Balance Wheel -->
              <g id="gearBalance" style="transform-origin: 215px 205px;">
                <circle cx="215" cy="205" r="38" fill="none" stroke="#D4AF37" stroke-width="3"/>
                <circle cx="215" cy="205" r="6" fill="#f43f5e" stroke="#FFF" stroke-width="1"/>
                <!-- Hairspring Coils -->
                <circle cx="215" cy="205" r="14" fill="none" stroke="rgba(56,242,175,0.4)" stroke-width="1"/>
                <circle cx="215" cy="205" r="22" fill="none" stroke="rgba(56,242,175,0.3)" stroke-width="0.8"/>
                <circle cx="215" cy="205" r="30" fill="none" stroke="rgba(56,242,175,0.2)" stroke-width="0.8"/>
                <!-- Microstella Inertia Screws on Rim -->
                <circle cx="215" cy="167" r="2" fill="#FFF"/>
                <circle cx="215" cy="243" r="2" fill="#FFF"/>
                <circle cx="177" cy="205" r="2" fill="#FFF"/>
                <circle cx="253" cy="205" r="2" fill="#FFF"/>
              </g>
            </svg>
          </div>

          <!-- Layer 3 (translateZ(50px)): Sunburst Dial with Applied Indices & Live Hands -->
          <div class="calibre-layer calibre-layer-3">
            <svg class="calibre-dial-svg" viewBox="0 0 340 340" aria-hidden="true">
              <defs>
                <radialGradient id="dialSunburstHero" cx="50%" cy="38%" r="68%">
                  <stop offset="0%" stop-color="#142436"/>
                  <stop offset="65%" stop-color="#08101a"/>
                  <stop offset="100%" stop-color="#020406"/>
                </radialGradient>
              </defs>
              <circle cx="170" cy="170" r="158" fill="url(#dialSunburstHero)" stroke="rgba(212,175,55,0.3)" stroke-width="1.5"/>
              ${indices}
              <!-- Wordmark & Chronometer Rating -->
              <text x="170" y="104" text-anchor="middle" fill="#D4AF37" font-family="'Cormorant Garamond', serif" font-size="14" font-weight="600" letter-spacing="4">HOROLOGY</text>
              <text x="170" y="118" text-anchor="middle" fill="rgba(241,244,248,0.5)" font-family="'JetBrains Mono', monospace" font-size="6.5" letter-spacing="1">CHRONOMETER SPECIMEN</text>
              <!-- Date Window at 3 o'clock -->
              <rect x="238" y="160" width="22" height="20" rx="2" fill="#040608" stroke="rgba(212,175,55,0.5)" stroke-width="1"/>
              <text x="249" y="175" text-anchor="middle" fill="#f1f4f8" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold">28</text>
            </svg>

            <!-- Live Sweeping Handset -->
            <div class="calibre-live-handset">
              <div class="calibre-hand calibre-hand-hour" id="calibreHourHand"></div>
              <div class="calibre-hand calibre-hand-minute" id="calibreMinuteHand"></div>
              <div class="calibre-hand calibre-hand-second" id="calibreSecondHand"></div>
              <div class="calibre-center-pinion"></div>
            </div>
          </div>

          <!-- Layer 4 (translateZ(75px)): Fluted Bezel Ring -->
          <div class="calibre-layer calibre-layer-4"></div>

          <!-- Layer 5 (translateZ(95px)): Domed Sapphire Crystal Glare -->
          <div class="calibre-layer calibre-layer-5" id="calibreSapphireDome"></div>
        </div>
      </div>

      <!-- Exploded View Controls -->
      <div class="calibre-controls-bar">
        <button type="button" class="btn btn-outline btn-xs btn-explode-calibre" id="btnExplodeCalibre" aria-pressed="false" title="Expand Z-Axis Mechanical Layers">
          <span id="labelExplodeCalibre">&#x2922; EXPLODE CALIBRE (3D)</span>
        </button>
        <button type="button" class="btn btn-ghost btn-xs" id="btnResetCalibreTilt" title="Reset 3D Perspective Orientation">
          <span>&#x21BA; Reset Orientation</span>
        </button>
      </div>
    `;

    this.stageEl = this.container.querySelector('#calibreStage');
    this.assemblyEl = this.container.querySelector('#calibreAssembly');
    this.explodeBtnEl = this.container.querySelector('#btnExplodeCalibre');
    this.explodeLabelEl = this.container.querySelector('#labelExplodeCalibre');
    this.resetBtnEl = this.container.querySelector('#btnResetCalibreTilt');

    this.hourHandEl = this.container.querySelector('#calibreHourHand');
    this.minHandEl = this.container.querySelector('#calibreMinuteHand');
    this.secHandEl = this.container.querySelector('#calibreSecondHand');
    this.sapphireDomeEl = this.container.querySelector('#calibreSapphireDome');

    this.gearCenterEl = this.container.querySelector('#gearCenter');
    this.gearThirdEl = this.container.querySelector('#gearThird');
    this.gearFourthEl = this.container.querySelector('#gearFourth');
    this.gearBalanceEl = this.container.querySelector('#gearBalance');
  }

  bindEvents() {
    if (!this.stageEl) return;

    // Explode Toggle
    this.explodeBtnEl?.addEventListener('click', () => {
      this.toggleExplode();
    });

    // Reset Orientation
    this.resetBtnEl?.addEventListener('click', () => {
      this.resetOrientation();
    });

    // Mousemove Parallax (when not dragging)
    this.stageEl.addEventListener('pointermove', (e) => {
      if (this.isDragging) return;
      const rect = this.stageEl.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;

      // ±18deg rotation
      this.targetRotY = (xPct - 0.5) * 36;
      this.targetRotX = -(yPct - 0.5) * 28;

      if (this.sapphireDomeEl) {
        this.sapphireDomeEl.style.setProperty('--calibre-glare-x', `${(xPct * 100).toFixed(1)}%`);
        this.sapphireDomeEl.style.setProperty('--calibre-glare-y', `${(yPct * 100).toFixed(1)}%`);
      }
    }, { passive: true });

    // Pointer Drag Orbital Control
    this.stageEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.stageEl.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      this.startX = e.clientX;
      this.startY = e.clientY;

      this.targetRotY += dx * 0.45;
      this.targetRotX -= dy * 0.45;
      // Clamp X rotation to +/- 60 deg
      this.targetRotX = Math.max(-60, Math.min(60, this.targetRotX));
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.stageEl?.classList.remove('is-dragging');
      }
    });

    // Touch Parallax Reset on Leave
    this.stageEl.addEventListener('pointerleave', () => {
      if (!this.isDragging) {
        this.targetRotX = 14;
        this.targetRotY = -18;
      }
    }, { passive: true });
  }

  toggleExplode() {
    this.isExploded = !this.isExploded;
    this.stageEl?.classList.toggle('is-exploded', this.isExploded);
    this.explodeBtnEl?.classList.toggle('active', this.isExploded);
    this.explodeBtnEl?.setAttribute('aria-pressed', String(this.isExploded));

    if (this.explodeLabelEl) {
      this.explodeLabelEl.innerHTML = this.isExploded ? '&#x25A3; ASSEMBLE CALIBRE' : '&#x2922; EXPLODE CALIBRE (3D)';
    }

    if (this.assemblyEl) {
      this.assemblyEl.classList.add('calibre-animating');
      setTimeout(() => this.assemblyEl?.classList.remove('calibre-animating'), 750);
    }

    playMechanicalClick(2600, 0.02);
  }

  resetOrientation() {
    this.targetRotX = 14;
    this.targetRotY = -18;
    playMechanicalClick(2200, 0.012);
  }

  startLoop() {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Smooth damping interpolation
      this.rotX += (this.targetRotX - this.rotX) * 0.12;
      this.rotY += (this.targetRotY - this.rotY) * 0.12;

      if (this.assemblyEl) {
        this.assemblyEl.style.transform = `rotateX(${this.rotX.toFixed(2)}deg) rotateY(${this.rotY.toFixed(2)}deg)`;
      }

      // Synchronize Hands with real time + 8 beats/s sweep
      const date = new Date();
      const ms = date.getMilliseconds();
      const sec = date.getSeconds() + ms / 1000;
      const min = date.getMinutes() + sec / 60;
      const hr = (date.getHours() % 12) + min / 60;

      const secAngle = sec * 6; // 360 / 60
      const minAngle = min * 6;
      const hrAngle = hr * 30; // 360 / 12

      if (this.secHandEl) this.secHandEl.style.transform = `rotate(${secAngle.toFixed(2)}deg)`;
      if (this.minHandEl) this.minHandEl.style.transform = `rotate(${minAngle.toFixed(2)}deg)`;
      if (this.hourHandEl) this.hourHandEl.style.transform = `rotate(${hrAngle.toFixed(2)}deg)`;

      // Animate gear rotations
      const gearSpeed = sec * 12;
      if (this.gearCenterEl) this.gearCenterEl.style.transform = `rotate(${gearSpeed.toFixed(1)}deg)`;
      if (this.gearThirdEl) this.gearThirdEl.style.transform = `rotate(${(-gearSpeed * 1.5).toFixed(1)}deg)`;
      if (this.gearFourthEl) this.gearFourthEl.style.transform = `rotate(${(gearSpeed * 3).toFixed(1)}deg)`;

      // Oscillating balance wheel (4 Hz harmonic oscillation)
      const balanceOsc = Math.sin(now * 0.025) * 24;
      if (this.gearBalanceEl) this.gearBalanceEl.style.transform = `rotate(${balanceOsc.toFixed(2)}deg)`;

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

// =========================================================================
// 7. 3D WATCH CASE & DIAL FLIP CARDS CONTROLLER
// =========================================================================
export function initWatchCardFlip() {
  document.addEventListener('click', (e) => {
    // Flip to Exhibition Caseback Trigger
    const flipBtn = e.target.closest('[data-action="flip-card"]');
    if (flipBtn) {
      e.preventDefault();
      e.stopPropagation();
      const card = flipBtn.closest('.card-watch');
      if (card) {
        card.classList.add('is-flipped');
        playMechanicalClick(2100, 0.016);
      }
      return;
    }

    // Flip back to Dial Face Trigger
    const flipBackBtn = e.target.closest('[data-action="flip-card-back"]');
    if (flipBackBtn) {
      e.preventDefault();
      e.stopPropagation();
      const card = flipBackBtn.closest('.card-watch');
      if (card) {
        card.classList.remove('is-flipped');
        playMechanicalClick(2400, 0.014);
      }
      return;
    }
  });
}

// =========================================================================
// 8. 3D CYLINDRICAL CAROUSEL / ORBIT WHEEL
// =========================================================================
export class Vault3DOrbitWheel {
  constructor(containerEl, watches = []) {
    this.container = containerEl;
    this.watches = watches;
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.velocity = 0;
    this.isDragging = false;
    this.startX = 0;
    this.lastX = 0;
    this.rafId = null;
    this.count = watches.length || 6;
    this.stepAngle = 360 / this.count;
    this.radius = 380; // Z-axis orbit radius in px
    this.render();
    this.bindEvents();
    this.startLoop();
  }

  render() {
    if (!this.container || this.watches.length === 0) return;

    const cardsHtml = this.watches.map((watch, idx) => {
      const angle = idx * this.stepAngle;
      const img = watch.image || watch.imageUrl || 'assets/images/hero/hero-home-primary-16x9.jpg';
      const price = typeof watch.price === 'number' ? `₹${watch.price.toLocaleString('en-IN')}` : watch.price;

      return `
        <div class="vault-orbit-card ${idx === 0 ? 'orbit-card-active' : ''}" 
             data-orbit-index="${idx}" 
             style="--orbit-i: ${idx}; --orbit-step: ${this.stepAngle}deg; transform: rotateY(${angle}deg) translateZ(${this.radius}px);">
          <div style="position: relative; width: 100%; aspect-ratio: 1/1; background: #070c14; overflow: hidden; border-bottom: 1px solid var(--border-subtle);">
            <img src="${img}" alt="${watch.model}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
            <span class="badge badge-verified" style="position: absolute; top: 12px; left: 12px;">Certified</span>
          </div>
          <div style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            <div>
              <div style="font-family: var(--font-sans); font-size: 0.7rem; color: var(--accent-primary); font-weight: 600; text-transform: uppercase;">${watch.brand}</div>
              <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary); margin: 2px 0 6px 0;">${watch.model}</h4>
              <p style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); margin: 0 0 12px 0;">Ref. ${watch.reference || watch.referenceNumber || 'N/A'}</p>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06);">
              <span style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${price}</span>
              <a href="#/watch/${watch.slug}" class="btn btn-outline btn-xs">
                <span>Examine</span> &rarr;
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="vault-orbit-stage" id="orbitStage" role="region" aria-label="3D Cylindrical Vault Orbit">
        <div class="vault-orbit-cylinder" id="orbitCylinder">
          ${cardsHtml}
        </div>
      </div>

      <div class="orbit-controls-cluster">
        <button type="button" class="orbit-nav-arrow" id="orbitPrevBtn" aria-label="Previous Watch (Arrow Left)" title="Rotate Left">
          &larr;
        </button>
        <span class="font-mono text-xs text-muted" id="orbitActiveIndicator">SPECIMEN 1 / ${this.count}</span>
        <button type="button" class="orbit-nav-arrow" id="orbitNextBtn" aria-label="Next Watch (Arrow Right)" title="Rotate Right">
          &rarr;
        </button>
      </div>
      <p style="text-align: center; font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); margin-top: 6px;">
        Click and drag horizontally or scroll to spin 3D cylinder. Click any side watch to center.
      </p>
    `;

    this.stageEl = this.container.querySelector('#orbitStage');
    this.cylinderEl = this.container.querySelector('#orbitCylinder');
    this.cards = Array.from(this.container.querySelectorAll('.vault-orbit-card'));
    this.indicatorEl = this.container.querySelector('#orbitActiveIndicator');
  }

  bindEvents() {
    if (!this.stageEl) return;

    // Prev / Next Arrows
    this.container.querySelector('#orbitPrevBtn')?.addEventListener('click', () => {
      this.stepOrbit(1);
    });
    this.container.querySelector('#orbitNextBtn')?.addEventListener('click', () => {
      this.stepOrbit(-1);
    });

    // Pointer Drag with Momentum
    this.stageEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.startX = e.clientX;
      this.lastX = e.clientX;
      this.velocity = 0;
      this.stageEl.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastX;
      this.velocity = dx * 0.35;
      this.targetAngle += dx * 0.35;
      this.lastX = e.clientX;
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.stageEl?.classList.remove('is-dragging');
        // Snap to nearest card step with velocity momentum
        this.targetAngle += this.velocity * 4;
        this.snapToNearest();
      }
    });

    // Mouse Wheel Scroll Listener
    this.stageEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY || e.deltaX);
      this.stepOrbit(-delta);
    }, { passive: false });

    // Keyboard Left / Right Navigation
    window.addEventListener('keydown', (e) => {
      if (!this.container.offsetParent) return; // Only if visible
      if (e.key === 'ArrowLeft') {
        this.stepOrbit(1);
      } else if (e.key === 'ArrowRight') {
        this.stepOrbit(-1);
      }
    });

    // Clicking side card spins it directly to center
    this.cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // If clicking examine button or link, let it proceed
        if (e.target.closest('a, button')) return;
        const targetRot = -idx * this.stepAngle;
        this.rotateToAngle(targetRot);
      });
    });
  }

  stepOrbit(dir) {
    this.targetAngle += dir * this.stepAngle;
    this.snapToNearest();
    playMechanicalClick(2400, 0.015);
  }

  snapToNearest() {
    const snapped = Math.round(this.targetAngle / this.stepAngle) * this.stepAngle;
    this.targetAngle = snapped;
  }

  rotateToAngle(angle) {
    this.targetAngle = angle;
    playMechanicalClick(2400, 0.015);
  }

  startLoop() {
    const loop = () => {
      // Smooth inertia interpolation
      const diff = this.targetAngle - this.currentAngle;
      this.currentAngle += diff * 0.14;

      if (this.cylinderEl) {
        this.cylinderEl.style.transform = `rotateY(${this.currentAngle.toFixed(2)}deg)`;
      }

      this.updateActiveCard();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  updateActiveCard() {
    if (!this.cards || this.cards.length === 0) return;

    // Normalize angle within [0, 360)
    let netAngle = (-this.currentAngle) % 360;
    if (netAngle < 0) netAngle += 360;

    let closestIdx = 0;
    let minDistance = 360;

    this.cards.forEach((card, idx) => {
      const cardAngle = (idx * this.stepAngle) % 360;
      let dist = Math.abs(netAngle - cardAngle);
      if (dist > 180) dist = 360 - dist;

      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    this.cards.forEach((card, idx) => {
      const isActive = idx === closestIdx;
      card.classList.toggle('orbit-card-active', isActive);
    });

    if (this.indicatorEl) {
      this.indicatorEl.textContent = `SPECIMEN ${closestIdx + 1} / ${this.count}`;
    }
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

// =========================================================================
// 9. 3D INTERACTIVE CROWN-WINDING & POWER RESERVE DIAL WIDGET
// =========================================================================
export class CrownWindingWidget {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.onAmplitudeChanged = options.onAmplitudeChanged || null;
    this.maxHours = 72;
    this.currentHours = options.initialHours || 48;
    this.crownRotation = 0;
    this.isDragging = false;
    this.lastY = 0;
    this.render();
    this.bindEvents();
    this.updateVisuals();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="crown-winding-stage">
        <div class="text-center">
          <span class="overline" style="color: var(--accent-primary);">&#x2316; MAINSPRING POWER BENCH</span>
          <h3 class="font-serif text-lg text-primary mt-1 mb-1">3D Fluted Crown &amp; Barrel Autonomy</h3>
          <p class="body-muted text-xs">
            Drag vertically on the fluted crown to wind the mainspring and increase balance wheel amplitude.
          </p>
        </div>

        <div class="crown-winding-interactive-bay">
          <!-- 3D Fluted Crown Cylinder -->
          <div class="crown-3d-cylinder-box" id="crownCylinderBox" title="Drag vertically or scroll up/down to wind watch crown">
            <div class="crown-3d-cylinder" id="crown3DCylinder">
              <div class="crown-flute-strip"></div>
              <div class="crown-coronet-cap">&#x2655;</div>
            </div>
          </div>

          <!-- Power Reserve Arc Gauge -->
          <div class="power-reserve-gauge-box">
            <svg class="power-reserve-dial-svg" viewBox="0 0 120 80" aria-hidden="true">
              <!-- Gauge Arc Track -->
              <path d="M 20 70 A 50 50 0 0 1 100 70" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="6" stroke-linecap="round"/>
              <!-- Colored Progress Arc -->
              <path id="powerReserveArc" d="M 20 70 A 50 50 0 0 1 100 70" fill="none" stroke="url(#powerGaugeGrad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="125" stroke-dashoffset="35"/>
              <defs>
                <linearGradient id="powerGaugeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f43f5e"/>
                  <stop offset="40%" stop-color="#D4AF37"/>
                  <stop offset="100%" stop-color="#38f2af"/>
                </linearGradient>
              </defs>
              <!-- Center Hub & Needle -->
              <circle cx="60" cy="70" r="5" fill="#D4AF37"/>
              <line id="powerNeedle" class="power-reserve-needle" x1="60" y1="70" x2="60" y2="28" stroke="#f1f4f8" stroke-width="2.5" stroke-linecap="round"/>
            </svg>

            <div class="power-reserve-readout">
              <div class="power-reserve-hours" id="powerHoursDisplay">${this.currentHours}h</div>
              <div class="power-reserve-label" id="powerStatusLabel">OPTIMAL AUTONOMY</div>
            </div>
          </div>
        </div>

        <!-- Quick Winding Actions -->
        <div class="crown-winding-actions">
          <button type="button" class="btn btn-outline btn-xs" id="btnWind12h" title="Wind Mainspring 12 Hours">
            <span>+12h Wind</span>
          </button>
          <button type="button" class="btn btn-primary btn-xs" id="btnWindFull" title="Full 72-Hour Winding">
            <span>Full Wind (72h)</span>
          </button>
          <button type="button" class="btn btn-ghost btn-xs" id="btnDeplete" title="Deplete Mainspring Energy">
            <span>Deplete</span>
          </button>
        </div>
      </div>
    `;

    this.cylinderEl = this.container.querySelector('#crown3DCylinder');
    this.hoursEl = this.container.querySelector('#powerHoursDisplay');
    this.statusEl = this.container.querySelector('#powerStatusLabel');
    this.needleEl = this.container.querySelector('#powerNeedle');
    this.arcEl = this.container.querySelector('#powerReserveArc');
  }

  bindEvents() {
    if (!this.cylinderEl) return;

    // Quick Buttons
    this.container.querySelector('#btnWind12h')?.addEventListener('click', () => {
      this.addHours(12);
      playWindingTick();
    });

    this.container.querySelector('#btnWindFull')?.addEventListener('click', () => {
      this.setHours(72);
      playWindingTick();
    });

    this.container.querySelector('#btnDeplete')?.addEventListener('click', () => {
      this.setHours(0);
      playMechanicalClick(1800, 0.02);
    });

    // Pointer Drag Vertically to Wind
    this.cylinderEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.lastY = e.clientY;
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dy = e.clientY - this.lastY;
      this.lastY = e.clientY;

      if (Math.abs(dy) >= 2) {
        // Dragging up winds forward
        const direction = dy < 0 ? 1 : -0.5;
        this.crownRotation += dy * 2.5;
        this.cylinderEl.style.transform = `rotateX(${this.crownRotation.toFixed(1)}deg)`;

        if (dy < 0) {
          this.addHours(1);
          playWindingTick();
        }
      }
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      if (this.isDragging) {
        this.isDragging = false;
      }
    });

    // Mouse Wheel Scroll Listener on Crown Box
    const box = this.container.querySelector('#crownCylinderBox');
    box?.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = -Math.sign(e.deltaY);
      if (delta > 0) {
        this.addHours(1.5);
        this.crownRotation -= 12;
        this.cylinderEl.style.transform = `rotateX(${this.crownRotation.toFixed(1)}deg)`;
        playWindingTick();
      } else {
        this.addHours(-1);
      }
    }, { passive: false });
  }

  addHours(amount) {
    this.setHours(this.currentHours + amount);
  }

  setHours(val) {
    this.currentHours = Math.max(0, Math.min(this.maxHours, Math.round(val)));
    this.updateVisuals();
  }

  updateVisuals() {
    if (this.hoursEl) {
      this.hoursEl.textContent = `${this.currentHours}h`;
    }

    const pct = this.currentHours / this.maxHours; // 0.0 to 1.0

    if (this.statusEl) {
      if (this.currentHours === 0) {
        this.statusEl.textContent = 'DEPLETED / STOPPED';
        this.statusEl.style.color = 'var(--status-danger)';
      } else if (this.currentHours < 24) {
        this.statusEl.textContent = 'LOW TENSION';
        this.statusEl.style.color = 'var(--accent-hover)';
      } else {
        this.statusEl.textContent = 'OPTIMAL ISOCHRONISM';
        this.statusEl.style.color = '#38f2af';
      }
    }

    // Arc Dashoffset (total length ~125): 0% = 125, 100% = 0
    if (this.arcEl) {
      const offset = 125 - (125 * pct);
      this.arcEl.style.strokeDashoffset = String(offset.toFixed(1));
    }

    // Needle Angle: -60deg (0h) to +60deg (72h)
    if (this.needleEl) {
      const angle = -60 + (pct * 120);
      this.needleEl.style.transform = `rotate(${angle.toFixed(1)}deg)`;
    }

    // Coupled Balance Wheel Amplitude: 0h = 0 deg, 72h = 315 deg
    const calculatedAmplitude = Math.round(pct * 315);
    if (typeof this.onAmplitudeChanged === 'function') {
      this.onAmplitudeChanged(calculatedAmplitude, this.currentHours);
    }
  }
}

// =========================================================================
// 10. 3D BUTTONS & SPECULAR CURSOR HIGHLIGHT INITIALIZER
// =========================================================================
export function init3DButtonsAndTooltips() {
  document.addEventListener('pointermove', (e) => {
    const btn = e.target.closest('.btn-primary, .btn-gold, .btn-3d-specular');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    btn.style.setProperty('--btn-x', `${xPct.toFixed(1)}%`);
    btn.style.setProperty('--btn-y', `${yPct.toFixed(1)}%`);
  }, { passive: true });
}

// =========================================================================
// 11. MASTER INITIALIZER
// =========================================================================
export function initHorologyMotion() {
  initLumeMode();
  initCard3DTilt();
  initScrollReveal();
  initNumberCounters();
  initWatchCardFlip();
  init3DButtonsAndTooltips();
}

