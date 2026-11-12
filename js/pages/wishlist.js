// HOROLOGY — Wishlist & Saved Timepieces Route Module (Panel 12)
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { renderWatchCard } from '../components/watchCard.js';
import { store } from '../core/store.js';
import { icons } from '../utils/svgIcons.js';
import { showToast } from '../components/toast.js';
import { openQuickView } from '../components/quickView.js';

export const wishlistPage = {
  id: 'wishlist',
  path: '/wishlist',
  title: 'My Saved Timepieces & Wishlist',

  render() {
    const savedIds = store.getWishlist();
    let savedWatches = savedIds
      .map(id => repository.getWatchById(id))
      .filter(Boolean);

    // If wishlist is empty, populate 3 demonstration watches so the screen is immediately usable
    let isDemonstrationDefault = false;
    if (savedWatches.length === 0) {
      savedWatches = [
        repository.getWatchById('rolex-submariner-date-126610ln'),
        repository.getWatchById('omega-speedmaster-pro-311-30-42-30-01-001'),
        repository.getWatchById('grand-seiko-snowflake-sbga211')
      ].filter(Boolean);
      isDemonstrationDefault = true;
    }

    const recentIds = store.getRecentlyViewed();
    const recentWatches = recentIds
      .map(id => repository.getWatchById(id))
      .filter(Boolean)
      .slice(0, 4);

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Saved Timepieces' }
        ])}

        <div class="section-title-wrap">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <span class="overline">Private Collector Vault</span>
              <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">
                My Wishlist (<span id="wishlistCountDisplay">${savedWatches.length}</span>)
              </h1>
            </div>
            <div style="display: flex; gap: var(--space-3); align-items: center;">
              ${!isDemonstrationDefault ? `
                <button class="btn btn-outline btn-sm" id="clearWishlistBtn">
                  Clear All Saved
                </button>
              ` : `
                <span class="badge badge-demonstration">Showing Default Curations</span>
              `}
              <a href="#/collection" class="btn btn-primary btn-sm">
                Browse Collection ${icons.arrowRight('', 14)}
              </a>
            </div>
          </div>
          <p style="max-width: 680px; margin-top: var(--space-2);">
            Your personal curation of tracked timepieces. Saved items persist across sessions in your browser's private local storage.
          </p>
        </div>

        <!-- Saved Watches Grid (Panel 12) -->
        <div class="watch-grid mb-12" id="wishlistGrid">
          ${savedWatches.map(watch => renderWatchCard(watch)).join('')}
        </div>

        <!-- Recently Viewed Section -->
        ${recentWatches.length > 0 ? `
          <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-12);">
            <div class="collection-toolbar">
              <div>
                <span class="overline">Browsing History</span>
                <h2>Recently Inspected References</h2>
              </div>
            </div>
            <div class="watch-grid">
              ${recentWatches.map(watch => renderWatchCard(watch)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  mount(ctx) {
    const container = document.getElementById('app');
    if (!container) return;

    // Card interactions
    this.cardHandler = (e) => {
      const target = e.target;

      const wishlistBtn = target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishlistBtn.dataset.id;
        store.toggleWishlist(id);
        showToast('Wishlist updated');
        ctx.router.handleRouting();
        return;
      }

      const compareBtn = target.closest('[data-action="compare"]');
      if (compareBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = compareBtn.dataset.id;
        const watch = repository.getWatchById(id);
        const isComparing = store.toggleCompare(id);
        compareBtn.classList.toggle('active', isComparing);
        showToast(isComparing ? `Added ${watch?.model || 'watch'} to Comparison` : `Removed from Comparison`);
        return;
      }

      const quickBtn = target.closest('[data-action="quickview"]');
      if (quickBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = quickBtn.dataset.id;
        openQuickView(id);
        return;
      }
    };

    container.addEventListener('click', this.cardHandler);

    document.getElementById('clearWishlistBtn')?.addEventListener('click', () => {
      const current = store.getWishlist();
      current.forEach(id => store.toggleWishlist(id));
      showToast('Wishlist cleared');
      ctx.router.handleRouting();
    });
  },

  unmount() {
    const container = document.getElementById('app');
    if (container && this.cardHandler) {
      container.removeEventListener('click', this.cardHandler);
    }
  }
};
