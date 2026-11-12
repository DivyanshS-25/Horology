// HOROLOGY — Dial Gauge Component for Amplitude
export function renderAmplitudeGauge(amplitude = 268, min = 180, max = 340) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.8
  // Angle arc coverage: 270 degrees out of 360
  const arcLength = circumference * 0.75;
  const percentage = Math.max(0, Math.min(1, (amplitude - min) / (max - min)));
  const strokeDashoffset = arcLength - (arcLength * percentage);

  return `
    <div class="gauge-container" role="img" aria-label="Movement amplitude: ${amplitude} degrees">
      <svg class="gauge-svg" viewBox="0 0 180 180">
        <!-- Background Track -->
        <circle 
          cx="90" 
          cy="90" 
          r="${radius}" 
          fill="none" 
          stroke="var(--color-bg-surface)" 
          stroke-width="12"
          stroke-dasharray="${arcLength} ${circumference}"
          stroke-linecap="round"
        />
        <!-- Active Value Track -->
        <circle 
          cx="90" 
          cy="90" 
          r="${radius}" 
          fill="none" 
          stroke="var(--color-accent-primary)" 
          stroke-width="12"
          stroke-dasharray="${arcLength} ${circumference}"
          stroke-dashoffset="${strokeDashoffset}"
          stroke-linecap="round"
          style="transition: stroke-dashoffset 1s ease-out;"
        />
      </svg>
      <div class="gauge-val-overlay">
        <span class="overline" style="font-size: 10px; margin-bottom: 2px;">Amplitude</span>
        <span class="gauge-number">${amplitude}°</span>
        <span class="gauge-sublabel">Within Range</span>
      </div>
    </div>
  `;
}
