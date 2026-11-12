// HOROLOGY — Filter & Facet Engine
import { repository } from '../data/repository.js';

export class FilterEngine {
  constructor(initialCriteria = {}) {
    this.criteria = {
      search: '',
      brand: 'all',
      movement: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      sort: 'featured',
      ...initialCriteria
    };
  }

  setCriterion(key, value) {
    this.criteria[key] = value;
    return this;
  }

  reset() {
    this.criteria = {
      search: '',
      brand: 'all',
      movement: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      sort: 'featured'
    };
    return this;
  }

  execute() {
    return repository.queryWatches(this.criteria);
  }

  getFacetCounts() {
    const all = repository.getAllWatches();
    const brands = {};
    const movements = {};

    for (const w of all) {
      brands[w.brandId] = (brands[w.brandId] || 0) + 1;
      const mov = w.specification.movementType;
      movements[mov] = (movements[mov] || 0) + 1;
    }

    return { brands, movements, total: all.length };
  }
}

export const filterEngine = new FilterEngine();
