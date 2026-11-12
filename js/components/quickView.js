// HOROLOGY — Quick View Modal Handler
import { repository } from '../data/repository.js';
import { openModal, closeModal } from './modal.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';
import { formatINR, escapeHtml } from '../utils/formatters.js';
import { store } from '../core/store.js';
import { icons } from '../utils/svgIcons.js';
import { showToast } from './toast.js';

export function openQuickView(watchId) {
  const watch = repository.getWatchById(watchId);
  if (!watch) return;

  const svgVisual = generateWatchSvg(watch.visualType || 'diver', {
    dialColor: watch.dialTone || '#0B192A',
    bezelColor: watch.bezelTone || '#263A50',
    brand: watch.brand
  });

  const inWishlist = store.isInWishlist(watch.id);
  const inCompare = store.isInCompare(watch.id);

  const html = `
    <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-8); align-items: center;" class="quick-view-grid">
      <div style="aspect-ratio: 1/1; background: radial-gradient(circle at 50% 50%, #152B46 0%, #0B192A 80%); border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; padding: var(--space-4);">
        <div style="width: 75%; height: 75%;">
          ${svgVisual}
        </div>
      </div>
      <div>
        <div class="overline mb-1">${escapeHtml(watch.brand)}</div>
        <h2 style="font-size: var(--text-2xl); margin-bottom: var(--space-2);">${escapeHtml(watch.model)}</h2>
        <div class="mono mb-4" style="color: var(--color-text-muted); font-size: var(--text-xs);">
          Ref. ${escapeHtml(watch.referenceNumber)} &bull; ${watch.year} &bull; ${escapeHtml(watch.specification.caseMaterial)}
        </div>

        <div class="quick-spec-grid mb-6">
          <div class="quick-spec-item">
            <span class="quick-spec-label">Calibre</span>
            <span class="quick-spec-value" style="font-size: var(--text-xs);">${escapeHtml(watch.specification.calibre.split('(')[0])}</span>
          </div>
          <div class="quick-spec-item">
            <span class="quick-spec-label">Diameter</span>
            <span class="quick-spec-value">${watch.specification.caseDiameterMm} mm</span>
          </div>
          <div class="quick-spec-item">
            <span class="quick-spec-label">Movement</span>
            <span class="quick-spec-value">${escapeHtml(watch.specification.movementType)}</span>
          </div>
          <div class="quick-spec-item">
            <span class="quick-spec-label">Power Res.</span>
            <span class="quick-spec-value">${watch.specification.powerReserveHours} Hours</span>
          </div>
          <div class="quick-spec-item">
            <span class="quick-spec-label">Depth</span>
            <span class="quick-spec-value">${watch.specification.waterResistanceMeters} m</span>
          </div>
          <div class="quick-spec-item">
            <span class="quick-spec-label">Condition</span>
            <span class="quick-spec-value" style="color: var(--color-status-available);">${escapeHtml(watch.condition.overallGrade)}</span>
          </div>
        </div>

        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: var(--space-6);">
          <div>
            <span class="overline" style="display: block; font-size: 10px;">Curation Price</span>
            <span class="mono" style="font-size: var(--text-2xl); font-weight: 600; color: var(--color-text-primary);">
              ${formatINR(watch.price)}
            </span>
          </div>
          <span class="badge badge-verified">${icons.check('', 12)} ${escapeHtml(watch.heroBadge)}</span>
        </div>

        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
          <a href="#/watch/${watch.slug}" class="btn btn-primary" id="quickViewDetailsBtn">View Full Dossier &amp; Specs</a>
          <button class="btn btn-outline ${inWishlist ? 'active' : ''}" id="quickViewWishlistBtn">
            ${icons.heart('', 16, inWishlist)} ${inWishlist ? 'Saved' : 'Save'}
          </button>
          <button class="btn btn-outline ${inCompare ? 'active' : ''}" id="quickViewCompareBtn">
            ${icons.compare('', 16)} ${inCompare ? 'Comparing' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  `;

  openModal({
    title: `${watch.brand} ${watch.model}`,
    content: html,
    maxWidth: '840px'
  });

  const detailsBtn = document.getElementById('quickViewDetailsBtn');
  detailsBtn?.addEventListener('click', () => {
    closeModal();
  });

  const wishlistBtn = document.getElementById('quickViewWishlistBtn');
  wishlistBtn?.addEventListener('click', () => {
    const isSaved = store.toggleWishlist(watch.id);
    wishlistBtn.innerHTML = `${icons.heart('', 16, isSaved)} ${isSaved ? 'Saved' : 'Save'}`;
    showToast(isSaved ? `Added ${watch.model} to Wishlist` : `Removed ${watch.model} from Wishlist`);
  });

  const compareBtn = document.getElementById('quickViewCompareBtn');
  compareBtn?.addEventListener('click', () => {
    const isComparing = store.toggleCompare(watch.id);
    compareBtn.innerHTML = `${icons.compare('', 16)} ${isComparing ? 'Comparing' : 'Compare'}`;
    showToast(isComparing ? `Added ${watch.model} to Comparison` : `Removed from Comparison`);
  });
}
