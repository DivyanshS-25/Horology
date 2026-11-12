/**
 * HOROLOGY — Contact Experience Controller (Phase 07)
 * Route: #/contact
 * Direction C — Midnight Navy Edition
 */

import { BUSINESS_CONFIG, hasContactValue, getContactValue } from '../js/config.js';
import { createBreadcrumb, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { escapeHTML } from '../js/utilities.js';
import { isValidEmail, handleFormSubmission } from '../js/forms.js';

export const title = 'Contact HOROLOGY — Private Client Consultation';

export async function render(ctx) {
  const categoryParam = ctx.query?.category || 'general';
  const subjectParam = ctx.query?.subject || '';

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Contact', href: '#/contact' }
  ];

  const heroBg = resolveAsset('HZ-HERO-002');

  const hasEmail = hasContactValue('email');
  const hasPhone = hasContactValue('phone');
  const hasWhatsApp = hasContactValue('whatsapp');
  const hasAddress = hasContactValue('address');
  const hasHours = hasContactValue('hours');
  const hasAnyContactMethod = hasEmail || hasPhone || hasWhatsApp || hasAddress;

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- A. Contact Hero -->
      <section class="mb-14">
        <div class="p-8 md:p-12 bg-surface border relative overflow-hidden" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); min-height: 340px; display: flex; align-items: center;">
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: url('${heroBg}') center/cover no-repeat; opacity: 0.15; pointer-events: none;"></div>
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: radial-gradient(circle at 25% 50%, rgba(7, 17, 31, 0.95) 0%, rgba(7, 17, 31, 0.7) 100%); pointer-events: none;"></div>

          <div class="relative z-10 max-w-narrow">
            <span class="section-kicker">COMMUNICATION &amp; ADVISORY</span>
            <h1 class="heading-1 font-serif mb-4" style="font-size: clamp(2rem, 3.8vw, 3rem); line-height: 1.15;">
              Every Great Conversation Begins Somewhere.
            </h1>
            <p class="body-muted text-base leading-relaxed mb-6" style="max-width: 540px;">
              Have a question about a timepiece, an enquiry about your collection, or simply wish to speak with us? Our advisory team is at your disposal.
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              <a href="#contactFormSection" class="btn btn-primary btn-sm" id="jumpToContactFormBtn">
                <span>Send an Enquiry</span>
                ${ICONS.arrowRight}
              </a>
              <a href="#/appointment" class="btn btn-outline btn-sm">
                <span>Request Appointment</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Layout: Form (Left) & Configurable Info (Right) -->
      <div class="grid grid-cols-12 gap-8 items-start mb-16" style="display: grid; grid-template-columns: repeat(12, 1fr);">
        
        <!-- C. Contact Form (8 cols on desktop) -->
        <div class="col-span-12 lg:col-span-7 p-6 md:p-8 bg-surface border" id="contactFormSection" style="grid-column: span 7; border-color: var(--border-subtle); border-radius: var(--radius-sm); box-shadow: var(--shadow-card);">
          <div class="mb-6">
            <span class="section-kicker">Direct Channel</span>
            <h2 class="heading-2 font-serif mb-1">Send a Message</h2>
            <p class="body-muted text-xs">
              Complete the form below. We will respond through your preferred channel.
            </p>
          </div>

          <form id="contactForm" onsubmit="event.preventDefault();">
            <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
              <div class="form-group">
                <label class="form-label">Full Name <span class="field-required-star">*</span></label>
                <input type="text" class="form-input" id="contactName" placeholder="Lord / Dr. / First Last" required>
              </div>

              <div class="form-group">
                <label class="form-label">Email Address <span class="field-required-star">*</span></label>
                <input type="email" class="form-input" id="contactEmail" placeholder="collector@domain.com" required>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
              <div class="form-group">
                <label class="form-label">Enquiry Category <span class="field-required-star">*</span></label>
                <select class="form-select" id="contactCategory" required>
                  <option value="Product Enquiry" ${categoryParam === 'product' ? 'selected' : ''}>Product Enquiry</option>
                  <option value="Watch Information" ${categoryParam === 'info' ? 'selected' : ''}>Watch Information &amp; Specs</option>
                  <option value="Sell / Consign" ${categoryParam === 'consign' ? 'selected' : ''}>Sell / Consign a Watch</option>
                  <option value="Appointment" ${categoryParam === 'appointment' ? 'selected' : ''}>Appointment Consultation</option>
                  <option value="General Enquiry" ${categoryParam === 'general' ? 'selected' : ''}>General Enquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Subject <span class="field-required-star">*</span></label>
                <input type="text" class="form-input" id="contactSubject" value="${escapeHTML(subjectParam)}" placeholder="e.g. Reference inquiry or valuation request" required>
              </div>
            </div>

            <div class="form-group mb-6">
              <label class="form-label">Your Message <span class="field-required-star">*</span></label>
              <textarea class="form-textarea" id="contactMessage" rows="5" placeholder="Share the details of your enquiry..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-md w-full" id="submitContactBtn">
              <span>Prepare &amp; Transmit Message</span>
              ${ICONS.arrowRight}
            </button>
          </form>
        </div>

        <!-- B. Configurable Business Contact Information (5 cols on desktop) -->
        <div class="col-span-12 lg:col-span-5 flex flex-col gap-6" style="grid-column: span 5;">
          
          <div class="p-6 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
            <div class="overline text-accent mb-2">Our Operating Philosophy</div>
            <h3 class="font-serif text-xl text-primary mb-2">Dedicated Advisory</h3>
            <p class="body-muted text-xs leading-relaxed mb-4">
              We respect your unhurried appreciation of timepieces. Every inquiry receives personalized, thoughtful review from specialists familiar with fine mechanical chronometry.
            </p>
            <div class="font-mono text-xs text-muted flex items-center gap-2">
              <span style="color: var(--accent-primary);">&bull;</span>
              <span>Geneva, Bienne &amp; Shizukuishi Traditions</span>
            </div>
          </div>

          <!-- Dynamic Contact Channel Cards (Only rendered if verified values exist) -->
          ${hasAnyContactMethod ? `
            <div class="p-6 bg-surface border flex flex-col gap-4" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
              <h4 class="font-serif text-lg text-primary mb-1">Direct Channels</h4>
              
              ${hasEmail ? `
                <div class="flex items-start gap-3">
                  <span style="color: var(--accent-primary); margin-top: 2px;">${ICONS.mail}</span>
                  <div>
                    <span class="font-mono text-xs text-muted block uppercase">Email</span>
                    <a href="mailto:${escapeHTML(getContactValue('email'))}" class="font-sans text-sm text-primary hover:underline">${escapeHTML(getContactValue('email'))}</a>
                  </div>
                </div>
              ` : ''}

              ${hasPhone ? `
                <div class="flex items-start gap-3">
                  <span style="color: var(--accent-primary); margin-top: 2px;">${ICONS.phone}</span>
                  <div>
                    <span class="font-mono text-xs text-muted block uppercase">Telephone</span>
                    <a href="tel:${escapeHTML(getContactValue('phone'))}" class="font-mono text-sm text-primary hover:underline">${escapeHTML(getContactValue('phone'))}</a>
                  </div>
                </div>
              ` : ''}

              ${hasWhatsApp ? `
                <div class="flex items-start gap-3">
                  <span style="color: #34D399; margin-top: 2px;">${ICONS.message || ICONS.mail}</span>
                  <div>
                    <span class="font-mono text-xs text-muted block uppercase">WhatsApp Advisory</span>
                    <span class="font-mono text-sm text-primary">${escapeHTML(getContactValue('whatsapp'))}</span>
                  </div>
                </div>
              ` : ''}

              ${hasAddress ? `
                <div class="flex items-start gap-3">
                  <span style="color: var(--accent-primary); margin-top: 2px;">${ICONS.mapPin}</span>
                  <div>
                    <span class="font-mono text-xs text-muted block uppercase">Physical Salon</span>
                    <span class="font-sans text-xs text-secondary leading-relaxed">${escapeHTML(getContactValue('address'))}</span>
                  </div>
                </div>
              ` : ''}

              ${hasHours ? `
                <div class="flex items-start gap-3 pt-3 border-top" style="border-color: var(--border-subtle);">
                  <span style="color: var(--accent-primary); margin-top: 2px;">${ICONS.clock}</span>
                  <div>
                    <span class="font-mono text-xs text-muted block uppercase">Advisory Hours</span>
                    <span class="font-mono text-xs text-secondary">${escapeHTML(getContactValue('hours'))}</span>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <!-- Dignified Notice when direct endpoints are unconfigured in static build -->
            <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
              <div class="flex items-center gap-2 mb-2">
                <span style="color: var(--accent-primary);">${ICONS.seal}</span>
                <span class="font-mono text-xs font-bold text-primary">Private Concierge Portal</span>
              </div>
              <p class="body-muted text-xs leading-relaxed mb-3">
                Direct phone and physical salon access is coordinated through private appointment requests. Please submit your inquiry through the form or schedule a conversation below.
              </p>
              <a href="#/appointment" class="btn btn-outline btn-xs w-full text-center">
                Arrange a Private Consultation &rarr;
              </a>
            </div>
          `}

          <!-- Quick Navigation to Private Appointment -->
          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
            <div class="font-mono text-xs text-accent uppercase mb-2">Planning a Visit or Viewing?</div>
            <h4 class="font-serif text-lg text-primary mb-2">Private Viewing Requests</h4>
            <p class="body-muted text-xs leading-relaxed mb-4">
              Interested in examining an individual reference from our observatory vault? Request a scheduled consultation window.
            </p>
            <a href="#/appointment" class="btn btn-outline btn-sm w-full text-center">
              Request Appointment Window
            </a>
          </div>

        </div>
      </div>

      <!-- D. Frequently Asked Resources -->
      <section class="mb-16">
        <div class="p-8 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="text-center max-w-narrow mx-auto mb-8">
            <span class="section-kicker">Curated Destinations</span>
            <h3 class="heading-2 font-serif mb-2">Explore Related Resources</h3>
            <p class="body-muted text-xs">
              Immediate access to our documentation, discovery engines, and verification protocols.
            </p>
          </div>

          <div class="grid grid-cols-4 gap-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
            <a href="#/collection" class="p-4 bg-secondary border hover:border-accent block transition-all" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-1">01 / MARKETPLACE</div>
              <div class="font-serif text-base text-primary mb-1">The Collection</div>
              <p class="body-muted text-xs">24 authenticated references across all 4 houses.</p>
            </a>

            <a href="#/authenticity" class="p-4 bg-secondary border hover:border-accent block transition-all" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-1">02 / VERIFICATION</div>
              <div class="font-serif text-base text-primary mb-1">Authenticity Centre</div>
              <p class="body-muted text-xs">Our 7-stage forensic workshop standard.</p>
            </a>

            <a href="#/sell-consign" class="p-4 bg-secondary border hover:border-accent block transition-all" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-1">03 / CONSIGNMENT</div>
              <div class="font-serif text-base text-primary mb-1">Sell or Consign</div>
              <p class="body-muted text-xs">Explore a direct sale or private curation.</p>
            </a>

            <a href="#/movement-lab" class="p-4 bg-secondary border hover:border-accent block transition-all" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-1">04 / EDUCATION</div>
              <div class="font-serif text-base text-primary mb-1">Movement Lab</div>
              <p class="body-muted text-xs">Interactive anatomy of mechanical escapements.</p>
            </a>
          </div>
        </div>
      </section>

      <!-- E. Editorial Closing CTA Section -->
      <section class="p-8 md:p-12 bg-secondary border text-center" style="border-color: var(--border-strong); border-radius: var(--radius-sm);">
        <h3 class="font-serif text-2xl text-primary mb-2">We Value Discretion &amp; Precision.</h3>
        <p class="body-muted text-sm max-w-narrow mx-auto mb-6">
          Whether you are acquiring your first mechanical chronometer or refining an archival collection, we look forward to the conversation.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a href="#/collection" class="btn btn-secondary btn-md">Explore Collection</a>
          <a href="#/about" class="btn btn-outline btn-md">Our Brand Philosophy</a>
        </div>
      </section>

    </div>
  `;
}

export async function init() {
  // Smooth scroll jump
  document.getElementById('jumpToContactFormBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contactFormSection')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Contact Form Submission Handler
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const catInput = document.getElementById('contactCategory');
    const subInput = document.getElementById('contactSubject');
    const msgInput = document.getElementById('contactMessage');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const category = catInput?.value || 'General Enquiry';
    const subject = subInput?.value.trim() || '';
    const message = msgInput?.value.trim() || '';

    // Field Validations
    let hasError = false;

    if (!name) {
      showFieldError(nameInput, 'Please provide your full name.');
      hasError = true;
    }

    if (!email || !isValidEmail(email)) {
      showFieldError(emailInput, 'Please enter a valid email address.');
      hasError = true;
    }

    if (!subject) {
      showFieldError(subInput, 'Please enter an enquiry subject.');
      hasError = true;
    }

    if (!message) {
      showFieldError(msgInput, 'Please enter your message.');
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      category: 'contact',
      categoryTitle: `${category} Enquiry: ${subject}`,
      timestamp: new Date().toISOString(),
      client: {
        name,
        email,
        phone: null,
        country: null,
        preferredContact: 'Email',
        message
      },
      data: {
        category,
        subject
      }
    };

    handleFormSubmission({
      endpointKey: 'formSubmissionEndpoint',
      payload,
      onComplete: () => {
        form.reset();
      }
    });
  });
}

function showFieldError(inputEl, msg) {
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
