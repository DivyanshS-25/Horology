/**
 * HOROLOGY — UI Component Library
 * Direction: OBSIDIAN LUXURY EDITION (Phase 08)
 * Curated Vault Cards, Timing Telemetry Drawers, Interactive Hotspots & Accessible Markup
 */

import { escapeHTML, formatPrice } from './utilities.js';
import { resolveAsset } from './assets.js';
import { store } from './state.js';

// SVG Icon Helpers (Precision Horology Vector Library)
export const ICONS = {
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  heartFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  scale: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  balance: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line></svg>`,
  eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  filter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  pulse: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  volumeOn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  volumeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,
  loupe: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`,
  camera: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  seal: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`
};

/**
 * Button Component Factory (Obsidian Luxury Hierarchy)
 */
export function createButton({
  label = 'Button',
  href = null,
  variant = 'primary', // primary | secondary | outline | ghost | gold
  size = 'md',        // sm | md | lg
  icon = null,
  iconPosition = 'right',
  className = '',
  ariaLabel = '',
  onClick = null,
  disabled = false
} = {}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const classes = `btn ${variantClass} ${sizeClass} ${className}`.trim();
  const labelHtml = escapeHTML(label);
  const iconHtml = icon ? `<span class="btn-icon-slot">${icon}</span>` : '';
  const content = iconPosition === 'left' ? `${iconHtml}<span>${labelHtml}</span>` : `<span>${labelHtml}</span>${iconHtml}`;
  const ariaAttr = ariaLabel ? ` aria-label="${escapeHTML(ariaLabel)}"` : '';

  if (href) {
    return `<a href="${href}" class="${classes}"${ariaAttr}>${content}</a>`;
  }

  const disabledAttr = disabled ? ' disabled aria-disabled="true"' : '';
  return `<button type="button" class="${classes}"${ariaAttr}${disabledAttr}>${content}</button>`;
}

/**
 * Status Badge Component (Precision Horology Aesthetics)
 */
export function createStatusBadge(status = 'verified', text = null) {
  const normStatus = (status || 'verified').toLowerCase();
  let badgeClass = 'badge-verified';
  let label = text || 'Verified';
  let iconHtml = ICONS.check;

  if (normStatus === 'reserved') {
    badgeClass = 'badge-reserved';
    label = text || 'Reserved';
    iconHtml = '';
  } else if (normStatus === 'archived' || normStatus === 'unavailable') {
    badgeClass = 'badge-archived';
    label = text || 'Archived';
    iconHtml = '';
  } else if (normStatus === 'inspection pending' || normStatus === 'pending') {
    badgeClass = 'badge-reserved';
    label = text || 'Inspection Pending';
    iconHtml = '';
  } else if (normStatus === 'demonstration' || normStatus === 'demo') {
    badgeClass = 'badge-subtle';
    label = text || 'Demonstration';
    iconHtml = '';
  }

  return `<span class="badge ${badgeClass}">${iconHtml}<span>${escapeHTML(label)}</span></span>`;
}

/**
 * Breadcrumb Trail Component
 */
export function createBreadcrumb(crumbs = []) {
  if (!crumbs || crumbs.length === 0) return '';

  const items = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (isLast) {
      return `<li class="breadcrumb-item" aria-current="page">${escapeHTML(crumb.label)}</li>`;
    }
    return `
      <li class="breadcrumb-item">
        <a href="${crumb.href}">${escapeHTML(crumb.label)}</a>
        <span class="breadcrumb-sep">/</span>
      </li>
    `;
  }).join('');

  return `
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">${items}</ol>
    </nav>
  `;
}

/**
 * Curated Vault Card Component (Phase 08 Redesign)
 * Features:
 * - Obsidian Luxury Specimen Frame with subtle sapphire crystal refraction
 * - Smooth image scale (scale(1.05)) on hover/focus
 * - Timing Telemetry Drawer with honest data extraction
 * - Dedicated mobile telemetry toggle button
 */
export function createWatchCard(watch, { showActions = true, compact = false } = {}) {
  if (!watch) return '';

  const inWishlist = store.isInWishlist(watch.id);
  const inCompare = store.isInCompare(watch.id);
  const imgUrl = resolveAsset(watch.image || watch.imageUrl || null, { title: watch.brand, subtitle: watch.model });
  const priceDisplay = formatPrice(watch.price);
  const detailUrl = `#/watch/${watch.slug}`;

  const wishlistIcon = inWishlist ? ICONS.heartFilled : ICONS.heart;
  const wishActiveClass = inWishlist ? 'active' : '';
  const compActiveClass = inCompare ? 'active' : '';

  const caseDiameter = watch.caseSizeMm || watch.specification?.caseDiameterMm || 40;
  const movement = watch.movementType || watch.specification?.movementType || 'Automatic';
  const condition = watch.condition || 'Excellent';
  const docStatus = watch.documentationCategory || 'Box & Papers';
  const inspectionBadge = watch.inspectionStatus || watch.heroBadge || 'Inspected';

  // Read Telemetry Data Honestly from Phase 04 Sub-Object
  const mechPerf = watch.inspectionReport?.mechanicalPerformance;
  const hasMeasured = mechPerf && mechPerf.measuredValuesAvailable;

  let telemetryHtml = '';
  if (hasMeasured) {
    const rateSign = mechPerf.rateDeviationSecDay > 0 ? '+' : '';
    telemetryHtml = `
      <div class="card-telemetry-header">
        <span class="telemetry-title">Electronic Timing Telemetry</span>
        <span class="telemetry-chip verified">Verified</span>
      </div>
      <div class="card-telemetry-metrics">
        <div class="telemetry-metric">
          <span class="telemetry-metric-label">Rate</span>
          <span class="telemetry-metric-val">${rateSign}${mechPerf.rateDeviationSecDay} s/d</span>
        </div>
        <div class="telemetry-metric">
          <span class="telemetry-metric-label">Amplitude</span>
          <span class="telemetry-metric-val">${mechPerf.amplitudeDeg}&deg;</span>
        </div>
        <div class="telemetry-metric">
          <span class="telemetry-metric-label">Beat Error</span>
          <span class="telemetry-metric-val">${mechPerf.beatErrorMs} ms</span>
        </div>
      </div>
      <div class="telemetry-footer-note">Measured ${escapeHTML(mechPerf.measurementDate || 'Witschi Chronoscope')}</div>
    `;
  } else {
    telemetryHtml = `
      <div class="card-telemetry-header">
        <span class="telemetry-title">Timing Telemetry</span>
        <span class="telemetry-chip unavail">Demo Record</span>
      </div>
      <div class="telemetry-unavail-body">
        <p class="telemetry-unavail-text">
          Acoustic timing unrecorded for demonstration catalog. Calibrated on laboratory Witschi chronoscope upon individual lot intake.
        </p>
      </div>
    `;
  }

  return `
    <article class="card-watch ${compact ? 'card-watch-compact' : ''} sapphire-refraction" data-watch-id="${watch.id}">
      <div class="card-watch-media">
        <!-- Status & Telemetry Toggle Header -->
        <div class="card-watch-status">
          ${createStatusBadge(inspectionBadge)}
        </div>

        <!-- Action Controls -->
        ${showActions ? `
          <div class="card-watch-actions">
            <button type="button" class="action-badge-btn ${wishActiveClass}" data-action="toggle-wishlist" data-id="${watch.id}" aria-label="Save ${escapeHTML(watch.model)} to Wishlist" title="Save to Wishlist">
              ${wishlistIcon}
            </button>
            <button type="button" class="action-badge-btn ${compActiveClass}" data-action="toggle-compare" data-id="${watch.id}" aria-label="Compare ${escapeHTML(watch.model)}" title="Compare Timepiece">
              ${ICONS.scale}
            </button>
            <button type="button" class="action-badge-btn telemetry-toggle-btn" data-action="toggle-telemetry" data-id="${watch.id}" aria-label="Inspect Timing Telemetry" title="Timing Telemetry">
              ${ICONS.pulse}
            </button>
          </div>
        ` : ''}

        <!-- Product Image Stage with Depth Backdrop -->
        <a href="${detailUrl}" class="card-watch-img-link" aria-label="View details of ${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}">
          <img src="${imgUrl}" alt="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}" class="card-watch-img" loading="lazy" decoding="async">
        </a>

        <!-- Quick View Slide-Up Trigger -->
        <button type="button" class="card-watch-quickview-btn" data-action="quick-view" data-id="${watch.id}" aria-label="Quick View of ${escapeHTML(watch.model)}">
          ${ICONS.eye}
          <span>Quick View</span>
        </button>

        <!-- Timing Telemetry Drawer (Slides Up from Bottom) -->
        <div class="card-telemetry-drawer" id="telemetry-drawer-${watch.id}">
          ${telemetryHtml}
        </div>
      </div>

      <div class="card-watch-body">
        <div class="flex items-center justify-between mb-1">
          <span class="card-watch-brand">${escapeHTML(watch.brand)}</span>
          <span class="card-watch-condition-pill">${escapeHTML(condition)}</span>
        </div>

        <h3 class="card-watch-title">
          <a href="${detailUrl}">${escapeHTML(watch.model)}</a>
        </h3>

        <p class="card-watch-ref">Ref. ${escapeHTML(watch.reference || watch.referenceNumber || 'N/A')} &bull; ${watch.year || 2022}</p>

        <!-- Technical Spec Pills -->
        <div class="card-watch-specs">
          <span>${caseDiameter} mm</span>
          <span>&bull;</span>
          <span>${escapeHTML(movement)}</span>
          <span>&bull;</span>
          <span>${escapeHTML(docStatus)}</span>
        </div>

        <!-- Card Footer -->
        <div class="card-watch-footer">
          <div>
            <div class="card-watch-price">${priceDisplay}</div>
            <span class="card-watch-demo-label">Demo Record</span>
          </div>
          <a href="${detailUrl}" class="btn btn-outline btn-sm" aria-label="View details of ${escapeHTML(watch.model)}">
            <span>Examine</span>
            ${ICONS.arrowRight}
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Interactive Hotspot Marker Component (Phase 08)
 */
export function createHotspotMarker({ id, xPercent = 50, yPercent = 50, title = 'Hotspot', description = '', spec = '' }) {
  return `
    <div class="hotspot-item" style="top: ${yPercent}%; left: ${xPercent}%;" data-hotspot-id="${escapeHTML(id)}">
      <button type="button" class="hotspot-beacon animate-hotspot" aria-expanded="false" aria-label="Inspect ${escapeHTML(title)}">
        <span class="hotspot-beacon-dot"></span>
      </button>
      <div class="hotspot-popover" role="tooltip">
        <div class="hotspot-popover-title">${escapeHTML(title)}</div>
        ${spec ? `<div class="hotspot-popover-spec">${escapeHTML(spec)}</div>` : ''}
        <p class="hotspot-popover-desc">${escapeHTML(description)}</p>
      </div>
    </div>
  `;
}

/**
 * Brand Card Component Factory
 */
export function createBrandCard(brand) {
  if (!brand) return '';
  const brandUrl = `#/brands/${brand.id}`;

  return `
    <a href="${brandUrl}" class="card-brand sapphire-refraction" aria-label="Discover ${escapeHTML(brand.name)} collection">
      <div class="card-brand-emblem">${ICONS.balance}</div>
      <h3 class="card-brand-title">${escapeHTML(brand.name)}</h3>
      <span class="card-brand-meta">${escapeHTML(brand.origin)} &bull; Est. ${brand.founded}</span>
      <p class="card-brand-desc">${escapeHTML(brand.description)}</p>
      <div class="flex items-center gap-2 text-gold mt-auto" style="font-size: var(--text-xs); font-family: var(--font-mono); text-transform: uppercase;">
        <span>Explore Collection</span>
        ${ICONS.arrowRight}
      </div>
    </a>
  `;
}

/**
 * Spec Key-Value Row Component
 */
export function createSpecRow(label, value, isMono = true) {
  return `
    <div class="spec-row">
      <span class="spec-label">${escapeHTML(label)}</span>
      <span class="spec-value ${isMono ? 'font-mono' : ''}">${escapeHTML(value || '—')}</span>
    </div>
  `;
}

/**
 * Empty State Component (Obsidian Luxury Polish)
 */
export function createEmptyState({
  title = 'No Timepieces Found',
  description = 'Your selection criteria did not match any available timepieces in the vault.',
  actionText = 'Discover Collection',
  actionHref = '#/collection',
  icon = ICONS.balance
} = {}) {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">${icon}</div>
      <h3 class="empty-state-title">${escapeHTML(title)}</h3>
      <p class="empty-state-desc">${escapeHTML(description)}</p>
      ${actionText ? `
        <a href="${actionHref}" class="btn btn-primary" id="emptyStateResetBtn">
          ${escapeHTML(actionText)}
        </a>
      ` : ''}
    </div>
  `;
}

/**
 * Loading State Component
 */
export function createLoadingState({ text = 'Querying Horological Vault...' } = {}) {
  return `
    <div class="container section-spacer text-center">
      <div class="brand-wordmark mb-4 animate-pulse">${ICONS.balance} HOROLOGY</div>
      <p class="body-muted font-mono" style="font-size: var(--text-xs); letter-spacing: 0.1em; text-transform: uppercase;">
        ${escapeHTML(text)}
      </p>
    </div>
  `;
}

/**
 * Error State Component
 */
export function createErrorState({
  title = 'Telemetry Transmission Interrupted',
  message = 'An unexpected error occurred while loading this view.',
  retryHref = '#/'
} = {}) {
  return `
    <div class="empty-state" style="border-color: var(--status-danger);">
      <div class="empty-state-icon" style="color: var(--status-danger);">${ICONS.balance}</div>
      <h3 class="empty-state-title">${escapeHTML(title)}</h3>
      <p class="empty-state-desc">${escapeHTML(message)}</p>
      <a href="${retryHref}" class="btn btn-secondary">Return to Chronometer Home</a>
    </div>
  `;
}

/**
 * Recently Viewed Timepieces Shelf Component
 */
export function createRecentlyViewedShelf(watches = [], { title = 'Recently Examined Timepieces', kicker = 'Observatory History', viewAllHref = '#/recently-viewed', limit = 4 } = {}) {
  if (!Array.isArray(watches) || watches.length === 0) return '';
  const displayWatches = watches.slice(0, limit);

  return `
    <section class="recently-viewed-section" aria-labelledby="recentShelfTitle">
      <div class="recent-shelf-header">
        <div>
          <span class="section-kicker">${escapeHTML(kicker)}</span>
          <h3 class="heading-3" id="recentShelfTitle">${escapeHTML(title)}</h3>
        </div>
        ${viewAllHref ? `
          <a href="${viewAllHref}" class="btn btn-ghost btn-sm">
            <span>View History (${watches.length})</span>
            ${ICONS.arrowRight}
          </a>
        ` : ''}
      </div>
      <div class="recent-shelf-track">
        ${displayWatches.map(w => createWatchCard(w, { compact: true })).join('')}
      </div>
    </section>
  `;
}
