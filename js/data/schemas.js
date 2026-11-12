// HOROLOGY — Data Schemas Definition

export const WATCH_SCHEMA_TEMPLATE = {
  id: '',
  slug: '',
  brand: '',
  model: '',
  referenceNumber: '',
  year: 2022,
  price: 0,
  availability: 'Available', // 'Available' | 'Reserved' | 'Sold'
  featured: false,
  tagline: '',
  heroBadge: 'Verified',
  images: [], // array of { url, angle, caption }

  specification: {
    dataStatus: 'demonstration',
    calibre: '',
    movementType: 'Automatic', // 'Automatic' | 'Manual Wind' | 'Spring Drive'
    beatRateVph: 28800,
    powerReserveHours: 48,
    caseDiameterMm: 40,
    caseMaterial: 'Stainless Steel',
    bezelMaterial: 'Ceramic',
    crystal: 'Sapphire Crystal with Anti-Reflective Coating',
    dialColor: 'Black',
    waterResistanceMeters: 100,
    bracelet: 'Stainless Steel Oyster'
  },

  condition: {
    dataStatus: 'demonstration',
    overallGrade: 'Mint (9.5/10)',
    caseCondition: 'No dings or major scratches. Factory bevels intact.',
    bezelCondition: 'Flawless ceramic insert.',
    crystalCondition: 'Completely unblemished.',
    dialAndHands: 'Pristine original factory condition. Lume fully responsive.',
    braceletCondition: 'Full links, zero lateral stretch.',
    polishHistory: 'Unpolished original factory finish.'
  },

  movementReport: {
    dataStatus: 'demonstration',
    testDate: '2026-10-12',
    testingInstrument: 'Witschi Chronoscope S1',
    liftAngleDeg: 52,
    timeSinceFullWind: '24 Hours',
    averageRateSecPerDay: +3,
    amplitudeDeg: 268,
    beatErrorMs: 0.1,
    amplitudeStatus: 'Optimal (Within Factory Spec)',
    rateStatus: 'Excellent (+3 s/d)',
    positions: [
      { position: 'Dial Up (CH)', rateSec: +3, amplitudeDeg: 268, beatErrorMs: 0.1 },
      { position: 'Dial Down (FH)', rateSec: +4, amplitudeDeg: 270, beatErrorMs: 0.1 },
      { position: 'Crown Up (6H)', rateSec: +1, amplitudeDeg: 267, beatErrorMs: 0.2 },
      { position: 'Crown Down (9H)', rateSec: +2, amplitudeDeg: 265, beatErrorMs: 0.1 }
    ]
  },

  boxAndPapers: {
    dataStatus: 'demonstration',
    hasOriginalBox: true,
    hasWarrantyCard: true,
    hasManual: true,
    hasSerializedHangtag: true,
    papersDate: '2022-08-15',
    notes: 'Complete collector set including original inner & outer green box, serialized green card, and booklet.'
  },

  serviceHistory: {
    dataStatus: 'demonstration',
    lastServiceDate: '2025-11-20',
    serviceCenter: 'Authorized Horological Atelier',
    workPerformed: 'Acoustic escapement check, ultrasonic case cleansing, fresh synthetic lubrication, pressure seal test to 300m.',
    nextServiceRecommended: '2030'
  },

  provenance: {
    dataStatus: 'demonstration',
    originalCountry: 'Switzerland',
    previousOwners: 1,
    collectorNotes: 'Acquired directly from private prominent collector. Vault kept.'
  }
};
