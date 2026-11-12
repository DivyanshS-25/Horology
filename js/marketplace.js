/**
 * HOROLOGY — Marketplace Query, Filter & Sorting Engine
 * Pure Vanilla JavaScript Client-Side Engine for Curated Timepiece Discovery
 * Direction C — Midnight Navy Precision
 */

import { WATCHES } from './data.js';

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured Curations' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'manufacturer', label: 'Manufacturer (A–Z)' },
  { id: 'case-size', label: 'Case Size (Small to Large)' }
];

export const PRICE_PRESETS = [
  { id: 'under-5l', label: 'Under ₹5,00,000', min: 0, max: 500000 },
  { id: '5l-10l', label: '₹5,00,000 – ₹10,00,000', min: 500000, max: 1000000 },
  { id: '10l-15l', label: '₹10,00,000 – ₹15,00,000', min: 1000000, max: 1500000 },
  { id: 'above-15l', label: 'Above ₹15,00,000', min: 1500000, max: null }
];

export const CASE_SIZE_PRESETS = [
  { id: 'size-small', label: '≤ 38 mm', min: 0, max: 38 },
  { id: 'size-medium', label: '39 – 41 mm', min: 39, max: 41 },
  { id: 'size-large', label: '≥ 42 mm', min: 42, max: null }
];

export class MarketplaceEngine {
  constructor(dataset = WATCHES) {
    this.rawDataset = [...dataset];
    this.subscribers = new Set();

    this.state = {
      searchQuery: '',
      filters: {
        manufacturers: [],
        minPrice: null,
        maxPrice: null,
        activePricePreset: null,
        movements: [],
        watchTypes: [],
        conditions: [],
        minCaseSize: null,
        maxCaseSize: null,
        activeSizePreset: null,
        documentation: [],
        inspection: []
      },
      sortBy: 'featured',
      currentPage: 1,
      pageSize: 12
    };
  }

  getState() {
    return this.state;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const result = this.execute();
    this.subscribers.forEach(cb => {
      try {
        cb(result);
      } catch (err) {
        console.error('[MarketplaceEngine] Subscriber error:', err);
      }
    });
  }

  // State Mutation Methods
  setSearchQuery(query) {
    this.state.searchQuery = String(query || '').trim();
    this.state.currentPage = 1;
    this.notify();
  }

  toggleFilter(category, value) {
    if (!this.state.filters[category]) return;
    const list = this.state.filters[category];
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
    this.state.currentPage = 1;
    this.notify();
  }

  setPricePreset(presetId) {
    if (this.state.filters.activePricePreset === presetId) {
      // Toggle off
      this.state.filters.activePricePreset = null;
      this.state.filters.minPrice = null;
      this.state.filters.maxPrice = null;
    } else {
      const preset = PRICE_PRESETS.find(p => p.id === presetId);
      if (preset) {
        this.state.filters.activePricePreset = preset.id;
        this.state.filters.minPrice = preset.min;
        this.state.filters.maxPrice = preset.max;
      }
    }
    this.state.currentPage = 1;
    this.notify();
  }

  setCustomPriceRange(min, max) {
    this.state.filters.activePricePreset = null;
    this.state.filters.minPrice = min !== '' && min !== null && !isNaN(min) ? Number(min) : null;
    this.state.filters.maxPrice = max !== '' && max !== null && !isNaN(max) ? Number(max) : null;
    this.state.currentPage = 1;
    this.notify();
  }

  setSizePreset(presetId) {
    if (this.state.filters.activeSizePreset === presetId) {
      this.state.filters.activeSizePreset = null;
      this.state.filters.minCaseSize = null;
      this.state.filters.maxCaseSize = null;
    } else {
      const preset = CASE_SIZE_PRESETS.find(p => p.id === presetId);
      if (preset) {
        this.state.filters.activeSizePreset = preset.id;
        this.state.filters.minCaseSize = preset.min;
        this.state.filters.maxCaseSize = preset.max;
      }
    }
    this.state.currentPage = 1;
    this.notify();
  }

  setCustomCaseSizeRange(min, max) {
    this.state.filters.activeSizePreset = null;
    this.state.filters.minCaseSize = min !== '' && min !== null && !isNaN(min) ? Number(min) : null;
    this.state.filters.maxCaseSize = max !== '' && max !== null && !isNaN(max) ? Number(max) : null;
    this.state.currentPage = 1;
    this.notify();
  }

  setSortBy(sortKey) {
    if (SORT_OPTIONS.some(o => o.id === sortKey)) {
      this.state.sortBy = sortKey;
      this.state.currentPage = 1;
      this.notify();
    }
  }

  setPage(pageNum) {
    const validPage = Math.max(1, Number(pageNum) || 1);
    this.state.currentPage = validPage;
    this.notify();
  }

  setPageSize(size) {
    this.state.pageSize = Math.max(1, Number(size) || 12);
    this.state.currentPage = 1;
    this.notify();
  }

  preseedManufacturer(brandName) {
    if (!brandName) return;
    this.resetFilters(false);
    this.state.filters.manufacturers = [brandName];
    this.state.currentPage = 1;
  }

  removeFilter(category, value) {
    if (category === 'price') {
      this.state.filters.activePricePreset = null;
      this.state.filters.minPrice = null;
      this.state.filters.maxPrice = null;
    } else if (category === 'size') {
      this.state.filters.activeSizePreset = null;
      this.state.filters.minCaseSize = null;
      this.state.filters.maxCaseSize = null;
    } else if (category === 'search') {
      this.state.searchQuery = '';
    } else if (this.state.filters[category]) {
      this.state.filters[category] = this.state.filters[category].filter(v => v !== value);
    }
    this.state.currentPage = 1;
    this.notify();
  }

  resetFilters(notify = true) {
    this.state.searchQuery = '';
    this.state.filters = {
      manufacturers: [],
      minPrice: null,
      maxPrice: null,
      activePricePreset: null,
      movements: [],
      watchTypes: [],
      conditions: [],
      minCaseSize: null,
      maxCaseSize: null,
      activeSizePreset: null,
      documentation: [],
      inspection: []
    };
    this.state.sortBy = 'featured';
    this.state.currentPage = 1;
    if (notify) this.notify();
  }

  // Pure Pipeline Execution
  execute() {
    let result = [...this.rawDataset];

    // 1. Text Search Filter (Multi-token match across all key fields)
    if (this.state.searchQuery) {
      const tokens = this.state.searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      result = result.filter(watch => {
        const searchableText = [
          watch.brand || '',
          watch.model || '',
          watch.reference || '',
          watch.referenceNumber || '',
          watch.family || '',
          watch.movementType || '',
          watch.calibre || '',
          watch.watchType || '',
          watch.dialColour || '',
          watch.caseMaterial || '',
          (watch.keywords || []).join(' ')
        ].join(' ').toLowerCase();

        return tokens.every(token => searchableText.includes(token));
      });
    }

    // 2. Multi-Facet Filtering (AND across groups, OR within group)
    const { filters } = this.state;

    // Manufacturer
    if (filters.manufacturers.length > 0) {
      result = result.filter(w => filters.manufacturers.includes(w.brand));
    }

    // Price Range
    if (filters.minPrice !== null && filters.minPrice !== undefined) {
      result = result.filter(w => w.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      result = result.filter(w => w.price <= filters.maxPrice);
    }

    // Movement Type
    if (filters.movements.length > 0) {
      result = result.filter(w => filters.movements.includes(w.movementType));
    }

    // Watch Type
    if (filters.watchTypes.length > 0) {
      result = result.filter(w => filters.watchTypes.includes(w.watchType));
    }

    // Condition
    if (filters.conditions.length > 0) {
      result = result.filter(w => filters.conditions.includes(w.condition));
    }

    // Case Size
    if (filters.minCaseSize !== null && filters.minCaseSize !== undefined) {
      result = result.filter(w => (w.caseSizeMm || 40) >= filters.minCaseSize);
    }
    if (filters.maxCaseSize !== null && filters.maxCaseSize !== undefined) {
      result = result.filter(w => (w.caseSizeMm || 40) <= filters.maxCaseSize);
    }

    // Documentation
    if (filters.documentation.length > 0) {
      result = result.filter(w => filters.documentation.includes(w.documentationCategory));
    }

    // Inspection Status
    if (filters.inspection.length > 0) {
      result = result.filter(w => filters.inspection.includes(w.inspectionStatus));
    }

    // 3. Sorting Stage
    result.sort((a, b) => {
      switch (this.state.sortBy) {
        case 'newest':
          return (b.listedOrder || 0) - (a.listedOrder || 0);

        case 'price-asc':
          return a.price - b.price;

        case 'price-desc':
          return b.price - a.price;

        case 'manufacturer':
          const brandComp = a.brand.localeCompare(b.brand);
          return brandComp !== 0 ? brandComp : a.model.localeCompare(b.model);

        case 'case-size':
          return (a.caseSizeMm || 40) - (b.caseSizeMm || 40);

        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (a.featuredOrder || 99) - (b.featuredOrder || 99);
      }
    });

    // Compute Facet Counts for all filters based on dataset
    const facetCounts = this.computeFacetCounts();

    // Compute Active Filters List
    const activeFilters = this.computeActiveFilterPills();

    // 4. Pagination Slice
    const totalItems = result.length;
    const pageSize = this.state.pageSize;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(Math.max(1, this.state.currentPage), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const items = result.slice(startIndex, endIndex);

    return {
      items,
      totalItems,
      totalPages,
      currentPage,
      pageSize,
      startIndex: totalItems > 0 ? startIndex + 1 : 0,
      endIndex,
      activeFilters,
      activeFilterCount: activeFilters.length,
      facetCounts,
      state: { ...this.state }
    };
  }

  computeFacetCounts() {
    const counts = {
      manufacturers: {},
      movements: {},
      watchTypes: {},
      conditions: {},
      documentation: {},
      inspection: {}
    };

    this.rawDataset.forEach(w => {
      // Manufacturer
      counts.manufacturers[w.brand] = (counts.manufacturers[w.brand] || 0) + 1;
      // Movement
      counts.movements[w.movementType] = (counts.movements[w.movementType] || 0) + 1;
      // Watch Type
      counts.watchTypes[w.watchType] = (counts.watchTypes[w.watchType] || 0) + 1;
      // Condition
      counts.conditions[w.condition] = (counts.conditions[w.condition] || 0) + 1;
      // Documentation
      counts.documentation[w.documentationCategory] = (counts.documentation[w.documentationCategory] || 0) + 1;
      // Inspection
      counts.inspection[w.inspectionStatus] = (counts.inspection[w.inspectionStatus] || 0) + 1;
    });

    return counts;
  }

  computeActiveFilterPills() {
    const pills = [];
    const { searchQuery, filters } = this.state;

    if (searchQuery) {
      pills.push({ category: 'search', value: searchQuery, label: `Search: "${searchQuery}"` });
    }

    filters.manufacturers.forEach(m => {
      pills.push({ category: 'manufacturers', value: m, label: m });
    });

    if (filters.activePricePreset) {
      const p = PRICE_PRESETS.find(x => x.id === filters.activePricePreset);
      if (p) pills.push({ category: 'price', value: p.id, label: p.label });
    } else if (filters.minPrice !== null || filters.maxPrice !== null) {
      const minStr = filters.minPrice ? `₹${filters.minPrice.toLocaleString('en-IN')}` : '₹0';
      const maxStr = filters.maxPrice ? `₹${filters.maxPrice.toLocaleString('en-IN')}` : 'Max';
      pills.push({ category: 'price', value: 'custom', label: `${minStr} – ${maxStr}` });
    }

    filters.movements.forEach(m => {
      pills.push({ category: 'movements', value: m, label: m });
    });

    filters.watchTypes.forEach(t => {
      pills.push({ category: 'watchTypes', value: t, label: t });
    });

    filters.conditions.forEach(c => {
      pills.push({ category: 'conditions', value: c, label: c });
    });

    if (filters.activeSizePreset) {
      const s = CASE_SIZE_PRESETS.find(x => x.id === filters.activeSizePreset);
      if (s) pills.push({ category: 'size', value: s.id, label: s.label });
    } else if (filters.minCaseSize !== null || filters.maxCaseSize !== null) {
      const minMm = filters.minCaseSize || '34';
      const maxMm = filters.maxCaseSize ? `${filters.maxCaseSize}mm` : 'Max';
      pills.push({ category: 'size', value: 'custom', label: `${minMm}mm – ${maxMm}` });
    }

    filters.documentation.forEach(d => {
      pills.push({ category: 'documentation', value: d, label: d });
    });

    filters.inspection.forEach(i => {
      pills.push({ category: 'inspection', value: i, label: i });
    });

    return pills;
  }
}

