// HOROLOGY — Direct Request Acquisition Route Module
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { formatINR, escapeHtml } from '../utils/formatters.js';
import { icons } from '../utils/svgIcons.js';
import { openModal } from '../components/modal.js';

export const requestPage = {
  id: 'request',
  path: '/request/:slug',
  title(ctx) {
    const watch = repository.getWatchBySlug(ctx.params.slug);
    return watch ? `Acquisition Request — ${watch.brand} ${watch.model}` : 'Acquisition Request';
  },

  render(ctx) {
    const slug = ctx.params.slug;
    const watch = repository.getWatchBySlug(slug);

    if (!watch) {
      return `
        <div class="container section-spacer text-center">
          <h2>Timepiece Not Found</h2>
          <p class="mb-4">The timepiece you requested is no longer available in our active vault.</p>
          <a href="#/collection" class="btn btn-primary">Return to Collection</a>
        </div>
      `;
    }

    return `
      <div class="container container-narrow section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'The Collection', href: '#/collection' },
          { label: watch.model, href: `#/watch/${watch.slug}` },
          { label: 'Acquisition Request' }
        ])}

        <div class="section-title-wrap">
          <span class="overline">Private Acquisition Protocol</span>
          <h1 style="font-size: var(--text-3xl); margin-top: var(--space-2);">
            Request ${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}
          </h1>
          <p style="margin-top: var(--space-2);">
            Initiate a verified acquisition inquiry or request an in-person private salon viewing for Ref. ${watch.referenceNumber}.
          </p>
        </div>

        <div class="watch-card" style="padding: var(--space-8); margin-top: var(--space-6);">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--color-border-hairline); padding-bottom: var(--space-4); margin-bottom: var(--space-6);">
            <div>
              <strong style="font-size: var(--text-xl); color: var(--color-text-primary); display: block;">${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}</strong>
              <span class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">Ref. ${watch.referenceNumber} &bull; ${watch.year}</span>
            </div>
            <div class="mono" style="font-size: var(--text-2xl); font-weight: bold; color: var(--color-accent-primary);">
              ${formatINR(watch.price)}
            </div>
          </div>

          <form id="directRequestForm" style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Your Full Name *
                </label>
                <input type="text" class="search-input" required placeholder="Vikramaditya S." style="padding-left: 1rem;" />
              </div>
              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Email Address *
                </label>
                <input type="email" class="search-input" required placeholder="collector@domain.com" style="padding-left: 1rem;" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Phone Number (WhatsApp) *
                </label>
                <input type="tel" class="search-input" required placeholder="+91 98765 43210" style="padding-left: 1rem;" />
              </div>
              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Fulfillment Preference
                </label>
                <select class="select-custom w-full">
                  <option value="escrow">Insured Courier Escrow Delivery</option>
                  <option value="salon">Private Salon Viewing &amp; Inspection</option>
                  <option value="call">Request Diagnostic Consultation with Horologist</option>
                </select>
              </div>
            </div>

            <div>
              <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                Collector Notes / Specific Requests
              </label>
              <textarea class="search-input" rows="3" placeholder="Inquire regarding wrist-sizing, timing data, or payment wiring..." style="padding: 0.75rem 1rem;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg mt-2">
              Submit Acquisition Request ${icons.arrowRight('', 16)}
            </button>
          </form>
        </div>
      </div>
    `;
  },

  mount(ctx) {
    const slug = ctx.params.slug;
    const watch = repository.getWatchBySlug(slug);

    const form = document.getElementById('directRequestForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'HORO-' + Math.floor(100000 + Math.random() * 900000);
      openModal({
        title: 'Request Transmitted Successfully',
        content: `
          <div class="text-center" style="padding: var(--space-6) 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-status-available-bg); color: var(--color-status-available); display: inline-flex; align-items: center; justify-content: center; margin-bottom: var(--space-4);">
              ${icons.check('', 28)}
            </div>
            <h3 style="margin-bottom: var(--space-2);">Acquisition File Initialized</h3>
            <p class="mb-4">
              Your inquiry for <strong>${escapeHtml(watch?.brand || '')} ${escapeHtml(watch?.model || '')}</strong> has been logged under priority tracking code:
            </p>
            <div class="mono" style="font-size: var(--text-xl); font-weight: bold; color: var(--color-accent-primary); padding: var(--space-3); background: var(--color-bg-base); border-radius: var(--radius-xs); border: 1px dashed var(--color-accent-border); display: inline-block; margin-bottom: var(--space-6);">
              ${code}
            </div>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-6);">
              A senior horological advisor will reach out to you within four business hours.
            </p>
            <a href="#/collection" class="btn btn-primary">Return to Collection</a>
          </div>
        `,
        maxWidth: '540px'
      });
    });
  }
};
