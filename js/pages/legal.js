// HOROLOGY — Legal Policies Route Module
import { renderBreadcrumbs } from '../components/breadcrumb.js';

export const legalPage = {
  id: 'legal',
  path: '/legal/:topic',
  title(ctx) {
    const topic = ctx.params.topic;
    if (topic === 'privacy') return 'Privacy & Data Protection Policy';
    if (topic === 'shipping-returns') return 'Insured Transit, Escrow & Returns';
    return 'Terms of Curation & Service';
  },

  render(ctx) {
    const topic = ctx.params.topic || 'terms';

    let title = 'Terms of Curation & Service';
    let content = '';

    if (topic === 'privacy') {
      title = 'Privacy & Confidentiality Policy';
      content = `
        <p class="mb-4">At HOROLOGY, client confidentiality is paramount. We operate with private banking standards regarding transaction confidentiality, client identities, and vaulted collection registries.</p>
        <h3 class="mb-2 mt-6">1. Private Client Data Collection</h3>
        <p class="mb-4">We collect client data exclusively for fulfilling private viewings, AML/KYC regulatory requirements on high-value asset transfers, and delivering authenticated inspection dossiers.</p>
        <h3 class="mb-2 mt-6">2. Zero Third-Party Monetization</h3>
        <p class="mb-4">We never sell, rent, or lease client registries or purchase histories to third-party marketing services or advertising aggregators.</p>
        <h3 class="mb-2 mt-6">3. Local Browser Storage</h3>
        <p class="mb-4">Your saved Wishlist, recently viewed chronometers, and comparison sets are maintained locally in your browser's private localStorage and may be cleared at any time via the user interface.</p>
      `;
    } else if (topic === 'shipping-returns') {
      title = 'Insured Transit, Escrow & Returns Policy';
      content = `
        <p class="mb-4">We oversee every logistics leg with specialized armored transport to ensure risk-free acquisition.</p>
        <h3 class="mb-2 mt-6">1. Fully Insured Armored Courier</h3>
        <p class="mb-4">Every shipment is dispatched via specialized courier (Ferrari Logistics / Malca-Amit / Brinks) with 100% full declared value transit insurance underwritten by Lloyd's of London.</p>
        <h3 class="mb-2 mt-6">2. 7-Day Inspection Period</h3>
        <p class="mb-4">Upon physical delivery, the client enjoys a 7-day inspection window. If the timepiece deviates in any material manner from its certified Inspection Dossier, a full return and wire reimbursement is guaranteed.</p>
        <h3 class="mb-2 mt-6">3. 24-Month Mechanical Warranty</h3>
        <p class="mb-4">All mechanical chronometers acquired from HOROLOGY include a 24-month comprehensive movement warranty covering timekeeping accuracy and component integrity under normal wear.</p>
      `;
    } else {
      title = 'Terms of Curation & Acquisition';
      content = `
        <p class="mb-4">Welcome to HOROLOGY. By browsing our vault collections, booking private viewings, or initiating consignment evaluations, you agree to the following terms.</p>
        <h3 class="mb-2 mt-6">1. Authenticity Guarantee</h3>
        <p class="mb-4">We provide a lifetime, 100% money-back guarantee of physical authenticity for every timepiece bearing a HOROLOGY serialized Inspection Dossier.</p>
        <h3 class="mb-2 mt-6">2. Demonstration &amp; Catalog Status</h3>
        <p class="mb-4">All records displayed on this platform are for demonstration and catalog appraisal purposes. Acquisition requests initiate a consultation with our client services team before any financial settlement occurs.</p>
        <h3 class="mb-2 mt-6">3. Trademark Disclosures</h3>
        <p class="mb-4">HOROLOGY is an independent pre-owned horology atelier and is not an authorized distributor or agent of Rolex SA, The Swatch Group (Omega), Montres Tudor SA, Seiko Watch Corporation, or any other respective brand mentioned herein.</p>
      `;
    }

    return `
      <div class="container container-narrow section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Legal & Atelier Protocol', href: '#/legal/terms' },
          { label: title }
        ])}

        <div class="section-title-wrap">
          <span class="overline">Atelier Governance</span>
          <h1 style="font-size: var(--text-3xl); margin-top: var(--space-2);">${title}</h1>
        </div>

        <div style="font-size: var(--text-base); line-height: var(--leading-relaxed); color: var(--color-text-secondary); margin-top: var(--space-6);">
          ${content}
        </div>

        <div style="margin-top: var(--space-12); padding-top: var(--space-6); border-top: 1px solid var(--color-border-hairline); display: flex; gap: var(--space-4); flex-wrap: wrap;">
          <a href="#/legal/terms" class="btn btn-outline btn-sm">Terms of Curation</a>
          <a href="#/legal/privacy" class="btn btn-outline btn-sm">Privacy Policy</a>
          <a href="#/legal/shipping-returns" class="btn btn-outline btn-sm">Insured Transit &amp; Returns</a>
        </div>
      </div>
    `;
  }
};
