// HOROLOGY — Collector's Journal Data
export const ARTICLES = [
  {
    id: 'understanding-watch-amplitude',
    slug: 'understanding-watch-amplitude',
    title: 'Understanding Watch Amplitude: The Pulse of Mechanical Health',
    category: 'Movements',
    readTimeMinutes: 8,
    date: '2026-10-15',
    author: 'Master Horologist Laurent Mercier',
    summary: 'Why balance wheel amplitude is the single most diagnostic metric of a movement\'s physical condition, lubrication integrity, and escapement efficiency.',
    heroVisualType: 'amplitude',
    content: `
      <p class="mb-4">When evaluating a fine mechanical timepiece on a timing machine (timegrapher), collectors often focus immediately on the daily rate: <em>"+2 seconds per day"</em>. Yet to an experienced horologist, the rate is merely the surface symptom. The true vital sign of mechanical health is <strong>amplitude</strong>.</p>

      <h3 class="mb-3 mt-6">What is Balance Wheel Amplitude?</h3>
      <p class="mb-4">Amplitude is the maximum angle of rotation of the balance wheel in either direction from its resting equilibrium position, measured in degrees of arc (°). In a healthy modern movement operating at full wind, the balance wheel should ideally swing between <strong>270° and 315°</strong> in horizontal positions (Dial Up and Dial Down).</p>

      <div class="p-6 my-6" style="background: var(--color-bg-card); border-left: 3px solid var(--color-accent-primary); border-radius: var(--radius-xs);">
        <p style="color: var(--color-text-primary); font-family: var(--font-serif); font-size: 1.15rem; font-style: italic;">"A watch can be regulated to show +0 seconds per day even with dried oils and an unhealthy amplitude of 210°. But it will stop under the slightest shock. Amplitude never lies."</p>
      </div>

      <h3 class="mb-3 mt-6">Reading Positional Drop</h3>
      <p class="mb-4">When a watch transitions from horizontal positions (Dial Up) to vertical positions (Crown Up or Crown Down), friction on the balance staff pivots increases because the staff rests on its cylindrical wall rather than its endstone. In a premier manufacture movement, this positional drop in amplitude should not exceed 25° to 35°.</p>

      <h3 class="mb-3 mt-6">The Importance of Lift Angle</h3>
      <p class="mb-4">To calculate amplitude accurately, the timegrapher must know the balance's specific <em>lift angle</em> — the angle through which the balance wheel travels while the impulse pin is in contact with the pallet fork. Most modern calibres range between 50° and 54° (for instance, Rolex Calibre 3235 is 53°, while an Omega Co-Axial Calibre 8800 utilizes 38°).</p>
    `,
    relatedWatchIds: ['rolex-submariner-date-126610ln', 'omega-speedmaster-pro-311-30-42-30-01-001']
  },
  {
    id: 'box-and-papers-what-really-matters',
    slug: 'box-and-papers-what-really-matters',
    title: 'Box and Papers: What Really Matters in Pre-Owned Horology?',
    category: 'Collecting',
    readTimeMinutes: 6,
    date: '2026-09-28',
    author: 'Elena Vance, Senior Horological Appraiser',
    summary: 'A forensic guide to documentation, serialized warranty cards, service papers, and how packaging affects fair market valuation and provenance.',
    heroVisualType: 'papers',
    content: `
      <p class="mb-4">In the lexicon of the pre-owned watch market, few phrases carry as much weight — or trigger as much premium — as "Full Set: Box and Papers". But what exactly are you paying for, and when is an archive extract or service receipt actually superior to original retail collateral?</p>

      <h3 class="mb-3 mt-6">The Hierarchy of Documentation</h3>
      <p class="mb-4">Not all papers are created equal. The hierarchy of authentication begins with the manufacturer-issued physical warranty card or certificate of guarantee bearing the watch's individual punched or printed serial number and date of sale.</p>

      <ul class="mb-6 flex flex-col gap-3">
        <li class="flex items-start gap-2"><strong>1. Original Serialized Warranty Card:</strong> The definitive link between the factory and the initial retail distribution point.</li>
        <li class="flex items-start gap-2"><strong>2. Manufacturer Service Papers:</strong> Modern service cards from Rolex, Omega, or Grand Seiko establish both verified authenticity and mechanical warranty.</li>
        <li class="flex items-start gap-2"><strong>3. Extract from the Archives:</strong> Common for vintage Omega or Patek Philippe, confirming production date and movement matching.</li>
      </ul>

      <h3 class="mb-3 mt-6">The Value Premium</h3>
      <p class="mb-4">For modern sports references (such as stainless steel Rolex Submariners or Daytonas), a complete verified set typically commands a 15% to 25% premium over a "naked" watch. However, for everyday vintage wearers, a documented full service with authentic parts is often of greater mechanical value than a desiccated presentation box.</p>
    `,
    relatedWatchIds: ['rolex-daytona-116500ln', 'tudor-black-bay-58-m79030n-0001']
  },
  {
    id: 'automatic-vs-manual-movements',
    slug: 'automatic-vs-manual-movements',
    title: 'Automatic vs Manual Movements: The Collector\'s Dilemma',
    category: 'Movements',
    readTimeMinutes: 7,
    date: '2026-09-10',
    author: 'Julian Thorne, Technical Editor',
    summary: 'Tactile winding rituals versus oscillating rotor convenience: assessing power delivery, case thickness, and mechanical intimacy.',
    heroVisualType: 'manual',
    content: `
      <p class="mb-4">The mechanical heart of a watch beats via the stored potential energy of an unwinding mainspring. Yet how that mainspring is coiled separates horology into two distinct philosophical camps: manual winding and self-winding automatic.</p>

      <h3 class="mb-3 mt-6">The Ritual of the Manual Wind</h3>
      <p class="mb-4">For enthusiasts of the Omega Speedmaster Professional Calibre 1861 or the Grand Seiko Calibre 9R31, winding the crown each morning is not a chore — it is an intimate sensory connection to the gear train. Without an oscillating rotor obstructing the caseback, manual movements offer an uninhibited view of bridges, column wheels, and balance cocks.</p>

      <h3 class="mb-3 mt-6">The Engineering of the Automatic Rotor</h3>
      <p class="mb-4">Automatic watches utilize an eccentric weighted rotor that pivots with the natural kinetic motion of the wearer's wrist. Modern bidirectional reversing wheels and heavy tungsten or 21K gold oscillating weights ensure that mainspring tension remains at its optimal high torque, maintaining consistent amplitude throughout the day.</p>
    `,
    relatedWatchIds: ['omega-speedmaster-pro-311-30-42-30-01-001', 'grand-seiko-elegance-sbgy007-omiwatari']
  }
];
