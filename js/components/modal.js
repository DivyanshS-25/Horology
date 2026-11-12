// HOROLOGY — Modal & Dialog Utility
import { trapFocus } from '../core/a11y.js';
import { icons } from '../utils/svgIcons.js';

let activeBackdrop = null;
let releaseFocusTrap = null;

export function openModal({ title = '', content = '', maxWidth = '720px' } = {}) {
  closeModal();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop active';
  backdrop.id = 'activeModalBackdrop';

  backdrop.innerHTML = `
    <div class="modal-dialog" style="max-width: ${maxWidth};" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-header">
        <h3 id="modalTitle" style="font-size: var(--text-lg);">${title}</h3>
        <button class="modal-close-btn" id="modalCloseAction" aria-label="Close Dialog">
          ${icons.close('', 18)}
        </button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden';

  activeBackdrop = backdrop;
  releaseFocusTrap = trapFocus(backdrop);

  function handleClose() {
    closeModal();
  }

  backdrop.querySelector('#modalCloseAction')?.addEventListener('click', handleClose);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) handleClose();
  });

  const onKey = (e) => {
    if (e.key === 'Escape') {
      handleClose();
      window.removeEventListener('keydown', onKey);
    }
  };
  window.addEventListener('keydown', onKey);
}

export function closeModal() {
  if (activeBackdrop) {
    if (releaseFocusTrap) releaseFocusTrap();
    activeBackdrop.remove();
    activeBackdrop = null;
    document.body.style.overflow = '';
  }
}
