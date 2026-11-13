/**
 * HOROLOGY — Sell & Consign Experience Controller (Phase 07)
 * Routes: #/sell-consign, #/sell-consign/submit, #/consign, #/sell
 * Direction C — Midnight Navy Edition
 */

import { BUSINESS_CONFIG } from '../js/config.js';
import { createBreadcrumb, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { escapeHTML } from '../js/utilities.js';
import {
  isValidEmail,
  isValidPhone,
  validateSelectedFile,
  saveFormSession,
  loadFormSession,
  clearFormSession,
  handleFormSubmission
} from '../js/forms.js';

export let title = 'Sell or Consign Your Timepiece — HOROLOGY';

// Session storage key for multi-step form
const SESSION_KEY = 'sell_consign_v1';

// Initial state for submission form
const DEFAULT_FORM_STATE = {
  step: 1,
  preference: 'both', // 'direct', 'consign', 'both', 'unsure'
  brand: 'rolex', // 'rolex', 'omega', 'tudor', 'grand-seiko', 'other'
  brandOther: '',
  model: '',
  referenceNumber: '',
  productionYear: '',
  watchType: 'Diver',
  movementType: 'Automatic',
  caseMaterial: 'Stainless Steel',
  condition: 'Excellent',
  conditionNotes: '',
  includedItems: ['Original Box', 'Original Papers'],
  includedItemsOther: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactCountry: '',
  preferredContact: 'Email',
  message: '',
  confirmedAccuracy: false
};

// In-memory file holder (zero localStorage abuse)
let selectedFilesStore = [];

export async function render(ctx) {
  const isSubmitRoute = ctx.path.includes('/submit');

  if (isSubmitRoute) {
    title = 'Submit Timepiece for Review — HOROLOGY';
    return renderSubmissionWizard();
  }

  title = 'Sell or Consign Your Timepiece — HOROLOGY';
  return renderLandingPage();
}

/**
 * 1. SELL / CONSIGN LANDING PAGE
 */
function renderLandingPage() {
  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Sell or Consign', href: '#/sell-consign' }
  ];

  const heroBg = resolveAsset('HZ-HERO-001');

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <!-- A. Cinematic Hero -->
      <section class="mb-16">
        <div class="p-8 md:p-12 bg-surface border relative overflow-hidden" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); min-height: 420px; display: flex; align-items: center; position: relative;">
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: url('${heroBg}') center/cover no-repeat; opacity: 0.14; pointer-events: none;"></div>
          <div style="position: absolute; top:0; right:0; bottom:0; left:0; background: radial-gradient(circle at 30% 50%, rgba(5, 6, 8, 0.9) 0%, rgba(5, 6, 8, 0.7) 100%); pointer-events: none;"></div>
          
          <div class="relative z-10 max-w-narrow" style="position: relative; z-index: 10; opacity: 1;">
            <span class="section-kicker">SELL OR CONSIGN</span>
            <h1 class="heading-1 font-serif mb-4" style="font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.15; color: var(--text-primary);">
              A New Chapter for Your Timepiece.
            </h1>
            <p class="body-muted mb-8 text-base leading-relaxed" style="max-width: 580px; color: var(--text-secondary); opacity: 1;">
              Whether you are considering a sale or exploring consignment, begin with a conversation about your watch. We provide transparent, discreet guidance for collectors of Rolex, Omega, Tudor, and Grand Seiko.
            </p>
            <div class="flex items-center gap-4 flex-wrap">
              <a href="#/sell-consign/submit" class="btn btn-primary btn-md">
                <span>Discuss Your Watch</span>
                ${ICONS.arrowRight}
              </a>
              <a href="#/sell-consign#how-it-works" class="btn btn-outline btn-md" id="howItWorksScrollBtn">
                <span>How It Works</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- B. Sell vs Consign Explanation -->
      <section class="mb-16">
        <div class="text-center max-w-narrow mx-auto mb-10">
          <span class="section-kicker">Pathways of Transition</span>
          <h2 class="heading-2 font-serif mb-3">Two Distinct Approaches</h2>
          <p class="body-muted text-sm leading-relaxed">
            Choose the model that aligns with your timeline, financial preferences, and horological goals.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
          <!-- Direct Sale Card -->
          <div class="p-8 bg-surface border flex flex-col justify-between" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
            <div>
              <div class="font-mono text-accent text-xs font-bold uppercase mb-2">Option 01 &bull; Direct Sale</div>
              <h3 class="font-serif text-2xl text-primary mb-3">Outright Acquisition Discussion</h3>
              <p class="body-muted text-sm leading-relaxed mb-6">
                For collectors seeking an immediate conclusion. Submit your watch details for our preliminary review. Following physical examination and mechanical verification, a formal outright purchase arrangement may be proposed.
              </p>
              
              <ul class="flex flex-col gap-2 text-xs text-secondary mb-6 font-mono" style="list-style: none; padding: 0;">
                <li class="flex items-center gap-2">
                  <span style="color: var(--accent-primary);">&bull;</span>
                  <span>Owner submits verified reference details</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: var(--accent-primary);">&bull;</span>
                  <span>Independent condition and authenticity audit</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: var(--accent-primary);">&bull;</span>
                  <span>Mutually agreed commercial settlement</span>
                </li>
              </ul>
            </div>

            <div class="pt-4 border-top" style="border-color: var(--border-subtle);">
              <span class="font-mono text-xs text-muted block mb-3">Best for: Rapid resolution &amp; immediate liquidity</span>
              <a href="#/sell-consign/submit" class="btn btn-outline btn-sm w-full text-center">
                Explore Direct Sale
              </a>
            </div>
          </div>

          <!-- Consignment Card -->
          <div class="p-8 bg-surface border flex flex-col justify-between" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
            <div>
              <div class="font-mono text-accent text-xs font-bold uppercase mb-2">Option 02 &bull; Consignment</div>
              <h3 class="font-serif text-2xl text-primary mb-3">Private Curatorial Consignment</h3>
              <p class="body-muted text-sm leading-relaxed mb-6">
                Present your watch directly to qualified horological enthusiasts. Your timepiece is photographed in high resolution, documented with technical telemetry, and presented across our curated collector network.
              </p>
              
              <ul class="flex flex-col gap-2 text-xs text-secondary mb-6 font-mono" style="list-style: none; padding: 0;">
                <li class="flex items-center gap-2">
                  <span style="color: var(--accent-primary);">&bull;</span>
                  <span>Detailed reference curation and photography</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: var(--accent-primary);">&bull;</span>
                  <span>Terms and duration agreed individually</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: var(--accent-primary);">&bull;</span>
                  <span>Settlement executed following successful transfer</span>
                </li>
              </ul>
            </div>

            <div class="pt-4 border-top" style="border-color: var(--border-subtle);">
              <span class="font-mono text-xs text-muted block mb-3">Best for: Maximizing realized value with patience</span>
              <a href="#/sell-consign/submit" class="btn btn-primary btn-sm w-full text-center">
                Explore Consignment
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- C. How It Works (Four-Stage Process) -->
      <section class="mb-16" id="how-it-works">
        <div class="p-8 md:p-10 bg-secondary border" style="border-color: var(--border-subtle); border-radius: var(--radius-sm);">
          <div class="text-center max-w-narrow mx-auto mb-10">
            <span class="section-kicker">Structured Protocol</span>
            <h2 class="heading-2 font-serif mb-2">The Four-Stage Engagement Process</h2>
            <p class="body-muted text-xs font-mono">
              Clear steps. Professional discretion. Zero pressure.
            </p>
          </div>

          <div class="grid grid-cols-4 gap-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
            <div class="p-5 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">01 / SPECIFICATIONS</div>
              <h4 class="font-serif text-lg text-primary mb-2">Tell Us About Your Watch</h4>
              <p class="body-muted text-xs leading-relaxed">
                Share the manufacturer, model, reference, year, condition notes, and archival documentation through our confidential form.
              </p>
            </div>

            <div class="p-5 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">02 / INITIAL REVIEW</div>
              <h4 class="font-serif text-lg text-primary mb-2">Curatorial Review</h4>
              <p class="body-muted text-xs leading-relaxed">
                Our specialists examine your submitted specifications against market benchmarks to determine suitability for our platform.
              </p>
            </div>

            <div class="p-5 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">03 / EVALUATION</div>
              <h4 class="font-serif text-lg text-primary mb-2">Discussion &amp; Verification</h4>
              <p class="body-muted text-xs leading-relaxed">
                Detailed photographs, physical inspection, timing telemetry, and commercial arrangements are discussed transparently.
              </p>
            </div>

            <div class="p-5 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="font-mono text-accent text-xs font-bold mb-2">04 / NEXT STEPS</div>
              <h4 class="font-serif text-lg text-primary mb-2">Mutual Agreement</h4>
              <p class="body-muted text-xs leading-relaxed">
                Any sale or consignment arrangement proceeds strictly after both parties establish and confirm all terms in writing.
              </p>
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="font-mono text-xs text-muted" style="max-width: 600px; margin: 0 auto;">
              * Note: Submitting an enquiry expresses interest and does not constitute a binding appraisal, valuation guarantee, or obligation to sell.
            </p>
          </div>
        </div>
      </section>

      <!-- D. Why Approach HOROLOGY? (Defensible Value Proposition) -->
      <section class="mb-16">
        <div class="text-center max-w-narrow mx-auto mb-10">
          <span class="section-kicker">Institutional Focus</span>
          <h2 class="heading-2 font-serif mb-3">Why Approach HOROLOGY?</h2>
          <p class="body-muted text-sm leading-relaxed">
            We are dedicated to mechanical horology, treating every timepiece as an extraordinary engineering creation.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.crown}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Specialised Curation</h4>
            <p class="body-muted text-xs leading-relaxed">
              We focus squarely on Rolex, Omega, Tudor, and Grand Seiko. This deliberate specialization allows deep market and mechanical familiarity.
            </p>
          </div>

          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.loupe}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Respect for Originality</h4>
            <p class="body-muted text-xs leading-relaxed">
              We value honest case chamfers, untouched factory bevels, and verified documentation over artificial cosmetic over-polishing.
            </p>
          </div>

          <div class="p-6 bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
            <div class="mb-3" style="color: var(--accent-primary);">${ICONS.shieldCheck}</div>
            <h4 class="font-serif text-lg text-primary mb-2">Transparent Discussion</h4>
            <p class="body-muted text-xs leading-relaxed">
              No hidden fees, synthetic score manipulation, or high-pressure tactics. All commercial arrangements are discussed openly.
            </p>
          </div>
        </div>
      </section>

      <!-- E. Frequently Asked Questions (Expandable Accordion) -->
      <section class="mb-16">
        <div class="text-center max-w-narrow mx-auto mb-10">
          <span class="section-kicker">Clarity &amp; Answers</span>
          <h2 class="heading-2 font-serif mb-3">Frequently Asked Questions</h2>
          <p class="body-muted text-sm leading-relaxed">
            Honest, qualified responses regarding our evaluation and consignment engagement.
          </p>
        </div>

        <div class="max-w-narrow mx-auto flex flex-col gap-3" id="faqAccordion">
          ${renderFaqItem(1, 'Which watches can I submit?', 'We specialize primarily in authentic mechanical references from Rolex, Omega, Tudor, and Grand Seiko. We occasionally review exceptional mechanical chronometers from other established manufactures upon individual consultation.')}
          ${renderFaqItem(2, 'Do I need the original box and papers?', 'While complete archival sets ("Full Sets") command higher collector interest, we also welcome well-preserved watches accompanied by our forensic inspection documentation.')}
          ${renderFaqItem(3, 'Can I submit a watch without service records?', 'Yes. During our evaluation process, movement amplitude, beat rate, and positional variance are assessed electronically to establish mechanical health regardless of documentation.')}
          ${renderFaqItem(4, 'How is an initial evaluation approached?', 'Our specialists review reference numbers, market historical benchmarks, visual condition, and archival completeness to provide an informed, unhurried perspective.')}
          ${renderFaqItem(5, 'Do I need to send my watch immediately?', 'No. You should never ship a timepiece until preliminary discussions are concluded, mutual agreement is confirmed, and secure transit arrangements are coordinated.')}
          ${renderFaqItem(6, 'Can I request a sale instead of consignment?', 'Yes. In the submission form, you can indicate a preference for Direct Sale, Consignment, or explore both options simultaneously.')}
          ${renderFaqItem(7, 'Are all submitted watches accepted?', 'No. We maintain a selective catalog focusing on mechanical integrity and authenticity. Submitting a request initiates a conversation rather than an automatic acceptance.')}
          ${renderFaqItem(8, 'How are consignment terms determined?', 'Consignment terms and settlement arrangements are established individually for each watch, taking into account model rarity, servicing requirements, and market dynamics.')}
          ${renderFaqItem(9, 'What photographs should I provide?', 'Clear, well-lit photographs of the dial face, case sides, caseback, bracelet/clasp, and any accompanying boxes, warranty cards, or service receipts are ideal.')}
          ${renderFaqItem(10, 'Does submitting a request commit me to selling?', 'Never. Submitting an inquiry is completely confidential and non-binding. You remain in full control of your timepiece at all times.')}
        </div>
      </section>

      <!-- Closing CTA Banner -->
      <section class="p-8 bg-surface border text-center" style="border-color: var(--border-strong); border-radius: var(--radius-sm);">
        <h3 class="font-serif text-2xl text-primary mb-2">Ready to Start the Conversation?</h3>
        <p class="body-muted text-sm max-w-narrow mx-auto mb-6">
          Submit your watch reference details for our initial review, or contact our private advisory team directly.
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a href="#/sell-consign/submit" class="btn btn-primary btn-md">
            <span>Begin Submission Form</span>
            ${ICONS.arrowRight}
          </a>
          <a href="#/contact" class="btn btn-outline btn-md">
            <span>Contact Concierge</span>
          </a>
        </div>
      </section>

    </div>
  `;
}

function renderFaqItem(index, question, answer) {
  return `
    <div class="bg-surface border" style="border-color: var(--border-subtle); border-radius: var(--radius-xs); overflow: hidden;">
      <button type="button" class="faq-accordion-toggle w-full p-4 flex items-center justify-between text-left" style="background: transparent; border: none; cursor: pointer; color: var(--text-primary); outline: none;" aria-expanded="false" data-faq-index="${index}">
        <span class="font-serif text-base font-semibold">${escapeHTML(question)}</span>
        <span class="faq-icon" style="color: var(--accent-primary); font-size: 1.2rem; transition: transform 200ms ease;">+</span>
      </button>
      <div class="faq-accordion-content p-4 pt-0 text-xs text-secondary leading-relaxed" style="display: none; border-top: 1px solid var(--border-subtle); margin-top: 4px;">
        <p style="margin-top: 8px;">${escapeHTML(answer)}</p>
      </div>
    </div>
  `;
}

/**
 * 2. MULTI-STEP SUBMISSION FORM (#/sell-consign/submit)
 */
function renderSubmissionWizard() {
  const session = loadFormSession(SESSION_KEY) || DEFAULT_FORM_STATE;
  const currentStep = session.step || 1;

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Sell or Consign', href: '#/sell-consign' },
    { label: 'Submission Form', href: '#/sell-consign/submit' }
  ];

  const stepTitles = [
    'Selling Preference',
    'Watch Identity',
    'Watch Condition',
    'Included Items',
    'Photographs',
    'Contact Information',
    'Review & Confirmation'
  ];

  const progressPercent = Math.round((currentStep / 7) * 100);

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="business-form-card">
        <!-- Wizard Header -->
        <div class="wizard-stepper-header">
          <div class="wizard-step-meta">
            <span class="text-accent font-bold">Step 0${currentStep} of 07 &bull; ${stepTitles[currentStep - 1]}</span>
            <span class="text-muted">${progressPercent}% Completed</span>
          </div>

          <div class="wizard-progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
            <div class="wizard-progress-bar" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- Step Pill Trail for Navigation -->
          <div class="wizard-pill-trail" role="tablist" aria-label="Submission steps">
            ${[1, 2, 3, 4, 5, 6, 7].map(num => {
              const isCurrent = num === currentStep;
              const isCompleted = num < currentStep;
              const stateClass = isCurrent ? 'active' : (isCompleted ? 'completed' : '');
              return `
                <button type="button" class="wizard-pill-btn ${stateClass}" data-step-target="${num}" aria-label="Step ${num}: ${stepTitles[num - 1]}">
                  ${num === 7 ? 'Review' : `0${num}`}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Dynamic Step Content Form -->
        <form id="submissionWizardForm" onsubmit="event.preventDefault();">
          ${renderStepContent(currentStep, session)}
        </form>
      </div>
    </div>
  `;
}

function renderStepContent(step, session) {
  switch (step) {
    case 1:
      return renderStep1(session);
    case 2:
      return renderStep2(session);
    case 3:
      return renderStep3(session);
    case 4:
      return renderStep4(session);
    case 5:
      return renderStep5(session);
    case 6:
      return renderStep6(session);
    case 7:
      return renderStep7(session);
    default:
      return renderStep1(session);
  }
}

// Step 1: Selling Preference
function renderStep1(session) {
  const options = [
    { id: 'direct', title: 'Direct Sale', desc: 'Seeking an outright purchase discussion and immediate settlement.' },
    { id: 'consign', title: 'Consignment', desc: 'Curating the timepiece across our private collector network.' },
    { id: 'both', title: 'Open to Discussing Both', desc: 'Explore both direct sale valuation and consignment arrangements.' },
    { id: 'unsure', title: 'Not Sure Yet', desc: 'Begin with a general preliminary conversation about the watch.' }
  ];

  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">What would you like to explore?</h2>
      <p class="body-muted text-xs mb-6">Select your initial direction. This can be adapted following our consultation.</p>

      <div class="form-options-grid">
        ${options.map(opt => `
          <button type="button" class="form-option-card ${session.preference === opt.id ? 'selected' : ''}" data-pref-id="${opt.id}">
            <div class="option-title">
              <span>${escapeHTML(opt.title)}</span>
              <span class="option-radio-dot"></span>
            </div>
            <div class="option-desc">${escapeHTML(opt.desc)}</div>
          </button>
        `).join('')}
      </div>

      <div class="wizard-nav-toolbar">
        <a href="#/sell-consign" class="btn btn-ghost btn-sm">&larr; Return to Overview</a>
        <button type="button" class="btn btn-primary btn-md" id="wizardNextBtn">
          <span>Continue to Watch Identity</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

// Step 2: Watch Identity
function renderStep2(session) {
  const isOther = session.brand === 'other';

  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">Identify Your Timepiece</h2>
      <p class="body-muted text-xs mb-6">Provide the manufacturer, model, and reference details.</p>

      <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        <div class="form-group">
          <label class="form-label">Manufacture House <span class="field-required-star">*</span></label>
          <select class="form-select" id="fieldBrand" required>
            <option value="rolex" ${session.brand === 'rolex' ? 'selected' : ''}>Rolex</option>
            <option value="omega" ${session.brand === 'omega' ? 'selected' : ''}>Omega</option>
            <option value="tudor" ${session.brand === 'tudor' ? 'selected' : ''}>Tudor</option>
            <option value="grand-seiko" ${session.brand === 'grand-seiko' ? 'selected' : ''}>Grand Seiko</option>
            <option value="other" ${isOther ? 'selected' : ''}>Other Manufacture</option>
          </select>
        </div>

        <div class="form-group" id="otherBrandGroup" style="${isOther ? '' : 'display:none;'}">
          <label class="form-label">Specify Manufacture Name <span class="field-required-star">*</span></label>
          <input type="text" class="form-input" id="fieldBrandOther" value="${escapeHTML(session.brandOther || '')}" placeholder="e.g. Audemars Piguet, Patek Philippe">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        <div class="form-group">
          <label class="form-label">Model Name <span class="field-required-star">*</span></label>
          <input type="text" class="form-input" id="fieldModel" value="${escapeHTML(session.model || '')}" placeholder="e.g. Submariner Date, Speedmaster Moonwatch" required>
        </div>

        <div class="form-group">
          <label class="form-label">Reference Number <span class="field-required-star">*</span></label>
          <input type="text" class="form-input font-mono" id="fieldReference" value="${escapeHTML(session.referenceNumber || '')}" placeholder="e.g. 126610LN, 310.30.42.50.01.001" required>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
        <div class="form-group">
          <label class="form-label">Approx. Production Year</label>
          <input type="number" class="form-input font-mono" id="fieldYear" value="${escapeHTML(session.productionYear || '')}" placeholder="e.g. 2021" min="1930" max="2026">
        </div>

        <div class="form-group">
          <label class="form-label">Watch Typology</label>
          <select class="form-select" id="fieldType">
            <option value="Diver" ${session.watchType === 'Diver' ? 'selected' : ''}>Diver</option>
            <option value="Chronograph" ${session.watchType === 'Chronograph' ? 'selected' : ''}>Chronograph</option>
            <option value="Dress" ${session.watchType === 'Dress' ? 'selected' : ''}>Dress / Formal</option>
            <option value="GMT" ${session.watchType === 'GMT' ? 'selected' : ''}>GMT / Dual-Time</option>
            <option value="Sports" ${session.watchType === 'Sports' ? 'selected' : ''}>Sports / Everyday</option>
            <option value="Other" ${session.watchType === 'Other' ? 'selected' : ''}>Other</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Movement Propulsion</label>
          <select class="form-select" id="fieldMovement">
            <option value="Automatic" ${session.movementType === 'Automatic' ? 'selected' : ''}>Automatic</option>
            <option value="Manual Wind" ${session.movementType === 'Manual Wind' ? 'selected' : ''}>Manual Winding</option>
            <option value="Spring Drive" ${session.movementType === 'Spring Drive' ? 'selected' : ''}>Spring Drive</option>
            <option value="Quartz" ${session.movementType === 'Quartz' ? 'selected' : ''}>Quartz</option>
            <option value="Not Sure" ${session.movementType === 'Not Sure' ? 'selected' : ''}>Not Sure</option>
          </select>
        </div>
      </div>

      <div class="form-group mb-6">
        <label class="form-label">Case Metallurgy &amp; Material (Optional)</label>
        <input type="text" class="form-input" id="fieldMaterial" value="${escapeHTML(session.caseMaterial || '')}" placeholder="e.g. Oystersteel, Titanium, Platinum">
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="wizardBackBtn">&larr; Back</button>
        <button type="button" class="btn btn-primary btn-md" id="wizardNextBtn">
          <span>Continue to Condition</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

// Step 3: Watch Condition
function renderStep3(session) {
  const grades = [
    { id: 'Unworn', label: 'Unworn', desc: 'Factory condition with delivery seals or zero signs of handling.' },
    { id: 'Excellent', label: 'Excellent', desc: 'Pristine case chamfers with negligible microscopic handling marks.' },
    { id: 'Very Good', label: 'Very Good', desc: 'Light surface hairlines consistent with careful occasional wear.' },
    { id: 'Good', label: 'Good', desc: 'Honest pre-owned character with minor cosmetic marks.' },
    { id: 'Fair', label: 'Fair', desc: 'Noticeable wear or minor dings, mechanically functional.' },
    { id: 'Requires Assessment', label: 'Requires Assessment', desc: 'Needs complete horological evaluation and timing diagnostic.' },
    { id: 'Not Sure', label: 'Not Sure', desc: 'We will assess the condition upon preliminary photograph review.' }
  ];

  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">Condition Assessment</h2>
      <p class="body-muted text-xs mb-4">
        Provide an honest impression. Self-assessments are indicative; formal condition is determined during workshop inspection.
      </p>

      <div class="form-options-grid mb-6">
        ${grades.map(g => `
          <button type="button" class="form-option-card ${session.condition === g.id ? 'selected' : ''}" data-cond-id="${g.id}">
            <div class="option-title">
              <span>${escapeHTML(g.label)}</span>
              <span class="option-radio-dot"></span>
            </div>
            <div class="option-desc">${escapeHTML(g.desc)}</div>
          </button>
        `).join('')}
      </div>

      <div class="form-group mb-6">
        <label class="form-label">Condition Notes &amp; Known History (Optional)</label>
        <textarea class="form-textarea" id="fieldCondNotes" rows="3" placeholder="Describe any notable scratches, crystal integrity, bracelet stretch, or prior polish history...">${escapeHTML(session.conditionNotes || '')}</textarea>
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="wizardBackBtn">&larr; Back</button>
        <button type="button" class="btn btn-primary btn-md" id="wizardNextBtn">
          <span>Continue to Included Items</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

// Step 4: Included Items
function renderStep4(session) {
  const items = [
    'Original Box',
    'Original Papers',
    'Warranty Card',
    'Service Documentation',
    'Purchase Receipt',
    'Additional Accessories',
    'Additional Straps or Bracelets',
    'Not Sure'
  ];

  const currentIncluded = new Set(session.includedItems || []);

  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">Included Archival Items</h2>
      <p class="body-muted text-xs mb-6">Select all packaging, documentation, and accessories accompanying the timepiece.</p>

      <div class="form-options-grid mb-6">
        ${items.map(item => {
          const isSelected = currentIncluded.has(item);
          return `
            <button type="button" class="form-option-card multi ${isSelected ? 'selected' : ''}" data-item-name="${escapeHTML(item)}">
              <div class="option-title">
                <span>${escapeHTML(item)}</span>
                <span class="option-radio-dot"></span>
              </div>
            </button>
          `;
        }).join('')}
      </div>

      <div class="form-group mb-6">
        <label class="form-label">Other Items or Notes (Optional)</label>
        <input type="text" class="form-input" id="fieldIncludedOther" value="${escapeHTML(session.includedItemsOther || '')}" placeholder="e.g. Chronometer tags, bezel protector, extra links">
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="wizardBackBtn">&larr; Back</button>
        <button type="button" class="btn btn-primary btn-md" id="wizardNextBtn">
          <span>Continue to Photographs</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

// Step 5: Photographs
function renderStep5(session) {
  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">Photographs of Your Watch</h2>
      <p class="body-muted text-xs mb-4">
        Clear photographs help our specialists conduct an accurate initial review.
      </p>

      <!-- Client-Side Drag & Drop File Selector -->
      <div class="photo-dropzone" id="photoDropzone">
        <input type="file" id="photoFileInput" multiple accept=".jpg,.jpeg,.png,.webp">
        <div style="font-size: 2rem; color: var(--accent-primary); margin-bottom: var(--space-2);">${ICONS.camera || ICONS.loupe}</div>
        <h4 class="font-sans text-sm font-semibold text-primary mb-1">Select Watch Photographs</h4>
        <p class="body-muted text-xs font-mono mb-2">JPG, PNG, or WebP &bull; Maximum 10 MB per image &bull; Up to 6 files</p>
        <span class="btn btn-outline btn-xs pointer-events-none">Browse Local Files</span>
      </div>

      <div id="fileUploadError" class="field-error-msg mb-4" style="display: none;"></div>

      <!-- Selected Photographs Preview Grid -->
      <div class="photo-preview-grid" id="photoPreviewGrid">
        ${renderPhotoThumbnails()}
      </div>

      <!-- Static Hosting Environment Transparency Notice -->
      <div class="p-4 bg-secondary border mb-6" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
        <div class="flex items-center gap-2 mb-1">
          <span style="color: var(--accent-primary);">${ICONS.seal}</span>
          <span class="font-mono text-xs font-bold text-primary">Static Site Selection Notice</span>
        </div>
        <p class="body-muted text-xs leading-relaxed" style="margin: 0;">
          Selecting files here prepares your local preview. As HOROLOGY operates statically without a cloud file-storage server, your images are not permanently uploaded to our servers. You will be invited to attach them to your prepared enquiry email in the final step.
        </p>
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="wizardBackBtn">&larr; Back</button>
        <button type="button" class="btn btn-primary btn-md" id="wizardNextBtn">
          <span>Continue to Contact Info</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

function renderPhotoThumbnails() {
  if (selectedFilesStore.length === 0) {
    return `<p class="body-muted text-xs font-mono col-span-full py-4 text-center">No photographs selected yet (Optional).</p>`;
  }

  return selectedFilesStore.map((fileObj, idx) => `
    <div class="photo-thumb-card" data-file-index="${idx}">
      <img src="${fileObj.previewUrl}" alt="${escapeHTML(fileObj.file.name)}" class="photo-thumb-img">
      <button type="button" class="photo-thumb-remove-btn" data-remove-index="${idx}" aria-label="Remove image">&times;</button>
      <div class="photo-thumb-meta">${escapeHTML(fileObj.file.name)}</div>
    </div>
  `).join('');
}

// Step 6: Contact Information
function renderStep6(session) {
  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">Confidential Contact Details</h2>
      <p class="body-muted text-xs mb-6">
        Your information is used strictly to communicate regarding this timepiece enquiry.
      </p>

      <div class="grid grid-cols-2 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        <div class="form-group">
          <label class="form-label">Full Name <span class="field-required-star">*</span></label>
          <input type="text" class="form-input" id="fieldContactName" value="${escapeHTML(session.contactName || '')}" placeholder="Lord / Dr. / First Last" required>
        </div>

        <div class="form-group">
          <label class="form-label">Email Address <span class="field-required-star">*</span></label>
          <input type="email" class="form-input" id="fieldContactEmail" value="${escapeHTML(session.contactEmail || '')}" placeholder="collector@domain.com" required>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="form-group">
          <label class="form-label">Phone Number (Optional)</label>
          <input type="tel" class="form-input font-mono" id="fieldContactPhone" value="${escapeHTML(session.contactPhone || '')}" placeholder="+1 (555) 000-0000">
        </div>

        <div class="form-group">
          <label class="form-label">Country / Location (Optional)</label>
          <input type="text" class="form-input" id="fieldContactCountry" value="${escapeHTML(session.contactCountry || '')}" placeholder="e.g. United Kingdom, Switzerland">
        </div>

        <div class="form-group">
          <label class="form-label">Preferred Contact Channel</label>
          <select class="form-select" id="fieldContactMethod">
            <option value="Email" ${session.preferredContact === 'Email' ? 'selected' : ''}>Email</option>
            <option value="Telephone" ${session.preferredContact === 'Telephone' ? 'selected' : ''}>Telephone</option>
            <option value="WhatsApp" ${session.preferredContact === 'WhatsApp' ? 'selected' : ''}>WhatsApp</option>
          </select>
        </div>
      </div>

      <div class="form-group mb-6">
        <label class="form-label">Additional Message or Guidance (Optional)</label>
        <textarea class="form-textarea" id="fieldMessage" rows="3" placeholder="Provide any additional background, acquisition aspirations, or timing constraints...">${escapeHTML(session.message || '')}</textarea>
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="wizardBackBtn">&larr; Back</button>
        <button type="button" class="btn btn-primary btn-md" id="wizardNextBtn">
          <span>Review Submission</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

// Step 7: Review and Confirmation
function renderStep7(session) {
  const brandDisplay = session.brand === 'other' ? (session.brandOther || 'Other Manufacture') : session.brand.toUpperCase();
  const fileCount = selectedFilesStore.length;

  return `
    <div class="wizard-step-pane">
      <h2 class="heading-2 font-serif mb-2">Review Your Enquiry</h2>
      <p class="body-muted text-xs mb-6">
        Review your responses before preparing your confidential enquiry.
      </p>

      <div class="review-summary-box">
        <div class="review-row-item">
          <div>
            <div class="review-row-label">1. Selling Preference</div>
            <div class="review-row-val">${escapeHTML(formatPreferenceLabel(session.preference))}</div>
          </div>
          <button type="button" class="review-row-edit-btn" data-jump-step="1">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">2. Watch Identity</div>
            <div class="review-row-val">${escapeHTML(brandDisplay)} &bull; ${escapeHTML(session.model || 'N/A')} (Ref. ${escapeHTML(session.referenceNumber || 'N/A')})</div>
            <div class="text-xs text-muted font-mono mt-1">
              Year: ${escapeHTML(session.productionYear || 'Unspecified')} &bull; ${escapeHTML(session.watchType)} &bull; ${escapeHTML(session.movementType)}
            </div>
          </div>
          <button type="button" class="review-row-edit-btn" data-jump-step="2">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">3. Physical Condition</div>
            <div class="review-row-val">${escapeHTML(session.condition)}</div>
            ${session.conditionNotes ? `<div class="text-xs text-muted mt-1">"${escapeHTML(session.conditionNotes)}"</div>` : ''}
          </div>
          <button type="button" class="review-row-edit-btn" data-jump-step="3">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">4. Included Archival Items</div>
            <div class="review-row-val">${escapeHTML(session.includedItems?.join(', ') || 'None')}</div>
            ${session.includedItemsOther ? `<div class="text-xs text-muted mt-1">Other: ${escapeHTML(session.includedItemsOther)}</div>` : ''}
          </div>
          <button type="button" class="review-row-edit-btn" data-jump-step="4">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">5. Photographs Selected</div>
            <div class="review-row-val">${fileCount} local photograph${fileCount !== 1 ? 's' : ''} selected</div>
          </div>
          <button type="button" class="review-row-edit-btn" data-jump-step="5">Edit</button>
        </div>

        <div class="review-row-item">
          <div>
            <div class="review-row-label">6. Contact Information</div>
            <div class="review-row-val">${escapeHTML(session.contactName)} &bull; ${escapeHTML(session.contactEmail)}</div>
            ${session.contactPhone ? `<div class="text-xs text-muted font-mono mt-1">Phone: ${escapeHTML(session.contactPhone)} (${session.preferredContact})</div>` : ''}
          </div>
          <button type="button" class="review-row-edit-btn" data-jump-step="6">Edit</button>
        </div>
      </div>

      <!-- Explicit Accuracy Confirmation Checkbox -->
      <div class="confirmation-card">
        <label class="confirmation-label">
          <input type="checkbox" id="confirmAccuracyCheckbox" class="confirmation-checkbox" ${session.confirmedAccuracy ? 'checked' : ''}>
          <span>I confirm that the information provided is accurate to the best of my knowledge, and understand that formal appraisals require independent physical verification.</span>
        </label>
      </div>

      <div class="wizard-nav-toolbar">
        <button type="button" class="btn btn-outline btn-sm" id="wizardBackBtn">&larr; Back to Contact</button>
        <button type="button" class="btn btn-primary btn-md" id="prepareEnquiryBtn" ${session.confirmedAccuracy ? '' : 'disabled'}>
          <span>Prepare My Enquiry</span>
          ${ICONS.arrowRight}
        </button>
      </div>
    </div>
  `;
}

function formatPreferenceLabel(id) {
  switch (id) {
    case 'direct': return 'Direct Sale';
    case 'consign': return 'Consignment';
    case 'both': return 'Open to Discussing Both';
    case 'unsure': return 'Not Sure Yet';
    default: return 'Open to Discussion';
  }
}

/**
 * BIND INTERACTIVE DOM HANDLERS
 */
export async function mount(ctx) {
  const isSubmitRoute = ctx.path.includes('/submit');

  if (isSubmitRoute) {
    bindWizardHandlers();
  } else {
    bindLandingHandlers();
  }
}

export const init = mount;

function bindLandingHandlers() {
  // Smooth scroll for "How It Works" button
  document.getElementById('howItWorksScrollBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Accordion FAQ toggle
  document.querySelectorAll('.faq-accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) content.style.display = isExpanded ? 'none' : 'block';
      if (icon) icon.textContent = isExpanded ? '+' : '−';
    });
  });
}

function bindWizardHandlers() {
  const session = loadFormSession(SESSION_KEY) || DEFAULT_FORM_STATE;
  const currentStep = session.step || 1;

  // Step 1: Selling preference cards
  document.querySelectorAll('[data-pref-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-pref-id]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      session.preference = btn.getAttribute('data-pref-id');
      saveFormSession(SESSION_KEY, session);
    });
  });

  // Step 2: Brand select toggling "Other"
  const brandSelect = document.getElementById('fieldBrand');
  brandSelect?.addEventListener('change', (e) => {
    const isOther = e.target.value === 'other';
    const otherGroup = document.getElementById('otherBrandGroup');
    if (otherGroup) otherGroup.style.display = isOther ? 'block' : 'none';
  });

  // Step 3: Condition cards
  document.querySelectorAll('[data-cond-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cond-id]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      session.condition = btn.getAttribute('data-cond-id');
      saveFormSession(SESSION_KEY, session);
    });
  });

  // Step 4: Included items multi-select
  document.querySelectorAll('[data-item-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.getAttribute('data-item-name');
      const set = new Set(session.includedItems || []);
      if (set.has(item)) {
        set.delete(item);
        btn.classList.remove('selected');
      } else {
        set.add(item);
        btn.classList.add('selected');
      }
      session.includedItems = [...set];
      saveFormSession(SESSION_KEY, session);
    });
  });

  // Step 5: Photograph selection & validation
  const fileInput = document.getElementById('photoFileInput');
  const errorBox = document.getElementById('fileUploadError');

  fileInput?.addEventListener('change', (e) => {
    if (errorBox) errorBox.style.display = 'none';
    const files = Array.from(e.target.files || []);

    for (const f of files) {
      if (selectedFilesStore.length >= 6) {
        if (errorBox) {
          errorBox.textContent = 'Maximum of 6 photographs permitted.';
          errorBox.style.display = 'flex';
        }
        break;
      }

      const res = validateSelectedFile(f);
      if (!res.valid) {
        if (errorBox) {
          errorBox.textContent = res.error;
          errorBox.style.display = 'flex';
        }
        continue;
      }

      selectedFilesStore.push({
        file: f,
        previewUrl: URL.createObjectURL(f)
      });
    }

    // Refresh thumbnail grid
    const grid = document.getElementById('photoPreviewGrid');
    if (grid) grid.innerHTML = renderPhotoThumbnails();
    bindPhotoDeleteButtons();
  });

  bindPhotoDeleteButtons();

  // Step 7: Confirmation Checkbox
  const confirmBox = document.getElementById('confirmAccuracyCheckbox');
  const prepareBtn = document.getElementById('prepareEnquiryBtn');
  confirmBox?.addEventListener('change', (e) => {
    session.confirmedAccuracy = e.target.checked;
    saveFormSession(SESSION_KEY, session);
    if (prepareBtn) prepareBtn.disabled = !e.target.checked;
  });

  // Step 7: Prepare Enquiry Button
  prepareBtn?.addEventListener('click', () => {
    if (!session.confirmedAccuracy) return;

    const payload = {
      category: 'sell-consign',
      categoryTitle: 'Watch Sale or Consignment Enquiry',
      timestamp: new Date().toISOString(),
      client: {
        name: session.contactName,
        email: session.contactEmail,
        phone: session.contactPhone || null,
        country: session.contactCountry || null,
        preferredContact: session.preferredContact || 'Email',
        message: session.message || null
      },
      data: {
        preference: formatPreferenceLabel(session.preference),
        manufacturer: session.brand === 'other' ? session.brandOther : session.brand.toUpperCase(),
        model: session.model,
        referenceNumber: session.referenceNumber,
        productionYear: session.productionYear || null,
        watchType: session.watchType,
        movementType: session.movementType,
        caseMaterial: session.caseMaterial || null,
        conditionGrade: session.condition,
        conditionNotes: session.conditionNotes || null,
        includedItems: session.includedItems,
        includedItemsOther: session.includedItemsOther || null
      },
      files: selectedFilesStore.map(f => ({
        name: f.file.name,
        size: f.file.size,
        type: f.file.type
      }))
    };

    handleFormSubmission({
      endpointKey: 'formSubmissionEndpoint',
      payload,
      onComplete: () => {
        clearFormSession(SESSION_KEY);
      }
    });
  });

  // Pill Jump Buttons
  document.querySelectorAll('[data-step-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-step-target'), 10);
      harvestCurrentStepFields(currentStep, session);
      session.step = target;
      saveFormSession(SESSION_KEY, session);
      refreshWizardView();
    });
  });

  // Review Edit Jumps
  document.querySelectorAll('[data-jump-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-jump-step'), 10);
      session.step = target;
      saveFormSession(SESSION_KEY, session);
      refreshWizardView();
    });
  });

  // Back Button
  document.getElementById('wizardBackBtn')?.addEventListener('click', () => {
    if (currentStep > 1) {
      harvestCurrentStepFields(currentStep, session);
      session.step = currentStep - 1;
      saveFormSession(SESSION_KEY, session);
      refreshWizardView();
    }
  });

  // Next Button
  document.getElementById('wizardNextBtn')?.addEventListener('click', () => {
    if (validateAndHarvestStep(currentStep, session)) {
      session.step = currentStep + 1;
      saveFormSession(SESSION_KEY, session);
      refreshWizardView();
    }
  });
}

function bindPhotoDeleteButtons() {
  document.querySelectorAll('[data-remove-index]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-remove-index'), 10);
      if (selectedFilesStore[idx]) {
        URL.revokeObjectURL(selectedFilesStore[idx].previewUrl);
        selectedFilesStore.splice(idx, 1);
        const grid = document.getElementById('photoPreviewGrid');
        if (grid) grid.innerHTML = renderPhotoThumbnails();
        bindPhotoDeleteButtons();
      }
    });
  });
}

function harvestCurrentStepFields(step, session) {
  if (step === 2) {
    const brandSelect = document.getElementById('fieldBrand');
    const brandOther = document.getElementById('fieldBrandOther');
    const model = document.getElementById('fieldModel');
    const ref = document.getElementById('fieldReference');
    const year = document.getElementById('fieldYear');
    const type = document.getElementById('fieldType');
    const mov = document.getElementById('fieldMovement');
    const mat = document.getElementById('fieldMaterial');

    if (brandSelect) session.brand = brandSelect.value;
    if (brandOther) session.brandOther = brandOther.value.trim();
    if (model) session.model = model.value.trim();
    if (ref) session.referenceNumber = ref.value.trim();
    if (year) session.productionYear = year.value;
    if (type) session.watchType = type.value;
    if (mov) session.movementType = mov.value;
    if (mat) session.caseMaterial = mat.value.trim();
  } else if (step === 3) {
    const notes = document.getElementById('fieldCondNotes');
    if (notes) session.conditionNotes = notes.value.trim();
  } else if (step === 4) {
    const other = document.getElementById('fieldIncludedOther');
    if (other) session.includedItemsOther = other.value.trim();
  } else if (step === 6) {
    const name = document.getElementById('fieldContactName');
    const email = document.getElementById('fieldContactEmail');
    const phone = document.getElementById('fieldContactPhone');
    const country = document.getElementById('fieldContactCountry');
    const method = document.getElementById('fieldContactMethod');
    const msg = document.getElementById('fieldMessage');

    if (name) session.contactName = name.value.trim();
    if (email) session.contactEmail = email.value.trim();
    if (phone) session.contactPhone = phone.value.trim();
    if (country) session.contactCountry = country.value.trim();
    if (method) session.preferredContact = method.value;
    if (msg) session.message = msg.value.trim();
  }
}

function validateAndHarvestStep(step, session) {
  harvestCurrentStepFields(step, session);

  if (step === 2) {
    if (!session.brand) return false;
    if (session.brand === 'other' && !session.brandOther) {
      highlightError('fieldBrandOther', 'Please specify the manufacture house.');
      return false;
    }
    if (!session.model) {
      highlightError('fieldModel', 'Please provide the timepiece model.');
      return false;
    }
    if (!session.referenceNumber) {
      highlightError('fieldReference', 'Please provide the reference number.');
      return false;
    }
  } else if (step === 6) {
    if (!session.contactName) {
      highlightError('fieldContactName', 'Please provide your full name.');
      return false;
    }
    if (!session.contactEmail || !isValidEmail(session.contactEmail)) {
      highlightError('fieldContactEmail', 'Please provide a valid email address.');
      return false;
    }
    if (session.contactPhone && !isValidPhone(session.contactPhone)) {
      highlightError('fieldContactPhone', 'Please enter a valid telephone number.');
      return false;
    }
  }

  return true;
}

function highlightError(fieldId, errorMsg) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.classList.add('has-error');
  el.focus();

  let errBox = el.parentNode.querySelector('.field-error-msg');
  if (!errBox) {
    errBox = document.createElement('div');
    errBox.className = 'field-error-msg';
    el.parentNode.appendChild(errBox);
  }
  errBox.textContent = errorMsg;
  errBox.style.display = 'flex';

  el.addEventListener('input', () => {
    el.classList.remove('has-error');
    errBox.style.display = 'none';
  }, { once: true });
}

function refreshWizardView() {
  const main = document.getElementById('app');
  if (main) {
    main.innerHTML = renderSubmissionWizard();
    bindWizardHandlers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
