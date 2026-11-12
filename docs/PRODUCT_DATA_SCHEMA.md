# HOROLOGY — Canonical Product Data Schema (Phase 04 Specification)
**Authoritative Location:** `js/data.js` & `js/data/enrichWatchData.js`  
**Record Count:** 24 Curated Demonstration References (Rolex: 6, Omega: 6, Tudor: 6, Grand Seiko: 6)

---

## 1. Schema Design Philosophy

The HOROLOGY product data architecture is built on three core tenets:
1. **Backward Compatibility:** All Phase 03 top-level marketplace properties (`id`, `slug`, `brand`, `model`, `reference`, `price`, `condition`, `movementType`, `specification`, etc.) are preserved 100% intact so existing filtering, sorting, and card factories function seamlessly.
2. **Nullable-Safety & Anti-Fabrication:** Where measurements or historical data are not verified from standard manufacturer archives (such as exact unverified lug-to-lug or lot-specific acoustic timegrapher rates), fields are set strictly to `null`. The UI renders graceful unavailable states rather than fabricated numbers.
3. **Domain Authenticity:** Every reference contains authentic movement calibres, escapement architectures, frequencies, and tolerances representing real horological archetypes.

---

## 2. Complete Watch Record Schema

```typescript
interface CanonicalWatchRecord {
  // --- Phase 03 Top-Level Marketplace Keys ---
  id: string;                     // e.g. "demo-rolex-126610ln"
  slug: string;                   // e.g. "rolex-submariner-date-126610ln"
  isDemonstration: boolean;       // strictly true for all demo records
  brand: string;                  // "Rolex" | "Omega" | "Tudor" | "Grand Seiko"
  brandId: string;                // "rolex" | "omega" | "tudor" | "grand-seiko"
  model: string;                  // e.g. "Submariner Date"
  family: string;                 // e.g. "Submariner"
  reference: string;              // e.g. "126610LN"
  referenceNumber: string;        // e.g. "126610LN"
  price: number;                  // e.g. 1285000 (INR)
  currency: string;               // "INR"
  year: number;                   // e.g. 2022
  condition: string;              // "Unworn" | "Excellent" | "Very Good" | "Good" | "Fair"
  movementType: string;           // "Automatic" | "Manual" | "Spring Drive" | "Quartz"
  calibre: string;                // e.g. "Calibre 3235"
  watchType: string;              // "Diver" | "Chronograph" | "Dress" | "GMT" | "Field" | "Sports"
  caseMaterial: string;           // e.g. "Oystersteel (904L)"
  caseSize: string;               // e.g. "41 mm"
  caseSizeMm: number;             // e.g. 41
  dialColour: string;             // e.g. "Black"
  waterResistance: string;        // e.g. "300 m / 1,000 ft"
  boxStatus: string;              // "Original Box" | "No Box"
  papersStatus: string;           // "Original Papers" | "No Papers"
  documentationCategory: string;  // "Box and Papers" | "Original Box" | "Original Papers" | "Watch Only"
  inspectionStatus: string;       // "Inspected" | "Inspection Pending"
  image: string;                  // relative asset path
  imageUrl: string;               // alias to image
  gallery: string[];              // flat string array
  imageIsIllustrative: boolean;   // true
  featured: boolean;
  featuredOrder?: number;
  collectorSpotlight?: boolean;
  listedOrder?: number;
  availability: string;           // "Available" | "Reserved"
  summary: string;
  tagline: string;
  heroBadge?: string;
  keywords: string[];

  // --- Phase 04 Deep Horological Sub-Objects ---

  // 1. Curatorial Overview
  overview: {
    headline: string;
    description: string;
    designCharacteristics: string[];
    intendedUse: string;
    notableFeatures: string[];
    historicalContext: string;
    exampleNoteworthiness: string;
  };

  // 2. Six-Group Technical Specifications Matrix
  specifications: {
    identity: {
      brand: string;
      model: string;
      reference: string;
      productionYear: number;
      serialDisclosure: string;
      collectionFamily: string;
      manufacturer: string;
      modelName: string;
      modelFamily: string;
      referenceNumber: string;
      serialNumber: null;
      yearOfManufacture: number;
      countryOfOrigin: string;
    };
    case: {
      material: string;
      diameter: string;
      thickness: string | null;
      lugToLug: string | null;
      lugWidth: string | null;
      shape: string;
      crystal: string;
      bezel: string;
      waterResistance: string;
      caseShape: string;
      caseMaterial: string;
      diameterMm: number;
      lugToLugMm: number | null;
      thicknessMm: number | null;
      lugWidthMm: number | null;
      crystalMaterial: string;
      casebackType: string;
      waterResistanceRating: string;
      crownType: string;
      bezelDescription: string;
    };
    dial: {
      colour: string;
      color: string;
      finish: string;
      indexStyle: string;
      hands: string;
      complicationDisplay: string;
      lume: string;
      dialColor: string;
      finishType: string;
      indicesType: string;
      luminescentMaterial: string;
      handStyle: string;
      dateWindowPlacement: string;
    };
    movement: {
      type: string;
      calibre: string;
      originClassification: string;
      frequency: string;
      jewels: number;
      powerReserve: string;
      windingMechanism: string;
      complications: string[];
      calibreDesignation: string;
      movementType: string;
      escapementType: string;
      frequencyVph: number;
      frequencyHz: number;
      powerReserveHours: number;
      jewelCount: number;
      accuracyStandard: string;
    };
    braceletStrap: {
      type: string;
      material: string;
      claspType: string;
      originalityStatus: string;
      additionalStraps: string;
      color: string;
      maxWristFitCm: number;
      linksIncluded: string;
    };
    other: {
      box: string;
      papers: string;
      accessories: string;
      serviceDocumentation: string;
      warrantyInfo: string;
      totalWeightGrams: number | null;
      magnetResistanceGauss: number | null;
      packagingIncluded: string;
      documentationIncluded: string;
    };
  };

  // 3. Movement Intelligence
  movementIntelligence: {
    calibre: string;
    architecture: string;
    classification: string;
    frequencyHz: number;
    frequencyVph: number;
    powerReserve: string;
    jewels: number;
    windingDirection: string;
    complications: string[];
    manufacturerAccuracyClaim: string;
    mechanismExplanation: string;
    movementAssetKey: string | null;
    diagramIsIllustrative: boolean;
  };

  // 4. Condition Assessment
  conditionAssessment: {
    assessedBy: "HOROLOGY Technical Desk";
    overallGrade: "Unworn" | "Excellent" | "Very Good" | "Good" | "Fair";
    componentGrades: {
      case: string;
      bezel: string;
      crystal: string;
      dial: string;
      hands: string;
      braceletStrap: string;
      clasp: string;
      movement: string;
    };
    functionalObservations: string;
    visibleMarks: string;
    replacementOrRefinishedNotes: string;
    linkedImageIndices: number[];
  };

  // 5. Archival Inspection Report
  inspectionReport: {
    referenceId: string;         // e.g. "INS-DEMO-126610LN"
    inspectionDate: string | null;
    inspectorTeam: string;
    overallResult: string;
    status: string;
    scopeLimitations: string;
    mechanicalPerformance: {
      measuredValuesAvailable: false;
      rateDeviationSecDay: null;
      amplitudeDeg: null;
      beatErrorMs: null;
      positionalMeasurements: null;
      positionalNotes: null;
      measurementConditions: null;
      measurementDate: null;
    };
    authenticityReview: Array<{
      category: string;
      status: "Verified" | "Observed" | "Requires further verification" | "Not assessed" | "Not applicable";
      note: string;
    }>;
    documentationChecklist: Array<{
      item: string;
      status: string;
      documentAvailable: boolean;
    }>;
    inspectionNotes: string;
  };

  // 6. Structured Gallery Items
  galleryItems: Array<{
    assetKey: string;
    category: string;
    label: string;
    isIllustrative: boolean;
    isInspectionEvidence: boolean;
  }>;
}
```

