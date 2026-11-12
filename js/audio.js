/**
 * HOROLOGY — Acoustic Tactility Engine (Phase 08)
 * Synthesizes ultra-subtle mechanical horological cues via Web Audio API
 * Strict Rules:
 * 1. OFF by default.
 * 2. Never autoplays on page load.
 * 3. Never plays without explicit user interaction.
 * 4. User preference persisted in localStorage ('horology_audio_enabled').
 * 5. Zero external audio file dependencies.
 */

const AUDIO_STORAGE_KEY = 'horology_audio_enabled';

let audioCtx = null;

/**
 * Check if acoustic feedback is explicitly enabled by the collector
 */
export function isAudioEnabled() {
  try {
    return localStorage.getItem(AUDIO_STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Toggle acoustic feedback state
 */
export function toggleAudio(forceState) {
  const nextState = forceState !== undefined ? Boolean(forceState) : !isAudioEnabled();
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, String(nextState));
  } catch (e) {
    // Silent
  }

  // Dispatch global event for header and controls to sync state
  window.dispatchEvent(new CustomEvent('horology-audio-toggled', { detail: { enabled: nextState } }));

  if (nextState) {
    // Play a gentle confirmation click upon activation
    playMechanicalClick(1800, 0.02);
  }

  return nextState;
}

/**
 * Lazy-initialize Web Audio Context on first direct user gesture
 */
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play an ultra-subtle mechanical chronometer click
 * Simulates a fine Swiss crown detent click or pallet impulse
 */
export function playMechanicalClick(frequency = 2200, duration = 0.018) {
  if (!isAudioEnabled()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // High frequency bandpass filter for metallic crispness
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(frequency, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration);

    // Micro envelope — virtually inaudible whisper of metal
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    // Audio restrictions handled silently
  }
}

/**
 * Play a delicate escapement tick feedback
 */
export function playWindingTick() {
  if (!isAudioEnabled()) return;
  playMechanicalClick(3200, 0.012);
}

/**
 * Attach global listener to interactive elements when audio is enabled
 */
export function initGlobalAcoustics() {
  document.addEventListener('click', (e) => {
    if (!isAudioEnabled()) return;

    // Trigger subtle click for buttons, nav links, filters, and cards
    const target = e.target.closest('button, .btn, .card-watch, .nav-link, .filter-chip, [data-action]');
    if (target) {
      playMechanicalClick(2400, 0.015);
    }
  }, { passive: true });
}

