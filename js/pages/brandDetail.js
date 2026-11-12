// HOROLOGY — Brand & Family Landing Page Route Module (Panel 03)
import { repository } from '../data/repository.js';
import { renderWatchCard } from '../components/watchCard.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';
import { openQuickView } from '../components/quickView.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';

export const brandDetailPage = {
  id: 'brandDetail',
  path: '/brand/:brand',
  title(ctx) {
    const brand = repository.getBrandById(ctx.params.brand);
    return brand ? `${brand.name} — Haute Horlogerie Heritage` : 'Brand Showcase';
  },

  render(ctx) {
    const brandId = ctx.params.brand;
    const familyId = ctx.params.family;
    const brand = repository.getBrandById(brandId);

    if (!brand) {
      return `
        <div class="container section-spacer text-center">
          <h2>Manufacture Not Found</h2>
          <p class="mb-4">The requested brand house does not exist in our catalog.</p>
          <a href="#/brands" class="btn btn-primary">Browse All Brands</a>
        </div>
      `;
    }

    let watches = repository.getWatchesByBrand(brandId);
    let currentFamily = null;
    if (familyId) {
      currentFamily = brand.families.find(f => f.id.toLowerCase() === familyId.toLowerCase());
      if (currentFamily) {
        watches = repository.getWatchesByFamily(brandId, familyId);
      }
    }

    const breadcrumbItems = [
      { label: 'Home', href: '#/' },
      { label: 'Brands', href: '#/brands' },
      { label: brand.name, href: `#/brand/${brand.id}` }
    ];
    if (currentFamily) {
      breadcrumbItems.push({ label: currentFamily.name });
    }

    return `
      <!-- Brand Banner (Panel 03) -->
      <section class="brand-banner">
        <div class="container">
          ${renderBreadcrumbs(breadcrumbItems)}

          <div class="brand-hero-grid">
            <div>
              <span class="overline">${brand.origin} &bull; Founded ${brand.founded}</span>
              <h1 style="font-size: var(--text-4xl); margin: var(--space-2) 0 var(--space-3);">${brand.name}</h1>
              <p style="font-family: var(--font-serif); font-size: var(--text-xl); font-style: italic; color: var(--color-accent-secondary); margin-bottom: var(--space-4);">
                "${brand.tagline}"
              </p>
              <p style="font-size: var(--text-base); max-width: 640px; line-height: var(--leading-relaxed);">
                ${brand.description}
              </p>
            </div>

            <div style="background: var(--color-bg-card); border: 1px solid var(--color-border-hairline); border-radius: var(--radius-sm); padding: var(--space-6); text-align: center;">
              <span class="overline" style="font-size: 10px;">Atelier Verification</span>
              <h3 style="font-size: var(--text-xl); margin: var(--space-2) 0;">100% Certified</h3>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-4);">
                Every ${brand.name} timepiece in our vault undergoes serial audit, microscopic dial verification, and Witschi multi-position timing analysis.
              </p>
              <a href="#/authenticity" class="btn btn-outline btn-sm w-full">Inspect Standards</a>
            </div>
          </div>

          <!-- Model Family Filter Tabs -->
          <div style="margin-top: var(--space-8); border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-6);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--text-sm); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-primary);">
                Popular ${brand.name} Collections
              </h3>
              ${familyId ? `<a href="#/brand/${brand.id}" class="btn btn-ghost btn-sm">View All ${brand.name}</a>` : ''}
            </div>

            <div class="brand-family-pills">
              <a href="#/brand/${brand.id}" class="brand-family-card ${!familyId ? 'active' : ''}" style="${!familyId ? 'border-color: var(--color-accent-primary); background: var(--color-accent-subtle);' : ''}">
                <div>
                  <strong style="color: var(--color-text-primary); display: block;">All ${brand.name}</strong>
                  <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${repository.getWatchesByBrand(brand.id).length} Timepieces</span>
                </div>
              </a>
              ${brand.families.map(fam => {
                const famCount = repository.getWatchesByFamily(brand.id, fam.id).length;
                const isCurrent = familyId && familyId.toLowerCase() === fam.id.toLowerCase();
                return `
                  <a href="#/brand/${brand.id}/${fam.id}" class="brand-family-card ${isCurrent ? 'active' : ''}" style="${isCurrent ? 'border-color: var(--color-accent-primary); background: var(--color-accent-subtle);' : ''}">
                    <div>
                      <strong style="color: var(--color-text-primary); display: block;">${fam.name}</strong>
                      <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${famCount} Vault References</span>
                    </div>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Timepiece Listing -->
      <section class="container section-spacer" style="padding-top: 0;">
        <div class="collection-toolbar">
          <div>
            <span class="overline">${brand.name} ${currentFamily ? currentFamily.name : 'Vault'}</span>
            <h2>${watches.length} Available References</h2>
          </div>
          <a href="#/collection?brand=${brand.id}" class="btn btn-outline btn-sm">
            Open in Collection Filter ${icons.arrowRight('', 14)}
          </a>
        </div>

        <div class="watch-grid">
          ${watches.length > 0
            ? watches.map(watch => renderWatchCard(watch)).join('')
            : `
              <div style="grid-column: 1 / -1; padding: var(--space-12) 0; text-align: center; background: var(--color-bg-card); border-radius: var(--radius-sm); border: 1px solid var(--color-border-hairline);">
                <p>No watches currently in this specific family.</p>
                <a href="#/brand/${brand.id}" class="btn btn-primary btn-sm mt-4">View All ${brand.name}</a>
              </div>
            `
          }
        </div>
      </section>
    `;
  },

  mount() {
    const container = document.getElementById('app');
    if (!container) return;

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
