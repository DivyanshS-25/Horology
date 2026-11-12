// HOROLOGY — Watch Detail Route Module (Panels 04 & 05)
import { repository } from '../data/repository.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';
import { formatINR, formatRate, formatAmplitude, formatBeatError, formatDate, escapeHtml } from '../utils/formatters.js';
import { renderAmplitudeGauge } from '../components/gauge.js';
import { icons } from '../utils/svgIcons.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';
import { openModal } from '../components/modal.js';
import { renderWatchCard } from '../components/watchCard.js';

export const watchDetailPage = {
  id: 'watchDetail',
  path: '/watch/:slug',
  title(ctx) {
    const watch = repository.getWatchBySlug(ctx.params.slug);
    return watch ? `${watch.brand} ${watch.model} Ref. ${watch.referenceNumber}` : 'Timepiece Detail';
  },

  activeTab: 'overview',

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

    // Record to recently viewed store
    store.addRecentlyViewed(watch.id);

    const inWishlist = store.isInWishlist(watch.id);
    const inCompare = store.isInCompare(watch.id);

    const svgVisual = generateWatchSvg(watch.visualType || 'diver', {
      dialColor: watch.dialTone || '#0B192A',
      bezelColor: watch.bezelTone || '#263A50',
      brand: watch.brand
    });

    const relatedWatches = repository.getWatchesByBrand(watch.brandId)
      .filter(w => w.id !== watch.id)
      .slice(0, 3);

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'The Collection', href: '#/collection' },
          { label: watch.brand, href: `#/brand/${watch.brandId}` },
          { label: watch.model }
        ])}

        <!-- Hero Section (Panel 04) -->
        <div class="watch-detail-hero">
          <!-- Gallery -->
          <div>
            <div class="gallery-main" id="watchGalleryMain" title="Click to inspect in high-resolution lightbox">
              <div style="width: 80%; height: 80%;">
                ${svgVisual}
              </div>
            </div>
            <div class="gallery-thumbs">
              <div class="gallery-thumb active" data-angle="front" title="Dial &amp; Bezel">${svgVisual}</div>
              <div class="gallery-thumb" data-angle="flank" title="Case Profile">${svgVisual}</div>
              <div class="gallery-thumb" data-angle="clasp" title="Clasp &amp; Bracelet">${svgVisual}</div>
            </div>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-2); text-align: center;">
              Interactive procedural vector rendering &bull; Zero stock photography
            </p>
          </div>

          <!-- Product Summary -->
          <div class="watch-info-panel">
            <div>
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span class="overline">${escapeHtml(watch.brand)} &bull; ${watch.year}</span>
                <span class="badge badge-available">${escapeHtml(watch.availability)}</span>
              </div>
              <h1 style="font-size: var(--text-3xl); margin: var(--space-1) 0 var(--space-2);">
                ${escapeHtml(watch.model)}
              </h1>
              <div class="mono" style="color: var(--color-text-muted); font-size: var(--text-sm);">
                Ref. ${escapeHtml(watch.referenceNumber)} &bull; ${escapeHtml(watch.specification.movementType)} &bull; ${watch.specification.caseDiameterMm} mm
              </div>
            </div>

            <!-- Price -->
            <div style="padding: var(--space-4) 0; border-top: 1px solid var(--color-border-hairline); border-bottom: 1px solid var(--color-border-hairline);">
              <span class="overline" style="display: block; font-size: 10px; margin-bottom: 2px;">Vault Curation Price</span>
              <div class="watch-detail-price">${formatINR(watch.price)}</div>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1);">
                Includes insured worldwide delivery, tamper-evident physical dossier, and 24-month mechanical certification.
              </p>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
              <button class="btn btn-primary btn-lg flex-grow" id="requestWatchTriggerBtn">
                Request This Watch ${icons.arrowRight('', 16)}
              </button>
              <button class="btn btn-outline btn-icon ${inWishlist ? 'active' : ''}" id="detailWishlistBtn" title="Save to Wishlist" aria-label="Save to Wishlist">
                ${icons.heart('', 18, inWishlist)}
              </button>
              <button class="btn btn-outline btn-icon ${inCompare ? 'active' : ''}" id="detailCompareBtn" title="Add to Comparison" aria-label="Add to Comparison">
                ${icons.compare('', 18)}
              </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding-top: var(--space-2);">
              <a href="#/watch/${watch.slug}/dossier" class="btn btn-ghost btn-sm" style="padding-left: 0; color: var(--color-accent-primary);">
                ${icons.fileText('', 16)} View Printable Inspection Dossier
              </a>
              <span class="badge badge-verified">${icons.check('', 12)} Forensic Audit Complete</span>
            </div>

            <!-- Quick Specs Grid -->
            <div class="quick-spec-grid">
              <div class="quick-spec-item">
                <span class="quick-spec-label">Movement</span>
                <span class="quick-spec-value" style="font-size: var(--text-xs);">${escapeHtml(watch.specification.movementType)}</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Case Diameter</span>
                <span class="quick-spec-value">${watch.specification.caseDiameterMm} mm</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Case Metal</span>
                <span class="quick-spec-value" style="font-size: var(--text-xs);">${escapeHtml(watch.specification.caseMaterial.split(' ')[0])}</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Power Reserve</span>
                <span class="quick-spec-value">${watch.specification.powerReserveHours} Hours</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Water Resistance</span>
                <span class="quick-spec-value">${watch.specification.waterResistanceMeters} m</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Production Year</span>
                <span class="quick-spec-value">${watch.year}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 6 Detailed Inspection Tabs (Panels 04 & 05) -->
        <div style="margin-top: var(--space-12);">
          <div class="tabs-nav" role="tablist">
            <button class="tab-trigger active" data-tab="overview" role="tab" aria-selected="true">
              Overview &amp; Heritage
            </button>
            <button class="tab-trigger" data-tab="specifications" role="tab" aria-selected="false">
              Specifications
            </button>
            <button class="tab-trigger" data-tab="movement" role="tab" aria-selected="false">
              Movement Performance
            </button>
            <button class="tab-trigger" data-tab="condition" role="tab" aria-selected="false">
              Physical Condition
            </button>
            <button class="tab-trigger" data-tab="box-papers" role="tab" aria-selected="false">
              Box &amp; Papers
            </button>
            <button class="tab-trigger" data-tab="service" role="tab" aria-selected="false">
              Service &amp; Provenance
            </button>
          </div>

          <div class="movement-report-card" style="margin-top: var(--space-6);" id="tabContentContainer">
            ${this.renderTabContent(watch, 'overview')}
          </div>
        </div>

        <!-- Related Timepieces -->
        <div class="section-spacer" style="padding-bottom: 0;">
          <div class="collection-toolbar">
            <div>
              <span class="overline">Complementary Curations</span>
              <h2>More from ${watch.brand}</h2>
            </div>
            <a href="#/brand/${watch.brandId}" class="btn btn-outline btn-sm">
              Explore All ${watch.brand} ${icons.arrowRight('', 14)}
            </a>
          </div>

          <div class="watch-grid">
            ${relatedWatches.map(w => renderWatchCard(w)).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderTabContent(watch, tabKey) {
    switch (tabKey) {
      case 'overview':
        return `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--text-xl);">Curator's Assessment &amp; Heritage</h3>
              <span class="badge badge-demonstration">Demonstration Record</span>
            </div>
            <p style="line-height: var(--leading-relaxed); margin-bottom: var(--space-6);">
              ${escapeHtml(watch.tagline)} Sourced directly from an authenticated single-collector provenance, this ${watch.brand} ${watch.model} (Reference ${watch.referenceNumber}) represents an iconic example of fine mechanical craftsmanship.
            </p>
            <div class="quick-spec-grid">
              <div class="quick-spec-item">
                <span class="quick-spec-label">Calibre</span>
                <span class="quick-spec-value">${escapeHtml(watch.specification.calibre)}</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Overall Condition</span>
                <span class="quick-spec-value" style="color: var(--color-status-available);">${escapeHtml(watch.condition.overallGrade)}</span>
              </div>
              <div class="quick-spec-item">
                <span class="quick-spec-label">Witschi Testing</span>
                <span class="quick-spec-value">${escapeHtml(watch.movementReport.rateStatus)}</span>
              </div>
            </div>
          </div>
        `;

      case 'specifications':
        return `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--text-xl);">Technical Specifications</h3>
              <span class="badge badge-demonstration">Factory Specification</span>
            </div>
            <table class="spec-table">
              <tbody>
                <tr><th>Manufacturer Calibre</th><td>${escapeHtml(watch.specification.calibre)}</td></tr>
                <tr><th>Movement Propulsion</th><td>${escapeHtml(watch.specification.movementType)}</td></tr>
                <tr><th>Frequency (Beat Rate)</th><td>${watch.specification.beatRateVph.toLocaleString()} vph (${(watch.specification.beatRateVph / 7200).toFixed(1)} Hz)</td></tr>
                <tr><th>Autonomy (Power Reserve)</th><td>${watch.specification.powerReserveHours} Hours</td></tr>
                <tr><th>Case Diameter</th><td>${watch.specification.caseDiameterMm} mm</td></tr>
                <tr><th>Case Material</th><td>${escapeHtml(watch.specification.caseMaterial)}</td></tr>
                <tr><th>Bezel Architecture</th><td>${escapeHtml(watch.specification.bezelMaterial)}</td></tr>
                <tr><th>Dial &amp; Indices</th><td>${escapeHtml(watch.specification.dialColor)}</td></tr>
                <tr><th>Crystal</th><td>${escapeHtml(watch.specification.crystal)}</td></tr>
                <tr><th>Water Resistance</th><td>${watch.specification.waterResistanceMeters} Meters / ${Math.round(watch.specification.waterResistanceMeters / 10)} Bar</td></tr>
                <tr><th>Bracelet &amp; Clasp</th><td>${escapeHtml(watch.specification.bracelet)}</td></tr>
              </tbody>
            </table>
          </div>
        `;

      case 'movement':
        return `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-6);">
              <div>
                <span class="overline" style="font-size: 10px;">Acoustic Escapement Testing</span>
                <h3 style="font-size: var(--text-xl);">Movement Performance Report</h3>
              </div>
              <span class="badge badge-verified">${icons.check('', 12)} Witschi Verified</span>
            </div>

            <div class="movement-grid">
              <!-- Dial Gauge (Panel 05) -->
              <div>
                ${renderAmplitudeGauge(watch.movementReport.amplitudeDeg)}
                <div class="text-center mt-4">
                  <span class="mono" style="font-size: var(--text-sm); font-weight: bold; color: var(--color-status-available);">
                    ${watch.movementReport.amplitudeStatus}
                  </span>
                </div>
              </div>

              <!-- Positional Matrix (Panel 05) -->
              <div>
                <table class="pos-rate-table">
                  <thead>
                    <tr>
                      <th>Testing Position</th>
                      <th>Rate Variance</th>
                      <th>Amplitude</th>
                      <th>Beat Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${watch.movementReport.positions.map(pos => `
                      <tr>
                        <td style="color: var(--color-text-primary); font-family: var(--font-sans); font-size: var(--text-sm);">${pos.position}</td>
                        <td style="color: ${pos.rateSec >= 0 ? 'var(--color-status-available)' : 'var(--color-status-demonstration)'};">${formatRate(pos.rateSec)}</td>
                        <td>${formatAmplitude(pos.amplitudeDeg)}</td>
                        <td>${formatBeatError(pos.beatErrorMs)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-4); border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-3);" class="flex-wrap gap-2">
                  <span>Instrument: <strong>${escapeHtml(watch.movementReport.testingInstrument)}</strong></span>
                  <span>Lift Angle: <strong>${watch.movementReport.liftAngleDeg}&deg;</strong></span>
                  <span>Wind State: <strong>${watch.movementReport.timeSinceFullWind}</strong></span>
                </div>
              </div>
            </div>
          </div>
        `;

      case 'condition':
        return `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--text-xl);">Physical Condition &amp; Microscopic Grading</h3>
              <span class="badge badge-verified">${icons.check('', 12)} Loupe Inspected</span>
            </div>
            <table class="spec-table">
              <tbody>
                <tr><th>Overall Physical Grade</th><td style="color: var(--color-status-available);">${escapeHtml(watch.condition.overallGrade)}</td></tr>
                <tr><th>Case Flanks &amp; Lugs</th><td>${escapeHtml(watch.condition.caseCondition)}</td></tr>
                <tr><th>Bezel &amp; Insert</th><td>${escapeHtml(watch.condition.bezelCondition)}</td></tr>
                <tr><th>Sapphire / Hesalite</th><td>${escapeHtml(watch.condition.crystalCondition)}</td></tr>
                <tr><th>Dial &amp; Hands Lume</th><td>${escapeHtml(watch.condition.dialAndHands)}</td></tr>
                <tr><th>Bracelet &amp; Clasp Tension</th><td>${escapeHtml(watch.condition.braceletCondition)}</td></tr>
                <tr><th>Finishing &amp; Polish History</th><td style="color: var(--color-accent-primary);">${escapeHtml(watch.condition.polishHistory)}</td></tr>
              </tbody>
            </table>
          </div>
        `;

      case 'box-papers':
        return `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--text-xl);">Box, Papers &amp; Collateral Completeness</h3>
              <span class="badge badge-verified">${icons.check('', 12)} Document Audited</span>
            </div>
            <table class="spec-table">
              <tbody>
                <tr><th>Original Presentation Box</th><td>${watch.boxAndPapers.hasOriginalBox ? 'Included &bull; Factory Presentation Box' : 'HOROLOGY Bespoke Protective Vault Case'}</td></tr>
                <tr><th>Warranty Card / Certificate</th><td>${watch.boxAndPapers.hasWarrantyCard ? 'Included &bull; Serialized Manufacturer Card' : 'Extract from Archives Provided'}</td></tr>
                <tr><th>Instruction Manual &amp; Booklets</th><td>${watch.boxAndPapers.hasManual ? 'Included' : 'Missing'}</td></tr>
                <tr><th>Serialized Hangtag</th><td>${watch.boxAndPapers.hasSerializedHangtag ? 'Included' : 'Not Present'}</td></tr>
                <tr><th>Warranty Stamped Date</th><td>${formatDate(watch.boxAndPapers.papersDate)}</td></tr>
                <tr><th>Set Notes</th><td>${escapeHtml(watch.boxAndPapers.notes)}</td></tr>
              </tbody>
            </table>
          </div>
        `;

      case 'service':
        return `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-4);">
              <h3 style="font-size: var(--text-xl);">Service Overhauls &amp; Provenance Record</h3>
              <span class="badge badge-demonstration">Audited Log</span>
            </div>
            <table class="spec-table">
              <tbody>
                <tr><th>Last Documented Service</th><td>${formatDate(watch.serviceHistory.lastServiceDate)}</td></tr>
                <tr><th>Service Facility</th><td>${escapeHtml(watch.serviceHistory.serviceCenter)}</td></tr>
                <tr><th>Interventions Performed</th><td>${escapeHtml(watch.serviceHistory.workPerformed)}</td></tr>
                <tr><th>Next Recommended Overhaul</th><td>${watch.serviceHistory.nextServiceRecommended}</td></tr>
                <tr><th>Origin Market</th><td>${escapeHtml(watch.provenance.originalCountry)}</td></tr>
                <tr><th>Known Owners</th><td>${watch.provenance.previousOwners} Private Custodian</td></tr>
                <tr><th>Curator Provenance Notes</th><td>${escapeHtml(watch.provenance.collectorNotes)}</td></tr>
              </tbody>
            </table>
          </div>
        `;
    }
  },

  mount(ctx) {
    const slug = ctx.params.slug;
    const watch = repository.getWatchBySlug(slug);
    if (!watch) return;

    const container = document.getElementById('app');
    if (!container) return;

    // Tab switcher
    container.querySelectorAll('.tab-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        container.querySelectorAll('.tab-trigger').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        trigger.classList.add('active');
        trigger.setAttribute('aria-selected', 'true');

        const tabKey = trigger.dataset.tab;
        const contentBox = document.getElementById('tabContentContainer');
        if (contentBox) {
          contentBox.innerHTML = this.renderTabContent(watch, tabKey);
        }
      });
    });

    // Wishlist Button
    const wishlistBtn = document.getElementById('detailWishlistBtn');
    wishlistBtn?.addEventListener('click', () => {
      const isSaved = store.toggleWishlist(watch.id);
      wishlistBtn.classList.toggle('active', isSaved);
      wishlistBtn.innerHTML = icons.heart('', 18, isSaved);
      showToast(isSaved ? `Added ${watch.model} to Wishlist` : `Removed from Wishlist`);
    });

    // Compare Button
    const compareBtn = document.getElementById('detailCompareBtn');
    compareBtn?.addEventListener('click', () => {
      const isComparing = store.toggleCompare(watch.id);
      compareBtn.classList.toggle('active', isComparing);
      showToast(isComparing ? `Added ${watch.model} to Comparison` : `Removed from Comparison`);
    });

    // Request This Watch Modal Trigger
    const requestBtn = document.getElementById('requestWatchTriggerBtn');
    requestBtn?.addEventListener('click', () => {
      this.openRequestModal(watch);
    });

    // Lightbox on main gallery image
    const galleryMain = document.getElementById('watchGalleryMain');
    galleryMain?.addEventListener('click', () => {
      const svg = generateWatchSvg(watch.visualType || 'diver', {
        dialColor: watch.dialTone || '#0B192A',
        bezelColor: watch.bezelTone || '#263A50',
        brand: watch.brand
      });
      openModal({
        title: `${watch.brand} ${watch.model} — High-Res Inspection`,
        content: `
          <div style="aspect-ratio: 1/1; max-width: 550px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
            ${svg}
          </div>
          <p class="text-center mt-4" style="font-size: var(--text-xs); color: var(--color-text-muted);">
            Forensic render &bull; Serial: ${watch.referenceNumber} &bull; Case: ${watch.specification.caseMaterial}
          </p>
        `,
        maxWidth: '640px'
      });
    });
  },

  openRequestModal(watch) {
    const content = `
      <div>
        <p class="mb-4" style="font-size: var(--text-sm);">
          Reserve this timepiece or arrange a private viewing. As part of our client protocol, a horological specialist will contact you within 4 business hours to discuss provenance and insured escrow delivery.
        </p>

        <div style="padding: var(--space-4); background: var(--color-bg-base); border-radius: var(--radius-xs); border: 1px solid var(--color-border-hairline); margin-bottom: var(--space-6);">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <strong style="color: var(--color-text-primary); font-size: var(--text-base);">${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}</strong>
              <div class="mono" style="font-size: var(--text-xs); color: var(--color-text-muted);">Ref. ${watch.referenceNumber}</div>
            </div>
            <div class="mono" style="font-weight: 600; color: var(--color-accent-primary);">${formatINR(watch.price)}</div>
          </div>
        </div>

        <form id="requestWatchForm" style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div>
            <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
              Full Name *
            </label>
            <input type="text" class="search-input" required placeholder="e.g. Vikramaditya Singhania" style="padding-left: 1rem;" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
            <div>
              <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                Email Address *
              </label>
              <input type="email" class="search-input" required placeholder="name@domain.com" style="padding-left: 1rem;" />
            </div>
            <div>
              <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                Contact Number *
              </label>
              <input type="tel" class="search-input" required placeholder="+91 98765 43210" style="padding-left: 1rem;" />
            </div>
          </div>

          <div>
            <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
              Preferred Transaction Protocol
            </label>
            <select class="select-custom w-full">
              <option value="direct">Fully Insured Escrow Delivery</option>
              <option value="salon">Private Salon Appointment (Viewing &amp; Hand-Delivery)</option>
              <option value="inquiry">Request Condition Consultation with Horologist</option>
            </select>
          </div>

          <div>
            <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
              Collector Notes or Questions
            </label>
            <textarea class="search-input" rows="3" placeholder="Optional inquiries regarding wrist sizing, timing data, or trade-in..." style="padding: 0.75rem 1rem;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-lg mt-2">
            Submit Demonstration Request ${icons.arrowRight('', 16)}
          </button>
        </form>
      </div>
    `;

    openModal({
      title: `Request Acquisition — ${watch.brand} ${watch.model}`,
      content,
      maxWidth: '680px'
    });

    const form = document.getElementById('requestWatchForm');
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
            <h3 style="margin-bottom: var(--space-2);">Demonstration Confirmation</h3>
            <p class="mb-4">
              Your inquiry for <strong>${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}</strong> has been registered under priority code:
            </p>
            <div class="mono" style="font-size: var(--text-xl); font-weight: bold; color: var(--color-accent-primary); padding: var(--space-3); background: var(--color-bg-base); border-radius: var(--radius-xs); border: 1px dashed var(--color-accent-border); display: inline-block; margin-bottom: var(--space-6);">
              ${code}
            </div>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-6);">
              Note: This is a demonstration marketplace platform. No real financial transaction has occurred.
            </p>
            <a href="#/collection" class="btn btn-outline">Continue Browsing Collection</a>
          </div>
        `,
        maxWidth: '540px'
      });
    });
  }
};
