# HOROLOGY — Collector State Architecture & Persistence Layer
**Module:** `js/state.js`  
**Storage Key:** `horology_collector_state_v1`  
**Subscribers:** Pub/Sub Reactive Pattern  
**Fallbacks:** In-Memory Safe Store + Cross-Tab Event Listener

---

## 1. Architectural Philosophy

HOROLOGY adheres to a zero-build, static ES module architecture deployed to GitHub Pages without server-side user authentication, sessions, or remote databases. To deliver a unified, collector-grade experience across all five Phase 05 tools, the application centralizes all mutable user data into a single reactive store (`js/state.js`).

---

## 2. Unified Schema Specification (`horology_collector_state_v1`)

```typescript
interface CollectorStateV1 {
  version: 1;
  lastUpdated: number; // Unix epoch millisecond timestamp

  // 1. My Wishlist (Saved references)
  wishlist: Array<{
    id: string; // Canonical demonstration watch ID (e.g., 'demo-rolex-126610ln')
    addedAt: number; // Timestamp of addition
  }>;

  // 2. Timepiece Comparison (Active comparison tray)
  compareList: string[]; // Bounded array of canonical watch IDs (max length: 4)

  // 3. Recently Viewed Watches (Observatory history)
  recentlyViewed: Array<{
    id: string; // Canonical demonstration watch ID
    viewedAt: number; // Timestamp of inspection
  }>; // Bounded array (max length: 12)

  // 4. Watch Finder State (Consultation profile)
  finderState: {
    answers: Record<string, any>; // Step 1-8 answer keys
    lastCompletedAt: number | null;
  };

  // 5. Collector Preferences (Display & unit options)
  preferences: {
    highlightDifferences: boolean; // Comparison matrix toggle state
    currency: 'INR';
    dimensionUnit: 'mm';
    waterResistanceUnit: 'm';
  };
}
```

---

## 3. Legacy Migration & Resilience

### 3.1. Backward Compatibility Migration
When initialized on a browser that previously used Phases 02, 03, or 04:
- The store checks for the existence of `horology_collector_state_v1`.
- If absent, it scans for legacy keys:
  - `horology_wishlist_v1`
  - `horology_compare_v1`
  - `horology_viewed_v1`
  - `horology_finder_prefs_v1`
  - `horology_collector_prefs_v1`
- It automatically parses, normalizes, and migrates existing arrays into the unified V1 schema before clearing the deprecated keys.

### 3.2. Data Validation & Pruning
- All watch IDs are validated against the authoritative set of 24 canonical demonstration watch IDs (`VALID_WATCH_IDS`).
- Corrupted strings, deprecated test IDs, or foreign objects are automatically pruned during state load to guarantee data integrity.

### 3.3. In-Memory Quota Fallback
- If `localStorage` access is blocked (e.g., strict Safari private browsing mode or quota exhaustion), the store gracefully switches to an in-memory session cache, ensuring zero unhandled runtime exceptions.

---

## 4. Multi-Tab Synchronization & Deduplication

### 4.1. Real-Time Storage Event Listening
```javascript
window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY_UNIFIED && event.newValue) {
    try {
      this.state = JSON.parse(event.newValue);
      this._notifyAllSubscribers();
    } catch (e) {
      console.warn('Cross-tab state synchronization parse error:', e);
    }
  }
});
```
Changes made in one browser tab (e.g., adding a watch to the Wishlist) instantly update header counters and view matrices across all other open tabs in real time.

### 4.2. Rapid View Deduplication
To prevent inflated view counts or jitter when refreshing an Individual Watch Detail page:
- `recordRecentlyViewed(watchId)` enforces a deduplication threshold (`VIEW_DEDUPE_MS = 3000`).
- Consecutive identical views within the threshold are skipped.

---

## 5. Accessible Floating Toast Hub & Undo Engine

Global toast notifications are mounted dynamically to `#toastRegion` (or `#horology-toast-hub`) with full ARIA live region support:
- `aria-live="polite"` and `aria-atomic="true"` ensure screen reader accessibility.
- Supports structured action buttons with direct callbacks:
  ```javascript
  store.showToast('Item removed from wishlist.', 'info', 5000, {
    label: 'Undo',
    onClick: () => {
      store.addToWishlist(removedId);
      renderAndReplace();
    }
  });
  ```
- Smooth slide-in animations with CSS transitions and manual dismiss (`×`) triggers.

