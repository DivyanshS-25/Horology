// HOROLOGY — Home Page Route Module
import { repository } from '../data/repository.js';
import { renderWatchCard } from '../components/watchCard.js';
import { generateWatchSvg } from '../utils/watchIllustrations.js';
import { icons } from '../utils/svgIcons.js';
import { openQuickView } from '../components/quickView.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';

export const homePage = {
  id: 'home',
  path: '/',
  title: 'HOROLOGY — Beyond Time. Beyond Ordinary.',

  render() {
    const featuredWatches = repository.getFeaturedWatches();
    const brands = repository.getAllBrands();
    const articles = repository.getAllArticles().slice(0, 3);

    const heroWatchSvg = generateWatchSvg('chronograph', {
      dialColor: '#07111F',
      bezelColor: '#1E293B',
      caseColor: '#CBD5E1',
      accentColor: '#D4AF37',
      brand: 'Omega'
    });

    return `
      <!-- Hero Section (Panel 01) -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-content">
            <span class="overline">Beyond Time. Beyond Ordinary.</span>
            <h1 class="hero-title">
              HOROLOGY
              <span>Exceptional Mechanical Timepieces.</span>
            </h1>
            <p class="hero-description">
              A considered collection of authentic pre-owned mechanical chronometers. Individually tested on high-precision acoustic timegraphers, forensic loupe-inspected, and delivered with verifiable inspection dossiers.
            </p>
            <div class="hero-cta-group">
              <a href="#/collection" class="btn btn-primary btn-lg">
                Explore Collection ${icons.arrowRight('', 16)}
              </a>
              <a href="#/authenticity" class="btn btn-outline btn-lg">
                Our Verification Process
              </a>
            </div>
          </div>

          <div class="hero-media-wrapper">
            <div class="hero-radial-glow"></div>
            <div class="hero-watch-display">
              ${heroWatchSvg}
            </div>
          </div>
        </div>
      </section>

      <!-- 4 Core Value Pillars (Panel 01 Bottom) -->
      <section class="pillars-section">
        <div class="container pillars-grid">
          <div class="pillar-item">
            <div class="pillar-icon-box">${icons.shield('', 22)}</div>
            <div>
              <h3 class="pillar-title">Authenticity Examination</h3>
              <p class="pillar-desc">Multi-point physical, dial micro-printing, and case serialization verification.</p>
            </div>
          </div>
          <div class="pillar-item">
            <div class="pillar-icon-box">${icons.gauge('', 22)}</div>
            <div>
              <h3 class="pillar-title">Movement Performance</h3>
              <p class="pillar-desc">Witschi acoustic timegrapher multi-positional rate, amplitude, and beat error testing.</p>
            </div>
          </div>
          <div class="pillar-item">
            <div class="pillar-icon-box">${icons.fileText('', 22)}</div>
            <div>
              <h3 class="pillar-title">Service History</h3>
              <p class="pillar-desc">Transparent provenance tracking and manufacturer service paper validation.</p>
            </div>
          </div>
          <div class="pillar-item">
            <div class="pillar-icon-box">${icons.tool('', 22)}</div>
            <div>
              <h3 class="pillar-title">Condition Reporting</h3>
              <p class="pillar-desc">Detailed photographic grading with unpolished factory bevel integrity assessment.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Curations -->
      <section class="container section-spacer">
        <div class="collection-toolbar">
          <div>
            <span class="overline">Curated Vault</span>
            <h2>Featured Timepieces</h2>
          </div>
          <a href="#/collection" class="btn btn-outline btn-sm">
            View All 24 Watches ${icons.arrowRight('', 14)}
          </a>
        </div>

        <div class="watch-grid">
          ${featuredWatches.slice(0, 6).map(watch => renderWatchCard(watch)).join('')}
        </div>
      </section>

      <!-- Manufacture Houses Spotlight (Panel 03) -->
      <section class="section-spacer" style="background: var(--color-bg-surface); border-top: 1px solid var(--color-border-hairline); border-bottom: 1px solid var(--color-border-hairline);">
        <div class="container">
          <div class="text-center section-title-wrap">
            <span class="overline">Preeminent Houses</span>
            <h2>Renowned Manufactures</h2>
            <p style="max-width: 620px; margin: var(--space-2) auto 0;">
              From the lunar legacy of the Speedmaster to the Zaratsu-polished snow ridges of Shinshu, explore horological excellence across iconic watchmaking houses.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-6);">
            ${brands.map(brand => `
              <div class="watch-card" style="padding: var(--space-6);">
                <span class="overline">${brand.origin}</span>
                <h3 style="font-size: var(--text-2xl); margin: var(--space-2) 0;">${brand.name}</h3>
                <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed); margin-bottom: var(--space-6);">
                  ${brand.description}
                </p>
                <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-6);">
                  ${brand.families.map(f => `
                    <span class="badge" style="background: var(--color-bg-base); color: var(--color-text-secondary); border: 1px solid var(--color-border-hairline);">
                      ${f.name}
                    </span>
                  `).join('')}
                </div>
                <a href="#/brand/${brand.id}" class="btn btn-outline btn-sm" style="margin-top: auto;">
                  Explore ${brand.name} ${icons.arrowRight('', 14)}
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Movement Lab & Finder Banners -->
      <section class="container section-spacer">
        <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-8);" class="hero-grid">
          <!-- Movement Lab Teaser -->
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border-hairline); border-radius: var(--radius-sm); padding: var(--space-8); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="overline">Interactive Horology</span>
              <h3 style="font-size: var(--text-2xl); margin: var(--space-2) 0;">Movement Lab &amp; Timegrapher</h3>
              <p style="margin-bottom: var(--space-6);">
                Explore how the balance wheel, escapement, and gear train regulate time. Experiment with frequency switches from 18,000 vph to 36,000 vph and observe real-time acoustic timing patterns.
              </p>
            </div>
            <a href="#/movement-lab" class="btn btn-primary" style="align-self: flex-start;">
              Launch Movement Lab ${icons.arrowRight('', 16)}
            </a>
          </div>

          <!-- Watch Finder Teaser -->
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border-hairline); border-radius: var(--radius-sm); padding: var(--space-8); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="overline">Guided Discovery</span>
              <h3 style="font-size: var(--text-2xl); margin: var(--space-2) 0;">6-Step Watch Finder</h3>
              <p style="margin-bottom: var(--space-6);">
                Uncertain which reference suits your wrist and collection goals? Our transparent algorithm matches your budget, diameter preference, and movement philosophy.
              </p>
            </div>
            <a href="#/finder" class="btn btn-outline" style="align-self: flex-start;">
              Start Watch Finder ${icons.arrowRight('', 16)}
            </a>
          </div>
        </div>
      </section>

      <!-- Collector's Journal Teaser (Panel 11) -->
      <section class="container section-spacer" style="padding-top: 0;">
        <div class="collection-toolbar">
          <div>
            <span class="overline">Knowledge &amp; Scholarship</span>
            <h2>Collector's Journal</h2>
          </div>
          <a href="#/journal" class="btn btn-outline btn-sm">
            Read All Articles ${icons.arrowRight('', 14)}
          </a>
        </div>

        <div class="journal-grid">
          ${articles.map(art => `
            <article class="article-card">
              <div class="article-media" style="display: flex; align-items: center; justify-content: center; background: #0B192A;">
                <span style="color: var(--color-accent-primary); font-family: var(--font-serif); font-size: var(--text-xl); font-style: italic;">
                  ${art.category}
                </span>
              </div>
              <div class="article-card-body">
                <span class="overline" style="font-size: 10px;">${art.category} &bull; ${art.readTimeMinutes} min read</span>
                <h3 style="font-size: var(--text-lg); line-height: var(--leading-snug);">
                  <a href="#/journal/${art.slug}">${art.title}</a>
                </h3>
                <p style="font-size: var(--text-sm);">${art.summary}</p>
                <a href="#/journal/${art.slug}" class="btn btn-ghost btn-sm" style="padding-left: 0; margin-top: auto; color: var(--color-accent-primary);">
                  Read Essay ${icons.arrowRight('', 14)}
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- Private Salon Appointment & Consignment Banner -->
      <section style="background: linear-gradient(180deg, var(--color-bg-surface) 0%, var(--color-bg-base) 100%); border-top: 1px solid var(--color-border-hairline); padding: var(--space-16) 0;">
        <div class="container text-center" style="max-width: 680px;">
          <span class="overline">Private Client Services</span>
          <h2 style="font-size: var(--text-3xl); margin: var(--space-2) 0 var(--space-4);">
            Consign a Masterpiece or Book a Salon Viewing
          </h2>
          <p style="margin-bottom: var(--space-8);">
            Every exceptional timepiece deserves an appreciative custodian. Discuss direct acquisition, consignment valuation, or schedule a discreet private viewing with our senior horologist.
          </p>
          <div style="display: flex; justify-content: center; gap: var(--space-4); flex-wrap: wrap;">
            <a href="#/contact" class="btn btn-primary btn-lg">Book Private Appointment</a>
            <a href="#/sell" class="btn btn-outline btn-lg">Start a Consignment</a>
          </div>
        </div>
      </section>
    `;
  },

  mount() {
    // Event delegation for card buttons
    const container = document.getElementById('app');
    if (!container) return;

    this.clickHandler = (e) => {
      const target = e.target;

      // Wishlist toggle
      const wishlistBtn = target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishlistBtn.dataset.id;
        const watch = repository.getWatchById(id);
        const isSaved = store.toggleWishlist(id);
        wishlistBtn.classList.toggle('active', isSaved);
        wishlistBtn.innerHTML = icons.heart('', 16, isSaved);
        showToast(isSaved ? `Added ${watch?.model || 'watch'} to Wishlist` : `Removed from Wishlist`);
        return;
      }

      // Compare toggle
      const compareBtn = target.closest('[data-action="compare"]');
      if (compareBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = compareBtn.dataset.id;
        const watch = repository.getWatchById(id);
        const isComparing = store.toggleCompare(id);
        compareBtn.classList.toggle('active', isComparing);
        showToast(isComparing ? `Added ${watch?.model || 'watch'} to Comparison` : `Removed from Comparison`);
        return;
      }

      // Quick View
      const quickBtn = target.closest('[data-action="quickview"]');
      if (quickBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = quickBtn.dataset.id;
        openQuickView(id);
        return;
      }
    };

    container.addEventListener('click', this.clickHandler);
  },

  unmount() {
    const container = document.getElementById('app');
    if (container && this.clickHandler) {
      container.removeEventListener('click', this.clickHandler);
    }
  }
};
