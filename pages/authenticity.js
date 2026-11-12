/**
 * HOROLOGY — Page Template: Authenticity Centre
 * Route: #/authenticity
 * 7-Stage Forensic Verification Standard & Archival Integrity
 */

import { createBreadcrumb, ICONS } from '../js/components.js';

export const title = 'Authenticity Centre';

export async function render(ctx) {
  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Authenticity Centre', href: '#/authenticity' }
  ];

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Header -->
      <div class="max-w-narrow text-center mb-12">
        <span class="section-kicker">Institutional Integrity</span>
        <h1 class="heading-1 mb-3">Authenticity Centre</h1>
        <p class="lead-text">
          Confidence is built on empirical evidence, not claims. Every mechanical chronometer admitted to the HOROLOGY vault passes through our exhaustive 7-stage forensic inspection protocol.
        </p>
      </div>

      <!-- 7 Stages Deep Dive -->
      <div class="spec-list mb-12">
        <div class="p-8 bg-surface border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 01</span>
            <h3 class="font-serif text-2xl text-primary">Serial &amp; Reference Forensic Audit</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            Case engravings between the lugs, rehaut laser inscriptions, and serial numbering are verified under stereo microscopy. Letter spacing, engraving burr profiles, and font geometry are cross-examined against manufacturer archival records.
          </p>
          <div class="font-mono text-xs text-accent">Equipment: Leica Stereo Zoom Microscopy &bull; High-Intensity Oblique LED</div>
        </div>

        <div class="p-8 bg-surface border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 02</span>
            <h3 class="font-serif text-2xl text-primary">Case Architecture &amp; Metal Chamfer Integrity</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            We evaluate lug symmetry, bezel teeth pitch, and factory bevels. We determine whether a watch retains its crisp factory geometry or has experienced invasive third-party metal re-shaping or counterfeit laser-welded restoration.
          </p>
          <div class="font-mono text-xs text-accent">Equipment: Digital Micrometers (0.001 mm tolerance) &bull; Mitutoyo Optical Comparators</div>
        </div>

        <div class="p-8 bg-surface border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 03</span>
            <h3 class="font-serif text-2xl text-primary">Dial, Hands &amp; Luminescence Chromatography</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            Dial printing serif consistency, pad-print ink thickness, and luminous material (Radium, Tritium, LumiNova, Super-LumiNova, Chromalight) are tested under 365nm ultraviolet radiation to confirm temporal period-authenticity.
          </p>
          <div class="font-mono text-xs text-accent">Equipment: Narrowband UV 365nm Lamp &bull; Spectrophotometric Colorimetry</div>
        </div>

        <div class="p-8 bg-surface border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 04</span>
            <h3 class="font-serif text-2xl text-primary">Calibre Deconstruction &amp; Escapement Health</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            The caseback is removed in a class-10,000 cleanroom. Watchmakers examine balance staff pivots, shock absorbers (Kif, Incabloc, Paraflex), balance wheel poise, and synthetic jewel lubrication cleanliness.
          </p>
          <div class="font-mono text-xs text-accent">Equipment: Cleanroom Laminar Flow Bench &bull; Bergeon Horological Tools</div>
        </div>

        <div class="p-8 bg-surface border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 05</span>
            <h3 class="font-serif text-2xl text-primary">Hydrostatic &amp; Vacuum Pressure Testing</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            Water resistance is certified through a two-phase protocol: first a dry vacuum deformation test, followed by pressurization in a sealed water chamber up to the manufacturer's rated depth.
          </p>
          <div class="font-mono text-xs text-accent">Equipment: Witschi Proofmaster S &bull; Greiner Wet Pressure Chamber</div>
        </div>

        <div class="p-8 bg-surface border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 06</span>
            <h3 class="font-serif text-2xl text-primary">Provenance &amp; Stolen Property Database Search</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            Every movement and case serial number is cross-referenced with international lost-and-stolen registers (The Watch Register and Enquirus) to assure absolute, unencumbered ownership title.
          </p>
          <div class="font-mono text-xs text-accent">Equipment: The Watch Register &bull; Enquirus Certified Search Database</div>
        </div>

        <div class="p-8 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="flex items-center gap-4 mb-3">
            <span class="badge badge-subtle font-mono">Stage 07</span>
            <h3 class="font-serif text-2xl text-primary">Archival Dossier Issuance &amp; Tamper Seal</h3>
          </div>
          <p class="body-muted leading-relaxed mb-4">
            Upon passing all stages, the chronometer receives our official Archival Inspection Dossier with timegrapher telemetry, macro photographic capture, and a serialized NFC verification card.
          </p>
          <div class="font-mono text-xs text-accent">Deliverable: HOROLOGY Embossed Archival Dossier &bull; 24-Month Guarantee</div>
        </div>
      </div>

      <!-- Trust Footer Banner -->
      <div class="p-8 bg-secondary border text-center" style="border-color: var(--border-strong); border-radius: var(--radius-sm);">
        <h3 class="heading-3 mb-2 font-serif">Unconditional Lifetime Authenticity Warranty</h3>
        <p class="body-muted mb-6 max-w-narrow" style="margin-left: auto; margin-right: auto;">
          We back our 7-stage protocol with a lifetime financial guarantee. If any mechanical timepiece purchased from HOROLOGY is ever found to be unauthentic, we provide a full, unconditional refund.
        </p>
        <a href="#/collection" class="btn btn-primary">Discover the Certified Vault</a>
      </div>
    </div>
  `;
}

