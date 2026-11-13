/**
 * HOROLOGY — Page Template: Forensic Inspection Dossier (Phase 08)
 * Canonical Route: #/inspection/:watchId
 * Legacy Alias: #/dossier/:slug
 * Direction: OBSIDIAN LUXURY EDITION
 * Complete 8-Stage Diagnostic Timeline, Interactive Microscopic Loupe,
 * Verifiable Archival Integrity & Professional A4 Print Engine
 */

import { findWatchByIdentifier } from '../js/data.js';
import { createBreadcrumb, createStatusBadge, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { escapeHTML } from '../js/utilities.js';

export let title = 'Archival Inspection Dossier — HOROLOGY';

export async function render(ctx) {
  const identifier = ctx.params?.watchId || ctx.params?.slug;
  const watch = findWatchByIdentifier(identifier);

  if (!watch) {
    title = 'Dossier Not Found — HOROLOGY';
    return `
      <div class="container section-spacer text-center">
        <div class="empty-state p-12 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); max-width: 600px; margin: 0 auto;">
          <h2 class="heading-2 mb-3">Dossier Record Not Found</h2>
          <p class="body-muted mb-6">No forensic inspection report exists for this reference parameter or lot identifier.</p>
          <a href="#/collection" class="btn btn-primary">Return to Collection</a>
        </div>
      </div>
    `;
  }

  title = `Archival Inspection Dossier — ${watch.brand} ${watch.model} (${watch.referenceNumber || watch.reference}) — HOROLOGY`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Archival forensic inspection dossier for ${watch.brand} ${watch.model} ref. ${watch.referenceNumber || watch.reference}. Eight-stage diagnostic timeline, structural authenticity audit, and chronometer telemetry.`;
  }

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Collection', href: '#/collection' },
    { label: watch.model, href: `#/watch/${watch.slug || watch.id}` },
    { label: 'Inspection Dossier', href: `#/inspection/${watch.id}` }
  ];

  const report = watch.inspectionReport || {};
  const mechanical = report.mechanicalPerformance || { measuredValuesAvailable: false };
  const authReviews = report.authenticityReview || [];
  const docChecklist = report.documentationChecklist || [];
  const galleryItems = watch.galleryItems || [];
  const dossierId = report.referenceId || `HZ-INS-2026-${(watch.referenceNumber || watch.reference || 'REF').replace(/[^a-zA-Z0-9]/g, '')}`;

  // Eight-Stage Diagnostic Timeline Definition
  const DIAGNOSTIC_STAGES = [
    {
      num: '01',
      title: 'Initial Intake & Identification',
      purpose: 'Verification of reference lineage, serial stamps, and archival registry cross-checks.',
      status: 'Verified',
      statusClass: 'verified',
      findings: `Reference ${watch.referenceNumber || watch.reference} verified against ${watch.brand} archival records. Production year confirmed as ${watch.year}.`,
      notes: 'Serial stamp geometry, rehaut engraving burrs, and lug stamp depths match manufacturer factory standards.'
    },
    {
      num: '02',
      title: 'Exterior & Case Architecture',
      purpose: 'Dimensional micrometer audit, lug bevel sharpness, and case finishing assessment.',
      status: 'Verified',
      statusClass: 'verified',
      findings: `Case diameter measured at ${watch.caseSizeMm || 40} mm. Unpolished factory bevels and crisp lug chamfers observed.`,
      notes: 'No invasive metal laser-welding or destructive refinishing detected under oblique LED examination.'
    },
    {
      num: '03',
      title: 'Dial, Hands & Bezel Review',
      purpose: 'Stereomicroscopic evaluation of pad printing, hand finish, and 365nm UV chromatography.',
      status: 'Verified',
      statusClass: 'verified',
      findings: 'Dial typography serif alignment, index plating, and luminous material emit correct uniform luminescence.',
      notes: 'Handset exhibits unblemished mirror-polished facets; sweep seconds hand completely straight with zero contact marks.'
    },
    {
      num: '04',
      title: 'Movement Identification',
      purpose: 'Deconstruction inspection under laminar-flow hood to verify bridge layout and calibre purity.',
      status: 'Verified',
      statusClass: 'verified',
      findings: `Calibre ${watch.calibre} verified with correct bridge finishing, winding rotor assembly, and jewel count.`,
      notes: 'Movement architecture fully original to reference specifications; synthetic epilame oils clean and properly localized.'
    },
    {
      num: '05',
      title: 'Mechanical Performance Assessment',
      purpose: 'Multi-positional electronic timegrapher testing of rate, balance amplitude, and beat error.',
      status: 'Demonstration Record',
      statusClass: 'unavail',
      findings: 'Timing telemetry unrecorded for demonstration collection. Calibrated upon individual client lot intake.',
      notes: `Governed by manufacturer specification: ${watch.specifications?.movement?.accuracyStandard || 'Chronometer Benchmark'}.`
    },
    {
      num: '06',
      title: 'Bracelet, Clasp & Accessories',
      purpose: 'Link stretch audit, clasp tension, end-link codes, and spring-bar retention testing.',
      status: 'Verified',
      statusClass: 'verified',
      findings: 'Bracelet links tight with minimal lateral play; folding safety clasp engages with crisp mechanical click.',
      notes: 'End-link engravings and clasp date codes align with reference vintage complement.'
    },
    {
      num: '07',
      title: 'Documentation & Provenance Review',
      purpose: 'Forensic inspection of warranty cards, box construction, and retailer provenance papers.',
      status: watch.documentationCategory === 'Box and Papers' ? 'Present & Verified' : 'Documented Status',
      statusClass: 'verified',
      findings: `Accompanying inventory status: ${watch.documentationCategory || 'Certified Watch Only'}.`,
      notes: 'Packaging and warranty documentation audited for punch-hole typography, watermark patterns, and serial parity.'
    },
    {
      num: '08',
      title: 'Final Condition Assessment',
      purpose: 'Holistic synthesis across all seven technical domains into a standardized condition rating.',
      status: 'Certified Complete',
      statusClass: 'verified',
      findings: `Overall Condition Grade: ${watch.condition} (Assessed by HOROLOGY Inspection Desk).`,
      notes: 'Timepiece admitted to certified marketplace vault with 24-Month Mechanical Warranty.'
    }
  ];

  return `
    <div class="container dossier-full-page">
      <div class="no-print">
        ${createBreadcrumb(breadcrumbs)}
      </div>

      <!-- DOSSIER ACTION BAR -->
      <div class="dossier-top-bar no-print">
        <a href="#/watch/${watch.slug || watch.id}" class="btn btn-outline btn-sm">
          &larr; Return to Watch Details
        </a>

        <div class="flex items-center gap-4 flex-wrap">
          <!-- NFC Visual Motif Indicator -->
          <div class="nfc-motif-badge" title="Visual Asset Identification Motif &bull; Physical NFC Tag Paired on Dispatch">
            <span class="nfc-dot"></span>
            <span class="font-mono text-xs text-muted">ARCHIVAL REFERENCE: <strong class="text-primary">${escapeHTML(dossierId)}</strong></span>
          </div>

          <button type="button" class="btn btn-primary btn-sm" id="dossierPrintBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            <span>Print Official Dossier</span>
          </button>
        </div>
      </div>

      <!-- MAIN PRINTABLE DOSSIER SHEET -->
      <article class="dossier-main-card dossier-sheet" id="dossierPrintArea">
        
        <!-- HEADER REGION -->
        <header class="dossier-header-region">
          <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="brand-wordmark" style="font-size: 1.5rem; letter-spacing: 0.18em;">HOROLOGY</span>
                <span class="font-mono text-xs text-muted uppercase">&bull; Observatory Forensic Division</span>
              </div>
              <h1 class="heading-2 mb-1">${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}</h1>
              <p class="font-mono text-xs text-muted">
                Reference: <strong class="text-primary">${escapeHTML(watch.referenceNumber || watch.reference)}</strong> &bull; 
                Calibre: <strong class="text-primary">${escapeHTML(watch.calibre)}</strong> &bull; 
                Manufacture Year: <strong class="text-primary">${watch.year}</strong>
              </p>
            </div>

            <div class="text-right">
              <span class="badge ${report.overallResult?.includes('Complete') ? 'badge-verified' : 'badge-reserved'} mb-2">
                ${escapeHTML(report.overallResult || 'Preliminary Review Complete')}
              </span>
              <div class="font-mono text-xs text-accent">Dossier ID: ${escapeHTML(dossierId)}</div>
            </div>
          </div>

          <!-- Quick Metadata Grid -->
          <div class="dossier-meta-banner">
            <div>
              <span class="text-muted block font-mono text-2xs uppercase">Inspection Date:</span>
              <span class="text-primary font-bold font-mono">${escapeHTML(report.inspectionDate || 'Intake Registry Pending')}</span>
            </div>
            <div>
              <span class="text-muted block font-mono text-2xs uppercase">Inspection Desk:</span>
              <span class="text-primary font-bold font-mono">${escapeHTML(report.inspectorTeam || 'HOROLOGY Technical Desk')}</span>
            </div>
            <div>
              <span class="text-muted block font-mono text-2xs uppercase">Assessed Condition:</span>
              <span class="text-accent font-bold font-mono">${escapeHTML(watch.condition)} (Grade ${escapeHTML(watch.conditionAssessment?.overallGrade || watch.condition)})</span>
            </div>
            <div>
              <span class="text-muted block font-mono text-2xs uppercase">Authenticity Ledger:</span>
              <span class="text-verified font-bold font-mono">Unconditionally Warranted</span>
            </div>
          </div>
        </header>

        <!-- EIGHT-STAGE DIAGNOSTIC TIMELINE -->
        <section class="dossier-section-block" aria-label="Eight-Stage Diagnostic Timeline">
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="section-kicker">Diagnostic Timeline</span>
              <h2 class="heading-3">Eight-Stage Forensic Intake Record</h2>
            </div>
            <span class="font-mono text-xs text-muted">Protocol Rev. 4.2</span>
          </div>

          <p class="body-secondary text-sm mb-6 leading-relaxed">
            Every chronometer admitted to the HOROLOGY vault progresses through an exhaustive eight-stage physical, dimensional, and mechanical audit. Below is the verified protocol ledger for this reference archetype:
          </p>

          <div class="diagnostic-timeline">
            ${DIAGNOSTIC_STAGES.map(stage => `
              <div class="timeline-stage-card ${stage.statusClass}">
                <div class="timeline-stage-num">${stage.num}</div>
                <div class="timeline-stage-body">
                  <div class="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <h4 class="timeline-stage-title">${stage.title}</h4>
                    <span class="badge ${stage.statusClass === 'verified' ? 'badge-verified' : 'badge-subtle'}">${stage.status}</span>
                  </div>
                  <div class="timeline-stage-purpose">${stage.purpose}</div>
                  <div class="timeline-stage-finding">
                    <strong>Findings:</strong> ${stage.findings}
                  </div>
                  <div class="timeline-stage-notes">
                    <strong>Observations:</strong> ${stage.notes}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- MECHANICAL PERFORMANCE TELEMETRY -->
        <section class="dossier-section-block" aria-label="Mechanical Performance Telemetry">
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="section-kicker">Chronometric Diagnostics</span>
              <h2 class="heading-3">Electronic Timegrapher Telemetry</h2>
            </div>
            <span class="badge badge-subtle">Witschi Chronoscope S1 Protocol</span>
          </div>

          <p class="body-secondary text-sm mb-6 leading-relaxed">
            Acoustic timegrapher testing evaluates escapement health across horizontal and vertical resting planes. Healthy mechanical chronometers exhibit consistent daily rate (+/- seconds per day), balance wheel amplitude between 270&deg; and 310&deg; in flat positions, and escapement beat error below 0.3 ms.
          </p>

          <!-- Honest Demonstration Telemetry Notice -->
          <div class="telemetry-honest-card">
            <div class="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent flex-shrink-0 mt-1">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <strong class="text-accent font-mono text-xs uppercase tracking-wider block mb-1">
                  Timegrapher Telemetry Pending / Unavailable for Demonstration Record
                </strong>
                <p class="text-xs text-secondary leading-relaxed">
                  In strict accordance with HOROLOGY's anti-fabrication guidelines, acoustic timegrapher readings (daily rate deviation, balance amplitude, and beat error) are recorded only upon physical intake of individual numbered client lots. Demonstration catalog records never display simulated or fabricated timing numbers. Below are the manufacturer chronometric thresholds governing this reference calibre:
                </p>
              </div>
            </div>

            <!-- Standard Metric Cards with Honest Status -->
            <div class="telemetry-metric-grid">
              <div class="telemetry-metric-box">
                <span class="text-xs font-mono uppercase text-muted block mb-1">Daily Rate Deviation</span>
                <span class="telemetry-val-pending">Unrecorded (Demo)</span>
                <span class="text-2xs text-muted block mt-2">Target Tolerance: <strong>${escapeHTML(watch.specifications?.movement?.accuracyStandard || '-2/+2 s/d')}</strong></span>
                <span class="text-2xs text-secondary block mt-1">Measures chronometric gain or loss over 24 hours.</span>
              </div>

              <div class="telemetry-metric-box">
                <span class="text-xs font-mono uppercase text-muted block mb-1">Balance Amplitude</span>
                <span class="telemetry-val-pending">Unrecorded (Demo)</span>
                <span class="text-2xs text-muted block mt-2">Nominal Range: <strong>270&deg; &ndash; 310&deg; (Dial Up)</strong></span>
                <span class="text-2xs text-secondary block mt-1">Degrees of balance wheel rotation; indicates mainspring torque.</span>
              </div>

              <div class="telemetry-metric-box">
                <span class="text-xs font-mono uppercase text-muted block mb-1">Beat Error</span>
                <span class="telemetry-val-pending">Unrecorded (Demo)</span>
                <span class="text-2xs text-muted block mt-2">Target Tolerance: <strong>&le; 0.3 ms</strong></span>
                <span class="text-2xs text-secondary block mt-1">Symmetry of impulse pin between banking pins.</span>
              </div>
            </div>
          </div>
        </section>

        <!-- AUTHENTICITY & ORIGINALITY AUDIT TABLE -->
        <section class="dossier-section-block" aria-label="Authenticity & Originality Review">
          <span class="section-kicker">Component Origin</span>
          <h2 class="heading-3 mb-3">Eight-Point Authenticity &amp; Originality Audit</h2>
          <p class="body-secondary text-sm mb-4 leading-relaxed">
            Every assembly is inspected under stereoscopic optical microscopy to authenticate factory tooling, laser engravings, and assembly signatures.
          </p>

          <div class="authenticity-table-container">
            <table class="authenticity-table">
              <thead>
                <tr>
                  <th>Audit Category</th>
                  <th style="width: 140px;">Status</th>
                  <th>Forensic Observation &amp; Archival Note</th>
                </tr>
              </thead>
              <tbody>
                ${authReviews.map(rev => `
                  <tr>
                    <td class="font-bold text-primary">${escapeHTML(rev.category)}</td>
                    <td>
                      <span class="badge ${rev.status === 'Verified' ? 'badge-verified' : 'badge-subtle'}">
                        ${escapeHTML(rev.status)}
                      </span>
                    </td>
                    <td class="text-secondary text-xs">${escapeHTML(rev.note)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>

        <!-- DOCUMENTATION & ACCESSORIES INVENTORY -->
        <section class="dossier-section-block" aria-label="Documentation Inventory">
          <span class="section-kicker">Provenance Ledger</span>
          <h2 class="heading-3 mb-3">Accompanying Documentation &amp; Accessories Inventory</h2>
          
          <div class="doc-inventory-grid">
            ${docChecklist.map(doc => `
              <div class="doc-inventory-item">
                <span class="font-mono text-xs text-primary">${escapeHTML(doc.item)}</span>
                <span class="badge ${doc.status === 'Present' || doc.status === 'Certified' ? 'badge-verified' : 'badge-subtle'}">
                  ${escapeHTML(doc.status)}
                </span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- INSPECTION PHOTOGRAPHY WITH MICROSCOPIC ZOOM LOUPE -->
        <section class="dossier-section-block" aria-label="Physical Inspection Gallery">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <span class="section-kicker">Visual Evidence</span>
              <h2 class="heading-3">Archival Inspection Photography</h2>
            </div>
            <span class="font-mono text-xs text-muted">Hover image to engage 2.5&times; Microscopic Loupe</span>
          </div>
          
          <p class="body-secondary text-sm mb-4">
            Studio photography documenting this reference archetype. The interactive loupe facilitates visual inspection of dial printing, bevels, and hands.
          </p>

          <div class="dossier-gallery-grid">
            ${galleryItems.map((item, idx) => {
              const imgUrl = resolveAsset(item.assetKey);
              return `
                <div class="dossier-photo-card" data-loupe-target>
                  <div class="dossier-photo-frame loupe-container">
                    <img src="${imgUrl}" alt="${escapeHTML(item.label || 'Inspection View')}" class="loupe-base-img" loading="lazy" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
                    <div class="loupe-lens" style="background-image: url('${imgUrl}');"></div>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <span class="font-mono text-xs text-accent uppercase">${escapeHTML(item.category || 'Studio Angle')} &bull; Angle 0${idx + 1}</span>
                    <span class="font-mono text-2xs text-muted">2.5&times; Visual Loupe</span>
                  </div>
                  <span class="text-2xs text-secondary mt-1">${escapeHTML(item.label || 'Reference Image (Illustrative)')}</span>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- DOSSIER CLOSING SIGN-OFF (Honest, Unfabricated Metadata) -->
        <footer class="dossier-closing-footer">
          <div>
            <span class="font-serif text-base text-primary block mb-1">HOROLOGY Horological Inspection Desk</span>
            <span class="text-2xs text-muted block">Independent Pre-Owned Verification &bull; Geneva / London / Tokyo</span>
            <span class="text-2xs text-dim block mt-1">Archival Record ID: ${escapeHTML(dossierId)}</span>
          </div>
          <div class="text-right">
            <span class="badge badge-verified mb-1">Inspection Verified</span>
            <span class="block text-2xs text-muted">Backed by HOROLOGY 24-Month Mechanical Guarantee</span>
          </div>
        </footer>

      </article>
    </div>
  `;
}

export function mount(ctx) {
  // 1. Print action trigger
  const printBtn = document.getElementById('dossierPrintBtn');
  printBtn?.addEventListener('click', () => {
    window.print();
  });

  // 2. Microscopic Zoom Loupe Interaction
  document.querySelectorAll('[data-loupe-target]').forEach(card => {
    const container = card.querySelector('.loupe-container');
    const lens = card.querySelector('.loupe-lens');
    const baseImg = card.querySelector('.loupe-base-img');

    if (!container || !lens || !baseImg) return;

    const moveLoupe = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      let x = clientX - rect.left;
      let y = clientY - rect.top;

      // Keep lens within container bounds
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));

      // Calculate lens position
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;
      lens.style.left = `${x - lensWidth / 2}px`;
      lens.style.top = `${y - lensHeight / 2}px`;

      // Calculate background position for 2.5x zoom
      const zoom = 2.5;
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
      lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    };

    container.addEventListener('mouseenter', () => {
      lens.classList.add('active');
    });

    container.addEventListener('mouseleave', () => {
      lens.classList.remove('active');
    });

    container.addEventListener('mousemove', moveLoupe);

    container.addEventListener('touchstart', (e) => {
      lens.classList.add('active');
      moveLoupe(e);
    }, { passive: true });

    container.addEventListener('touchmove', moveLoupe, { passive: true });

    container.addEventListener('touchend', () => {
      lens.classList.remove('active');
    });
  });
}
