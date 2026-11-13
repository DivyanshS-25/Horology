/**
 * HOROLOGY — Global Navigation, Header & Footer Controller
 * Direction: OBSIDIAN LUXURY EDITION (Phase 08)
 * Scroll-aware Header, Brands Mega-Dropdown, Acoustic Tactility, Search Overlay, Mobile Drawer & Footer
 */

import { NAVIGATION, BRANDS, WATCHES } from './data.js';
import { ICONS } from './components.js';
import { store } from './state.js';
import { lockScroll, escapeHTML, formatPrice } from './utilities.js';
import { BUSINESS_CONFIG } from './config.js';
import { isAudioEnabled, toggleAudio, initGlobalAcoustics } from './audio.js';
import { isLumeMode } from './features/motion.js';

export class NavigationController {
  constructor() {
    this.headerEl = document.getElementById('siteHeader');
    this.footerEl = document.getElementById('siteFooter');
    this.searchOverlayEl = document.getElementById('searchOverlay');
    this.mobileDrawerEl = document.getElementById('mobileDrawer');
  }

  init() {
    this.renderHeader();
    this.renderFooter();
    this.renderSearchOverlay();
    this.renderMobileDrawer();

    this.bindScrollObserver();
    this.bindGlobalShortcuts();
    this.bindStateSubscriptions();
    this.bindAudioEvents();
    this.bindGlideBarEvents();

    initGlobalAcoustics();
  }

  renderHeader() {
    if (!this.headerEl) return;

    const wishlistCount = store.getWishlist().length;
    const compareCount = store.getCompareList().length;
    const audioActive = isAudioEnabled();
    const lumeActive = isLumeMode();

    this.headerEl.className = 'site-header';
    this.headerEl.innerHTML = `
      <div class="container">
        <div class="header-inner">
          <!-- Brand Wordmark -->
          <a href="#/" class="brand-wordmark" aria-label="HOROLOGY Home">
            <span class="brand-icon" style="color: var(--accent-primary);">${ICONS.balance}</span>
            <span>HOROLOGY</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav" aria-label="Primary Navigation">
            <a href="#/collection" class="nav-link" data-route="/collection">Collection</a>
            
            <!-- Brands Dropdown -->
            <div class="nav-item-dropdown">
              <a href="#/collection" class="nav-link" aria-haspopup="true" aria-expanded="false">
                <span>Brands</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1L5 5L9 1"/></svg>
              </a>
              <div class="dropdown-menu" role="menu">
                <a href="#/collection" class="dropdown-link" role="menuitem">
                  <span>All Manufactures</span>
                  <span class="badge badge-subtle">24 Ref</span>
                </a>
                <a href="#/brands/rolex" class="dropdown-link" role="menuitem">
                  <span>Rolex</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">Geneva</span>
                </a>
                <a href="#/brands/omega" class="dropdown-link" role="menuitem">
                  <span>Omega</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">Bienne</span>
                </a>
                <a href="#/brands/tudor" class="dropdown-link" role="menuitem">
                  <span>Tudor</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">Geneva</span>
                </a>
                <a href="#/brands/grand-seiko" class="dropdown-link" role="menuitem">
                  <span>Grand Seiko</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">Tokyo</span>
                </a>
              </div>
            </div>

            <a href="#/watch-finder" class="nav-link" data-route="/watch-finder">Watch Finder</a>
            <a href="#/sell-consign" class="nav-link" data-route="/sell-consign">Sell / Consign</a>
            <a href="#/movement-lab" class="nav-link" data-route="/movement-lab">Movement Lab</a>
            <a href="#/journal" class="nav-link" data-route="/journal">Journal</a>

            <!-- Sliding Golden Active Indicator Bar -->
            <div class="nav-active-glide-bar" id="navActiveGlideBar" aria-hidden="true"></div>
          </nav>

          <!-- Header Utilities -->
          <div class="header-actions">
            <!-- Super-LumiNova Nocturnal View Toggle -->
            <button type="button" class="nav-action-btn lume-mode-toggle-btn ${lumeActive ? 'lume-active' : ''}" id="headerLumeToggleBtn" aria-label="Lume Mode: ${lumeActive ? 'Active' : 'Off'}" title="${lumeActive ? 'Lume Mode: Active (Click for Daylight)' : 'Lume Mode: Off (Click for Super-LumiNova Nocturnal View)'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6"/>
              </svg>
            </button>

            <!-- Acoustic Tactility Toggle -->
            <button type="button" class="nav-action-btn ${audioActive ? 'audio-active' : ''}" id="headerAudioToggleBtn" aria-label="${audioActive ? 'Acoustic Tactility: Enabled' : 'Acoustic Tactility: Off'}" title="${audioActive ? 'Acoustic Tactility: Enabled (Click to Mute)' : 'Acoustic Tactility: Off (Click to Enable)'}">
              <span id="headerAudioIcon">${audioActive ? ICONS.volumeOn : ICONS.volumeOff}</span>
            </button>

            <!-- Search Button -->
            <button type="button" class="nav-action-btn" id="headerSearchBtn" aria-label="Search Collection (Press /)" title="Search Collection (/)">
              ${ICONS.search}
            </button>

            <!-- Wishlist Button -->
            <a href="#/wishlist" class="nav-action-btn" aria-label="View Wishlist" title="View Wishlist">
              ${ICONS.heart}
              <span class="counter-badge" id="headerWishlistBadge" data-count="${wishlistCount}">${wishlistCount || ''}</span>
            </a>

            <!-- Compare Button -->
            <a href="#/compare" class="nav-action-btn" aria-label="Compare Timepieces" title="Compare Timepieces">
              ${ICONS.scale}
              <span class="counter-badge" id="headerCompareBadge" data-count="${compareCount}">${compareCount || ''}</span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button type="button" class="nav-action-btn mobile-menu-toggle" id="mobileDrawerOpenBtn" aria-label="Open Navigation Drawer" aria-expanded="false" aria-controls="mobileDrawer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('headerSearchBtn')?.addEventListener('click', () => {
      this.openSearch();
    });

    document.getElementById('mobileDrawerOpenBtn')?.addEventListener('click', () => {
      this.openMobileDrawer();
    });

    document.getElementById('headerAudioToggleBtn')?.addEventListener('click', () => {
      const active = toggleAudio();
      this.updateAudioIcons(active);
      store.showToast(active ? 'Acoustic Tactility Enabled' : 'Acoustic Tactility Muted', { icon: active ? ICONS.volumeOn : ICONS.volumeOff });
    });
  }

  updateAudioIcons(enabled) {
    const desktopIcon = document.getElementById('headerAudioIcon');
    const desktopBtn = document.getElementById('headerAudioToggleBtn');
    if (desktopIcon) desktopIcon.innerHTML = enabled ? ICONS.volumeOn : ICONS.volumeOff;
    if (desktopBtn) {
      desktopBtn.classList.toggle('audio-active', enabled);
      desktopBtn.setAttribute('aria-label', enabled ? 'Acoustic Tactility: Enabled' : 'Acoustic Tactility: Off');
      desktopBtn.setAttribute('title', enabled ? 'Acoustic Tactility: Enabled (Click to Mute)' : 'Acoustic Tactility: Off (Click to Enable)');
    }

    const drawerIcon = document.getElementById('drawerAudioIcon');
    const drawerLabel = document.getElementById('drawerAudioLabel');
    if (drawerIcon) drawerIcon.innerHTML = enabled ? ICONS.volumeOn : ICONS.volumeOff;
    if (drawerLabel) drawerLabel.textContent = enabled ? 'Acoustics: Active' : 'Acoustics: Muted';
  }

  bindAudioEvents() {
    window.addEventListener('horology-audio-toggled', (e) => {
      this.updateAudioIcons(e.detail.enabled);
    });
  }

  renderFooter() {
    if (!this.footerEl) return;

    this.footerEl.className = 'site-footer';
    this.footerEl.innerHTML = `
      <div class="footer-top">
        <div class="container">
          <div class="footer-grid">
            <!-- Col 1: Brand & Thesis -->
            <div>
              <a href="#/" class="brand-wordmark mb-3" style="font-size: 1.4rem;">
                <span style="color: var(--accent-primary);">${ICONS.balance}</span>
                <span>HOROLOGY</span>
              </a>
              <p class="overline mb-3">Beyond Time. Beyond Ordinary.</p>
              <p class="body-muted mb-4" style="font-size: var(--text-sm); line-height: 1.6; max-width: 360px;">
                An independent sanctuary for certified pre-owned mechanical chronometers. Each timepiece is subjected to forensic examination and verified with transparent electronic telemetry.
              </p>
              <div class="flex items-center gap-3 text-gold font-mono" style="font-size: var(--text-xs);">
                <span>ROLEX</span> &bull; <span>OMEGA</span> &bull; <span>TUDOR</span> &bull; <span>GRAND SEIKO</span>
              </div>
            </div>

            <!-- Col 2: EXPLORE -->
            <div>
              <h4 class="footer-col-title">Explore</h4>
              <ul class="footer-links">
                ${(NAVIGATION.footer.explore || []).map(item => `
                  <li><a href="${item.href}" class="footer-link">${escapeHTML(item.label)}</a></li>
                `).join('')}
              </ul>
            </div>

            <!-- Col 3: DISCOVER -->
            <div>
              <h4 class="footer-col-title">Discover</h4>
              <ul class="footer-links">
                ${(NAVIGATION.footer.discover || []).map(item => `
                  <li><a href="${item.href}" class="footer-link">${escapeHTML(item.label)}</a></li>
                `).join('')}
              </ul>
            </div>

            <!-- Col 4: CONNECT -->
            <div>
              <h4 class="footer-col-title">Connect</h4>
              <ul class="footer-links">
                ${(NAVIGATION.footer.connect || []).map(item => `
                  <li><a href="${item.href}" class="footer-link">${escapeHTML(item.label)}</a></li>
                `).join('')}
              </ul>
            </div>

            <!-- Col 5: INFORMATION & COMPLIANCE -->
            <div>
              <h4 class="footer-col-title">Information</h4>
              <ul class="footer-links">
                ${(NAVIGATION.footer.information || []).map(item => `
                  <li><a href="${item.href}" class="footer-link">${escapeHTML(item.label)}</a></li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Legal & Institutional Sub-Footer -->
      <div class="footer-bottom">
        <div class="container flex items-center justify-between flex-wrap gap-4">
          <div class="text-dim" style="font-size: 0.75rem; line-height: 1.5; max-width: 720px;">
            ${escapeHTML(BUSINESS_CONFIG.legal?.trademarkDisclaimer || BUSINESS_CONFIG.brand?.trademarkNotice || '')}
          </div>
          <div class="font-mono text-dim" style="font-size: 0.75rem;">
            ${escapeHTML(BUSINESS_CONFIG.legal?.copyrightNotice || '© 2026 HOROLOGY. All rights reserved.')} &bull; Direction Obsidian Luxury
          </div>
        </div>
      </div>
    `;
  }

  renderSearchOverlay() {
    if (!this.searchOverlayEl) return;

    this.searchOverlayEl.className = 'search-overlay';
    this.searchOverlayEl.innerHTML = `
      <div class="search-backdrop" id="searchBackdrop"></div>
      <div class="search-modal-container">
        <div class="search-box">
          <input type="text" id="searchInput" class="search-input" placeholder="Search by model, reference, movement, caliber..." aria-label="Search Collection" autocomplete="off" spellcheck="false">
          <button type="button" class="search-close-btn" id="searchCloseBtn" aria-label="Close search overlay">
            ${ICONS.close}
          </button>
        </div>

        <div class="search-quick-chips">
          <span style="font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); text-transform: uppercase;">Curated Queries:</span>
          <button type="button" class="search-chip" data-query="Submariner">Submariner</button>
          <button type="button" class="search-chip" data-query="Speedmaster">Speedmaster</button>
          <button type="button" class="search-chip" data-query="Spring Drive">Spring Drive</button>
          <button type="button" class="search-chip" data-query="Black Bay">Black Bay</button>
          <button type="button" class="search-chip" data-query="Calibre 3235">Calibre 3235</button>
        </div>

        <div class="search-results-panel" id="searchResultsPanel" role="region" aria-live="polite">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    const searchInput = document.getElementById('searchInput');
    const closeBtn = document.getElementById('searchCloseBtn');
    const backdrop = document.getElementById('searchBackdrop');

    closeBtn?.addEventListener('click', () => this.closeSearch());
    backdrop?.addEventListener('click', () => this.closeSearch());

    document.querySelectorAll('.search-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (searchInput) {
          searchInput.value = query;
          this.executeSearch(query);
          searchInput.focus();
        }
      });
    });

    searchInput?.addEventListener('input', (e) => {
      this.executeSearch(e.target.value);
    });
  }

  renderMobileDrawer() {
    if (!this.mobileDrawerEl) return;

    const audioActive = isAudioEnabled();

    this.mobileDrawerEl.className = 'mobile-drawer';
    this.mobileDrawerEl.innerHTML = `
      <div class="mobile-drawer-backdrop" id="drawerBackdrop"></div>
      <div class="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div class="mobile-drawer-header">
          <span class="brand-wordmark" style="font-size: 1.25rem;">
            <span style="color: var(--accent-primary);">${ICONS.balance}</span>
            <span>HOROLOGY</span>
          </span>
          <button type="button" class="nav-action-btn" id="drawerCloseBtn" aria-label="Close navigation drawer">
            ${ICONS.close}
          </button>
        </div>

        <nav class="mobile-nav-list" aria-label="Mobile Primary Navigation">
          <a href="#/collection" class="mobile-nav-link">
            <span>The Collection</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/brands/rolex" class="mobile-nav-link">
            <span>Rolex (Geneva)</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/brands/omega" class="mobile-nav-link">
            <span>Omega (Bienne)</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/brands/tudor" class="mobile-nav-link">
            <span>Tudor (Geneva)</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/brands/grand-seiko" class="mobile-nav-link">
            <span>Grand Seiko (Tokyo)</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/watch-finder" class="mobile-nav-link">
            <span>Guided Watch Finder</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/sell-consign" class="mobile-nav-link">
            <span>Sell or Consign</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/appointment" class="mobile-nav-link">
            <span>Request Appointment</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/movement-lab" class="mobile-nav-link">
            <span>Movement Lab</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/authenticity" class="mobile-nav-link">
            <span>Authenticity Centre</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/journal" class="mobile-nav-link">
            <span>Collector's Journal</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/about" class="mobile-nav-link">
            <span>About HOROLOGY</span>
            ${ICONS.arrowRight}
          </a>
        </nav>

        <div class="mt-auto pt-6 border-top" style="border-color: var(--border-subtle);">
          <!-- Mobile Lume Toggle -->
          <button type="button" class="btn btn-outline btn-sm w-full mb-3 flex items-center justify-between lume-mode-toggle-btn" id="drawerLumeToggleBtn">
            <span class="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <span>Super-LumiNova View</span>
            </span>
            <span class="font-mono text-xs text-muted">Lume Mode</span>
          </button>

          <!-- Mobile Sound Toggle -->
          <button type="button" class="btn btn-outline btn-sm w-full mb-4 flex items-center justify-between" id="drawerAudioToggleBtn">
            <span class="flex items-center gap-2">
              <span id="drawerAudioIcon">${audioActive ? ICONS.volumeOn : ICONS.volumeOff}</span>
              <span id="drawerAudioLabel">${audioActive ? 'Acoustics: Active' : 'Acoustics: Muted'}</span>
            </span>
            <span class="font-mono text-xs text-muted">Web Audio</span>
          </button>

          <a href="#/appointment" class="btn btn-primary w-full text-center mb-3">
            <span>Book Private Viewing</span>
            ${ICONS.arrowRight}
          </a>
          <div class="text-center font-mono text-xs text-muted">
            Direct &bull; ${escapeHTML(BUSINESS_CONFIG.contact.email)}
          </div>
        </div>
      </div>
    `;

    document.getElementById('drawerCloseBtn')?.addEventListener('click', () => this.closeMobileDrawer());
    document.getElementById('drawerBackdrop')?.addEventListener('click', () => this.closeMobileDrawer());

    document.querySelectorAll('.mobile-nav-link, .mobile-drawer-panel a').forEach(link => {
      link.addEventListener('click', () => this.closeMobileDrawer());
    });

    document.getElementById('drawerAudioToggleBtn')?.addEventListener('click', () => {
      const active = toggleAudio();
      this.updateAudioIcons(active);
      store.showToast(active ? 'Acoustic Tactility Enabled' : 'Acoustic Tactility Muted', { icon: active ? ICONS.volumeOn : ICONS.volumeOff });
    });
  }

  openSearch() {
    if (!this.searchOverlayEl) return;
    this.searchOverlayEl.classList.add('open');
    lockScroll(true);
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
      setTimeout(() => searchInput.focus(), 100);
      this.executeSearch('');
    }
  }

  closeSearch() {
    if (!this.searchOverlayEl) return;
    this.searchOverlayEl.classList.remove('open');
    lockScroll(false);
  }

  openMobileDrawer() {
    if (!this.mobileDrawerEl) return;
    this.mobileDrawerEl.classList.add('open');
    lockScroll(true);
  }

  closeMobileDrawer() {
    if (!this.mobileDrawerEl) return;
    this.mobileDrawerEl.classList.remove('open');
    lockScroll(false);
  }

  executeSearch(query) {
    const resultsPanel = document.getElementById('searchResultsPanel');
    if (!resultsPanel) return;

    const trimmed = (query || '').trim().toLowerCase();

    if (!trimmed) {
      resultsPanel.innerHTML = `
        <div class="p-6 text-center text-muted font-mono" style="font-size: var(--text-xs);">
          Enter reference number, model, or manufacture to query the active collection.
        </div>
      `;
      return;
    }

    const matches = WATCHES.filter(watch => {
      const brand = (watch.brand || '').toLowerCase();
      const model = (watch.model || '').toLowerCase();
      const ref = (watch.referenceNumber || watch.reference || '').toLowerCase();
      const calibre = (watch.calibre || '').toLowerCase();
      const caseMat = (watch.caseMaterial || '').toLowerCase();
      const dial = (watch.dialColour || '').toLowerCase();
      return brand.includes(trimmed) ||
             model.includes(trimmed) ||
             ref.includes(trimmed) ||
             calibre.includes(trimmed) ||
             caseMat.includes(trimmed) ||
             dial.includes(trimmed);
    }).slice(0, 8);

    if (matches.length === 0) {
      resultsPanel.innerHTML = `
        <div class="p-8 text-center bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
          <div class="text-accent mb-2 font-mono text-xs">ARCHIVAL QUERY NULL</div>
          <p class="font-serif text-lg text-primary mb-1">No Timepieces Match "${escapeHTML(query)}"</p>
          <p class="body-muted text-xs">Try searching by brand (Rolex, Omega), model (Submariner, Speedmaster), or reference number.</p>
        </div>
      `;
      return;
    }

    resultsPanel.innerHTML = matches.map(watch => `
      <a href="#/watch/${watch.slug}" class="search-result-row" data-search-result>
        <div class="flex items-center gap-4">
          <div style="width: 52px; height: 52px; border-radius: var(--radius-xs); overflow: hidden; background: var(--bg-card); flex-shrink: 0; border: 1px solid var(--border-subtle);">
            <img src="${watch.imageUrl || watch.image}" alt="${escapeHTML(watch.model)}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <div class="font-mono text-xs text-accent uppercase">${escapeHTML(watch.brand)} &bull; ${escapeHTML(watch.reference || watch.referenceNumber)}</div>
            <div class="font-serif text-base text-primary">${escapeHTML(watch.model)}</div>
            <div class="text-xs text-muted font-mono">${escapeHTML(watch.movementType)} &bull; ${watch.caseSize || watch.caseSizeMm + ' mm'} &bull; ${watch.year}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-mono text-sm text-primary font-bold">${formatPrice(watch.price)}</div>
          <span class="badge badge-subtle" style="font-size: 0.65rem;">${escapeHTML(watch.condition)}</span>
        </div>
      </a>
    `).join('');

    resultsPanel.querySelectorAll('[data-search-result]').forEach(el => {
      el.addEventListener('click', () => {
        this.closeSearch();
      });
    });
  }

  bindScrollObserver() {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      if (currentY > 40) {
        this.headerEl?.classList.add('scrolled');
      } else {
        this.headerEl?.classList.remove('scrolled');
      }
      lastY = currentY;
    }, { passive: true });
  }

  bindGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Toggle search on / key when not focused on an input
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        this.openSearch();
      }

      // Close overlays on Escape
      if (e.key === 'Escape') {
        this.closeSearch();
        this.closeMobileDrawer();
      }
    });
  }

  bindStateSubscriptions() {
    store.subscribe((state) => {
      const wishBadge = document.getElementById('headerWishlistBadge');
      const compBadge = document.getElementById('headerCompareBadge');

      const wishCount = state.wishlist ? state.wishlist.length : 0;
      const compCount = state.compareList ? state.compareList.length : 0;

      if (wishBadge) {
        wishBadge.textContent = wishCount || '';
        wishBadge.setAttribute('data-count', wishCount);
      }

      if (compBadge) {
        compBadge.textContent = compCount || '';
        compBadge.setAttribute('data-count', compCount);
      }
    });
  }

  updateActiveNav(path) {
    let activeLink = null;
    document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === `#${path}` || (path !== '/' && href.startsWith(`#${path}`)))) {
        link.setAttribute('aria-current', 'page');
        if (!activeLink) activeLink = link;
      } else {
        link.removeAttribute('aria-current');
      }
    });

    this.positionGlideBar(activeLink);
  }

  positionGlideBar(targetLink) {
    const glideBar = document.getElementById('navActiveGlideBar');
    if (!glideBar) return;

    if (targetLink && targetLink.offsetWidth > 0) {
      glideBar.style.transform = `translateX(${targetLink.offsetLeft}px)`;
      glideBar.style.width = `${targetLink.offsetWidth}px`;
      glideBar.style.opacity = '1';
    } else {
      glideBar.style.opacity = '0';
    }
  }

  bindGlideBarEvents() {
    const nav = document.querySelector('.desktop-nav');
    if (!nav) return;

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        this.positionGlideBar(link);
      });
    });

    nav.addEventListener('mouseleave', () => {
      const activeLink = nav.querySelector('.nav-link[aria-current="page"]');
      this.positionGlideBar(activeLink);
    });

    window.addEventListener('resize', () => {
      const activeLink = nav.querySelector('.nav-link[aria-current="page"]');
      this.positionGlideBar(activeLink);
    });
  }
}
