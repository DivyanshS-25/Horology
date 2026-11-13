/**
 * HOROLOGY — Asset Manifest Resolver & Fallback Handler
 * Manifest-driven asset lookup with relative path normalization (./assets/...)
 * Direction C — Midnight Navy Horological Fallback Engine
 */

import { generateWatchSvg } from './utils/watchIllustrations.js';

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
 * Generates an SVG Data-URI placeholder in the Obsidian Luxury aesthetic
 * Uses procedural vector rendering for realistic dial, bezel, and handset
 * @param {string} title 
 * @param {string} subtitle 
 * @returns {string} Data URI
 */
export function createPlaceholderWatchSvg(title = 'HOROLOGY', subtitle = 'Pre-Owned Mechanical') {
  const brandName = String(title || 'HOROLOGY').split(' ')[0].toUpperCase();
  const titleLower = String(title || '').toLowerCase();
  const subtitleLower = String(subtitle || '').toLowerCase();
  const isChrono = titleLower.includes('speedmaster') || titleLower.includes('daytona') || subtitleLower.includes('chronograph');

  let dialColor = '#080E16';
  let bezelColor = '#101B28';
  let accentColor = '#38BDF8';

  if (brandName.includes('ROLEX')) {
    dialColor = '#050A0E';
    bezelColor = '#0D1A14'; // Subtle Cerachrom hue
    accentColor = '#38BDF8';
  } else if (brandName.includes('OMEGA')) {
    dialColor = '#070D14';
    bezelColor = '#14202E';
    accentColor = '#38BDF8';
  } else if (brandName.includes('TUDOR')) {
    dialColor = '#080B10';
    bezelColor = '#121822';
    accentColor = '#E2E8F0';
  } else if (brandName.includes('GRAND') || brandName.includes('SEIKO')) {
    dialColor = '#0A121C';
    bezelColor = '#142232';
    accentColor = '#38BDF8';
  }

  const svg = generateWatchSvg(isChrono ? 'chronograph' : 'classic', {
    dialColor,
    bezelColor,
    accentColor,
    brand: brandName || 'HOROLOGY'
  });

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}
