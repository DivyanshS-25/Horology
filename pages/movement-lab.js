/**
 * HOROLOGY — Page Template: Movement Lab
 * Route: #/movement-lab
 * Mechanical Architecture, Escapement Physics & Chronometric Tolerances
 * Obsidian Luxury Edition (Phase 08)
 */

import { createBreadcrumb, ICONS } from '../js/components.js';
import { MovementSimulator, MOVEMENT_PARTS } from '../js/features/movementSim.js';
import { TimegrapherScreen } from '../js/features/timegrapher.js';
import { playMechanicalClick, playWindingTick } from '../js/audio.js';
import { MechanicalChronometerWidget, DiverBezelWidget, CrownWindingWidget } from '../js/features/motion.js';

export const title = 'Movement Lab';

let currentSimulator = null;
let currentTimegrapher = null;
let currentChronometer = null;
let currentBezel = null;
let currentCrownWinding = null;
let parallaxCleanup = null;

export async function render(ctx) {
  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Movement Lab', href: '#/movement-lab' }
  ];

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Movement Lab Header -->
      <div class="max-w-narrow text-center mb-12">
        <span class="section-kicker">Horological Science &amp; Telemetry</span>
        <h1 class="heading-1 mb-3">The Movement Lab</h1>
        <p class="lead-text">
          Inside every certified mechanical wristwatch beats an intricate microscopic engine operating at 28,800 vibrations per hour (4&nbsp;Hz). Explore the kinetic physics of timekeeping precision.
        </p>
      </div>

      <!-- Interactive Balance Wheel & Escapement Simulation -->
      <div class="p-8 bg-surface border mb-12" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); position: relative; overflow: hidden; width: 100%; max-width: 100%; box-sizing: border-box;">
        <div class="grid-12 gap-8 items-center" style="width: 100%; max-width: 100%; min-width: 0;">
          <div class="col-span-6" style="min-width: 0; max-width: 100%;">
            <span class="overline" style="color: var(--accent-primary);">Harmonic Oscillation</span>
            <h2 class="heading-2 mb-3">Free-Sprung Balance Wheel</h2>
            <p class="body-muted text-sm leading-relaxed mb-4">
              The balance wheel and hairspring form the harmonic oscillator of a mechanical calibre. Regulated by inertia micro-screws or variable weights on the rim, it oscillates through an angle (amplitude) of 270&deg;&ndash;315&deg; with exact isochronism.
            </p>
            
            <div class="flex items-center gap-3 mb-6 flex-wrap">
              <button class="btn btn-outline btn-sm" id="btnSimNormal" data-speed="normal" style="font-size: 11px;">1x Realtime (4 Hz)</button>
              <button class="btn btn-outline btn-sm" id="btnSimSlow" data-speed="slow" style="font-size: 11px;">0.25x Slow Motion</button>
              <button class="btn btn-outline btn-sm" id="btnSimPause" data-speed="pause" style="font-size: 11px;">Freeze Frame</button>
            </div>

            <div class="p-4 bg-secondary border" style="border-color: var(--border-hairline); border-radius: var(--radius-xs); width: 100%; max-width: 100%; box-sizing: border-box;">
              <div class="flex justify-between items-center mb-2">
                <span class="font-mono text-xs text-muted">Oscillation Frequency</span>
                <span class="font-mono text-xs font-bold" style="color: var(--accent-primary);">28,800 vph / 4.0 Hz</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-mono text-xs text-muted">Typical Daily Deviations</span>
                <span class="font-mono text-xs font-bold text-primary">&plusmn;2 seconds / 24 hours</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-mono text-xs text-muted">Microscopic Impulses / Year</span>
                <span class="font-mono text-xs font-bold text-primary">252,288,000 beats</span>
              </div>
            </div>
          </div>

          <div class="col-span-6 flex flex-col items-center justify-center gap-6" style="min-width: 0; max-width: 100%;">
            <div style="position: relative; width: 100%; max-width: 340px; aspect-ratio: 1/1; background: radial-gradient(circle at 50% 50%, #152435 0%, #080D13 85%); border: 1px solid var(--border-hairline); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 30px rgba(0,0,0,0.8); box-sizing: border-box; overflow: hidden;">
              <canvas id="balanceCanvas" width="340" height="340" style="width: 100%; height: 100%; max-width: 100%; display: block;"></canvas>
              <div style="position: absolute; bottom: 12px; left: 16px; font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); letter-spacing: 1px;">
                CAL. 3235 OSCILLATOR
              </div>
              <div id="simSpeedBadge" style="position: absolute; top: 12px; right: 16px; font-family: var(--font-mono); font-size: 10px; color: var(--accent-primary); letter-spacing: 1px; padding: 2px 8px; border: 1px solid var(--border-hairline); border-radius: var(--radius-full); background: rgba(5,6,8,0.7);">
                1.0x LIVE
              </div>
            </div>

            <!-- Tactile 3D Fluted Crown & Mainspring Winding Assembly -->
            <div id="crownWindingStageContainer" style="width: 100%; max-width: 340px;"></div>
          </div>
        </div>
      </div>

      <!-- Six Pillars of Mechanical Calibres -->
      <div class="p-8 bg-surface border mb-12" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;">
        <div class="section-header text-center mb-8">
          <span class="section-kicker">Mechanical Architecture</span>
          <h2 class="heading-2">Six Pillars of Mechanical Calibres</h2>
        </div>

        <div class="feature-grid" style="width: 100%; max-width: 100%; box-sizing: border-box;">
          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs); min-width: 0; box-sizing: border-box;">
            <div class="mb-3 font-mono text-xs font-bold" style="color: var(--accent-primary);">01 / POWER SOURCE</div>
            <h4 class="font-serif text-xl text-primary mb-2">Mainspring &amp; Barrel</h4>
            <p class="body-muted text-sm leading-relaxed">
              A tightly coiled high-tensile alloy ribbon housed inside a toothed barrel. Delivers continuous rotational torque over a 48 to 72-hour power reserve.
            </p>
          </div>

          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3 font-mono text-xs font-bold" style="color: var(--accent-primary);">02 / TRANSMISSION</div>
            <h4 class="font-serif text-xl text-primary mb-2">The Going Gear Train</h4>
            <p class="body-muted text-sm leading-relaxed">
              Series of four micro-machined toothed wheels (centre, third, fourth) that multiply barrel rotation while driving the hour, minute, and second pinions.
            </p>
          </div>

          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3 font-mono text-xs font-bold" style="color: var(--accent-primary);">03 / REGULATION</div>
            <h4 class="font-serif text-xl text-primary mb-2">Swiss Lever Escapement</h4>
            <p class="body-muted text-sm leading-relaxed">
              Comprising escape wheel and synthetic ruby pallet fork. Converts continuous rotational gear energy into discrete back-and-forth micro-impulses.
            </p>
          </div>

          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3 font-mono text-xs font-bold" style="color: var(--accent-primary);">04 / THE HEARTBEAT</div>
            <h4 class="font-serif text-xl text-primary mb-2">Balance Wheel &amp; Hairspring</h4>
            <p class="body-muted text-sm leading-relaxed">
              The harmonic oscillator. An alloy wheel paired with a hairspring thinner than human hair (Nivarox or Parachrom), oscillating exactly 4 times per second (28,800 vph).
            </p>
          </div>

          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3 font-mono text-xs font-bold" style="color: var(--accent-primary);">05 / KINETIC WINDING</div>
            <h4 class="font-serif text-xl text-primary mb-2">Oscillating Rotor</h4>
            <p class="body-muted text-sm leading-relaxed">
              A weighted tungsten or platinum semicircular mass that rotates freely with natural wrist motion, winding the mainspring continuously via reverser wheels.
            </p>
          </div>

          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3 font-mono text-xs font-bold" style="color: var(--accent-primary);">06 / JEWELLED BEARINGS</div>
            <h4 class="font-serif text-xl text-primary mb-2">Synthetic Corundum Rubies</h4>
            <p class="body-muted text-sm leading-relaxed">
              Precision corundum stones acting as frictionless low-wear pivot seats for rapidly turning arbor pivots, sealed with specialized Swiss synthetic epilame oils.
            </p>
          </div>
        </div>
      </div>

      <!-- Live Witschi Timegrapher Simulator -->
      <div class="grid-12 gap-8 items-center mb-12" style="width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box;">
        <div class="col-span-6" style="min-width: 0; max-width: 100%; box-sizing: border-box;">
          <span class="section-kicker">Diagnostic Telemetry</span>
          <h2 class="heading-2 mb-3">Live Witschi Timegrapher Simulator</h2>
          <p class="body-muted mb-4 text-sm leading-relaxed">
            Electronic timing machines listen to the acoustic impact of pallet jewels striking escape wheel teeth to compute three primary vitals. Select a testing position below to observe live trace geometry:
          </p>

          <div class="flex items-center gap-2 mb-6 flex-wrap" id="positionButtonGroup">
            <button class="btn btn-outline btn-sm timegrapher-pos-btn active" data-pos="CH" data-rate="2" data-amp="288" data-err="0.1" style="font-size: 11px;">Dial Up (+2 s/d)</button>
            <button class="btn btn-outline btn-sm timegrapher-pos-btn" data-pos="CB" data-rate="3" data-amp="284" data-err="0.1" style="font-size: 11px;">Dial Down (+3 s/d)</button>
            <button class="btn btn-outline btn-sm timegrapher-pos-btn" data-pos="9H" data-rate="1" data-amp="265" data-err="0.2" style="font-size: 11px;">Crown Down (+1 s/d)</button>
            <button class="btn btn-outline btn-sm timegrapher-pos-btn" data-pos="6H" data-rate="2" data-amp="262" data-err="0.2" style="font-size: 11px;">Crown Left (+2 s/d)</button>
          </div>

          <div class="spec-list" style="width: 100%; max-width: 100%;">
            <div class="spec-row py-3">
              <div>
                <strong class="text-primary block">Daily Rate (s/d)</strong>
                <span class="text-xs text-muted">Daily loss or gain. COSC chronometer tolerance is &minus;4 to +6 s/day. HOROLOGY standard is &plusmn;3 s/day.</span>
              </div>
            </div>
            <div class="spec-row py-3">
              <div>
                <strong class="text-primary block">Amplitude (&deg;)</strong>
                <span class="text-xs text-muted">Angle of balance rotation. 270&deg; to 315&deg; indicates fresh lubrication and healthy power delivery.</span>
              </div>
            </div>
            <div class="spec-row py-3">
              <div>
                <strong class="text-primary block">Beat Error (ms)</strong>
                <span class="text-xs text-muted">Symmetry of impulse pin contact. Below 0.5 ms represents true escapement equilibrium.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-6 p-6 bg-surface border" style="border-color: var(--border-strong); border-radius: var(--radius-sm); position: relative; min-width: 0; max-width: 100%; box-sizing: border-box; overflow: hidden;">
          <div class="flex items-center justify-between mb-4">
            <span class="overline" style="color: var(--accent-primary);">Witschi Chronoscope S1</span>
            <span class="badge badge-verified" id="telemetryStatusBadge">Optimal State</span>
          </div>

          <!-- Timegrapher Screen Canvas -->
          <div style="background: #04080D; border: 1px solid var(--border-hairline); border-radius: var(--radius-xs); padding: 8px; margin-bottom: 16px; width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;">
            <canvas id="timegrapherCanvas" width="460" height="180" style="width: 100%; max-width: 100%; height: 180px; display: block;"></canvas>
          </div>

          <div class="grid-3 gap-3 text-center py-2" style="width: 100%; max-width: 100%; box-sizing: border-box;">
            <div class="p-3 bg-secondary border" style="border-color: var(--border-hairline); border-radius: var(--radius-xs);">
              <span class="text-xs text-muted font-mono block mb-1">RATE</span>
              <span class="font-mono text-lg font-bold" id="displayRate" style="color: var(--accent-primary);">+2 s/d</span>
            </div>
            <div class="p-3 bg-secondary border" style="border-color: var(--border-hairline); border-radius: var(--radius-xs);">
              <span class="text-xs text-muted font-mono block mb-1">AMPLITUDE</span>
              <span class="font-mono text-lg font-bold text-primary" id="displayAmp">288&deg;</span>
            </div>
            <div class="p-3 bg-secondary border" style="border-color: var(--border-hairline); border-radius: var(--radius-xs);">
              <span class="text-xs text-muted font-mono block mb-1">BEAT ERROR</span>
              <span class="font-mono text-lg font-bold text-primary" id="displayErr">0.1 ms</span>
            </div>
          </div>

          <div class="pt-4 mt-4 border-top flex items-center justify-between" style="border-color: var(--border-subtle);">
            <span class="text-xs text-muted font-mono">Position: <span id="displayPosName" style="color: var(--text-primary);">Dial Up (CH)</span></span>
            <a href="#/collection" class="btn btn-outline btn-sm">Browse Certified Chronometers</a>
          </div>
        </div>
      </div>

      <!-- Interactive Micro-Instruments: Live Chronometer & 120-Click Diver Bezel -->
      <div class="p-8 bg-surface border mb-12" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;">
        <div class="section-header text-center mb-8">
          <span class="section-kicker">Tactile Micro-Mechanics</span>
          <h2 class="heading-2">Interactive Horological Test Benches</h2>
          <p class="body-muted text-sm max-w-prose mx-auto">
            Interact with micro-mechanical watch assemblies in real-time. Test escapement frequency sweeps with synthesized acoustics and experience 120-click unidirectional ratcheting bezel detents.
          </p>
        </div>

        <div class="grid-12 gap-8 items-start" style="width: 100%; max-width: 100%; box-sizing: border-box;">
          <!-- Instrument 01: Live 28,800 vph Chronometer Sweep -->
          <div class="col-span-6 flex flex-col items-center" style="min-width: 0; max-width: 100%;">
            <div class="text-center mb-4">
              <span class="font-mono text-xs font-bold" style="color: var(--accent-primary);">INSTRUMENT 01 / ESCAPEMENT DYNAMICS</span>
              <h3 class="font-serif text-xl text-primary mt-1">Live Escapement &amp; Seconds Sweep</h3>
              <p class="body-muted text-xs mt-1">
                Driven at 28,800 vph (8 ticks per second) with synchronized acoustic jewel impulses.
              </p>
            </div>
            <div id="liveChronometerStage" style="width: 100%; max-width: 320px;"></div>
          </div>

          <!-- Instrument 02: 120-Click Diver Bezel Ratchet -->
          <div class="col-span-6 flex flex-col items-center" style="min-width: 0; max-width: 100%;">
            <div class="text-center mb-4">
              <span class="font-mono text-xs font-bold" style="color: var(--accent-primary);">INSTRUMENT 02 / SUBMERSIBLE TELEMETRY</span>
              <h3 class="font-serif text-xl text-primary mt-1">120-Click Unidirectional Diver Bezel</h3>
              <p class="body-muted text-xs mt-1">
                Rotatable dive bezel with 3&deg; detents, elapsed time calculation, and tactile ratchet audio.
              </p>
            </div>
            <div id="diverBezelStage" style="width: 100%; max-width: 320px;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mount(ctx) {
  // 1. Balance Simulator Initialisation
  const balanceCanvas = document.getElementById('balanceCanvas');
  if (balanceCanvas) {
    currentSimulator = new MovementSimulator(balanceCanvas, { vph: 28800, amplitude: 288 });
    currentSimulator.start();

    const speedBadge = document.getElementById('simSpeedBadge');
    const btnNormal = document.getElementById('btnSimNormal');
    const btnSlow = document.getElementById('btnSimSlow');
    const btnPause = document.getElementById('btnSimPause');

    const setActiveBtn = (activeBtn) => {
      [btnNormal, btnSlow, btnPause].forEach(b => {
        if (b) {
          b.style.borderColor = (b === activeBtn) ? 'var(--accent-primary)' : 'var(--border-hairline)';
          b.style.color = (b === activeBtn) ? 'var(--accent-primary)' : 'var(--text-secondary)';
        }
      });
    };

    if (btnNormal) {
      btnNormal.addEventListener('click', () => {
        playMechanicalClick();
        if (currentSimulator) {
          currentSimulator.start();
          currentSimulator.vph = 28800;
        }
        if (speedBadge) speedBadge.textContent = '1.0x LIVE';
        setActiveBtn(btnNormal);
      });
    }

    if (btnSlow) {
      btnSlow.addEventListener('click', () => {
        playMechanicalClick();
        if (currentSimulator) {
          currentSimulator.start();
          currentSimulator.vph = 7200; // 0.25x
        }
        if (speedBadge) speedBadge.textContent = '0.25x SLOW';
        setActiveBtn(btnSlow);
      });
    }

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        playMechanicalClick();
        if (currentSimulator) {
          currentSimulator.stop();
        }
        if (speedBadge) speedBadge.textContent = 'FROZEN';
        setActiveBtn(btnPause);
      });
    }
  }

  // 2. Witschi Timegrapher Initialisation
  const tgCanvas = document.getElementById('timegrapherCanvas');
  if (tgCanvas) {
    currentTimegrapher = new TimegrapherScreen(tgCanvas, {
      rate: 2,
      amplitude: 288,
      beatError: 0.1,
      vph: 28800
    });
    currentTimegrapher.start();

    const posBtns = document.querySelectorAll('.timegrapher-pos-btn');
    const displayRate = document.getElementById('displayRate');
    const displayAmp = document.getElementById('displayAmp');
    const displayErr = document.getElementById('displayErr');
    const displayPosName = document.getElementById('displayPosName');

    posBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playMechanicalClick();
        posBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'var(--border-hairline)';
          b.style.color = 'var(--text-secondary)';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-primary)';
        btn.style.color = 'var(--accent-primary)';

        const rate = parseFloat(btn.dataset.rate || '2');
        const amp = parseInt(btn.dataset.amp || '288', 10);
        const err = parseFloat(btn.dataset.err || '0.1');
        const label = btn.textContent.trim();

        if (displayRate) displayRate.textContent = `${rate > 0 ? '+' : ''}${rate} s/d`;
        if (displayAmp) displayAmp.textContent = `${amp}\u00B0`;
        if (displayErr) displayErr.textContent = `${err} ms`;
        if (displayPosName) displayPosName.textContent = label;

        if (currentTimegrapher) {
          currentTimegrapher.setParameters({ rate, amplitude: amp, beatError: err });
          currentTimegrapher.start();
        }
      });
    });
  }

  // 3. Live 28,800 vph Chronometer Sweep & Escapement Simulation
  const chronoStage = document.getElementById('liveChronometerStage');
  if (chronoStage) {
    currentChronometer = new MechanicalChronometerWidget(chronoStage, { frequency: 28800 });
  }

  // 4. 120-Click Unidirectional Diver Bezel Widget
  const bezelStage = document.getElementById('diverBezelStage');
  if (bezelStage) {
    currentBezel = new DiverBezelWidget(bezelStage);
  }

  // 5. 3D Fluted Crown-Winding & Mainspring Autonomy Widget
  const crownStage = document.getElementById('crownWindingStageContainer');
  if (crownStage) {
    currentCrownWinding = new CrownWindingWidget(crownStage, {
      initialHours: 48,
      onAmplitudeChanged: (amplitude, hours) => {
        if (currentSimulator) {
          currentSimulator.setAmplitude(amplitude);
          if (amplitude === 0) {
            currentSimulator.stop();
          } else if (!currentSimulator.isRunning) {
            currentSimulator.start();
          }
        }
      }
    });
  }
}

export function unmount() {
  if (currentSimulator) {
    currentSimulator.stop();
    currentSimulator = null;
  }
  if (currentTimegrapher) {
    currentTimegrapher.stop();
    currentTimegrapher = null;
  }
  if (currentChronometer) {
    currentChronometer.destroy();
    currentChronometer = null;
  }
  if (currentBezel) {
    currentBezel = null;
  }
  if (currentCrownWinding) {
    currentCrownWinding = null;
  }
}
