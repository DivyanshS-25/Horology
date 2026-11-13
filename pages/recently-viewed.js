/**
 * HOROLOGY — Page Module: Recently Viewed Subsystem
 * Route: #/recently-viewed
 * Persistent 12-watch queue with deduplication and chronometer history
 * Direction C — Midnight Navy Edition
 */

import { getWatchById } from '../js/data.js';
import { createBreadcrumb, createStatusBadge, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { formatPrice, escapeHTML } from '../js/utilities.js';
import { store } from '../js/state.js';
import { openEnquiryModal } from '../js/enquiry.js';
import { openCompareLimitModal } from './wishlist.js';

export const title = 'Recently Examined Timepieces — HOROLOGY';

export async function render(ctx) {
  const recentEntries = store.getRecentlyViewedEntries();
  const watches = recentEntries
    .map(entry => {
      const watch = getWatchById(entry.id);
      return watch ? { ...watch, viewedAt: entry.viewedAt } : null;
    })
    .filter(Boolean);

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Recently Viewed', href: '#/recently-viewed' }
  ];

  if (watches.length === 0) {
    return `
      <div class="container section-spacer">
        ${createBreadcrumb(breadcrumbs)}

        <div class="empty-state" style="margin-top: var(--space-8); margin-bottom: var(--space-12);">
          <div class="empty-state-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h1 class="heading-2 mb-3">No Examination History Recorded</h1>
          <p class="body-muted mb-6" style="max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Your browsing session history is empty. As you explore the collection and examine individual watch detail dossiers, your most recent references will be logged here for quick reference.
          </p>
          <div class="flex items-center justify-center gap-4 flex-wrap">
            <a href="#/collection" class="btn btn-primary">Explore Observatory Collection</a>
            <a href="#/watch-finder" class="btn btn-outline">Launch Watch Finder</a>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <span class="section-kicker">Observatory Session History</span>
          <h1 class="heading-1">Recently Examined Timepieces (${watches.length})</h1>
        </div>
        <div class="flex items-center gap-3">
          <button type="button" class="btn btn-outline btn-sm" id="clearRecentBtn">
            Clear History
          </button>
          <a href="#/collection" class="btn btn-secondary btn-sm">
            <span>Continue Browsing</span>
            ${ICONS.arrowRight}
          </a>
        </div>
      </div>

      <div class="watch-grid">
        ${watches.map(w => renderRecentWatchCard(w)).join('')}
      </div>
    </div>
  `;
}

function renderRecentWatchCard(watch) {
  const imgUrl = resolveAsset(watch.image || watch.imageUrl, { title: watch.brand, subtitle: watch.model });
  const priceDisplay = formatPrice(watch.price);
  const detailUrl = `#/watch/${watch.slug || watch.id}`;
  const inWishlist = store.isInWishlist(watch.id);
  const inCompare = store.isInCompare(watch.id);

  return `
    <article class="card-watch" data-watch-id="${watch.id}">
      <div class="card-watch-media">
        <div class="card-watch-status">
          ${createStatusBadge(watch.inspectionStatus || 'Inspected')}
        </div>

        <div class="card-watch-actions">
          <button type="button" class="action-badge-btn" data-action="remove-recent" data-id="${watch.id}" aria-label="Remove ${escapeHTML(watch.model)} from history" title="Remove from history" style="color:#EF4444;">
            ${ICONS.close}
          </button>
          <button type="button" class="action-badge-btn ${inWishlist ? 'active' : ''}" data-action="toggle-wishlist" data-id="${watch.id}" aria-label="Save ${escapeHTML(watch.model)}" title="Save to Wishlist">
            ${inWishlist ? ICONS.heartFilled : ICONS.heart}
          </button>
          <button type="button" class="action-badge-btn ${inCompare ? 'active' : ''}" data-action="toggle-compare" data-id="${watch.id}" aria-label="Compare ${escapeHTML(watch.model)}" title="Compare Timepiece">
            ${ICONS.scale}
          </button>
        </div>

        <a href="${detailUrl}" class="card-watch-img-link" aria-label="View details of ${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}">
          <img src="${imgUrl}" alt="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}" class="card-watch-img" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
        </a>
      </div>

      <div class="card-watch-body">
        <div class="flex items-center justify-between mb-1">
          <span class="card-watch-brand">${escapeHTML(watch.brand)}</span>
          <span class="card-watch-condition-pill">${escapeHTML(watch.condition || 'Excellent')}</span>
        </div>

        <h3 class="card-watch-title">
          <a href="${detailUrl}">${escapeHTML(watch.model)}</a>
        </h3>

        <p class="card-watch-ref">Ref. ${escapeHTML(watch.reference || watch.referenceNumber || 'N/A')} &bull; ${watch.year || 2022}</p>

        <div class="card-watch-specs">
          <span>${watch.caseSizeMm || 40} mm</span>
          <span>&bull;</span>
          <span>${escapeHTML(watch.movementType || 'Automatic')}</span>
          <span>&bull;</span>
          <span>${escapeHTML(watch.documentationCategory || 'Box & Papers')}</span>
        </div>

        <div class="card-watch-footer mt-auto pt-3 border-top" style="border-color: var(--border-subtle);">
          <div>
            <div class="card-watch-price">${priceDisplay}</div>
            <span class="card-watch-demo-label">${escapeHTML(watch.availability || 'Available')}</span>
          </div>
          <div class="flex items-center gap-2">
            <a href="${detailUrl}" class="btn btn-outline btn-xs">View Details</a>
            <button type="button" class="btn btn-secondary btn-xs" data-action="recent-enquire" data-id="${watch.id}">Enquire</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function mount(ctx) {
  // Clear history button
  document.getElementById('clearRecentBtn')?.addEventListener('click', () => {
    store.clearRecentlyViewed();
    renderAndReplace();
  });

  // Individual remove from recent history
  document.querySelectorAll('[data-action="remove-recent"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        store.removeFromRecentlyViewed(id);
        renderAndReplace();
      }
    });
  });

  // Watch card toggle listeners
  document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        const isSaved = store.toggleWishlist(id);
        btn.classList.toggle('active', isSaved);
        btn.innerHTML = isSaved ? ICONS.heartFilled : ICONS.heart;
      }
    });
  });

  document.querySelectorAll('[data-action="toggle-compare"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        const res = store.toggleCompare(id);
        if (res.success) {
          btn.classList.toggle('active', res.added);
        } else if (res.reason === 'limit_reached') {
          openCompareLimitModal(id, store.getCompareList());
        }
      }
    });
  });

  // Enquiry Modal trigger
  document.querySelectorAll('[data-action="recent-enquire"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const watch = getWatchById(id);
      if (watch) {
        openEnquiryModal(watch);
      }
    });
  });

  async function renderAndReplace() {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = await render(ctx);
      mount(ctx);
    }
  }
}
