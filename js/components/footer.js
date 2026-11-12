// HOROLOGY — Global Footer Component
export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand & Manifesto -->
          <div class="footer-col">
            <a href="#/" class="brand-logo mb-4" style="display: inline-block;">
              <span class="brand-wordmark">HOROLOGY</span>
            </a>
            <p style="font-size: var(--text-sm); line-height: var(--leading-relaxed); max-width: 380px;" class="mb-4">
              Beyond Time. Beyond Ordinary. A considered collection of exceptional pre-owned mechanical timepieces, verified with forensic horological rigor and transparent timegrapher certification.
            </p>
            <div style="display: flex; gap: var(--space-3); align-items: center;">
              <span class="badge badge-demonstration">Demonstration Showcase</span>
              <span style="font-size: var(--text-xs); color: var(--color-text-muted);">Midnight Navy Edition</span>
            </div>
          </div>

          <!-- Col 2: The Collection -->
          <div class="footer-col">
            <h4>The Collection</h4>
            <div class="footer-links">
              <a href="#/collection">All Timepieces</a>
              <a href="#/brand/rolex">Rolex Collection</a>
              <a href="#/brand/omega">Omega Collection</a>
              <a href="#/brand/tudor">Tudor Collection</a>
              <a href="#/brand/grand-seiko">Grand Seiko Collection</a>
              <a href="#/collection?movement=Spring+Drive">Spring Drive References</a>
            </div>
          </div>

          <!-- Col 3: Research & Verification -->
          <div class="footer-col">
            <h4>Horological Research</h4>
            <div class="footer-links">
              <a href="#/movement-lab">Movement Lab Simulator</a>
              <a href="#/authenticity">Authenticity Centre</a>
              <a href="#/finder">Watch Finder Wizard</a>
              <a href="#/journal">Collector's Journal</a>
              <a href="#/compare">Compare Engine</a>
              <a href="#/__smoke">Developer Smoke Runner</a>
            </div>
          </div>

          <!-- Col 4: Private Atelier -->
          <div class="footer-col">
            <h4>Client Salon</h4>
            <div class="footer-links">
              <a href="#/contact">Book Private Viewing</a>
              <a href="#/sell">Sell or Consign</a>
              <a href="#/about">About HOROLOGY</a>
              <a href="#/legal/shipping-returns">Insured Transit & Escrow</a>
              <a href="#/legal/terms">Terms of Curation</a>
              <a href="#/legal/privacy">Privacy & Confidentiality</a>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <p>&copy; 2026 HOROLOGY Haute Horlogerie. All rights reserved. Pre-owned mechanical timepiece curation.</p>
          <p style="color: var(--color-text-muted);">
            Manufacture names, marks, and model designations are registered trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  `;
}
