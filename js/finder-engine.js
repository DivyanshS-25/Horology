/**
 * HOROLOGY — Intelligent Watch Finder Recommendation Engine
 * Direction C — Midnight Navy Edition
 * Transparent Client-Side Scoring Algorithm (Phase 05 Specification)
 *
 * Scoring Weights (100 pts total):
 * - Manufacturer: 25 pts
 * - Movement Philosophy: 20 pts
 * - Horological Typology: 20 pts
 * - Case Diameter: 15 pts
 * - Physical Condition: 10 pts
 * - Ownership & Box/Papers: 5 pts
 * - Curatorial Style Tag: 5 pts
 */

export const FINDER_QUESTIONS = [
  {
    step: 1,
    id: 'brand',
    title: 'What speaks to you?',
    subtitle: 'Select your preferred house of manufacture, or remain open to all.',
    icon: 'crown',
    options: [
      { id: 'all', label: 'Open to All Four Houses', brandId: null, desc: 'Rolex, Omega, Tudor & Grand Seiko' },
      { id: 'rolex', label: 'Rolex', brandId: 'rolex', desc: 'Genevan manufacture of legendary resilience & iconography' },
      { id: 'omega', label: 'Omega', brandId: 'omega', desc: 'Bienne pioneers of Co-Axial Master Chronometers' },
      { id: 'tudor', label: 'Tudor', brandId: 'tudor', desc: 'Born for purpose: Kenissi manufacture movements' },
      { id: 'grand-seiko', label: 'Grand Seiko', brandId: 'grand-seiko', desc: 'Japanese Nature of Time, Zaratsu polish & Spring Drive' }
    ]
  },
  {
    step: 2,
    id: 'budget',
    title: 'What is your comfortable investment range?',
    subtitle: 'Specify your acquisition target, or explore with a flexible scope.',
    icon: 'seal',
    options: [
      { id: 'flexible', label: 'Flexible Budget', min: 0, max: Infinity, desc: 'Unconstrained exploration across all tiers' },
      { id: 'under-5l', label: 'Under ₹5 Lakh', min: 0, max: 500000, desc: 'Tudor Black Bay, classic steel, entry Grand Seiko' },
      { id: '5-10l', label: '₹5 – 10 Lakh', min: 500000, max: 1000000, desc: 'Speedmaster Moonwatch, Snowflake, Seamaster 300M' },
      { id: '10-25l', label: '₹10 – 25 Lakh', min: 1000000, max: 2500000, desc: 'Submariner Date, GMT-Master II, Calibre 321' },
      { id: 'above-25l', label: 'Above ₹25 Lakh', min: 2500000, max: 15000000, desc: 'Cosmograph Daytona & precious metallurgy' }
    ],
    supportsCustomRange: true
  },
  {
    step: 3,
    id: 'type',
    title: 'What kind of watch are you looking for?',
    subtitle: 'Select the primary horological typology and complication architecture.',
    icon: 'diver',
    options: [
      { id: 'any', label: 'No Preference', watchType: null, desc: 'Open to all horological typologies' },
      { id: 'diver', label: 'Diver', watchType: 'Diver', desc: 'Unidirectional rotating bezel, high water resistance, luminous plots' },
      { id: 'chronograph', label: 'Chronograph', watchType: 'Chronograph', desc: 'Stopwatch sub-dials, column wheel, tachymeter scale' },
      { id: 'dress', label: 'Dress', watchType: 'Dress', desc: 'Refined proportions, high polish, discreet elegance' },
      { id: 'gmt', label: 'GMT', watchType: 'GMT', desc: 'Multiple timezone tracking for international exploration' },
      { id: 'field', label: 'Field', watchType: 'Field', desc: 'Rugged utilitarian legibility inspired by military exploration' },
      { id: 'sports', label: 'Sports', watchType: 'Sports', desc: 'Versatile steel architecture with robust shock resistance' },
      { id: 'everyday', label: 'Everyday', watchType: 'Everyday', desc: 'Balanced aesthetics suited for both formal and casual settings' }
    ]
  },
  {
    step: 4,
    id: 'movement',
    title: 'Which movement interests you?',
    subtitle: 'Choose the propulsion mechanism beating inside the case.',
    icon: 'escapement',
    options: [
      { id: 'any', label: 'No Preference', movementType: null, desc: 'Open to all mechanical propulsion' },
      { id: 'automatic', label: 'Automatic', movementType: 'Automatic', desc: 'Self-winding rotor powered by the motion of your wrist' },
      { id: 'manual', label: 'Manual Winding', movementType: 'Manual Wind', desc: 'Tactile winding crown ritual with an unobstructed bridge view' },
      { id: 'spring-drive', label: 'Spring Drive', movementType: 'Spring Drive', desc: 'True glide continuous seconds regulated by quartz tri-synchro' },
      { id: 'quartz', label: 'Quartz', movementType: 'Quartz', desc: 'High-frequency quartz regulation (Grand Seiko 9F / Omega)' }
    ]
  },
  {
    step: 5,
    id: 'caseSize',
    title: 'What size feels right?',
    subtitle: 'Select the case diameter that harmonizes with your wrist architecture.',
    icon: 'caliper',
    options: [
      { id: 'any', label: 'No Preference', minSize: 0, maxSize: 99, desc: 'Proportions adapted to individual reference' },
      { id: 'small', label: 'Small (≤ 38 mm)', minSize: 0, maxSize: 38.9, desc: 'Vintage elegance, Explorer 36, and classical dress proportions' },
      { id: 'medium', label: 'Medium (39 – 41 mm)', minSize: 39.0, maxSize: 41.5, desc: 'The universal modern sweet spot (Submariner, BB58, Datejust)' },
      { id: 'large', label: 'Large (≥ 42 mm)', minSize: 41.6, maxSize: 50.0, desc: 'Commanding presence (Speedmaster, Sea-Dweller 43, Planet Ocean)' }
    ],
    supportsCustomRange: true
  },
  {
    step: 6,
    id: 'style',
    title: 'Which character best represents your taste?',
    subtitle: 'Only matched against verified curated style attributes.',
    icon: 'sparkles',
    options: [
      { id: 'any', label: 'No Preference', styleTag: null, desc: 'Open to all aesthetic characters' },
      { id: 'Understated', label: 'Understated', styleTag: 'Understated', desc: 'Subtle sophistication that speaks in quiet confidence' },
      { id: 'Classic', label: 'Classic', styleTag: 'Classic', desc: 'Timeless benchmarks that transcend fleeting fashion' },
      { id: 'Sporty', label: 'Sporty', styleTag: 'Sporty', desc: 'Dynamic lines designed for physical vitality and motion' },
      { id: 'Bold', label: 'Bold', styleTag: 'Bold', desc: 'Prominent wrist presence with commanding architectural depth' },
      { id: 'Minimalist', label: 'Minimalist', styleTag: 'Minimalist', desc: 'Clean dials stripped of superfluity, emphasizing pure form' },
      { id: 'Technical', label: 'Technical', styleTag: 'Technical', desc: 'Titanium metallurgy, high-depth ratings, and chronometer innovation' },
      { id: 'Vintage-inspired', label: 'Vintage-inspired', styleTag: 'Vintage-inspired', desc: 'Gilt accents, domed crystals, and twentieth-century heritage cues' }
    ]
  },
  {
    step: 7,
    id: 'condition',
    title: 'What condition would you prefer?',
    subtitle: 'All timepieces pass HOROLOGY’s 7-Stage forensic verification.',
    icon: 'award',
    options: [
      { id: 'any', label: 'Any Condition', desc: 'All verified grades across our observatory vault' },
      { id: 'Unworn', label: 'Unworn', desc: 'Factory delivery state with protective seals or zero signs of wear' },
      { id: 'Excellent', label: 'Excellent', desc: 'Pristine case bevels and razor-sharp chamfers with negligible handling' },
      { id: 'Very Good', label: 'Very Good', desc: 'Light surface hairlines consistent with careful occasional wear' },
      { id: 'Good', label: 'Good', desc: 'Honest pre-owned character with complete mechanical integrity' }
    ]
  },
  {
    step: 8,
    id: 'ownership',
    title: 'How important are the original box and papers?',
    subtitle: 'Specify your requirement for archival factory documentation.',
    icon: 'file-text',
    options: [
      { id: 'any', label: 'No Preference', desc: 'Open to all authenticated references in the vault' },
      { id: 'both-required', label: 'Both Required (Strict Full Set)', isStrict: true, desc: 'Must include original manufacture presentation box and guarantee papers' },
      { id: 'prefer-both', label: 'Prefer Both', isStrict: false, desc: 'Prioritize full sets but open to exceptional watch-only examples' },
      { id: 'not-essential', label: 'Not Essential (Value Focus)', isStrict: false, desc: 'Focus on timepiece quality accompanied by HOROLOGY Inspection Dossier' }
    ]
  }
];

export const FINDER_QUESTIONS_9_STEP = FINDER_QUESTIONS;

export const SCORING_WEIGHTS = {
  brand: 25,
  movement: 20,
  type: 20,
  caseSize: 15,
  condition: 10,
  ownership: 5,
  style: 5
};

export const CRITERIA_WEIGHTS = SCORING_WEIGHTS;

export function evaluateRecommendations(answers = {}, watches = []) {
  if (!Array.isArray(watches) || watches.length === 0) {
    return {
      exactMatches: [],
      strongMatches: [],
      alternativeSuggestions: [],
      allRanked: [],
      totalCount: 0,
      eliminatedBy: {},
      isRelaxed: false
    };
  }

  const results = [];
  const eliminatedCounts = {
    budget: 0,
    ownership: 0
  };

  const selectedBrand = answers.brand || 'all';
  const selectedBudget = answers.budget || 'flexible';
  const selectedType = answers.type || 'any';
  const selectedMovement = answers.movement || 'any';
  const selectedCaseSize = answers.caseSize || 'any';
  const selectedStyle = answers.style || 'any';
  const selectedCondition = answers.condition || 'any';
  const selectedOwnership = answers.ownership || 'any';

  let budgetMin = 0;
  let budgetMax = Infinity;
  let isStrictBudget = false;

  if (answers.customBudgetMin != null || answers.customBudgetMax != null) {
    budgetMin = answers.customBudgetMin || 0;
    budgetMax = answers.customBudgetMax || Infinity;
    isStrictBudget = true;
  } else if (selectedBudget !== 'flexible') {
    const bq = FINDER_QUESTIONS.find(q => q.id === 'budget');
    const opt = bq?.options.find(o => o.id === selectedBudget);
    if (opt) {
      budgetMin = opt.min;
      budgetMax = opt.max;
      isStrictBudget = true;
    }
  }

  let sizeMin = 0;
  let sizeMax = 99;
  if (answers.customSizeMin != null || answers.customSizeMax != null) {
    sizeMin = answers.customSizeMin || 0;
    sizeMax = answers.customSizeMax || 99;
  } else if (selectedCaseSize !== 'any') {
    const sq = FINDER_QUESTIONS.find(q => q.id === 'caseSize');
    const opt = sq?.options.find(o => o.id === selectedCaseSize);
    if (opt) {
      sizeMin = opt.minSize;
      sizeMax = opt.maxSize;
    }
  }

  for (const watch of watches) {
    if (isStrictBudget) {
      if (watch.price < budgetMin || watch.price > budgetMax) {
        eliminatedCounts.budget++;
        continue;
      }
    }

    const hasFullSet = watch.boxStatus === 'Original Box' && watch.papersStatus === 'Original Papers';
    if (selectedOwnership === 'both-required' && !hasFullSet) {
      eliminatedCounts.ownership++;
      continue;
    }

    let score = 0;
    const matchReasons = [];

    if (selectedBrand === 'all' || !selectedBrand) {
      score += SCORING_WEIGHTS.brand;
    } else if (watch.brandId === selectedBrand || watch.brand.toLowerCase() === selectedBrand.toLowerCase()) {
      score += SCORING_WEIGHTS.brand;
      matchReasons.push(`Manufactured by ${watch.brand}`);
    }

    if (selectedMovement === 'any' || !selectedMovement) {
      score += SCORING_WEIGHTS.movement;
    } else {
      const mt = (watch.movementType || '').toLowerCase();
      let matched = false;
      if (selectedMovement === 'automatic' && mt.includes('automatic')) matched = true;
      if (selectedMovement === 'manual' && mt.includes('manual')) matched = true;
      if (selectedMovement === 'spring-drive' && mt.includes('spring drive')) matched = true;
      if (selectedMovement === 'quartz' && mt.includes('quartz')) matched = true;

      if (matched) {
        score += SCORING_WEIGHTS.movement;
        matchReasons.push(`${watch.movementType} mechanical movement (${watch.calibre})`);
      }
    }

    if (selectedType === 'any' || !selectedType) {
      score += SCORING_WEIGHTS.type;
    } else {
      const wt = (watch.watchType || '').toLowerCase();
      let matched = false;
      if (selectedType === 'diver' && wt.includes('diver')) matched = true;
      if (selectedType === 'chronograph' && wt.includes('chronograph')) matched = true;
      if (selectedType === 'dress' && wt.includes('dress')) matched = true;
      if (selectedType === 'gmt' && wt.includes('gmt')) matched = true;
      if (selectedType === 'field' && wt.includes('field')) matched = true;
      if (selectedType === 'sports' && (wt.includes('sports') || wt.includes('diver') || wt.includes('gmt'))) matched = true;
      if (selectedType === 'everyday' && (wt.includes('everyday') || wt.includes('dress') || wt.includes('sports'))) matched = true;

      if (matched) {
        score += SCORING_WEIGHTS.type;
        matchReasons.push(`Matches your ${watch.watchType} typology preference`);
      }
    }

    const diameter = watch.caseSizeMm || 40;
    if (selectedCaseSize === 'any' || (diameter >= sizeMin && diameter <= sizeMax)) {
      score += SCORING_WEIGHTS.caseSize;
      if (selectedCaseSize !== 'any') {
        matchReasons.push(`Case diameter of ${diameter} mm conforms to your proportion target`);
      }
    }

    if (selectedCondition === 'any' || !selectedCondition) {
      score += SCORING_WEIGHTS.condition;
    } else {
      const conditionMatches = watch.condition?.toLowerCase() === selectedCondition.toLowerCase();
      if (conditionMatches) {
        score += SCORING_WEIGHTS.condition;
        matchReasons.push(`Exemplary ${watch.condition} condition rating`);
      }
    }

    if (selectedOwnership === 'any' || selectedOwnership === 'not-essential') {
      score += SCORING_WEIGHTS.ownership;
    } else if (hasFullSet) {
      score += SCORING_WEIGHTS.ownership;
      matchReasons.push(`Complete collector set with original box and stamped papers`);
    }

    if (selectedStyle === 'any' || !selectedStyle) {
      score += SCORING_WEIGHTS.style;
    } else {
      const styleTags = watch.styleTags || [];
      const hasStyle = styleTags.some(t => t.toLowerCase() === selectedStyle.toLowerCase());
      if (hasStyle) {
        score += SCORING_WEIGHTS.style;
        matchReasons.push(`Expresses your desired ${selectedStyle} aesthetic character`);
      }
    }

    let matchSentence = '';
    if (matchReasons.length >= 3) {
      matchSentence = `Matches your selected ${matchReasons.slice(0, 3).join(', ')}.`;
    } else if (matchReasons.length > 0) {
      matchSentence = `Matches your ${matchReasons.join(' and ')}.`;
    } else {
      matchSentence = `Curated reference aligning with your investment tier.`;
    }

    const matchPercentage = Math.round(score);

    results.push({
      watch,
      matchPercentage,
      matchScore: matchPercentage,
      matchSentence,
      matchReasons,
      reasons: matchReasons,
      isExact: matchPercentage === 100,
      isPerfectMatch: matchPercentage === 100
    });
  }

  results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return (a.watch.featuredOrder || 99) - (b.watch.featuredOrder || 99);
  });

  const exactMatches = results.filter(r => r.matchPercentage >= 95);
  const strongMatches = results.filter(r => r.matchPercentage >= 70 && r.matchPercentage < 95);
  const alternativeSuggestions = results.filter(r => r.matchPercentage >= 50 && r.matchPercentage < 70);

  return {
    exactMatches,
    strongMatches,
    alternativeSuggestions,
    allRanked: results,
    totalCount: results.length,
    eliminatedBy: eliminatedCounts,
    isRelaxed: exactMatches.length === 0 && results.length > 0
  };
}
