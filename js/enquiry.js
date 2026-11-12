/**
 * HOROLOGY — Watch Enquiry Modal Controller (Phase 04)
 * Direction C — Midnight Navy Edition
 * Pure Vanilla ES Module
 */

import { escapeHtml, formatCurrency } from './utilities.js';
import { store } from './state.js';

export class EnquiryModalController {
  constructor() {
    this.modalPortal = document.getElementById('modalPortal');
    this.activeWatch = null;
    this.boundKeyHandler = this.handleKeydown.bind(this);
  }

  /**
   * Opens the enquiry modal pre-filled with the selected watch
   */
  open(watch) {
    this.activeWatch = watch;
    if (!this.modalPortal || !this.activeWatch) return;

    this.renderModal();
    this.modalPortal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    this.bindEvents();
    window.addEventListener('keydown', this.boundKeyHandler);

    // Trap focus to first interactive input
    const nameInput = this.modalPortal.querySelector('#enquiryCustomerName');
    nameInput?.focus();
  }

  /**
   * Closes the enquiry modal and restores focus
   */
  close() {
    if (!this.modalPortal) return;
    this.modalPortal.style.display = 'none';
    this.modalPortal.innerHTML = '';
    document.body.style.overflow = '';
    window.removeEventListener('keydown', this.boundKeyHandler);
  }

  /**
   * Renders the modal HTML inside the modal portal
   */
  renderModal() {
    const watch = this.activeWatch;
    const priceFormatted = formatCurrency(watch.price, watch.currency || 'INR');

    this.modalPortal.innerHTML = `
      <div class="modal-backdrop" id="enquiryBackdrop"></div>
      <div 
        class="inquiry-dialog modal-dialog" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="enquiryModalTitle"
        id="enquiryDialogContainer"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="font-mono text-2xs text-accent uppercase tracking-wider block">Acquisition Concierge</span>
            <h3 class="heading-4" id="enquiryModalTitle">Private Timepiece Inquiry</h3>
          </div>
          <button type="button" class="btn-icon" id="enquiryCloseBtn" aria-label="Close Inquiry Dialog (Escape)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Ethical Demonstration Disclosure Banner -->
        <div class="inquiry-honesty-banner mb-5">
          <div class="flex items-start gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <strong class="block mb-0.5">Demonstration Inquiry Mode:</strong>
              <span>
                HOROLOGY is a demonstration platform showcasing luxury horological architecture. Submitting this inquiry provides demonstration confirmation feedback; no commercial order, payment capture, or live backend transmission will occur.
              </span>
            </div>
          </div>
        </div>

        <!-- Target Watch Identity Strip -->
        <div class="p-4 bg-secondary border mb-5 font-mono text-xs" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span class="text-muted block">Selected Reference:</span>
              <strong class="text-primary block" style="font-size: var(--text-sm);">
                ${escapeHtml(watch.brand)} ${escapeHtml(watch.model)}
              </strong>
              <span class="text-muted">Ref. ${escapeHtml(watch.referenceNumber || watch.reference)} &bull; ${watch.year}</span>
            </div>
            <div class="text-right">
              <span class="text-accent font-bold" style="font-size: var(--text-base);">${priceFormatted}</span>
              <span class="text-2xs text-muted block">Insured Handover</span>
            </div>
          </div>
        </div>

        <!-- Acquisition Consultation Form -->
        <form id="horologyEnquiryForm" novalidate>
          <div class="inquiry-form-group">
            <label for="enquiryCustomerName">Client Full Name <span class="text-accent">*</span></label>
            <input 
              type="text" 
              id="enquiryCustomerName" 
              name="customerName" 
              required 
              placeholder="e.g. Lord / Lady / Dr. / First Last"
              autocomplete="name"
            >
            <span class="text-2xs text-danger mt-1 hidden" id="nameError">Full name is required.</span>
          </div>

          <div class="grid grid-cols-2 gap-3" style="display: grid; grid-template-columns: 1fr 1fr;">
            <div class="inquiry-form-group">
              <label for="enquiryEmail">Private Email <span class="text-accent">*</span></label>
              <input 
                type="email" 
                id="enquiryEmail" 
                name="email" 
                required 
                placeholder="client@sanctuary.ch"
                autocomplete="email"
              >
              <span class="text-2xs text-danger mt-1 hidden" id="emailError">Valid email required.</span>
            </div>

            <div class="inquiry-form-group">
              <label for="enquiryPhone">Telephone (Optional)</label>
              <input 
                type="tel" 
                id="enquiryPhone" 
                name="phone" 
                placeholder="+41 22 000 0000"
                autocomplete="tel"
              >
            </div>
          </div>

          <div class="inquiry-form-group">
            <label for="enquiryViewingSalon">Preferred Viewing Salon</label>
            <select id="enquiryViewingSalon" name="viewingSalon">
              <option value="geneva">Geneva Salon — Rue du Rhône, 1204 Genève</option>
              <option value="london">London Salon — New Bond Street, Mayfair</option>
              <option value="tokyo">Tokyo Salon — Ginza 6-Chome, Chuo-ku</option>
              <option value="newyork">New York Salon — Madison Avenue, Manhattan</option>
              <option value="virtual">Confidential High-Resolution Virtual Viewing</option>
            </select>
          </div>

          <div class="inquiry-form-group">
            <label for="enquiryMessage">Specific Horological Notes / Armored Delivery Requests</label>
            <textarea 
              id="enquiryMessage" 
              name="message" 
              rows="3" 
              placeholder="Inquire regarding wrist sizing, timing machine acoustic telemetry, or trade appraisal..."
            ></textarea>
          </div>

          <div class="mt-6 flex justify-end gap-3 items-center">
            <button type="button" class="btn btn-outline" id="enquiryCancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="enquirySubmitBtn">
              Submit Demonstration Request
            </button>
          </div>
        </form>
      </div>
    `;
  }

  /**
   * Binds modal form validation and actions
   */
  bindEvents() {
    const closeBtn = document.getElementById('enquiryCloseBtn');
    const cancelBtn = document.getElementById('enquiryCancelBtn');
    const backdrop = document.getElementById('enquiryBackdrop');
    const form = document.getElementById('horologyEnquiryForm');

    closeBtn?.addEventListener('click', () => this.close());
    cancelBtn?.addEventListener('click', () => this.close());
    backdrop?.addEventListener('click', () => this.close());

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('enquiryCustomerName');
      const emailInput = document.getElementById('enquiryEmail');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = 'var(--danger, #E06C75)';
        nameError?.classList.remove('hidden');
        isValid = false;
      } else {
        nameInput.style.borderColor = '';
        nameError?.classList.add('hidden');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.style.borderColor = 'var(--danger, #E06C75)';
        emailError?.classList.remove('hidden');
        isValid = false;
      } else {
        emailInput.style.borderColor = '';
        emailError?.classList.add('hidden');
      }

      if (!isValid) return;

      // Clean Demonstration Feedback
      this.close();
      store.showToast(
        `Demonstration Request Confirmed: Our salon concierge has logged your inquiry for ${this.activeWatch.brand} ${this.activeWatch.model}.`
      );
    });
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export const enquiryModal = new EnquiryModalController();

export function openEnquiryModal(watch) {
  enquiryModal.open(watch);
}


