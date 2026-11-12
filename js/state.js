/**
 * HOROLOGY — Reactive Collector State Store & Persistence Layer (Phase 05 Unified)
 * Direction C — Midnight Navy Edition
 * Single Source of Truth for:
 * 1. Wishlist ("My Collection of Desires")
 * 2. Compare List (Up to 4 watches with limit/replacement workflows)
 * 3. Recently Viewed Watches (Up to 12 watches with timestamps)
 * 4. Watch Finder State (Last answers & completion timestamp)
 * 5. Collector Preferences (Units, limits, display preferences)
 *
 * Fully supports:
 * - Namespaced versioned storage (horology_collector_state_v1)
 * - Seamless migration from Phase 02-04 legacy keys
 * - In-memory fallback if localStorage is disabled/throws quota errors
 * - Robust ID validation pruning corrupted or invalid records
 * - Cross-tab reactive synchronization via window storage event
 * - Accessible floating toast notifications with action buttons (Undo)
 */

const STORAGE_KEY_UNIFIED = 'horology_collector_state_v1';

// Legacy keys for seamless backward compatibility & migration
const LEGACY_KEYS = {
  WISHLIST: 'horology_wishlist_v1',
  COMPARE: 'horology_compare_v1',
  RECENTLY_VIEWED: 'horology_viewed_v1',
  FINDER_PREFS: 'horology_finder_prefs_v1',
  COLLECTOR_PREFS: 'horology_collector_prefs_v1'
};

const COMPARE_MAX_LIMIT = 4;
const RECENTLY_VIEWED_MAX_LIMIT = 12;

// Authoritative list of 24 canonical demonstration watch IDs
const VALID_WATCH_IDS = new Set([
  'demo-rolex-126610ln',
  'demo-rolex-126710blro',
  'demo-rolex-126334',
  'demo-rolex-116500ln',
  'demo-rolex-124270',
  'demo-rolex-126600',
  'demo-omega-31030425001001',
  'demo-omega-21030422001001',
  'demo-omega-22010412103001',
  'demo-omega-31130403001001',
  'demo-omega-13110366001001',
  'demo-omega-21530442201001',
  'demo-tudor-m79030n-0001',
  'demo-tudor-m25407n-0001',
  'demo-tudor-m79830rb-0001',
  'demo-tudor-m79360n-0002',
  'demo-tudor-m79950-0001',
  'demo-tudor-m28500-0005',
  'demo-gs-sbga211',
  'demo-gs-slga009',
  'demo-gs-sbge257',
  'demo-gs-sbgw231',
  'demo-gs-sbgp011',
  'demo-gs-sbga461'
]);

class StateStore {
  constructor() {
    this.subscribers = new Map();
    this.isStorageAvailable = this._checkStorageAvailability();
    this.inMemoryFallback = {};
    this.lastTrackedView = null; // Dedup rapid reloads of exact same watch

    // Initialize unified state with automatic legacy migration
    this.state = this._loadInitialState();

    // Cross-tab synchronization
    this._initCrossTabSync();
  }

  _checkStorageAvailability() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__horology_storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('[HOROLOGY State] LocalStorage unavailable; operating in memory-only mode.');
      return false;
    }
  }

  _readRaw(key) {
    if (!this.isStorageAvailable) {
      return this.inMemoryFallback[key] || null;
    }
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`[HOROLOGY State] Failed to read ${key} from storage:`, e);
      return this.inMemoryFallback[key] || null;
    }
  }

  _writeRaw(key, valueString) {
    this.inMemoryFallback[key] = valueString;
    if (!this.isStorageAvailable) return;
    try {
      localStorage.setItem(key, valueString);
    } catch (e) {
      console.warn(`[HOROLOGY State] Failed to write ${key} to storage:`, e);
    }
  }

  /**
   * Loads initial state: parses unified key or migrates legacy keys cleanly.
   */
  _loadInitialState() {
    let unified = null;
    try {
      const raw = this._readRaw(STORAGE_KEY_UNIFIED);
      if (raw) unified = JSON.parse(raw);
    } catch (e) {
      console.warn('[HOROLOGY State] Corrupted unified state detected. Re-initializing.', e);
    }

    // Default structure
    const defaultState = {
      wishlist: [], // Array of { id: string, addedAt: string (ISO) }
      compareList: [], // Array of string IDs (max 4)
      recentlyViewed: [], // Array of { id: string, viewedAt: string (ISO) } (max 12)
      watchFinder: { lastAnswers: null, lastCompletedAt: null },
      preferences: {
        caseSizeUnit: 'mm',
        recentlyViewedLimit: 12,
        preferredSort: 'featured',
        highlightDifferences: false
      },
      searchOpen: false,
      mobileMenuOpen: false,
      activeModal: null,
      currentRoute: { path: '/', params: {}, query: {} }
    };

    if (unified && typeof unified === 'object') {
      // Validate and sanitize unified data
      defaultState.wishlist = this._sanitizeWishlist(unified.wishlist);
      defaultState.compareList = this._sanitizeCompareList(unified.compareList);
      defaultState.recentlyViewed = this._sanitizeRecentlyViewed(unified.recentlyViewed);
      if (unified.watchFinder && typeof unified.watchFinder === 'object') {
        defaultState.watchFinder = {
          lastAnswers: unified.watchFinder.lastAnswers || null,
          lastCompletedAt: unified.watchFinder.lastCompletedAt || null
        };
      }
      if (unified.preferences && typeof unified.preferences === 'object') {
        defaultState.preferences = { ...defaultState.preferences, ...unified.preferences };
      }
      return defaultState;
    }

    // Otherwise, perform migration from Phase 02–04 legacy storage keys
    return this._migrateLegacyKeys(defaultState);
  }

  _migrateLegacyKeys(targetState) {
    try {
      // 1. Wishlist migration
      const legacyWish = this._readRaw(LEGACY_KEYS.WISHLIST);
      if (legacyWish) {
        const parsed = JSON.parse(legacyWish);
        targetState.wishlist = this._sanitizeWishlist(parsed);
      }

      // 2. Compare migration
      const legacyComp = this._readRaw(LEGACY_KEYS.COMPARE);
      if (legacyComp) {
        const parsed = JSON.parse(legacyComp);
        targetState.compareList = this._sanitizeCompareList(parsed);
      }

      // 3. Recently Viewed migration
      const legacyViewed = this._readRaw(LEGACY_KEYS.RECENTLY_VIEWED);
      if (legacyViewed) {
        const parsed = JSON.parse(legacyViewed);
        targetState.recentlyViewed = this._sanitizeRecentlyViewed(parsed);
      }

      // 4. Finder Prefs migration
      const legacyFinder = this._readRaw(LEGACY_KEYS.FINDER_PREFS);
      if (legacyFinder) {
        const parsed = JSON.parse(legacyFinder);
        if (parsed && typeof parsed === 'object') {
          targetState.watchFinder = {
            lastAnswers: parsed,
            lastCompletedAt: parsed.savedAt || new Date().toISOString()
          };
        }
      }

      // 5. Collector Prefs migration
      const legacyPrefs = this._readRaw(LEGACY_KEYS.COLLECTOR_PREFS);
      if (legacyPrefs) {
        const parsed = JSON.parse(legacyPrefs);
        if (parsed && typeof parsed === 'object') {
          targetState.preferences = { ...targetState.preferences, ...parsed };
        }
      }

      // Save the newly migrated unified state immediately
      this._persistState(targetState);
    } catch (err) {
      console.warn('[HOROLOGY State] Legacy migration encounter:', err);
    }
    return targetState;
  }

  _sanitizeWishlist(raw) {
    if (!Array.isArray(raw)) return [];
    const valid = [];
    const seen = new Set();
    const nowIso = new Date().toISOString();

    for (const item of raw) {
      const id = typeof item === 'string' ? item : item?.id;
      if (id && VALID_WATCH_IDS.has(id) && !seen.has(id)) {
        seen.add(id);
        const addedAt = (item && typeof item === 'object' && item.addedAt) ? item.addedAt : nowIso;
        valid.push({ id, addedAt });
      }
    }
    return valid;
  }

  _sanitizeCompareList(raw) {
    if (!Array.isArray(raw)) return [];
    const valid = [];
    const seen = new Set();

    for (const item of raw) {
      const id = typeof item === 'string' ? item : item?.id;
      if (id && VALID_WATCH_IDS.has(id) && !seen.has(id)) {
        seen.add(id);
        valid.push(id);
        if (valid.length >= COMPARE_MAX_LIMIT) break;
      }
    }
    return valid;
  }

  _sanitizeRecentlyViewed(raw) {
    if (!Array.isArray(raw)) return [];
    const valid = [];
    const seen = new Set();
    const nowIso = new Date().toISOString();

    for (const item of raw) {
      const id = typeof item === 'string' ? item : item?.id;
      if (id && VALID_WATCH_IDS.has(id) && !seen.has(id)) {
        seen.add(id);
        const viewedAt = (item && typeof item === 'object' && item.viewedAt) ? item.viewedAt : nowIso;
        valid.push({ id, viewedAt });
        if (valid.length >= RECENTLY_VIEWED_MAX_LIMIT) break;
      }
    }
    return valid;
  }

  _persistState(stateToSave = this.state) {
    const payload = {
      version: 1,
      wishlist: stateToSave.wishlist,
      compareList: stateToSave.compareList,
      recentlyViewed: stateToSave.recentlyViewed,
      watchFinder: stateToSave.watchFinder,
      preferences: stateToSave.preferences
    };

    const str = JSON.stringify(payload);
    this._writeRaw(STORAGE_KEY_UNIFIED, str);

    // Also sync legacy keys so external/legacy code reading them works seamlessly
    this._writeRaw(LEGACY_KEYS.WISHLIST, JSON.stringify(stateToSave.wishlist.map(w => w.id)));
    this._writeRaw(LEGACY_KEYS.COMPARE, JSON.stringify(stateToSave.compareList));
    this._writeRaw(LEGACY_KEYS.RECENTLY_VIEWED, JSON.stringify(stateToSave.recentlyViewed.map(r => r.id)));
    if (stateToSave.watchFinder?.lastAnswers) {
      this._writeRaw(LEGACY_KEYS.FINDER_PREFS, JSON.stringify(stateToSave.watchFinder.lastAnswers));
    }
    this._writeRaw(LEGACY_KEYS.COLLECTOR_PREFS, JSON.stringify(stateToSave.preferences));
  }

  _initCrossTabSync() {
    if (typeof window === 'undefined') return;
    window.addEventListener('storage', (event) => {
      try {
        if (event.key === STORAGE_KEY_UNIFIED || Object.values(LEGACY_KEYS).includes(event.key)) {
          const freshState = this._loadInitialState();
          this.state.wishlist = freshState.wishlist;
          this.state.compareList = freshState.compareList;
          this.state.recentlyViewed = freshState.recentlyViewed;
          this.state.watchFinder = freshState.watchFinder;
          this.state.preferences = freshState.preferences;

          this.notify('wishlist');
          this.notify('compareList');
          this.notify('recentlyViewed');
          this.notify('watchFinder');
          this.notify('preferences');
        }
      } catch (err) {
        console.warn('[HOROLOGY State] Cross-tab sync handler error:', err);
      }
    });
  }

  getState() {
    return this.state;
  }

  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);

    // Provide initial invocation with current state
    try {
      callback(this._getSubscriberPayload(key));
    } catch (err) {
      console.error(`[HOROLOGY State] Initial callback error for ${key}:`, err);
    }

    return () => {
      const set = this.subscribers.get(key);
      if (set) set.delete(callback);
    };
  }

  _getSubscriberPayload(key) {
    if (key === 'wishlist') return this.getWishlist();
    if (key === 'compareList') return this.getCompareList();
    if (key === 'recentlyViewed') return this.getRecentlyViewed();
    if (key === 'watchFinder') return this.getFinderState();
    if (key === 'preferences') return this.getPreferences();
    return this.state[key];
  }

  notify(key) {
    if (this.subscribers.has(key)) {
      const val = this._getSubscriberPayload(key);
      this.subscribers.get(key).forEach(cb => {
        try {
          cb(val);
        } catch (err) {
          console.error(`[HOROLOGY State] Subscriber notification error for ${key}:`, err);
        }
      });
    }
  }

  // ==========================================
  // SYSTEM 1: Wishlist ("My Collection of Desires")
  // ==========================================
  getWishlist() {
    // Backward-compatible string ID array
    return this.state.wishlist.map(w => w.id);
  }

  getWishlistEntries() {
    // Full entries with ISO addedAt timestamps
    return [...this.state.wishlist];
  }

  isInWishlist(id) {
    if (!id) return false;
    return this.state.wishlist.some(w => w.id === id);
  }

  toggleWishlist(id) {
    if (!id || !VALID_WATCH_IDS.has(id)) return false;
    const existingIndex = this.state.wishlist.findIndex(w => w.id === id);

    if (existingIndex > -1) {
      const removed = this.state.wishlist[existingIndex];
      this.state.wishlist.splice(existingIndex, 1);
      this._persistState();
      this.notify('wishlist');

      this.showToast('Removed timepiece from Saved Vault', 'info', 4500, {
        label: 'Undo',
        onClick: () => {
          this.state.wishlist.splice(existingIndex, 0, removed);
          this._persistState();
          this.notify('wishlist');
        }
      });
      return false;
    } else {
      this.state.wishlist.push({ id, addedAt: new Date().toISOString() });
      this._persistState();
      this.notify('wishlist');
      this.showToast('Timepiece saved to Personal Vault', 'success', 3500);
      return true;
    }
  }

  removeFromWishlist(id) {
    if (!id) return;
    const existingIndex = this.state.wishlist.findIndex(w => w.id === id);
    if (existingIndex > -1) {
      const removed = this.state.wishlist[existingIndex];
      this.state.wishlist.splice(existingIndex, 1);
      this._persistState();
      this.notify('wishlist');

      this.showToast('Timepiece removed from vault', 'info', 4500, {
        label: 'Undo',
        onClick: () => {
          this.state.wishlist.splice(existingIndex, 0, removed);
          this._persistState();
          this.notify('wishlist');
        }
      });
    }
  }

  removeBatchFromWishlist(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return;
    const set = new Set(ids);
    const removedItems = this.state.wishlist.filter(w => set.has(w.id));
    this.state.wishlist = this.state.wishlist.filter(w => !set.has(w.id));
    this._persistState();
    this.notify('wishlist');

    this.showToast(`Removed ${removedItems.length} timepiece${removedItems.length > 1 ? 's' : ''} from vault`, 'info', 5000, {
      label: 'Undo',
      onClick: () => {
        this.state.wishlist.push(...removedItems);
        this._persistState();
        this.notify('wishlist');
      }
    });
  }

  clearWishlist() {
    const previous = [...this.state.wishlist];
    this.state.wishlist = [];
    this._persistState();
    this.notify('wishlist');
    return previous;
  }

  restoreWishlist(entries) {
    if (!Array.isArray(entries)) return;
    this.state.wishlist = this._sanitizeWishlist(entries);
    this._persistState();
    this.notify('wishlist');
    this.showToast('Restored previous saved vault timepieces', 'success');
  }

  // ==========================================
  // SYSTEM 2: Watch Comparison (Max 4 watches)
  // ==========================================
  getCompareList() {
    return [...this.state.compareList];
  }

  isInCompare(id) {
    if (!id) return false;
    return this.state.compareList.includes(id);
  }

  toggleCompare(id) {
    if (!id || !VALID_WATCH_IDS.has(id)) return { success: false, reason: 'invalid_id' };
    const index = this.state.compareList.indexOf(id);

    if (index > -1) {
      this.state.compareList.splice(index, 1);
      this._persistState();
      this.notify('compareList');
      this.showToast('Removed timepiece from comparison tray', 'info');
      return { success: true, added: false };
    } else {
      if (this.state.compareList.length >= COMPARE_MAX_LIMIT) {
        return {
          success: false,
          reason: 'limit_reached',
          max: COMPARE_MAX_LIMIT,
          currentList: [...this.state.compareList],
          attemptedId: id
        };
      }
      this.state.compareList.push(id);
      this._persistState();
      this.notify('compareList');
      this.showToast(`Added to comparison matrix (${this.state.compareList.length}/${COMPARE_MAX_LIMIT})`, 'success');
      return { success: true, added: true };
    }
  }

  addToCompare(id) {
    if (!id || !VALID_WATCH_IDS.has(id)) return { success: false, reason: 'invalid_id' };
    if (this.state.compareList.includes(id)) {
      return { success: true, added: false, message: 'already_present' };
    }
    if (this.state.compareList.length >= COMPARE_MAX_LIMIT) {
      return {
        success: false,
        reason: 'limit_reached',
        max: COMPARE_MAX_LIMIT,
        currentList: [...this.state.compareList],
        attemptedId: id
      };
    }
    this.state.compareList.push(id);
    this._persistState();
    this.notify('compareList');
    this.showToast(`Added to comparison matrix (${this.state.compareList.length}/${COMPARE_MAX_LIMIT})`, 'success');
    return { success: true, added: true };
  }

  replaceInCompare(oldId, newId) {
    if (!newId || !VALID_WATCH_IDS.has(newId)) return false;
    const index = this.state.compareList.indexOf(oldId);
    if (index > -1) {
      this.state.compareList[index] = newId;
    } else {
      this.state.compareList = [...this.state.compareList.slice(0, COMPARE_MAX_LIMIT - 1), newId];
    }
    this._persistState();
    this.notify('compareList');
    this.showToast('Updated comparison matrix with new timepiece', 'success');
    return true;
  }

  removeFromCompare(id) {
    if (!id) return;
    const initialLen = this.state.compareList.length;
    this.state.compareList = this.state.compareList.filter(item => item !== id);
    if (this.state.compareList.length !== initialLen) {
      this._persistState();
      this.notify('compareList');
      this.showToast('Removed timepiece from comparison tray', 'info');
    }
  }

  clearCompare() {
    this.state.compareList = [];
    this._persistState();
    this.notify('compareList');
    this.showToast('Comparison tray cleared', 'info');
  }

  setCompareList(ids) {
    if (!Array.isArray(ids)) return;
    this.state.compareList = this._sanitizeCompareList(ids);
    this._persistState();
    this.notify('compareList');
  }

  // ==========================================
  // SYSTEM 3: Recently Viewed Watches (Max 12)
  // ==========================================
  getRecentlyViewed() {
    return this.state.recentlyViewed.map(r => r.id);
  }

  getRecentlyViewedEntries() {
    return [...this.state.recentlyViewed];
  }

  trackRecentlyViewed(watchId) {
    if (!watchId || !VALID_WATCH_IDS.has(watchId)) return;

    // Prevent duplicate updates if user reloads the exact same watch in rapid succession
    const now = Date.now();
    if (this.lastTrackedView && this.lastTrackedView.id === watchId && (now - this.lastTrackedView.timestamp) < 3000) {
      return;
    }
    this.lastTrackedView = { id: watchId, timestamp: now };

    const viewedAt = new Date().toISOString();
    const filtered = this.state.recentlyViewed.filter(item => item.id !== watchId);
    this.state.recentlyViewed = [{ id: watchId, viewedAt }, ...filtered].slice(0, RECENTLY_VIEWED_MAX_LIMIT);

    this._persistState();
    this.notify('recentlyViewed');
  }

  removeFromRecentlyViewed(id) {
    if (!id) return;
    const initialLen = this.state.recentlyViewed.length;
    this.state.recentlyViewed = this.state.recentlyViewed.filter(item => item.id !== id);
    if (this.state.recentlyViewed.length !== initialLen) {
      this._persistState();
      this.notify('recentlyViewed');
    }
  }

  clearRecentlyViewed() {
    this.state.recentlyViewed = [];
    this._persistState();
    this.notify('recentlyViewed');
    this.showToast('Browsing history cleared', 'info');
  }

  // ==========================================
  // SYSTEM 4: Watch Finder State & Preferences
  // ==========================================
  getFinderState() {
    return { ...this.state.watchFinder };
  }

  getFinderPreferences() {
    // Backward compatibility with Phase 04 / early Phase 05
    return this.state.watchFinder.lastAnswers || {};
  }

  saveFinderState(answers) {
    this.state.watchFinder = {
      lastAnswers: { ...answers },
      lastCompletedAt: new Date().toISOString()
    };
    this._persistState();
    this.notify('watchFinder');
    this.showToast('Consultation preferences saved to collector profile', 'success');
  }

  saveFinderPreferences(answers) {
    this.saveFinderState(answers);
  }

  clearFinderState() {
    this.state.watchFinder = { lastAnswers: null, lastCompletedAt: null };
    this._persistState();
    this.notify('watchFinder');
    this.showToast('Consultation preferences cleared', 'info');
  }

  clearFinderPreferences() {
    this.clearFinderState();
  }

  // ==========================================
  // SYSTEM 5: Collector Preferences
  // ==========================================
  getPreferences() {
    return { ...this.state.preferences };
  }

  getCollectorDisplayPrefs() {
    return { ...this.state.preferences };
  }

  setPreference(key, value) {
    this.state.preferences = {
      ...this.state.preferences,
      [key]: value
    };
    this._persistState();
    this.notify('preferences');
  }

  setCollectorDisplayPref(key, value) {
    this.setPreference(key, value);
  }

  // ==========================================
  // UI Chrome State Controls
  // ==========================================
  setSearchOpen(isOpen) {
    this.state.searchOpen = Boolean(isOpen);
    this.notify('searchOpen');
  }

  setMobileMenuOpen(isOpen) {
    this.state.mobileMenuOpen = Boolean(isOpen);
    this.notify('mobileMenuOpen');
  }

  openModal(modalConfig) {
    this.state.activeModal = modalConfig;
    this.notify('activeModal');
  }

  closeModal() {
    this.state.activeModal = null;
    this.notify('activeModal');
  }

  setCurrentRoute(routeData) {
    this.state.currentRoute = routeData;
    this.notify('currentRoute');
  }

  // ==========================================
  // Accessible Floating Toast Notification Hub
  // ==========================================
  showToast(message, type = 'info', duration = 3500, action = null) {
    if (typeof document === 'undefined') return;

    let container = document.getElementById('toastRegion');
    if (!container) {
      container = document.querySelector('.toast-container');
    }
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastRegion';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.setAttribute('role', 'status');

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--accent-primary);flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:#FBBF24;flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--text-secondary);flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-message" style="flex:1;">${message}</div>
      ${action ? `<button type="button" class="btn btn-outline btn-xs toast-action-btn" style="padding:2px 8px;font-size:11px;margin-left:8px;">${action.label}</button>` : ''}
      <button type="button" class="toast-dismiss" aria-label="Dismiss notification" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;padding:2px 4px;font-size:16px;line-height:1;margin-left:8px;">&times;</button>
    `;

    if (action && action.onClick) {
      toast.querySelector('.toast-action-btn')?.addEventListener('click', () => {
        try {
          action.onClick();
        } catch (e) {
          console.error(e);
        }
        toast.remove();
      });
    }

    const dismissBtn = toast.querySelector('.toast-dismiss');
    dismissBtn?.addEventListener('click', () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 200);
    });

    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(100%)';
          toast.style.transition = 'all 200ms ease';
          setTimeout(() => toast.remove(), 200);
        }
      }, duration);
    }

    return toast;
  }
}

export const store = new StateStore();
