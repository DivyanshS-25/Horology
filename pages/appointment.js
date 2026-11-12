/**
 * HOROLOGY — Appointment Request Experience Controller (Phase 07)
 * Route: #/appointment
 * Direction C — Midnight Navy Edition
 */

import { BUSINESS_CONFIG } from '../js/config.js';
import { createBreadcrumb, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { escapeHTML, formatPrice } from '../js/utilities.js';
import { WATCHES } from '../js/data.js';
import { isValidEmail, isValidPhone, handleFormSubmission } from '../js/forms.js';

export const title = 'Arrange an Appointment — HOROLOGY';

// Active in-memory appointment state
let activeAppointmentState = {
  name: '',
  email: '',
  phone: '',
  purpose: 'Watch Enquiry',
  channel: 'Video Consultation',
  date: '',
  timeWindow: 'Afternoon (12:00 – 16:00)',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  watchId: null,
  message: '',
  isReviewMode: false
};

export async function render(ctx) {
  // Check for pre-populated watch reference from watch detail page or query
  const queryWatchId = ctx.query?.watchId || ctx.query?.id || null;
  const queryRef = ctx.query?.ref || null;

  if (queryWatchId) {
    activeAppointmentState.watchId = queryWatchId;
  } else if (queryRef) {
    const matchedWatch = WATCHES.find(w => 
      (w.referenceNumber && w.referenceNumber.toLowerCase() === queryRef.toLowerCase()) ||
      (w.slug && w.slug.toLowerCase().includes(queryRef.toLowerCase()))
    );
    if (matchedWatch) {
      activeAppointmentState.watchId = matchedWatch.id;
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Appointments', href: '#/appointment' }
  ];

  const heroBg = resolveAsset('HZ-HERO-003');
  const selectedWatch = activeAppointmentState.watchId ? WATCHES.find(w => w.id === activeAppointmentState.watchId) : null;

  // Calculate minimum date (tomorrow) and maximum date (90 days out)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- A. Appointment Landing Hero -->
      <section class="mb-14">
        <div class="p-8 md:p-12 bg-surface border relative overflow-hidden" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); min-height: 320px; display: flex; align-items: center;">
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: url('${heroBg}') center/cover no-repeat; opacity: 0.16; pointer-events: none;"></div>
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: radial-gradient(circle at 25% 50%, rgba(7, 17, 31, 0.95) 0%, rgba(7, 17, 31, 0.7) 100%); pointer-events: none;"></div>

          <div class="relative z-10 max-w-narrow">
            <span class="section-kicker">CONCIERGE CONSULTATION</span>
            <h1 class="heading-1 font-serif mb-4" style="font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.15;">
              Time Well Spent.
            </h1>
            <p class="body-muted text-base leading-relaxed mb-6" style="max-width: 540px;">
              Arrange a conversation about a timepiece, explore a collection, or discuss your next step with HOROLOGY. We offer confidential virtual and in-person advisory sessions.
            </p>
            <div class="flex items-center gap-3 font-mono text-xs text-accent">
              <span>Tailored Review</span> &bull; <span>Individual Telemetry</span> &bull; <span>Discreet Protocol</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Form Container -->
      <div class="business-form-card" id="appointmentContainer">
        ${renderFormBody(selectedWatch, minDateStr, maxDateStr)}
      </div>

    </div>
  `;
}

function renderFormBody(selectedWatch, minDateStr, maxDateStr) {
  if (activeAppointmentState.isReviewMode) {
    return renderReviewScreen(selectedWatch);
  }

  return `
    <div>
      <div class="mb-6">
        <span class="section-kicker">Schedule a Consultation Window</span>
        <h2 class="heading-2 font-serif mb-1">Request an Appointment</h2>
        <p class="body-muted text-xs">
          Select your preferred date, time window, and discussion purpose.
        </p>
      </div>

      <!-- Pre-Populated Watch Card Banner (If Arriving from Watch Detail) -->
      ${selectedWatch ? `
        <div class="p-4 bg-secondary border mb-6 flex items-center justify-between gap-4" id="prepopulatedWatchBanner" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
          <div class="flex items-center gap-4">
            <div style="width: 54px; height: 54px; border-radius: 4px; overflow: hidden; background: var(--bg-surface); flex-shrink: 0; border: 1px solid var(--border-subtle);">
              <img src="${resolveAsset(selectedWatch.image, { title: selectedWatch.brand, subtitle: selectedWatch.model })}" alt="${escapeHTML(selectedWatch.model)}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <span class="font-mono text-xs text-accent block uppercase">Referenced Timepiece</span>
              <h4 class="font-serif text-base text-primary" style="margin: 0;">${escapeHTML(selectedWatch.brand)} ${escapeHTML(selectedWatch.model)}</h4>
              <span class="font-mono text-xs text-muted">Ref. ${escapeHTML(selectedWatch.referenceNumber || selectedWatch.reference || '')} &bull; ${formatPrice(selectedWatch.price)}</span>
            </div>
          </div>
          <button type="button" class="btn btn-ghost btn-xs text-muted" id="removePrepopulatedWatchBtn" title="Remove reference from request">
            Remove &times;
          </button>
        </div>
      ` : ''}

      <form id="appointmentRequestForm" onsubmit="event.preventDefault();">
        <!-- Client Identity -->
        <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div class="form-group">
            <label class="form-label">Full Name <span class="field-required-star">*</span></label>
            <input type="text" class="form-input" id="apptName" value="${escapeHTML(activeAppointmentState.name)}" placeholder="Lord / Dr. / First Last" required>
          </div>

          <div class="form-group">
            <label class="form-label">Email Address <span class="field-required-star">*</span></label>
            <input type="email" class="form-input" id="apptEmail" value="${escapeHTML(activeAppointmentState.email)}" placeholder="collector@domain.com" required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div class="form-group">
            <label class="form-label">Phone Number (Optional)</label>
            <input type="tel" class="form-input font-mono" id="apptPhone" value="${escapeHTML(activeAppointmentState.phone)}" placeholder="+1 (555) 000-0000">
          </div>

          <div class="form-group">
            <label class="form-label">Appointment Purpose <span class="field-required-star">*</span></label>
            <select class="form-select" id="apptPurpose" required>
              <option value="Watch Enquiry" ${activeAppointmentState.purpose === 'Watch Enquiry' ? 'selected' : ''}>Watch Enquiry &amp; Private Viewing</option>
              <option value="Collection Discussion" ${activeAppointmentState.purpose === 'Collection Discussion' ? 'selected' : ''}>Collection Advisory &amp; Acquisition Strategy</option>
              <option value="Sell / Consign Discussion" ${activeAppointmentState.purpose === 'Sell / Consign Discussion' ? 'selected' : ''}>Sell or Consign Consultation</option>
              <option value="General Consultation" ${activeAppointmentState.purpose === 'General Consultation' ? 'selected' : ''}>General Horological Consultation</option>
            </select>
          </div>
        </div>

        <!-- Consultation Format / Channel -->
        <div class="form-group mb-4">
          <label class="form-label">Preferred Consultation Format</label>
          <div class="grid grid-cols-3 gap-3" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
            <button type="button" class="form-option-card ${activeAppointmentState.channel === 'Video Consultation' ? 'selected' : ''}" data-channel-id="Video Consultation">
              <div class="option-title">
                <span>Video Consultation</span>
                <span class="option-radio-dot"></span>
              </div>
              <div class="option-desc">High-resolution virtual macro camera examination.</div>
            </button>

            <button type="button" class="form-option-card ${activeAppointmentState.channel === 'Telephone' ? 'selected' : ''}" data-channel-id="Telephone">
              <div class="option-title">
                <span>Telephone</span>
                <span class="option-radio-dot"></span>
              </div>
              <div class="option-desc">Direct conversation with an advisory specialist.</div>
            </button>

            <button type="button" class="form-option-card ${activeAppointmentState.channel === 'In-Person Consultation' ? 'selected' : ''}" data-channel-id="In-Person Consultation">
              <div class="option-title">
                <span>In-Person Viewing</span>
                <span class="option-radio-dot"></span>
              </div>
              <div class="option-desc">Subject to private salon availability &amp; watch coordinates.</div>
            </button>
          </div>
        </div>

        <!-- Date, Time Window & Timezone Selection -->
        <div class="grid grid-cols-3 gap-4 mb-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
          <div class="form-group">
            <label class="form-label">Preferred Date <span class="field-required-star">*</span></label>
            <input type="date" class="form-input font-mono" id="apptDate" value="${escapeHTML(activeAppointmentState.date)}" min="${minDateStr}" max="${maxDateStr}" required>
            <span class="form-helper-text">Earliest available: Tomorrow</span>
          </div>

          <div class="form-group">
            <label class="form-label">Preferred Window <span class="field-required-star">*</span></label>
            <select class="form-select" id="apptTimeWindow" required>
              <option value="Morning (09:00 – 12:00)" ${activeAppointmentState.timeWindow.includes('Morning') ? 'selected' : ''}>Morning (09:00 – 12:00)</option>
              <option value="Afternoon (12:00 – 16:00)" ${activeAppointmentState.timeWindow.includes('Afternoon') ? 'selected' : ''}>Afternoon (12:00 – 16:00)</option>
              <option value="Evening (16:00 – 19:00)" ${activeAppointmentState.timeWindow.includes('Evening') ? 'selected' : ''}>Evening (16:00 – 19:00)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Your Time Zone</label>
            <input type="text" class="form-input font-mono" id="apptTimezone" value="${escapeHTML(activeAppointmentState.timezone)}" placeholder="e.g. Europe/London">
          </div>
        </div>

        <!-- Special Requests / Notes -->
        <div class="form-group mb-6">
          <label class="form-label">Special Requests or Context (Optional)</label>
          <textarea class="form-textarea" id="apptMessage" rows="3" placeholder="Provide any specific references you wish to examine or scheduling preferences...">${escapeHTML(activeAppointmentState.message)}</textarea>
        </div>

        <!-- Transparency Disclaimer -->
        <div class="p-4 bg-secondary border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
          <p class="body-muted text-xs leading-relaxed" style="margin: 0;">
            * Submitting this request expresses your scheduling preference. As viewing appointments depend on reference logistics and specialist availability, our private client director will contact you to confirm the exact schedule.
          </p>
        </div>

        <button type="submit" class="btn btn-primary btn-md w-full" id="apptContinueBtn">
          <span>Review Appointment Request</span>
          ${ICONS.arrowRight}
        </button>
      </form>
    </div>
  `;
}

function renderReviewScreen(selectedWatch) {
  return `
    <div>
      <div class="mb-6">
        <span class="section-kicker">Final Review Step</span>
        <h2 class="heading-2 font-serif mb-1">Confirm Your Appointment Request</h2>
        <p class="body-muted text-xs">
          Verify your details before preparing the transmission.
        </p>
      </div>

      <div class="review-summary-box mb-6">
        <div class="review-row-item">
          <div>
            <div class="review-row-label">Client Contact</div>
            <div class="review-row-val">${escapeHTML(activeAppointmentState.name)} &bull; ${escapeHTML(activeAppointmentState.email)}</div>
            ${activeAppointmentState.phone ? `<div class="text-xs text-muted font-mono mt-1">Phone: ${escapeHTML(activeAppointmentState.phone)}</div>` : ''}
          </div>
          <button type="button" class="review-row-edit-btn" id="editApptBtn">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">Purpose &amp; Format</div>
            <div class="review-row-val">${escapeHTML(activeAppointmentState.purpose)} &bull; ${escapeHTML(activeAppointmentState.channel)}</div>
          </div>
          <button type="button" class="review-row-edit-btn" id="editApptBtn2">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">Requested Schedule</div>
            <div class="review-row-val font-mono">${escapeHTML(activeAppointmentState.date)} &bull; ${escapeHTML(activeAppointmentState.timeWindow)}</div>
            <div class="text-xs text-muted font-mono mt-1">Timezone: ${escapeHTML(activeAppointmentState.timezone)}</div>
          </div>
          <button type="button" class="review-row-edit-btn" id="editApptBtn3">Edit</button>
        </div>

        ${selectedWatch ? `
          <div class="review-row-item">
            <div>
              <div class="review-row-label">Referenced Timepiece</div>
              <div class="review-row-val">${escapeHTML(selectedWatch.brand)} ${escapeHTML(selectedWatch.model)} (Ref. ${escapeHTML(selectedWatch.referenceNumber || selectedWatch.reference || '')})</div>
            </div>
            <button type="button" class="review-row-edit-btn" id="editApptBtn4">Edit</button>
          </div>
        ` : ''}

        ${activeAppointmentState.message ? `
          <div class="review-row-item">
            <div>
              <div class="review-row-label">Notes &amp; Context</div>
              <div class="text-xs text-secondary mt-1">"${escapeHTML(activeAppointmentState.message)}"</div>
            </div>
          </div>
        ` : ''}
      </div>

      <div class="p-4 bg-secondary border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
        <div class="flex items-center gap-2 mb-1">
          <span style="color: var(--accent-primary);">${ICONS.seal}</span>
          <span class="font-mono text-xs font-bold text-primary">Schedule Confirmation Protocol</span>
        </div>
        <p class="body-muted text-xs leading-relaxed" style="margin: 0;">
          This request registers your preferred date and window. Our team will verify specialist availability and reply with calendar coordinates.
        </p>
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="returnToApptEditBtn">&larr; Return to Form</button>
        <button type="button" class="btn btn-primary btn-md" id="transmitApptBtn">
          <span>Prepare Appointment Request</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

export async function init() {
  bindAppointmentHandlers();
}

function bindAppointmentHandlers() {
  // Format / Channel card selection
  document.querySelectorAll('[data-channel-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-channel-id]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      activeAppointmentState.channel = btn.getAttribute('data-channel-id');
    });
  });

  // Remove pre-populated watch
  document.getElementById('removePrepopulatedWatchBtn')?.addEventListener('click', () => {
    activeAppointmentState.watchId = null;
    const banner = document.getElementById('prepopulatedWatchBanner');
    if (banner) banner.remove();
  });

  // Submit Initial Form to reach Review Mode
  const form = document.getElementById('appointmentRequestForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('apptName');
    const emailEl = document.getElementById('apptEmail');
    const phoneEl = document.getElementById('apptPhone');
    const purposeEl = document.getElementById('apptPurpose');
    const dateEl = document.getElementById('apptDate');
    const windowEl = document.getElementById('apptTimeWindow');
    const tzEl = document.getElementById('apptTimezone');
    const msgEl = document.getElementById('apptMessage');

    const name = nameEl?.value.trim() || '';
    const email = emailEl?.value.trim() || '';
    const phone = phoneEl?.value.trim() || '';
    const purpose = purposeEl?.value || 'Watch Enquiry';
    const date = dateEl?.value || '';
    const timeWindow = windowEl?.value || 'Afternoon';
    const timezone = tzEl?.value.trim() || 'UTC';
    const message = msgEl?.value.trim() || '';

    // Field Validations
    let hasError = false;

    if (!name) {
      showApptError(nameEl, 'Please provide your full name.');
      hasError = true;
    }

    if (!email || !isValidEmail(email)) {
      showApptError(emailEl, 'Please enter a valid email address.');
      hasError = true;
    }

    if (phone && !isValidPhone(phone)) {
      showApptError(phoneEl, 'Please enter a valid telephone number.');
      hasError = true;
    }

    if (!date) {
      showApptError(dateEl, 'Please select a preferred appointment date.');
      hasError = true;
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected <= today) {
        showApptError(dateEl, 'Appointment date must be in the future (earliest: tomorrow).');
        hasError = true;
      }
    }

    if (hasError) return;

    activeAppointmentState.name = name;
    activeAppointmentState.email = email;
    activeAppointmentState.phone = phone;
    activeAppointmentState.purpose = purpose;
    activeAppointmentState.date = date;
    activeAppointmentState.timeWindow = timeWindow;
    activeAppointmentState.timezone = timezone;
    activeAppointmentState.message = message;
    activeAppointmentState.isReviewMode = true;

    refreshAppointmentView();
  });

  // Edit triggers in Review Mode
  const editAction = () => {
    activeAppointmentState.isReviewMode = false;
    refreshAppointmentView();
  };

  document.getElementById('editApptBtn')?.addEventListener('click', editAction);
  document.getElementById('editApptBtn2')?.addEventListener('click', editAction);
  document.getElementById('editApptBtn3')?.addEventListener('click', editAction);
  document.getElementById('editApptBtn4')?.addEventListener('click', editAction);
  document.getElementById('returnToApptEditBtn')?.addEventListener('click', editAction);

  // Transmit Appointment Request Button
  document.getElementById('transmitApptBtn')?.addEventListener('click', () => {
    const selectedWatch = activeAppointmentState.watchId ? WATCHES.find(w => w.id === activeAppointmentState.watchId) : null;

    const payload = {
      category: 'appointment',
      categoryTitle: `Appointment Request: ${activeAppointmentState.purpose}`,
      timestamp: new Date().toISOString(),
      client: {
        name: activeAppointmentState.name,
        email: activeAppointmentState.email,
        phone: activeAppointmentState.phone || null,
        preferredContact: activeAppointmentState.channel,
        message: activeAppointmentState.message || null
      },
      data: {
        appointmentPurpose: activeAppointmentState.purpose,
        consultationFormat: activeAppointmentState.channel,
        preferredDate: activeAppointmentState.date,
        preferredTimeWindow: activeAppointmentState.timeWindow,
        clientTimezone: activeAppointmentState.timezone,
        referencedTimepiece: selectedWatch ? `${selectedWatch.brand} ${selectedWatch.model} (Ref. ${selectedWatch.referenceNumber || selectedWatch.reference})` : 'General Exploration'
      }
    };

    handleFormSubmission({
      endpointKey: 'appointmentEndpoint',
      payload,
      onComplete: () => {
        // Reset state after preview
        activeAppointmentState.isReviewMode = false;
        activeAppointmentState.date = '';
        activeAppointmentState.message = '';
        refreshAppointmentView();
      }
    });
  });
}

function showApptError(inputEl, msg) {
  if (!inputEl) return;
  inputEl.classList.add('has-error');
  inputEl.focus();

  let err = inputEl.parentNode.querySelector('.field-error-msg');
  if (!err) {
    err = document.createElement('div');
    err.className = 'field-error-msg';
    inputEl.parentNode.appendChild(err);
  }
  err.textContent = msg;
  err.style.display = 'flex';

  inputEl.addEventListener('input', () => {
    inputEl.classList.remove('has-error');
    err.style.display = 'none';
  }, { once: true });
}

function refreshAppointmentView() {
  const container = document.getElementById('appointmentContainer');
  if (container) {
    const selectedWatch = activeAppointmentState.watchId ? WATCHES.find(w => w.id === activeAppointmentState.watchId) : null;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDateStr = tomorrow.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    container.innerHTML = renderFormBody(selectedWatch, minDateStr, maxDateStr);
    bindAppointmentHandlers();
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

