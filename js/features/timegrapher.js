// HOROLOGY — Timegrapher Visualizer Engine
// Generates the acoustic twin-trace dot pattern seen on Witschi timing equipment

export class TimegrapherScreen {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.rate = options.rate || +2; // s/day
    this.beatError = options.beatError || 0.1; // ms
    this.amplitude = options.amplitude || 275;
    this.vph = options.vph || 28800;

    this.points = [];
    this.maxPoints = 200;
    this.currentX = 0;
    this.animationId = null;
    this.lastTick = performance.now();
    this.tickInterval = (3600 / this.vph) * 1000; // ms per beat
  }

  setParameters({ rate, beatError, amplitude, vph }) {
    if (rate !== undefined) this.rate = rate;
    if (beatError !== undefined) this.beatError = beatError;
    if (amplitude !== undefined) this.amplitude = amplitude;
    if (vph !== undefined) {
      this.vph = vph;
      this.tickInterval = (3600 / this.vph) * 1000;
    }
  }

  start() {
    this.points = [];
    this.currentX = 0;
    this.lastTick = performance.now();
    this.loop(performance.now());
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  loop(timestamp) {
    if (timestamp - this.lastTick >= Math.min(60, this.tickInterval * 4)) {
      this.addPoint();
      this.lastTick = timestamp;
    }

    this.render();
    this.animationId = requestAnimationFrame((t) => this.loop(t));
  }

  addPoint() {
    const height = this.canvas.height;
    const centerY = height / 2;

    // Rate determines slope (seconds per day tilt)
    const slopeOffset = -(this.rate * 0.45);
    // Beat error determines spacing between the two tick traces (impulse A and impulse B)
    const traceGap = this.beatError * 22;

    const baseOffset = (this.currentX * slopeOffset * 0.05) % (height * 0.4);
    const noise = (Math.random() - 0.5) * 1.5;

    this.points.push({
      x: this.currentX,
      y1: centerY + baseOffset - traceGap / 2 + noise,
      y2: centerY + baseOffset + traceGap / 2 + noise
    });

    this.currentX += 3;
    if (this.currentX > this.canvas.width) {
      this.currentX = 0;
      this.points = [];
    }
  }

  render() {
    const { ctx, canvas } = this;
    const width = canvas.width;
    const height = canvas.height;

    // Dark terminal canvas
    ctx.fillStyle = '#030810';
    ctx.fillRect(0, 0, width, height);

    // Subtle horizontal grid lines
    ctx.strokeStyle = 'rgba(38, 58, 80, 0.4)';
    ctx.lineWidth = 1;
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw acoustic tick points
    for (const pt of this.points) {
      ctx.fillStyle = '#2DD4BF'; // Emerald phosphor
      ctx.beginPath();
      ctx.arc(pt.x, pt.y1, 1.4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#38BDF8'; // Electric ice cyan
      ctx.beginPath();
      ctx.arc(pt.x, pt.y2, 1.4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Grid center line
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
