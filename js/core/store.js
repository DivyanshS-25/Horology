// HOROLOGY — Central Reactive Store
import { CONFIG } from './config.js';
import { events } from './events.js';

function getStorageKey(key) {
  return `${CONFIG.STORAGE_PREFIX}${key}`;
}

function readStorage(key, fallback = []) {
  try {
    const val = localStorage.getItem(getStorageKey(key));
    return val ? JSON.parse(val) : fallback;
  } catch (err) {
    console.warn(`[Store] Could not read "${key}" from localStorage:`, err);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch (err) {
    console.warn(`[Store] Could not write "${key}" to localStorage:`, err);
  }
}

class Store {
  constructor() {
    this.wishlist = new Set(readStorage('wishlist', []));
    this.compare = new Set(readStorage('compare', []));
    this.recentlyViewed = readStorage('recent', []);
  }

  // Wishlist
  getWishlist() {
    return Array.from(this.wishlist);
  }

  isInWishlist(watchId) {
    return this.wishlist.has(watchId);
  }

  toggleWishlist(watchId) {
    const exists = this.wishlist.has(watchId);
    if (exists) {
      this.wishlist.delete(watchId);
    } else {
      this.wishlist.add(watchId);
    }
    const list = Array.from(this.wishlist);
    writeStorage('wishlist', list);
    events.emit('wishlist:updated', { watchId, inWishlist: !exists, count: this.wishlist.size });
    return !exists;
  }

  // Compare
  getCompare() {
    return Array.from(this.compare);
  }

  isInCompare(watchId) {
    return this.compare.has(watchId);
  }

  addToCompare(watchId) {
    if (this.compare.has(watchId)) return false;
    if (this.compare.size >= CONFIG.MAX_COMPARE) {
      events.emit('toast:show', { message: `Comparison is limited to ${CONFIG.MAX_COMPARE} timepieces.`, type: 'warning' });
      return false;
    }
    this.compare.add(watchId);
    const list = Array.from(this.compare);
    writeStorage('compare', list);
    events.emit('compare:updated', { watchId, inCompare: true, count: this.compare.size, items: list });
    return true;
  }

  removeFromCompare(watchId) {
    if (!this.compare.has(watchId)) return false;
    this.compare.delete(watchId);
    const list = Array.from(this.compare);
    writeStorage('compare', list);
    events.emit('compare:updated', { watchId, inCompare: false, count: this.compare.size, items: list });
    return true;
  }

  toggleCompare(watchId) {
    if (this.compare.has(watchId)) {
      return this.removeFromCompare(watchId);
    } else {
      return this.addToCompare(watchId);
    }
  }

  clearCompare() {
    this.compare.clear();
    writeStorage('compare', []);
    events.emit('compare:updated', { inCompare: false, count: 0, items: [] });
  }

  // Recently Viewed
  getRecentlyViewed() {
    return [...this.recentlyViewed];
  }

  addRecentlyViewed(watchId) {
    if (!watchId) return;
    this.recentlyViewed = [watchId, ...this.recentlyViewed.filter(id => id !== watchId)].slice(0, CONFIG.MAX_RECENT);
    writeStorage('recent', this.recentlyViewed);
    events.emit('recent:updated', { items: this.recentlyViewed });
  }
}

export const store = new Store();
