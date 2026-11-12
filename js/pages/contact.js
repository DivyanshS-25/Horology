// HOROLOGY — Contact & Private Salon Appointment Route Module (Panel 15)
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';
import { openModal } from '../components/modal.js';
import { repository } from '../data/repository.js';

export const contactPage = {
  id: 'contact',
  path: '/contact',
  title: 'Contact & Private Appointment — Client Salon',

  render() {
    const watches = repository.getAllWatches();

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Private Appointment & Contact' }
        ])}

        <!-- Header (Panel 15) -->
        <div class="section-title-wrap">
          <span class="overline">Private Viewing Salon</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Contact &amp; Private Appointment</h1>
          <p style="font-family: var(--font-serif); font-size: var(--text-xl); font-style: italic; color: var(--color-accent-secondary); margin-top: var(--space-2);">
            "Discuss a watch, request a viewing, or book a private consultation."
          </p>
          <p style="max-width: 680px; margin-top: var(--space-3);">
            We maintain discreet private appointment lounges in Mumbai and Geneva, alongside encrypted virtual video inspections with our master horologist.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-10);" class="hero-grid">
          <!-- Booking Form -->
          <div class="watch-card" style="padding: var(--space-8);">
            <h2 style="font-size: var(--text-2xl); margin-bottom: var(--space-4);">Schedule a Private Consultation</h2>

            <form id="appointmentForm" style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Consultation Format &amp; Salon Location *
                </label>
                <select class="select-custom w-full" id="salonLocation" required>
                  <option value="mumbai">Mumbai Private Client Salon (BKC)</option>
                  <option value="delhi">New Delhi Viewing Lounge (Chanakyapuri)</option>
                  <option value="geneva">Geneva Atelier (Rue du Rhône)</option>
                  <option value="virtual">Encrypted 4K Video Inspection with Horologist</option>
                </select>
              </div>

              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Timepiece of Primary Interest
                </label>
                <select class="select-custom w-full" id="watchInterest">
                  <option value="general">General Vault Curation &amp; Advice</option>
                  ${watches.map(w => `<option value="${w.id}">${w.brand} ${w.model} (Ref. ${w.referenceNumber})</option>`).join('')}
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Preferred Date *
                  </label>
                  <input type="date" class="search-input" required id="bookingDate" value="2026-11-20" style="padding-left: 1rem;" />
                </div>
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Preferred Time Slot *
                  </label>
                  <select class="select-custom w-full" required>
                    <option value="morning">Morning (11:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:30 PM – 4:30 PM)</option>
                    <option value="evening">Evening (5:30 PM – 7:30 PM)</option>
                  </select>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Your Full Name *
                  </label>
                  <input type="text" class="search-input" required placeholder="Vikramaditya S." style="padding-left: 1rem;" />
                </div>
                <div>
                  <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                    Phone Number (WhatsApp) *
                  </label>
                  <input type="tel" class="search-input" required placeholder="+91 98765 43210" style="padding-left: 1rem;" />
                </div>
              </div>

              <div>
                <label style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-muted); display: block; margin-bottom: var(--space-1);">
                  Special Requests / Security Preferences
                </label>
                <textarea class="search-input" rows="3" placeholder="Specific references to compare side-by-side, wrist-size adjustment, or NDA requirement..." style="padding: 0.75rem 1rem;"></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-lg mt-2">
                Confirm Appointment Request ${icons.arrowRight('', 16)}
              </button>
            </form>
          </div>

          <!-- Salon Information & Addresses -->
          <div style="display: flex; flex-direction: column; gap: var(--space-6);">
            <!-- Atelier Details -->
            <div class="watch-card" style="padding: var(--space-6);">
              <span class="overline" style="font-size: 10px;">Private Locations</span>
              <h3 style="font-size: var(--text-xl); margin: var(--space-2) 0 var(--space-4);">Our Private Salons</h3>

              <div style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--color-border-hairline); padding-bottom: var(--space-4);">
                <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">Mumbai Atelier &bull; BKC</strong>
                <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">
                  Bandra Kurla Complex, Mumbai, Maharashtra 400051<br/>
                  By Confirmed Appointment Only
                </p>
              </div>

              <div style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--color-border-hairline); padding-bottom: var(--space-4);">
                <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">Geneva Vault &bull; Rue du Rhône</strong>
                <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">
                  Rue du Rhône 42, 1204 Genève, Switzerland<br/>
                  By Confirmed Appointment Only
                </p>
              </div>

              <div>
                <strong style="color: var(--color-text-primary); font-size: var(--text-sm);">Direct Concierge Inquiries</strong>
                <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">
                  Email: <strong>concierge@horology.luxury</strong><br/>
                  Encrypted Line: <strong>+91 (0) 22 8900 4400</strong>
                </p>
              </div>
            </div>

            <!-- Client Escrow Guarantee -->
            <div style="background: var(--color-bg-card); border: 1px solid var(--color-border-hairline); border-radius: var(--radius-sm); padding: var(--space-6);">
              <span class="overline" style="font-size: 10px; color: var(--color-status-verified);">Client Security</span>
              <h4 style="font-size: var(--text-base); margin: var(--space-1) 0 var(--space-2);">Absolute Discretion &amp; Security</h4>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted); line-height: var(--leading-normal);">
                Private viewing rooms are equipped with Swiss Horotec examination benches, multi-frequency timegraphers, and calibrated stereo loupes so you can inspect timepieces under laboratory conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    const form = document.getElementById('appointmentForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'APPT-' + Math.floor(100000 + Math.random() * 900000);
      openModal({
        title: 'Salon Consultation Confirmed',
        content: `
          <div class="text-center" style="padding: var(--space-6) 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-status-available-bg); color: var(--color-status-available); display: inline-flex; align-items: center; justify-content: center; margin-bottom: var(--space-4);">
              ${icons.check('', 28)}
            </div>
            <h3 style="margin-bottom: var(--space-2);">Viewing Reservation Received</h3>
            <p class="mb-4">
              Your appointment request has been reserved under private booking reference:
            </p>
            <div class="mono" style="font-size: var(--text-xl); font-weight: bold; color: var(--color-accent-primary); padding: var(--space-3); background: var(--color-bg-base); border-radius: var(--radius-xs); border: 1px dashed var(--color-accent-border); display: inline-block; margin-bottom: var(--space-6);">
              ${code}
            </div>
            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-6);">
              A private client associate will call you shortly to confirm room allocation and security clearance.
            </p>
            <a href="#/collection" class="btn btn-primary">Return to Collection</a>
          </div>
        `,
        maxWidth: '540px'
      });
    });
  }
};
