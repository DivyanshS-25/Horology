// HOROLOGY — Brand Catalog & Metadata
export const BRANDS = [
  {
    id: 'rolex',
    name: 'Rolex',
    origin: 'Geneva, Switzerland',
    founded: 1905,
    tagline: 'A crown for every achievement.',
    description: 'Pinnacle of Swiss manufacture robustness, chronometric precision, and enduring collector value. Recognized globally for iconic Oyster architecture and perpetual calibres.',
    curationNotes: 'We curate exclusively verified Oystersteel and precious metal references with unpolished factory bevels, full serial integrity, and verified Chronergy or Parachrom hairsprings.',
    heroVisualType: 'diver',
    image: 'assets/images/hero/hero-home-primary-16x9.jpg',
    families: [
      { id: 'Submariner', name: 'Submariner', description: 'The benchmark of professional diving instruments since 1953.' },
      { id: 'GMT-Master II', name: 'GMT-Master II', description: 'Aviation dual-time icon engineered for transatlantic flight.' },
      { id: 'Datejust', name: 'Datejust', description: 'The classic dress-sport archetype with Cyclops date lens.' },
      { id: 'Daytona', name: 'Cosmograph Daytona', description: 'Legendary motorsport chronograph of peerless collectibility.' },
      { id: 'Explorer', name: 'Explorer', description: 'Purist mountaineering tool watch with Chromalight 3-6-9 dial.' }
    ]
  },
  {
    id: 'omega',
    name: 'Omega',
    origin: 'Biel/Bienne, Switzerland',
    founded: 1848,
    tagline: 'Pioneering watchmaking since 1848. Precision. Innovation. Exploration.',
    description: 'From lunar exploration with NASA to deep-sea oceanic abyss, Omega stands at the pinnacle of Co-Axial escapement architecture and METAS Master Chronometer certification.',
    curationNotes: 'Our Omega collection highlights column-wheel Speedmasters, Master Chronometer Seamasters, and Co-Axial calibres tested to 15,000 gauss magnetic resistance.',
    heroVisualType: 'chronograph',
    image: 'assets/images/hero/hero-home-secondary-dial-macro-16x9.jpg',
    families: [
      { id: 'Speedmaster', name: 'Speedmaster', description: 'Flight-qualified by NASA for all manned space missions.' },
      { id: 'Seamaster', name: 'Seamaster Diver 300M', description: 'Maritime excellence, helium escape valve, and ceramic wave dials.' },
      { id: 'Aqua Terra', name: 'Seamaster Aqua Terra', description: 'Maritime luxury crossover with horizontal teak-concept dial.' },
      { id: 'Constellation', name: 'Constellation', description: 'Observatory chronometer heritage with iconic case side claws.' }
    ]
  },
  {
    id: 'tudor',
    name: 'Tudor',
    origin: 'Geneva, Switzerland',
    founded: 1926,
    tagline: 'Born to Dare.',
    description: 'Sister manufacture to Rolex founded by Hans Wilsdorf, offering manufacture COSC-certified movements, vintage military inspiration, and unrivaled tool-watch value.',
    curationNotes: 'We select pristine Black Bay and Pelagos titanium references, honoring vintage military submariner provenance with modern manufacture calibres.',
    heroVisualType: 'diver',
    image: 'assets/images/hero/hero-home-mobile-4x5.jpg',
    families: [
      { id: 'Black Bay', name: 'Black Bay', description: 'Vintage proportions with modern COSC-certified manufacture calibres.' },
      { id: 'Pelagos', name: 'Pelagos', description: 'Ultralight titanium technical saturation diver with T-fit clasp.' },
      { id: 'Ranger', name: 'Ranger', description: 'Utilitarian field expedition watch inspired by the 1952 Greenland expedition.' },
      { id: 'Royal', name: 'Royal', description: 'Integrated bracelet sports-chic luxury with notched alternating bezel.' }
    ]
  },
  {
    id: 'grand-seiko',
    name: 'Grand Seiko',
    origin: 'Shizukuishi & Shinshu, Japan',
    founded: 1960,
    tagline: 'The Nature of Time.',
    description: 'Japanese haute horlogerie distinguished by Zaratsu mirror polishing, dial textures reflecting Japanese natural landscapes, and revolutionary Spring Drive glide motion.',
    curationNotes: 'We curate pristine Zaratsu-finished cases in high-intensity titanium and steel, featuring Spring Drive Calibre 9R and Hi-Beat 9S mechanisms.',
    heroVisualType: 'dress',
    image: 'assets/images/hero/hz_hero_003_v3_1794490992618.jpg',
    families: [
      { id: 'Heritage Collection', name: 'Heritage Collection', description: 'Pure classic Grand Seiko silhouettes including the iconic Snowflake.' },
      { id: 'Evolution 9', name: 'Evolution 9', description: 'Modern design grammar with low center of gravity and supreme legibility.' },
      { id: 'Elegance Collection', name: 'Elegance Collection', description: 'Classic hand-wound dress watches with warm cream dials.' },
      { id: 'Sport Collection', name: 'Sport Collection', description: 'High-durability GMTs and 200m divers with ceramic rotating bezels.' }
    ]
  }
];
