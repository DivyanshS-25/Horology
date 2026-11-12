/**
 * HOROLOGY — Central Data Repository
 * Brands, 24 Seed Timepieces, Journal Articles, Legal Text & Nav Structures
 * Enriched with Phase 04 Canonical Watch Intelligence
 */

import { BRANDS } from './data/brands.js';
import { WATCHES as RAW_WATCHES } from './data/watches.js';
import { ARTICLES } from './data/articles.js';
import { FINDER_QUESTIONS } from './data/finderQuestions.js';
import { enrichWatch } from './data/enrichWatchData.js';

// Enrich all 24 demonstration watches with Phase 04 deep horological sub-objects
export const WATCHES = RAW_WATCHES.map(enrichWatch);

export { BRANDS, ARTICLES, FINDER_QUESTIONS };

export const NAVIGATION = {
  main: [
    { label: 'Collection', href: '#/collection' },
    {
      label: 'Brands',
      href: '#/collection',
      dropdown: [
        { label: 'All Manufactures', href: '#/collection', badge: '24 References' },
        { label: 'Rolex', href: '#/brands/rolex', badge: 'Geneva' },
        { label: 'Omega', href: '#/brands/omega', badge: 'Bienne' },
        { label: 'Tudor', href: '#/brands/tudor', badge: 'Geneva' },
        { label: 'Grand Seiko', href: '#/brands/grand-seiko', badge: 'Shizukuishi' }
      ]
    },
    { label: 'Watch Finder', href: '#/watch-finder' },
    { label: 'Sell / Consign', href: '#/sell-consign' },
    { label: 'Movement Lab', href: '#/movement-lab' },
    { label: 'Journal', href: '#/journal' }
  ],
  footer: {
    explore: [
      { label: 'Collection', href: '#/collection' },
      { label: 'Brands', href: '#/collection' },
      { label: 'Watch Finder', href: '#/watch-finder' },
      { label: 'Wishlist Vault', href: '#/wishlist' },
      { label: 'Compare Timepieces', href: '#/compare' }
    ],
    discover: [
      { label: 'Movement Lab', href: '#/movement-lab' },
      { label: 'Authenticity Centre', href: '#/authenticity' },
      { label: 'Collector\'s Journal', href: '#/journal' }
    ],
    connect: [
      { label: 'Sell / Consign', href: '#/sell-consign' },
      { label: 'Contact Us', href: '#/contact' },
      { label: 'Arrange Appointment', href: '#/appointment' },
      { label: 'About HOROLOGY', href: '#/about' }
    ],
    information: [
      { label: 'Privacy Policy', href: '#/legal/privacy' },
      { label: 'Terms & Conditions', href: '#/legal/terms' },
      { label: 'Shipping & Returns', href: '#/legal/shipping' },
      { label: 'Disclaimer', href: '#/legal/disclaimer' }
    ]
  }
};

export const LEGAL_DOCS = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Institutional Commitment to Collector Privacy',
        body: 'At HOROLOGY, discretion is paramount. We treat all personal identities, acquisition histories, vault coordinates, and valuation inquiries with Swiss-standard confidentiality. We do not sell, rent, or trade client transaction records or browsing telemetry with third parties under any circumstances.'
      },
      {
        heading: '2. Client Data We Collect',
        body: 'We collect minimal necessary data: identity and contact credentials when submitting a private viewing appointment or watch consignment request; technical delivery coordinates for insured armored transit; and client-side preferences (such as your saved Wishlist and Compare selection) stored securely in your browser\'s local storage.'
      },
      {
        heading: '3. Data Security & Encryption',
        body: 'All digital interactions are conducted through encrypted SSL/TLS channels. Consignment appraisals and bespoke acquisition inquiries are routed directly to our certified master horologists and recorded on isolated cryptographic ledgers.'
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Nature of the Collection',
        body: 'HOROLOGY is an independent purveyor of pre-owned, vintage, and modern verified mechanical luxury timepieces. HOROLOGY is not an authorized distributor or affiliate of Rolex SA, Omega SA, Tudor SA, or Grand Seiko Corporation. All manufacturer trademarks, brand names, and model designations belong exclusively to their respective intellectual property owners.'
      },
      {
        heading: '2. Authenticity Guarantee & 7-Stage Forensic Standard',
        body: 'Every timepiece offered in the HOROLOGY vault has undergone forensic multi-point examination by certified horologists. We unconditionally warrant the authenticity of the movement, dial, case, and serialized components for the lifetime of ownership, backed by our Archival Inspection Dossier.'
      },
      {
        heading: '3. Mechanical Warranty & Telemetry Accuracy',
        body: 'Unless expressly stated as an unrestored vintage curiosity, all timepieces are accompanied by our 24-Month Comprehensive Mechanical Movement Warranty. Timegrapher readings provided in our dossiers represent actual timing machine calibrations recorded across four resting and vertical positions.'
      }
    ]
  },
  shipping: {
    title: 'Shipping & Returns Policy',
    lastUpdated: 'November 2026',
    sections: [
      {
        heading: '1. Armored & Fully Insured Transit',
        body: 'All deliveries are conducted via specialized high-value armored couriers (Ferrari Group / Malca-Amit / Brink\'s) with 100% loss-and-damage indemnity. Deliveries require adult signature, government identification verification, and physical inspection of intact security seals upon handover.'
      },
      {
        heading: '2. 14-Day Private Inspection Period',
        body: 'We provide an unconditional 14-day inspection window from the date of physical receipt. The collector may examine the timepiece in domestic or private salon environments. If for any reason the timepiece does not fulfill your expectations, return it in unaltered condition with security tags intact for a prompt 100% refund.'
      },
      {
        heading: '3. Complimentary Return Logistics',
        body: 'Should you elect to return a timepiece, our concierge coordinates immediate armored courier collection directly from your residence or office at zero expense to you.'
      }
    ]
  }
};

// Data Query Selectors
export function getAllWatches() {
  return WATCHES;
}

export function getFeaturedWatches() {
  return WATCHES.filter(w => w.featured).slice(0, 4);
}

/**
 * Universal flexible watch locator supporting id, slug, or reference number
 */
export function findWatchByIdentifier(identifier) {
  if (!identifier) return null;
  const idStr = String(identifier).trim().toLowerCase();
  return WATCHES.find(w => 
    w.id.toLowerCase() === idStr || 
    w.slug.toLowerCase() === idStr || 
    (w.referenceNumber && w.referenceNumber.toLowerCase() === idStr) ||
    (w.reference && w.reference.toLowerCase() === idStr)
  ) || null;
}

export function getWatchById(id) {
  return findWatchByIdentifier(id);
}

export function getWatchBySlug(slug) {
  return findWatchByIdentifier(slug);
}

export function getWatchesByBrand(brandId) {
  if (!brandId || brandId === 'all') return WATCHES;
  return WATCHES.filter(w => w.brandId.toLowerCase() === brandId.toLowerCase());
}

export function getBrandById(id) {
  return BRANDS.find(b => b.id.toLowerCase() === id.toLowerCase());
}

export function getAllBrands() {
  return BRANDS;
}

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug || a.id === slug);
}

/**
 * Selects 3-4 curated related timepieces prioritized by brand, family, type, and price proximity
 */
export function getRelatedWatches(targetWatch, count = 4) {
  if (!targetWatch) return [];
  return WATCHES
    .filter(w => w.id !== targetWatch.id)
    .map(w => {
      let score = 0;
      if (w.brandId === targetWatch.brandId) score += 5;
      if (w.family && targetWatch.family && w.family.toLowerCase() === targetWatch.family.toLowerCase()) score += 4;
      if (w.watchType === targetWatch.watchType) score += 3;
      if (w.movementType === targetWatch.movementType) score += 2;
      const priceDiff = Math.abs(w.price - targetWatch.price);
      if (priceDiff < 250000) score += 3;
      else if (priceDiff < 500000) score += 2;
      return { watch: w, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.watch);
}
