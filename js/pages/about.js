// HOROLOGY — About Page Route Module (Panel 14)
import { renderBreadcrumbs } from '../components/breadcrumb.js';
import { icons } from '../utils/svgIcons.js';

export const aboutPage = {
  id: 'about',
  path: '/about',
  title: 'About HOROLOGY — A Different Perspective on Collecting Time',

  render() {
    return `
      <div class="container container-narrow section-spacer" style="padding-top: var(--space-8);">
        ${renderBreadcrumbs([
          { label: 'Home', href: '#/' },
          { label: 'About HOROLOGY' }
        ])}

        <!-- Header (Panel 14) -->
        <div class="section-title-wrap">
          <span class="overline">Founding Manifesto</span>
          <h1 style="font-size: var(--text-4xl); margin-top: var(--space-2);">A Different Perspective on Collecting Time</h1>
          <p style="font-family: var(--font-serif); font-size: var(--text-2xl); font-style: italic; color: var(--color-accent-secondary); margin-top: var(--space-3);">
            "Beyond Time. Beyond Ordinary."
          </p>
        </div>

        <div style="font-size: var(--text-base); line-height: var(--leading-relaxed); color: var(--color-text-secondary); display: flex; flex-direction: column; gap: var(--space-6);">
          <p>
            The traditional secondary watch market has long suffered from information asymmetry. Vague dealer descriptions like <em>"runs great"</em> or <em>"collector owned"</em> replace rigorous empirical measurements. In a market where high-grade replicas simulate visual appearances with alarming fidelity, collectors deserve absolute transparency.
          </p>

          <p>
            <strong>HOROLOGY</strong> was conceived to bring scientific forensic rigor to the pre-owned mechanical chronometer marketplace. Founded by veteran watchmakers and obsessive collectors, we treat each timepiece not as mere luxury retail merchandise, but as an instrument of mechanical physics.
          </p>

          <div style="background: var(--color-bg-card); border-left: 3px solid var(--color-accent-primary); padding: var(--space-6); border-radius: var(--radius-xs); margin: var(--space-4) 0;">
            <p style="font-family: var(--font-serif); font-size: var(--text-xl); font-style: italic; color: var(--color-text-primary);">
              "We believe that every second of balance wheel oscillation should be accounted for. When you acquire a watch from HOROLOGY, you do not just receive a box; you receive empirical proof of its mechanical health."
            </p>
          </div>

          <h2 style="font-size: var(--text-2xl); color: var(--color-text-primary); margin-top: var(--space-6);">Our Three Unbending Tenets</h2>

          <div style="display: flex; flex-direction: column; gap: var(--space-6); margin: var(--space-2) 0;">
            <div style="display: flex; gap: var(--space-4);">
              <div style="width: 38px; height: 38px; border-radius: var(--radius-xs); background: var(--color-bg-surface); border: 1px solid var(--color-border-default); display: flex; align-items: center; justify-content: center; color: var(--color-accent-primary); flex-shrink: 0;">
                ${icons.gauge('', 20)}
              </div>
              <div>
                <strong style="color: var(--color-text-primary); font-size: var(--text-lg); display: block; margin-bottom: var(--space-1);">1. Empirical Data Honesty</strong>
                <p style="font-size: var(--text-sm);">
                  We publish complete Witschi acoustic timegrapher multi-position rates, amplitudes, and beat error metrics for every watch. If a measurement has not been physically validated in our atelier, it is explicitly flagged as uncertified.
                </p>
              </div>
            </div>

            <div style="display: flex; gap: var(--space-4);">
              <div style="width: 38px; height: 38px; border-radius: var(--radius-xs); background: var(--color-bg-surface); border: 1px solid var(--color-border-default); display: flex; align-items: center; justify-content: center; color: var(--color-accent-primary); flex-shrink: 0;">
                ${icons.shield('', 20)}
              </div>
              <div>
                <strong style="color: var(--color-text-primary); font-size: var(--text-lg); display: block; margin-bottom: var(--space-1);">2. Unpolished Preservation Philosophy</strong>
                <p style="font-size: var(--text-sm);">
                  We celebrate original factory case architecture. Over-polishing destroys the sharp chamfers and historical beveling that define a reference. We explicitly disclose all polishing history and prioritize unpolished collector specimens.
                </p>
              </div>
            </div>

            <div style="display: flex; gap: var(--space-4);">
              <div style="width: 38px; height: 38px; border-radius: var(--radius-xs); background: var(--color-bg-surface); border: 1px solid var(--color-border-default); display: flex; align-items: center; justify-content: center; color: var(--color-accent-primary); flex-shrink: 0;">
                ${icons.fileText('', 20)}
              </div>
              <div>
                <strong style="color: var(--color-text-primary); font-size: var(--text-lg); display: block; margin-bottom: var(--space-1);">3. Archival Dossier Certification</strong>
                <p style="font-size: var(--text-sm);">
                  Each timepiece is accompanied by a bound physical and digital Inspection Dossier signed by our master horologist, including serial audits, high-magnification loupe logs, and a 24-month mechanical warranty.
                </p>
              </div>
            </div>
          </div>

          <div style="border-top: 1px solid var(--color-border-hairline); padding-top: var(--space-8); margin-top: var(--space-8); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <span class="overline" style="font-size: 10px;">Private Atelier Head</span>
              <div style="font-family: var(--font-serif); font-size: var(--text-lg); color: var(--color-text-primary);">Laurent Mercier, Lead Master Horologist</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Geneva &bull; Mumbai</div>
            </div>
            <a href="#/collection" class="btn btn-primary">
              Explore Our Vault ${icons.arrowRight('', 16)}
            </a>
          </div>
        </div>
      </div>
    `;
  }
};
