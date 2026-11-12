// HOROLOGY — Inspection Dossier Route Module (Panel 06)
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { formatINR, formatRate, formatAmplitude, formatBeatError, formatDate, escapeHtml } from '../utils/formatters.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';
import { icons } from '../utils/svgIcons.js';
import { renderAmplitudeGauge } from '../components/gauge.js';

export const dossierPage = {
  id: 'dossier',
  path: '/watch/:slug/dossier',
  title(ctx) {
    const watch = repository.getWatchBySlug(ctx.params.slug);
    return watch ? `Inspection Dossier — ${watch.brand} ${watch.model}` : 'Inspection Dossier';
  },

  render(ctx) {
    const slug = ctx.params.slug;
    const watch = repository.getWatchBySlug(slug);

    if (!watch) {
      return `
        <div class="container section-spacer text-center">
          <h2>Dossier Not Found</h2>
          <p class="mb-4">The inspection dossier could not be located.</p>
          <a href="#/collection" class="btn btn-primary">Return to Collection</a>
        </div>
      `;
    }

    const svgVisual = generateWatchSvg(watch.visualType || 'diver', {
      dialColor: watch.dialTone || '#0B192A',
      bezelColor: watch.bezelTone || '#263A50',
      brand: watch.brand
    });

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        <div class="no-print">
          ${renderBreadcrumbs([
            { label: 'Home', href: '#/' },
            { label: 'The Collection', href: '#/collection' },
            { label: `${watch.brand} ${watch.model}`, href: `#/watch/${watch.slug}` },
            { label: 'Inspection Dossier' }
          ])}
        </div>

        <!-- Dossier Printable Sheet (Panel 06) -->
        <div class="dossier-sheet" id="dossierPrintSheet">
          <!-- Header -->
          <div class="dossier-header">
            <div>
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
                <span class="brand-wordmark" style="font-size: var(--text-2xl);">HOROLOGY</span>
                <span class="badge badge-verified">${icons.check('', 12)} Forensic Certified Dossier</span>
              </div>
              <h1 style="font-size: var(--text-3xl); margin-bottom: var(--space-1);">
                Inspection Dossier: ${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}
              </h1>
              <div class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">
                Reference: ${escapeHtml(watch.referenceNumber)} &bull; Certificate No: HD-2026-${watch.referenceNumber.replace(/[^A-Za-z0-9]/g, '')}
              </div>
            </div>

            <div class="no-print" style="display: flex; gap: var(--space-3);">
              <button class="btn btn-primary btn-sm" id="printDossierBtn">
                ${icons.print('', 16)} Print Dossier (A4)
              </button>
              <a href="#/watch/${watch.slug}" class="btn btn-outline btn-sm">
                Return to Watch
              </a>
            </div>
          </div>

          <!-- 5-Stage Verification Checklist (Panel 06) -->
          <div style="margin-bottom: var(--space-8);">
            <span class="overline" style="display: block; margin-bottom: var(--space-3);">Forensic Inspection Checklist</span>
            <div class="dossier-checklist">
              <div class="checklist-item">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 20)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">1. Identity Examination</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Case serial number and movement engraving cross-referenced with manufacturer database.</p>
                  </div>
                </div>
                <span class="badge badge-verified">Completed</span>
              </div>

              <div class="checklist-item">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 20)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">2. Physical Examination</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">10x loupe inspection of case chamfers, ceramic bezel, dial micro-printing, and hands.</p>
                  </div>
                </div>
                <span class="badge badge-verified">Completed</span>
              </div>

              <div class="checklist-item">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 20)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">3. Movement Examination</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Escapement lubrication audit, hairspring centering check, and balance staff integrity.</p>
                  </div>
                </div>
                <span class="badge badge-verified">Completed</span>
              </div>

              <div class="checklist-item">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 20)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">4. Documentation Check</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Original warranty card, serial match verification, and retail provenance audit.</p>
                  </div>
                </div>
                <span class="badge badge-verified">Completed</span>
              </div>

              <div class="checklist-item">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 20)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">5. Functional Assessment</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Multi-position Witschi Chronoscope timing, crown action, and water-resistance pressure test.</p>
                  </div>
                </div>
                <span class="badge badge-verified">Completed</span>
              </div>
            </div>
          </div>

          <!-- Movement Chronoscope Test Results -->
          <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-8); margin-bottom: var(--space-8);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-6);">
              <div>
                <span class="overline">Laboratory Calibration Data</span>
                <h3 style="font-size: var(--text-xl);">Witschi Acoustic Performance Metrics</h3>
              </div>
              <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">Test Date: ${formatDate(watch.movementReport.testDate)}</span>
            </div>

            <div class="movement-grid">
              <div>
                ${renderAmplitudeGauge(watch.movementReport.amplitudeDeg)}
                <div class="text-center mt-4">
                  <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-primary);">
                    Avg Amplitude: <strong>${watch.movementReport.amplitudeDeg}&deg;</strong> (${watch.movementReport.amplitudeStatus})
                  </span>
                </div>
              </div>

              <div>
                <table class="pos-rate-table">
                  <thead>
                    <tr>
                      <th>Position Tested</th>
                      <th>Rate (s/day)</th>
                      <th>Amplitude</th>
                      <th>Beat Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${watch.movementReport.positions.map(p => `
                      <tr>
                        <td><strong>${p.position}</strong></td>
                        <td style="color: ${p.rateSec >= 0 ? 'var(--color-status-available)' : 'var(--color-status-demonstration)'};">${formatRate(p.rateSec)}</td>
                        <td>${formatAmplitude(p.amplitudeDeg)}</td>
                        <td>${formatBeatError(p.beatErrorMs)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <div style="margin-top: var(--space-4); font-size: var(--text-xs); color: var(--color-text-muted); display: flex; justify-content: space-between;" class="flex-wrap gap-2">
                  <span>Testing Apparatus: <strong>${watch.movementReport.testingInstrument}</strong></span>
                  <span>Lift Angle: <strong>${watch.movementReport.liftAngleDeg}&deg;</strong></span>
                  <span>Wind State: <strong>${watch.movementReport.timeSinceFullWind}</strong></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Technical Specs & Condition Summary -->
          <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-8); margin-bottom: var(--space-8);">
            <span class="overline" style="display: block; margin-bottom: var(--space-3);">Physical Condition &amp; Factory Specifications</span>
            <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-8);" class="hero-grid">
              <table class="spec-table">
                <tbody>
                  <tr><th>Calibre</th><td>${escapeHtml(watch.specification.calibre)}</td></tr>
                  <tr><th>Movement</th><td>${escapeHtml(watch.specification.movementType)}</td></tr>
                  <tr><th>Case Material</th><td>${escapeHtml(watch.specification.caseMaterial)}</td></tr>
                  <tr><th>Diameter</th><td>${watch.specification.caseDiameterMm} mm</td></tr>
                  <tr><th>Water Resistance</th><td>${watch.specification.waterResistanceMeters} m</td></tr>
                </tbody>
              </table>

              <table class="spec-table">
                <tbody>
                  <tr><th>Condition Grade</th><td style="color: var(--color-status-available); font-weight: bold;">${escapeHtml(watch.condition.overallGrade)}</td></tr>
                  <tr><th>Polish Status</th><td style="color: var(--color-accent-primary);">${escapeHtml(watch.condition.polishHistory)}</td></tr>
                  <tr><th>Box &amp; Papers</th><td>${watch.boxAndPapers.hasWarrantyCard ? 'Original Warranty Card Included' : 'Archival Extract Included'}</td></tr>
                  <tr><th>Origin</th><td>${escapeHtml(watch.provenance.originalCountry)}</td></tr>
                  <tr><th>Estimated Value</th><td class="mono" style="font-weight: bold;">${formatINR(watch.price)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Horologist Sign-off Stamp -->
          <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-6); display: flex; justify-content: space-between; align-items: flex-end;" class="flex-wrap gap-4">
            <div>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted); max-width: 440px;">
                I hereby certify that this mechanical timepiece has passed our complete multi-positional acoustic timegrapher examination, microscopic dial inspection, and serialization registry checks.
              </p>
              <div style="margin-top: var(--space-4);">
                <strong style="color: var(--color-text-primary); font-family: var(--font-serif); font-size: var(--text-base);">Laurent Mercier</strong>
                <div style="font-size: var(--text-xs); color: var(--color-accent-primary);">Lead Master Horologist &bull; HOROLOGY Atelier</div>
              </div>
            </div>

            <div style="border: 2px dashed var(--color-border-default); padding: var(--space-4) var(--space-6); text-align: center; border-radius: var(--radius-xs);">
              <span class="overline" style="font-size: 9px; color: var(--color-status-verified);">Forensic Seal Verified</span>
              <div class="mono" style="font-size: var(--text-xs); color: var(--color-text-primary); margin-top: 2px;">
                SIGNATURE ID: LM-988421
              </div>
              <div style="font-size: 10px; color: var(--color-text-muted); margin-top: 2px;">
                GENEVA ATELIER AUDIT
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    document.getElementById('printDossierBtn')?.addEventListener('click', () => {
      window.print();
    });
  }
};
