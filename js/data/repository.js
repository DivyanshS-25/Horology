// HOROLOGY — Data Repository & Query Engine
import { WATCHES } from './watches.js';
import { BRANDS } from './brands.js';
import { ARTICLES } from './articles.js';
import { validateWatchRecord } from '../utils/validators.js';

export const repository = {
  // Watches
  getAllWatches() {
    return [...WATCHES];
  },

  getWatchById(id) {
    return WATCHES.find(w => w.id === id) || null;
  },

  getWatchBySlug(slug) {
    return WATCHES.find(w => w.slug === slug) || null;
  },

  getFeaturedWatches() {
    return WATCHES.filter(w => w.featured);
  },

  getWatchesByBrand(brandId) {
    return WATCHES.filter(w => w.brandId.toLowerCase() === brandId.toLowerCase());
  },

  getWatchesByFamily(brandId, familyId) {
    return WATCHES.filter(w => 
      w.brandId.toLowerCase() === brandId.toLowerCase() && 
      w.family.toLowerCase() === familyId.toLowerCase()
    );
  },

  // Brands
  getAllBrands() {
    return [...BRANDS];
  },

  getBrandById(id) {
    return BRANDS.find(b => b.id.toLowerCase() === id.toLowerCase()) || null;
  },

  // Articles
  getAllArticles() {
    return [...ARTICLES];
  },

  getArticleBySlug(slug) {
    return ARTICLES.find(a => a.slug === slug) || null;
  },

  // Filter & Search
  queryWatches({ search = '', brand = '', movement = '', minPrice = 0, maxPrice = Infinity, sort = 'featured' } = {}) {
    let result = [...WATCHES];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(w => 
        w.model.toLowerCase().includes(q) ||
        w.brand.toLowerCase().includes(q) ||
        w.referenceNumber.toLowerCase().includes(q) ||
        w.specification.calibre.toLowerCase().includes(q)
      );
    }

    if (brand && brand !== 'all') {
      result = result.filter(w => w.brandId.toLowerCase() === brand.toLowerCase());
    }

    if (movement && movement !== 'all') {
      result = result.filter(w => w.specification.movementType.toLowerCase() === movement.toLowerCase());
    }

    result = result.filter(w => w.price >= minPrice && w.price <= maxPrice);

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'name-asc':
        result.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  },

  // Data Integrity Verification
  validateAllRecords() {
    const results = [];
    for (const watch of WATCHES) {
      const validation = validateWatchRecord(watch);
      results.push({ id: watch.id, valid: validation.valid, errors: validation.errors });
    }
    const allValid = results.every(r => r.valid);
    return { allValid, total: results.length, details: results };
  }
};
