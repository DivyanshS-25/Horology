// HOROLOGY — Watch Comparison Route Module (Panel 07)
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { formatINR, formatRate, formatAmplitude, formatBeatError, escapeHtml } from '../utils/formatters.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';
import { icons } from '../utils/svgIcons.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';

export const comparePage = {
  id: 'compare',
  path: '/compare',
  title: 'Compare Mechanical Timepieces',

  render(ctx) {
    let watchIds = [];
    if (ctx.query.ids) {
      watchIds = ctx.query.ids.split(',').filter(Boolean);
    } else {
      watchIds = store.getCompare();
    }

    // Default to 3 representative watches if empty so visitor immediately sees the comparison experience
    let isDemonstrationDefault = false;
    if (watchIds.length === 0) {
      watchIds = [
        'rolex-submariner-date-126610ln',
        'omega-speedmaster-pro-311-30-42-30-01-001',
        'tudor-black-bay-58-m79030n-0001'
      ];
      isDemonstrationDefault = true;
    }

    const watches = watchIds
      .map(id => repository.getWatchById(id))
      .filter(Boolean)
      .slice(0, 3);

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Compare Timepieces' }
        ])}

        <div class="section-title-wrap">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <span class="overline">Side-by-Side Analysis</span>
              <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Compare Timepieces</h1>
            </div>
            <div style="display: flex; gap: var(--space-3); align-items: center;">
              ${!isDemonstrationDefault ? `
                <button class="btn btn-outline btn-sm" id="clearComparePageBtn">
                  Clear Comparison
                </button>
              ` : `
                <span class="badge badge-demonstration">Showing Default Comparison</span>
              `}
              <a href="#/collection" class="btn btn-primary btn-sm">
                Add from Collection ${icons.arrowRight('', 14)}
              </a>
            </div>
          </div>
          <p style="max-width: 680px; margin-top: var(--space-2);">
            Compare factory specifications, precision timegrapher metrics, condition grades, and accessories across up to three mechanical chronometers.
          </p>
        </div>

        ${watches.length === 0 ? `
          <div style="padding: var(--space-16) 0; text-align: center; background: var(--color-bg-card); border-radius: var(--radius-sm); border: 1px solid var(--color-border-hairline);">
            <h3>No Timepieces Selected for Comparison</h3>
            <p class="mb-6">Browse our vault and click the comparison icon on any watch card.</p>
            <a href="#/collection" class="btn btn-primary">Browse Collection</a>
          </div>
        ` : `
          <!-- Comparison Table (Panel 07) -->
          <div class="comparison-table-wrap">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th style="width: 25%; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted);">
                    Watch &amp; Reference
                  </th>
                  ${watches.map(w => {
                    const svg = generateWatchSvg(w.visualType || 'diver', {
                      dialColor: w.dialTone || '#0B192A',
                      bezelColor: w.bezelTone || '#263A50',
                      brand: w.brand
                    });
                    return `
                      <th style="width: ${75 / watches.length}%; text-align: left;">
                        <div style="position: relative; padding-bottom: var(--space-4);">
                          <button class="card-action-btn remove-compare-btn" data-id="${w.id}" style="position: absolute; top: 0; right: 0;" title="Remove from comparison" aria-label="Remove ${w.model}">
                            ${icons.close('', 16)}
                          </button>
                          <div style="width: 140px; height: 140px; margin-bottom: var(--space-3); background: radial-gradient(circle at 50% 50%, #152B46 0%, #0B192A 80%); border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; padding: var(--space-2);">
                            ${svg}
                          </div>
                          <div class="overline" style="font-size: 10px;">${escapeHtml(w.brand)}</div>
                          <h3 style="font-size: var(--text-lg); margin: 2px 0;">
                            <a href="#/watch/${w.slug}">${escapeHtml(w.model)}</a>
                          </h3>
                          <div class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2);">
                            Ref. ${escapeHtml(w.referenceNumber)} &bull; ${w.year}
                          </div>
                          <div class="mono" style="font-size: var(--text-xl); font-weight: bold; color: var(--color-text-primary); margin-bottom: var(--space-3);">
                            ${formatINR(w.price)}
                          </div>
                          <a href="#/watch/${w.slug}" class="btn btn-outline btn-sm w-full text-center">
                            View Details
                          </a>
                        </div>
                      </th>
                    `;
                  }).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Calibre Movement</th>
                  ${watches.map(w => `<td><strong>${escapeHtml(w.specification.calibre)}</strong></td>`).join('')}
                </tr>
                <tr>
                  <th>Mechanism Type</th>
                  ${watches.map(w => `<td>${escapeHtml(w.specification.movementType)}</td>`).join('')}
                </tr>
                <tr>
                  <th>Power Reserve</th>
                  ${watches.map(w => `<td>${w.specification.powerReserveHours} Hours</td>`).join('')}
                </tr>
                <tr>
                  <th>Case Diameter</th>
                  ${watches.map(w => `<td>${w.specification.caseDiameterMm} mm</td>`).join('')}
                </tr>
                <tr>
                  <th>Case Material</th>
                  ${watches.map(w => `<td>${escapeHtml(w.specification.caseMaterial)}</td>`).join('')}
                </tr>
                <tr>
                  <th>Water Resistance</th>
                  ${watches.map(w => `<td>${w.specification.waterResistanceMeters} m (${Math.round(w.specification.waterResistanceMeters / 10)} bar)</td>`).join('')}
                </tr>
                <tr>
                  <th>Acoustic Daily Rate</th>
                  ${watches.map(w => `<td style="color: var(--color-status-available); font-family: var(--font-mono); font-weight: bold;">${formatRate(w.movementReport.averageRateSecPerDay)}</td>`).join('')}
                </tr>
                <tr>
                  <th>Balance Amplitude</th>
                  ${watches.map(w => `<td style="font-family: var(--font-mono);">${formatAmplitude(w.movementReport.amplitudeDeg)} (${w.movementReport.amplitudeStatus})</td>`).join('')}
                </tr>
                <tr>
                  <th>Beat Error</th>
                  ${watches.map(w => `<td style="font-family: var(--font-mono);">${formatBeatError(w.movementReport.beatErrorMs)}</td>`).join('')}
                </tr>
                <tr>
                  <th>Condition Grade</th>
                  ${watches.map(w => `<td style="color: var(--color-status-available);">${escapeHtml(w.condition.overallGrade)}</td>`).join('')}
                </tr>
                <tr>
                  <th>Finishing / Polish</th>
                  ${watches.map(w => `<td>${escapeHtml(w.condition.polishHistory)}</td>`).join('')}
                </tr>
                <tr>
                  <th>Box &amp; Papers</th>
                  ${watches.map(w => `<td>${w.boxAndPapers.hasWarrantyCard ? 'Full Set &bull; Serialized Card' : 'Watch &amp; Archive Extract'}</td>`).join('')}
                </tr>
                <tr>
                  <th>Inspection Dossier</th>
                  ${watches.map(w => `<td><a href="#/watch/${w.slug}/dossier" class="btn btn-ghost btn-sm" style="color: var(--color-accent-primary); padding: 0;">${icons.fileText('', 14)} View Dossier</a></td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  },

  mount(ctx) {
    const container = document.getElementById('app');
    if (!container) return;

    // Remove single watch from comparison
    container.querySelectorAll('.remove-compare-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        store.removeFromCompare(id);
        showToast('Removed from comparison');
        ctx.router.handleRouting();
      });
    });

    // Clear all
    document.getElementById('clearComparePageBtn')?.addEventListener('click', () => {
      store.clearCompare();
      showToast('Cleared comparison list');
      ctx.router.handleRouting();
    });
  }
};
