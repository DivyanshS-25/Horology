// HOROLOGY — Watch Finder 6-Step Questionnaire
export const FINDER_QUESTIONS = [
  {
    step: 1,
    id: 'budget',
    title: "What is your investment budget?",
    subtitle: "Select the price bracket you wish to explore.",
    options: [
      { id: 'under-2l', label: 'Under ₹2 Lakh', min: 0, max: 200000, desc: 'Entry luxury references' },
      { id: '2-5l', label: '₹2 – 5 Lakh', min: 200000, max: 500000, desc: 'Tudor, Omega Seamasters, classic steel' },
      { id: '5-10l', label: '₹5 – 10 Lakh', min: 500000, max: 1000000, desc: 'Speedmaster, Grand Seiko Spring Drive, Datejust' },
      { id: '10-25l', label: '₹10 – 25 Lakh', min: 1000000, max: 2500000, desc: 'Submariner, GMT-Master II, Calibre 321' },
      { id: 'above-25l', label: 'Above ₹25 Lakh', min: 2500000, max: 10000000, desc: 'Cosmograph Daytona & precious metals' }
    ]
  },
  {
    step: 2,
    id: 'brand',
    title: "Do you have a manufacture preference?",
    subtitle: "Select your preferred house of horology.",
    options: [
      { id: 'all', label: 'Open to All Houses', brandId: null, desc: 'Explore the full curated collection' },
      { id: 'rolex', label: 'Rolex', brandId: 'rolex', desc: 'Genevan manufacture of legendary resilience' },
      { id: 'omega', label: 'Omega', brandId: 'omega', desc: 'Co-Axial Master Chronometers and Moonwatch heritage' },
      { id: 'tudor', label: 'Tudor', brandId: 'tudor', desc: 'Vintage tool-watch charm and manufacture calibres' },
      { id: 'grand-seiko', label: 'Grand Seiko', brandId: 'grand-seiko', desc: 'Zaratsu polishing and Spring Drive innovation' }
    ]
  },
  {
    step: 3,
    id: 'type',
    title: "What timepiece typology suits your lifestyle?",
    subtitle: "Select the primary category and functional complication.",
    options: [
      { id: 'diver', label: 'Professional Diver', visualType: 'diver', desc: 'Rotating bezel, high water resistance, luminous plots' },
      { id: 'chronograph', label: 'Mechanical Chronograph', visualType: 'chronograph', desc: 'Stopwatch complication, tachymeter scale' },
      { id: 'dress', label: 'Classic Dress & Everyday', visualType: 'dress', desc: 'Refined proportions, high polish, elegant dials' },
      { id: 'gmt', label: 'Dual-Time / GMT', visualType: 'diver', desc: 'Multiple time zones for international exploration' }
    ]
  },
  {
    step: 4,
    id: 'movement',
    title: "What mechanical philosophy resonates with you?",
    subtitle: "Choose the propulsion mechanism.",
    options: [
      { id: 'any', label: 'Any Mechanism', movementType: null, desc: 'Open to all mechanical movements' },
      { id: 'automatic', label: 'Self-Winding Automatic', movementType: 'Automatic', desc: 'Convenience of an oscillating rotor' },
      { id: 'manual', label: 'Manual Wind', movementType: 'Manual Wind', desc: 'Tactile morning ritual and unobstructed bridge view' },
      { id: 'spring-drive', label: 'Spring Drive', movementType: 'Spring Drive', desc: 'True glide continuous motion and quartz-level accuracy' }
    ]
  },
  {
    step: 5,
    id: 'caseSize',
    title: "What case diameter fits your wrist best?",
    subtitle: "Select your preferred dimension.",
    options: [
      { id: 'any', label: 'Any Proportion', minSize: 0, maxSize: 99, desc: 'Unconstrained' },
      { id: 'small', label: 'Under 39 mm', minSize: 0, maxSize: 38.9, desc: 'Vintage and classical dress sizing' },
      { id: 'medium', label: '39 – 41 mm', minSize: 39, maxSize: 41.5, desc: 'Modern sweet spot for most wrists' },
      { id: 'large', label: 'Above 41 mm', minSize: 41.6, maxSize: 50, desc: 'Bold contemporary presence' }
    ]
  },
  {
    step: 6,
    id: 'preference',
    title: "What is your ultimate priority?",
    subtitle: "Fine-tune recommendations to your collecting thesis.",
    options: [
      { id: 'heritage', label: 'Historical Iconography', desc: 'Landmark references that defined horology' },
      { id: 'accuracy', label: 'Extreme Precision (COSC / METAS)', desc: 'Rigorous chronometer certifications' },
      { id: 'power-reserve', label: 'Extended Power Reserve (70h+)', desc: 'Weekend-proof autonomy' },
      { id: 'finishing', label: 'Artisanal Finishing & Dial Art', desc: 'Zaratsu polishing, step dials, textured surfaces' }
    ]
  }
];
