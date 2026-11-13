// HOROLOGY — Authenticity Centre Route Module (Panel 10)
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';

export const authenticityPage = {
  id: 'authenticity',
  path: '/authenticity',
  title: 'Authenticity Centre — Forensic Horological Standards',

  render() {
    const macroWatchSvg = generateWatchSvg('chronograph', {
      dialColor: '#07111F',
      bezelColor: '#1E293B',
      brand: 'Rolex'
    });

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Authenticity Centre' }
        ])}

        <!-- Hero Header (Panel 10) -->
        <div class="section-title-wrap">
          <span class="overline">Forensic Verification Protocol</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Authenticity Centre</h1>
          <p style="font-family: var(--font-serif); font-size: var(--text-xl); font-style: italic; color: var(--color-accent-secondary); margin-top: var(--space-2);">
            "Confidence is built on evidence."
          </p>
          <p style="max-width: 720px; margin-top: var(--space-3);">
            In a pre-owned luxury market rife with superfakes and franken-watches, visual assurance is insufficient. Every timepiece inducted into our vault undergoes an uncompromised 5-pillar forensic audit.
          </p>
        </div>

        <!-- 5-Step Process Cards (Panel 10) -->
        <div style="margin: var(--space-10) 0;">
          <!-- Step 01 -->
          <div class="step-narrative-card">
            <div style="text-align: center;">
              <span class="mono" style="font-size: var(--text-3xl); font-weight: bold; color: var(--color-accent-primary);">01</span>
              <div class="overline" style="font-size: 10px;">Pillar One</div>
            </div>
            <div>
              <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-2);">Identity &amp; Serial Registry Audit</h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed);">
                Micro-inspection of alphanumeric font kerning, engraving depth between lugs, and rehaut laser serialization. We cross-reference every serial against lost, stolen, and manufacturer blacklists.
              </p>
            </div>
            <div style="background: var(--color-bg-base); padding: var(--space-4); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline);">
              <span style="font-size: var(--text-xs); color: var(--color-status-verified); font-weight: bold; display: flex; align-items: center; gap: 6px;">
                ${icons.check('', 14)} Verification Criterion
              </span>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                Factory serif curvature on laser-etched rehauts; zero tool slippage; matching font geometry.
              </p>
            </div>
          </div>

          <!-- Step 02 -->
          <div class="step-narrative-card">
            <div style="text-align: center;">
              <span class="mono" style="font-size: var(--text-3xl); font-weight: bold; color: var(--color-accent-primary);">02</span>
              <div class="overline" style="font-size: 10px;">Pillar Two</div>
            </div>
            <div>
              <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-2);">Physical &amp; Metallurgical Examination</h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed);">
                10x and 40x stereoscopic loupe inspection of dial pad-printing, hand beveling (anglage), luminous compound luminescence decay, and original factory case chamfers.
              </p>
            </div>
            <div style="background: var(--color-bg-base); padding: var(--space-4); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline);">
              <span style="font-size: var(--text-xs); color: var(--color-status-verified); font-weight: bold; display: flex; align-items: center; gap: 6px;">
                ${icons.check('', 14)} Verification Criterion
              </span>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                Clean edge ink meniscus without bleeding under 40x; authentic Super-LumiNova excitation wavelength.
              </p>
            </div>
          </div>

          <!-- Step 03 -->
          <div class="step-narrative-card">
            <div style="text-align: center;">
              <span class="mono" style="font-size: var(--text-3xl); font-weight: bold; color: var(--color-accent-primary);">03</span>
              <div class="overline" style="font-size: 10px;">Pillar Three</div>
            </div>
            <div>
              <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-2);">Movement Architecture &amp; Calibre Audit</h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed);">
                Caseback removal inside our laminar flow cleanroom. Full audit of balance wheel bridge screws, free-sprung regulating weights, balance hairspring breguet overcoil, and synthetic jewel seating.
              </p>
            </div>
            <div style="background: var(--color-bg-base); padding: var(--space-4); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline);">
              <span style="font-size: var(--text-xs); color: var(--color-status-verified); font-weight: bold; display: flex; align-items: center; gap: 6px;">
                ${icons.check('', 14)} Verification Criterion
              </span>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                Authentic column-wheel geometry; absence of clone clone-plates; genuine Kif / Incabloc shock absorbers.
              </p>
            </div>
          </div>

          <!-- Step 04 -->
          <div class="step-narrative-card">
            <div style="text-align: center;">
              <span class="mono" style="font-size: var(--text-3xl); font-weight: bold; color: var(--color-accent-primary);">04</span>
              <div class="overline" style="font-size: 10px;">Pillar Four</div>
            </div>
            <div>
              <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-2);">Documentation &amp; Provenance Forensic Check</h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed);">
                UV light examination of warranty card watermarks, embossed country stamps, authorized dealer perforation, and matching serial typography.
              </p>
            </div>
            <div style="background: var(--color-bg-base); padding: var(--space-4); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline);">
              <span style="font-size: var(--text-xs); color: var(--color-status-verified); font-weight: bold; display: flex; align-items: center; gap: 6px;">
                ${icons.check('', 14)} Verification Criterion
              </span>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                UV fluorescence under 365nm; verified dealer registration records.
              </p>
            </div>
          </div>

          <!-- Step 05 -->
          <div class="step-narrative-card">
            <div style="text-align: center;">
              <span class="mono" style="font-size: var(--text-3xl); font-weight: bold; color: var(--color-accent-primary);">05</span>
              <div class="overline" style="font-size: 10px;">Pillar Five</div>
            </div>
            <div>
              <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-2);">Witschi Acoustic Performance &amp; Sealing</h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed);">
                Multi-positional acoustic testing across Dial Up, Dial Down, Crown Up, and Crown Down. Vacuum pressure chamber testing to full factory depth rating.
              </p>
            </div>
            <div style="background: var(--color-bg-base); padding: var(--space-4); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline);">
              <span style="font-size: var(--text-xs); color: var(--color-status-verified); font-weight: bold; display: flex; align-items: center; gap: 6px;">
                ${icons.check('', 14)} Verification Criterion
              </span>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                Amplitude strictly between 260°–315°; beat error &le; 0.4 ms; certified waterproof seal.
              </p>
            </div>
          </div>
        </div>

        <!-- Interactive Loupe Inspection Simulator (Panel 10) -->
        <div class="watch-card" style="padding: var(--space-8); margin: var(--space-12) 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-6);">
            <div>
              <span class="overline">Interactive Tool</span>
              <h2 style="font-size: var(--text-2xl); margin-top: var(--space-1);">Forensic Loupe Inspector</h2>
              <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">
                Hover and drag across the dial to activate simulated 10x microscopic inspection.
              </p>
            </div>
            <div style="display: flex; gap: var(--space-2);">
              <button class="btn btn-outline btn-sm active" id="loupeDialBtn">Dial Printing</button>
              <button class="btn btn-outline btn-sm" id="loupeBezelBtn">Bezel Numerals</button>
              <button class="btn btn-outline btn-sm" id="loupeCrownBtn">Coronet Laser</button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-8); align-items: center;" class="hero-grid">
            <div style="position: relative; aspect-ratio: 1/1; max-width: 440px; margin: 0 auto; background: radial-gradient(circle at 50% 50%, #152B46 0%, #0B192A 80%); border-radius: var(--radius-sm); border: 1px solid var(--color-border-hairline); display: flex; align-items: center; justify-content: center; overflow: hidden; padding: var(--space-4);" id="loupeStage">
              <div style="width: 85%; height: 85%;" id="loupeWatchSvg">
                ${macroWatchSvg}
              </div>
              <div id="loupeCircle" style="position: absolute; width: 140px; height: 140px; border-radius: 50%; border: 2px solid var(--color-accent-primary); box-shadow: 0 0 24px rgba(56, 189, 248, 0.4), inset 0 0 20px rgba(56, 189, 248, 0.2); pointer-events: none; transform: translate(-50%, -50%); display: none; background: rgba(56, 189, 248, 0.08); backdrop-filter: contrast(1.2) brightness(1.1);"></div>
            </div>

            <div>
              <span class="overline" style="font-size: 10px;">Microscopic Finding</span>
              <h3 style="font-size: var(--text-xl); margin: var(--space-2) 0;" id="loupeFindingTitle">Pad-Printed Typographic Serifs</h3>
              <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed); margin-bottom: var(--space-4);" id="loupeFindingText">
                Authentic Swiss dials utilize heavy typographic plates with deliberate paint density. Notice the crisp razor boundary where the white ink meets the matte lacquer dial without micro-splatter or fuzzy edge artifacts.
              </p>
              <div style="padding: var(--space-4); background: var(--color-bg-surface); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline);">
                <span class="mono" style="font-size: var(--text-xs); color: var(--color-status-verified); font-weight: bold;">
                  HOROLOGY ATELIER PASS: VERIFIED
                </span>
                <p style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                  All 24 timepieces currently available in the collection have received individual photographic dossiers confirming this standard.
                </p>
              </div>
              <div style="margin-top: var(--space-6);">
                <a href="#/collection" class="btn btn-primary">Browse Verified Timepieces</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    const stage = document.getElementById('loupeStage');
    const circle = document.getElementById('loupeCircle');

    stage?.addEventListener('mousemove', (e) => {
      if (!circle) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      circle.style.display = 'block';
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
    });

    stage?.addEventListener('mouseleave', () => {
      if (circle) circle.style.display = 'none';
    });

    // Preset buttons
    const findingTitle = document.getElementById('loupeFindingTitle');
    const findingText = document.getElementById('loupeFindingText');

    document.getElementById('loupeDialBtn')?.addEventListener('click', () => {
      if (findingTitle) findingTitle.textContent = 'Pad-Printed Typographic Serifs';
      if (findingText) findingText.textContent = 'Authentic Swiss dials utilize heavy typographic plates with deliberate paint density. Notice the crisp razor boundary where the white ink meets the matte lacquer dial without micro-splatter.';
    });

    document.getElementById('loupeBezelBtn')?.addEventListener('click', () => {
      if (findingTitle) findingTitle.textContent = 'Liquidmetal & Ceramic Inlay Sharpness';
      if (findingText) findingText.textContent = 'Modern ceramic bezels employ PVD platinum or Liquidmetal deposition into laser-ablated cavities. Edge transitions under 20x magnification exhibit microscopic geometric perfection.';
    });

    document.getElementById('loupeCrownBtn')?.addEventListener('click', () => {
      if (findingTitle) findingTitle.textContent = 'Laser-Etched Coronet at 6 O\'clock';
      if (findingText) findingText.textContent = 'Micro-etched into the sapphire crystal at varying depths to avoid structural weakening. Invisible to the naked eye; reveals pristine dot matrix dots under angled tangential illumination.';
    });
  }
};
