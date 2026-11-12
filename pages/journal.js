/**
 * HOROLOGY — Page Template: Collector's Journal Index
 * Route: #/journal
 * Editorial Articles, Collecting Guides & Horological Scholarship
 */

import { ARTICLES } from '../js/data.js';
import { createBreadcrumb, ICONS } from '../js/components.js';
import { escapeHTML } from '../js/utilities.js';

export const title = "Collector's Journal";

export async function render(ctx) {
  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: "Collector's Journal", href: '#/journal' }
  ];

  const leadArticle = ARTICLES[0];
  const otherArticles = ARTICLES.slice(1);

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Journal Header -->
      <div class="max-w-narrow text-center mb-10">
        <span class="section-kicker">Horological Commentary</span>
        <h1 class="heading-1 mb-3">The Collector's Journal</h1>
        <p class="lead-text">
          Independent essays on mechanical calibres, market valuation dynamics, historical provenance, and technical watchmaking scholarship.
        </p>
      </div>

      <!-- Categories Filter -->
      <div class="flex items-center justify-center gap-3 mb-12 flex-wrap">
        <button type="button" class="btn btn-sm btn-primary">All Essays</button>
        <button type="button" class="btn btn-sm btn-outline">Movements</button>
        <button type="button" class="btn btn-sm btn-outline">Collecting</button>
        <button type="button" class="btn btn-sm btn-outline">Provenance</button>
        <button type="button" class="btn btn-sm btn-outline">Brand Histories</button>
      </div>

      <!-- Lead Featured Essay -->
      ${leadArticle ? `
        <div class="p-8 bg-surface border mb-12 relative overflow-hidden" style="border-color: var(--border-strong); border-radius: var(--radius-sm); box-shadow: var(--shadow-card);">
          <div class="grid-12 items-center">
            <div class="col-span-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="badge badge-subtle font-mono">${escapeHTML(leadArticle.category)}</span>
                <span class="font-mono text-xs text-muted">${leadArticle.readTimeMinutes} min read &bull; ${leadArticle.date}</span>
              </div>
              <h2 class="heading-2 mb-3">
                <a href="#/journal/${leadArticle.slug}" class="hover:text-accent transition">${escapeHTML(leadArticle.title)}</a>
              </h2>
              <p class="body-muted leading-relaxed mb-6" style="font-size: var(--text-base);">
                ${escapeHTML(leadArticle.summary)}
              </p>
              <div class="flex items-center gap-4">
                <a href="#/journal/${leadArticle.slug}" class="btn btn-primary">
                  <span>Read Full Technical Essay</span>
                  ${ICONS.arrowRight}
                </a>
                <span class="font-mono text-xs text-muted">By ${escapeHTML(leadArticle.author)}</span>
              </div>
            </div>
            <div class="col-span-4 flex justify-center">
              <div class="w-full aspect-4-3 bg-secondary border flex items-center justify-center p-8 text-center" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                <div>
                  <div class="text-accent mb-2">${ICONS.balance}</div>
                  <span class="font-serif text-lg text-primary block">Horological Vitals</span>
                  <span class="font-mono text-xs text-muted">Amplitude Diagnostic Guide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Articles Grid -->
      <div class="journal-grid">
        ${otherArticles.map(article => `
          <a href="#/journal/${article.slug}" class="card-editorial">
            <div class="card-editorial-body">
              <div class="card-editorial-meta">
                <span class="badge badge-subtle">${escapeHTML(article.category)}</span>
                <span>&bull;</span>
                <span>${article.readTimeMinutes} min read</span>
              </div>
              <h3 class="card-editorial-title">${escapeHTML(article.title)}</h3>
              <p class="card-editorial-snippet mb-4">${escapeHTML(article.summary)}</p>
              <div class="flex items-center gap-2 text-accent mt-auto font-mono text-xs uppercase">
                <span>Read Essay</span>
                ${ICONS.arrowRight}
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

