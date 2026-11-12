// HOROLOGY — Utility Formatters

/**
 * Format currency in Indian Rupees (INR) with Indian numbering format (e.g. ₹12,50,000)
 */
export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Format rate variance (e.g. +3 s/d, -1 s/d)
 */
export function formatRate(seconds) {
  if (seconds === undefined || seconds === null) return '—';
  const prefix = seconds > 0 ? '+' : '';
  return `${prefix}${seconds} s/day`;
}

/**
 * Format amplitude in degrees (e.g. 268°)
 */
export function formatAmplitude(deg) {
  if (deg === undefined || deg === null) return '—';
  return `${deg}°`;
}

/**
 * Format beat error (e.g. 0.1 ms)
 */
export function formatBeatError(ms) {
  if (ms === undefined || ms === null) return '—';
  return `${ms.toFixed(1)} ms`;
}

/**
 * Format date in high-end editorial format (e.g. 12 Oct 2026)
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

/**
 * Escape HTML to protect against XSS in string interpolation
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
