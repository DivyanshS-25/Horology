// HOROLOGY — Data Schema Validators & Honesty Layer Enforcement

export const DATA_STATUS = {
  VERIFIED: 'verified',
  DEMONSTRATION: 'demonstration',
  UNAVAILABLE: 'unavailable'
};

export function validateWatchRecord(record) {
  const errors = [];
  if (!record.id) errors.push('Missing unique ID');
  if (!record.slug) errors.push('Missing slug');
  if (!record.brand) errors.push('Missing brand');
  if (!record.model) errors.push('Missing model');
  if (!record.price || typeof record.price !== 'number') errors.push('Missing or invalid price');

  const requiredBlocks = ['specification', 'condition', 'movementReport', 'boxAndPapers', 'serviceHistory', 'provenance'];
  for (const block of requiredBlocks) {
    if (!record[block]) {
      errors.push(`Missing data block: ${block}`);
    } else if (!record[block].dataStatus) {
      errors.push(`Missing dataStatus on block: ${block}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function isVerified(block) {
  return block && block.dataStatus === DATA_STATUS.VERIFIED;
}
