// HOROLOGY — Collector's Journal Landing Route Module (Panel 11)
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';
import { formatDate } from '../utils/formatters.js';

export const journalPage = {
  id: 'journal',
  path: '/journal',
  title: 'Collector\'s Journal — Insights & Horological Guides',

  render(ctx) {
    const selectedCat = ctx.params.cat || 'All';
    let articles = repository.getAllArticles();

    if (selectedCat !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === selectedCat.toLowerCase());
    }

    const categories = ['All', 'Movements', 'Collecting', 'Buying Guides', 'Brand Histories'];

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Collector\'s Journal' }
        ])}

        <!-- Header (Panel 11) -->
        <div class="section-title-wrap">
          <span class="overline">Editorial &amp; Horological Scholarship</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Collector's Journal</h1>
          <p style="max-width: 680px; margin-top: var(--space-2);">
            Insights, guides, and technical essays from the world of haute horlogerie. Written by watchmakers and certified appraisers for discerning collectors.
          </p>
        </div>

        <!-- Category Filter Pills (Panel 11) -->
        <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-10);">
          ${categories.map(cat => {
            const isCatActive = selectedCat.toLowerCase() === cat.toLowerCase();
            const href = cat === 'All' ? '#/journal' : `#/journal/category/${cat.toLowerCase().replace(/\s+/g, '-')}`;
            return `
              <a href="${href}" class="btn btn-outline btn-sm ${isCatActive ? 'active' : ''}" style="${isCatActive ? 'border-color: var(--color-accent-primary); background: var(--color-accent-subtle); color: var(--color-text-primary);' : ''}">
                ${cat}
              </a>
            `;
          }).join('')}
        </div>

        <!-- Articles Grid (Panel 11) -->
        <div class="journal-grid">
          ${articles.map(art => `
            <article class="article-card">
              <div class="article-media" style="display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 50%, #152B46 0%, #0B192A 80%);">
                <span style="font-family: var(--font-serif); font-size: var(--text-2xl); font-style: italic; color: var(--color-accent-primary);">
                  ${art.category}
                </span>
              </div>
              <div class="article-card-body">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-1);">
                  <span class="overline" style="font-size: 10px;">${art.category}</span>
                  <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">${art.readTimeMinutes} min read</span>
                </div>
                <h2 style="font-size: var(--text-xl); line-height: var(--leading-snug); margin-bottom: var(--space-2);">
                  <a href="#/journal/${art.slug}">${art.title}</a>
                </h2>
                <p style="font-size: var(--text-sm); line-height: var(--leading-normal); margin-bottom: var(--space-4);">
                  ${art.summary}
                </p>
                <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-3);">
                  <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${formatDate(art.date)}</span>
                  <a href="#/journal/${art.slug}" class="btn btn-ghost btn-sm" style="color: var(--color-accent-primary); padding: 0;">
                    Read Essay ${icons.arrowRight('', 14)}
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }
};
