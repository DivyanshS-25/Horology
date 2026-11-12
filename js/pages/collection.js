// HOROLOGY — Collection Listing & Filters Route Module
import { repository } from '../data/repository.js';
import { renderWatchCard } from '../components/watchCard.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';
import { formatINR } from '../utils/formatters.js';
import { openQuickView } from '../components/quickView.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';

export const collectionPage = {
  id: 'collection',
  path: '/collection',
  title: 'The Collection — Exceptional Mechanical Timepieces',

  state: {
    search: '',
    brand: 'all',
    movement: 'all',
    minPrice: 0,
    maxPrice: 3500000,
    sort: 'featured'
  },

  render(ctx) {
    // Read initial filters from query params if available
    if (ctx.query.brand) this.state.brand = ctx.query.brand;
    if (ctx.query.movement) this.state.movement = ctx.query.movement;
    if (ctx.query.sort) this.state.sort = ctx.query.sort;

    const filteredWatches = this.getFilteredWatches();
    const allWatches = repository.getAllWatches();

    const brandCounts = {
      rolex: allWatches.filter(w => w.brandId === 'rolex').length,
      omega: allWatches.filter(w => w.brandId === 'omega').length,
      tudor: allWatches.filter(w => w.brandId === 'tudor').length,
      'grand-seiko': allWatches.filter(w => w.brandId === 'grand-seiko').length
    };

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'The Collection' }
        ])}

        <div class="section-title-wrap">
          <span class="overline">Pre-Owned Haute Horlogerie</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">The Collection</h1>
          <p style="max-width: 680px; margin-top: var(--space-2);">
            Exceptional mechanical timepieces, selected for the discerning collector. Every watch includes an acoustic timegrapher performance report, multi-point authenticity inspection, and transparent provenance.
          </p>
        </div>

        <!-- Search Bar (Panel 02) -->
        <div class="search-input-wrap mb-8">
          <span class="search-icon-pos">${icons.search('', 20)}</span>
          <input 
            type="search" 
            class="search-input" 
            id="collectionSearchInput" 
            placeholder="Search by brand, model, reference (e.g. Submariner, 311.30.42, Spring Drive)..." 
            value="${this.state.search}"
            aria-label="Search Collection"
          />
        </div>

        <div class="collection-layout">
          <!-- Filters Sidebar -->
          <aside class="filter-panel" aria-label="Collection Filters">
            <!-- Brand Filter -->
            <div class="filter-group">
              <h4 class="filter-heading">Brand</h4>
              <label class="filter-option">
                <span>
                  <input type="radio" name="brandFilter" value="all" class="filter-checkbox" ${this.state.brand === 'all' ? 'checked' : ''}>
                  All Houses
                </span>
                <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">${allWatches.length}</span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="brandFilter" value="rolex" class="filter-checkbox" ${this.state.brand === 'rolex' ? 'checked' : ''}>
                  Rolex
                </span>
                <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">(${brandCounts.rolex})</span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="brandFilter" value="omega" class="filter-checkbox" ${this.state.brand === 'omega' ? 'checked' : ''}>
                  Omega
                </span>
                <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">(${brandCounts.omega})</span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="brandFilter" value="tudor" class="filter-checkbox" ${this.state.brand === 'tudor' ? 'checked' : ''}>
                  Tudor
                </span>
                <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">(${brandCounts.tudor})</span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="brandFilter" value="grand-seiko" class="filter-checkbox" ${this.state.brand === 'grand-seiko' ? 'checked' : ''}>
                  Grand Seiko
                </span>
                <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">(${brandCounts['grand-seiko']})</span>
              </label>
            </div>

            <!-- Price Slider -->
            <div class="filter-group">
              <h4 class="filter-heading">
                Price Cap: <span class="mono" id="priceDisplay">${formatINR(this.state.maxPrice)}</span>
              </h4>
              <div class="range-slider-wrap">
                <input 
                  type="range" 
                  class="range-slider" 
                  id="priceRangeSlider" 
                  min="200000" 
                  max="3500000" 
                  step="50000" 
                  value="${this.state.maxPrice}" 
                />
                <div class="range-labels">
                  <span>₹2L</span>
                  <span>₹15L</span>
                  <span>₹35L+</span>
                </div>
              </div>
            </div>

            <!-- Movement Type Filter -->
            <div class="filter-group">
              <h4 class="filter-heading">Movement</h4>
              <label class="filter-option">
                <span>
                  <input type="radio" name="movementFilter" value="all" class="filter-checkbox" ${this.state.movement === 'all' ? 'checked' : ''}>
                  All Movements
                </span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="movementFilter" value="Automatic" class="filter-checkbox" ${this.state.movement === 'Automatic' ? 'checked' : ''}>
                  Automatic
                </span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="movementFilter" value="Manual Wind" class="filter-checkbox" ${this.state.movement === 'Manual Wind' ? 'checked' : ''}>
                  Manual Wind
                </span>
              </label>
              <label class="filter-option">
                <span>
                  <input type="radio" name="movementFilter" value="Spring Drive" class="filter-checkbox" ${this.state.movement === 'Spring Drive' ? 'checked' : ''}>
                  Spring Drive
                </span>
              </label>
            </div>

            <button class="btn btn-outline btn-sm w-full mt-4" id="resetFiltersBtn">
              Reset Filters
            </button>
          </aside>

          <!-- Listing Content -->
          <main>
            <!-- Toolbar -->
            <div class="collection-toolbar">
              <div class="mono" style="font-size: var(--text-sm); color: var(--color-text-secondary);">
                Showing <strong style="color: var(--color-text-primary);" id="watchCountDisplay">${filteredWatches.length}</strong> Timepieces
              </div>

              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <label for="sortSelector" style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted);">
                  Sort by:
                </label>
                <select class="select-custom" id="sortSelector" aria-label="Sort Collection">
                  <option value="featured" ${this.state.sort === 'featured' ? 'selected' : ''}>Featured Curations</option>
                  <option value="price-asc" ${this.state.sort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-desc" ${this.state.sort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="year-desc" ${this.state.sort === 'year-desc' ? 'selected' : ''}>Newest Production Year</option>
                  <option value="name-asc" ${this.state.sort === 'name-asc' ? 'selected' : ''}>Model Name (A–Z)</option>
                </select>
              </div>
            </div>

            <!-- Grid Container -->
            <div class="watch-grid" id="collectionWatchGrid">
              ${filteredWatches.length > 0 
                ? filteredWatches.map(watch => renderWatchCard(watch)).join('')
                : `
                  <div style="grid-column: 1 / -1; padding: var(--space-12) 0; text-align: center; background: var(--color-bg-card); border-radius: var(--radius-sm); border: 1px solid var(--color-border-hairline);">
                    <h3 style="margin-bottom: var(--space-2);">No matching timepieces</h3>
                    <p style="margin-bottom: var(--space-6);">Try adjusting your filter parameters or search keywords.</p>
                    <button class="btn btn-primary btn-sm" id="emptyResetBtn">Clear All Filters</button>
                  </div>
                `
              }
            </div>
          </main>
        </div>
      </div>
    `;
  },

  getFilteredWatches() {
    return repository.queryWatches({
      search: this.state.search,
      brand: this.state.brand,
      movement: this.state.movement,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      sort: this.state.sort
    });
  },

  updateList() {
    const list = this.getFilteredWatches();
    const grid = document.getElementById('collectionWatchGrid');
    const countDisplay = document.getElementById('watchCountDisplay');

    if (countDisplay) {
      countDisplay.textContent = list.length;
    }

    if (grid) {
      if (list.length > 0) {
        grid.innerHTML = list.map(watch => renderWatchCard(watch)).join('');
      } else {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: var(--space-12) 0; text-align: center; background: var(--color-bg-card); border-radius: var(--radius-sm); border: 1px solid var(--color-border-hairline);">
            <h3 style="margin-bottom: var(--space-2);">No matching timepieces</h3>
            <p style="margin-bottom: var(--space-6);">Try adjusting your filter parameters or search keywords.</p>
            <button class="btn btn-primary btn-sm" id="emptyResetBtn">Clear All Filters</button>
          </div>
        `;
        document.getElementById('emptyResetBtn')?.addEventListener('click', () => this.resetFilters());
      }
    }
  },

  resetFilters() {
    this.state = {
      search: '',
      brand: 'all',
      movement: 'all',
      minPrice: 0,
      maxPrice: 3500000,
      sort: 'featured'
    };

    const searchInput = document.getElementById('collectionSearchInput');
    if (searchInput) searchInput.value = '';

    const priceSlider = document.getElementById('priceRangeSlider');
    if (priceSlider) priceSlider.value = 3500000;

    const priceDisplay = document.getElementById('priceDisplay');
    if (priceDisplay) priceDisplay.textContent = formatINR(3500000);

    const brandAll = document.querySelector('input[name="brandFilter"][value="all"]');
    if (brandAll) brandAll.checked = true;

    const movementAll = document.querySelector('input[name="movementFilter"][value="all"]');
    if (movementAll) movementAll.checked = true;

    const sortSel = document.getElementById('sortSelector');
    if (sortSel) sortSel.value = 'featured';

    this.updateList();
  },

  mount() {
    const container = document.getElementById('app');
    if (!container) return;

    // Search input
    const searchInput = document.getElementById('collectionSearchInput');
    searchInput?.addEventListener('input', (e) => {
      this.state.search = e.target.value;
      this.updateList();
    });

    // Brand radio
    container.querySelectorAll('input[name="brandFilter"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.state.brand = e.target.value;
        this.updateList();
      });
    });

    // Movement radio
    container.querySelectorAll('input[name="movementFilter"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.state.movement = e.target.value;
        this.updateList();
      });
    });

    // Price slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceDisplay = document.getElementById('priceDisplay');
    priceSlider?.addEventListener('input', (e) => {
      this.state.maxPrice = Number(e.target.value);
      if (priceDisplay) priceDisplay.textContent = formatINR(this.state.maxPrice);
      this.updateList();
    });

    // Sort selector
    const sortSel = document.getElementById('sortSelector');
    sortSel?.addEventListener('change', (e) => {
      this.state.sort = e.target.value;
      this.updateList();
    });

    // Reset button
    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => this.resetFilters());
    document.getElementById('emptyResetBtn')?.addEventListener('click', () => this.resetFilters());

    // Event delegation for card actions
    this.cardClickHandler = (e) => {
      const target = e.target;

      const wishlistBtn = target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishlistBtn.dataset.id;
        const watch = repository.getWatchById(id);
        const isSaved = store.toggleWishlist(id);
        wishlistBtn.classList.toggle('active', isSaved);
        wishlistBtn.innerHTML = icons.heart('', 16, isSaved);
        showToast(isSaved ? `Added ${watch?.model || 'watch'} to Wishlist` : `Removed from Wishlist`);
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

    container.addEventListener('click', this.cardClickHandler);
  },

  unmount() {
    const container = document.getElementById('app');
    if (container && this.cardClickHandler) {
      container.removeEventListener('click', this.cardClickHandler);
    }
  }
};
