/**
 * HOROLOGY — Page Template: Legal & Client Governance
 * Routes: #/legal/privacy, #/legal/terms, #/legal/shipping
 */

import { LEGAL_DOCS } from '../js/data.js';
import { createBreadcrumb } from '../js/components.js';
import { escapeHTML } from '../js/utilities.js';

export let title = 'Client Governance';

export async function render(ctx) {
  // Determine topic from param or path
  let topic = ctx.params?.topic?.toLowerCase();
  if (!topic) {
    if (ctx.path.includes('privacy')) topic = 'privacy';
    else if (ctx.path.includes('terms')) topic = 'terms';
    else if (ctx.path.includes('shipping')) topic = 'shipping';
    else if (ctx.path.includes('disclaimer')) topic = 'disclaimer';
    else topic = 'privacy';
  }

  // Extend with disclaimer if requested
  const disclaimerDoc = {
    title: 'Disclaimer & Non-Affiliation Notice',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Independent Platform Disclosure',
        body: 'HOROLOGY is an independent platform specializing in the curatorial study, acquisition, and consignment of pre-owned luxury mechanical timepieces. HOROLOGY is not an authorized distributor, agent, or official partner of Rolex SA, Omega SA, Tudor SA, or Grand Seiko Corporation.'
      },
      {
        heading: '2. Trademark & Intellectual Property Rights',
        body: 'All trademarks, brand names, model designations, logos, and emblems displayed on this platform (including Rolex, Oyster Perpetual, Submariner, Daytona, Omega, Speedmaster, Seamaster, Tudor, Black Bay, Grand Seiko, and Spring Drive) remain the sole property of their respective trademark holders. Their mention on this website is for identification, comparative education, and historical reference only.'
      },
      {
        heading: '3. Pre-Owned Reference Nature',
        body: 'All timepieces cataloged on HOROLOGY are pre-owned or archival references. Any manufacturer warranties that may have originally attached to a watch upon its initial retail sale may have expired or be subject to manufacturer terms. Timepieces are backed by HOROLOGY inspection documentation and individually established mechanical warranty terms.'
      }
    ]
  };

  const doc = topic === 'disclaimer' ? disclaimerDoc : (LEGAL_DOCS[topic] || LEGAL_DOCS.privacy);
  title = `${doc.title} — HOROLOGY`;

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Governance', href: '#/legal/privacy' },
    { label: doc.title, href: `#/legal/${topic}` }
  ];

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Header -->
      <div class="max-w-narrow mx-auto text-center mb-10" style="margin-left: auto; margin-right: auto;">
        <span class="section-kicker">Client Governance &amp; Standards</span>
        <h1 class="heading-1 mb-2">${escapeHTML(doc.title)}</h1>
        <p class="font-mono text-xs text-muted">Version Effective Date: ${escapeHTML(doc.lastUpdated)}</p>
      </div>

      <!-- Legal Document Navigation Tabs -->
      <div class="flex items-center justify-center gap-3 mb-12 flex-wrap">
        <a href="#/legal/privacy" class="btn btn-sm ${topic === 'privacy' ? 'btn-primary' : 'btn-outline'}">Privacy Policy</a>
        <a href="#/legal/terms" class="btn btn-sm ${topic === 'terms' ? 'btn-primary' : 'btn-outline'}">Terms &amp; Conditions</a>
        <a href="#/legal/shipping" class="btn btn-sm ${topic === 'shipping' ? 'btn-primary' : 'btn-outline'}">Shipping &amp; Returns</a>
        <a href="#/legal/disclaimer" class="btn btn-sm ${topic === 'disclaimer' ? 'btn-primary' : 'btn-outline'}">Disclaimer</a>
      </div>

      <!-- Legal Content Body -->
      <div class="max-w-narrow mx-auto p-8 bg-surface border" style="margin-left: auto; margin-right: auto; border-color: var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.95rem; line-height: 1.8; color: var(--text-secondary);">
        ${doc.sections.map(section => `
          <div class="mb-8">
            <h3 class="heading-4 text-primary mb-3">${escapeHTML(section.heading)}</h3>
            <p class="body-muted leading-relaxed">${escapeHTML(section.body)}</p>
          </div>
        `).join('')}

        <div class="pt-6 border-top mt-10 flex items-center justify-between flex-wrap gap-4 font-mono text-xs text-muted" style="border-color: var(--border-subtle);">
          <span>Client Governance &bull; General Principles</span>
          <span>HOROLOGY Platform &bull; Independent Observatory</span>
        </div>
      </div>
    </div>
  `;
}

