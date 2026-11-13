/**
 * HOROLOGY — Page Template: Homepage
 * Direction: OBSIDIAN LUXURY EDITION (Phase 08)
 * Cinematic Hero, Featured Masterwork Showcase, Interactive Hotspots,
 * Curated Collection Vault & Horological Scholarship
 */

import { BRANDS, WATCHES, ARTICLES, getWatchById } from '../js/data.js';
import { createWatchCard, createBrandCard, createRecentlyViewedShelf, createHotspotMarker, createStatusBadge, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { escapeHTML, formatPrice } from '../js/utilities.js';
import { store } from '../js/state.js';
import { quickView } from '../js/quick-view.js';
import { playMechanicalClick, playWindingTick } from '../js/audio.js';
import { MechanicalChronometerWidget } from '../js/features/motion.js';

export const title = 'Beyond Time. Beyond Ordinary.';

let homeChronometer = null;

export async function render(ctx) {
  const heroPrimaryImg = resolveAsset('HZ-HERO-001');
  const movementMacroImg = resolveAsset('HZ-HERO-002');
  const loupeMacroImg = resolveAsset('HZ-HERO-003');

  // Featured Masterwork: Canonical Rolex Submariner Date 126610LN
  const masterworkWatch = WATCHES.find(w => w.id === 'demo-rolex-126610ln') || WATCHES[0];
  const masterworkImg = resolveAsset(masterworkWatch.image || masterworkWatch.imageUrl, { title: masterworkWatch.brand, subtitle: masterworkWatch.model });

  // Curated Supporting Timepieces (1 large + 2 supporting)
  const supportingWatches = WATCHES.filter(w => w.id !== masterworkWatch.id && w.featured).slice(0, 3);
  const collectorShowcaseWatches = WATCHES.filter(w => w.collectorSpotlight).slice(0, 4);

  // Journal Essays
  const journalSnippets = ARTICLES.slice(0, 3);

  // Recently Viewed History
  const recentIds = store.getRecentlyViewed();
  const recentWatches = recentIds.map(id => getWatchById(id)).filter(Boolean).slice(0, 4);

  // 5 Precision Horological Hotspots for the Featured Masterwork
  const masterworkHotspots = [
    {
      id: 'hotspot-bezel',
      xPercent: 50,
      yPercent: 20,
      title: 'Cerachrom Ceramic Bezel',
      spec: 'Unidirectional 60-Minute Graduation',
      description: 'Virtually scratchproof ceramic insert with knurled grip and numerals coated in fine platinum via PVD deposition.'
    },
    {
      id: 'hotspot-dial',
      xPercent: 48,
      yPercent: 48,
      title: 'Gloss Dial & Chromalight',
      spec: '18ct White Gold Applied Markers',
      description: 'Deep black lacquered dial with hand-applied gold appliques filled with long-lasting blue Chromalight luminescence.'
    },
    {
      id: 'hotspot-crown',
      xPercent: 82,
      yPercent: 50,
      title: 'Triplock Winding Crown',
      spec: 'Hermetic Seal (300m / 1,000ft)',
      description: 'Screw-down crown with four synthetic O-ring gaskets creating a submarine-grade water-tight barrier.'
    },
    {
      id: 'hotspot-case',
      xPercent: 20,
      yPercent: 50,
      title: 'Oystersteel Monobloc (904L)',
      spec: '41mm High-Corrosion Superalloy',
      description: 'Aerospace-grade metallurgy featuring satin-brushed lug flanks and mirror-polished case profile chamfers.'
    },
    {
      id: 'hotspot-bracelet',
      xPercent: 50,
      yPercent: 82,
      title: 'Oyster Bracelet & Glidelock',
      spec: 'Solid Links with 2mm Micro-Adjustments',
      description: 'Solid 904L three-link construction with folding Oysterlock safety clasp and tool-free Glidelock extension.'
    }
  ];

  return `
    <div class="homepage-view">
      <!-- ===================================================================
           SECTION 01: CINEMATIC HERO (Obsidian Luxury Opening)
           =================================================================== -->
      <section class="home-hero-band" aria-label="Hero Showcase">
        <div class="home-hero-backdrop">
          <img src="${heroPrimaryImg}" alt="Haute horlogerie chronometer on obsidian slate" class="home-hero-bg-img" loading="eager" fetchpriority="high" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
          <div class="home-hero-scrim"></div>
        </div>

        <div class="container">
          <div class="home-hero-layout" style="display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 48px; align-items: center; position: relative; z-index: 10;">
            <div class="home-hero-content" style="padding-top: var(--space-20); padding-bottom: var(--space-16); max-width: 100%;">
              <div class="overline home-hero-eyebrow">
                <span class="text-gold">HOROLOGY</span> &bull; <span>CURATED MECHANICAL TIMEPIECES</span>
              </div>
              
              <h1 class="home-hero-title">
                BEYOND TIME.<br>
                <em>BEYOND ORDINARY.</em>
              </h1>
              
              <p class="home-hero-lead">
                A private digital gallery of certified pre-owned mechanical chronometers from Rolex, Omega, Tudor, and Grand Seiko. Examined with forensic watchmaking rigor and validated with published electronic timing telemetry.
              </p>

              <div class="home-hero-actions">
                <a href="#/collection" class="btn btn-gold btn-lg">
                  <span>Explore Collection</span>
                  ${ICONS.arrowRight}
                </a>
                <a href="#/about" class="btn btn-outline btn-lg">
                  <span>Discover The Experience</span>
                </a>
              </div>

              <!-- Precision Horological Pillars with Animated Counters -->
              <div class="home-hero-pillars">
                <div class="home-hero-pillar-item">
                  <strong data-counter-target="8" data-counter-suffix="-Stage">8-Stage</strong>
                  <span>Forensic Intake</span>
                </div>
                <div class="home-hero-pillar-item">
                  <strong>&plusmn;2 s/day</strong>
                  <span>Timing Benchmarks</span>
                </div>
                <div class="home-hero-pillar-item">
                  <strong data-counter-target="24" data-counter-suffix=" Months">24 Months</strong>
                  <span>Mechanical Warranty</span>
                </div>
              </div>
            </div>

            <!-- Hero Live Chronometer Instrument -->
            <div class="home-hero-chronometer-col hide-mobile" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-primary); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
                &#x2316; Live Escapement Telemetry
              </div>
              <div id="homeHeroChronometerStage" style="width: 100%; max-width: 300px;"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 02: FEATURED MASTERWORK (Asymmetrical Museum Showcase)
           =================================================================== -->
      <section class="home-masterwork-band section-spacer-editorial" aria-label="Featured Masterwork">
        <div class="container">
          <div class="section-header mb-8">
            <span class="section-kicker">EXHIBITION MASTERWORK</span>
            <h2 class="heading-1">Landmark Mechanical Specimen</h2>
            <p class="lead-text" style="max-width: 680px;">
              An uncompromised exemplar of underwater tool watch engineering. Inspected under high-power stereomicroscopy with unpolished factory lug bevels.
            </p>
          </div>

          <div class="masterwork-asymmetric-grid">
            <!-- 70% Dominated Visual Composition with Interactive Hotspots -->
            <div class="masterwork-stage-frame">
              <div class="masterwork-stage-badge">
                ${createStatusBadge('verified', 'Certified Chronometer')}
              </div>
              
              <div class="hotspot-stage">
                <img src="${masterworkImg}" alt="${escapeHTML(masterworkWatch.brand)} ${escapeHTML(masterworkWatch.model)}" class="masterwork-image" loading="lazy" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
                
                <!-- Interactive Watch Hotspots -->
                ${masterworkHotspots.map(h => createHotspotMarker(h)).join('')}
              </div>

              <!-- Hotspot Hint Pill -->
              <div class="masterwork-hint-bar">
                <span style="color: var(--accent-primary);">${ICONS.eye}</span>
                <span>Select hot-spots to inspect architecture, metallurgy &amp; precision seals</span>
              </div>
            </div>

            <!-- Supporting Curatorial Information Panel -->
            <div class="masterwork-info-panel">
              <div class="meta-label mb-2 text-gold">${escapeHTML(masterworkWatch.brand)} &bull; ${masterworkWatch.family}</div>
              <h3 class="font-serif text-3xl text-primary mb-2">${escapeHTML(masterworkWatch.model)}</h3>
              <p class="font-mono text-xs text-muted mb-6">Reference ${escapeHTML(masterworkWatch.referenceNumber)} &bull; Vintage ${masterworkWatch.year}</p>

              <div class="masterwork-price-block mb-6">
                <div class="font-mono text-2xl text-primary font-bold">${formatPrice(masterworkWatch.price)}</div>
                <div class="flex items-center gap-2 mt-1">
                  <span class="badge badge-subtle">Condition: ${escapeHTML(masterworkWatch.condition)}</span>
                  <span class="font-mono text-xs text-muted">Box &amp; Papers: Present</span>
                </div>
              </div>

              <div class="masterwork-specs-checklist mb-8">
                <div class="spec-row">
                  <span class="spec-label">Manufacture Calibre</span>
                  <span class="spec-value">${escapeHTML(masterworkWatch.calibre)}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Case Metallurgy</span>
                  <span class="spec-value">Oystersteel (41mm)</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Power Autonomy</span>
                  <span class="spec-value">70 Hours (Chronergy)</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Depth Rating</span>
                  <span class="spec-value">300 m / 1,000 ft</span>
                </div>
              </div>

              <p class="body-muted text-sm leading-relaxed mb-8">
                ${escapeHTML(masterworkWatch.summary)}
              </p>

              <div class="flex items-center gap-4 flex-wrap">
                <a href="#/watch/${masterworkWatch.slug}" class="btn btn-primary flex-1">
                  <span>Examine Dossier</span>
                  ${ICONS.arrowRight}
                </a>
                <button type="button" class="btn btn-secondary btn-icon" data-action="quick-view" data-id="${masterworkWatch.id}" title="Quick View of ${escapeHTML(masterworkWatch.model)}">
                  ${ICONS.eye}
                </button>
                <button type="button" class="btn btn-secondary btn-icon ${store.isInWishlist(masterworkWatch.id) ? 'active' : ''}" data-action="toggle-wishlist" data-id="${masterworkWatch.id}" title="Save to Wishlist">
                  ${store.isInWishlist(masterworkWatch.id) ? ICONS.heartFilled : ICONS.heart}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 03: ELEVATED MANUFACTURER HOUSES (2x2 Asymmetric Grid)
           =================================================================== -->
      <section class="section-spacer home-brands-band" aria-label="Manufacture Collections">
        <div class="container">
          <div class="section-header text-center">
            <span class="section-kicker">THE FOUR HOUSES</span>
            <h2 class="heading-2">Curated Four Exceptional Maisons</h2>
            <p>We concentrate our scholarship exclusively on four legendary houses to assure unmatched authentication depth, spare parts availability, and horological scholarship.</p>
          </div>

          <div class="brands-asymmetric-grid">
            ${BRANDS.map(brand => createBrandCard(brand)).join('')}
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 04: CURATED COLLECTION SHOWCASE (Asymmetric Editorial)
           =================================================================== -->
      <section class="section-spacer home-featured-band" aria-label="Featured Watches">
        <div class="container">
          <div class="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span class="section-kicker">OBSERVATORY SELECTION</span>
              <h2 class="heading-2">Curated Vault Specimen</h2>
              <div class="featured-demo-notice">
                <span>${ICONS.shield}</span>
                <span>Active Vault Catalog &bull; Demonstrative Verification Dossiers</span>
              </div>
            </div>
            <a href="#/collection" class="btn btn-outline">
              <span>View Complete Vault (24)</span>
              ${ICONS.arrowRight}
            </a>
          </div>

          <!-- Editorial Asymmetric Product Showcase -->
          <div class="watch-grid">
            ${supportingWatches.map(watch => createWatchCard(watch)).join('')}
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 05: THE HOROLOGY STANDARD (8-STAGE FORENSIC TIMELINE)
           =================================================================== -->
      <section class="section-spacer home-standard-band" aria-label="Inspection Standard">
        <div class="container">
          <div class="section-header text-center">
            <span class="section-kicker">FORENSIC VERIFICATION</span>
            <h2 class="heading-2">The HOROLOGY Eight-Stage Standard</h2>
            <p>Confidence is forged in evidence. Every chronometer admitted to the vault passes through an unhurried, multi-point diagnostic protocol before presentation.</p>
          </div>

          <div class="standard-schematic-grid">
            <div class="standard-schematic-item">
              <div class="standard-schematic-num">01 / INTAKE</div>
              <h4 class="standard-schematic-title">Initial Identification</h4>
              <p class="standard-schematic-desc">Reference number and serial architecture cross-referenced against manufacturer archival registers.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">02 / ARCHITECTURE</div>
              <h4 class="standard-schematic-title">Case &amp; Geometry</h4>
              <p class="standard-schematic-desc">Lug chamfers, bezel knurling, and crown guards examined to verify unpolished or sympathetic condition.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">03 / CHROMATOGRAPHY</div>
              <h4 class="standard-schematic-title">Dial &amp; Handset Review</h4>
              <p class="standard-schematic-desc">Dial typography, serif alignment, and luminescence checked under 365nm UV light for period authenticity.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">04 / CALIBRE</div>
              <h4 class="standard-schematic-title">Movement Deconstruction</h4>
              <p class="standard-schematic-desc">Caseback removed in laminar-flow cleanroom to inspect balance bridge, train jewels, and hairspring health.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">05 / TELEMETRY</div>
              <h4 class="standard-schematic-title">Mechanical Performance</h4>
              <p class="standard-schematic-desc">Acoustic diagnostics across 5 positions: daily rate, balance amplitude, and beat error measured electronically.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">06 / METALLURGY</div>
              <h4 class="standard-schematic-title">Bracelet &amp; Clasp</h4>
              <p class="standard-schematic-desc">Solid end links, date stamp codes, clasp tension, and spring bars audited for factory-spec integrity.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">07 / PROVENANCE</div>
              <h4 class="standard-schematic-title">Documentation &amp; Box</h4>
              <p class="standard-schematic-desc">Presentation case, warranty cards, chronometer tags, and purchase receipts audited for authenticity.</p>
            </div>

            <div class="standard-schematic-item">
              <div class="standard-schematic-num">08 / CERTIFICATION</div>
              <h4 class="standard-schematic-title">Condition Assessment</h4>
              <p class="standard-schematic-desc">Final synthesis across all 7 physical domains into a permanent, transparent Archival Inspection Dossier.</p>
            </div>
          </div>

          <div class="text-center mt-10">
            <a href="#/authenticity" class="btn btn-gold btn-lg">
              <span>Explore Authenticity Centre</span>
              ${ICONS.arrowRight}
            </a>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 06: MOVEMENT LAB PREVIEW (Immersive Mechanical Depth)
           =================================================================== -->
      <section class="section-spacer home-movement-band" aria-label="Movement Lab Preview">
        <div class="container">
          <div class="movement-preview-split">
            <div class="movement-preview-stage sapphire-refraction">
              <img src="${movementMacroImg}" alt="Microscopic mechanical watch escapement" class="w-full object-cover aspect-16-9" loading="lazy" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-secondary-dial-macro-16x9.jpg';">
              <!-- Technical callout pin -->
              <div class="movement-pin" style="top: 25%; left: 35%;">
                <span class="text-verified">&bull;</span>
                <span>Swiss Lever Escapement</span>
              </div>
              <div class="movement-pin" style="bottom: 30%; right: 25%;">
                <span class="text-gold">&bull;</span>
                <span>Variable Inertia Balance</span>
              </div>
            </div>

            <div>
              <span class="section-kicker">HOROLOGICAL SCIENCE</span>
              <h2 class="heading-2 mb-4">Inside the Movement Lab</h2>
              <p class="lead-text mb-6">
                Understand the physics governing timekeeping precision. From Rolex Chronergy escapements and Omega Co-Axial friction reduction to Grand Seiko Spring Drive quartz-regulated glide.
              </p>
              <div class="spec-list mb-8">
                <div class="spec-row"><span class="spec-label">Escapement Kinetics</span><span class="spec-value">Impulse Geometry &amp; Friction</span></div>
                <div class="spec-row"><span class="spec-label">Silicon Hairsprings</span><span class="spec-value">15,000 Gauss Antimagnetic</span></div>
                <div class="spec-row"><span class="spec-label">Dual-Impulse Mechanics</span><span class="spec-value">36,000 vph Hi-Beat Architecture</span></div>
              </div>
              <a href="#/movement-lab" class="btn btn-outline">
                <span>Enter The Movement Lab</span>
                ${ICONS.arrowRight}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 07: EDITORIAL PREVIEW (Collector's Journal)
           =================================================================== -->
      <section class="section-spacer home-journal-band" aria-label="Collector Journal Preview">
        <div class="container">
          <div class="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span class="section-kicker">COLLECTOR'S JOURNAL</span>
              <h2 class="heading-2">Horological Scholarship</h2>
              <p class="body-muted">Technical essays, market valuation dynamics, and collecting wisdom.</p>
            </div>
            <a href="#/journal" class="btn btn-outline">
              <span>Explore The Journal</span>
              ${ICONS.arrowRight}
            </a>
          </div>

          <div class="journal-grid">
            ${journalSnippets.map(article => `
              <a href="#/journal/${article.slug}" class="card-editorial sapphire-refraction">
                <div class="card-editorial-body">
                  <div class="card-editorial-meta">
                    <span class="badge badge-subtle">${escapeHTML(article.category)}</span>
                    <span>&bull;</span>
                    <span>${article.readTimeMinutes} min read</span>
                  </div>
                  <h3 class="card-editorial-title">${escapeHTML(article.title)}</h3>
                  <p class="card-editorial-snippet mb-4">${escapeHTML(article.summary)}</p>
                  <div class="flex items-center gap-2 text-gold mt-auto font-mono text-xs uppercase">
                    <span>Read Essay</span>
                    ${ICONS.arrowRight}
                  </div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ===================================================================
           SECTION 08: BUSINESS SERVICES & INSTITUTIONAL TOUCHPOINTS
           =================================================================== -->
      <section class="section-spacer" aria-label="Business Services and Institutional Access">
        <div class="container">
          <div class="grid grid-cols-3 gap-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            <!-- Box 13: Sell / Consign -->
            <div class="p-8 bg-card border flex flex-col justify-between sapphire-refraction" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <span class="section-kicker">CONSIGNMENT &amp; SALE</span>
                <h3 class="font-serif text-2xl text-primary mb-3">Sell / Consign</h3>
                <p class="body-muted text-sm leading-relaxed mb-6">
                  Every remarkable watch deserves the right next owner. Explore our transparent preliminary review and bespoke private consignment models.
                </p>
              </div>
              <div>
                <a href="#/sell-consign" class="btn btn-gold btn-sm w-full text-center">
                  <span>Start a Consignment</span>
                  ${ICONS.arrowRight}
                </a>
              </div>
            </div>

            <!-- Box 14: About HOROLOGY -->
            <div class="p-8 bg-card border flex flex-col justify-between sapphire-refraction" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <span class="section-kicker">INSTITUTIONAL CREDO</span>
                <h3 class="font-serif text-2xl text-primary mb-3">About HOROLOGY</h3>
                <p class="body-muted text-sm leading-relaxed mb-6">
                  A different perspective on collecting time. We champion empirical telemetry, untouched case geometry, and transparent horological scholarship.
                </p>
              </div>
              <div>
                <a href="#/about" class="btn btn-outline btn-sm w-full text-center">
                  <span>Our Story</span>
                  ${ICONS.arrowRight}
                </a>
              </div>
            </div>

            <!-- Box 15: Contact & Private Appointment -->
            <div class="p-8 bg-card border flex flex-col justify-between sapphire-refraction" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <span class="section-kicker">CONCIERGE ACCESS</span>
                <h3 class="font-serif text-2xl text-primary mb-3">Contact &amp; Private Appointment</h3>
                <p class="body-muted text-sm leading-relaxed mb-6">
                  Discuss a watch, request a viewing, or book a private consultation window with our specialized client advisory team.
                </p>
              </div>
              <div>
                <a href="#/appointment" class="btn btn-secondary btn-sm w-full text-center">
                  <span>Book an Appointment</span>
                  ${ICONS.arrowRight}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- RECENTLY VIEWED SHELF (When History Is Non-Empty) -->
      ${recentWatches.length > 0 ? `
        <div class="container section-spacer" style="padding-top: var(--space-8); padding-bottom: 0;">
          ${createRecentlyViewedShelf(recentWatches, { title: 'Recently Examined Timepieces', kicker: 'Observatory History' })}
        </div>
      ` : ''}

      <!-- ===================================================================
           SECTION 09: FINAL ARCHITECTURAL CLOSING CHAMBER
           =================================================================== -->
      <section class="home-closing-chamber" aria-label="Closing Call to Action">
        <div class="container">
          <div class="closing-chamber-box sapphire-refraction">
            <span class="overline mb-3 text-gold">DISCOVER EXCEPTIONAL HOROLOGY</span>
            <h2 class="heading-1 mb-4">Begin Your Acquisition Journey</h2>
            <p class="lead-text mb-8" style="font-size: var(--text-base); max-width: 580px; margin-left: auto; margin-right: auto;">
              Explore the live curated vault of 24 certified timepieces or commission our senior horologists to source a specific reference.
            </p>
            <div class="flex items-center justify-center gap-4 flex-wrap">
              <a href="#/collection" class="btn btn-gold btn-lg">
                <span>Explore The Collection</span>
                ${ICONS.arrowRight}
              </a>
              <a href="#/contact" class="btn btn-outline btn-lg">
                <span>Request Private Sourcing</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function mount(ctx) {
  // 1. Quick View modal trigger binding
  document.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const watch = WATCHES.find(w => w.id === id);
      if (watch) {
        quickView.open(watch);
      }
    });
  });

  // 2. Wishlist toggle binding
  document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      playMechanicalClick();
      const id = btn.getAttribute('data-id');
      if (id) {
        const added = store.toggleWishlist(id);
        btn.innerHTML = added ? ICONS.heartFilled : ICONS.heart;
        btn.classList.toggle('active', added);
      }
    });
  });

  // 3. Compare toggle binding
  document.querySelectorAll('[data-action="toggle-compare"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      playMechanicalClick();
      const id = btn.getAttribute('data-id');
      if (id) {
        const res = store.toggleCompare(id);
        btn.classList.toggle('active', res.added);
      }
    });
  });

  // 4. Telemetry Drawer Mobile Toggle
  document.querySelectorAll('[data-action="toggle-telemetry"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      playMechanicalClick();
      const card = btn.closest('.card-watch');
      if (card) {
        card.classList.toggle('telemetry-open');
      }
    });
  });

  // 5. Interactive Hotspot Markers
  document.querySelectorAll('.hotspot-beacon').forEach(beacon => {
    beacon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      playMechanicalClick();
      const item = beacon.closest('.hotspot-item');
      if (item) {
        const isAlreadyActive = item.classList.contains('active');
        document.querySelectorAll('.hotspot-item').forEach(hi => hi.classList.remove('active'));
        if (!isAlreadyActive) {
          item.classList.add('active');
          beacon.setAttribute('aria-expanded', 'true');
        } else {
          beacon.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Close hotspots when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hotspot-item')) {
      document.querySelectorAll('.hotspot-item').forEach(hi => {
        hi.classList.remove('active');
        hi.querySelector('.hotspot-beacon')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 6. Mount Live 28,800 vph Chronometer in Hero
  const heroChronoStage = document.getElementById('homeHeroChronometerStage');
  if (heroChronoStage) {
    homeChronometer = new MechanicalChronometerWidget(heroChronoStage, { frequency: 28800 });
  }
}

export function unmount() {
  if (homeChronometer) {
    homeChronometer.destroy();
    homeChronometer = null;
  }
}
