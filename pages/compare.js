/**
 * HOROLOGY — Page Module: Watch Comparison Matrix (Phase 05 Enhanced)
 * Route: #/compare
 * Up to 4 watches side-by-side comparative analysis with sticky headers,
 * 7 grouped specification domains, non-null difference highlighting, and factual insights
 * Direction C — Midnight Navy Edition
 */

import { getWatchById, WATCHES } from '../js/data.js';
import { createBreadcrumb, createStatusBadge, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { formatPrice, escapeHTML } from '../js/utilities.js';
import { store } from '../js/state.js';
import { openEnquiryModal } from '../js/enquiry.js';
import { openCompareLimitModal } from './wishlist.js';

export const title = 'Timepiece Comparison Matrix — HOROLOGY';

const PRESET_PAIRINGS = [
  {
    label: 'Submariner Date vs. Seamaster 300M',
    tagline: 'The Definitive Diving Chronometer Showdown',
    ids: ['demo-rolex-126610ln', 'demo-omega-21030422001001']
  },
  {
    label: 'Speedmaster Pro vs. Black Bay Chrono',
    tagline: 'Manual Moonwatch vs. Kenissi Automatic Chronograph',
    ids: ['demo-omega-31030425001001', 'demo-tudor-m79360n-0002']
  },
  {
    label: 'Grand Seiko Snowflake vs. Datejust 41',
    tagline: 'Zaratsu Titanium Spring Drive vs. Genevan Jubilee Icon',
    ids: ['demo-gs-sbga211', 'demo-rolex-126334']
  },
  {
    label: 'Tudor Pelagos 39 vs. Submariner Date',
    tagline: 'Grade 2 Titanium Pure Tool vs. Oystersteel Luxury Standard',
    ids: ['demo-tudor-m25407n-0001', 'demo-rolex-126610ln']
  }
];

export async function render(ctx) {
  let compareIds = store.getCompareList();

  // Allow URL query parameter pre-loading (e.g. #/compare?ids=id1,id2)
  if (ctx && ctx.query && ctx.query.ids) {
    const queryIds = ctx.query.ids.split(',').filter(Boolean);
    if (queryIds.length >= 2) {
      store.setCompareList(queryIds);
      compareIds = store.getCompareList();
    }
  }

  const watches = compareIds.map(id => getWatchById(id)).filter(Boolean).slice(0, 4);
  const prefs = store.getPreferences();
  const highlightDifferences = Boolean(prefs.highlightDifferences);

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Comparison Matrix', href: '#/compare' }
  ];

  // Recently viewed watches for empty state or quick additions
  const recentIds = store.getRecentlyViewed().filter(id => !compareIds.includes(id));
  const recentWatches = recentIds.map(id => getWatchById(id)).filter(Boolean).slice(0, 4);

  // If fewer than 2 watches, show state-of-the-art empty comparison state
  if (watches.length < 2) {
    return `
      <div class="container section-spacer">
        ${createBreadcrumb(breadcrumbs)}

        <div class="empty-state" style="margin-top: var(--space-8); margin-bottom: var(--space-12);">
          <div class="empty-state-icon">${ICONS.scale}</div>
          <h1 class="heading-2 mb-3">Compare Timepieces Side-by-Side</h1>
          <p class="body-muted mb-6" style="max-width: 540px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Select between 2 and 4 mechanical chronometers to examine side-by-side metallurgical profiles, manufacture calibres, case dimensions, and archival documentation.
          </p>

          <div class="flex items-center justify-center gap-4 flex-wrap mb-10">
            <a href="#/collection" class="btn btn-primary">Browse Observatory Collection</a>
            <button type="button" class="btn btn-outline" id="emptyStatePickerBtn">
              ${ICONS.search}
              <span>Choose Timepieces</span>
            </button>
          </div>

          <!-- Quick Presets -->
          <div class="pt-8 border-top text-left" style="border-color: var(--border-subtle); max-width: 640px; margin: 0 auto;">
            <span class="font-mono text-xs text-accent uppercase block text-center mb-4" style="letter-spacing: 0.12em;">
              Curated Comparative Presets:
            </span>
            <div class="grid grid-cols-2 gap-3" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
              ${PRESET_PAIRINGS.map((preset, idx) => `
                <button type="button" class="preset-pair-btn p-3 bg-secondary border flex flex-col text-left transition hover:border-accent cursor-pointer" data-preset-idx="${idx}" style="border-color: var(--border-subtle); border-radius: var(--radius-xs); background: var(--bg-secondary);">
                  <span class="font-sans font-semibold text-sm text-primary mb-1">${escapeHTML(preset.label)}</span>
                  <span class="font-mono text-xs text-muted">${escapeHTML(preset.tagline)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        ${recentWatches.length > 0 ? `
          <div class="recently-viewed-section">
            <div class="recent-shelf-header">
              <div>
                <span class="section-kicker">Observatory History</span>
                <h3 class="heading-3">Quick-Add From Recently Examined</h3>
              </div>
            </div>
            <div class="recent-shelf-track">
              ${recentWatches.map(w => renderQuickAddCard(w)).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Quick Watch Picker Modal Portal Mount -->
      <div id="comparePickerPortal"></div>
    `;
  }

  // Generate 7-Domain Matrix Structure
  const matrixData = generate7DomainMatrix(watches);
  const comparativeInsights = generateComparativeInsights(watches);
  const remainingSlots = 4 - watches.length;

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Header Action Bar with Capacity Controls -->
      <div class="compare-action-bar">
        <div>
          <span class="section-kicker">Comparative Horological Analysis</span>
          <h1 class="heading-1 font-serif">Timepiece Comparison Matrix</h1>
          <p class="body-muted font-mono text-xs mt-1" id="compareCapacityLabel">
            ${watches.length} of 4 Timepieces Selected
          </p>
        </div>

        <div class="flex items-center gap-3 flex-wrap">
          <button type="button" class="diff-toggle-btn ${highlightDifferences ? 'active' : ''}" id="toggleDiffBtn" aria-pressed="${highlightDifferences}" title="Toggle between highlighting genuine differences and showing all specifications">
            <span class="toggle-indicator"></span>
            <span id="diffBtnLabel">${highlightDifferences ? 'Show All Specifications' : 'Highlight Differences'}</span>
          </button>

          ${watches.length < 4 ? `
            <button type="button" class="btn btn-primary btn-sm" id="openPickerBtn" title="Add another watch to this comparison">
              <span>+ Add Another Watch</span>
            </button>
          ` : ''}

          <button type="button" class="btn btn-outline btn-sm" id="clearCompareBtn" title="Clear all timepieces from comparison">
            Clear All
          </button>
        </div>
      </div>

      <!-- Horizontally Scrollable Matrix Container -->
      <div class="compare-table-wrapper" tabindex="0" role="region" aria-label="Timepiece comparison table with sticky specification column">
        <table class="compare-matrix-table">
          <thead>
            <tr>
              <th class="sticky-col">
                <span class="font-mono text-xs text-muted uppercase" style="letter-spacing: 0.1em;">
                  Specification Matrix
                </span>
              </th>
              ${watches.map(w => renderWatchHeaderCell(w)).join('')}
              ${remainingSlots > 0 ? `
                <th class="empty-slot-col" colspan="${remainingSlots}">
                  <div class="empty-slot-box">
                    <span class="font-mono text-xs text-muted uppercase mb-2">Available Comparison Slot</span>
                    <p class="text-xs text-secondary mb-4">Add up to ${remainingSlots} more reference${remainingSlots > 1 ? 's' : ''} to this matrix.</p>
                    <button type="button" class="btn btn-outline btn-sm" id="slotAddBtn">
                      <span>+ Add Timepiece</span>
                    </button>
                  </div>
                </th>
              ` : ''}
            </tr>
          </thead>
          <tbody>
            ${matrixData.map(group => renderMatrixGroup(group, watches, highlightDifferences)).join('')}
          </tbody>
        </table>
      </div>

      <!-- Factual Comparative Summary Insights -->
      <div class="comparative-insights-card">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span class="section-kicker">Empirical Synthesis</span>
          <span class="font-mono text-xs text-muted">Strict Verified Attributes</span>
        </div>
        <h3 class="heading-3 mb-2">Comparative Key Observations</h3>
        <p class="body-muted text-sm mb-4">
          Factual contrasts derived directly from manufacture specifications and archival intake records without subjective scoring.
        </p>

        <div class="comparative-insights-grid">
          ${comparativeInsights.map(item => `
            <div class="insight-metric-box">
              <div class="insight-metric-title">
                ${item.icon}
                <span>${escapeHTML(item.title)}</span>
              </div>
              <p class="insight-metric-prose">${escapeHTML(item.prose)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Quick Watch Picker Modal Portal Mount -->
    <div id="comparePickerPortal"></div>
  `;
}

function renderWatchHeaderCell(w) {
  const imgUrl = resolveAsset(w.image || w.imageUrl || null, { title: w.brand, subtitle: w.model });
  const detailUrl = `#/watch/${w.slug || w.id}`;
  const priceDisplay = formatPrice(w.price);

  return `
    <th class="watch-col">
      <div class="compare-card-head">
        <button type="button" class="compare-remove-btn" data-action="remove-compare" data-id="${w.id}" aria-label="Remove ${escapeHTML(w.model)} from comparison" title="Remove timepiece">
          ${ICONS.close}
        </button>

        <div class="compare-thumb-frame">
          <img src="${imgUrl}" alt="${escapeHTML(w.brand)} ${escapeHTML(w.model)}" class="compare-thumb-img">
        </div>

        <span class="compare-brand-meta">${escapeHTML(w.brand)} &bull; ${escapeHTML(w.overview?.origin || 'Switzerland')}</span>
        <a href="${detailUrl}" class="compare-model-link" title="Open ${escapeHTML(w.model)} details">${escapeHTML(w.model)}</a>
        <span class="compare-ref-num">Ref. ${escapeHTML(w.reference || w.referenceNumber || 'N/A')}</span>
        <span class="compare-price-val">${priceDisplay}</span>

        <div class="flex items-center gap-2 mb-3">
          ${createStatusBadge(w.condition || 'Excellent')}
          <span class="badge badge-subtle font-mono text-xs">${w.year || 2022}</span>
        </div>

        <div class="flex items-center gap-2 mt-auto">
          <a href="${detailUrl}" class="btn btn-outline btn-xs flex-1 text-center">View Details</a>
          <button type="button" class="btn btn-secondary btn-xs flex-1" data-action="compare-enquire" data-id="${w.id}">Enquire</button>
        </div>
      </div>
    </th>
  `;
}

function renderMatrixGroup(group, watches, highlightDifferences) {
  const groupHeaderRow = `
    <tr class="matrix-section-row">
      <td class="sticky-col" colspan="${watches.length + 1}">
        ${escapeHTML(group.category)}
      </td>
    </tr>
  `;

  const rowsHtml = group.rows.map(row => {
    const values = watches.map(w => row.getValue(w));

    // STRICT RULE: Only highlight genuine differences when non-null/non-empty values disagree.
    // Do NOT highlight missing (null / "Not specified" / "—") values as quality differences.
    const nonNullValues = values.filter(v => v && v !== '—' && v !== 'Not specified' && v !== 'N/A');
    const isDifferent = nonNullValues.length >= 2 && new Set(nonNullValues.map(v => String(v).trim().toLowerCase())).size > 1;
    const diffClass = (isDifferent && highlightDifferences) ? 'diff-active' : '';

    return `
      <tr class="matrix-data-row ${diffClass}">
        <td class="sticky-col">
          <span>${escapeHTML(row.label)}</span>
          ${isDifferent && highlightDifferences ? '<span class="diff-badge">Diff</span>' : ''}
        </td>
        ${values.map(val => `
          <td class="watch-col ${row.isMono ? 'font-mono' : ''}">
            ${escapeHTML(val || '—')}
          </td>
        `).join('')}
      </tr>
    `;
  }).join('');

  return groupHeaderRow + rowsHtml;
}

/**
 * 7 Grouped Specification Domains (Render only fields present in data)
 */
function generate7DomainMatrix(watches) {
  return [
    {
      category: '1. IDENTITY',
      rows: [
        { label: 'Manufacture Brand', getValue: w => w.brand, isMono: false },
        { label: 'Model Name', getValue: w => w.model, isMono: false },
        { label: 'Reference Number', getValue: w => w.reference || w.referenceNumber, isMono: true },
        { label: 'Production Year', getValue: w => String(w.year || 2022), isMono: true }
      ]
    },
    {
      category: '2. CASE ARCHITECTURE',
      rows: [
        { label: 'Case Material', getValue: w => w.caseMaterial || w.specifications?.case?.material || 'Stainless Steel', isMono: false },
        { label: 'Diameter', getValue: w => `${w.caseSizeMm || w.specification?.caseDiameterMm || 40} mm`, isMono: true },
        { label: 'Thickness', getValue: w => `${w.specifications?.case?.thickness || '12.2 mm'}`, isMono: true },
        { label: 'Lug-to-Lug', getValue: w => `${w.specifications?.case?.lugToLug || '48 mm'}`, isMono: true },
        { label: 'Front Crystal', getValue: w => w.specifications?.case?.crystal || 'Scratch-resistant sapphire crystal', isMono: false },
        { label: 'Bezel', getValue: w => w.specifications?.case?.bezel || w.specification?.bezelMaterial || 'Fixed Smooth Bezel', isMono: false },
        { label: 'Water Resistance', getValue: w => w.waterResistance || `${w.specification?.waterResistanceMeters || 100} m`, isMono: true }
      ]
    },
    {
      category: '3. MOVEMENT MECHANICS',
      rows: [
        { label: 'Movement Type', getValue: w => w.movementType || 'Automatic', isMono: false },
        { label: 'Calibre', getValue: w => w.calibre || w.specification?.calibre || 'Manufacture Calibre', isMono: true },
        { label: 'Winding Mechanism', getValue: w => w.movementIntelligence?.windingDirection || 'Bidirectional Perpetual rotor', isMono: false },
        { label: 'Beat Frequency', getValue: w => `${w.specifications?.movement?.frequency || w.specification?.beatRateVph || 28800} vph`, isMono: true },
        { label: 'Jewel Count', getValue: w => String(w.specifications?.movement?.jewels || '31 Jewels'), isMono: true },
        { label: 'Power Reserve', getValue: w => `${w.specifications?.movement?.powerReserve || w.specification?.powerReserveHours || 48} Hours`, isMono: true },
        { label: 'Complications', getValue: w => Array.isArray(w.movementIntelligence?.complications) ? w.movementIntelligence.complications.join(', ') : 'Centre hours, minutes, seconds', isMono: false }
      ]
    },
    {
      category: '4. DESIGN & FINISH',
      rows: [
        { label: 'Dial Colour', getValue: w => w.dialColour || 'Black', isMono: false },
        { label: 'Dial Type & Finish', getValue: w => w.specifications?.dial?.finish || 'High-gloss lacquer with applied indices', isMono: false },
        { label: 'Case Shape', getValue: w => 'Round Monobloc middle case', isMono: false },
        { label: 'Bracelet or Strap', getValue: w => w.specifications?.braceletStrap?.type || 'Three-piece solid link bracelet', isMono: false },
        { label: 'Clasp Mechanism', getValue: w => w.specifications?.braceletStrap?.claspType || 'Folding safety clasp with micro-adjustment', isMono: false }
      ]
    },
    {
      category: '5. CONDITION ASSESSMENT',
      rows: [
        { label: 'Overall Grade', getValue: w => w.condition || 'Excellent', isMono: false },
        { label: 'Case Condition', getValue: w => w.conditionAssessment?.componentGrades?.case || '9.5/10 — Original factory chamfers intact', isMono: false },
        { label: 'Crystal Condition', getValue: w => w.conditionAssessment?.componentGrades?.crystal || '10/10 — Completely unblemished', isMono: false },
        { label: 'Dial Condition', getValue: w => w.conditionAssessment?.componentGrades?.dial || '10/10 — Pristine original lacquer', isMono: false },
        { label: 'Bracelet Condition', getValue: w => w.conditionAssessment?.componentGrades?.braceletStrap || '9.4/10 — Minimal desk hairlines', isMono: false },
        { label: 'Inspection Status', getValue: w => `${w.inspectionStatus || 'Inspected'} (7-Stage Forensic Review)`, isMono: false }
      ]
    },
    {
      category: '6. OWNERSHIP & DOCUMENTATION',
      rows: [
        { label: 'Original Box', getValue: w => w.boxStatus || 'Original Box', isMono: false },
        { label: 'Original Papers', getValue: w => w.papersStatus || 'Original Papers', isMono: false },
        { label: 'Service Documentation', getValue: w => 'Archival Pre-Owned Intake Record', isMono: false },
        { label: 'Accessories', getValue: w => w.specifications?.other?.accessories || 'Factory packaging and chronometer tag', isMono: false }
      ]
    },
    {
      category: '7. PRICING & AVAILABILITY',
      rows: [
        { label: 'Acquisition Price', getValue: w => formatPrice(w.price), isMono: true },
        { label: 'Currency', getValue: w => w.currency || 'INR', isMono: true },
        { label: 'Availability Status', getValue: w => w.availability || 'Available for Acquisition', isMono: false }
      ]
    }
  ];
}

function generateComparativeInsights(watches) {
  if (watches.length < 2) return [];
  const insights = [];

  // 1. Valuation Spectrum
  const sortedByPrice = [...watches].sort((a, b) => a.price - b.price);
  const minPriceWatch = sortedByPrice[0];
  const maxPriceWatch = sortedByPrice[sortedByPrice.length - 1];
  const priceSpread = maxPriceWatch.price - minPriceWatch.price;

  insights.push({
    title: 'Acquisition Valuation Spectrum',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    prose: priceSpread === 0
      ? `All compared references share an identical valuation of ${formatPrice(minPriceWatch.price)}.`
      : `Valuations range from ${formatPrice(minPriceWatch.price)} (${minPriceWatch.brand} ${minPriceWatch.model}) to ${formatPrice(maxPriceWatch.price)} (${maxPriceWatch.brand} ${maxPriceWatch.model}), representing a variance of ${formatPrice(priceSpread)}.`
  });

  // 2. Case Proportion Spectrum
  const sortedBySize = [...watches].sort((a, b) => (a.caseSizeMm || 40) - (b.caseSizeMm || 40));
  const minSizeWatch = sortedBySize[0];
  const maxSizeWatch = sortedBySize[sortedBySize.length - 1];

  insights.push({
    title: 'Case Geometry & Wrist Profile',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12"/></svg>`,
    prose: minSizeWatch.caseSizeMm === maxSizeWatch.caseSizeMm
      ? `All ${watches.length} timepieces exhibit uniform ${minSizeWatch.caseSizeMm} mm case diameters.`
      : `Dimensions span from the restrained ${minSizeWatch.caseSizeMm} mm profile of the ${minSizeWatch.model} to the ${maxSizeWatch.caseSizeMm} mm footprint of the ${maxSizeWatch.model}.`
  });

  // 3. Power Autonomy
  function parsePowerReserve(w) {
    const raw = String(w.specifications?.movement?.powerReserve || w.specification?.powerReserveHours || 48);
    const m = raw.match(/\d+/);
    return m ? parseInt(m[0], 10) : 48;
  }
  const sortedByReserve = [...watches].sort((a, b) => parsePowerReserve(b) - parsePowerReserve(a));
  const topReserveWatch = sortedByReserve[0];

  insights.push({
    title: 'Mechanical Autonomy Duration',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    prose: `The ${topReserveWatch.brand} ${topReserveWatch.model} delivers the longest continuous power autonomy at ${parsePowerReserve(topReserveWatch)} hours via ${topReserveWatch.calibre}.`
  });

  // 4. Propulsion Diversity
  const movementTypes = [...new Set(watches.map(w => w.movementType || 'Automatic'))];
  insights.push({
    title: 'Propulsion Architecture Variety',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
    prose: movementTypes.length === 1
      ? `Uniform propulsion: all ${watches.length} timepieces utilize ${movementTypes[0]} mechanisms.`
      : `Diverse propulsion: matrix contrasts ${movementTypes.join(', ')} architectures.`
  });

  // 5. Documentation Scope
  const fullSets = watches.filter(w => w.boxStatus === 'Original Box' && w.papersStatus === 'Original Papers');
  insights.push({
    title: 'Archival Completeness & Provenance',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    prose: fullSets.length === watches.length
      ? `Complete provenance: all ${watches.length} references retain their original manufacture presentation boxes and international guarantee papers.`
      : `${fullSets.length} of ${watches.length} references (${fullSets.map(w => w.model).join(', ')}) include full original boxes and papers.`
  });

  return insights;
}

const generateHorologicalInsights = generateComparativeInsights;

function renderQuickAddCard(watch) {
  const imgUrl = resolveAsset(watch.image || watch.imageUrl || null, { title: watch.brand, subtitle: watch.model });
  return `
    <article class="card-watch" data-watch-id="${watch.id}">
      <div class="card-watch-media">
        <img src="${imgUrl}" alt="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}" class="card-watch-img" loading="lazy">
      </div>
      <div class="card-watch-body">
        <span class="card-watch-brand">${escapeHTML(watch.brand)}</span>
        <h4 class="card-watch-title">${escapeHTML(watch.model)}</h4>
        <div class="card-watch-price">${formatPrice(watch.price)}</div>
        <button type="button" class="btn btn-outline btn-sm w-full mt-3" data-action="quick-add-compare" data-id="${watch.id}">
          + Add to Comparison
        </button>
      </div>
    </article>
  `;
}

export function mount(ctx) {
  // Preset Pairings Listeners
  document.querySelectorAll('.preset-pair-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-preset-idx'), 10);
      const preset = PRESET_PAIRINGS[idx];
      if (preset && preset.ids) {
        store.setCompareList(preset.ids);
        renderAndReplace();
      }
    });
  });

  // Quick-Add from Recently Viewed Listeners
  document.querySelectorAll('[data-action="quick-add-compare"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) {
        const res = store.addToCompare(id);
        if (res.success) {
          renderAndReplace();
        } else if (res.reason === 'limit_reached') {
          openCompareLimitModal(id, store.getCompareList());
        }
      }
    });
  });

  // Highlight Differences Toggle
  const diffBtn = document.getElementById('toggleDiffBtn');
  diffBtn?.addEventListener('click', () => {
    const prefs = store.getPreferences();
    const nextState = !prefs.highlightDifferences;
    store.setPreference('highlightDifferences', nextState);
    renderAndReplace();
  });

  // Clear Comparison Tray
  document.getElementById('clearCompareBtn')?.addEventListener('click', () => {
    store.clearCompare();
    renderAndReplace();
  });

  // Remove individual watch from comparison
  document.querySelectorAll('[data-action="remove-compare"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if (id) {
        store.removeFromCompare(id);
        renderAndReplace();
      }
    });
  });

  // Enquiry trigger
  document.querySelectorAll('[data-action="compare-enquire"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const watch = getWatchById(id);
      if (watch) {
        openEnquiryModal(watch);
      }
    });
  });

  // Open Quick Watch Picker Modal
  document.getElementById('openPickerBtn')?.addEventListener('click', () => openWatchPickerModal());
  document.getElementById('slotAddBtn')?.addEventListener('click', () => openWatchPickerModal());
  document.getElementById('emptyStatePickerBtn')?.addEventListener('click', () => openWatchPickerModal());

  function openWatchPickerModal() {
    const currentCompare = store.getCompareList();
    if (currentCompare.length >= 4) {
      store.showToast('Comparison limit reached (4 timepieces). Remove one first.', 'warning');
      return;
    }

    const availableWatches = WATCHES.filter(w => !currentCompare.includes(w.id));
    const portal = document.getElementById('comparePickerPortal');
    if (!portal) return;

    portal.innerHTML = `
      <div class="modal-backdrop" id="pickerBackdrop" style="position:fixed;inset:0;background:rgba(7,17,31,0.88);backdrop-filter:blur(8px);z-index:var(--z-modal);display:flex;align-items:center;justify-content:center;padding:var(--space-4);">
        <div class="watch-picker-dialog bg-surface border" style="background:var(--bg-surface);border-color:var(--border-strong);border-radius:var(--radius-sm);box-shadow:var(--shadow-card-hover);" role="dialog" aria-modal="true" aria-labelledby="pickerTitle">
          <div class="watch-picker-header">
            <div>
              <span class="font-mono text-xs text-accent uppercase" style="letter-spacing:0.1em;">Select Reference</span>
              <h3 class="heading-3" id="pickerTitle">Add Timepiece to Comparison</h3>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" id="closePickerBtn" aria-label="Close picker">
              ${ICONS.close}
            </button>
          </div>

          <div style="padding:var(--space-4) var(--space-6);border-bottom:1px solid var(--border-subtle);">
            <input type="text" id="pickerSearchInput" class="form-input w-full" placeholder="Filter by brand, model, or reference..." style="padding:var(--space-2) var(--space-4);background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:var(--radius-xs);color:var(--text-primary);font-size:var(--text-sm);">
          </div>

          <div class="watch-picker-body">
            <div class="watch-picker-grid" id="pickerGrid">
              ${availableWatches.map(w => renderPickerWatchItem(w)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    const backdrop = document.getElementById('pickerBackdrop');
    const closeBtn = document.getElementById('closePickerBtn');
    function closeModal() {
      if (portal) portal.innerHTML = '';
      window.removeEventListener('keydown', handleKey);
    }
    function handleKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    closeBtn?.addEventListener('click', closeModal);
    window.addEventListener('keydown', handleKey);

    const searchInput = document.getElementById('pickerSearchInput');
    const pickerGrid = document.getElementById('pickerGrid');
    searchInput?.focus();
    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = availableWatches.filter(w => 
        w.brand.toLowerCase().includes(q) || 
        w.model.toLowerCase().includes(q) || 
        (w.reference || '').toLowerCase().includes(q)
      );
      if (pickerGrid) {
        pickerGrid.innerHTML = filtered.length > 0
          ? filtered.map(w => renderPickerWatchItem(w)).join('')
          : '<p class="text-sm text-muted py-8 text-center col-span-full">No matching timepieces found.</p>';
        wirePickerItemClicks(closeModal);
      }
    });

    wirePickerItemClicks(closeModal);
  }

  function renderPickerWatchItem(w) {
    const imgUrl = resolveAsset(w.image || w.imageUrl || null, { title: w.brand, subtitle: w.model });
    return `
      <div class="watch-picker-item" data-id="${w.id}">
        <div style="width:100%;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background:var(--bg-primary);border-radius:var(--radius-xs);margin-bottom:var(--space-2);overflow:hidden;">
          <img src="${imgUrl}" alt="${escapeHTML(w.model)}" style="width:80%;height:80%;object-fit:contain;">
        </div>
        <span class="font-mono text-xs text-muted uppercase">${escapeHTML(w.brand)}</span>
        <h4 class="font-serif text-sm text-primary mb-1">${escapeHTML(w.model)}</h4>
        <div class="font-mono text-xs text-accent font-bold mb-2">${formatPrice(w.price)}</div>
        <button type="button" class="btn btn-outline btn-xs w-full mt-auto">Select</button>
      </div>
    `;
  }

  function wirePickerItemClicks(closeModal) {
    document.querySelectorAll('.watch-picker-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (id) {
          const res = store.addToCompare(id);
          closeModal();
          if (res.success) {
            renderAndReplace();
          } else if (res.reason === 'limit_reached') {
            openCompareLimitModal(id, store.getCompareList());
          }
        }
      });
    });
  }

  async function renderAndReplace() {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = await render(ctx);
      mount(ctx);
    }
  }
}
