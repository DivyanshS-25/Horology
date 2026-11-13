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
// 6. MASTER INITIALIZER
// =========================================================================
export function initHorologyMotion() {
  initLumeMode();
  initCard3DTilt();
  initScrollReveal();
  initNumberCounters();
}
