/**
 * HOROLOGY — Application Bootstrap & Main Entry Point
 * Direction C — Midnight Navy Edition
 * Pure Vanilla JavaScript ES Module SPA
 */

import { Router } from './router.js';
import { NavigationController } from './navigation.js';
import { initHorologyMotion } from './features/motion.js';

// Route Definitions mapping all 22 sitemap views to 16 page modules
const ROUTES = [
  // 1. Home
  { pattern: '/', loadModule: () => import('../pages/home.js') },

  // 2. Collection
  { pattern: '/collection', loadModule: () => import('../pages/catalog.js') },

  // 3-6. Brand Parameterized Collections
  { pattern: '/brands/rolex', loadModule: () => import('../pages/catalog.js') },
  { pattern: '/brands/omega', loadModule: () => import('../pages/catalog.js') },
  { pattern: '/brands/tudor', loadModule: () => import('../pages/catalog.js') },
  { pattern: '/brands/grand-seiko', loadModule: () => import('../pages/catalog.js') },

  // 7. Watch Detail
  { pattern: '/watch/:slug', loadModule: () => import('../pages/watch-detail.js') },

  // 8. Inspection Dossier (Canonical Phase 04 Route & Legacy Alias)
  { pattern: '/inspection/:watchId', loadModule: () => import('../pages/dossier.js') },
  { pattern: '/dossier/:slug', loadModule: () => import('../pages/dossier.js') },

  // 9. Watch Comparison Matrix
  { pattern: '/compare', loadModule: () => import('../pages/compare.js') },

  // 10. Guided Watch Finder (Canonical & Alias)
  { pattern: '/watch-finder', loadModule: () => import('../pages/finder.js') },
  { pattern: '/finder', loadModule: () => import('../pages/finder.js') },

  // 10b. Recently Viewed Subsystem
  { pattern: '/recently-viewed', loadModule: () => import('../pages/recently-viewed.js') },

  // 11. Movement Lab
  { pattern: '/movement-lab', loadModule: () => import('../pages/movement-lab.js') },

  // 12. Authenticity Centre
  { pattern: '/authenticity', loadModule: () => import('../pages/authenticity.js') },

  // 13. Collector's Journal
  { pattern: '/journal', loadModule: () => import('../pages/journal.js') },

  // 14. Journal Article
  { pattern: '/journal/:slug', loadModule: () => import('../pages/article.js') },

  // 15. Saved Wishlist Vault
  { pattern: '/wishlist', loadModule: () => import('../pages/wishlist.js') },

  // 16. Sell / Consign Experience & Multi-Step Wizard
  { pattern: '/sell-consign', loadModule: () => import('../pages/consign.js') },
  { pattern: '/sell-consign/submit', loadModule: () => import('../pages/consign.js') },
  { pattern: '/consign', loadModule: () => import('../pages/consign.js') },
  { pattern: '/consign/submit', loadModule: () => import('../pages/consign.js') },
  { pattern: '/sell', loadModule: () => import('../pages/consign.js') },
  { pattern: '/sell/submit', loadModule: () => import('../pages/consign.js') },

  // 17. About HOROLOGY
  { pattern: '/about', loadModule: () => import('../pages/about.js') },

  // 18. Contact HOROLOGY
  { pattern: '/contact', loadModule: () => import('../pages/contact.js') },

  // 18b. Private Appointment & Consultation Experience
  { pattern: '/appointment', loadModule: () => import('../pages/appointment.js') },

  // 19-21. Legal & Governance
  { pattern: '/legal/privacy', loadModule: () => import('../pages/legal.js') },
  { pattern: '/legal/terms', loadModule: () => import('../pages/legal.js') },
  { pattern: '/legal/shipping', loadModule: () => import('../pages/legal.js') },
  { pattern: '/legal/disclaimer', loadModule: () => import('../pages/legal.js') },
  { pattern: '/legal/:topic', loadModule: () => import('../pages/legal.js') },

  // 22. 404 Recovery Fallback
  { pattern: '/404', loadModule: () => import('../pages/not-found.js') }
];

/**
 * Dismiss the loading screen with smooth fade-out
 */
export function dismissLoader() {
  window.__HOROLOGY_READY__ = true;
  const loader = document.getElementById('appLoader');
  if (loader && !loader.classList.contains('app-loader-hidden')) {
    loader.classList.add('app-loader-hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  }
}

class App {
  constructor() {
    this.navController = new NavigationController();
    this.router = new Router({
      routes: ROUTES,
      rootElement: document.getElementById('app'),
      onRouteChanged: (path, route) => {
        this.navController.updateActiveNav(path);
      }
    });
  }

  init() {
    try {
      // Global Error Boundary
      this.setupErrorBoundary();

      // Initialize Motion, 3D Tilt, Lume Mode & Micro-Mechanics
      initHorologyMotion();

      // Initialize Navigation & UI Chrome
      this.navController.init();

      // Start Client Router
      this.router.init();

      console.info('%c HOROLOGY %c Beyond Time. Beyond Ordinary. %c', 
        'background: #030508; color: #38BDF8; font-weight: bold; padding: 4px 8px; border-left: 2px solid #38BDF8;',
        'background: #101923; color: #F4F4F0; padding: 4px 8px;',
        'background: transparent;'
      );
    } catch (error) {
      console.error('[HOROLOGY Critical Initialization Error]', error);
      const appRoot = document.getElementById('app');
      if (appRoot) {
        appRoot.innerHTML = `
          <div class="container section-spacer text-center" style="padding-top: 100px;">
            <div class="empty-state" style="max-width: 640px; margin: 0 auto; padding: 48px 24px; background: var(--bg-surface, #101923); border: 1px solid var(--status-danger, #EF4444); border-radius: var(--radius-sm, 4px);">
              <h2 class="heading-2 mb-3" style="color: var(--status-danger, #EF4444);">Application Initialization Error</h2>
              <p class="body-muted mb-4 font-mono text-xs">Failed during observatory bootstrap</p>
              <p class="body-muted mb-6" style="font-size: 13px; line-height: 1.5;">${error.message || 'Unknown initialization error'}</p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <button type="button" class="btn btn-primary btn-sm" onclick="window.location.reload()">Reload Application</button>
                <a href="#/" class="btn btn-outline btn-sm">Reset to Home Route</a>
              </div>
            </div>
          </div>
        `;
      }
      dismissLoader();
    }
  }

  setupErrorBoundary() {
    window.addEventListener('error', (event) => {
      console.error('[HOROLOGY Global Error Boundary]', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('[HOROLOGY Unhandled Promise Rejection]', event.reason);
    });
  }
}

// Bootstrap on DOM readiness
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App().init());
} else {
  new App().init();
}


