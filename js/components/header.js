// HOROLOGY — Global Header Component
import { store } from '../core/store.js';
import { icons } from '../utils/svgIcons.js';
import { events } from '../core/events.js';

export function renderHeader() {
  const wishlistCount = store.getWishlist().length;
  const compareCount = store.getCompare().length;

  return `
    <header class="site-header" id="siteHeader">
      <div class="container header-inner">
        <!-- Logo -->
        <a href="#/" class="brand-logo" aria-label="HOROLOGY Home">
          <span class="brand-wordmark">HOROLOGY</span>
          <span class="brand-tagline-subtle">Beyond Time. Beyond Ordinary.</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-primary" aria-label="Primary Navigation">
          <a href="#/collection" class="nav-link">Collection</a>
          <a href="#/brands" class="nav-link">Brands</a>
          <a href="#/finder" class="nav-link">Watch Finder</a>
          <a href="#/movement-lab" class="nav-link">Movement Lab</a>
          <a href="#/authenticity" class="nav-link">Authenticity</a>
          <a href="#/journal" class="nav-link">Journal</a>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <a href="#/collection" class="action-btn" aria-label="Search Collection" title="Search Timepieces">
            ${icons.search('', 18)}
          </a>
          <a href="#/wishlist" class="action-btn" id="headerWishlistBtn" aria-label="Wishlist" title="Saved Timepieces">
            ${icons.heart('', 18)}
            <span class="badge-counter" id="wishlistBadge" style="${wishlistCount > 0 ? '' : 'display:none;'}">${wishlistCount}</span>
          </a>
          <a href="#/compare" class="action-btn" id="headerCompareBtn" aria-label="Comparison" title="Compare Timepieces">
            ${icons.compare('', 18)}
            <span class="badge-counter" id="compareBadge" style="${compareCount > 0 ? '' : 'display:none;'}">${compareCount}</span>
          </a>
          <button class="drawer-toggle" id="drawerToggleBtn" aria-label="Open Navigation Menu">
            ${icons.menu('', 22)}
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer & Backdrop -->
    <div class="drawer-backdrop" id="drawerBackdrop"></div>
    <aside class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
      <div class="drawer-header">
        <span class="brand-wordmark" style="font-size: var(--text-xl);">HOROLOGY</span>
        <button class="action-btn" id="drawerCloseBtn" aria-label="Close Navigation Menu">
          ${icons.close('', 20)}
        </button>
      </div>
      <nav class="drawer-nav">
        <a href="#/" class="nav-link">Home</a>
        <a href="#/collection" class="nav-link">The Collection</a>
        <a href="#/brands" class="nav-link">Brands & Manufactures</a>
        <a href="#/finder" class="nav-link">Watch Finder</a>
        <a href="#/movement-lab" class="nav-link">Movement Lab</a>
        <a href="#/authenticity" class="nav-link">Authenticity Centre</a>
        <a href="#/journal" class="nav-link">Collector's Journal</a>
        <a href="#/sell" class="nav-link">Sell / Consign</a>
        <a href="#/contact" class="nav-link">Private Appointment</a>
        <a href="#/about" class="nav-link">About HOROLOGY</a>
      </nav>
      <div style="margin-top: auto; padding-top: var(--space-6); border-top: 1px solid var(--color-border-hairline);">
        <p style="font-size: var(--text-xs); color: var(--color-text-muted);">
          Midnight Navy Edition &bull; Luxury Horological Platform
        </p>
      </div>
    </aside>

    <!-- Sticky Compare Dock -->
    <div class="compare-dock" id="stickyCompareDock" aria-live="polite">
      <span style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-accent-primary);">
        Compare (<span id="compareDockCount">${compareCount}</span>/3)
      </span>
      <div class="compare-dock-thumbs" id="compareDockThumbs"></div>
      <a href="#/compare" class="btn btn-primary btn-sm">Compare Now</a>
      <button class="btn btn-ghost btn-sm" id="compareDockClearBtn" title="Clear comparison">Clear</button>
    </div>
  `;
}

export function initHeader() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const openBtn = document.getElementById('drawerToggleBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const dock = document.getElementById('stickyCompareDock');
  const dockCount = document.getElementById('compareDockCount');
  const dockClearBtn = document.getElementById('compareDockClearBtn');

  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('active');
    drawer?.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    drawer?.setAttribute('aria-hidden', 'true');
  }

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Close drawer on link click
  drawer?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Reactive listener for wishlist badge
  events.on('wishlist:updated', ({ count }) => {
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? '' : 'none';
    }
  });

  // Reactive listener for compare dock & badge
  function updateCompareUI(count) {
    const badge = document.getElementById('compareBadge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? '' : 'none';
    }
    if (dock && dockCount) {
      dockCount.textContent = count;
      if (count > 0 && !window.location.hash.startsWith('#/compare')) {
        dock.classList.add('visible');
      } else {
        dock.classList.remove('visible');
      }
    }
  }

  events.on('compare:updated', ({ count }) => {
    updateCompareUI(count);
  });

  dockClearBtn?.addEventListener('click', () => {
    store.clearCompare();
  });

  // Initial update
  updateCompareUI(store.getCompare().length);
}
