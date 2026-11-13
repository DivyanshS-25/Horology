/**
 * HOROLOGY — Page Template: Watch Detail (Phase 04)
 * Canonical Route: #/watch/:watchId or #/watch/:slug
 * Direction C — Midnight Navy Edition
 * Pure Vanilla ES Module
 */

import { findWatchByIdentifier, getRelatedWatches, getWatchById } from '../js/data.js';
import { createBreadcrumb, createWatchCard, createStatusBadge, createRecentlyViewedShelf, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { formatCurrency, escapeHtml } from '../js/utilities.js';
import { store } from '../js/state.js';
import { GalleryController } from '../js/gallery.js';
import { enquiryModal } from '../js/enquiry.js';

export let title = 'Timepiece Specifications';

export async function render(ctx) {
  const identifier = ctx.params?.watchId || ctx.params?.slug;
  const watch = findWatchByIdentifier(identifier);

  if (!watch) {
    title = 'Timepiece Reference Not Found';
    return `
      <div class="container section-spacer text-center">
        <div class="empty-state p-12 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); max-width: 600px; margin: 0 auto;">
          <div class="text-accent mb-4" style="font-size: 2.5rem;">${ICONS.search || '⌕'}</div>
          <h2 class="heading-2 mb-3">Timepiece Reference Not Found</h2>
          <p class="body-muted mb-6">The requested chronometer reference does not exist in the active observatory vault or has been retired.</p>
          <a href="#/collection" class="btn btn-primary">Browse Active Collection</a>
        </div>
      </div>
    `;
  }

  // Update document title and meta description dynamically
  title = `${watch.brand} ${watch.model} (${watch.referenceNumber || watch.reference}) — HOROLOGY`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${watch.brand} ${watch.model} ref. ${watch.referenceNumber || watch.reference}. Certified pre-owned chronometer examined with forensic horological rigor on HOROLOGY.`;
  }

  store.trackRecentlyViewed(watch.id);

  const recentIds = store.getRecentlyViewed().filter(id => id !== watch.id);
  const recentWatches = recentIds.map(id => getWatchById(id)).filter(Boolean).slice(0, 4);

  const inWishlist = store.isInWishlist(watch.id);
  const inCompare = store.isInCompare(watch.id);

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Collection', href: '#/collection' },
    { label: watch.brand, href: `#/brands/${watch.brandId}` },
    { label: watch.model, href: `#/watch/${watch.slug || watch.id}` }
  ];

  const galleryItems = watch.galleryItems || [
    { assetKey: watch.image || watch.imageUrl, category: 'Studio Master', label: 'Primary Studio Staging (Illustrative)' }
  ];

  const primaryImgUrl = resolveAsset(galleryItems[0].assetKey, { title: watch.brand, subtitle: watch.model });
  const relatedWatches = getRelatedWatches(watch, 4);

  return `
    <div class="container watch-detail-container">
      ${createBreadcrumb(breadcrumbs)}

      <!-- ====================================================================
           SECTION A: EDITORIAL PRODUCT HERO (58% / 42% Two-Column)
           ==================================================================== -->
      <section class="watch-hero-layout" aria-label="Product Showcase">
        
        <!-- 58% Left Column: Interactive Gallery Stage -->
        <div class="watch-gallery" id="watchGalleryContainer" data-watch-id="${watch.id}">
          <div class="gallery-stage" id="galleryStage" tabindex="0" role="region" aria-label="Interactive Watch Imagery Viewer">
            
            <!-- Top Controls & Category Badge -->
            <div class="gallery-overlay-top">
              <span class="gallery-category-pill" id="galleryCategoryPill">
                ${escapeHtml(galleryItems[0].category || 'Studio Master')} (Illustrative)
              </span>
              <button type="button" class="gallery-fullscreen-btn" id="lightboxTriggerBtn" aria-label="Open Fullscreen Lightbox">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </button>
            </div>

            <!-- Main Stage Image -->
            <img 
              src="${primaryImgUrl}" 
              alt="${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}" 
              class="gallery-main-img" 
              id="galleryMainImg" 
              data-zoom-src="${primaryImgUrl}"
              onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';"
            >

            <!-- Interactive Loupe Zoom Overlay (Desktop Hover) -->
            <div class="gallery-loupe" id="galleryLoupe" aria-hidden="true"></div>

            <!-- Prev / Next Navigation Arrows -->
            ${galleryItems.length > 1 ? `
              <button type="button" class="gallery-nav-btn gallery-nav-prev" id="galleryPrevBtn" aria-label="Previous Image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button type="button" class="gallery-nav-btn gallery-nav-next" id="galleryNextBtn" aria-label="Next Image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ` : ''}

            <!-- Counter Badge -->
            <span class="gallery-counter-pill" id="galleryCounterPill">
              01 / ${String(galleryItems.length).padStart(2, '0')}
            </span>
          </div>

          <!-- Horizontal Thumbnail Rail with verified real watch photography -->
          <div class="gallery-thumbnails" role="tablist" aria-label="Gallery Angle Thumbnails">
            ${galleryItems.map((item, idx) => {
              const thumbUrl = resolveAsset(item.assetKey);
              return `
                <button 
                  type="button" 
                  role="tab" 
                  aria-selected="${idx === 0 ? 'true' : 'false'}"
                  class="gallery-thumb ${idx === 0 ? 'active' : ''}" 
                  data-index="${idx}" 
                  aria-label="View ${escapeHtml(item.category || 'angle')} image ${idx + 1}"
                >
                  <img src="${thumbUrl}" alt="Thumbnail ${idx + 1}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 42% Right Column: Sticky Identity & Action Panel -->
        <div class="watch-identity-panel">
          <div class="watch-identity-eyebrow">
            <span class="watch-brand-tag">${escapeHtml(watch.brand)}</span>
            <span class="watch-origin-tag">${escapeHtml(watch.specifications?.identity?.countryOfOrigin || 'Switzerland')}</span>
          </div>

          <h1 class="watch-title-display">${escapeHtml(watch.model)}</h1>

          <div class="watch-reference-meta">
            Ref. ${escapeHtml(watch.referenceNumber || watch.reference)} &bull; ${watch.year} &bull; Archival Serial Ledger
          </div>

          <!-- Badges Cluster -->
          <div class="watch-badge-cluster">
            ${createStatusBadge(watch.condition.toLowerCase(), watch.condition)}
            <span class="badge ${watch.inspectionStatus === 'Inspected' ? 'badge-verified' : 'badge-reserved'}">
              ${watch.inspectionStatus === 'Inspected' ? '7-Stage Inspected' : 'Inspection Pending'}
            </span>
            <span class="badge badge-subtle">Demonstration Record</span>
          </div>

          <!-- Price Display -->
          <div class="watch-price-box">
            <div class="watch-price-num">${formatCurrency(watch.price, watch.currency)}</div>
            <div class="watch-price-subtext">Includes applicable duty, valuation appraisal &amp; fully insured armored courier handover.</div>
          </div>

          <!-- Concise Editorial Summary -->
          <p class="watch-summary-prose">
            ${escapeHtml(watch.summary || watch.tagline || 'A hand-selected chronometer possessing verified mechanical integrity and documented provenance.')}
          </p>

          <!-- Interactive Action Controls -->
          <div class="watch-action-cluster">
            <button type="button" class="btn btn-primary" id="openEnquiryModalBtn">
              Enquire About This Watch
            </button>
            <div class="watch-secondary-actions">
              <button 
                type="button" 
                class="btn btn-secondary btn-icon ${inWishlist ? 'active' : ''}" 
                id="watchDetailWishlistBtn" 
                data-id="${watch.id}" 
                aria-label="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                title="${inWishlist ? 'Saved in Vault' : 'Save to Wishlist'}"
              >
                ${inWishlist ? ICONS.heartFilled : ICONS.heart}
              </button>
              <button 
                type="button" 
                class="btn btn-secondary btn-icon ${inCompare ? 'active' : ''}" 
                id="watchDetailCompareBtn" 
                data-id="${watch.id}" 
                aria-label="${inCompare ? 'Remove from Comparison' : 'Add to Comparison'}"
                title="${inCompare ? 'In Comparison Tray' : 'Compare Timepiece'}"
              >
                ${ICONS.scale}
              </button>
              <button 
                type="button" 
                class="btn btn-secondary btn-icon" 
                id="watchDetailShareBtn" 
                aria-label="Share Timepiece"
                title="Share or Copy Link"
              >
                ${ICONS.share || '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'}
              </button>
            </div>
            <a href="#/appointment?watchId=${watch.id}" class="btn btn-outline btn-xs w-full text-center mt-2" title="Schedule private consultation or viewing">
              Schedule Private Viewing &rarr;
            </a>
          </div>

          <!-- Trust & Authenticity Strip -->
          <div class="watch-trust-pills">
            <div class="trust-pill-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Escrow Protected</span>
            </div>
            <div class="trust-pill-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span>Armored Courier</span>
            </div>
            <div class="trust-pill-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>24-Mo Guarantee</span>
            </div>
            <div class="trust-pill-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Lifetime Authenticity</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           SECTION B: WATCH OVERVIEW
           ==================================================================== -->
      <section class="watch-overview-section mb-16" aria-label="Watch Overview">
        <div class="watch-overview-grid">
          <div class="overview-card">
            <span class="section-kicker">Curatorial Overview</span>
            <h2 class="heading-3 mb-4">${escapeHtml(watch.overview?.headline || watch.model)}</h2>
            <p class="body-secondary mb-6 leading-relaxed">
              ${escapeHtml(watch.overview?.description || watch.summary)}
            </p>

            <h4 class="font-mono text-xs uppercase tracking-wider text-accent mb-3">Distinguishing Design Characteristics</h4>
            <div class="overview-char-list">
              ${(watch.overview?.designCharacteristics || [
                `Precision case engineered in ${watch.caseMaterial}`,
                `High-legibility dial in ${watch.dialColour}`,
                `Equipped with ${watch.calibre} movement`
              ]).map(char => `
                <div class="overview-char-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${escapeHtml(char)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="overview-card flex flex-col justify-between">
            <div>
              <span class="section-kicker">Horological Context</span>
              <h3 class="heading-4 mb-3">Historical Provenance</h3>
              <p class="text-sm text-secondary mb-4 leading-relaxed">
                ${escapeHtml(watch.overview?.historicalContext || 'A pivotal reference in modern mechanical horology, maintaining the manufacturer\'s legacy of chronometric excellence.')}
              </p>
              
              <div class="historical-context-panel">
                <span class="text-xs font-mono uppercase text-accent block mb-1">Lot Significance</span>
                <p class="text-xs text-secondary italic">
                  ${escapeHtml(watch.overview?.exampleNoteworthiness || 'Maintained in verified collector state with complete archival documentation.')}
                </p>
              </div>
            </div>

            <div class="mt-6 pt-4 border-top" style="border-color: var(--border-subtle);">
              <span class="text-xs text-muted font-mono">Intended Operational Scope:</span>
              <p class="text-xs text-secondary mt-1">${escapeHtml(watch.overview?.intendedUse || 'Professional chronometry and discerning personal collection.')}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           SECTION C: TECHNICAL SPECIFICATIONS (6 Structured Domains)
           ==================================================================== -->
      <section class="specs-matrix-section mb-16" aria-label="Technical Specifications">
        <div class="text-center mb-8">
          <span class="section-kicker">Manufacture Architecture</span>
          <h2 class="heading-3">Six-Point Technical Specifications Matrix</h2>
        </div>

        <div class="specs-grid-layout" id="specsMatrixAccordion">
          <!-- 1. Identity -->
          <div class="specs-group-card">
            <button type="button" class="specs-group-header w-full text-left" aria-expanded="true">
              <span>01 &bull; Identity &amp; Origin</span>
              <span class="accordion-icon">−</span>
            </button>
            <div class="specs-group-body">
              <div class="spec-matrix-row"><span class="spec-matrix-label">Manufacturer</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.identity?.brand || watch.brand)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Model Designation</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.identity?.model || watch.model)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Collection Family</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.identity?.collectionFamily || watch.family)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Reference Number</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.identity?.reference || watch.reference)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Production Year</span><span class="spec-matrix-val">${watch.specifications?.identity?.productionYear || watch.year}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Manufacture Origin</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.identity?.countryOfOrigin || 'Switzerland')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Archival Serial</span><span class="spec-matrix-val text-muted">${watch.specifications?.identity?.serialNumber || 'Confidential / Archival Ledger'}</span></div>
            </div>
          </div>

          <!-- 2. Case Architecture -->
          <div class="specs-group-card">
            <button type="button" class="specs-group-header w-full text-left" aria-expanded="true">
              <span>02 &bull; Case Architecture</span>
              <span class="accordion-icon">−</span>
            </button>
            <div class="specs-group-body">
              <div class="spec-matrix-row"><span class="spec-matrix-label">Case Metallurgy</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.case?.material || watch.caseMaterial)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Case Diameter</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.case?.diameter || `${watch.caseSizeMm} mm`)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Lug-to-Lug Span</span><span class="spec-matrix-val">${watch.specifications?.case?.lugToLug ? escapeHtml(watch.specifications.case.lugToLug) : 'Not specified'}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Case Thickness</span><span class="spec-matrix-val">${watch.specifications?.case?.thickness ? escapeHtml(watch.specifications.case.thickness) : 'Not specified'}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Crystal</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.case?.crystal || 'Sapphire Crystal')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Water Resistance</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.case?.waterResistance || watch.waterResistance)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Bezel Construction</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.case?.bezel || 'Fixed / Tailored Bezel')}</span></div>
            </div>
          </div>

          <!-- 3. Dial & Handset -->
          <div class="specs-group-card">
            <button type="button" class="specs-group-header w-full text-left" aria-expanded="true">
              <span>03 &bull; Dial &amp; Handset</span>
              <span class="accordion-icon">−</span>
            </button>
            <div class="specs-group-body">
              <div class="spec-matrix-row"><span class="spec-matrix-label">Dial Color</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.dial?.colour || watch.dialColour)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Dial Finish</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.dial?.finish || 'Lacquer / Enamel')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Index Style</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.dial?.indexStyle || 'Applied Faceted Markers')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Luminescent Fill</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.dial?.lume || 'Swiss Super-LumiNova')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Handset Geometry</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.dial?.hands || 'Manufacture Faceted Hands')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Date Complication</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.dial?.complicationDisplay || 'Aperture')}</span></div>
            </div>
          </div>

          <!-- 4. Movement Mechanics -->
          <div class="specs-group-card">
            <button type="button" class="specs-group-header w-full text-left" aria-expanded="true">
              <span>04 &bull; Movement Mechanics</span>
              <span class="accordion-icon">−</span>
            </button>
            <div class="specs-group-body">
              <div class="spec-matrix-row"><span class="spec-matrix-label">Calibre</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.movement?.calibre || watch.calibre)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Movement Type</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.movement?.type || watch.movementType)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Oscillation Frequency</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.movement?.frequency || '28,800 vph (4.0 Hz)')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Power Reserve</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.movement?.powerReserve || '48 Hours')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Jewel Complement</span><span class="spec-matrix-val">${watch.specifications?.movement?.jewels || 27} Jewels</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Chronometer Standard</span><span class="spec-matrix-val text-verified">${escapeHtml(watch.specifications?.movement?.accuracyStandard || 'Manufacture Standard')}</span></div>
            </div>
          </div>

          <!-- 5. Bracelet & Ergonomics -->
          <div class="specs-group-card">
            <button type="button" class="specs-group-header w-full text-left" aria-expanded="true">
              <span>05 &bull; Bracelet &amp; Ergonomics</span>
              <span class="accordion-icon">−</span>
            </button>
            <div class="specs-group-body">
              <div class="spec-matrix-row"><span class="spec-matrix-label">Bracelet Type</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.braceletStrap?.type || 'Solid Link Bracelet')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Material</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.braceletStrap?.material || watch.caseMaterial)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Clasp Architecture</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.braceletStrap?.claspType || 'Folding Clasp with Safety Catch')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Originality Status</span><span class="spec-matrix-val text-verified">${escapeHtml(watch.specifications?.braceletStrap?.originalityStatus || 'Factory Original')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Additional Straps</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.braceletStrap?.additionalStraps || 'None')}</span></div>
            </div>
          </div>

          <!-- 6. Archival Accessories -->
          <div class="specs-group-card">
            <button type="button" class="specs-group-header w-full text-left" aria-expanded="true">
              <span>06 &bull; Archival Accessories</span>
              <span class="accordion-icon">−</span>
            </button>
            <div class="specs-group-body">
              <div class="spec-matrix-row"><span class="spec-matrix-label">Presentation Box</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.other?.box || watch.boxStatus)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Documentation</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.other?.papers || watch.papersStatus)}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Service History</span><span class="spec-matrix-val">${escapeHtml(watch.specifications?.other?.serviceDocumentation || 'Not Applicable')}</span></div>
              <div class="spec-matrix-row"><span class="spec-matrix-label">Warranty Backing</span><span class="spec-matrix-val text-verified">${escapeHtml(watch.specifications?.other?.warrantyInfo || '24 Months HOROLOGY Guarantee')}</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           SECTION D: MOVEMENT INTELLIGENCE
           ==================================================================== -->
      <section class="watch-movement-section mb-16" aria-label="Movement Intelligence">
        <div class="movement-intelligence-grid">
          <div class="movement-specs-card">
            <span class="section-kicker">Calibre Telemetry &amp; Architecture</span>
            <h2 class="heading-3 mb-4">${escapeHtml(watch.movementIntelligence?.calibre || watch.calibre)}</h2>
            <p class="body-secondary mb-6 leading-relaxed">
              ${escapeHtml(watch.movementIntelligence?.mechanismExplanation || 'An observatory-grade mechanical movement developed and decorated in accordance with traditional haute horlogerie finishing standards.')}
            </p>

            <div class="grid grid-cols-2 gap-4 font-mono text-xs mb-6" style="display: grid; grid-template-columns: repeat(2, 1fr);">
              <div class="p-3 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                <span class="text-muted block mb-1">Architecture</span>
                <span class="text-primary font-bold">${escapeHtml(watch.movementIntelligence?.architecture || watch.movementType)}</span>
              </div>
              <div class="p-3 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                <span class="text-muted block mb-1">Frequency</span>
                <span class="text-accent font-bold">${watch.movementIntelligence?.frequencyVph ? `${watch.movementIntelligence.frequencyVph.toLocaleString()} vph` : 'Spring Drive'}</span>
              </div>
              <div class="p-3 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                <span class="text-muted block mb-1">Power Autonomy</span>
                <span class="text-primary font-bold">${escapeHtml(watch.movementIntelligence?.powerReserve || '48 Hours')}</span>
              </div>
              <div class="p-3 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                <span class="text-muted block mb-1">Jewels</span>
                <span class="text-primary font-bold">${watch.movementIntelligence?.jewels || 27} Jewels</span>
              </div>
            </div>

            <!-- Distinction Badge: Manufacturer Specifications vs Bench Telemetry -->
            <div class="movement-telemetry-notice">
              <strong>Transparent Demonstration Standard:</strong> Stated chronometric tolerances reflect manufacturer specifications. Measured Witschi Chronoscope acoustic telemetry readings for this individual lot are displayed inside the Archival Inspection Dossier.
            </div>
          </div>

          <!-- Movement Complications & Lab Exploration -->
          <div class="movement-specs-card flex flex-col justify-between">
            <div>
              <span class="section-kicker">Horological Complications</span>
              <h3 class="heading-4 mb-4">Complication Matrix</h3>
              <ul class="overview-char-list mb-6">
                ${(watch.movementIntelligence?.complications || ['Hours, Minutes, Seconds']).map(comp => `
                  <li class="overview-char-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>${escapeHtml(comp)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <div class="p-6 bg-secondary border text-center" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="flex items-center justify-center gap-3 mb-2 text-accent">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 3v18M3 12h18"/>
                </svg>
                <span class="font-mono text-sm font-bold">HOROLOGY Movement Laboratory</span>
              </div>
              <p class="text-xs text-muted mb-4">Explore live escapement kinematics, variable inertia regulation, and gear train physics in our interactive laboratory.</p>
              <a href="#/movement-lab" class="btn btn-outline btn-sm">Launch Movement Lab &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           SECTION E: CONDITION ASSESSMENT & EXPANDABLE GRADING SCALE
           ==================================================================== -->
      <section class="condition-section mb-16" aria-label="Condition Assessment">
        <div class="condition-rubric-card">
          <div class="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <span class="section-kicker">Physical Examination Report</span>
              <h2 class="heading-3">Condition Assessment &bull; Grade: ${escapeHtml(watch.conditionAssessment?.overallGrade || watch.condition)}</h2>
            </div>
            <span class="badge badge-subtle">Assessed by: ${escapeHtml(watch.conditionAssessment?.assessedBy || 'HOROLOGY Technical Desk')}</span>
          </div>

          <div class="condition-disclaimer-banner">
            <strong>Internal Grading Standard Notice:</strong> Condition grades reflect HOROLOGY internal technical standards formulated for discerning collectors and do not correspond to any commercial third-party universal scale.
          </div>

          <!-- Interactive Expandable Grading Scale Button -->
          <button type="button" class="grading-scale-toggle-btn" id="toggleGradingScaleBtn" aria-expanded="false">
            <span>View 5-Tier HOROLOGY Grading Rubric</span>
            <span id="gradingScaleIcon">+</span>
          </button>

          <!-- Expandable 5-Tier Rubric Panel -->
          <div class="grading-scale-panel" id="gradingScalePanel">
            <div class="grading-scale-tier">
              <div class="grading-tier-header">
                <span class="badge badge-verified">Unworn (10/10)</span>
                <span class="grading-tier-title">Factory Preservation State</span>
              </div>
              <p class="grading-tier-desc">Pristine timepiece never worn outside factory delivery, retaining original factory protective seals, perfect sharp chamfers, and zero handling abrasions.</p>
            </div>

            <div class="grading-scale-tier">
              <div class="grading-tier-header">
                <span class="badge badge-verified">Excellent (9.0 &ndash; 9.9/10)</span>
                <span class="grading-tier-title">Discerning Collector Quality</span>
              </div>
              <p class="grading-tier-desc">Minor handling hairlines visible only under optical magnification. Crisp unpolished bevels, flawless dial and hands, tight bracelet with negligible stretch.</p>
            </div>

            <div class="grading-scale-tier">
              <div class="grading-tier-header">
                <span class="badge badge-subtle">Very Good (8.0 &ndash; 8.9/10)</span>
                <span class="grading-tier-title">Gently Worn Authenticity</span>
              </div>
              <p class="grading-tier-desc">Superficial surface hairlines consistent with occasional executive wear. No deep dings or structural trauma; dial, sapphire, and movement remain pristine.</p>
            </div>

            <div class="grading-scale-tier">
              <div class="grading-tier-header">
                <span class="badge badge-reserved">Good (7.0 &ndash; 7.9/10)</span>
                <span class="grading-tier-title">Honest Regular Rotation</span>
              </div>
              <p class="grading-tier-desc">Noticeable signs of daily wear, surface contact marks on case sides or bracelet clasp. Fully functional mechanical movement and intact legibility.</p>
            </div>

            <div class="grading-scale-tier">
              <div class="grading-tier-header">
                <span class="badge badge-archived">Fair (&lt; 7.0/10)</span>
                <span class="grading-tier-title">Historical Vintage / Restoration Candidate</span>
              </div>
              <p class="grading-tier-desc">Significant aesthetic wear, softened chamfers, or patina. Reserved for historic rarities where mechanical restoration is documented.</p>
            </div>
          </div>

          <!-- Component-by-Component Breakdown Grid with Gallery Cross-Jumps -->
          <div class="component-grades-grid mb-6">
            ${Object.entries(watch.conditionAssessment?.componentGrades || {}).map(([part, gradeDesc]) => `
              <div class="component-grade-box">
                <div class="flex items-center justify-between mb-1">
                  <span class="component-grade-title">${escapeHtml(part.toUpperCase())}</span>
                  <button type="button" class="gallery-jump-btn" data-gallery-jump="0" aria-label="View ${escapeHtml(part)} in gallery">
                    <span>Inspect</span> &rarr;
                  </button>
                </div>
                <div class="component-grade-detail">${escapeHtml(gradeDesc)}</div>
              </div>
            `).join('')}
          </div>

          <div class="p-4 bg-secondary border font-mono text-xs text-secondary" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-2"><strong class="text-primary">Functional Observation:</strong> ${escapeHtml(watch.conditionAssessment?.functionalObservations || 'All mechanical functions operate within tolerance.')}</div>
            <div class="mb-2"><strong class="text-primary">Visible Surface Marks:</strong> ${escapeHtml(watch.conditionAssessment?.visibleMarks || 'Superficial handling hairlines consistent with grade.')}</div>
            <div><strong class="text-primary">Originality / Replacement Notes:</strong> ${escapeHtml(watch.conditionAssessment?.replacementOrRefinishedNotes || '100% factory original components.')}</div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           SECTION F: HOROLOGY INSPECTION DOSSIER SUMMARY
           ==================================================================== -->
      <section class="dossier-preview-banner" aria-label="Inspection Dossier Preview">
        <div class="dossier-preview-content">
          <div class="dossier-preview-left">
            <div class="dossier-status-pill-row">
              <span class="badge badge-verified">Forensic Certification</span>
              <span class="badge badge-subtle">Dossier ID: ${escapeHtml(watch.inspectionReport?.referenceId || `INS-DEMO-${watch.reference}`)}</span>
            </div>
            <h2 class="heading-3 mb-2">HOROLOGY Archival Inspection Dossier</h2>
            <p class="body-secondary text-sm mb-4 leading-relaxed">
              Every certified timepiece in our vault is governed by a comprehensive forensic inspection dossier verifying structural originality, dial typography, case geometry, and timing machine status.
            </p>
            <div class="flex items-center gap-6 text-xs font-mono text-muted flex-wrap">
              <span>&bull; Status: <strong class="text-verified">${escapeHtml(watch.inspectionReport?.overallResult || 'Passed Examination')}</strong></span>
              <span>&bull; Authenticity Checks: <strong class="text-accent">8 / 8 Verified</strong></span>
              <span>&bull; Telemetry: <strong class="text-primary">Unrecorded (Demonstration)</strong></span>
            </div>
          </div>

          <div>
            <a href="#/inspection/${watch.id}" class="btn btn-primary btn-lg">
              View Full Inspection Dossier &rarr;
            </a>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           SECTION G: RELATED WATCHES
           ==================================================================== -->
      ${relatedWatches.length > 0 ? `
        <section class="related-watches-section" aria-label="Related Timepieces">
          <div class="flex items-end justify-between mb-6">
            <div>
              <span class="section-kicker">Curated Allocations</span>
              <h2 class="heading-3">Similar Timepieces in Vault</h2>
            </div>
            <a href="#/collection" class="btn btn-outline btn-sm">View Full Collection &rarr;</a>
          </div>

          <div class="related-watches-grid">
            ${relatedWatches.map(rel => createWatchCard(rel)).join('')}
          </div>
        </section>
      ` : ''}

      <!-- SECTION H: RECENTLY EXAMINED TIMEPIECES -->
      ${recentWatches.length > 0 ? createRecentlyViewedShelf(recentWatches, { title: 'Recently Examined Timepieces', kicker: 'Observatory History' }) : ''}

    </div>

    <!-- FULLSCREEN LIGHTBOX MODAL (Managed by GalleryController) -->
    <div class="lightbox-modal" id="lightboxModal" style="display: none;" role="dialog" aria-modal="true" aria-label="Image Zoom Lightbox">
      <div class="lightbox-header">
        <div>
          <span class="font-mono text-xs text-accent uppercase tracking-wider">${escapeHtml(watch.brand)} &bull; ${escapeHtml(watch.model)}</span>
          <span class="font-mono text-xs text-muted block" id="lightboxCounter">01 / ${galleryItems.length}</span>
        </div>
        <button type="button" class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Close Lightbox (Escape)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="lightbox-stage" id="lightboxStage">
        <img src="${primaryImgUrl}" alt="${escapeHtml(watch.model)}" class="lightbox-img" id="lightboxImg" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
      </div>
    </div>
  `;
}

export function mount(ctx) {
  const identifier = ctx.params?.watchId || ctx.params?.slug;
  const watch = findWatchByIdentifier(identifier);
  if (!watch) return;

  const galleryItems = watch.galleryItems || [
    { assetKey: watch.image || watch.imageUrl, category: 'Studio Master' }
  ];

  // 1. Initialize Reusable Gallery Controller
  const galleryContainer = document.getElementById('watchGalleryContainer');
  const gallery = new GalleryController({
    container: galleryContainer,
    items: galleryItems,
    zoomLevel: 2.2
  });
  gallery.init(galleryContainer);

  // 2. Bind Gallery Jump Links from Condition Assessment Breakdown
  const jumpButtons = document.querySelectorAll('.gallery-jump-btn');
  jumpButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIdx = parseInt(btn.dataset.galleryJump || '0', 10);
      gallery.selectIndex(targetIdx);
      // Smooth scroll to gallery stage
      const stage = document.getElementById('galleryStage');
      stage?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // 3. Bind Expandable HOROLOGY Condition Grading Scale
  const toggleGradingBtn = document.getElementById('toggleGradingScaleBtn');
  const gradingPanel = document.getElementById('gradingScalePanel');
  const gradingIcon = document.getElementById('gradingScaleIcon');

  toggleGradingBtn?.addEventListener('click', () => {
    const isHidden = gradingPanel.style.display === 'none' || !gradingPanel.style.display;
    gradingPanel.style.display = isHidden ? 'block' : 'none';
    toggleGradingBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    if (gradingIcon) gradingIcon.textContent = isHidden ? '−' : '+';
  });

  // 4. Bind Specifications Accordions on Mobile Viewports
  const specAccordions = document.querySelectorAll('#specsMatrixAccordion .specs-group-header');
  specAccordions.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const body = btn.nextElementSibling;
        const isCollapsed = body.style.display === 'none';
        body.style.display = isCollapsed ? 'block' : 'none';
        btn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        const icon = btn.querySelector('.accordion-icon');
        if (icon) icon.textContent = isCollapsed ? '−' : '+';
      }
    });
  });

  // 5. Bind Watch Detail Action Controls
  // Enquiry Modal
  const openEnquiryBtn = document.getElementById('openEnquiryModalBtn');
  openEnquiryBtn?.addEventListener('click', () => {
    enquiryModal.open(watch);
  });

  // Wishlist Toggle
  const wishBtn = document.getElementById('watchDetailWishlistBtn');
  wishBtn?.addEventListener('click', () => {
    const isNow = store.toggleWishlist(watch.id);
    wishBtn.classList.toggle('active', isNow);
    wishBtn.innerHTML = isNow ? ICONS.heartFilled : ICONS.heart;
    wishBtn.setAttribute('aria-label', isNow ? 'Remove from Wishlist' : 'Add to Wishlist');
    wishBtn.setAttribute('title', isNow ? 'Saved in Vault' : 'Save to Wishlist');
  });

  // Compare Toggle
  const compBtn = document.getElementById('watchDetailCompareBtn');
  compBtn?.addEventListener('click', () => {
    const res = store.toggleCompare(watch.id);
    compBtn.classList.toggle('active', res.added);
    compBtn.setAttribute('aria-label', res.added ? 'Remove from Comparison' : 'Add to Comparison');
    compBtn.setAttribute('title', res.added ? 'In Comparison Tray' : 'Compare Timepiece');
  });

  // Share Button
  const shareBtn = document.getElementById('watchDetailShareBtn');
  shareBtn?.addEventListener('click', async () => {
    const shareData = {
      title: `HOROLOGY — ${watch.brand} ${watch.model}`,
      text: `Certified pre-owned ${watch.brand} ${watch.model} (${watch.referenceNumber || watch.reference}) on HOROLOGY.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if cancelled or rejected
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      store.showToast('Timepiece link copied to clipboard');
    } catch (clipErr) {
      store.showToast('Share URL: ' + window.location.href);
    }
  });

  // Teardown cleanup
  return () => {
    gallery.destroy();
  };
}
