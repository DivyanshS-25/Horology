// HOROLOGY — Movement Lab & Timegrapher Simulator Route Module (Panel 09)
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { MovementSimulator, MOVEMENT_PARTS } from '../features/movementSim.js';
import { TimegrapherScreen } from '../features/timegrapher.js';
import { icons } from '../utils/svgIcons.js';
import { formatRate, formatAmplitude, formatBeatError } from '../utils/formatters.js';

export const movementLabPage = {
  id: 'movementLab',
  path: '/movement-lab',
  title: 'Movement Lab — Interactive Escapement & Timegrapher Simulator',

  state: {
    activePart: MOVEMENT_PARTS[3], // Default to balance wheel
    vph: 28800,
    amplitude: 275,
    rate: +2,
    beatError: 0.1
  },

  movementSim: null,
  timegrapherSim: null,

  render() {
    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Movement Lab' }
        ])}

        <div class="section-title-wrap">
          <span class="overline">Horological Mechanics &amp; Physics</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Movement Lab</h1>
          <p style="max-width: 720px; margin-top: var(--space-2);">
            Inside every second, there is a world of precision. Explore the mechanical anatomy of harmonic oscillators, lever escapements, and real-time acoustic timegrapher diagnostics.
          </p>
        </div>

        <!-- Main Interactive Stage (Panel 09) -->
        <div class="movement-lab-container">
          <!-- Left: Mechanical Simulation Stage -->
          <div class="movement-interactive-stage">
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
              <span class="overline" style="font-size: 11px;">Harmonic Oscillator Simulation</span>
              <span class="badge badge-verified" id="frequencyBadge">28,800 vph (4 Hz)</span>
            </div>

            <canvas id="balanceCanvas" width="360" height="360" style="max-width: 100%; aspect-ratio: 1/1; cursor: pointer;" aria-label="Interactive balance wheel simulation"></canvas>

            <!-- Component Callout Pills (Panel 09) -->
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-4); justify-content: center;">
              ${MOVEMENT_PARTS.map(part => `
                <button 
                  class="btn btn-outline btn-sm ${this.state.activePart.id === part.id ? 'active' : ''}" 
                  data-part-id="${part.id}"
                  style="${this.state.activePart.id === part.id ? 'border-color: var(--color-accent-primary); background: var(--color-accent-subtle); color: var(--color-text-primary);' : ''}">
                  ${part.name.split('(')[0]}
                </button>
              `).join('')}
            </div>

            <!-- Frequency Switcher -->
            <div style="width: 100%; border-top: 1px solid var(--color-border-hairline); margin-top: var(--space-6); padding-top: var(--space-4);">
              <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-2);">
                Select Escapement Frequency
              </label>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2);">
                <button class="btn btn-outline btn-sm freq-btn" data-vph="18000" title="Historical low beat (e.g. Omega Calibre 321)">18k vph</button>
                <button class="btn btn-outline btn-sm freq-btn" data-vph="21600" title="Classic Moonwatch (e.g. Calibre 1861)">21.6k vph</button>
                <button class="btn btn-outline btn-sm freq-btn active" data-vph="28800" title="Modern Standard (e.g. Rolex 3235)" style="border-color: var(--color-accent-primary); background: var(--color-accent-subtle);">28.8k vph</button>
                <button class="btn btn-outline btn-sm freq-btn" data-vph="36000" title="Hi-Beat (e.g. Grand Seiko 9SA5)">36k vph</button>
              </div>
            </div>
          </div>

          <!-- Right: Deep Component Inspector & Timegrapher -->
          <div style="display: flex; flex-direction: column; gap: var(--space-6);">
            <!-- Active Part Detail Card -->
            <div class="watch-card" style="padding: var(--space-6);">
              <span class="overline" style="font-size: 10px;">Anatomy Breakdown</span>
              <h3 style="font-size: var(--text-2xl); margin: var(--space-1) 0 var(--space-2);" id="partTitle">
                ${this.state.activePart.name}
              </h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed);" id="partDesc">
                ${this.state.activePart.description}
              </p>
            </div>

            <!-- Live Timegrapher Screen (Panel 05 / 09) -->
            <div class="watch-card" style="padding: var(--space-6);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-3);">
                <div>
                  <span class="overline" style="font-size: 10px;">Acoustic Diagnostics</span>
                  <h4 style="font-size: var(--text-base); margin-top: 2px;">Witschi Timegrapher Screen</h4>
                </div>
                <span class="badge badge-verified" style="font-size: 10px;">Live Acoustic Trace</span>
              </div>

              <!-- Canvas Screen -->
              <div class="timegrapher-screen">
                <canvas id="timegrapherCanvas" width="480" height="180" style="width: 100%; height: 100%;"></canvas>
              </div>

              <!-- Live Readout Row -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-top: var(--space-4); text-align: center; border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-3);">
                <div>
                  <span class="overline" style="font-size: 9px;">Daily Rate</span>
                  <div class="mono" id="rateDisplay" style="font-size: var(--text-base); font-weight: bold; color: var(--color-status-available);">
                    ${formatRate(this.state.rate)}
                  </div>
                </div>
                <div>
                  <span class="overline" style="font-size: 9px;">Amplitude</span>
                  <div class="mono" id="ampDisplay" style="font-size: var(--text-base); font-weight: bold; color: var(--color-text-primary);">
                    ${formatAmplitude(this.state.amplitude)}
                  </div>
                </div>
                <div>
                  <span class="overline" style="font-size: 9px;">Beat Error</span>
                  <div class="mono" id="beatErrorDisplay" style="font-size: var(--text-base); font-weight: bold; color: var(--color-accent-primary);">
                    ${formatBeatError(this.state.beatError)}
                  </div>
                </div>
              </div>

              <!-- Interactive Sliders -->
              <div style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-3);">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 2px;">
                    <span>Adjust Rate (-15 to +15 s/d)</span>
                    <span class="mono" id="sliderRateVal">${formatRate(this.state.rate)}</span>
                  </div>
                  <input type="range" class="range-slider" id="rateSlider" min="-15" max="15" value="${this.state.rate}" step="1" />
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 2px;">
                    <span>Adjust Beat Error (0.0 to 1.5 ms)</span>
                    <span class="mono" id="sliderBeatVal">${formatBeatError(this.state.beatError)}</span>
                  </div>
                  <input type="range" class="range-slider" id="beatSlider" min="0" max="1.5" value="${this.state.beatError}" step="0.1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    const balanceCanvas = document.getElementById('balanceCanvas');
    if (balanceCanvas) {
      this.movementSim = new MovementSimulator(balanceCanvas, {
        vph: this.state.vph,
        amplitude: this.state.amplitude
      });
      this.movementSim.start();
    }

    const tgCanvas = document.getElementById('timegrapherCanvas');
    if (tgCanvas) {
      this.timegrapherSim = new TimegrapherScreen(tgCanvas, {
        rate: this.state.rate,
        beatError: this.state.beatError,
        amplitude: this.state.amplitude,
        vph: this.state.vph
      });
      this.timegrapherSim.start();
    }

    const container = document.getElementById('app');
    if (!container) return;

    // Component Part Button Switches
    container.querySelectorAll('[data-part-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const partId = btn.dataset.partId;
        const part = MOVEMENT_PARTS.find(p => p.id === partId);
        if (part) {
          this.state.activePart = part;
          const title = document.getElementById('partTitle');
          const desc = document.getElementById('partDesc');
          if (title) title.textContent = part.name;
          if (desc) desc.textContent = part.description;

          container.querySelectorAll('[data-part-id]').forEach(b => {
            b.style.borderColor = '';
            b.style.background = '';
          });
          btn.style.borderColor = 'var(--color-accent-primary)';
          btn.style.background = 'var(--color-accent-subtle)';
        }
      });
    });

    // Frequency Switchers
    container.querySelectorAll('.freq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vph = Number(btn.dataset.vph);
        this.state.vph = vph;

        this.movementSim?.setFrequency(vph);
        this.timegrapherSim?.setParameters({ vph });

        container.querySelectorAll('.freq-btn').forEach(b => {
          b.style.borderColor = '';
          b.style.background = '';
        });
        btn.style.borderColor = 'var(--color-accent-primary)';
        btn.style.background = 'var(--color-accent-subtle)';

        const badge = document.getElementById('frequencyBadge');
        if (badge) {
          badge.textContent = `${vph.toLocaleString()} vph (${(vph / 7200).toFixed(1)} Hz)`;
        }
      });
    });

    // Rate Slider
    const rateSlider = document.getElementById('rateSlider');
    const rateDisplay = document.getElementById('rateDisplay');
    const sliderRateVal = document.getElementById('sliderRateVal');
    rateSlider?.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      this.state.rate = val;
      if (rateDisplay) rateDisplay.textContent = formatRate(val);
      if (sliderRateVal) sliderRateVal.textContent = formatRate(val);
      this.timegrapherSim?.setParameters({ rate: val });
    });

    // Beat Error Slider
    const beatSlider = document.getElementById('beatSlider');
    const beatDisplay = document.getElementById('beatErrorDisplay');
    const sliderBeatVal = document.getElementById('sliderBeatVal');
    beatSlider?.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      this.state.beatError = val;
      if (beatDisplay) beatDisplay.textContent = formatBeatError(val);
      if (sliderBeatVal) sliderBeatVal.textContent = formatBeatError(val);
      this.timegrapherSim?.setParameters({ beatError: val });
    });
  },

  unmount() {
    this.movementSim?.stop();
    this.timegrapherSim?.stop();
  }
};
