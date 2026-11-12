// HOROLOGY — Watch Card Component
import { formatINR, escapeHtml } from '../utils/formatters.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';
import { icons } from '../utils/svgIcons.js';
import { store } from '../core/store.js';

export function renderWatchCard(watch) {
  const inWishlist = store.isInWishlist(watch.id);
  const inCompare = store.isInCompare(watch.id);

  const svgVisual = generateWatchSvg(watch.visualType || 'diver', {
    dialColor: watch.dialTone || '#0B192A',
    bezelColor: watch.bezelTone || '#263A50',
    brand: watch.brand
  });

  return `
    <article class="watch-card" data-watch-id="${watch.id}">
      <!-- Media Area -->
      <div class="watch-card-media">
        <a href="#/watch/${watch.slug}" class="watch-card-img" aria-label="View details for ${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}">
          ${svgVisual}
        </a>

        <!-- Card Actions -->
        <div class="watch-card-actions">
          <button 
            class="card-action-btn ${inWishlist ? 'active' : ''}" 
            data-action="wishlist" 
            data-id="${watch.id}" 
            title="${inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}"
            aria-label="${inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}">
            ${icons.heart('', 16, inWishlist)}
          </button>
          <button 
            class="card-action-btn ${inCompare ? 'active' : ''}" 
            data-action="compare" 
            data-id="${watch.id}" 
            title="${inCompare ? 'Remove from comparison' : 'Add to comparison'}"
            aria-label="${inCompare ? 'Remove from comparison' : 'Add to comparison'}">
            ${icons.compare('', 16)}
          </button>
        </div>

        <!-- Quick View Overlay -->
        <button class="watch-card-quickview-btn" data-action="quickview" data-id="${watch.id}">
          Quick View
        </button>
      </div>

      <!-- Card Body -->
      <div class="watch-card-body">
        <div class="watch-card-brand">${escapeHtml(watch.brand)}</div>
        <h3 class="watch-card-title">
          <a href="#/watch/${watch.slug}">${escapeHtml(watch.model)}</a>
        </h3>
        <div class="watch-card-ref">Ref. ${escapeHtml(watch.referenceNumber)} &bull; ${watch.year}</div>

        <div class="watch-card-footer">
          <span class="watch-card-price">${formatINR(watch.price)}</span>
          <span class="badge badge-verified">
            ${icons.check('', 12)} ${escapeHtml(watch.heroBadge || 'Verified')}
          </span>
        </div>
      </div>
    </article>
  `;
}
