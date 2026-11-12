/**
 * HOROLOGY — Page Template: 404 Horological Recovery
 * Route: #/404 & Unmatched Fallback
 */

import { ICONS } from '../js/components.js';

export const title = 'Chronometer Out of Alignment (404)';

export async function render(ctx) {
  return `
    <div class="container section-spacer text-center">
      <div class="empty-state max-w-narrow mx-auto" style="border-color: var(--border-strong); margin-left: auto; margin-right: auto; padding: var(--space-20) var(--space-6);">
        <div class="empty-state-icon animate-balance" style="color: var(--accent-primary); width: 80px; height: 80px; margin: 0 auto var(--space-6);">
          ${ICONS.balance}
        </div>

        <span class="section-kicker mb-2">Error 404 &bull; Calibration Disruption</span>
        <h1 class="heading-1 mb-4">Chronometer Out of Alignment</h1>
        
        <p class="body-muted mb-8 max-w-narrow" style="margin-left: auto; margin-right: auto; font-size: var(--text-base); line-height: 1.6;">
          The requested coordinate or timepiece reference cannot be located in our archival register. The balance may have stopped or the reference was retired from our observatory vault.
        </p>

        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a href="#/" class="btn btn-primary btn-lg">Return to Observatory Home</a>
          <a href="#/collection" class="btn btn-outline btn-lg">Explore Full Collection</a>
        </div>

        <div class="mt-12 pt-8 border-top" style="border-color: var(--border-subtle);">
          <span class="meta-label mb-3 block">Suggested Manufactures:</span>
          <div class="flex items-center justify-center gap-4 flex-wrap font-mono text-xs">
            <a href="#/brands/rolex" class="text-accent hover:underline">Rolex Collection</a>
            <span class="text-muted">&bull;</span>
            <a href="#/brands/omega" class="text-accent hover:underline">Omega Collection</a>
            <span class="text-muted">&bull;</span>
            <a href="#/brands/tudor" class="text-accent hover:underline">Tudor Collection</a>
            <span class="text-muted">&bull;</span>
            <a href="#/brands/grand-seiko" class="text-accent hover:underline">Grand Seiko Collection</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

