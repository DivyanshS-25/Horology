/**
 * HOROLOGY — Hash SPA Router
 * Zero-build Native ES Module Client Router
 * Maps 22 Sitemap Routes to 16 Page Template Modules
 */

import { scrollToTop } from './utilities.js';
import { store } from './state.js';
import { initScrollReveal, initNumberCounters } from './features/motion.js';

export class Router {
  constructor({ routes = [], rootElement = null, onRouteChanged = null }) {
    this.routes = routes;
    this.root = rootElement || document.getElementById('app');
    this.onRouteChanged = onRouteChanged;
    this.currentView = null;
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    // Initial dispatch
    this.handleRouting();
  }

  parseLocation() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart.startsWith('/') ? pathPart : '/' + pathPart;

    // Parse query params
    const query = {};
    if (queryPart) {
      new URLSearchParams(queryPart).forEach((val, key) => {
        query[key] = val;
      });
    }

    return { path, query };
  }

  matchRoute(path) {
    for (const route of this.routes) {
      // Direct exact match
      if (route.pattern === path) {
        return { route, params: {} };
      }

      // Parameterized matching (e.g. /watch/:slug)
      if (route.pattern.includes(':')) {
        const patternParts = route.pattern.split('/');
        const pathParts = path.split('/');

        if (patternParts.length === pathParts.length) {
          const params = {};
          let isMatch = true;

          for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
              const paramName = patternParts[i].slice(1);
              params[paramName] = decodeURIComponent(pathParts[i]);
            } else if (patternParts[i] !== pathParts[i]) {
              isMatch = false;
              break;
            }
          }

          if (isMatch) {
            return { route, params };
          }
        }
      }
    }

    // 404 Fallback
    const notFoundRoute = this.routes.find(r => r.pattern === '/404') || this.routes[this.routes.length - 1];
    return { route: notFoundRoute, params: {} };
  }

  async handleRouting() {
    const { path, query } = this.parseLocation();
    const { route, params } = this.matchRoute(path);

    if (!route || !this.root) return;

    // Update global state
    store.setCurrentRoute({ path, params, query });

    // Toggle homepage class on app root for precise navbar clearance
    if (this.root) {
      this.root.classList.toggle('is-homepage', path === '/');
    }

    // Scroll restoration
    scrollToTop();

    try {
      // If unmount lifecycle exists on previous view
      if (this.currentView && typeof this.currentView.unmount === 'function') {
        this.currentView.unmount();
      }

      // Load page module template
      const module = await route.loadModule();
      this.currentView = module;

      const context = { path, params, query, route };

      // Render template HTML with subtle upward glide transition
      const html = await module.render(context);
      this.root.classList.add('route-view', 'route-view-enter');
      this.root.innerHTML = html;

      // In next frame, transition into place
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.root.classList.remove('route-view-enter');
        });
      });

      // Update document title
      const title = module.title ? `${module.title} — HOROLOGY` : 'HOROLOGY — Beyond Time. Beyond Ordinary.';
      document.title = title;

      // Mount lifecycle hook
      if (typeof module.mount === 'function') {
        module.mount(context);
      }

      // Initialize staggered scroll-reveals & number counters
      initScrollReveal();
      initNumberCounters();

      // Notify navigation & global listeners
      if (typeof this.onRouteChanged === 'function') {
        this.onRouteChanged(path, route);
      }

      // Signal readiness and dismiss loader
      window.__HOROLOGY_READY__ = true;
      const loader = document.getElementById('appLoader');
      if (loader && !loader.classList.contains('app-loader-hidden')) {
        loader.classList.add('app-loader-hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 400);
      }
    } catch (error) {
      console.error('[HOROLOGY Router] Route execution failed for', path, error);
      this.root.innerHTML = `
        <div class="container section-spacer text-center">
          <div class="empty-state" style="border-color: var(--status-danger); max-width: 600px; margin: 40px auto; padding: 48px 24px; background: var(--bg-surface, #101923); border: 1px solid var(--status-danger, #EF4444); border-radius: 4px;">
            <h2 class="heading-2 mb-3" style="color: var(--status-danger, #EF4444);">Horological Navigation Error</h2>
            <p class="body-muted mb-4 font-mono text-xs">Failed to render view for route: ${path}</p>
            <p class="body-muted mb-6" style="font-size: 13px; line-height: 1.5;">${error.message || 'Unknown module error'}</p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="#/" class="btn btn-primary btn-sm">Return to Observatory Home</a>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.location.reload()">Reload Application</button>
            </div>
          </div>
        </div>
      `;
      // Always dismiss loader so the user sees the error and recovery options
      window.__HOROLOGY_READY__ = true;
      const loader = document.getElementById('appLoader');
      if (loader) {
        loader.classList.add('app-loader-hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 400);
      }
    }
  }
}

