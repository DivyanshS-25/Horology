/**
 * HOROLOGY — Interactive Watch Gallery & Accessible Lightbox (Phase 04)
 * Direction C — Midnight Navy Edition
 * Pure Vanilla ES Module
 */

import { resolveAsset } from './assets.js';
import { escapeHtml } from './utilities.js';

export class GalleryController {
  constructor(options = {}) {
    this.container = options.container || null;
    this.items = options.items || [];
    this.currentIndex = 0;
    this.zoomLevel = options.zoomLevel || 2.0;
    this.onIndexChanged = options.onIndexChanged || null;

    // DOM references
    this.stageEl = null;
    this.mainImgEl = null;
    this.loupeEl = null;
    this.counterEl = null;
    this.categoryEl = null;
    this.thumbsContainerEl = null;
    this.lightboxModalEl = null;
    this.lightboxImgEl = null;
    this.lightboxCounterEl = null;

    // Touch tracking
    this.touchStartX = 0;

    // Bound listeners for clean teardown
    this.boundKeyHandler = this.handleKeydown.bind(this);
  }

  /**
   * Initializes the gallery inside the specified container
   */
  init(containerEl) {
    if (containerEl) this.container = containerEl;
    if (!this.container) return;

    this.stageEl = this.container.querySelector('.gallery-stage');
    this.mainImgEl = this.container.querySelector('.gallery-main-img');
    this.loupeEl = this.container.querySelector('.gallery-loupe');
    this.counterEl = this.container.querySelector('.gallery-counter-pill');
    this.categoryEl = this.container.querySelector('.gallery-category-pill');
    this.thumbsContainerEl = this.container.querySelector('.gallery-thumbnails');

    // Lightbox modal references in page
    this.lightboxModalEl = document.getElementById('lightboxModal');
    this.lightboxImgEl = document.getElementById('lightboxImg');
    this.lightboxCounterEl = document.getElementById('lightboxCounter');

    this.bindControls();
    this.bindLoupe();
    this.bindTouchSwipe();
    this.bindLightbox();

    window.addEventListener('keydown', this.boundKeyHandler);
    this.selectIndex(0, false);
  }

  /**
   * Selects an image by index
   */
  selectIndex(idx, triggerCallback = true) {
    if (!this.items || this.items.length === 0) return;

    if (idx < 0) idx = this.items.length - 1;
    if (idx >= this.items.length) idx = 0;

    this.currentIndex = idx;
    const item = this.items[idx];
    const resolvedUrl = resolveAsset(item.assetKey);

    // Update Stage Image with smooth transition
    if (this.mainImgEl) {
      this.mainImgEl.style.opacity = '0';
      setTimeout(() => {
        this.mainImgEl.src = resolvedUrl;
        this.mainImgEl.dataset.zoomSrc = resolvedUrl;
        this.mainImgEl.style.opacity = '1';
        if (this.loupeEl) {
          this.loupeEl.style.backgroundImage = `url("${resolvedUrl}")`;
        }
      }, 120);
    }

    // Update Category Pill
    if (this.categoryEl) {
      this.categoryEl.textContent = `${item.category || 'Studio Angle'} (Illustrative)`;
    }

    // Update Counter Pill
    if (this.counterEl) {
      this.counterEl.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(this.items.length).padStart(2, '0')}`;
    }

    // Update Thumbnails
    if (this.thumbsContainerEl) {
      const thumbs = this.thumbsContainerEl.querySelectorAll('.gallery-thumb');
      thumbs.forEach((t) => {
        const tIdx = parseInt(t.dataset.index, 10);
        if (tIdx === idx) {
          t.classList.add('active');
          t.setAttribute('aria-selected', 'true');
        } else {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        }
      });
    }

    // Update Lightbox if currently open
    if (this.lightboxModalEl && this.lightboxModalEl.style.display !== 'none') {
      if (this.lightboxImgEl) this.lightboxImgEl.src = resolvedUrl;
      if (this.lightboxCounterEl) {
        this.lightboxCounterEl.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(this.items.length).padStart(2, '0')}`;
      }
    }

    if (triggerCallback && typeof this.onIndexChanged === 'function') {
      this.onIndexChanged(idx, item);
    }
  }

  /**
   * Binds click controls (thumbnails, prev/next buttons)
   */
  bindControls() {
    const prevBtn = this.container.querySelector('#galleryPrevBtn');
    const nextBtn = this.container.querySelector('#galleryNextBtn');

    prevBtn?.addEventListener('click', () => this.selectIndex(this.currentIndex - 1));
    nextBtn?.addEventListener('click', () => this.selectIndex(this.currentIndex + 1));

    if (this.thumbsContainerEl) {
      this.thumbsContainerEl.addEventListener('click', (e) => {
        const thumbBtn = e.target.closest('.gallery-thumb');
        if (thumbBtn && thumbBtn.dataset.index !== undefined) {
          const idx = parseInt(thumbBtn.dataset.index, 10);
          this.selectIndex(idx);
        }
      });
    }
  }

  /**
   * Binds interactive Loupe Magnification (desktop crosshair zoom)
   */
  bindLoupe() {
    if (!this.stageEl || !this.loupeEl) return;

    this.stageEl.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024 && this.mainImgEl) {
        this.loupeEl.style.display = 'block';
        this.loupeEl.style.backgroundImage = `url("${this.mainImgEl.src}")`;
      }
    });

    this.stageEl.addEventListener('mouseleave', () => {
      this.loupeEl.style.display = 'none';
    });

    this.stageEl.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      const rect = this.stageEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const loupeWidth = 150;
      const loupeHeight = 150;

      this.loupeEl.style.left = `${x - loupeWidth / 2}px`;
      this.loupeEl.style.top = `${y - loupeHeight / 2}px`;

      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      this.loupeEl.style.backgroundPosition = `${bgX}% ${bgY}%`;
      this.loupeEl.style.backgroundSize = `${rect.width * this.zoomLevel}px ${rect.height * this.zoomLevel}px`;
    });
  }

  /**
   * Binds horizontal touch swipe gestures on touchscreens
   */
  bindTouchSwipe() {
    if (!this.stageEl) return;

    this.stageEl.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    this.stageEl.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - touchEndX;

      if (Math.abs(diff) > 40) {
        if (diff > 0) this.selectIndex(this.currentIndex + 1); // Swipe left -> next
        else this.selectIndex(this.currentIndex - 1);         // Swipe right -> prev
      }
    }, { passive: true });
  }

  /**
   * Binds Full-Screen Accessible Lightbox
   */
  bindLightbox() {
    const triggerBtn = this.container.querySelector('#lightboxTriggerBtn');
    const closeBtn = document.getElementById('lightboxCloseBtn');

    triggerBtn?.addEventListener('click', () => this.openLightbox());
    this.mainImgEl?.addEventListener('dblclick', () => this.openLightbox());

    closeBtn?.addEventListener('click', () => this.closeLightbox());

    this.lightboxModalEl?.addEventListener('click', (e) => {
      if (e.target === this.lightboxModalEl || e.target.id === 'lightboxStage') {
        this.closeLightbox();
      }
    });
  }

  openLightbox() {
    if (!this.lightboxModalEl) return;

    const currentItem = this.items[this.currentIndex];
    const resolvedUrl = resolveAsset(currentItem?.assetKey);

    if (this.lightboxImgEl) this.lightboxImgEl.src = resolvedUrl;
    if (this.lightboxCounterEl) {
      this.lightboxCounterEl.textContent = `${String(this.currentIndex + 1).padStart(2, '0')} / ${String(this.items.length).padStart(2, '0')}`;
    }

    this.lightboxModalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = document.getElementById('lightboxCloseBtn');
    closeBtn?.focus();
  }

  closeLightbox() {
    if (!this.lightboxModalEl) return;
    this.lightboxModalEl.style.display = 'none';
    document.body.style.overflow = '';
  }

  handleKeydown(e) {
    // Ignore key events when typing inside forms
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    if (e.key === 'ArrowLeft') {
      this.selectIndex(this.currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      this.selectIndex(this.currentIndex + 1);
    } else if (e.key === 'Escape') {
      this.closeLightbox();
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.boundKeyHandler);
    this.closeLightbox();
  }
}

