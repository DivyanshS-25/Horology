/**
 * HOROLOGY — Asset Manifest Resolver & Fallback Handler
 * Manifest-driven asset lookup with relative path normalization (./assets/...)
 * Direction C — Midnight Navy Horological Fallback Engine
 */

// Embedded lookup map mirroring asset-manifest.json for synchronous, zero-latency ES module resolution
const MANIFEST_ASSETS = {
  'HZ-HERO-001': {
    id: 'HZ-HERO-001',
    path: './assets/images/hero/hero-home-primary-16x9.jpg',
    category: 'hero',
    dimensions: '1376x768',
    aspectRatio: '16:9',
    alt: 'Curated luxury mechanical chronometer on midnight navy slate'
  },
  'HZ-HERO-002': {
    id: 'HZ-HERO-002',
    path: './assets/images/hero/hero-home-secondary-dial-macro-16x9.jpg',
    category: 'hero',
    dimensions: '1376x768',
    aspectRatio: '16:9',
    alt: 'High-precision mechanical escapement and balance wheel macro'
  },
  'HZ-HERO-003': {
    id: 'HZ-HERO-003',
    path: './assets/images/hero/hero-home-mobile-4x5.jpg',
    category: 'hero',
    dimensions: '1024x1024',
    aspectRatio: '1:1',
    alt: 'Inspection loupe and tweezers over chronometer movement'
  },
  'HZ-LOGO-001': {
    id: 'HZ-LOGO-001',
    path: './assets/logos/horology-wordmark.svg',
    category: 'logo',
    alt: 'HOROLOGY Wordmark Logo'
  },
  'HZ-LOGO-002': {
    id: 'HZ-LOGO-002',
    path: './assets/logos/horology-emblem.svg',
    category: 'logo',
    alt: 'HOROLOGY Balance Wheel Emblem'
  },
  'HZ-BG-001': {
    id: 'HZ-BG-001',
    path: './assets/images/backgrounds/bg-radial-azure.svg',
    category: 'background',
    alt: 'Atmospheric Azure Radial Scrim'
  },
  'HZ-BG-002': {
    id: 'HZ-BG-002',
    path: './assets/images/backgrounds/bg-grid-calibration.svg',
    category: 'background',
    alt: 'Horological Calibration Grid'
  },
  'HZ-OG-001': {
    id: 'HZ-OG-001',
    path: './assets/images/og/og-horology-summary.png',
    category: 'opengraph',
    alt: 'HOROLOGY OpenGraph Summary Card'
  },
  'HZ-SPRITE-001': {
    id: 'HZ-SPRITE-001',
    path: './assets/icons/sprite.svg',
    category: 'icons',
    alt: 'HOROLOGY SVG Icon Sprite'
  }
};

/**
 * Normalizes an asset path to ensure it starts with './' for GitHub Pages compatibility
 * @param {string} path 
 * @returns {string}
 */
export function normalizeAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  let clean = path.startsWith('/') ? path.slice(1) : path;
  if (!clean.startsWith('./')) {
    clean = './' + clean;
  }
  return clean;
}

/**
 * Resolves an asset ID or relative path against the manifest.
 * Falls back to an inline horological SVG placeholder if not found.
 * @param {string} idOrPath 
 * @param {object} options 
 * @returns {string} URL or Data-URI
 */
export function resolveAsset(idOrPath, options = {}) {
  if (!idOrPath) {
    return createPlaceholderWatchSvg(options.title || 'HOROLOGY', options.subtitle || 'Verified Reference');
  }

  // Check manifest ID
  if (MANIFEST_ASSETS[idOrPath]) {
    return MANIFEST_ASSETS[idOrPath].path;
  }

  // If path is passed directly, normalize and return
  if (typeof idOrPath === 'string' && (idOrPath.includes('/') || idOrPath.endsWith('.jpg') || idOrPath.endsWith('.svg') || idOrPath.endsWith('.png'))) {
    return normalizeAssetPath(idOrPath);
  }

  return createPlaceholderWatchSvg(options.title || idOrPath, options.subtitle || 'Mechanical Chronometer');
}

/**
 * Generates an SVG Data-URI placeholder in Direction C Midnight Navy
 * @param {string} title 
 * @param {string} subtitle 
 * @returns {string} Data URI
 */
export function createPlaceholderWatchSvg(title = 'HOROLOGY', subtitle = 'Pre-Owned Mechanical') {
  const safeTitle = String(title || 'HOROLOGY').replace(/[<>&"]/g, '');
  const safeSubtitle = String(subtitle || 'Mechanical Chronometer').replace(/[<>&"]/g, '');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1B344B"/>
        <stop offset="60%" stop-color="#101923"/>
        <stop offset="100%" stop-color="#050608"/>
      </radialGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#9C7E24"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bg)"/>
    <circle cx="300" cy="300" r="210" fill="none" stroke="#263A50" stroke-width="2"/>
    <circle cx="300" cy="300" r="190" fill="none" stroke="url(#accent)" stroke-width="1.5" stroke-dasharray="4,8"/>
    <circle cx="300" cy="300" r="140" fill="none" stroke="#1B344B" stroke-width="1"/>
    
    <!-- Balance Wheel Crossbars -->
    <line x1="300" y1="110" x2="300" y2="490" stroke="#263A50" stroke-width="1" stroke-dasharray="2,4"/>
    <line x1="110" y1="300" x2="490" y2="300" stroke="#263A50" stroke-width="1" stroke-dasharray="2,4"/>

    <!-- Central Horological Jewel -->
    <circle cx="300" cy="300" r="8" fill="#D4AF37" opacity="0.85"/>
    <circle cx="300" cy="300" r="18" fill="none" stroke="#D4AF37" stroke-width="1.5"/>

    <!-- Dial Text -->
    <text x="300" y="240" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" fill="#F4F4F0" text-anchor="middle" letter-spacing="4">${safeTitle}</text>
    <text x="300" y="270" font-family="'JetBrains Mono', monospace" font-size="12" fill="#D4AF37" text-anchor="middle" letter-spacing="2">DEMONSTRATION RECORD</text>
    <text x="300" y="370" font-family="'Inter', sans-serif" font-size="12" fill="#949AAB" text-anchor="middle" letter-spacing="1">${safeSubtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
