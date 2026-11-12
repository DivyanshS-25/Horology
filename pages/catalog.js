/**
 * HOROLOGY — Page Template: Catalog & Dedicated Brand Collections
 * Routes: #/collection, #/brands/rolex, #/brands/omega, #/brands/tudor, #/brands/grand-seiko
 * Direction C — Midnight Navy Precision Marketplace
 */

import { BRANDS, WATCHES, getWatchById } from '../js/data.js';
import { MarketplaceEngine, SORT_OPTIONS, PRICE_PRESETS, CASE_SIZE_PRESETS } from '../js/marketplace.js';
import { createWatchCard, createBreadcrumb, createStatusBadge, createRecentlyViewedShelf, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { formatPrice, escapeHTML, lockScroll, scrollToTop } from '../js/utilities.js';
import { store } from '../js/state.js';
import { quickView } from '../js/quick-view.js';

export let title = 'The Curated Collection';

// Central engine instance for Collection view
let engine = null;
let activeBrandFamilyFilter = null;

export async function render(ctx) {
  const brandSlug = ctx.params?.brand?.toLowerCase() || null;
  const brand = brandSlug ? BRANDS.find(b => b.id.toLowerCase() === brandSlug) : null;

  // --------------------------------------------------------------------------
  // BRANCH 1: FOUR DEDICATED BRAND PAGES (#/brands/:brand)
  // --------------------------------------------------------------------------
  if (brand) {
    title = `${brand.name} Collection — HOROLOGY`;
    activeBrandFamilyFilter = ctx.query?.family || null;

    let brandWatches = WATCHES.filter(w => w.brandId.toLowerCase() === brand.id.toLowerCase());
    if (activeBrandFamilyFilter) {
      brandWatches = brandWatches.filter(w => (w.family || '').toLowerCase() === activeBrandFamilyFilter.toLowerCase());
    }

    const featuredBrandWatches = brandWatches.filter(w => w.featured).slice(0, 2);
    const heroAsset = resolveAsset(brand.image || 'HZ-HERO-001');

    const breadcrumbs = [
      { label: 'Home', href: '#/' },
      { label: 'Manufactures', href: '#/collection' },
      { label: brand.name, href: `#/brands/${brand.id}` }
    ];

    return `
      <div class="brand-page-view">
        <!-- 1. Brand Hero Section -->
        <section class="brand-hero-section">
          <div class="container">
            ${createBreadcrumb(breadcrumbs)}

            <div class="max-w-narrow mb-6">
              <div class="flex items-center gap-3 mb-3">
                <span class="section-kicker">Haute Horlogerie Maison</span>
                <span class="badge badge-subtle font-mono">${brand.origin} &bull; Est. ${brand.founded}</span>
              </div>
              <h1 class="heading-1 mb-4">${escapeHTML(brand.name)} Collection</h1>
              <p class="lead-text mb-4">${escapeHTML(brand.description)}</p>

              <!-- Mandatory Non-Affiliation Legal Notice -->
              <div class="brand-non-affiliation-notice">
                HOROLOGY is an independent pre-owned watch marketplace and is not affiliated with, authorized by, or endorsed by ${escapeHTML(brand.name)} SA. All brand names, model lineages, and trademarks are used strictly for reference identification.
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Brand Introduction & Curation Notes -->
        <section class="section-spacer bg-primary border-bottom" style="border-color: var(--border-subtle);">
          <div class="container">
            <div class="two-column-split items-center">
              <div>
                <span class="overline mb-3">Curatorial Perspective</span>
                <h2 class="heading-2 mb-4">Independent Standards for ${escapeHTML(brand.name)}</h2>
                <p class="body-muted leading-relaxed mb-4">
                  ${escapeHTML(brand.curationNotes || brand.description)}
                </p>
                <p class="body-muted leading-relaxed mb-6">
                  Every pre-owned ${escapeHTML(brand.name)} timepiece in our vault has been deconstructed by certified horologists to verify balance wheel poise, hairspring geometry, and serial code alignment with period-correct factory records.
                </p>
                <div class="flex items-center gap-4">
                  <a href="#/collection" class="btn btn-outline btn-sm" id="viewAllInCollectionBtn">
                    View All in Collection (Filtered) &rarr;
                  </a>
                </div>
              </div>

              <div class="p-8 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
                <span class="overline mb-3 block text-accent">Maison Benchmarks</span>
                <div class="spec-list">
                  <div class="spec-row"><span class="spec-label">Manufacture Head</span><span class="spec-value">${escapeHTML(brand.origin)}</span></div>
                  <div class="spec-row"><span class="spec-label">Active References</span><span class="spec-value font-mono">${brandWatches.length} Curated</span></div>
                  <div class="spec-row"><span class="spec-label">Warranty</span><span class="spec-value text-accent">24-Month Mechanical</span></div>
                  <div class="spec-row"><span class="spec-label">Inspection</span><span class="spec-value text-verified">7-Stage Passed</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Model Family Navigation -->
        <section class="section-spacer-sm bg-secondary border-bottom" style="border-color: var(--border-subtle);">
          <div class="container">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span class="section-kicker">Reference Families</span>
              <span class="font-mono text-xs text-muted">Select a family lineage to filter:</span>
            </div>

            <div class="brand-family-pills-bar">
              <button type="button" class="brand-family-pill ${!activeBrandFamilyFilter ? 'active' : ''}" data-family="">
                All ${escapeHTML(brand.name)} (${WATCHES.filter(w => w.brandId === brand.id).length})
              </button>
              ${brand.families.map(fam => `
                <button type="button" class="brand-family-pill ${activeBrandFamilyFilter === fam.name ? 'active' : ''}" data-family="${escapeHTML(fam.name)}">
                  ${escapeHTML(fam.name)}
                </button>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 4. Featured Brand Spotlight (2-Column) -->
        ${featuredBrandWatches.length > 0 ? `
          <section class="section-spacer bg-primary border-bottom" style="border-color: var(--border-subtle);">
            <div class="container">
              <div class="section-header text-center mb-10">
                <span class="section-kicker">Signature References</span>
                <h2 class="heading-2">${escapeHTML(brand.name)} Curatorial Spotlight</h2>
                <p>Two landmark demonstration timepieces exemplifying the manufacture's engineering excellence.</p>
              </div>

              <div class="grid-12 gap-8">
                ${featuredBrandWatches.map(watch => `
                  <div class="col-span-6 p-8 bg-surface border flex flex-col" style="border-color: var(--border-strong); border-radius: var(--radius-sm);">
                    <div class="flex items-center justify-between mb-4">
                      <span class="meta-label">${escapeHTML(watch.family)}</span>
                      ${createStatusBadge(watch.inspectionStatus || 'Inspected')}
                    </div>
                    <h3 class="font-serif text-2xl text-primary mb-1">${escapeHTML(watch.model)}</h3>
                    <p class="font-mono text-xs text-muted mb-4">Ref. ${escapeHTML(watch.reference)} &bull; ${watch.year}</p>
                    
                    <div class="aspect-16-9 bg-secondary border mb-6 flex items-center justify-center overflow-hidden" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                      <img src="${resolveAsset(watch.image, { title: watch.brand, subtitle: watch.model })}" alt="${escapeHTML(watch.model)}" class="w-full h-full object-contain p-4">
                    </div>

                    <div class="font-mono text-xl font-bold text-primary mb-3">${formatPrice(watch.price)}</div>
                    <p class="body-muted text-sm leading-relaxed mb-6">${escapeHTML(watch.summary)}</p>

                    <div class="flex items-center gap-3 mt-auto">
                      <a href="#/watch/${watch.slug}" class="btn btn-primary flex-1">View Full Details</a>
                      <button type="button" class="btn btn-secondary btn-icon" data-action="quick-view" data-id="${watch.id}">
                        ${ICONS.eye}
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 5. Brand Collection Preview Grid -->
        <section class="section-spacer bg-secondary border-bottom" style="border-color: var(--border-subtle);">
          <div class="container">
            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <span class="section-kicker">${escapeHTML(brand.name)} Showcase</span>
                <h2 class="heading-2">${activeBrandFamilyFilter ? escapeHTML(activeBrandFamilyFilter) : 'All Available References'}</h2>
              </div>
              <span class="badge badge-subtle font-mono">${brandWatches.length} Timepieces</span>
            </div>

            <div class="watch-grid">
              ${brandWatches.map(watch => createWatchCard(watch)).join('')}
            </div>
          </div>
        </section>

        <!-- 6. Brand Collection CTA -->
        <section class="section-spacer bg-primary text-center">
          <div class="container max-w-narrow mx-auto" style="margin-left: auto; margin-right: auto;">
            <span class="overline mb-3 text-accent">BESPOKE HOROLOGICAL SOURCING</span>
            <h2 class="heading-2 mb-4">Looking for a Specific ${escapeHTML(brand.name)} Reference?</h2>
            <p class="lead-text mb-8" style="font-size: var(--text-base);">
              If your desired reference or vintage year is not in our live vault, commission our private client concierge to locate an unpolished, certified example.
            </p>
            <div class="flex items-center justify-center gap-4 flex-wrap">
              <a href="#/collection" class="btn btn-primary btn-lg" id="brandExploreAllBtn">Explore All in Marketplace</a>
              <a href="#/contact" class="btn btn-outline btn-lg">Request Private Sourcing</a>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // BRANCH 2: MAIN COLLECTION MARKETPLACE (#/collection)
  // --------------------------------------------------------------------------
  title = 'The Curated Collection — HOROLOGY';

  if (!engine) {
    engine = new MarketplaceEngine(WATCHES);
  }

  // Check if we need to preseed from query
  if (ctx.query?.brand) {
    const brandMatch = BRANDS.find(b => b.id.toLowerCase() === ctx.query.brand.toLowerCase());
    if (brandMatch) {
      engine.preseedManufacturer(brandMatch.name);
    }
  }

  const res = engine.execute();

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Collection', href: '#/collection' }
  ];

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Collection Header -->
      <header class="marketplace-header">
        <div class="flex items-center gap-3 mb-2">
          <span class="section-kicker">Live Observatory Vault</span>
          <span class="badge badge-subtle font-mono" id="resultsCountBadge">${res.totalItems} Timepieces</span>
        </div>
        <h1 class="heading-1 mb-3">The Curated Collection</h1>
        <p class="lead-text" style="max-width: 780px;">
          Certified pre-owned mechanical chronometers from Rolex, Omega, Tudor, and Grand Seiko. Each timepiece is accompanied by complete timegrapher acoustic telemetry and an archival inspection dossier.
        </p>
      </header>

      <!-- Marketplace Control Bar -->
      <div class="marketplace-toolbar">
        <!-- Search Input with Clear Button -->
        <div class="marketplace-search-box">
          <span class="marketplace-search-icon">${ICONS.search}</span>
          <input type="search" id="catalogSearchInput" class="marketplace-search-input" placeholder="Search by manufacturer, model, reference, or calibre..." value="${escapeHTML(res.state.searchQuery)}" autocomplete="off" spellcheck="false">
          ${res.state.searchQuery ? `
            <button type="button" class="marketplace-search-clear" id="catalogSearchClearBtn" aria-label="Clear Search">
              ${ICONS.close}
            </button>
          ` : ''}
        </div>

        <!-- Mobile Filter Drawer Trigger Button -->
        <button type="button" class="btn btn-secondary marketplace-mobile-filter-btn" id="openMobileFiltersBtn">
          ${ICONS.filter}
          <span>Filters (${res.activeFilterCount})</span>
        </button>

        <!-- Sort Selector -->
        <div class="marketplace-sort-wrapper">
          <label for="catalogSortSelect" class="sr-only">Sort Timepieces</label>
          <select id="catalogSortSelect" class="marketplace-sort-select">
            ${SORT_OPTIONS.map(opt => `
              <option value="${opt.id}" ${res.state.sortBy === opt.id ? 'selected' : ''}>
                ${opt.label}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Active Filter Summary Strip -->
      ${res.activeFilterCount > 0 ? `
        <div class="active-filters-bar" id="activeFiltersBar">
          <span class="meta-label" style="font-size: 0.68rem; margin-right: 4px;">Active:</span>
          ${res.activeFilters.map(pill => `
            <span class="active-filter-chip">
              <span>${escapeHTML(pill.label)}</span>
              <button type="button" class="active-filter-chip-remove" data-remove-filter="${pill.category}" data-val="${escapeHTML(pill.value)}" aria-label="Remove ${escapeHTML(pill.label)}">
                ${ICONS.close}
              </button>
            </span>
          `).join('')}
          <button type="button" class="active-filters-clear-btn" id="clearAllFiltersBtn">Clear All Filters</button>
        </div>
      ` : ''}

      <!-- Main Marketplace Layout (Desktop Sidebar + Grid) -->
      <div class="marketplace-layout">
        <!-- Desktop Sidebar Rail (8 Filter Dimensions) -->
        <aside class="filter-sidebar" aria-label="Filter Collection">
          <div class="flex items-center justify-between mb-4 pb-3 border-bottom" style="border-color: var(--border-subtle);">
            <span class="font-sans font-bold text-xs uppercase tracking-wider text-primary">Filter Vault</span>
            ${res.activeFilterCount > 0 ? `
              <button type="button" class="font-mono text-xs text-accent underline cursor-pointer" id="sidebarResetFiltersBtn">Reset (${res.activeFilterCount})</button>
            ` : ''}
          </div>

          <!-- 1. Manufacturer -->
          <details class="filter-group" open>
            <summary class="filter-group-header">
              <span>Manufacturer</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="filter-options-list">
              ${['Rolex', 'Omega', 'Tudor', 'Grand Seiko'].map(brandName => `
                <label class="filter-checkbox-label">
                  <span class="filter-checkbox-custom">
                    <input type="checkbox" class="filter-checkbox" data-facet="manufacturers" value="${brandName}" ${res.state.filters.manufacturers.includes(brandName) ? 'checked' : ''}>
                    <span>${brandName}</span>
                  </span>
                  <span class="filter-count-badge">(${res.facetCounts.manufacturers[brandName] || 0})</span>
                </label>
              `).join('')}
            </div>
          </details>

          <!-- 2. Price Range (INR) -->
          <details class="filter-group" open>
            <summary class="filter-group-header">
              <span>Price Range (INR)</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="preset-chips-grid">
              ${PRICE_PRESETS.map(preset => `
                <button type="button" class="preset-chip-btn ${res.state.filters.activePricePreset === preset.id ? 'active' : ''}" data-price-preset="${preset.id}">
                  ${preset.label}
                </button>
              `).join('')}
            </div>
            <div class="range-inputs-row">
              <input type="number" id="minPriceInput" class="range-input" placeholder="Min ₹" value="${res.state.filters.minPrice !== null ? res.state.filters.minPrice : ''}">
              <span class="text-muted text-xs">&ndash;</span>
              <input type="number" id="maxPriceInput" class="range-input" placeholder="Max ₹" value="${res.state.filters.maxPrice !== null ? res.state.filters.maxPrice : ''}">
            </div>
          </details>

          <!-- 3. Movement Type -->
          <details class="filter-group" open>
            <summary class="filter-group-header">
              <span>Movement Type</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="filter-options-list">
              ${['Automatic', 'Manual', 'Spring Drive', 'Quartz'].map(m => `
                <label class="filter-checkbox-label">
                  <span class="filter-checkbox-custom">
                    <input type="checkbox" class="filter-checkbox" data-facet="movements" value="${m}" ${res.state.filters.movements.includes(m) ? 'checked' : ''}>
                    <span>${m}</span>
                  </span>
                  <span class="filter-count-badge">(${res.facetCounts.movements[m] || 0})</span>
                </label>
              `).join('')}
            </div>
          </details>

          <!-- 4. Watch Type / Category -->
          <details class="filter-group">
            <summary class="filter-group-header">
              <span>Watch Type</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="filter-options-list">
              ${['Diver', 'Chronograph', 'Dress', 'GMT', 'Field', 'Sports'].map(t => `
                <label class="filter-checkbox-label">
                  <span class="filter-checkbox-custom">
                    <input type="checkbox" class="filter-checkbox" data-facet="watchTypes" value="${t}" ${res.state.filters.watchTypes.includes(t) ? 'checked' : ''}>
                    <span>${t}</span>
                  </span>
                  <span class="filter-count-badge">(${res.facetCounts.watchTypes[t] || 0})</span>
                </label>
              `).join('')}
            </div>
          </details>

          <!-- 5. Condition Grade -->
          <details class="filter-group">
            <summary class="filter-group-header">
              <span>Condition Grade</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="filter-options-list">
              ${['Unworn', 'Excellent', 'Very Good', 'Good'].map(c => `
                <label class="filter-checkbox-label">
                  <span class="filter-checkbox-custom">
                    <input type="checkbox" class="filter-checkbox" data-facet="conditions" value="${c}" ${res.state.filters.conditions.includes(c) ? 'checked' : ''}>
                    <span>${c}</span>
                  </span>
                  <span class="filter-count-badge">(${res.facetCounts.conditions[c] || 0})</span>
                </label>
              `).join('')}
            </div>
          </details>

          <!-- 6. Case Size (mm) -->
          <details class="filter-group">
            <summary class="filter-group-header">
              <span>Case Diameter</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="preset-chips-grid">
              ${CASE_SIZE_PRESETS.map(preset => `
                <button type="button" class="preset-chip-btn ${res.state.filters.activeSizePreset === preset.id ? 'active' : ''}" data-size-preset="${preset.id}">
                  ${preset.label}
                </button>
              `).join('')}
            </div>
            <div class="range-inputs-row">
              <input type="number" id="minCaseSizeInput" class="range-input" placeholder="Min mm" value="${res.state.filters.minCaseSize || ''}">
              <span class="text-muted text-xs">&ndash;</span>
              <input type="number" id="maxCaseSizeInput" class="range-input" placeholder="Max mm" value="${res.state.filters.maxCaseSize || ''}">
            </div>
          </details>

          <!-- 7. Documentation -->
          <details class="filter-group">
            <summary class="filter-group-header">
              <span>Documentation</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="filter-options-list">
              ${['Box and Papers', 'Original Box', 'Original Papers', 'Watch Only'].map(d => `
                <label class="filter-checkbox-label">
                  <span class="filter-checkbox-custom">
                    <input type="checkbox" class="filter-checkbox" data-facet="documentation" value="${d}" ${res.state.filters.documentation.includes(d) ? 'checked' : ''}>
                    <span>${d}</span>
                  </span>
                  <span class="filter-count-badge">(${res.facetCounts.documentation[d] || 0})</span>
                </label>
              `).join('')}
            </div>
          </details>

          <!-- 8. Inspection Status -->
          <details class="filter-group">
            <summary class="filter-group-header">
              <span>Inspection Status</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor"><path d="M1 1l4 4 4-4"/></svg>
            </summary>
            <div class="filter-options-list">
              ${['Inspected', 'Inspection Pending'].map(i => `
                <label class="filter-checkbox-label">
                  <span class="filter-checkbox-custom">
                    <input type="checkbox" class="filter-checkbox" data-facet="inspection" value="${i}" ${res.state.filters.inspection.includes(i) ? 'checked' : ''}>
                    <span>${i}</span>
                  </span>
                  <span class="filter-count-badge">(${res.facetCounts.inspection[i] || 0})</span>
                </label>
              `).join('')}
            </div>
          </details>
        </aside>

        <!-- Right: Product Grid & Pagination Area -->
        <div class="marketplace-main-content">
          ${res.totalItems > 0 ? `
            <div class="watch-grid" id="marketplaceProductGrid">
              ${res.items.map(watch => createWatchCard(watch)).join('')}
            </div>

            <!-- Client-Side Pagination -->
            ${res.totalPages > 1 ? `
              <div class="marketplace-pagination">
                <span class="font-mono text-xs text-muted">
                  Showing ${res.startIndex}&ndash;${res.endIndex} of ${res.totalItems} Timepieces
                </span>

                <div class="pagination-pages">
                  <button type="button" class="pagination-btn" id="prevPageBtn" ${res.currentPage === 1 ? 'disabled aria-disabled="true"' : ''} aria-label="Previous Page">
                    &larr;
                  </button>

                  ${Array.from({ length: res.totalPages }, (_, i) => i + 1).map(p => `
                    <button type="button" class="pagination-btn ${res.currentPage === p ? 'active' : ''}" data-page="${p}" aria-label="Page ${p}">
                      ${p}
                    </button>
                  `).join('')}

                  <button type="button" class="pagination-btn" id="nextPageBtn" ${res.currentPage === res.totalPages ? 'disabled aria-disabled="true"' : ''} aria-label="Next Page">
                    &rarr;
                  </button>
                </div>
              </div>
            ` : ''}
          ` : `
            <!-- Empty Results State -->
            <div class="empty-state">
              <div class="empty-state-icon">${ICONS.balance}</div>
              <h2 class="heading-2 mb-2 font-serif">Zero Timepieces Match Your Criteria</h2>
              <p class="body-muted mb-6" style="max-width: 480px; margin-left: auto; margin-right: auto;">
                No mechanical references match your active search and filter combinations in the live vault. Try adjusting your parameters or reset all filters.
              </p>
              <button type="button" class="btn btn-primary" id="emptyStateResetBtn">
                Reset All Filters
              </button>
            </div>
          `}
        </div>
      </div>

      <!-- RECENTLY VIEWED SHELF (When History Is Non-Empty) -->
      ${(() => {
        const recentIds = store.getRecentlyViewed();
        const recentWatches = recentIds.map(id => getWatchById(id)).filter(Boolean).slice(0, 4);
        return recentWatches.length > 0 ? `
          <div style="margin-top: var(--space-12); border-top: 1px solid var(--border-subtle); padding-top: var(--space-8);">
            ${createRecentlyViewedShelf(recentWatches, { title: 'Recently Examined Timepieces', kicker: 'Observatory History' })}
          </div>
        ` : '';
      })()}
    </div>

    <!-- Mobile Slide-Over Filter Drawer -->
    <div class="mobile-filter-drawer" id="mobileFilterDrawer" role="dialog" aria-modal="true" aria-label="Filter Options">
      <div class="modal-backdrop" id="mobileFilterBackdrop"></div>
      <div class="mobile-filter-drawer-panel">
        <div class="mobile-filter-drawer-header">
          <span class="font-sans font-bold text-xs uppercase tracking-wider text-primary">Filters (${res.activeFilterCount})</span>
          <button type="button" class="action-badge-btn" id="closeMobileFilterBtn" aria-label="Close Filters">
            ${ICONS.close}
          </button>
        </div>

        <div class="mobile-filter-drawer-body">
          <!-- We clone the same filter accordions into mobile drawer -->
          <div class="filter-group">
            <span class="font-sans font-bold text-xs uppercase block mb-3 text-accent">Manufacturer</span>
            <div class="filter-options-list">
              ${['Rolex', 'Omega', 'Tudor', 'Grand Seiko'].map(b => `
                <label class="filter-checkbox-label">
                  <span>${b}</span>
                  <input type="checkbox" class="filter-checkbox" data-facet="manufacturers" value="${b}" ${res.state.filters.manufacturers.includes(b) ? 'checked' : ''}>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="filter-group">
            <span class="font-sans font-bold text-xs uppercase block mb-3 text-accent">Movement Type</span>
            <div class="filter-options-list">
              ${['Automatic', 'Manual', 'Spring Drive', 'Quartz'].map(m => `
                <label class="filter-checkbox-label">
                  <span>${m}</span>
                  <input type="checkbox" class="filter-checkbox" data-facet="movements" value="${m}" ${res.state.filters.movements.includes(m) ? 'checked' : ''}>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="mobile-filter-drawer-footer">
          <button type="button" class="btn btn-outline flex-1" id="mobileResetFiltersBtn">Reset</button>
          <button type="button" class="btn btn-primary flex-1" id="mobileApplyFiltersBtn">Apply (${res.totalItems})</button>
        </div>
      </div>
    </div>
  `;
}

export function mount(ctx) {
  const brandSlug = ctx.params?.brand?.toLowerCase() || null;

  // --------------------------------------------------------------------------
  // MOUNT HANDLERS FOR BRAND PAGES
  // --------------------------------------------------------------------------
  if (brandSlug) {
    // Model family pill clicks
    document.querySelectorAll('.brand-family-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const fam = btn.getAttribute('data-family');
        if (fam) {
          window.location.hash = `#/brands/${brandSlug}?family=${encodeURIComponent(fam)}`;
        } else {
          window.location.hash = `#/brands/${brandSlug}`;
        }
      });
    });

    // View All In Collection
    const viewAllBtn = document.getElementById('viewAllInCollectionBtn') || document.getElementById('brandExploreAllBtn');
    viewAllBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = `#/collection?brand=${brandSlug}`;
    });

    bindCardInteractions();
    return;
  }

  // --------------------------------------------------------------------------
  // MOUNT HANDLERS FOR MAIN COLLECTION MARKETPLACE
  // --------------------------------------------------------------------------
  if (!engine) return;

  // Search input debounced listener
  const searchInput = document.getElementById('catalogSearchInput');
  let searchTimeout = null;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      engine.setSearchQuery(e.target.value);
      rerenderMarketplace(ctx);
    }, 200);
  });

  // Search Clear button
  document.getElementById('catalogSearchClearBtn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    engine.setSearchQuery('');
    rerenderMarketplace(ctx);
  });

  // Sort Select listener
  document.getElementById('catalogSortSelect')?.addEventListener('change', (e) => {
    engine.setSortBy(e.target.value);
    rerenderMarketplace(ctx);
  });

  // Checkbox facet filters
  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const facet = cb.getAttribute('data-facet');
      const val = cb.value;
      if (facet && val) {
        engine.toggleFilter(facet, val);
        rerenderMarketplace(ctx);
      }
    });
  });

  // Price Presets
  document.querySelectorAll('[data-price-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-price-preset');
      engine.setPricePreset(presetId);
      rerenderMarketplace(ctx);
    });
  });

  // Custom Price inputs
  const minPriceInput = document.getElementById('minPriceInput');
  const maxPriceInput = document.getElementById('maxPriceInput');
  const handleCustomPrice = () => {
    engine.setCustomPriceRange(minPriceInput?.value, maxPriceInput?.value);
    rerenderMarketplace(ctx);
  };
  minPriceInput?.addEventListener('change', handleCustomPrice);
  maxPriceInput?.addEventListener('change', handleCustomPrice);

  // Size Presets
  document.querySelectorAll('[data-size-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-size-preset');
      engine.setSizePreset(presetId);
      rerenderMarketplace(ctx);
    });
  });

  // Custom Size inputs
  const minSizeInput = document.getElementById('minCaseSizeInput');
  const maxSizeInput = document.getElementById('maxCaseSizeInput');
  const handleCustomSize = () => {
    engine.setCustomCaseSizeRange(minSizeInput?.value, maxSizeInput?.value);
    rerenderMarketplace(ctx);
  };
  minSizeInput?.addEventListener('change', handleCustomSize);
  maxSizeInput?.addEventListener('change', handleCustomSize);

  // Remove individual active filter chip
  document.querySelectorAll('[data-remove-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-remove-filter');
      const val = btn.getAttribute('data-val');
      engine.removeFilter(cat, val);
      rerenderMarketplace(ctx);
    });
  });

  // Clear all filters
  const resetBtns = [
    document.getElementById('clearAllFiltersBtn'),
    document.getElementById('sidebarResetFiltersBtn'),
    document.getElementById('emptyStateResetBtn'),
    document.getElementById('mobileResetFiltersBtn')
  ];
  resetBtns.forEach(b => {
    b?.addEventListener('click', () => {
      engine.resetFilters();
      rerenderMarketplace(ctx);
    });
  });

  // Pagination buttons
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.getAttribute('data-page');
      engine.setPage(page);
      rerenderMarketplace(ctx);
      scrollToTop();
    });
  });

  document.getElementById('prevPageBtn')?.addEventListener('click', () => {
    const cur = engine.getState().currentPage;
    engine.setPage(cur - 1);
    rerenderMarketplace(ctx);
    scrollToTop();
  });

  document.getElementById('nextPageBtn')?.addEventListener('click', () => {
    const cur = engine.getState().currentPage;
    engine.setPage(cur + 1);
    rerenderMarketplace(ctx);
    scrollToTop();
  });

  // Mobile Filter Drawer Handlers
  const mobileDrawer = document.getElementById('mobileFilterDrawer');
  document.getElementById('openMobileFiltersBtn')?.addEventListener('click', () => {
    mobileDrawer?.classList.add('open');
    lockScroll(true);
  });

  const closeMobileDrawer = () => {
    mobileDrawer?.classList.remove('open');
    lockScroll(false);
  };
  document.getElementById('closeMobileFilterBtn')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('mobileFilterBackdrop')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('mobileApplyFiltersBtn')?.addEventListener('click', closeMobileDrawer);

  bindCardInteractions();
}

async function rerenderMarketplace(ctx) {
  const root = document.getElementById('app');
  if (!root) return;
  const html = await render(ctx);
  root.innerHTML = html;
  mount(ctx);
}

function bindCardInteractions() {
  // Quick View click trigger
  document.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const watch = WATCHES.find(w => w.id === id);
      if (watch) {
        quickView.open(watch);
      }
    });
  });

  // Wishlist toggle
  document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        const added = store.toggleWishlist(id);
        btn.innerHTML = added ? ICONS.heartFilled : ICONS.heart;
        btn.classList.toggle('active', added);
      }
    });
  });

  // Compare toggle
  document.querySelectorAll('[data-action="toggle-compare"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        const res = store.toggleCompare(id);
        btn.classList.toggle('active', res.added);
      }
    });
  });

  // Telemetry drawer mobile toggle
  document.querySelectorAll('[data-action="toggle-telemetry"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.card-watch');
      if (card) {
        card.classList.toggle('telemetry-open');
      }
    });
  });
}
