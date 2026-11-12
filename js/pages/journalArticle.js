// HOROLOGY — Journal Article Reading Route Module
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { renderWatchCard } from '../components/watchCard.js';
import { formatDate } from '../utils/formatters.js';
import { icons } from '../utils/svgIcons.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';
import { openQuickView } from '../components/quickView.js';

export const journalArticlePage = {
  id: 'journalArticle',
  path: '/journal/:slug',
  title(ctx) {
    const article = repository.getArticleBySlug(ctx.params.slug);
    return article ? `${article.title} — Collector's Journal` : 'Journal Article';
  },

  render(ctx) {
    const slug = ctx.params.slug;
    const article = repository.getArticleBySlug(slug);

    if (!article) {
      return `
        <div class="container section-spacer text-center">
          <h2>Article Not Found</h2>
          <p class="mb-4">The essay you requested does not exist in our archives.</p>
          <a href="#/journal" class="btn btn-primary">Return to Journal</a>
        </div>
      `;
    }

    const relatedWatches = (article.relatedWatchIds || [])
      .map(id => repository.getWatchById(id))
      .filter(Boolean);

    return `
      <article class="container container-narrow section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Collector\'s Journal', href: '#/journal' },
          { label: article.category, href: `#/journal/category/${article.category.toLowerCase()}` },
          { label: article.title }
        ])}

        <!-- Article Header -->
        <header style="margin: var(--space-8) 0 var(--space-12);">
          <span class="overline">${article.category} &bull; ${article.readTimeMinutes} Min Read</span>
          <h1 style="font-size: var(--text-4xl); margin: var(--space-2) 0 var(--space-4); line-height: 1.15;">
            ${article.title}
          </h1>
          <div style="display: flex; align-items: center; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); border-bottom: 1px solid var(--color-border-hairline); padding-bottom: var(--space-6);">
            <span>By <strong>${article.author}</strong></span>
            <span>&bull;</span>
            <span class="mono">${formatDate(article.date)}</span>
          </div>
        </header>

        <!-- Article Body -->
        <div style="font-size: var(--text-base); line-height: var(--leading-relaxed); color: var(--color-text-secondary);" class="article-body-content">
          ${article.content}
        </div>

        <!-- Author Byline Card -->
        <div style="background: var(--color-bg-card); border: 1px solid var(--color-border-hairline); border-radius: var(--radius-sm); padding: var(--space-6); margin: var(--space-12) 0; display: flex; align-items: center; gap: var(--space-4);">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-bg-surface); border: 1px solid var(--color-accent-border); display: flex; align-items: center; justify-content: center; color: var(--color-accent-primary); font-family: var(--font-serif); font-size: var(--text-xl);">
            ${article.author.charAt(0)}
          </div>
          <div>
            <strong style="color: var(--color-text-primary); font-size: var(--text-base);">${article.author}</strong>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">
              Senior Contributor at HOROLOGY Atelier &bull; Specializing in escapement acoustics and certified mechanical appraisals.
            </p>
          </div>
        </div>

        <!-- Related Timepieces from the Vault -->
        ${relatedWatches.length > 0 ? `
          <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-10); margin-top: var(--space-10);">
            <div class="collection-toolbar">
              <div>
                <span class="overline">Contextual Horology</span>
                <h2>Referenced in this Essay</h2>
              </div>
            </div>
            <div class="watch-grid">
              ${relatedWatches.map(watch => renderWatchCard(watch)).join('')}
            </div>
          </div>
        ` : ''}

        <div style="margin-top: var(--space-12); text-align: center;">
          <a href="#/journal" class="btn btn-outline">
            &larr; Back to All Journal Articles
          </a>
        </div>
      </article>
    `;
  },

  mount() {
    const container = document.getElementById('app');
    if (!container) return;

    this.cardHandler = (e) => {
      const target = e.target;
      const wishlistBtn = target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishlistBtn.dataset.id;
        const isSaved = store.toggleWishlist(id);
        wishlistBtn.classList.toggle('active', isSaved);
        wishlistBtn.innerHTML = icons.heart('', 16, isSaved);
        showToast(isSaved ? 'Added to Wishlist' : 'Removed from Wishlist');
        return;
      }

      const compareBtn = target.closest('[data-action="compare"]');
      if (compareBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = compareBtn.dataset.id;
        const isComparing = store.toggleCompare(id);
        compareBtn.classList.toggle('active', isComparing);
        showToast(isComparing ? 'Added to Comparison' : 'Removed from Comparison');
        return;
      }

      const quickBtn = target.closest('[data-action="quickview"]');
      if (quickBtn) {
        e.preventDefault();
        e.stopPropagation();
        openQuickView(quickBtn.dataset.id);
        return;
      }
    };

    container.addEventListener('click', this.cardHandler);
  },

  unmount() {
    const container = document.getElementById('app');
    if (container && this.cardHandler) {
      container.removeEventListener('click', this.cardHandler);
    }
  }
};
