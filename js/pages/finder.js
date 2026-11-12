// HOROLOGY — Watch Finder 6-Step Wizard Route Module (Panel 08)
import { FINDER_QUESTIONS } from '../data/finderQuestions.js';
import { scoreWatchesForFinder } from '../features/finderScoring.js';
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { renderWatchCard } from '../components/watchCard.js';
import { icons } from '../utils/svgIcons.js';
import { store } from '../core/store.js';
import { showToast } from '../components/toast.js';
import { openQuickView } from '../components/quickView.js';

export const finderPage = {
  id: 'finder',
  path: '/finder',
  title: 'Watch Finder — Personalized Horological Advisor',

  state: {
    currentStep: 1,
    answers: {},
    isFinished: false
  },

  render() {
    if (this.state.isFinished) {
      return this.renderResults();
    }

    const currentQ = FINDER_QUESTIONS[this.state.currentStep - 1];
    const selectedOption = this.state.answers[currentQ.id];

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Watch Finder' }
        ])}

        <div class="text-center section-title-wrap" style="max-width: 680px; margin: 0 auto var(--space-10);">
          <span class="overline">Guided Discovery Algorithm</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Find Your Defining Timepiece</h1>
          <p style="margin-top: var(--space-2);">
            A 6-step personalized assessment matching your budget, wrist ergonomics, movement preference, and collecting thesis with our certified vault inventory.
          </p>
        </div>

        <div class="finder-card">
          <!-- Stepper Nodes (Panel 08) -->
          <nav class="stepper-nav" aria-label="Wizard Steps">
            ${FINDER_QUESTIONS.map(q => {
              const isPast = q.step < this.state.currentStep;
              const isActive = q.step === this.state.currentStep;
              return `
                <div class="step-node ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}">
                  <div class="step-circle">${isPast ? icons.check('', 14) : q.step}</div>
                  <span class="step-label" style="display: none;">${q.id}</span>
                </div>
              `;
            }).join('')}
          </nav>

          <!-- Current Question Content -->
          <div style="margin-bottom: var(--space-6);">
            <span class="overline">Step ${currentQ.step} of 6 &bull; ${currentQ.id}</span>
            <h2 style="font-size: var(--text-2xl); margin: var(--space-2) 0 var(--space-1);">${currentQ.title}</h2>
            <p style="font-size: var(--text-sm); color: var(--color-text-muted);">${currentQ.subtitle}</p>
          </div>

          <!-- Options Grid -->
          <div class="finder-options-grid">
            ${currentQ.options.map(opt => {
              const isSelected = selectedOption && selectedOption.id === opt.id;
              return `
                <button 
                  type="button"
                  class="finder-option-btn ${isSelected ? 'selected' : ''}" 
                  data-opt-id="${opt.id}">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="font-size: var(--text-base); color: var(--color-text-primary);">${opt.label}</strong>
                    ${isSelected ? `<span style="color: var(--color-accent-primary);">${icons.check('', 16)}</span>` : ''}
                  </div>
                  <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${opt.desc}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Wizard Navigation Controls -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-6); margin-top: var(--space-6);">
            ${this.state.currentStep > 1 ? `
              <button class="btn btn-outline" id="finderBackBtn">
                &larr; Previous Step
              </button>
            ` : '<div></div>'}

            <button class="btn btn-primary btn-lg" id="finderNextBtn" ${!selectedOption ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
              ${this.state.currentStep === 6 ? 'View Recommendations' : 'Next Question'} ${icons.arrowRight('', 16)}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderResults() {
    const scoredResults = scoreWatchesForFinder(this.state.answers);
    const topMatches = scoredResults.slice(0, 6);

    return `
      <div class="container section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'Watch Finder', href: '#/finder' },
          { label: 'Results' }
        ])}

        <div class="section-title-wrap">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <span class="overline">Algorithm Curation</span>
              <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">Your Matched Timepieces</h1>
            </div>
            <button class="btn btn-outline btn-sm" id="restartFinderBtn">
              Restart Questionnaire
            </button>
          </div>
          <p style="max-width: 680px; margin-top: var(--space-2);">
            Based on your parameters, our horological matching engine has ranked the most aligned chronometers from our certified vault.
          </p>
        </div>

        <div class="watch-grid">
          ${topMatches.map(res => `
            <div>
              <div style="margin-bottom: var(--space-2); display: flex; justify-content: space-between; align-items: baseline;">
                <span class="badge badge-verified" style="font-family: var(--font-mono); font-size: 11px;">
                  ${res.score}% Match
                </span>
                <span style="font-size: var(--text-xs); color: var(--color-accent-primary);">
                  ${res.matchReasons[0] || 'Curated Fit'}
                </span>
              </div>
              ${renderWatchCard(res.watch)}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  mount(ctx) {
    const container = document.getElementById('app');
    if (!container) return;

    if (this.state.isFinished) {
      document.getElementById('restartFinderBtn')?.addEventListener('click', () => {
        this.state = {
          currentStep: 1,
          answers: {},
          isFinished: false
        };
        ctx.router.handleRouting();
      });

      // Card click handling in results
      this.cardHandler = (e) => {
        const target = e.target;
        const wishlistBtn = target.closest('[data-action="wishlist"]');
        if (wishlistBtn) {
          e.preventDefault();
          e.stopPropagation();
          const id = wishlistBtn.dataset.id;
          const isSaved = store.toggleWishlist(id);
          wishlistBtn.classList.toggle('active', isSaved);
          wishlistBtn.innerHTML = icons.heart('', 16, isSaved);
          showToast(isSaved ? 'Added to Wishlist' : 'Removed from Wishlist');
          return;
        }

        const compareBtn = target.closest('[data-action="compare"]');
        if (compareBtn) {
          e.preventDefault();
          e.stopPropagation();
          const id = compareBtn.dataset.id;
          const isComparing = store.toggleCompare(id);
          compareBtn.classList.toggle('active', isComparing);
          showToast(isComparing ? 'Added to Comparison' : 'Removed from Comparison');
          return;
        }

        const quickBtn = target.closest('[data-action="quickview"]');
        if (quickBtn) {
          e.preventDefault();
          e.stopPropagation();
          openQuickView(quickBtn.dataset.id);
          return;
        }
      };

      container.addEventListener('click', this.cardHandler);
      return;
    }

    const currentQ = FINDER_QUESTIONS[this.state.currentStep - 1];

    // Select option
    container.querySelectorAll('.finder-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const optId = btn.dataset.optId;
        const optionObj = currentQ.options.find(o => o.id === optId);
        this.state.answers[currentQ.id] = optionObj;

        // Re-render current step with active state
        ctx.router.handleRouting();
      });
    });

    // Next button
    document.getElementById('finderNextBtn')?.addEventListener('click', () => {
      if (this.state.currentStep < 6) {
        this.state.currentStep++;
      } else {
        this.state.isFinished = true;
      }
      ctx.router.handleRouting();
    });

    // Back button
    document.getElementById('finderBackBtn')?.addEventListener('click', () => {
      if (this.state.currentStep > 1) {
        this.state.currentStep--;
        ctx.router.handleRouting();
      }
    });
  },

  unmount() {
    const container = document.getElementById('app');
    if (container && this.cardHandler) {
      container.removeEventListener('click', this.cardHandler);
    }
  }
};
