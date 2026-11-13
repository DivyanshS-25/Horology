/**
 * HOROLOGY — Page Module: Intelligent Watch Finder
 * Route: #/watch-finder (Canonical) & #/finder (Alias)
 * Direction C — Midnight Navy Edition
 * Consultative 9-step private consultation flow with deterministic weighted scoring
 */

import { WATCHES, getWatchById } from '../js/data.js';
import { FINDER_QUESTIONS, evaluateRecommendations } from '../js/watch-finder-engine.js';
import { createBreadcrumb, createStatusBadge, ICONS } from '../js/components.js';
import { resolveAsset } from '../js/assets.js';
import { formatPrice, escapeHTML } from '../js/utilities.js';
import { store } from '../js/state.js';
import { openEnquiryModal } from '../js/enquiry.js';
import { openCompareLimitModal } from './wishlist.js';

export const title = 'Intelligent Watch Finder — HOROLOGY';

// Wizard view modes: 'entry' | 'question' | 'review' | 'results'
let viewMode = 'entry';
let currentStepNumber = 1; // 1 to 8 for questions, 9 for review
let userAnswers = {};

export async function render(ctx) {
  const savedState = store.getFinderState();
  const hasSavedAnswers = savedState && savedState.lastAnswers && Object.keys(savedState.lastAnswers).length > 0;

  const breadcrumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Watch Finder', href: '#/watch-finder' }
  ];

  if (viewMode === 'entry') {
    return renderEntryScreen(breadcrumbs, hasSavedAnswers, savedState);
  }

  if (viewMode === 'results') {
    return renderResultsScreen(breadcrumbs);
  }

  if (viewMode === 'review' || currentStepNumber === 9) {
    return renderReviewScreen(breadcrumbs);
  }

  return renderQuestionStep(breadcrumbs);
}

/**
 * A. Entry Experience
 */
function renderEntryScreen(breadcrumbs, hasSavedAnswers, savedState) {
  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="finder-wizard-container text-center" style="max-width: 760px; margin: var(--space-8) auto var(--space-16);">
        <span class="section-kicker block mb-2">Private Horological Consultation</span>
        <h1 class="heading-1 font-serif mb-4" style="font-size: var(--text-4xl); line-height: 1.15;">
          Find the Watch That Speaks to You.
        </h1>
        <p class="body-muted mb-8 text-base mx-auto" style="max-width: 600px; line-height: 1.7;">
          Every collector has a different relationship with time. Tell us what matters to you, and discover timepieces that match your taste across manufacture pedigree, propulsion architecture, and wrist presence.
        </p>

        <div class="flex items-center justify-center gap-4 flex-wrap mb-10">
          <button type="button" class="btn btn-primary btn-lg" id="startFinderBtn">
            <span>Begin Your Selection</span>
            ${ICONS.arrowRight}
          </button>

          ${hasSavedAnswers ? `
            <button type="button" class="btn btn-outline btn-lg" id="resumeFinderBtn">
              <span>Resume Last Selection</span>
            </button>
          ` : ''}
        </div>

        ${hasSavedAnswers ? `
          <div class="p-6 bg-surface border text-left" style="border-color: var(--border-subtle); border-radius: var(--radius-sm); max-width: 600px; margin: 0 auto;">
            <div class="flex items-center justify-between mb-3">
              <span class="font-mono text-xs text-accent uppercase tracking-wider">Saved Selection Profile</span>
              <button type="button" class="btn btn-ghost btn-xs text-muted" id="clearSavedProfileBtn">Clear</button>
            </div>
            <div class="flex items-center gap-2 flex-wrap mb-2">
              ${Object.entries(savedState.lastAnswers).map(([k, v]) => {
                if (!v || v === 'any' || v === 'all' || v === 'flexible') return '';
                return `<span class="badge badge-subtle font-mono text-xs">${escapeHTML(String(v))}</span>`;
              }).join('')}
            </div>
            <span class="font-mono text-xs text-muted">Completed: ${new Date(savedState.lastCompletedAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * B. 9-Step Guided Questionnaire (Steps 1–8)
 */
function renderQuestionStep(breadcrumbs) {
  const totalQuestions = 8;
  const question = FINDER_QUESTIONS[currentStepNumber - 1];
  const progressPercent = Math.round((currentStepNumber / 9) * 100);
  const activeAnswer = userAnswers[question.id] || null;

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="finder-wizard-container">
        <!-- Stepper Indicator Header -->
        <div class="finder-stepper-header">
          <div class="finder-step-meta">
            <span class="text-accent font-bold font-mono">
              Step 0${currentStepNumber} / 09 &bull; ${escapeHTML(question.title)}
            </span>
            <span class="text-muted font-mono">
              ${progressPercent}% Complete
            </span>
          </div>

          <div class="finder-progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
            <div class="finder-progress-bar" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- Step Pill Trail for Direct Navigation -->
          <div class="finder-step-pills" role="tablist" aria-label="Consultation steps">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
              const isDone = num < currentStepNumber || (num <= 8 && userAnswers[FINDER_QUESTIONS[num - 1]?.id]);
              const isActive = num === currentStepNumber;
              const stateClass = isActive ? 'active' : (isDone ? 'completed' : '');
              return `
                <button type="button" class="finder-step-pill ${stateClass}" data-step-jump="${num}" aria-label="Step ${num}">
                  ${num === 9 ? 'Review' : `0${num}`}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Question Card -->
        <div class="finder-question-card">
          <span class="section-kicker block text-center mb-1">Horological Consultation</span>
          <h2 class="finder-question-title" id="questionTitle">${escapeHTML(question.title)}</h2>
          <p class="finder-question-subtitle">${escapeHTML(question.subtitle)}</p>

          <div class="finder-options-grid" role="radiogroup" aria-labelledby="questionTitle">
            ${question.options.map(opt => {
              const isSelected = activeAnswer === opt.id;
              return `
                <button type="button" class="finder-option-btn ${isSelected ? 'selected' : ''}" data-option-id="${opt.id}" role="radio" aria-checked="${isSelected}">
                  <div class="finder-option-top">
                    <span class="finder-option-label">${escapeHTML(opt.label)}</span>
                    <span class="finder-radio-indicator"></span>
                  </div>
                  <span class="finder-option-desc">${escapeHTML(opt.desc)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Navigation Toolbar -->
          <div class="finder-nav-toolbar">
            <div>
              ${currentStepNumber > 1 ? `
                <button type="button" class="btn btn-outline btn-sm" id="finderPrevBtn">
                  &larr; Back
                </button>
              ` : `
                <button type="button" class="btn btn-ghost btn-sm text-muted" id="finderExitBtn">
                  Exit
                </button>
              `}
            </div>

            <div class="flex items-center gap-3">
              <button type="button" class="btn btn-ghost btn-sm text-muted" id="finderSkipBtn">
                Skip
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="finderNextBtn">
                <span>${currentStepNumber === 8 ? 'Review Selections' : 'Next Step'}</span>
                ${ICONS.arrowRight}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Step 9: Final Review Screen
 */
function renderReviewScreen(breadcrumbs) {
  const summaryRows = [
    { step: 1, label: 'Manufacturer', answer: userAnswers.brand || 'Open to All Four Houses' },
    { step: 2, label: 'Investment Budget', answer: formatBudgetAnswer(userAnswers.budget) },
    { step: 3, label: 'Horological Typology', answer: userAnswers.type || 'No Preference' },
    { step: 4, label: 'Propulsion Philosophy', answer: userAnswers.movement || 'No Preference' },
    { step: 5, label: 'Case Proportions', answer: userAnswers.caseSize || 'No Preference' },
    { step: 6, label: 'Curatorial Character', answer: userAnswers.style || 'No Preference' },
    { step: 7, label: 'Physical Condition', answer: userAnswers.condition || 'Any Condition' },
    { step: 8, label: 'Box & Papers', answer: formatOwnershipAnswer(userAnswers.ownership) }
  ];

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="finder-wizard-container" style="max-width: 760px; margin: 0 auto;">
        <!-- Stepper Header -->
        <div class="finder-stepper-header">
          <div class="finder-step-meta">
            <span class="text-accent font-bold font-mono">Step 09 / 09 &bull; Review Your Preferences</span>
            <span class="text-muted font-mono">100% Ready</span>
          </div>
          <div class="finder-progress-track">
            <div class="finder-progress-bar" style="width: 100%;"></div>
          </div>
        </div>

        <div class="finder-question-card">
          <span class="section-kicker block text-center mb-1">Final Verification</span>
          <h2 class="finder-question-title">Review Your Horological Profile</h2>
          <p class="finder-question-subtitle">
            Examine your selected preferences across all eight dimensions before generating recommendations.
          </p>

          <div class="flex flex-col gap-3 mb-8">
            ${summaryRows.map(row => `
              <div class="p-3 bg-secondary border flex items-center justify-between" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
                <div>
                  <span class="font-mono text-xs text-muted block uppercase">${row.step}. ${escapeHTML(row.label)}</span>
                  <span class="font-sans font-semibold text-sm text-primary">${escapeHTML(String(row.answer))}</span>
                </div>
                <button type="button" class="btn btn-ghost btn-xs text-accent edit-step-btn" data-step-target="${row.step}">
                  Edit
                </button>
              </div>
            `).join('')}
          </div>

          <div class="finder-nav-toolbar">
            <button type="button" class="btn btn-outline btn-sm" id="finderBackTo8Btn">
              &larr; Back to Step 8
            </button>

            <button type="button" class="btn btn-primary btn-md" id="discoverMyWatchesBtn">
              <span>Discover My Watches</span>
              ${ICONS.arrowRight}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function formatBudgetAnswer(val) {
  if (!val || val === 'flexible') return 'Flexible Budget (All Tiers)';
  if (val === 'under-5l') return 'Under ₹5 Lakh';
  if (val === '5-10l') return '₹5 – 10 Lakh';
  if (val === '10-25l') return '₹10 – 25 Lakh';
  if (val === 'above-25l') return 'Above ₹25 Lakh';
  return val;
}

function formatOwnershipAnswer(val) {
  if (!val || val === 'any') return 'No Preference';
  if (val === 'both-required') return 'Both Required (Strict Full Set)';
  if (val === 'prefer-both') return 'Prefer Both Box & Papers';
  if (val === 'not-essential') return 'Not Essential (Inspection Guaranteed)';
  return val;
}

/**
 * C & D. Results & No-Match Screens
 */
function renderResultsScreen(breadcrumbs) {
  const evaluation = evaluateRecommendations(userAnswers, WATCHES);
  const total = evaluation.totalCount;

  // If strict constraints produced 0 results, render the consultative No-Match screen
  if (total === 0) {
    return renderNoMatchScreen(breadcrumbs, evaluation);
  }

  const { exactMatches, strongMatches, alternativeSuggestions } = evaluation;

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="finder-results-header">
        <span class="section-kicker">Curated Recommendation Analysis</span>
        <h1 class="heading-1 font-serif mb-2">Your Selection</h1>
        <p class="body-muted max-w-narrow mx-auto mb-4">
          Found <strong>${total} timepiece${total > 1 ? 's' : ''}</strong> matching your horological preferences.
        </p>

        <!-- Active preference summary pills -->
        <div class="flex items-center justify-center gap-2 flex-wrap mb-6">
          ${Object.entries(userAnswers).map(([k, v]) => {
            if (!v || v === 'any' || v === 'all' || v === 'flexible') return '';
            return `<span class="badge badge-subtle font-mono text-xs">${escapeHTML(String(v))}</span>`;
          }).join('')}
        </div>

        <div class="flex items-center justify-center gap-3 flex-wrap mb-10">
          <button type="button" class="btn btn-outline btn-sm" id="editPreferencesBtn">
            <span>Edit Preferences</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="saveFinderProfileBtn">
            ${ICONS.heart}
            <span>Save to Profile</span>
          </button>
          <button type="button" class="btn btn-ghost btn-sm text-muted" id="clearRestartFinderBtn">
            Clear &amp; Restart
          </button>
        </div>
      </div>

      <!-- EXACT MATCHES SECTION -->
      ${exactMatches.length > 0 ? `
        <div class="mb-12">
          <div class="flex items-center justify-between mb-4 border-bottom pb-2" style="border-color: var(--border-subtle);">
            <div>
              <span class="section-kicker">100% Alignment</span>
              <h3 class="heading-3">Exact Matches (${exactMatches.length})</h3>
            </div>
            <span class="font-mono text-xs text-accent">All Criteria Fully Satisfied</span>
          </div>
          <div class="watch-grid">
            ${exactMatches.map(item => renderFinderWatchCard(item, 'exact')).join('')}
          </div>
        </div>
      ` : ''}

      <!-- STRONG MATCHES SECTION -->
      ${strongMatches.length > 0 ? `
        <div class="mb-12">
          <div class="flex items-center justify-between mb-4 border-bottom pb-2" style="border-color: var(--border-subtle);">
            <div>
              <span class="section-kicker">High Alignment</span>
              <h3 class="heading-3">Strong Matches (${strongMatches.length})</h3>
            </div>
            <span class="font-mono text-xs text-muted">70% – 94% Alignment</span>
          </div>
          <div class="watch-grid">
            ${strongMatches.map(item => renderFinderWatchCard(item, 'strong')).join('')}
          </div>
        </div>
      ` : ''}

      <!-- ALTERNATIVE SUGGESTIONS -->
      ${alternativeSuggestions.length > 0 ? `
        <div class="mb-12">
          <div class="flex items-center justify-between mb-4 border-bottom pb-2" style="border-color: var(--border-subtle);">
            <div>
              <span class="section-kicker">Broader Considerations</span>
              <h3 class="heading-3">Alternative Suggestions (${alternativeSuggestions.length})</h3>
            </div>
            <span class="font-mono text-xs text-muted">50% – 69% Alignment</span>
          </div>
          <div class="watch-grid">
            ${alternativeSuggestions.map(item => renderFinderWatchCard(item, 'alternative')).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * No-Match Screen (Constraint Relaxation Guidance)
 */
function renderNoMatchScreen(breadcrumbs, evaluation) {
  const eliminated = evaluation.eliminatedBy;

  return `
    <div class="container section-spacer">
      ${createBreadcrumb(breadcrumbs)}

      <div class="empty-state" style="margin-top: var(--space-8); margin-bottom: var(--space-12); max-width: 680px;">
        <div class="empty-state-icon">${ICONS.filter}</div>
        <h2 class="heading-2 mb-3">No Timepieces Match Your Exact Constraints</h2>
        <p class="body-muted mb-6" style="line-height: 1.6;">
          Your current hard constraints eliminated all available demonstration timepieces in our observatory vault.
        </p>

        <!-- Constraint Diagnostic Breakdown -->
        <div class="p-4 bg-secondary border mb-6 text-left" style="border-color: var(--border-subtle); border-radius: var(--radius-xs);">
          <span class="font-mono text-xs text-accent uppercase block mb-2">Elimination Breakdown:</span>
          <ul class="text-xs text-secondary flex flex-col gap-2 pl-4">
            ${eliminated.budget > 0 ? `<li><strong>Investment Range:</strong> Your budget bracket eliminated ${eliminated.budget} candidate references.</li>` : ''}
            ${eliminated.ownership > 0 ? `<li><strong>Ownership Requirement:</strong> The strict "Both Required (Box & Papers)" requirement eliminated ${eliminated.ownership} references.</li>` : ''}
          </ul>
        </div>

        <!-- Relaxation Actions -->
        <div class="flex items-center justify-center gap-3 flex-wrap mb-8">
          ${eliminated.budget > 0 ? `
            <button type="button" class="btn btn-outline btn-sm" id="relaxBudgetBtn">
              Relax Budget to Flexible
            </button>
          ` : ''}
          ${eliminated.ownership > 0 ? `
            <button type="button" class="btn btn-outline btn-sm" id="relaxOwnershipBtn">
              Relax Box &amp; Papers Requirement
            </button>
          ` : ''}
          <button type="button" class="btn btn-secondary btn-sm" id="showAlternativeSuggestionsBtn">
            Show Alternative Suggestions
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="editPreferencesNoMatchBtn">
            Edit Preferences
          </button>
        </div>

        <a href="#/collection" class="btn btn-ghost btn-sm">
          <span>Browse Complete 24-Reference Collection</span>
          ${ICONS.arrowRight}
        </a>
      </div>
    </div>
  `;
}

function renderFinderWatchCard(item, tier) {
  const { watch, matchPercentage, matchSentence } = item;
  const imgUrl = resolveAsset(watch.image || watch.imageUrl, { title: watch.brand, subtitle: watch.model });
  const priceDisplay = formatPrice(watch.price);
  const detailUrl = `#/watch/${watch.slug || watch.id}`;
  const inWishlist = store.isInWishlist(watch.id);
  const inCompare = store.isInCompare(watch.id);

  let badgeStyle = 'background: rgba(52, 211, 153, 0.15); color: #34D399; border: 1px solid rgba(52, 211, 153, 0.3);';
  if (tier === 'strong') {
    badgeStyle = 'background: var(--accent-subtle); color: var(--accent-primary); border: 1px solid rgba(56, 189, 248, 0.3);';
  } else if (tier === 'alternative') {
    badgeStyle = 'background: rgba(166, 178, 194, 0.15); color: var(--text-secondary); border: 1px solid var(--border-subtle);';
  }

  return `
    <article class="card-watch" data-watch-id="${watch.id}">
      <div class="card-watch-media">
        <div class="card-watch-status" style="display:flex;gap:4px;">
          <span class="finder-match-badge" style="${badgeStyle}">
            ${matchPercentage}% Match
          </span>
          ${createStatusBadge(watch.condition || 'Excellent')}
        </div>

        <div class="card-watch-actions">
          <button type="button" class="action-badge-btn ${inWishlist ? 'active' : ''}" data-action="finder-wishlist" data-id="${watch.id}" aria-label="Save ${escapeHTML(watch.model)}" title="Save to Wishlist">
            ${inWishlist ? ICONS.heartFilled : ICONS.heart}
          </button>
          <button type="button" class="action-badge-btn ${inCompare ? 'active' : ''}" data-action="finder-compare" data-id="${watch.id}" aria-label="${inCompare ? 'In Comparison' : 'Add to Comparison'}" title="${inCompare ? 'In Comparison' : 'Add to Comparison'}">
            ${ICONS.scale}
          </button>
        </div>

        <a href="${detailUrl}" class="card-watch-img-link" aria-label="View details of ${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}">
          <img src="${imgUrl}" alt="${escapeHTML(watch.brand)} ${escapeHTML(watch.model)}" class="card-watch-img" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/hero/hero-home-primary-16x9.jpg';">
        </a>
      </div>

      <div class="card-watch-body">
        <div class="flex items-center justify-between mb-1">
          <span class="card-watch-brand">${escapeHTML(watch.brand)}</span>
          <span class="card-watch-condition-pill">${escapeHTML(watch.condition || 'Excellent')}</span>
        </div>

        <h3 class="card-watch-title">
          <a href="${detailUrl}">${escapeHTML(watch.model)}</a>
        </h3>

        <p class="card-watch-ref">Ref. ${escapeHTML(watch.reference || watch.referenceNumber || 'N/A')} &bull; ${watch.year || 2022}</p>

        <!-- Factual match explanation sentence and score breakdown -->
        <div class="finder-score-breakdown mt-2 mb-3">
          <p class="font-mono text-xs text-accent" style="line-height: 1.4;">
            ${escapeHTML(matchSentence)}
          </p>
        </div>

        <div class="card-watch-specs">
          <span>${watch.caseSizeMm || 40} mm</span>
          <span>&bull;</span>
          <span>${escapeHTML(watch.movementType || 'Automatic')}</span>
          <span>&bull;</span>
          <span>${escapeHTML(watch.documentationCategory || 'Box & Papers')}</span>
        </div>

        <div class="card-watch-footer mt-auto pt-3 border-top" style="border-color: var(--border-subtle);">
          <div>
            <div class="card-watch-price">${priceDisplay}</div>
            <span class="card-watch-demo-label">${escapeHTML(watch.availability || 'Available')}</span>
          </div>
          <div class="flex items-center gap-2">
            <a href="${detailUrl}" class="btn btn-outline btn-xs">View Watch</a>
            <button type="button" class="btn btn-secondary btn-xs" data-action="finder-enquire" data-id="${watch.id}">Enquire</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function mount(ctx) {
  // Entry Screen Handlers
  document.getElementById('startFinderBtn')?.addEventListener('click', () => {
    userAnswers = {};
    currentStepNumber = 1;
    viewMode = 'question';
    renderAndReplace();
  });

  document.getElementById('resumeFinderBtn')?.addEventListener('click', () => {
    const saved = store.getFinderState();
    if (saved?.lastAnswers) {
      userAnswers = { ...saved.lastAnswers };
      viewMode = 'results';
      renderAndReplace();
    }
  });

  document.getElementById('clearSavedProfileBtn')?.addEventListener('click', () => {
    store.clearFinderState();
    renderAndReplace();
  });

  // Question Option Button Handler
  document.querySelectorAll('.finder-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = FINDER_QUESTIONS[currentStepNumber - 1];
      const optId = btn.getAttribute('data-option-id');
      if (q && optId) {
        userAnswers[q.id] = optId;

        document.querySelectorAll('.finder-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      }
    });
  });

  function jumpToStep(targetStep) {
    if (targetStep === 9) {
      viewMode = 'review';
    } else if (targetStep >= 1 && targetStep <= 8) {
      currentStepNumber = targetStep;
      viewMode = 'question';
    }
    renderAndReplace();
  }

  // Step Pills Direct Jump Handlers
  document.querySelectorAll('[data-step-jump]').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetStep = parseInt(pill.getAttribute('data-step-jump'), 10);
      jumpToStep(targetStep);
    });
  });

  // Next Step Button
  document.getElementById('finderNextBtn')?.addEventListener('click', () => {
    const q = FINDER_QUESTIONS[currentStepNumber - 1];
    if (!userAnswers[q.id]) {
      userAnswers[q.id] = 'any';
    }

    if (currentStepNumber < 8) {
      currentStepNumber++;
      viewMode = 'question';
    } else {
      viewMode = 'review';
    }
    renderAndReplace();
  });

  // Previous Step Button
  document.getElementById('finderPrevBtn')?.addEventListener('click', () => {
    if (currentStepNumber > 1) {
      currentStepNumber--;
      viewMode = 'question';
      renderAndReplace();
    }
  });

  // Skip Step Button
  document.getElementById('finderSkipBtn')?.addEventListener('click', () => {
    const q = FINDER_QUESTIONS[currentStepNumber - 1];
    userAnswers[q.id] = 'any';

    if (currentStepNumber < 8) {
      currentStepNumber++;
      viewMode = 'question';
    } else {
      viewMode = 'review';
    }
    renderAndReplace();
  });

  // Exit Consultation
  document.getElementById('finderExitBtn')?.addEventListener('click', () => {
    viewMode = 'entry';
    renderAndReplace();
  });

  // Step 9: Review Screen Handlers
  document.querySelectorAll('.edit-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step-target'), 10);
      if (targetStep >= 1 && targetStep <= 8) {
        currentStepNumber = targetStep;
        viewMode = 'question';
        renderAndReplace();
      }
    });
  });

  document.getElementById('finderBackTo8Btn')?.addEventListener('click', () => {
    currentStepNumber = 8;
    viewMode = 'question';
    renderAndReplace();
  });

  document.getElementById('discoverMyWatchesBtn')?.addEventListener('click', () => {
    viewMode = 'results';
    store.saveFinderState(userAnswers);
    renderAndReplace();
  });

  // Results Actions
  document.getElementById('editPreferencesBtn')?.addEventListener('click', () => {
    viewMode = 'review';
    renderAndReplace();
  });

  document.getElementById('saveFinderProfileBtn')?.addEventListener('click', () => {
    store.saveFinderState(userAnswers);
  });

  document.getElementById('clearRestartFinderBtn')?.addEventListener('click', () => {
    userAnswers = {};
    currentStepNumber = 1;
    viewMode = 'entry';
    store.clearFinderState();
    renderAndReplace();
  });

  // No-Match Relaxation Handlers
  document.getElementById('relaxBudgetBtn')?.addEventListener('click', () => {
    userAnswers.budget = 'flexible';
    store.saveFinderState(userAnswers);
    renderAndReplace();
  });

  document.getElementById('relaxOwnershipBtn')?.addEventListener('click', () => {
    userAnswers.ownership = 'any';
    store.saveFinderState(userAnswers);
    renderAndReplace();
  });

  document.getElementById('showAlternativeSuggestionsBtn')?.addEventListener('click', () => {
    userAnswers.budget = 'flexible';
    userAnswers.ownership = 'any';
    store.saveFinderState(userAnswers);
    renderAndReplace();
  });

  document.getElementById('editPreferencesNoMatchBtn')?.addEventListener('click', () => {
    viewMode = 'review';
    renderAndReplace();
  });

  // Wishlist Toggle in Results
  document.querySelectorAll('[data-action="finder-wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if (id) {
        const isSaved = store.toggleWishlist(id);
        btn.classList.toggle('active', isSaved);
        btn.innerHTML = isSaved ? ICONS.heartFilled : ICONS.heart;
      }
    });
  });

  // Compare Toggle in Results
  document.querySelectorAll('[data-action="finder-compare"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if (id) {
        const res = store.toggleCompare(id);
        if (res.success) {
          btn.classList.toggle('active', res.added);
        } else if (res.reason === 'limit_reached') {
          openCompareLimitModal(id, store.getCompareList());
        }
      }
    });
  });

  // Enquiry Modal in Results
  document.querySelectorAll('[data-action="finder-enquire"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const watch = getWatchById(id);
      if (watch) {
        openEnquiryModal(watch);
      }
    });
  });

  async function renderAndReplace() {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = await render(ctx);
      mount(ctx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
