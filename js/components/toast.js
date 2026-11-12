// HOROLOGY — Toast Notification System
import { events } from '../core/events.js';
import { icons } from '../utils/svgIcons.js';

let toastContainer = null;

export function initToast() {
  if (toastContainer) return;
  toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  toastContainer.setAttribute('aria-live', 'assertive');
  document.body.appendChild(toastContainer);

  events.on('toast:show', ({ message, type = 'info', duration = 3500 }) => {
    showToast(message, type, duration);
  });
}

export function showToast(message, type = 'info', duration = 3500) {
  if (!toastContainer) initToast();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? icons.check('', 16) : icons.sparkles('', 16)}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
