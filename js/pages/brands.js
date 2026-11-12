// HOROLOGY — Brands Directory Route Module
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';

export const brandsPage = {
  id: 'brands',
  path: '/brands',
  title: 'Horological Houses & Manufactures',

  render() {
    const brands = repository.getAllBrands();

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Brands & Manufactures' }
        ])}

        <div class="section-title-wrap">
          <span class="overline">Haute Horlogerie Heritage</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Preeminent Manufactures</h1>
          <p style="max-width: 680px; margin-top: var(--space-2);">
            Each house represents a distinct legacy of technical innovation, chronometric mastery, and enduring aesthetic design. Explore our curated collections by manufacture.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-8); margin-top: var(--space-8);">
          ${brands.map(brand => {
            const count = repository.getWatchesByBrand(brand.id).length;
            return `
              <div class="watch-card" style="padding: var(--space-8); display: grid; grid-template-columns: 1fr; gap: var(--space-6);">
                <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span class="overline">${brand.origin} &bull; Founded ${brand.founded}</span>
                    <span class="mono" style="font-size: var(--text-xs); color: var(--color-accent-primary);">${count} Vault References</span>
                  </div>
                  <h2 style="font-size: var(--text-3xl);">${brand.name}</h2>
                  <p style="font-family: var(--font-serif); font-size: var(--text-lg); font-style: italic; color: var(--color-accent-secondary);">
                    "${brand.tagline}"
                  </p>
                  <p style="font-size: var(--text-base); max-width: 720px; line-height: var(--leading-relaxed);">
                    ${brand.description}
                  </p>
                </div>

                <div style="display: flex; flex-direction: column; gap: var(--space-4); border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-6);">
                  <span class="overline" style="font-size: 11px;">Signature Model Families</span>
                  <div class="brand-family-pills">
                    ${brand.families.map(fam => `
                      <a href="#/brand/${brand.id}/${fam.id}" class="brand-family-card">
                        <div>
                          <strong style="color: var(--color-text-primary); display: block;">${fam.name}</strong>
                          <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${fam.description}</span>
                        </div>
                        <span style="color: var(--color-accent-primary);">${icons.arrowRight('', 14)}</span>
                      </a>
                    `).join('')}
                  </div>
                </div>

                <div style="display: flex; gap: var(--space-4); margin-top: var(--space-4);">
                  <a href="#/brand/${brand.id}" class="btn btn-primary">
                    Explore ${brand.name} Showcase ${icons.arrowRight('', 16)}
                  </a>
                  <a href="#/collection?brand=${brand.id}" class="btn btn-outline">
                    View All ${brand.name} Watches
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
};
