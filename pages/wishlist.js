/**
 * HOROLOGY — Page Module: My Wishlist ("My Collection of Desires")
 * Route: #/wishlist
 * Direction C — Midnight Navy Edition
 * Full persistence, live valuation, multi-item batch selection, Undo toast, enquiry & sharing
 */

import { getWatchById } from '../js/data.js';
import { createBreadcrumb, createStatusBadge, ICONS, createRecentlyViewedShelf } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { formatPrice, escapeHTML } from '../js/utilities.js';
import { store } from '../js/state.js';
import { openEnquiryModal } from '../js/enquiry.js';

export const title = 'My Collection of Desires — HOROLOGY';

let selectedWatchIds = new Set();
let lastClearedEntries = [];

export async function render(ctx) {
  const wishlistEntries = store.getWishlistEntries();
  const savedWatches = wishlistEntries
    .map(entry => {
      const watch = getWatchById(entry.id);
      return watch ? { ...watch, addedAt: entry.addedAt } : null;
    })
    .filter(Boolean);

  // Sync selected set
  selectedWatchIds = new Set([...selectedWatchIds].filter(id => savedWatches.some(w => w.id === id)));

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'My Collection of Desires', href: '#/wishlist' }
  ];

  // Recently viewed watches for empty state or shelf
  const recentIds = store.getRecentlyViewed().filter(id => !store.isInWishlist(id));
  const recentWatches = recentIds.map(id => getWatchById(id)).filter(Boolean).slice(0, 4);

  // Calculate portfolio metrics
  const totalValuation = savedWatches.reduce((acc, w) => acc + (w.price || 0), 0);
  const avgValuation = savedWatches.length > 0 ? Math.round(totalValuation / savedWatches.length) : 0;
  const fullSetCount = savedWatches.filter(w => w.boxStatus === 'Original Box' && w.papersStatus === 'Original Papers').length;

  if (savedWatches.length === 0) {
    return `
      <div class="container section-spacer">
        ${createBreadcrumb(breadcrumbs)}

        <!-- Editorial Header Section -->
        <div class="vault-header-bar">
          <div>
            <span class="section-kicker">Personal Horological Repository</span>
            <h1 class="heading-1 font-serif" style="font-size: var(--text-4xl);">My Collection of Desires</h1>
            <p class="body-muted" style="margin-top: var(--space-1);">Timepieces worth remembering. (0 saved)</p>
          </div>
          <div class="flex items-center gap-3 flex-wrap">
            <a href="#/watch-finder" class="btn btn-ghost btn-sm">
              ${ICONS.search}
              <span>Find Timepieces</span>
            </a>
            <a href="#/collection" class="btn btn-secondary btn-sm">
              <span>Browse Collection</span>
              ${ICONS.arrowRight}
            </a>
          </div>
        </div>

        <!-- Portfolio Valuation Metrics Summary (Empty State ₹0) -->
        <div class="vault-summary-panel">
          <div class="vault-stat-item portfolio-stat">
            <span class="vault-stat-label">Saved Timepieces</span>
            <span class="vault-stat-value">0 References</span>
          </div>
          <div class="vault-stat-item portfolio-stat">
            <span class="vault-stat-label">Total Portfolio Valuation</span>
            <span class="vault-stat-value accent">₹0</span>
          </div>
          <div class="vault-stat-item portfolio-stat">
            <span class="vault-stat-label">Average Reference Value</span>
            <span class="vault-stat-value">₹0</span>
          </div>
          <div class="vault-stat-item portfolio-stat">
            <span class="vault-stat-label">Collector Full Sets</span>
            <span class="vault-stat-value">0 / 0 Sets</span>
          </div>
        </div>

        <div class="empty-state" style="margin-top: var(--space-8); margin-bottom: var(--space-12);">
          <div class="empty-state-icon">${ICONS.heart}</div>
          <h2 class="heading-2 mb-3">Your Saved Vault is Empty</h2>
          <p class="body-muted mb-6" style="max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Your personal horological repository is currently unpopulated. Select the heart icon on any reference across the collection or brand showrooms to save timepieces for comparative analysis or private viewing.
          </p>
          <div class="flex items-center justify-center gap-4 flex-wrap">
            <a href="#/collection" class="btn btn-primary">Discover Exceptional Timepieces</a>
            <a href="#/watch-finder" class="btn btn-outline">Launch Watch Finder</a>
          </div>
        </div>

        ${recentWatches.length > 0 ? `
          <div class="recently-viewed-section">
            <div class="recent-shelf-header">
              <div>
                <span class="section-kicker">Observatory History</span>
                <h3 class="heading-3">Recently Examined Timepieces</h3>
              </div>
              <a href="#/recently-viewed" class="btn btn-ghost btn-sm">
                <span>View Full History (${recentIds.length})</span>
                ${ICONS.arrowRight}
              </a>
            </div>
            <div class="recent-shelf-track">
              ${recentWatches.map(w => renderWishlistCard(w, false)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- Header Section -->
      <div class="vault-header-bar">
        <div>
          <span class="section-kicker">Personal Horological Repository</span>
          <h1 class="heading-1 font-serif" style="font-size: var(--text-4xl);">My Collection of Desires</h1>
          <p class="body-muted" style="margin-top: var(--space-1);">Timepieces worth remembering. (${savedWatches.length} saved)</p>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <a href="#/watch-finder" class="btn btn-ghost btn-sm">
            ${ICONS.search}
            <span>Find More Timepieces</span>
          </a>
          <a href="#/collection" class="btn btn-secondary btn-sm">
            <span>Continue Browsing</span>
            ${ICONS.arrowRight}
          </a>
        </div>
      </div>

      <!-- Portfolio Valuation Metrics Summary -->
      <div class="vault-summary-panel">
        <div class="vault-stat-item">
          <span class="vault-stat-label">Saved Timepieces</span>
          <span class="vault-stat-value">${savedWatches.length} References</span>
        </div>
        <div class="vault-stat-item">
          <span class="vault-stat-label">Total Portfolio Valuation</span>
          <span class="vault-stat-value accent">${formatPrice(totalValuation)}</span>
        </div>
        <div class="vault-stat-item">
          <span class="vault-stat-label">Average Reference Value</span>
          <span class="vault-stat-value">${formatPrice(avgValuation)}</span>
        </div>
        <div class="vault-stat-item">
          <span class="vault-stat-label">Collector Full Sets</span>
          <span class="vault-stat-value">${fullSetCount} / ${savedWatches.length} Sets</span>
        </div>
      </div>

      <!-- Batch Actions Toolbar -->
      <div class="vault-toolbar" role="toolbar" aria-label="Wishlist batch actions">
        <div class="vault-toolbar-left">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllCheckbox" class="vault-checkbox" aria-label="Select all timepieces in wishlist">
            <span class="font-mono text-xs font-semibold">Select All</span>
          </label>
          <span class="font-mono text-xs text-muted" id="selectionCountLabel">
            Selected (0/${savedWatches.length})
          </span>
          <button type="button" class="btn btn-outline btn-sm" id="compareSelectedBtn" disabled>
            ${ICONS.scale}
            <span id="compareSelectedText">Compare Selected</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="removeSelectedBtn" disabled style="color: #F87171;">
            ${ICONS.close}
            <span>Remove Selected</span>
          </button>
        </div>

        <div class="vault-toolbar-right">
          <button type="button" class="btn btn-outline btn-sm" id="clearVaultBtn" title="Clear all timepieces from wishlist">
            Clear All
          </button>
        </div>
      </div>

      <!-- Wishlist Product Grid -->
      <div class="watch-grid" id="wishlistGrid">
        ${savedWatches.map(watch => renderWishlistCard(watch, true)).join('')}
      </div>

      <!-- Embedded Recently Viewed Shelf -->
      ${recentWatches.length > 0 ? `
        <div class="recently-viewed-section">
          <div class="recent-shelf-header">
            <div>
              <span class="section-kicker">Observatory History</span>
              <h3 class="heading-3">Recently Examined Timepieces</h3>
            </div>
            <a href="#/recently-viewed" class="btn btn-ghost btn-sm">
              <span>View Full History (${recentIds.length})</span>
              ${ICONS.arrowRight}
            </a>
          </div>
          <div class="recent-shelf-track">
            ${recentWatches.map(w => renderWishlistCard(w, false)).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return '';
  }
}

function renderWishlistCard(watch, isWishlistItem = true) {
  const imgUrl = resolveAsset(watch.image || watch.imageUrl || null, { title: watch.brand, subtitle: watch.model });
  const priceDisplay = formatPrice(watch.price);
  const detailUrl = `#/watch/${watch.slug || watch.id}`;
  const inCompare = store.isInCompare(watch.id);
  const compActiveClass = inCompare ? 'active' : '';
  const dateFormatted = isWishlistItem && watch.addedAt ? formatDate(watch.addedAt) : '';

  return `
    <article class="card-watch wishlist-card-wrapper" data-watch-id="${watch.id}">
      ${isWishlistItem ? `
        <div class="card-select-box" title="Select for batch comparison or removal">
          <input type="checkbox" class="vault-item-checkbox vault-checkbox" data-id="${watch.id}" aria-label="Select ${escapeHTML(watch.model)}">
        </div>
      ` : ''}

      <div class="card-watch-media">
        <div class="card-watch-status">
          ${createStatusBadge(watch.inspectionStatus || 'Inspected')}
        </div>

        <div class="card-watch-actions">
          ${isWishlistItem ? `
            <button type="button" class="action-badge-btn" data-action="remove-wishlist" data-id="${watch.id}" aria-label="Remove ${escapeHTML(watch.model)} from Wishlist" title="Remove from Wishlist" style="color:#EF4444;">
              ${ICONS.close}
            </button>
          ` : `
            <button type="button" class="action-badge-btn active" data-action="toggle-wishlist" data-id="${watch.id}" aria-label="Save ${escapeHTML(watch.model)}" title="Save to Wishlist">
              ${ICONS.heartFilled}
            </button>
          `}
          <button type="button" class="action-badge-btn ${compActiveClass}" data-action="toggle-compare" data-id="${watch.id}" aria-label="${inCompare ? 'In Comparison' : 'Add to Comparison'}" title="${inCompare ? 'In Comparison' : 'Add to Comparison'}">
            ${ICONS.scale}
          </button>
        </div>

        <a href="${detailUrl}" class="card-watch-img-link" aria-label="View details of ${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}">
          <img src="${imgUrl}" alt="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}" class="card-watch-img" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
        </a>
      </div>

      <div class="card-watch-body">
        <div class="flex items-center justify-between mb-1">
          <span class="card-watch-brand">${escapeHTML(watch.brand)}</span>
          <span class="card-watch-condition-pill">${escapeHTML(watch.condition || 'Excellent')}</span>
        </div>

        <h3 class="card-watch-title">
          <a href="${detailUrl}">${escapeHTML(watch.model)}</a>
        </h3>

        <p class="card-watch-ref">Ref. ${escapeHTML(watch.reference || watch.referenceNumber || 'N/A')} &bull; ${watch.year || 2022}</p>

        <div class="card-watch-specs">
          <span>${watch.caseSizeMm || 40} mm</span>
          <span>&bull;</span>
          <span>${escapeHTML(watch.movementType || 'Automatic')}</span>
          <span>&bull;</span>
          <span>${escapeHTML(watch.documentationCategory || 'Box & Papers')}</span>
        </div>

        ${dateFormatted ? `
          <div class="font-mono text-xs text-muted mb-2" style="font-size: 0.72rem;">
            Added ${escapeHTML(dateFormatted)}
          </div>
        ` : ''}

        <div class="card-watch-footer mt-auto">
          <div>
            <div class="card-watch-price">${priceDisplay}</div>
            <span class="card-watch-demo-label">${escapeHTML(watch.availability || 'Available')}</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" class="btn btn-ghost btn-sm" data-action="wishlist-share" data-id="${watch.id}" title="Share reference link" aria-label="Share ${escapeHTML(watch.model)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
            <button type="button" class="btn btn-outline btn-sm" data-action="wishlist-enquire" data-id="${watch.id}">
              Enquire
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function mount(ctx) {
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');
  const selectionCountLabel = document.getElementById('selectionCountLabel');
  const compareSelectedBtn = document.getElementById('compareSelectedBtn');
  const compareSelectedText = document.getElementById('compareSelectedText');
  const removeSelectedBtn = document.getElementById('removeSelectedBtn');
  const itemCheckboxes = document.querySelectorAll('.vault-item-checkbox');

  function updateSelectionState() {
    const total = itemCheckboxes.length;
    const selectedCount = selectedWatchIds.size;

    if (selectionCountLabel) {
      selectionCountLabel.textContent = `Selected (${selectedCount}/${total})`;
    }

    if (selectAllCheckbox) {
      selectAllCheckbox.checked = selectedCount > 0 && selectedCount === total;
      selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < total;
    }

    if (compareSelectedBtn) {
      const canCompare = selectedCount >= 2 && selectedCount <= 4;
      compareSelectedBtn.disabled = !canCompare;
      if (selectedCount > 4) {
        compareSelectedText.textContent = `Max 4 to Compare (${selectedCount})`;
        compareSelectedBtn.title = 'Comparison is limited to a maximum of 4 timepieces';
      } else if (selectedCount >= 2) {
        compareSelectedText.textContent = `Compare Selected (${selectedCount})`;
        compareSelectedBtn.title = 'Open side-by-side comparison matrix with selected references';
      } else {
        compareSelectedText.textContent = 'Compare Selected';
        compareSelectedBtn.title = 'Select at least 2 timepieces to compare';
      }
    }

    if (removeSelectedBtn) {
      removeSelectedBtn.disabled = selectedCount === 0;
      removeSelectedBtn.textContent = selectedCount > 0 ? `Remove (${selectedCount})` : 'Remove Selected';
    }
  }

  // Item Checkbox listeners
  itemCheckboxes.forEach(cb => {
    const id = cb.getAttribute('data-id');
    cb.checked = selectedWatchIds.has(id);

    cb.addEventListener('change', () => {
      if (cb.checked) {
        selectedWatchIds.add(id);
      } else {
        selectedWatchIds.delete(id);
      }
      updateSelectionState();
    });
  });

  // Select All Checkbox listener
  selectAllCheckbox?.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    itemCheckboxes.forEach(cb => {
      const id = cb.getAttribute('data-id');
      cb.checked = isChecked;
      if (isChecked) {
        selectedWatchIds.add(id);
      } else {
        selectedWatchIds.delete(id);
      }
    });
    updateSelectionState();
  });

  // Compare Selected Action
  compareSelectedBtn?.addEventListener('click', () => {
    if (selectedWatchIds.size >= 2 && selectedWatchIds.size <= 4) {
      store.setCompareList([...selectedWatchIds]);
      window.location.hash = '#/compare';
    } else if (selectedWatchIds.size > 4) {
      store.showToast('Please select at most 4 timepieces for side-by-side comparison', 'warning');
    } else {
      store.showToast('Please select at least 2 timepieces to compare', 'info');
    }
  });

  // Remove Selected Batch Action
  removeSelectedBtn?.addEventListener('click', () => {
    if (selectedWatchIds.size === 0) return;
    store.removeBatchFromWishlist([...selectedWatchIds]);
    selectedWatchIds.clear();
    renderAndReplace();
  });

  // Clear Vault with Undo Toast
  document.getElementById('clearVaultBtn')?.addEventListener('click', () => {
    lastClearedEntries = store.clearWishlist();
    selectedWatchIds.clear();
    renderAndReplace();

    // Show undo toast notification
    store.showToast(
      `Wishlist cleared (${lastClearedEntries.length} timepieces).`,
      'info',
      8000,
      {
        label: 'Undo',
        onClick: () => {
          if (lastClearedEntries.length > 0) {
            store.restoreWishlist(lastClearedEntries);
            lastClearedEntries = [];
            renderAndReplace();
          }
        }
      }
    );
  });

  // Individual Card Remove Action with Undo Toast
  document.querySelectorAll('[data-action="remove-wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        selectedWatchIds.delete(id);
        const currentList = store.getState().wishlist;
        const removedItem = currentList.find(it => (typeof it === 'string' ? it : it.id) === id);
        store.removeFromWishlist(id);
        renderAndReplace();

        store.showToast(
          'Item removed from wishlist.',
          'info',
          5000,
          {
            label: 'Undo',
            onClick: () => {
              if (removedItem) {
                store.addToWishlist(typeof removedItem === 'string' ? removedItem : removedItem.id);
                renderAndReplace();
              }
            }
          }
        );
      }
    });
  });

  // Compare Toggle Action
  document.querySelectorAll('[data-action="toggle-compare"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        const res = store.toggleCompare(id);
        if (res.success) {
          btn.classList.toggle('active', res.added);
          btn.setAttribute('title', res.added ? 'In Comparison' : 'Add to Comparison');
          btn.setAttribute('aria-label', res.added ? 'In Comparison' : 'Add to Comparison');
        } else if (res.reason === 'limit_reached') {
          // Open 5th watch replacement modal
          openCompareLimitModal(res.attemptedId || id, res.currentList || store.getCompareList());
        }
      }
    });
  });

  // Wishlist Toggle (for recently viewed shelf cards)
  document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        store.toggleWishlist(id);
        renderAndReplace();
      }
    });
  });

  // Enquiry Modal Triggers
  document.querySelectorAll('[data-action="wishlist-enquire"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const watch = getWatchById(id);
      if (watch) {
        openEnquiryModal(watch);
      }
    });
  });

  // Share Action Triggers
  document.querySelectorAll('[data-action="wishlist-share"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const watch = getWatchById(id);
      if (!watch) return;

      const shareUrl = `${window.location.origin}${window.location.pathname}#/watch/${watch.slug || watch.id}`;
      const shareData = {
        title: `${watch.brand} ${watch.model} — HOROLOGY`,
        text: `Examine this certified ${watch.brand} ${watch.model} (Ref. ${watch.reference}) on HOROLOGY:`,
        url: shareUrl
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {}
      }

      try {
        await navigator.clipboard.writeText(shareUrl);
        store.showToast('Reference link copied to clipboard', 'success');
      } catch (err) {
        store.showToast(`Reference link: ${shareUrl}`, 'info');
      }
    });
  });

  async function renderAndReplace() {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = await render(ctx);
      mount(ctx);
    }
  }

  updateSelectionState();
}

/**
 * 5th Watch Comparison Limit Replacement Modal
 */
export function openCompareLimitModal(newWatchId, currentCompareIds = []) {
  const newWatch = getWatchById(newWatchId);
  const currentWatches = currentCompareIds.map(id => getWatchById(id)).filter(Boolean);
  const portal = document.getElementById('modalPortal') || document.body;

  const modalEl = document.createElement('div');
  modalEl.className = 'modal-backdrop';
  modalEl.style.cssText = 'position:fixed;inset:0;background:rgba(7,17,31,0.88);backdrop-filter:blur(8px);z-index:var(--z-modal);display:flex;align-items:center;justify-content:center;padding:var(--space-4);';
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.setAttribute('aria-labelledby', 'compareLimitTitle');

  modalEl.innerHTML = `
    <div class="p-6 bg-surface border" style="background:var(--bg-surface);border-color:var(--border-strong);border-radius:var(--radius-sm);max-width:540px;width:100%;box-shadow:var(--shadow-card-hover);">
      <div class="flex items-center justify-between mb-4">
        <div>
          <span class="font-mono text-xs text-accent uppercase tracking-wider">Comparison Limit Reached</span>
          <h3 class="heading-3 mt-1" id="compareLimitTitle">Replace a Timepiece in Comparison</h3>
        </div>
        <button type="button" class="btn btn-ghost btn-sm close-modal-btn" aria-label="Close dialog">&times;</button>
      </div>

      <p class="body-muted text-sm mb-6">
        The comparison matrix supports up to <strong>4 timepieces</strong> simultaneously. Select which reference you wish to replace with the <strong>${escapeHTML(newWatch ? `${newWatch.brand} ${newWatch.model}` : 'new timepiece')}</strong>:
      </p>

      <div class="flex flex-col gap-3 mb-6">
        ${currentWatches.map(w => {
          const img = resolveAsset(w.image || w.imageUrl, { title: w.brand, subtitle: w.model });
          return `
            <div class="p-3 bg-secondary border flex items-center justify-between gap-4" style="border-color:var(--border-subtle);border-radius:var(--radius-xs);">
              <div class="flex items-center gap-3">
                <img src="${img}" alt="${escapeHTML(w.model)}" style="width:40px;height:40px;object-fit:cover;background:var(--bg-primary);border-radius:var(--radius-xs);" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
                <div>
                  <div class="font-sans font-semibold text-sm text-primary">${escapeHTML(w.brand)} ${escapeHTML(w.model)}</div>
                  <div class="font-mono text-xs text-muted">Ref. ${escapeHTML(w.reference)} &bull; ${formatPrice(w.price)}</div>
                </div>
              </div>
              <button type="button" class="btn btn-outline btn-xs replace-target-btn" data-old-id="${w.id}">
                Replace
              </button>
            </div>
          `;
        }).join('')}
      </div>

      <div class="flex items-center justify-between pt-4 border-top" style="border-color:var(--border-subtle);">
        <a href="#/compare" class="btn btn-secondary btn-sm close-modal-btn">
          View Comparison Matrix
        </a>
        <button type="button" class="btn btn-ghost btn-sm close-modal-btn">Cancel</button>
      </div>
    </div>
  `;

  function closeModal() {
    modalEl.remove();
    window.removeEventListener('keydown', handleKey);
  }
  function handleKey(e) {
    if (e.key === 'Escape') closeModal();
  }

  modalEl.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', closeModal));
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeModal();
  });
  window.addEventListener('keydown', handleKey);

  modalEl.querySelectorAll('.replace-target-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const oldId = btn.getAttribute('data-old-id');
      if (oldId && newWatchId) {
        store.replaceInCompare(oldId, newWatchId);
        closeModal();
      }
    });
  });

  portal.appendChild(modalEl);
}
