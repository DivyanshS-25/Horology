/**
 * HOROLOGY — Product Quick View Modal Controller
 * Accessible, keyboard-trapped modal dialog for rapid horological inspection
 * Direction C — Midnight Navy Precision
 */

import { store } from './state.js';
import { resolveAsset } from './assets.js';
import { formatPrice, escapeHTML, trapFocus, lockScroll } from './utilities.js';
import { ICONS, createStatusBadge } from './components.js';

class QuickViewController {
  constructor() {
    this.portalEl = document.getElementById('modalPortal');
    this.activeWatch = null;
    this.focusCleanup = null;
  }

  open(watch) {
    if (!watch || !this.portalEl) return;
    this.activeWatch = watch;

    this.render();
    this.portalEl.classList.add('open');
    lockScroll(true);

    const dialog = this.portalEl.querySelector('.modal-dialog');
    if (dialog) {
      this.focusCleanup = trapFocus(dialog);
    }

    this.bindEvents();
  }

  close() {
    if (!this.portalEl) return;
    this.portalEl.classList.remove('open');
    this.portalEl.innerHTML = '';
    lockScroll(false);

    if (typeof this.focusCleanup === 'function') {
      this.focusCleanup();
      this.focusCleanup = null;
    }
    this.activeWatch = null;
  }

  render() {
    const watch = this.activeWatch;
    const imgUrl = resolveAsset(watch.image || watch.imageUrl, { title: watch.brand, subtitle: watch.model });
    const inWishlist = store.isInWishlist(watch.id);
    const inCompare = store.isInCompare(watch.id);
    const priceFormatted = formatPrice(watch.price);
    const detailUrl = `#/watch/${watch.slug}`;

    this.portalEl.innerHTML = `
      <div class="modal-backdrop" id="quickViewBackdrop"></div>
      <div class="modal-dialog quick-view-dialog" role="dialog" aria-modal="true" aria-label="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)} Quick View">
        <button type="button" class="quick-view-close-btn" id="quickViewCloseBtn" aria-label="Close Quick View (Press Escape)">
          ${ICONS.close}
        </button>

        <div class="quick-view-grid">
          <!-- Left Column: 4:5 Product Media Stage -->
          <div class="quick-view-media-stage">
            <div class="quick-view-badge-slot">
              ${createStatusBadge(watch.inspectionStatus || 'Inspected')}
            </div>
            <div class="quick-view-image-frame">
              <img src="${imgUrl}" alt="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}" class="quick-view-img" loading="eager" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
            </div>
            <div class="quick-view-disclosure">
              <span>Demonstration Record &bull; Illustrative Studio Imagery</span>
            </div>
          </div>

          <!-- Right Column: Horological Specifications & Actions -->
          <div class="quick-view-info-stage">
            <span class="meta-label">${escapeHTML(watch.brand)} &bull; ${watch.year}</span>
            <h2 class="quick-view-title">${escapeHTML(watch.model)}</h2>
            <div class="quick-view-meta">
              <span>Ref. ${escapeHTML(watch.reference || watch.referenceNumber)}</span>
              <span>&bull;</span>
              <span>${escapeHTML(watch.family || 'Chronometer')}</span>
            </div>

            <div class="quick-view-price">${priceFormatted}</div>

            <p class="quick-view-summary">
              ${escapeHTML(watch.summary || 'Certified luxury mechanical timepiece examined with forensic horological rigor.')}
            </p>

            <div class="quick-view-spec-table">
              <div class="spec-row">
                <span class="spec-label">Condition Grade</span>
                <span class="spec-value text-accent">${escapeHTML(watch.condition || 'Excellent')}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Movement Type</span>
                <span class="spec-value">${escapeHTML(watch.movementType || 'Automatic')}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Calibre</span>
                <span class="spec-value font-mono">${escapeHTML(watch.calibre || 'Manufacture Calibre')}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Case Dimensions</span>
                <span class="spec-value font-mono">${watch.caseSizeMm || 40} mm &bull; ${escapeHTML(watch.caseMaterial || 'Steel')}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Documentation</span>
                <span class="spec-value">${escapeHTML(watch.documentationCategory || 'Box and Papers')}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Water Resistance</span>
                <span class="spec-value font-mono">${escapeHTML(watch.waterResistance || '100 m')}</span>
              </div>
            </div>

            <!-- Action Controls -->
            <div class="quick-view-actions">
              <a href="${detailUrl}" class="btn btn-primary btn-lg flex-1" id="quickViewDetailLink">
                <span>View Full Details</span>
                ${ICONS.arrowRight}
              </a>
              <button type="button" class="btn btn-secondary btn-icon ${inWishlist ? 'active' : ''}" id="quickViewWishlistBtn" aria-label="Save to Wishlist" title="Save to Wishlist">
                ${inWishlist ? ICONS.heartFilled : ICONS.heart}
              </button>
              <button type="button" class="btn btn-secondary btn-icon ${inCompare ? 'active' : ''}" id="quickViewCompareBtn" aria-label="Compare Timepiece" title="Compare Timepiece">
                ${ICONS.scale}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const watch = this.activeWatch;
    if (!watch) return;

    // Close Button & Backdrop
    document.getElementById('quickViewCloseBtn')?.addEventListener('click', () => this.close());
    document.getElementById('quickViewBackdrop')?.addEventListener('click', () => this.close());

    // Escape Key Handler
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        this.close();
        window.removeEventListener('keydown', handleKey);
      }
    };
    window.addEventListener('keydown', handleKey);

    // Detail Link Closes Modal
    document.getElementById('quickViewDetailLink')?.addEventListener('click', () => {
      this.close();
    });

    // Wishlist Toggle Inside Modal
    const wishBtn = document.getElementById('quickViewWishlistBtn');
    wishBtn?.addEventListener('click', () => {
      const added = store.toggleWishlist(watch.id);
      wishBtn.innerHTML = added ? ICONS.heartFilled : ICONS.heart;
      wishBtn.classList.toggle('active', added);
    });

    // Compare Toggle Inside Modal
    const compBtn = document.getElementById('quickViewCompareBtn');
    compBtn?.addEventListener('click', () => {
      const res = store.toggleCompare(watch.id);
      compBtn.classList.toggle('active', res.added);
    });
  }
}

export const quickView = new QuickViewController();

