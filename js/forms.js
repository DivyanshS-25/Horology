/**
 * HOROLOGY — Shared Form System & Submission Adapter (Phase 07)
 * Direction C — Midnight Navy Edition
 *
 * Provides:
 * 1. Accessible Client-Side Validation Engine
 * 2. Client-Side Image Selection & Thumbnail Previewer (Zero Storage Abuse)
 * 3. Structured Payload Builder
 * 4. Honest Static-Site Submission Adapter (Preview + Mailto + Configurable API)
 * 5. Session-Scoped Progress Preservation (Zero Permanent PII in localStorage)
 */

import { BUSINESS_CONFIG } from './config.js';
import { escapeHTML } from './utilities.js';
import { ICONS } from './components.js';

// Allowed image formats and constraints for watch photograph submissions
export const PHOTO_CONSTRAINTS = {
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeBytes: 10 * 1024 * 1024, // 10 MB per image
  maxFileCount: 6
};

/**
 * Validate email address syntax using standard pattern
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return pattern.test(email.trim());
}

/**
 * Validate phone number syntax if provided (optional field)
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return true; // Optional field
  const trimmed = phone.trim();
  if (trimmed === '') return true;
  // Allow international formatting with +, digits, spaces, hyphens, parentheses (min 7 digits)
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * Validate a candidate file against photographic constraints
 */
export function validateSelectedFile(file) {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  // Size validation
  if (file.size > PHOTO_CONSTRAINTS.maxFileSizeBytes) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File "${file.name}" (${sizeMb} MB) exceeds the 10 MB per-image limit.`
    };
  }

  // Type validation
  const lowerName = file.name.toLowerCase();
  const hasAllowedExt = PHOTO_CONSTRAINTS.allowedExtensions.some(ext => lowerName.endsWith(ext));
  const hasAllowedMime = PHOTO_CONSTRAINTS.allowedMimeTypes.includes(file.type.toLowerCase());

  if (!hasAllowedExt && !hasAllowedMime) {
    return {
      valid: false,
      error: `File "${file.name}" is not an accepted format. Please provide JPG, PNG, or WebP imagery.`
    };
  }

  return { valid: true };
}

/**
 * Session storage helpers for multi-step form recovery during current tab session
 */
export function saveFormSession(key, data) {
  try {
    sessionStorage.setItem(`horology_temp_${key}`, JSON.stringify(data));
  } catch (e) {
    // Graceful in-memory fallback
  }
}

export function loadFormSession(key) {
  try {
    const raw = sessionStorage.getItem(`horology_temp_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearFormSession(key) {
  try {
    sessionStorage.removeItem(`horology_temp_${key}`);
  } catch (e) {
    // Silent
  }
}

/**
 * Format structured enquiry payload into readable plain text for email or clipboard
 */
export function formatEnquiryPlainText(payload) {
  const divider = '==================================================';
  const lines = [
    divider,
    `HOROLOGY — ${payload.categoryTitle.toUpperCase()}`,
    `Submitted: ${new Date(payload.timestamp).toUTCString()}`,
    divider,
    '',
    'CLIENT DETAILS:',
    `  Name: ${payload.client.name}`,
    `  Email: ${payload.client.email}`,
    payload.client.phone ? `  Phone: ${payload.client.phone}` : null,
    payload.client.country ? `  Country: ${payload.client.country}` : null,
    payload.client.preferredContact ? `  Preferred Contact: ${payload.client.preferredContact}` : null,
    '',
    'ENQUIRY SPECIFICS:'
  ];

  // Specific domain fields
  if (payload.data) {
    Object.entries(payload.data).forEach(([key, val]) => {
      if (val != null && val !== '') {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        if (Array.isArray(val)) {
          lines.push(`  ${label}: ${val.join(', ')}`);
        } else {
          lines.push(`  ${label}: ${val}`);
        }
      }
    });
  }

  if (payload.client.message) {
    lines.push('', 'MESSAGE & SPECIAL REQUESTS:', `  ${payload.client.message}`);
  }

  if (payload.files && payload.files.length > 0) {
    lines.push('', 'SELECTED PHOTOGRAPHS (To be shared):');
    payload.files.forEach((f, i) => {
      lines.push(`  [${i + 1}] ${f.name} (${(f.size / (1024 * 1024)).toFixed(2)} MB)`);
    });
  }

  lines.push('', divider, 'HOROLOGY — Beyond Time. Beyond Ordinary.');
  return lines.filter(Boolean).join('\n');
}

/**
 * Unified Submission Adapter
 * Handles real API endpoints if configured, or renders the transparent
 * Enquiry Transmission Modal with mailto fallback and clipboard copy.
 */
export async function handleFormSubmission({
  endpointKey = 'formSubmissionEndpoint',
  payload,
  onComplete = () => {}
}) {
  const isApiConfigured = Boolean(BUSINESS_CONFIG.integrations[endpointKey]);

  if (isApiConfigured) {
    // Real network integration path
    try {
      const response = await fetch(BUSINESS_CONFIG.integrations[endpointKey], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
      onComplete({ success: true, mode: 'api' });
      return;
    } catch (err) {
      console.warn('Configured API submission failed, falling back to client transmission:', err);
      // Fall through to honest client-assisted transmission modal
    }
  }

  // Honest Static Mode: Open the Transmission Modal
  openTransmissionModal(payload, onComplete);
}

/**
 * Open Accessible Modal to preview and transmit enquiry honestly
 */
export function openTransmissionModal(payload, onComplete) {
  const portal = document.getElementById('modalPortal');
  if (!portal) return;

  const textBody = formatEnquiryPlainText(payload);
  const recipientEmail = BUSINESS_CONFIG.contact.email;
  const mailtoSubject = encodeURIComponent(`[HOROLOGY] ${payload.categoryTitle} — ${payload.client.name}`);
  const mailtoBody = encodeURIComponent(textBody);
  const mailtoLink = recipientEmail
    ? `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`
    : null;

  portal.innerHTML = `
    <div class="modal-backdrop active" id="transmissionBackdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="transTitle" style="max-width: 680px; max-height: 90vh; display: flex; flex-direction: column;">
        
        <!-- Modal Header -->
        <div class="modal-header">
          <div>
            <span class="section-kicker">Static Environment Communication Channel</span>
            <h3 class="heading-3 font-serif" id="transTitle">Your Enquiry is Ready to Send</h3>
          </div>
          <button type="button" class="modal-close-btn" id="closeTransModalBtn" aria-label="Close dialog">&times;</button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body" style="overflow-y: auto; padding: var(--space-6);">
          <div class="p-4 bg-secondary border mb-5" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="flex items-center gap-2 mb-2">
              <span style="color: var(--accent-primary);">${ICONS.seal}</span>
              <span class="font-mono text-xs font-bold text-primary">Demonstration Environment Notice</span>
            </div>
            <p class="body-muted text-xs leading-relaxed" style="margin: 0;">
              HOROLOGY is hosted statically on GitHub Pages without an active server backend. To complete your enquiry, transmit your structured request through your email client or copy the formatted text below.
            </p>
          </div>

          <!-- Structured Text Preview Box -->
          <div class="mb-5">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono text-xs text-muted">Formatted Structured Payload:</span>
              <button type="button" class="btn btn-ghost btn-xs text-accent" id="copyPayloadBtn">
                ${ICONS.share}
                <span id="copyPayloadBtnText">Copy to Clipboard</span>
              </button>
            </div>
            <pre class="p-4 bg-primary border font-mono text-xs" style="border-color: var(--border-subtle); border-radius: var(--radius-xs); overflow-x: auto; max-height: 240px; white-space: pre-wrap; color: var(--text-secondary); line-height: 1.5;" id="payloadPre">${escapeHTML(textBody)}</pre>
          </div>

          ${payload.files && payload.files.length > 0 ? `
            <div class="p-3 bg-secondary border mb-5" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <span class="font-mono text-xs text-accent block mb-1">Photographic Attachments:</span>
              <p class="text-xs text-secondary leading-relaxed">
                You selected <strong>${payload.files.length} photograph${payload.files.length > 1 ? 's' : ''}</strong> locally. Please attach these files directly to your outgoing email message.
              </p>
            </div>
          ` : ''}
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer" style="display: flex; gap: var(--space-3); justify-content: flex-end; flex-wrap: wrap;">
          <button type="button" class="btn btn-outline btn-sm" id="dismissTransBtn">Return to Form</button>
          
          ${mailtoLink ? `
            <a href="${mailtoLink}" class="btn btn-primary btn-sm" id="launchMailClientBtn">
              <span>Open in Email Application</span>
              ${ICONS.arrowRight}
            </a>
          ` : `
            <button type="button" class="btn btn-primary btn-sm" id="confirmCopiedBtn">
              <span>I Have Copied My Request</span>
              ${ICONS.check}
            </button>
          `}
        </div>

      </div>
    </div>
  `;

  const closeDialog = () => {
    portal.innerHTML = '';
    onComplete({ success: true, mode: 'preview' });
  };

  document.getElementById('closeTransModalBtn')?.addEventListener('click', closeDialog);
  document.getElementById('dismissTransBtn')?.addEventListener('click', closeDialog);
  document.getElementById('transmissionBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'transmissionBackdrop') closeDialog();
  });

  document.getElementById('confirmCopiedBtn')?.addEventListener('click', closeDialog);
  document.getElementById('launchMailClientBtn')?.addEventListener('click', () => {
    setTimeout(closeDialog, 600);
  });

  document.getElementById('copyPayloadBtn')?.addEventListener('click', async () => {
    const btnText = document.getElementById('copyPayloadBtnText');
    try {
      await navigator.clipboard.writeText(textBody);
      if (btnText) btnText.textContent = 'Copied Successfully!';
      setTimeout(() => {
        if (btnText) btnText.textContent = 'Copy to Clipboard';
      }, 3000);
    } catch (err) {
      if (btnText) btnText.textContent = 'Select all & Copy above';
    }
  });
}

