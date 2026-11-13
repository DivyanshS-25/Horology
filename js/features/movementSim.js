// HOROLOGY — Movement Lab Interactive Simulation Engine

export const MOVEMENT_PARTS = [
  {
    id: 'mainspring',
    name: 'Mainspring & Barrel',
    x: 100,
    y: 110,
    description: 'The powerhouse of the mechanical watch. An elastic S-shaped coiled spring enclosed in a toothed barrel that stores kinetic energy and gradually releases torque to drive the wheel train.'
  },
  {
    id: 'gear-train',
    name: 'Gear Train (Going Train)',
    x: 180,
    y: 115,
    description: 'A precision transmission gear series (center wheel, third wheel, fourth wheel) with high gear ratios that steps up rotational velocity while stepping down torque.'
  },
  {
    id: 'escapement',
    name: 'Swiss Lever Escapement',
    x: 235,
    y: 185,
    description: 'The gatekeeper of time. Composed of the escape wheel and pallet fork with synthetic ruby jewels, converting rotational energy into calibrated impulse impulses.'
  },
  {
    id: 'balance-wheel',
    name: 'Balance Wheel & Hairspring',
    x: 210,
    y: 250,
    description: 'The heart and harmonic oscillator. Oscillates back and forth at a fixed natural frequency (e.g., 28,800 beats per hour), regulating the exact speed at which the escapement unlocks.'
  },
  {
    id: 'rotor',
    name: 'Oscillating Rotor',
    x: 140,
    y: 230,
    description: 'A semicircular weighted mass mounted on ball bearings that pivots freely with the wearer\'s wrist movement to automatically wind the mainspring in self-winding calibres.'
  }
];

export class MovementSimulator {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.vph = options.vph || 28800; // Beats per hour
    this.amplitude = options.amplitude || 275; // Degrees
    this.isRunning = true;
    this.currentAngle = 0;
    this.animationId = null;
    this.lastTimestamp = performance.now();
  }

  setFrequency(vph) {
    this.vph = vph;
  }

  setAmplitude(amp) {
    this.amplitude = amp;
  }

  start() {
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.loop(performance.now());
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    const delta = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;

    // Beats per second: vph / 3600 (e.g. 28800 / 3600 = 8 Hz = 4 complete oscillation cycles per second)
    const frequencyHz = (this.vph / 3600) / 2;
    // Harmonic oscillation
    const ampRadians = (this.amplitude * Math.PI) / 180;
    this.currentAngle = ampRadians * Math.sin(2 * Math.PI * frequencyHz * (timestamp / 1000));

    this.render();
    this.animationId = requestAnimationFrame((t) => this.loop(t));
  }

  render() {
    const { ctx, canvas } = this;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const balanceRadius = Math.min(width, height) * 0.38;

    // Outer Movement Rim / Mainplate
    ctx.beginPath();
    ctx.arc(cx, cy, balanceRadius * 1.15, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1E324A';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Balance Cock & Bridge
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - balanceRadius * 1.1, cy - balanceRadius * 0.4);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + balanceRadius * 1.1, cy - balanceRadius * 0.4);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.restore();

    // Rotating Balance Wheel
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.currentAngle);

    // Rim
    ctx.beginPath();
    ctx.arc(0, 0, balanceRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Balance Wheel Spokes (3 spokes)
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(balanceRadius * Math.cos(angle), balanceRadius * Math.sin(angle));
      ctx.strokeStyle = '#B9CDE2';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Regulating Screws / Weights on Rim
    for (let i = 0; i < 12; i++) {
      const angle = (i * 2 * Math.PI) / 12;
      const sx = (balanceRadius + 3) * Math.cos(angle);
      const sy = (balanceRadius + 3) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#CBD5E1';
      ctx.fill();
    }

    // Center Incabloc / Ruby Jewel
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, 2 * Math.PI);
    ctx.fillStyle = '#0B192A';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, 2 * Math.PI);
    ctx.fillStyle = '#E11D48'; // Synthetic ruby
    ctx.fill();

    ctx.restore();
  }
}
