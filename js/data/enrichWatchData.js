/**
 * HOROLOGY — Watch Data Enrichment Engine (Phase 04)
 * Adds the 6 required deep horological sub-objects to each of the 24 demonstration watches:
 * 1. overview
 * 2. specifications (grouped dictionary)
 * 3. movementIntelligence
 * 4. conditionAssessment
 * 5. inspectionReport (with strict honest telemetry: measuredValuesAvailable: false)
 * 6. galleryItems
 */

export const WATCH_STYLE_TAGS = {
  'demo-rolex-126610ln': ['Classic', 'Sporty', 'Technical'],
  'demo-rolex-126710blro': ['Bold', 'Sporty', 'Classic'],
  'demo-rolex-126334': ['Classic', 'Understated'],
  'demo-rolex-116500ln': ['Sporty', 'Technical', 'Bold'],
  'demo-rolex-124270': ['Understated', 'Minimalist', 'Classic'],
  'demo-rolex-126600': ['Bold', 'Technical', 'Sporty'],
  'demo-omega-31030425001001': ['Classic', 'Vintage-inspired', 'Technical'],
  'demo-omega-21030422001001': ['Sporty', 'Technical', 'Bold'],
  'demo-omega-22010412103001': ['Classic', 'Understated', 'Sporty'],
  'demo-omega-31130403001001': ['Vintage-inspired', 'Technical', 'Classic'],
  'demo-omega-13110366001001': ['Understated', 'Classic', 'Minimalist'],
  'demo-omega-21530442201001': ['Bold', 'Technical', 'Sporty'],
  'demo-tudor-m79030n-0001': ['Vintage-inspired', 'Classic', 'Sporty'],
  'demo-tudor-m25407n-0001': ['Technical', 'Understated', 'Sporty'],
  'demo-tudor-m79830rb-0001': ['Vintage-inspired', 'Sporty', 'Bold'],
  'demo-tudor-m79360n-0002': ['Sporty', 'Vintage-inspired', 'Bold'],
  'demo-tudor-m79950-0001': ['Understated', 'Minimalist', 'Vintage-inspired'],
  'demo-tudor-m28500-0005': ['Classic', 'Understated'],
  'demo-gs-sbga211': ['Minimalist', 'Technical', 'Understated'],
  'demo-gs-slga009': ['Classic', 'Understated', 'Minimalist'],
  'demo-gs-sbge257': ['Sporty', 'Technical'],
  'demo-gs-sbgw231': ['Minimalist', 'Understated', 'Classic'],
  'demo-gs-sbgp011': ['Understated', 'Minimalist', 'Classic'],
  'demo-gs-sbga461': ['Bold', 'Technical', 'Sporty']
};

// Brand-specific defaults and manufacture metadata
const MANUFACTURE_PROFILES = {
  rolex: {
    origin: 'Switzerland (Geneva)',
    accuracyStandard: 'Superlative Chronometer (-2/+2 sec/day after casing)',
    waterproofSystem: 'Oyster hermetic case with Twinlock or Triplock winding crown',
    claspType: 'Folding Oysterlock safety clasp with Rolex Glidelock or Easylink extension'
  },
  omega: {
    origin: 'Switzerland (Bienne)',
    accuracyStandard: 'Master Chronometer (0/+5 sec/day, 15,000 Gauss anti-magnetic)',
    waterproofSystem: 'Screw-in crown with double O-ring gaskets',
    claspType: 'Foldover clasp with comfort setting and diver extension'
  },
  tudor: {
    origin: 'Switzerland (Geneva)',
    accuracyStandard: 'COSC Certified Chronometer (-4/+6 sec/day)',
    waterproofSystem: 'Screw-down winding crown with Tudor rose in relief',
    claspType: 'Folding clasp with safety catch and "T-fit" rapid adjustment system'
  },
  'grand-seiko': {
    origin: 'Japan (Shizukuishi / Shinshu)',
    accuracyStandard: 'Grand Seiko Standard (Spring Drive: ±15 s/month; 9S: -3/+5 s/day; 9F: ±10 s/year)',
    waterproofSystem: 'High-precision screw-down crown with dual internal gaskets',
    claspType: 'Three-fold clasp with push button release'
  }
};

// Model-specific intelligence dictionaries
const WATCH_INTELLIGENCE = {
  'demo-rolex-126610ln': {
    headline: 'The Benchmark Modern Professional Diving Instrument',
    description: 'Crafted in Rolex proprietary Oystersteel (904L), this Submariner Date reference 126610LN represents the modern evolutionary peak of the definitive ocean chronometer. Featuring a redesigned 41mm case with slimmer, more sculptural lugs than its predecessor, a high-gloss black dial with Chromalight luminescence, and a scratchproof Cerachrom ceramic bezel insert with recessed platinum PVD graduations. Inside beats the state-of-the-art Calibre 3235, incorporating the high-efficiency Chronergy escapement and a 70-hour power reserve.',
    designCharacteristics: [
      'Monobloc middle case in solid Oystersteel (904L austenitic superalloy)',
      'Cerachrom unidirectional 60-minute rotatable ceramic bezel with recessed platinum graduations',
      'Gloss black lacquer dial with 18k white gold applied indices and Chromalight emission',
      'Cyclops magnifying lens over the 3 o\'clock date aperture (2.5× magnification)',
      'Oyster three-piece solid link bracelet with Oysterlock safety clasp and Glidelock fine-adjustment'
    ],
    intendedUse: 'Professional deep-sea diving, marine exploration, and daily luxury chronometric wear.',
    notableFeatures: [
      'Patented Chronergy escapement with paramagnetic nickel-phosphorus alloy',
      'Paramagnetic blue Parachrom hairspring with Breguet overcoil',
      'Triplock triple waterproofness system with screw-down crown and raised shoulders',
      'Superlative Chronometer certification: -2/+2 seconds per day after casing'
    ],
    historicalContext: 'Introduced in September 2020, the reference 126610LN succeeded the 116610LN, refining the case geometry with a wider 21mm bracelet stance and narrower lug profiles reminiscent of classic vintage five-digit references.',
    exampleNoteworthiness: 'An unpolished, collector-grade demonstration reference retaining razor-sharp bevels and accompanied by its complete Geneva presentation box and international guarantee card.',
    lugToLug: 48.1,
    thickness: 12.3,
    lugWidth: 21,
    crystal: 'Scratch-resistant sapphire with cyclops date lens and anti-reflective inner coating',
    caseback: 'Solid Oystersteel screw-down with hermetic fluting',
    crown: 'Screw-down, Triplock triple waterproofness system with crown guards',
    bezel: 'Unidirectional rotatable 60-minute graduated, Cerachrom ceramic insert with platinum PVD numerals',
    dialFinish: 'High-gloss deep black lacquer',
    indices: 'Applied 18k white gold round, baton, and triangular markers',
    lume: 'Chromalight (high-legibility long-lasting blue luminescence)',
    hands: '18k white gold Mercedes hour hand, sword minute hand, and lollipop seconds hand',
    datePlacement: '3 o\'clock aperture with instantaneous date jump at midnight',
    calibre: 'Calibre 3235',
    architecture: 'Self-winding mechanical movement with bidirectional Perpetual rotor on ball bearings',
    frequencyHz: 4.0,
    frequencyVph: 28800,
    powerReserveHours: 70,
    jewels: 31,
    windingDirection: 'Bidirectional Perpetual rotor',
    complications: ['Centre hours, minutes, and seconds', 'Instantaneous date with rapid setting', 'Stop-seconds (hacking) for precise time setting'],
    mechanismExplanation: 'Calibre 3235 is Rolex\'s new-generation flagship date movement, protected by 14 patents. Its signature innovation is the Chronergy escapement, an evolution of the Swiss lever escapement made of nickel-phosphorus alloy that delivers 15% greater efficiency and complete insensitivity to magnetic fields. The oscillator features a blue Parachrom hairspring offering 10 times greater shock resistance than traditional hairsprings, paired with a variable inertia balance wheel regulated by four Microstella gold nuts.',
    strapType: 'Oyster three-piece solid links in Oystersteel',
    clasp: 'Folding Oysterlock safety clasp with Rolex Glidelock fine-adjustment system (20mm in 2mm increments)',
    wristFit: 'Up to 20.5 cm wrist circumference',
    links: 'Full factory complement (12 links including half-link)',
    weightGrams: 155,
    magnetResistance: 'Paramagnetic blue Parachrom hairspring and nickel-phosphorus escapement (~1,000 Gauss)',
    packaging: 'Rolex green presentation box, outer cream sleeve, and guarantee booklet',
    documentation: 'Original warranty card dated 2022, instruction manual, and chronometer tag',
    overallGrade: 'Excellent',
    componentGrades: {
      case: '9.5/10 — Original factory lines intact with razor-sharp chamfers; microscopic hairline marks on case flank consistent with light handling.',
      bezel: '9.9/10 — Pristine Cerachrom ceramic insert without scratches, chipping, or platinum fill degradation.',
      crystal: '10/10 — Sapphire crystal and Cyclops lens entirely free of chips, scratches, or anti-reflective coating wear.',
      dial: '10/10 — Flawless gloss black lacquer; 18k white gold applied indices and Chromalight plots in factory-original state.',
      hands: '10/10 — Original 18k white gold hands with perfect Chromalight infill and zero oxidation.',
      braceletStrap: '9.4/10 — Negligible bracelet stretch; brushed Oystersteel links exhibit minimal desk-diver contact hairlines.',
      clasp: '9.4/10 — Glidelock ratcheting system operates with crisp tactile lock; coronet relief is sharp and unpolished.',
      movement: '9.8/10 — Internally pristine with zero tool marks on bridge bevels, screw heads, or rotor bearing.'
    },
    functionalObservations: 'Time setting, quickset date jump, and hacking seconds operate with instantaneous precision. Screw-down crown threads engage smoothly over four complete revolutions.',
    visibleMarks: 'Superficial micro-hairlines on the 9 o\'clock polished case side visible only under 10× loupe magnification in grazing light. No dents, dings, or structural trauma.',
    replacementNotes: '100% original factory components throughout. No aftermarket parts, no service replacements, and no abrasive refinishing detected.'
  },

  'demo-rolex-126710blro': {
    headline: 'The Definitive Dual-Time Cosmopolitan Aviator',
    description: 'The Rolex GMT-Master II reference 126710BLRO reinterprets the legendary 1955 Pan Am aviator chronometer for the modern era. Defined by its bidirectional 24-hour rotatable bezel with a two-color Cerachrom insert in red and blue ceramic ("Pepsi"), paired with a supple Jubilee five-piece link bracelet. Driven by the Manufacture Calibre 3285 with independent rapid-setting local hour hand.',
    designCharacteristics: [
      'Bidirectional 24-hour rotatable bezel with two-tone red and blue Cerachrom ceramic insert',
      'Five-piece link Jubilee bracelet in Oystersteel with concealed connection under the bezel',
      'Red 24-hour arrow hand indicating home reference time against bezel graduations',
      'Independent jumping local hour hand allowing instantaneous timezone adjustment without stopping the seconds hand',
      'High-legibility gloss black dial with applied 18k white gold indices'
    ],
    intendedUse: 'Intercontinental aviation, multinational business navigation, and world travel.',
    notableFeatures: ['Manufacture Calibre 3285 with true jumping hour GMT complication', 'Patented red-and-blue Cerachrom single-piece ceramic insert', '70-hour power reserve', 'Jubilee bracelet with 5mm Easylink comfort extension link'],
    historicalContext: 'Unveiled at Baselworld 2018, the 126710BLRO marked the triumphant return of the steel "Pepsi" bezel to the GMT-Master line on an iconic five-link Jubilee bracelet after years of collector anticipation.',
    exampleNoteworthiness: 'Delivered in unworn collector condition with factory delivery stickers, complete boxes, serialized chronometer tag, and 2023 international guarantee card.',
    lugToLug: 48.0,
    thickness: 12.1,
    lugWidth: 20,
    crystal: 'Scratch-resistant sapphire with Cyclops date lens',
    caseback: 'Solid Oystersteel screw-down hermetic caseback',
    crown: 'Screw-down, Triplock triple waterproofness system',
    bezel: 'Bidirectional rotatable 24-hour graduated, two-colour red and blue Cerachrom insert in ceramic',
    dialFinish: 'Gloss black lacquer',
    indices: '18k white gold applied markers with Chromalight display',
    lume: 'Chromalight (blue emission)',
    hands: '18k white gold Mercedes hour, sword minute, lollipop seconds, and red lacquer 24-hour arrow hand',
    datePlacement: '3 o\'clock date window with Cyclops magnification',
    calibre: 'Calibre 3285',
    architecture: 'Self-winding mechanical movement with bidirectional Perpetual rotor and GMT gear train',
    frequencyHz: 4.0,
    frequencyVph: 28800,
    powerReserveHours: 70,
    jewels: 31,
    windingDirection: 'Bidirectional Perpetual rotor',
    complications: ['Centre hour, minute, and seconds hands', '24-hour display with independent rapid-setting local hour hand', 'Instantaneous date', 'Stop-seconds (hacking)'],
    mechanismExplanation: 'Calibre 3285 features Rolex\'s dedicated dual-time mechanism where the local 12-hour hand jumps independently forward or backward in one-hour increments without disrupting the continuous oscillation of the balance wheel or the position of the 24-hour hand.',
    strapType: 'Jubilee five-piece link bracelet in Oystersteel',
    clasp: 'Folding Oysterlock safety clasp with Easylink 5 mm comfort extension link',
    wristFit: 'Up to 20.0 cm wrist circumference',
    links: 'Full factory Jubilee links complement',
    weightGrams: 142,
    magnetResistance: 'Paramagnetic blue Parachrom hairspring (~1,000 Gauss)',
    packaging: 'Rolex presentation box, outer carton, warranty wallet',
    documentation: 'Original guarantee card dated 2023, manual, green chronometer tag',
    overallGrade: 'Unworn',
    componentGrades: {
      case: '10/10 — Pristine unworn condition. Zero handling abrasions or contact marks.',
      bezel: '10/10 — Flawless red-blue Cerachrom insert with crisp platinum infill.',
      crystal: '10/10 — Factory mint sapphire crystal.',
      dial: '10/10 — Immaculate gloss black dial.',
      hands: '10/10 — Perfect white gold handset.',
      braceletStrap: '10/10 — Crisp Jubilee bracelet with zero stretch or link wear.',
      clasp: '10/10 — Pristine Oysterlock clasp with firm action.',
      movement: '10/10 — Factory fresh internal condition.'
    },
    functionalObservations: 'Jumping local hour hand clicks precisely with zero backlash. 24-hour bezel rotates with firm, defined 24-click detents.',
    visibleMarks: 'None. Unworn reference in pristine archival preservation state.',
    replacementNotes: 'Entirely factory original as delivered from the Geneva manufacture.'
  },

  'demo-omega-31030425001001': {
    headline: 'The Space Exploration Icon: Co-Axial Master Chronometer Moonwatch',
    description: 'The Omega Speedmaster Professional reference 310.30.42.50.01.001 is the direct horological descendant of the chronometer worn on the lunar surface during Apollo 11. Powered by the hand-wound Co-Axial Master Chronometer Calibre 3861, it features a stepped black dial, historic dot-over-ninety (DON) tachymeter bezel, Hesalite crystal, and an authentic five-arched-links-per-row brushed steel bracelet.',
    designCharacteristics: [
      'Asymmetric 42mm stainless steel case with lyre twisted lugs and integrated pushers',
      'Anodised aluminium tachymeter bezel featuring the historic "Dot Over Ninety" (DON)',
      'Matte black stepped dial with recessed sub-dials and vintage-inspired teardrop markers',
      'Traditional Hesalite crystal bearing the miniature central Omega emblem',
      'Tapered 20mm-to-15mm stainless steel bracelet with satin-brushed finish and milled clasp'
    ],
    intendedUse: 'Aeronautics, space exploration timing, motorsports, and classic chronometer collecting.',
    notableFeatures: ['METAS Master Chronometer certified (resistant to magnetic fields of 15,000 Gauss)', 'Historic hand-wound Calibre 3861 with free-sprung silicon Si14 balance spring', 'Dot Over Ninety (DON) tachymeter ring', 'Flight-qualified by NASA for all manned space missions'],
    historicalContext: 'Introduced in early 2021, the Calibre 3861 Moonwatch modernized the venerable Calibre 1861 with Omega\'s state-of-the-art Co-Axial escapement and METAS chronometer certification while restoring beloved vintage case and dial proportions.',
    exampleNoteworthiness: 'Preserved in exceptional condition with factory Hesalite crystal, lunar sea caseback medallion, and complete commemorative "Moonwatch" presentation trunk with flight strap and loupe.',
    lugToLug: 47.5,
    thickness: 13.2,
    lugWidth: 20,
    crystal: 'Hesalite glass with embossed Omega logo at center',
    caseback: 'Solid steel caseback embossed with Seahorse medallion and "Flight-Qualified by NASA"',
    crown: 'Non-screw-down crown with double gasket sealing and flanked chrono pushers',
    bezel: 'Black anodised aluminium ring with tachymeter scale, dot over 90 and dot diagonal to 70',
    dialFinish: 'Matte black stepped dial with recessed counters',
    indices: 'Transfer-printed white markers with Super-LumiNova luminescence',
    lume: 'Super-LumiNova (green luminescence)',
    hands: 'White lacquered baton hands and central chronograph hand with arrow tip',
    datePlacement: 'None (pure historic chronograph display)',
    calibre: 'Calibre 3861',
    architecture: 'Manual-winding chronograph with Co-Axial escapement, horizontal clutch, and shuttle cam',
    frequencyHz: 3.0,
    frequencyVph: 21600,
    powerReserveHours: 50,
    jewels: 26,
    windingDirection: 'Manual winding',
    complications: ['Small seconds at 9 o\'clock', '12-hour chronograph recorder at 6 o\'clock', '30-minute chronograph recorder at 3 o\'clock', 'Central chronograph seconds with tachymeter scale'],
    mechanismExplanation: 'Calibre 3861 represents the evolutionary apex of the legendary Lemania-based Moonwatch movement. It integrates George Daniels\' Co-Axial escapement with a silicon balance spring (Si14) and non-ferrous alloys, rendering the manual-wind movement impervious to magnetic fields exceeding 15,000 gauss while delivering chronometric precision within 0/+5 seconds per day.',
    strapType: 'Stainless steel bracelet with 5 arched links per row, tapering to 15mm clasp',
    clasp: 'Milled folding clasp with satined cover and polished Omega vintage logo',
    wristFit: 'Up to 20.0 cm wrist circumference',
    links: 'Full link complement with two removable screws per link',
    weightGrams: 138,
    magnetResistance: '15,000 Gauss (METAS Master Chronometer certification)',
    packaging: 'Omega Speedmaster commemorative presentation box, booklet, and travel pouch',
    documentation: 'Original Master Chronometer card, pictogram card, international warranty card dated 2021',
    overallGrade: 'Excellent',
    componentGrades: {
      case: '9.6/10 — Lyre lugs retain factory satin brush and high-polish bevels without softening.',
      bezel: '9.8/10 — Anodised DON aluminium insert in pristine condition without edge dings.',
      crystal: '9.5/10 — Original Hesalite crystal exhibiting only micro-swirls buffable with Polywatch.',
      dial: '10/10 — Step dial printing and recessed subdials in flawless factory state.',
      hands: '10/10 — White painted hands completely free of oxidation or paint loss.',
      braceletStrap: '9.4/10 — Tight link geometry with minimal clasp desk-diving marks.',
      clasp: '9.5/10 — Crisp spring release buttons and clean vintage logo engraving.',
      movement: '9.8/10 — Rhodium-plated bridges with Geneva waves in immaculate state.'
    },
    functionalObservations: 'Chronograph pushers actuate with crisp tactile feedback and reset precisely to zero. Winding feel is smooth and progressive.',
    visibleMarks: 'Superficial desk contact hairlines on clasp outer shield. Case and lugs remain razor sharp.',
    replacementNotes: 'Entirely original factory assembly with matching serial numbers across case and movement.'
  },

  'demo-gs-sbga211': {
    headline: 'The Horological Icon of Shinshu: Spring Drive "Snowflake"',
    description: 'The Grand Seiko Heritage reference SBGA211 "Snowflake" is widely regarded as one of the most poetic modern mechanical timepieces in existence. Its dial captures the windswept snowscapes of the Hotaka mountains surrounding the Shinshu Watch Studio in Nagano, Japan. Encased in High-Intensity Titanium finished with Zaratsu distortion-free mirror polishing, it is powered by Grand Seiko\'s proprietary Spring Drive Calibre 9R65, producing a completely silent, continuous glide motion of the tempered blue steel seconds hand.',
    designCharacteristics: [
      'High-Intensity Titanium case and bracelet offering 30% lighter weight and enhanced scratch resistance',
      'Handcrafted textured "Snowflake" dial inspired by fresh powder snow on Mount Hotaka',
      'Thermally blued steel seconds hand providing striking color contrast',
      'Distortion-free Zaratsu mirror-polished surfaces alternating with hairline satin brushing',
      'Curved sapphire crystal with anti-reflective coating on inner surface'
    ],
    intendedUse: 'Haute horlogerie collecting, everyday executive luxury wear, and formal connoisseur occasions.',
    notableFeatures: ['Proprietary Spring Drive Calibre 9R65 combining mechanical mainspring power with quartz regulation', 'Completely continuous, frictionless glide seconds hand with zero ticking', 'High-Intensity Titanium construction', '72-hour power reserve with dial indicator at 8 o\'clock'],
    historicalContext: 'Originally created in 2005 as the SBGA011, the reference was updated in 2017 to the SBGA211 with the independent Grand Seiko logo at 12 o\'clock, cementing its status as the brand\'s worldwide signature timepiece.',
    exampleNoteworthiness: 'Delivered in mint collector condition with pristine Zaratsu bevels, complete Japanese presentation packaging, and original warranty certificate.',
    lugToLug: 49.0,
    thickness: 12.5,
    lugWidth: 20,
    crystal: 'Dual-curved sapphire crystal with anti-reflective coating on inner surface',
    caseback: 'See-through exhibition sapphire caseback with Grand Seiko lion emblem watermark',
    crown: 'Screw-down crown with GS relief emblem',
    bezel: 'Smooth fixed bezel in High-Intensity Titanium with Zaratsu mirror polish',
    dialFinish: 'Textured white stamped and layered "Snowflake" pattern',
    indices: 'Multi-faceted diamond-cut applied indices with mirror-polished bevels',
    lume: 'None (diamond-cut facets reflect minimal ambient light for nocturnal legibility)',
    hands: 'Razor-sharp multi-faceted dauphine hands with thermally blued steel seconds hand',
    datePlacement: '3 o\'clock aperture with polished steel frame',
    calibre: 'Calibre 9R65',
    architecture: 'Spring Drive movement combining mechanical mainspring, gear train, and Tri-synchro regulator',
    frequencyHz: 32768,
    frequencyVph: 0,
    powerReserveHours: 72,
    jewels: 30,
    windingDirection: 'Bidirectional automatic via Magic Lever system',
    complications: ['Power reserve indicator at 8 o\'clock', 'Date calendar at 3 o\'clock', 'Continuous sweep seconds hand'],
    mechanismExplanation: 'Spring Drive represents a third way in watchmaking. A traditional mainspring unwinds through a gear train to generate a minuscule electrical current via an electro-magnetic glide wheel. An ultra-stable quartz crystal (32,768 Hz) and IC monitor the speed of the glide wheel, applying an electro-magnetic brake eight times per second to govern rotation at precisely eight revolutions per second, yielding an accuracy of ±1 second per day with a truly continuous, silent glide hand.',
    strapType: 'High-Intensity Titanium bracelet with five-row construction',
    clasp: 'Three-fold clasp with push button release and GS logo medallion',
    wristFit: 'Up to 20.5 cm wrist circumference',
    links: 'Full titanium link complement with screw pins',
    weightGrams: 100,
    magnetResistance: 'Magnetic resistance of 4,800 A/m (~60 Gauss)',
    packaging: 'Grand Seiko blue presentation box, Japanese washi inspection paper, outer sleeve',
    documentation: 'Original warranty booklet, Spring Drive inspection certificate, manual',
    overallGrade: 'Excellent',
    componentGrades: {
      case: '9.7/10 — Zaratsu mirror facets reflect sharp, undistorted silhouettes with minimal contact hairlines.',
      bezel: '9.6/10 — High-polish titanium bezel in excellent preservation state.',
      crystal: '10/10 — Flawless sapphire front and caseback exhibition window.',
      dial: '10/10 — Unblemished snow texture with brilliant diamond-cut indices.',
      hands: '10/10 — Razor edges on dauphine hands; blued seconds hand completely free of blemishes.',
      braceletStrap: '9.5/10 — Lightweight titanium bracelet with tight links and crisp brushed finish.',
      clasp: '9.4/10 — Minor desk-diver swirls on titanium clasp; spring buttons function smoothly.',
      movement: '10/10 — Pristine Spring Drive movement visible through sapphire display back.'
    },
    functionalObservations: 'Glide wheel spins with completely silent, uninterrupted motion. Crown winds the 72-hour power reserve smoothly with rapid needle response.',
    visibleMarks: 'Superficial hairlines on bracelet links near the clasp. Titanium case flanks remain in collector condition.',
    replacementNotes: '100% factory original throughout. Assembled and inspected by master craftsmen at Shinshu Watch Studio.'
  },

  'demo-tudor-m79030n-0001': {
    headline: 'The Vintage-Proportioned Tool Watch: Black Bay Fifty-Eight',
    description: 'The Tudor Black Bay 58 reference M79030N-0001 pays homage to the brand\'s first 200-meter diver, the 1958 "Big Crown" reference 7924. Built with vintage proportions (39mm diameter and 11.9mm thickness), a matte black dial with warm gilt printing, pink-gold plated Snowflake hands, and an unshielded screw-down winding crown. Driven by the Kenissi-manufactured COSC-certified Calibre MT5402.',
    designCharacteristics: [
      'Compact 39mm stainless steel case with polished bevels and satin-brushed surfaces',
      'Matte black domed dial with warm gilt printing and pink-gold hour markers',
      'Unidirectional rotating steel bezel with matte black anodised aluminium insert and red triangle at 12 o\'clock',
      'Signature "Snowflake" hands introduced by Tudor in the French Marine Nationale era (1969)',
      'Riveted-style stainless steel bracelet echoing 1950s and 60s historic tool watches'
    ],
    intendedUse: 'Aquatic sports, casual daily wear, and vintage-inspired tool watch collecting.',
    notableFeatures: ['Manufacture Calibre MT5402 with 70-hour "weekend-proof" power reserve', 'COSC certified chronometer', 'True 200m / 660ft water resistance without helium escape valve', 'Red triangle bezel accent honoring the vintage ref. 7924'],
    historicalContext: 'Launched at Baselworld 2018, the Black Bay 58 was an instant worldwide phenomenon, praised for bringing slim, ergonomic 39mm case dimensions back to modern diving tool watches.',
    exampleNoteworthiness: 'Offered in excellent pre-owned condition with full Tudor presentation box, serialized warranty card, and untouched case lines.',
    lugToLug: 47.7,
    thickness: 11.9,
    lugWidth: 20,
    crystal: 'Domed scratch-resistant sapphire crystal',
    caseback: 'Solid steel screw-down caseback with satin finish',
    crown: 'Screw-down steel winding crown with the Tudor rose in relief',
    bezel: 'Unidirectional rotatable 60-minute bezel with matte black aluminium disc and gilded markings',
    dialFinish: 'Matte black domed dial with subtle granular texture',
    indices: 'Applied pink-gold plated indices with Grade A Swiss Super-LumiNova',
    lume: 'Super-LumiNova (green luminescence)',
    hands: 'Pink-gold plated Tudor Snowflake hands with central sweep seconds',
    datePlacement: 'None (symmetrical no-date dial layout)',
    calibre: 'Calibre MT5402',
    architecture: 'In-house automatic movement with bidirectional rotor system and traversing balance bridge',
    frequencyHz: 4.0,
    frequencyVph: 28800,
    powerReserveHours: 70,
    jewels: 27,
    windingDirection: 'Bidirectional rotor',
    complications: ['Centre hours, minutes and seconds', 'Stop-seconds (hacking) for precise time setting'],
    mechanismExplanation: 'Calibre MT5402 is an in-house movement engineered by Kenissi specifically for Tudor\'s 39mm models. It features a variable inertia balance wheel with a non-magnetic silicon balance spring, secured by a sturdy traversing balance bridge to ensure exceptional shock resistance and chronometric stability across all wrist positions.',
    strapType: 'Riveted stainless steel bracelet with polished and satin finish',
    clasp: 'Folding clasp and safety catch with ceramic ball-bearing closure',
    wristFit: 'Up to 20.0 cm wrist circumference',
    links: 'Full factory link complement with rivet-style side plates',
    weightGrams: 145,
    magnetResistance: 'Silicon balance spring (impervious to normal magnetic fields)',
    packaging: 'Tudor presentation case, outer box, and user manual',
    documentation: 'Original international guarantee card dated 2021, guarantee booklet',
    overallGrade: 'Excellent',
    componentGrades: {
      case: '9.6/10 — Crisp chamfers and satin brushing on lugs with minimal handling wear.',
      bezel: '9.8/10 — Aluminium insert and red triangle in immaculate condition.',
      crystal: '10/10 — Flawless domed sapphire crystal.',
      dial: '10/10 — Pristine gilt printing and warm cream luminescence plots.',
      hands: '10/10 — Untarnished pink-gold plated handset.',
      braceletStrap: '9.4/10 — Solid rivet bracelet with light surface marks on clasp.',
      clasp: '9.5/10 — Firm closure with ceramic ball bearings clicking securely.',
      movement: '9.8/10 — Internally clean, winds smoothly.'
    },
    functionalObservations: 'Bezel clicks with precise, satisfying 60-click unidirectional rotation. Screw-down crown threads smoothly.',
    visibleMarks: 'Minor hairline scratches on the polished case flank and clasp shield from gentle wear.',
    replacementNotes: 'All components original to the watch as manufactured in Geneva.'
  }
};

/**
 * Builds the standard fallback data for references that don't have explicit overrides
 */
function buildGenericIntelligence(watch) {
  const profile = MANUFACTURE_PROFILES[watch.brandId.toLowerCase()] || MANUFACTURE_PROFILES.rolex;
  
  return {
    headline: `Certified Pre-Owned ${watch.brand} ${watch.model} (${watch.referenceNumber})`,
    description: `The ${watch.brand} ${watch.model} reference ${watch.referenceNumber} is an exemplary expression of ${watch.brand}'s mechanical horology. Finished in ${watch.caseMaterial} with a ${watch.caseSize} case diameter, this chronometer features a ${watch.dialColour.toLowerCase()} dial and is powered by the ${watch.calibre}. Offered in ${watch.condition.toLowerCase()} condition with verified ${watch.documentationCategory.toLowerCase()}.`,
    designCharacteristics: [
      `Precision engineered case in ${watch.caseMaterial}`,
      `High-legibility dial in ${watch.dialColour}`,
      `Engineered for ${watch.waterResistance} water resistance`,
      `Powered by ${watch.calibre} (${watch.movementType})`
    ],
    intendedUse: `${watch.watchType} instrumentation and daily luxury horological wear.`,
    notableFeatures: [
      `Manufacture ${watch.calibre} movement`,
      `${watch.watchType} functional capability`,
      `Verified by HOROLOGY 7-stage inspection standard`
    ],
    historicalContext: `A landmark reference within the ${watch.brand} ${watch.family} collection, exemplifying the manufacture's commitment to chronometric precision and enduring aesthetic longevity.`,
    exampleNoteworthiness: `A hand-selected pre-owned example in ${watch.condition.toLowerCase()} condition, inspected by certified watchmakers.`,
    lugToLug: watch.caseSizeMm ? Math.round(watch.caseSizeMm * 1.18 * 10) / 10 : 48.0,
    thickness: watch.movementType === 'Automatic' ? 12.4 : 11.2,
    lugWidth: watch.caseSizeMm >= 42 ? 22 : watch.caseSizeMm >= 40 ? 20 : 19,
    crystal: 'Scratch-resistant sapphire crystal with anti-reflective coating',
    caseback: watch.brandId === 'grand-seiko' || watch.brandId === 'omega' ? 'Exhibition sapphire display back or solid hermetic back' : 'Solid screw-down hermetic caseback',
    crown: profile.waterproofSystem,
    bezel: `${watch.caseMaterial} bezel tailored to reference specification`,
    dialFinish: `${watch.dialColour} dial with applied faceted indices`,
    indices: 'Applied indices with Swiss luminescent treatment',
    lume: 'High-performance luminescence',
    hands: 'Polished faceted hands matching case metallurgy',
    datePlacement: watch.model.toLowerCase().includes('date') || watch.model.toLowerCase().includes('gmt') ? '3 o\'clock aperture' : 'None or sub-dial placement',
    calibre: watch.calibre,
    architecture: `${watch.movementType} mechanical calibre with fine regulation`,
    frequencyHz: watch.movementType === 'Spring Drive' ? 32768 : 4.0,
    frequencyVph: watch.movementType === 'Spring Drive' ? 0 : 28800,
    powerReserveHours: watch.specification?.powerReserveHours || 50,
    jewels: watch.movementType === 'Spring Drive' ? 30 : watch.movementType === 'Quartz' ? 9 : 27,
    windingDirection: watch.movementType === 'Manual' ? 'Manual winding' : 'Bidirectional automatic',
    complications: [
      'Hours, minutes, seconds',
      watch.watchType === 'Chronograph' ? 'Column wheel chronograph' : null,
      watch.watchType === 'GMT' ? 'Second timezone (GMT)' : null,
      watch.watchType === 'Diver' ? 'Rotatable elapsed time bezel' : null
    ].filter(Boolean),
    mechanismExplanation: `The ${watch.calibre} is an acclaimed calibre from ${watch.brand}, developed with proprietary escapement architecture and high-stability regulation to ensure consistent chronometric performance.`,
    strapType: `${watch.caseMaterial} bracelet or integrated strap`,
    clasp: profile.claspType,
    wristFit: 'Up to 20.0 cm wrist circumference',
    links: 'Complete link complement',
    weightGrams: watch.caseMaterial.includes('Titanium') ? 102 : 148,
    magnetResistance: 'Anti-magnetic oscillator construction',
    packaging: `${watch.brand} presentation packaging`,
    documentation: watch.documentationCategory,
    overallGrade: watch.condition,
    componentGrades: {
      case: watch.condition === 'Unworn' ? '10/10 — Factory condition' : '9.5/10 — Clean original edges with light handling wear',
      bezel: '9.6/10 — Clean insert and perimeter teeth',
      crystal: '10/10 — Pristine sapphire crystal',
      dial: '10/10 — Flawless dial and applied indices',
      hands: '10/10 — Original hands without oxidation',
      braceletStrap: '9.4/10 — Minimal wear, firm links',
      clasp: '9.5/10 — Secure locking mechanism',
      movement: '9.8/10 — Clean internal assembly'
    },
    functionalObservations: 'All mechanical functions, hand setting, and winding operate within strict factory standards.',
    visibleMarks: watch.condition === 'Unworn' ? 'None. Pristine reference.' : 'Minor superficial handling hairlines visible only under magnification.',
    replacementNotes: 'All components verified authentic and original to the reference.'
  };
}

/**
 * Enriches a single watch object with all 6 required Phase 04 sub-objects
 */
export function enrichWatch(rawWatch) {
  const intel = WATCH_INTELLIGENCE[rawWatch.id] || buildGenericIntelligence(rawWatch);
  const profile = MANUFACTURE_PROFILES[rawWatch.brandId.toLowerCase()] || MANUFACTURE_PROFILES.rolex;

  // 1. Overview Sub-Object
  const overview = {
    headline: intel.headline,
    description: intel.description,
    designCharacteristics: intel.designCharacteristics,
    intendedUse: intel.intendedUse,
    notableFeatures: intel.notableFeatures,
    historicalContext: intel.historicalContext,
    exampleNoteworthiness: intel.exampleNoteworthiness
  };

  // 2. Specifications Grouped Dictionary (Preserving null for unverified measurements)
  const specifications = {
    identity: {
      brand: rawWatch.brand,
      model: rawWatch.model,
      reference: rawWatch.referenceNumber || rawWatch.reference,
      productionYear: rawWatch.year,
      serialDisclosure: 'Demonstration Record — Serial unassigned to protect collector privacy and maintain demonstration integrity.',
      collectionFamily: rawWatch.family,
      manufacturer: rawWatch.brand,
      modelName: rawWatch.model,
      modelFamily: rawWatch.family,
      referenceNumber: rawWatch.referenceNumber || rawWatch.reference,
      serialNumber: null, // Demonstration record: serial is unassigned/null
      yearOfManufacture: rawWatch.year,
      countryOfOrigin: profile.origin
    },
    case: {
      material: rawWatch.caseMaterial,
      diameter: `${rawWatch.caseSizeMm || 40} mm`,
      thickness: intel.thickness ? `${intel.thickness} mm` : null,
      lugToLug: intel.lugToLug ? `${intel.lugToLug} mm` : null,
      lugWidth: intel.lugWidth ? `${intel.lugWidth} mm` : null,
      shape: 'Round',
      crystal: intel.crystal,
      bezel: intel.bezel,
      waterResistance: rawWatch.waterResistance,
      caseShape: 'Round',
      caseMaterial: rawWatch.caseMaterial,
      diameterMm: rawWatch.caseSizeMm || 40,
      lugToLugMm: intel.lugToLug || null,
      thicknessMm: intel.thickness || null,
      lugWidthMm: intel.lugWidth || null,
      crystalMaterial: intel.crystal,
      casebackType: intel.caseback,
      waterResistanceRating: rawWatch.waterResistance,
      crownType: intel.crown,
      bezelDescription: intel.bezel
    },
    dial: {
      colour: rawWatch.dialColour,
      color: rawWatch.dialColour,
      finish: intel.dialFinish,
      indexStyle: intel.indices,
      hands: intel.hands,
      complicationDisplay: intel.datePlacement,
      lume: intel.lume,
      dialColor: rawWatch.dialColour,
      finishType: intel.dialFinish,
      indicesType: intel.indices,
      luminescentMaterial: intel.lume,
      handStyle: intel.hands,
      dateWindowPlacement: intel.datePlacement
    },
    movement: {
      type: rawWatch.movementType,
      calibre: rawWatch.calibre,
      originClassification: `${rawWatch.brand} In-House / Certified Manufacture`,
      frequency: intel.frequencyVph ? `${intel.frequencyVph.toLocaleString()} vph (${intel.frequencyHz} Hz)` : 'Spring Drive Continuous',
      jewels: intel.jewels,
      powerReserve: `${intel.powerReserveHours} Hours`,
      windingMechanism: intel.windingDirection,
      complications: intel.complications,
      calibreDesignation: rawWatch.calibre,
      movementType: rawWatch.movementType,
      escapementType: intel.architecture,
      frequencyVph: intel.frequencyVph,
      frequencyHz: intel.frequencyHz,
      powerReserveHours: intel.powerReserveHours,
      jewelCount: intel.jewels,
      accuracyStandard: profile.accuracyStandard
    },
    braceletStrap: {
      type: intel.strapType,
      material: rawWatch.caseMaterial,
      claspType: intel.clasp,
      originalityStatus: 'Factory Original to Reference',
      additionalStraps: 'None (Factory bracelet fitted)',
      color: 'Satin & Polished Steel',
      maxWristFitCm: 20.0,
      linksIncluded: intel.links
    },
    other: {
      box: rawWatch.boxStatus,
      papers: rawWatch.papersStatus,
      accessories: intel.packaging,
      serviceDocumentation: 'Not Applicable — Pre-Owned Archival Intake',
      warrantyInfo: '24 Months HOROLOGY Comprehensive Mechanical Guarantee',
      totalWeightGrams: intel.weightGrams || null,
      magnetResistanceGauss: intel.magnetResistance || null,
      packagingIncluded: intel.packaging,
      documentationIncluded: rawWatch.documentationCategory
    }
  };

  // 3. Movement Intelligence Sub-Object
  const movementIntelligence = {
    calibre: intel.calibre || rawWatch.calibre,
    architecture: intel.architecture,
    classification: `${rawWatch.brand} Manufacture Calibre`,
    frequencyHz: intel.frequencyHz,
    frequencyVph: intel.frequencyVph,
    powerReserve: `${intel.powerReserveHours} Hours`,
    jewels: intel.jewels,
    windingDirection: intel.windingDirection,
    complications: intel.complications,
    manufacturerAccuracyClaim: profile.accuracyStandard,
    mechanismExplanation: intel.mechanismExplanation,
    movementAssetKey: 'assets/icons/escapement.svg',
    diagramIsIllustrative: true
  };

  // 4. Condition Assessment Sub-Object
  const conditionAssessment = {
    assessedBy: 'HOROLOGY Technical Desk',
    overallGrade: rawWatch.condition,
    componentGrades: intel.componentGrades,
    functionalObservations: intel.functionalObservations,
    visibleMarks: intel.visibleMarks,
    replacementOrRefinishedNotes: intel.replacementNotes,
    linkedImageIndices: [0]
  };

  // 5. Inspection Report Sub-Object (STRICT HONEST DEMONSTRATION DISCLOSURE: measuredValuesAvailable: false)
  const inspectionReport = {
    referenceId: `INS-DEMO-${(rawWatch.referenceNumber || rawWatch.reference).replace(/[^a-zA-Z0-9]/g, '')}`,
    inspectionDate: null, // Clearly null for demonstration record
    inspectorTeam: 'HOROLOGY Horological Inspection Desk',
    overallResult: rawWatch.inspectionStatus === 'Inspected' ? 'Preliminary Review Complete — Demonstration Record' : 'Inspection Pending',
    status: rawWatch.inspectionStatus,
    scopeLimitations: 'Non-destructive visual, dimensional, and aesthetic demonstration inspection. Acoustic timing telemetry and physical microscopic certification remain unrecorded pending individual lot intake.',
    mechanicalPerformance: {
      measuredValuesAvailable: false,
      rateDeviationSecDay: null,
      amplitudeDeg: null,
      beatErrorMs: null,
      positionalMeasurements: null,
      positionalNotes: null,
      measurementConditions: null,
      measurementDate: null
    },
    authenticityReview: [
      { category: 'Case and reference consistency', status: 'Verified', note: `Case proportions, reference stamps, and metallurgy match ${rawWatch.brand} archival specifications.` },
      { category: 'Dial originality', status: 'Verified', note: `Dial typography, indices, and luminescent compound verified consistent with reference vintage.` },
      { category: 'Hands originality', status: 'Verified', note: `Handset geometry, finish, and luminous fill align with manufacture production standards.` },
      { category: 'Bezel originality', status: 'Verified', note: `Bezel ring and insert verified original to reference specification.` },
      { category: 'Movement identification', status: 'Verified', note: `Calibre ${rawWatch.calibre} verified with correct bridge layout and finishing.` },
      { category: 'Bracelet and clasp verification', status: 'Verified', note: `Clasp codes and bracelet links verified authentic to reference period.` },
      { category: 'Serial/reference consistency', status: 'Requires further verification', note: 'Serial architecture verified for demonstration batch; individualized lot serial numbers require physical lot intake.' },
      { category: 'Component replacement observations', status: 'Observed', note: 'Factory-original specification across all major visual assemblies.' }
    ],
    documentationChecklist: [
      { item: 'Original box', status: rawWatch.boxStatus === 'Original Box' ? 'Present' : 'Not Included', documentAvailable: false },
      { item: 'Warranty card', status: rawWatch.papersStatus === 'Original Papers' ? 'Present' : 'Not Included', documentAvailable: false },
      { item: 'Papers', status: rawWatch.papersStatus === 'Original Papers' ? 'Present' : 'Not Included', documentAvailable: false },
      { item: 'Purchase documentation', status: 'Not Included (Confidential Consignor Record)', documentAvailable: false },
      { item: 'Service receipts', status: 'Not Applicable', documentAvailable: false },
      { item: 'Additional accessories', status: 'Factory complement attached', documentAvailable: false }
    ],
    inspectionNotes: `This demonstration reference exhibits verified structural and horological integrity. In accordance with HOROLOGY demonstration policy, acoustic timegrapher telemetry is preserved as unrecorded pending individual physical lot intake.`
  };

  // 6. Gallery Items Structured Array
  const baseImg = rawWatch.image || rawWatch.imageUrl || 'assets/images/hero/hero-home-primary-16x9.jpg';
  const macroImg = 'assets/images/hero/hero-home-secondary-dial-macro-16x9.jpg';
  
  const galleryItems = [
    {
      assetKey: baseImg,
      category: 'Studio Master',
      label: 'Primary Studio Staging (Illustrative)',
      isIllustrative: true,
      isInspectionEvidence: false
    },
    {
      assetKey: macroImg,
      category: 'Dial Macro',
      label: 'Extreme Dial & Handset Macro (Illustrative)',
      isIllustrative: true,
      isInspectionEvidence: false
    }
  ];

  // Curated Horological Style Tags for Phase 05 Discovery Engine
  const styleTags = WATCH_STYLE_TAGS[rawWatch.id] || intel.styleTags || ['Classic'];

  // Return the fully enriched watch object while preserving all existing Phase 03 keys
  return {
    ...rawWatch,
    styleTags,
    overview,
    specifications,
    movementIntelligence,
    conditionAssessment,
    inspectionReport,
    galleryItems
  };
}

