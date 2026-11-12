// HOROLOGY — 404 Route Module
import { icons } from '../utils/svgIcons.js';

export const notFoundPage = {
  id: 'notFound',
  path: '/404',
  title: 'Page Not Found — HOROLOGY',

  render() {
    return `
      <div class="container section-spacer text-center" style="max-width: 640px; margin: 0 auto;">
        <span class="overline" style="font-size: var(--text-sm);">404 Error</span>
        <h1 style="font-size: var(--text-5xl); margin: var(--space-3) 0 var(--space-4);">Reference Not Found</h1>
        <p style="margin-bottom: var(--space-8); line-height: var(--leading-relaxed);">
          The horological reference, brand catalog family, or dossier you are attempting to inspect does not exist in our active vault, or may have been transitioned to an archival collection.
        </p>
        <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
          <a href="#/collection" class="btn btn-primary btn-lg">Browse Collection ${icons.arrowRight('', 16)}</a>
          <a href="#/" class="btn btn-outline btn-lg">Return to Home</a>
        </div>
      </div>
    `;
  }
};
