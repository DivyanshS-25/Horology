/**
 * HOROLOGY — Utility Functions
 * Formatters, DOM Helpers, Focus Trapping & Accessibility Utilities
 */

/**
 * Format numerical currency to Indian Rupees (INR) with custom lakh/crore notation or international standard
 * @param {number} amount 
 * @param {string} currency 
 * @returns {string}
 */
export function formatPrice(amount, currency = 'INR') {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Price on Request';
  if (currency === 'INR') {
    return '₹' + amount.toLocaleString('en-IN');
  }
  return '$' + amount.toLocaleString('en-US');
}

/**
 * Escape HTML to prevent XSS in dynamic templates
 * @param {string} str 
 * @returns {string}
 */
export function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Debounce function execution
 * @param {Function} func 
 * @param {number} waitMs 
 * @returns {Function}
 */
export function debounce(func, waitMs = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, waitMs);
  };
}

/**
 * Trap focus within an element (dialogs, drawers, search overlay)
 * @param {HTMLElement} element 
 * @returns {Function} cleanup function
 */
export function trapFocus(element) {
  if (!element) return () => {};

  const focusableEls = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusableEls.length === 0) return () => {};

  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];

  firstFocusable.focus();

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Lock or unlock background page scroll when modal or drawer is open
 * @param {boolean} lock 
 */
export function lockScroll(lock) {
  if (lock) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '8px'; // avoid layout shift from scrollbar
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

/**
 * Format mechanical watch rate (+2 s/d, -1 s/d)
 * @param {number} rate 
 * @returns {string}
 */
export function formatDailyRate(rate) {
  if (rate === undefined || rate === null) return 'N/A';
  const sign = rate > 0 ? '+' : '';
  return `${sign}${rate} s/day`;
}

/**
 * Smoothly scroll to top of window or container
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Backward-compatible aliases for legacy imports
export const formatCurrency = formatPrice;
export const escapeHtml = escapeHTML;


