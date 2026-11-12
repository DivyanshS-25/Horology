// HOROLOGY — Watch Finder Scoring Engine
import { repository } from '../data/repository.js';

export function scoreWatchesForFinder(answers = {}) {
  const allWatches = repository.getAllWatches();

  const scored = allWatches.map(watch => {
    let score = 0;
    const matchReasons = [];

    // 1. Budget Match (Weight: 30)
    if (answers.budget) {
      const { min, max } = answers.budget;
      if (watch.price >= min && watch.price <= max) {
        score += 30;
        matchReasons.push('Within Target Budget');
      } else if (watch.price >= min * 0.85 && watch.price <= max * 1.15) {
        score += 15;
        matchReasons.push('Near Target Budget');
      }
    }

    // 2. Brand Match (Weight: 25)
    if (answers.brand && answers.brand.brandId) {
      if (watch.brandId.toLowerCase() === answers.brand.brandId.toLowerCase()) {
        score += 25;
        matchReasons.push(`Matched Preferred House (${watch.brand})`);
      }
    } else {
      score += 20; // Open to all houses
    }

    // 3. Typology Match (Weight: 20)
    if (answers.type && answers.type.visualType) {
      if (watch.visualType === answers.type.visualType) {
        score += 20;
        matchReasons.push(`Ideal ${answers.type.label} Architecture`);
      }
    }

    // 4. Movement Mechanism Match (Weight: 15)
    if (answers.movement && answers.movement.movementType) {
      if (watch.specification.movementType === answers.movement.movementType) {
        score += 15;
        matchReasons.push(`${watch.specification.movementType} Calibre`);
      }
    } else {
      score += 10;
    }

    // 5. Case Size Match (Weight: 10)
    if (answers.caseSize) {
      const { minSize, maxSize } = answers.caseSize;
      if (watch.specification.caseDiameterMm >= minSize && watch.specification.caseDiameterMm <= maxSize) {
        score += 10;
        matchReasons.push(`Comfort Case Proportion (${watch.specification.caseDiameterMm} mm)`);
      }
    }

    return {
      watch,
      score: Math.min(100, Math.round(score)),
      matchReasons
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}
