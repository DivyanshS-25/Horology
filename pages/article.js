/**
 * HOROLOGY — Page Template: Journal Article
 * Route: #/journal/:slug
 * Editorial Reader Experience & Related Timepieces
 */

import { getArticleBySlug, getWatchById } from '../js/data.js';
import { createBreadcrumb, createWatchCard, ICONS } from '../js/components.js';
import { escapeHTML } from '../js/utilities.js';

export let title = 'Journal Article';

export async function render(ctx) {
  const slug = ctx.params?.slug;
  const article = getArticleBySlug(slug);

  if (!article) {
    title = 'Article Not Found';
    return `
      <div class="container section-spacer text-center">
        <div class="empty-state">
          <h2 class="heading-2 mb-3">Article Not Found</h2>
          <p class="body-muted mb-6">The requested journal piece could not be located in our editorial archive.</p>
          <a href="#/journal" class="btn btn-primary">Return to Collector's Journal</a>
        </div>
      </div>
    `;
  }

  title = article.title;

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: "Collector's Journal", href: '#/journal' },
    { label: article.category, href: '#/journal' },
    { label: article.title, href: `#/journal/${article.slug}` }
  ];

  const relatedWatches = (article.relatedWatchIds || [])
    .map(id => getWatchById(id))
    .filter(Boolean);

  return `
    <article class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Article Header -->
      <header class="max-w-narrow mx-auto mb-10 text-center" style="margin-left: auto; margin-right: auto;">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="badge badge-subtle font-mono">${escapeHTML(article.category)}</span>
          <span class="font-mono text-xs text-muted">${article.readTimeMinutes} min read &bull; ${article.date}</span>
        </div>
        <h1 class="heading-1 mb-4" style="line-height: 1.15;">${escapeHTML(article.title)}</h1>
        <p class="font-serif italic text-lg text-secondary mb-6">${escapeHTML(article.summary)}</p>
        <div class="font-mono text-xs text-muted border-top pt-4" style="border-color: var(--border-subtle);">
          Written by <strong class="text-primary">${escapeHTML(article.author || 'Senior Horologist')}</strong>
        </div>
      </header>

      <!-- Article Prose Body -->
      <div class="max-w-narrow mx-auto p-8 bg-surface border mb-16" style="margin-left: auto; margin-right: auto; border-color: var(--border-subtle); border-radius: var(--radius-sm); font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
        ${article.content || `
          <p class="mb-6">The mechanical chronometer remains one of humanity's purest marriages of art and mechanical engineering. In an era dominated by transient digital screens, a gear train operating under the release of an escapement wheel is a kinetic monument to permanence.</p>
          
          <h2 class="heading-3 text-primary mb-4 mt-8">The Philosophy of Mechanical Preservation</h2>
          <p class="mb-6">When examining pre-owned and vintage horology, authentication is fundamentally an exercise in forensic archaeology. Every chamfer, bevel, burr, and microscopic scratch tells the narrative of how the watch was worn, serviced, and conserved through the decades.</p>
          
          <div class="p-6 my-8 bg-secondary border-left" style="border-left: 3px solid var(--accent-primary); border-radius: var(--radius-xs);">
            <p class="font-serif italic text-primary text-lg">"Authenticity is not an opinion; it is the mathematical and metallurgical alignment of every component with factory specifications."</p>
          </div>

          <p class="mb-6">At HOROLOGY, our mission is to ensure that collectors acquire timepieces with complete empirical confidence. Transparent timegrapher telemetry, unpolished factory geometries, and provenance audits are the pillars upon which collecting trust is sustained.</p>
        `}
      </div>

      <!-- Related Timepieces -->
      ${relatedWatches.length > 0 ? `
        <div class="border-top pt-12" style="border-color: var(--border-subtle);">
          <div class="flex items-center justify-between mb-8">
            <div>
              <span class="section-kicker">Observatory Vault</span>
              <h3 class="heading-2">Referenced Timepieces</h3>
            </div>
            <a href="#/collection" class="btn btn-outline btn-sm">Explore All</a>
          </div>
          <div class="watch-grid">
            ${relatedWatches.map(watch => createWatchCard(watch)).join('')}
          </div>
        </div>
      ` : ''}
    </article>
  `;
}

