// HOROLOGY — Sell & Consign Route Module (Panel 13)
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';
import { formatINR } from '../utils/formatters.js';
import { openModal } from '../components/modal.js';

export const sellPage = {
  id: 'sell',
  path: '/sell',
  title: 'Sell or Consign Your Timepiece — Private Horological Atelier',

  render() {
    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Sell / Consign' }
        ])}

        <!-- Header (Panel 13) -->
        <div class="section-title-wrap">
          <span class="overline">Private Collector Liquidity</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Sell or Consign Your Timepiece</h1>
          <p style="font-family: var(--font-serif); font-size: var(--text-xl); font-style: italic; color: var(--color-accent-secondary); margin-top: var(--space-2);">
            "Every remarkable watch deserves the right next owner."
          </p>
          <p style="max-width: 680px; margin-top: var(--space-3);">
            We offer direct outright purchase or competitive consignment curation (standard 8% commission) with insured vault storage, professional macro photography, and forensic certification.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-10);" class="hero-grid">
          <!-- Consignment Form -->
          <div class="watch-card" style="padding: var(--space-8);">
            <h2 style="font-size: var(--text-2xl); margin-bottom: var(--space-4);">Consignment Valuation Request</h2>
            
            <form id="consignForm" style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Manufacture Brand *
                </label>
                <select class="select-custom w-full" id="consignBrand" required>
                  <option value="">Select Brand</option>
                  <option value="Rolex">Rolex</option>
                  <option value="Omega">Omega</option>
                  <option value="Tudor">Tudor</option>
                  <option value="Grand Seiko">Grand Seiko</option>
                  <option value="Audemars Piguet">Audemars Piguet</option>
                  <option value="Patek Philippe">Patek Philippe</option>
                  <option value="Vacheron Constantin">Vacheron Constantin</option>
                  <option value="Other">Other Haute Horlogerie House</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Model Family *
                  </label>
                  <input type="text" class="search-input" id="consignModel" placeholder="e.g. Submariner, Speedmaster" required style="padding-left: 1rem;" />
                </div>
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Reference Number
                  </label>
                  <input type="text" class="search-input" id="consignRef" placeholder="e.g. 126610LN" style="padding-left: 1rem;" />
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Production Year
                  </label>
                  <input type="number" class="search-input" id="consignYear" placeholder="2022" min="1950" max="2026" style="padding-left: 1rem;" />
                </div>
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Self-Assessed Condition
                  </label>
                  <select class="select-custom w-full" id="consignCondition">
                    <option value="Mint">Mint / Like New (Unpolished)</option>
                    <option value="Near Mint">Near Mint (Superficial hairline marks)</option>
                    <option value="Good">Very Good (Light daily wear)</option>
                    <option value="Vintage">Vintage Patina</option>
                  </select>
                </div>
              </div>

              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Included Provenance Collateral
                </label>
                <div style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
                  <label class="filter-option" style="padding: 0;">
                    <input type="checkbox" class="filter-checkbox" id="hasBox" checked /> Original Box
                  </label>
                  <label class="filter-option" style="padding: 0;">
                    <input type="checkbox" class="filter-checkbox" id="hasPapers" checked /> Serialized Papers / Card
                  </label>
                  <label class="filter-option" style="padding: 0;">
                    <input type="checkbox" class="filter-checkbox" id="hasReceipt" /> Original Invoice
                  </label>
                </div>
              </div>

              <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-4); margin-top: var(--space-2);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                  <div>
                    <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                      Your Full Name *
                    </label>
                    <input type="text" class="search-input" required placeholder="Vikramaditya S." style="padding-left: 1rem;" />
                  </div>
                  <div>
                    <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                      Email Address *
                    </label>
                    <input type="email" class="search-input" required placeholder="collector@domain.com" style="padding-left: 1rem;" />
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg mt-4">
                Submit Consignment Inquiry ${icons.arrowRight('', 16)}
              </button>
            </form>
          </div>

          <!-- Why Consign with HOROLOGY -->
          <div style="display: flex; flex-direction: column; gap: var(--space-6);">
            <div class="watch-card" style="padding: var(--space-6);">
              <span class="overline" style="font-size: 10px;">The Atelier Advantage</span>
              <h3 style="font-size: var(--text-xl); margin: var(--space-2) 0;">Why Consign with Us?</h3>
              <ul style="display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4);">
                <li style="display: flex; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 18)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">100% Insured Escrow Transit</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Armored courier pick-up from your residence with full Lloyd's of London transit insurance.</p>
                  </div>
                </li>
                <li style="display: flex; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 18)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">Acoustic Timegrapher Certification</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">We create a certified physical and digital dossier, significantly elevating buyer willingness to pay.</p>
                  </div>
                </li>
                <li style="display: flex; gap: var(--space-3);">
                  <span style="color: var(--color-status-verified);">${icons.check('', 18)}</span>
                  <div>
                    <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">Private High-Net-Worth Network</strong>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Access to vetted private collectors across Mumbai, Delhi, London, and Geneva.</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Instant Payout or Trade-in -->
            <div style="background: var(--color-bg-card); border: 1px solid var(--color-border-hairline); border-radius: var(--radius-sm); padding: var(--space-6);">
              <span class="overline" style="font-size: 10px;">Alternative Option</span>
              <h4 style="font-size: var(--text-lg); margin: var(--space-1) 0 var(--space-2);">Immediate Outright Purchase</h4>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-normal); margin-bottom: var(--space-4);">
                Prefer immediate liquidity over waiting for a consignment sale? We provide guaranteed wire payment within 24 hours of inspection sign-off.
              </p>
              <a href="#/contact" class="btn btn-outline btn-sm">Speak Directly with Appraiser</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    const form = document.getElementById('consignForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'CONSIGN-' + Math.floor(100000 + Math.random() * 900000);
      openModal({
        title: 'Consignment File Initialized',
        content: `
          <div class="text-center" style="padding: var(--space-6) 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-status-available-bg); color: var(--color-status-available); display: inline-flex; align-items: center; justify-content: center; margin-bottom: var(--space-4);">
              ${icons.check('', 28)}
            </div>
            <h3 style="margin-bottom: var(--space-2);">Valuation Dossier Initiated</h3>
            <p class="mb-4">
              Your submission has been cataloged under private file:
            </p>
            <div class="mono" style="font-size: var(--text-xl); font-weight: bold; color: var(--color-accent-primary); padding: var(--space-3); background: var(--color-bg-base); border-radius: var(--radius-xs); border: 1px dashed var(--color-accent-border); display: inline-block; margin-bottom: var(--space-6);">
              ${code}
            </div>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-6);">
              Our senior appraiser will contact you with a preliminary market valuation range within one business day.
            </p>
            <a href="#/collection" class="btn btn-primary">Return to Collection</a>
          </div>
        `,
        maxWidth: '540px'
      });
    });
  }
};
