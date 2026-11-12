// HOROLOGY — Client Hash Router
import { CONFIG } from './config.js';
import { announce } from './a11y.js';

export class Router {
  constructor(routes = [], options = {}) {
    this.routes = routes;
    this.appContainer = options.container || document.getElementById('app');
    this.currentRoute = null;
    this.currentContext = null;

    window.addEventListener('hashchange', () => this.handleRouting());
  }

  start() {
    this.handleRouting();
  }

  navigate(hashPath) {
    window.location.hash = hashPath.startsWith('#') ? hashPath : `#${hashPath}`;
  }

  parseHash() {
    let raw = window.location.hash.slice(1) || '/';
    if (!raw.startsWith('/')) raw = '/' + raw;

    const [pathPart, queryPart] = raw.split('?');
    const query = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, value] of searchParams.entries()) {
        query[key] = value;
      }
    }

    return { path: pathPart, query, raw };
  }

  matchRoute(path) {
    for (const route of this.routes) {
      // Exact match
      if (route.path === path) {
        return { route, params: {} };
      }

      // Dynamic segments (e.g. /watch/:slug or /brand/:brand/:family)
      const routeSegments = route.path.split('/').filter(Boolean);
      const pathSegments = path.split('/').filter(Boolean);

      if (routeSegments.length === pathSegments.length) {
        const params = {};
        let matched = true;
        for (let i = 0; i < routeSegments.length; i++) {
          if (routeSegments[i].startsWith(':')) {
            const paramName = routeSegments[i].slice(1);
            params[paramName] = decodeURIComponent(pathSegments[i]);
          } else if (routeSegments[i] !== pathSegments[i]) {
            matched = false;
            break;
          }
        }
        if (matched) {
          return { route, params };
        }
      }
    }

    // 404 Fallback
    const notFoundRoute = this.routes.find(r => r.path === '/404');
    return { route: notFoundRoute, params: {} };
  }

  async handleRouting() {
    const { path, query, raw } = this.parseHash();
    const match = this.matchRoute(path);

    if (!match.route) {
      console.error(`[Router] No route match or fallback found for: ${path}`);
      return;
    }

    // Unmount previous route
    if (this.currentRoute && typeof this.currentRoute.unmount === 'function') {
      try {
        this.currentRoute.unmount();
      } catch (err) {
        console.error(`[Router] Error unmounting route ${this.currentRoute.path}:`, err);
      }
    }

    const ctx = {
      path,
      query,
      params: match.params,
      router: this
    };

    this.currentRoute = match.route;
    this.currentContext = ctx;

    // Update document title and a11y announcement
    const pageTitle = match.route.title 
      ? (typeof match.route.title === 'function' ? match.route.title(ctx) : match.route.title)
      : 'Timepiece Collection';
    document.title = `${pageTitle} | ${CONFIG.APP_NAME}`;
    announce(`Navigated to ${pageTitle}`);

    // Update nav active states
    this.updateActiveNav(path);

    // Render route
    try {
      if (this.appContainer) {
        this.appContainer.innerHTML = await match.route.render(ctx);
        window.scrollTo(0, 0);

        if (typeof match.route.mount === 'function') {
          await match.route.mount(ctx);
        }
      }
    } catch (err) {
      console.error(`[Router] Render error on ${path}:`, err);
      if (this.appContainer) {
        this.appContainer.innerHTML = `
          <div class="container section-spacer text-center">
            <h2>Error Rendering Page</h2>
            <p class="mb-4">${err.message}</p>
            <a href="#/" class="btn btn-primary">Return Home</a>
          </div>
        `;
      }
    }
  }

  updateActiveNav(path) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.replace(/^#/, '').split('?')[0];
      if (linkPath === '/' && path === '/') {
        link.classList.add('active');
      } else if (linkPath !== '/' && path.startsWith(linkPath)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
