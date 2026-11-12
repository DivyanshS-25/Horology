/**
 * HOROLOGY — About Experience Controller (Phase 07)
 * Route: #/about
 * Direction C — Midnight Navy Edition
 *
 * Truthful Brand Philosophy & Horological Credo
 * (Zero fabricated founders, dates, or manufacturer partnerships)
 */

import { BUSINESS_CONFIG } from '../js/config.js';
import { createBreadcrumb, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { escapeHTML } from '../js/utilities.js';

export const title = 'About HOROLOGY — Beyond Time. Beyond Ordinary.';

export async function render(ctx) {
  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'About HOROLOGY', href: '#/about' }
  ];

  const heroBg = resolveAsset('HZ-HERO-001');

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- 01 — Brand Introduction -->
      <section class="mb-16">
        <div class="p-8 md:p-14 bg-surface border relative overflow-hidden text-center" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: url('${heroBg}') center/cover no-repeat; opacity: 0.16; pointer-events: none;"></div>
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: radial-gradient(circle at 50% 50%, rgba(7, 17, 31, 0.95) 0%, rgba(7, 17, 31, 0.75) 100%); pointer-events: none;"></div>

          <div class="relative z-10 max-w-narrow mx-auto">
            <span class="section-kicker">OUR GUIDING PRINCIPLE</span>
            <h1 class="heading-1 font-serif mb-4" style="font-size: clamp(2.2rem, 4.5vw, 3.6rem); line-height: 1.12;">
              Beyond Time. Beyond Ordinary.
            </h1>
            <p class="body-muted text-base leading-relaxed mb-8" style="max-width: 620px; margin-left: auto; margin-right: auto;">
              HOROLOGY was created to provide a sanctuary for fine mechanical watchmaking—built on the conviction that collecting pre-owned chronometers should be defined by transparency, scholarship, and respect for engineering excellence.
            </p>
            <div class="flex items-center justify-center gap-3 font-mono text-xs text-accent">
              <span>Mechanical Integrity</span> &bull; <span>Empirical Telemetry</span> &bull; <span>Collector Stewardship</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 — Our Philosophy -->
      <section class="mb-16">
        <div class="grid grid-cols-12 gap-8 items-center" style="display: grid; grid-template-columns: repeat(12, 1fr);">
          <div class="col-span-12 lg:col-span-6" style="grid-column: span 6;">
            <span class="section-kicker">THE HOROLOGY PERSPECTIVE</span>
            <h2 class="heading-2 font-serif mb-4">A Commitment to Transparency</h2>
            <p class="body-muted text-sm leading-relaxed mb-4">
              For too long, the secondary luxury watch ecosystem has operated under subjective condition grades, polished-over surfaces, and obscured histories. Collectors were frequently expected to acquire historic timepieces based on optimism rather than evidence.
            </p>
            <p class="body-muted text-sm leading-relaxed mb-6">
              Our philosophy begins with verification. Every timepiece in our vault is examined across mechanical telemetry, case geometry, and archival documentation. We publish empirical acoustic timing metrics and unretouched macro photography so collectors can evaluate references with complete clarity.
            </p>
            <div class="flex items-center gap-4">
              <a href="#/authenticity" class="btn btn-outline btn-sm">7-Stage Inspection Standard</a>
              <a href="#/movement-lab" class="btn btn-ghost btn-sm">Explore Movement Lab &rarr;</a>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-6 p-8 bg-secondary border" style="grid-column: span 6; border-color: var(--border-subtle); border-radius: var(--radius-sm);">
            <div class="brand-wordmark mb-4" style="font-size: 1.3rem;">
              <span style="color: var(--accent-primary);">${ICONS.balance}</span>
              <span>HOROLOGY CREDO</span>
            </div>
            <blockquote class="font-serif italic text-lg text-primary mb-6" style="line-height: 1.5; border-left: 2px solid var(--accent-primary); padding-left: var(--space-4);">
              "A mechanical watch is not an ephemeral luxury ornament. It is an intricate, autonomous micro-mechanical engine designed to record the passage of time. Its integrity is measured in amplitude, geometry, and provenance."
            </blockquote>
            <div class="flex items-center gap-2 font-mono text-xs text-muted">
              <span>Independent Platform</span> &bull; <span>Four Specialized Houses</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 — Appreciation for Watchmaking -->
      <section class="mb-16">
        <div class="p-8 md:p-10 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="text-center max-w-narrow mx-auto mb-10">
            <span class="section-kicker">ENGINEERING &amp; ARTISTRY</span>
            <h2 class="heading-2 font-serif mb-3">Appreciation for Mechanical Watchmaking</h2>
            <p class="body-muted text-sm leading-relaxed">
              We focus on timepieces that represent enduring benchmarks of twentieth- and twenty-first-century horology.
            </p>
          </div>

          <div class="grid grid-cols-4 gap-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
            <div class="p-5 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">01 / ROLEX</div>
              <h4 class="font-serif text-lg text-primary mb-2">Resilience &amp; Chronometry</h4>
              <p class="body-muted text-xs leading-relaxed">
                The benchmark of industrial chronometric precision: Monobloc Oyster cases, bidirectional Perpetual rotors, and Calibre 3235 architecture.
              </p>
            </div>

            <div class="p-5 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">02 / OMEGA</div>
              <h4 class="font-serif text-lg text-primary mb-2">Co-Axial Innovation</h4>
              <p class="body-muted text-xs leading-relaxed">
                Pioneering George Daniels escapement mechanics, METAS Master Chronometer antimagnetism to 15,000 gauss, and Moonwatch heritage.
              </p>
            </div>

            <div class="p-5 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">03 / TUDOR</div>
              <h4 class="font-serif text-lg text-primary mb-2">Utilitarian Purpose</h4>
              <p class="body-muted text-xs leading-relaxed">
                Robust Kenissi manufacture calibres, 70-hour power reserves, Snowflake hands, and purpose-driven maritime diving lineage.
              </p>
            </div>

            <div class="p-5 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">04 / GRAND SEIKO</div>
              <h4 class="font-serif text-lg text-primary mb-2">Nature of Time</h4>
              <p class="body-muted text-xs leading-relaxed">
                Japanese micro-engineering mastery: Zaratsu distortion-free polishing, organic textured dials, and continuous glide Spring Drive regulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 — The Pre-Owned Perspective -->
      <section class="mb-16">
        <div class="grid grid-cols-12 gap-8 items-center" style="display: grid; grid-template-columns: repeat(12, 1fr);">
          <div class="col-span-12 lg:col-span-5 p-6 md:p-8 bg-secondary border" style="grid-column: span 5; border-color: var(--border-subtle); border-radius: var(--radius-sm);">
            <div class="font-mono text-accent text-xs uppercase mb-3">Curatorial Standard</div>
            <h3 class="font-serif text-2xl text-primary mb-4">Originality Over Cosmetic Polish</h3>
            <p class="body-muted text-xs leading-relaxed mb-4">
              A pre-owned timepiece possesses an individual narrative. Its value and historical interest lie in its factory case geometry, sharp chamfers, authentic dial patina, and accompanying archival paperwork.
            </p>
            <p class="body-muted text-xs leading-relaxed">
              We never perform aggressive cosmetic wheel-polishing that erodes factory lines. We celebrate the character of timepieces preserved in honest, collector-grade condition.
            </p>
          </div>

          <div class="col-span-12 lg:col-span-7" style="grid-column: span 7;">
            <span class="section-kicker">INDIVIDUAL IDENTITY</span>
            <h2 class="heading-2 font-serif mb-4">Why Pre-Owned Matters</h2>
            <div class="flex flex-col gap-4 text-xs text-secondary leading-relaxed">
              <div class="flex items-start gap-3">
                <span style="color: var(--accent-primary); font-size: 1.1rem;">&bull;</span>
                <div>
                  <strong class="text-primary block text-sm">Discontinued Mechanical Benchmarks</strong>
                  Access historic references that are no longer in production, from legendary column-wheel chronographs to classic 36 mm case proportions.
                </div>
              </div>

              <div class="flex items-start gap-3">
                <span style="color: var(--accent-primary); font-size: 1.1rem;">&bull;</span>
                <div>
                  <strong class="text-primary block text-sm">Proven Mechanical Longevity</strong>
                  A serviced mechanical movement from an established house can outlive multiple generations when maintained with care.
                </div>
              </div>

              <div class="flex items-start gap-3">
                <span style="color: var(--accent-primary); font-size: 1.1rem;">&bull;</span>
                <div>
                  <strong class="text-primary block text-sm">Documented Provenance</strong>
                  Original presentation boxes, stamped guarantee certificates, and service records transform an instrument into an archival artifact.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 — The HOROLOGY Experience Ecosystem -->
      <section class="mb-16">
        <div class="text-center max-w-narrow mx-auto mb-10">
          <span class="section-kicker">OUR DIGITAL ECOSYSTEM</span>
          <h2 class="heading-2 font-serif mb-3">The HOROLOGY Platform</h2>
          <p class="body-muted text-sm leading-relaxed">
            More than a marketplace: an integrated environment for discovery, comparative research, and horological education.
          </p>
        </div>

        <div class="grid grid-cols-4 gap-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.grid}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Curated Marketplace</h4>
            <p class="body-muted text-xs leading-relaxed">
              Examine our 24-reference demonstration catalog with faceted filters, detailed condition reports, and technical dossiers.
            </p>
          </div>

          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.compare}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Collector Tools</h4>
            <p class="body-muted text-xs leading-relaxed">
              Evaluate references side-by-side with our 4-watch comparison matrix, personal wishlist vault, and consultative Watch Finder.
            </p>
          </div>

          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.balance}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Movement Lab</h4>
            <p class="body-muted text-xs leading-relaxed">
              Explore the physical principles of mainspring barrels, gear trains, Swiss lever escapements, and continuous tri-synchro regulators.
            </p>
          </div>

          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.fileText}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Collector's Journal</h4>
            <p class="body-muted text-xs leading-relaxed">
              Engage with in-depth essays, buying guides, timing machine acoustics, and curatorial perspectives on mechanical watchmaking.
            </p>
          </div>
        </div>
      </section>

      <!-- 06 — Closing CTA -->
      <section class="p-8 md:p-12 bg-surface border text-center" style="border-color: var(--border-strong); border-radius: var(--radius-sm);">
        <h3 class="font-serif text-2xl text-primary mb-2">Begin Your Horological Exploration</h3>
        <p class="body-muted text-sm max-w-narrow mx-auto mb-6">
          Browse our curated timepieces, consult our recommendation wizard, or discuss selling or consigning a remarkable watch.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a href="#/collection" class="btn btn-primary btn-md">Explore Collection</a>
          <a href="#/watch-finder" class="btn btn-outline btn-md">Watch Finder</a>
          <a href="#/sell-consign" class="btn btn-outline btn-md">Sell or Consign</a>
          <a href="#/contact" class="btn btn-ghost btn-md">Contact Us &rarr;</a>
        </div>
      </section>

    </div>
  `;
}
