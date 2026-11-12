/**
 * HOROLOGY — Central Business Configuration & Integration Registry
 * Phase 07 (Business & Responsive)
 *
 * Central source of truth for all business credentials, salon coordinates,
 * external integration endpoints, and service capabilities.
 *
 * STRICT HONESTY RULES:
 * - Unconfigured fields remain null.
 * - The UI inspects these values and conditionally renders only verified details.
 * - Never fabricate phone numbers, physical addresses, or business hours.
 */

export const BUSINESS_CONFIG = {
  brand: {
    name: 'HOROLOGY',
    tagline: 'Beyond Time. Beyond Ordinary.',
    establishedNotice: 'An independent platform dedicated to the appreciation and stewardship of fine mechanical horology.',
    trademarkNotice: 'HOROLOGY is an independent platform and is not sponsored, affiliated with, or endorsed by Rolex SA, Omega SA, Tudor SA, or Grand Seiko. All registered trademarks remain the property of their respective owners.'
  },

  // Legal & Institutional Notices
  legal: {
    trademarkDisclaimer: 'HOROLOGY is an independent platform and is not sponsored, affiliated with, or endorsed by Rolex SA, Omega SA, Tudor SA, or Grand Seiko. All registered trademarks remain the property of their respective owners.',
    copyrightNotice: '© 2026 HOROLOGY. All rights reserved.'
  },

  // Contact Information (Configurable — only populated fields render in UI)
  contact: {
    email: null, // e.g., 'concierge@horology.com' when configured by operator
    phone: null, // e.g., '+41 22 000 0000'
    whatsapp: null, // e.g., '+41 79 000 0000'
    address: null, // Physical salon address when officially verified
    hours: null, // e.g., 'Monday – Friday, 09:00 – 18:00 CET by prior arrangement'
    timeZone: 'UTC',
    preferredChannels: ['Email', 'Phone', 'WhatsApp']
  },

  // Verified Social Presence (Empty unless configured)
  social: {
    instagram: null,
    linkedin: null,
    youtube: null
  },

  // Core Horological Houses Focus
  specialisations: [
    { id: 'rolex', name: 'Rolex', origin: 'Geneva, Switzerland', focus: 'Oyster Perpetual, Professional Chronometers' },
    { id: 'omega', name: 'Omega', origin: 'Bienne, Switzerland', focus: 'Co-Axial Master Chronometers, Speedmaster, Seamaster' },
    { id: 'tudor', name: 'Tudor', origin: 'Geneva, Switzerland', focus: 'Kenissi Manufacture Tool Watches, Black Bay, Pelagos' },
    { id: 'grand-seiko', name: 'Grand Seiko', origin: 'Shizukuishi & Shinshu, Japan', focus: 'Spring Drive, High-Beat 9S, Zaratsu Craftsmanship' }
  ],

  // Service Offerings (Configurable descriptors without unsupported guarantees)
  services: {
    sellConsign: {
      directSale: {
        title: 'Direct Acquisition Discussion',
        summary: 'Explore an outright purchase proposal following examination and verification of your timepiece.',
        description: 'Submit your timepiece references for preliminary review. If suitable, terms for a direct acquisition proposal may be discussed following verification.'
      },
      consignment: {
        title: 'Private Consignment',
        summary: 'Curate your timepiece within our collector network on bespoke, mutually agreed terms.',
        description: 'Consignment terms, duration, and settlement arrangements are established individually for each accepted timepiece based on reference condition and documentation.'
      }
    },
    appointments: {
      title: 'Consultation & Private Viewing Requests',
      summary: 'Express interest in arranging an in-depth conversation or viewing regarding an individual reference or collection.',
      description: 'Appointments are scheduled by prior request and mutual confirmation. In-person viewing is subject to salon availability and reference location.'
    }
  },

  // External Submission Endpoints (Null on static GitHub Pages deployment)
  integrations: {
    formSubmissionEndpoint: null, // e.g., 'https://api.horology.com/v1/enquiries'
    appointmentEndpoint: null, // e.g., 'https://api.horology.com/v1/appointments'
    uploadServiceEndpoint: null, // e.g., 'https://uploads.horology.com/v1/presigned-url'
    isStaticEnvironment: true // Honest indicator that static hosting requires client-assisted transmission
  }
};

/**
 * Check whether a contact channel has a verified value configured
 */
export function hasContactValue(key) {
  return Boolean(BUSINESS_CONFIG.contact[key]);
}

/**
 * Retrieve a configured contact field or a safe empty fallback
 */
export function getContactValue(key) {
  return BUSINESS_CONFIG.contact[key] || '';
}

/**
 * Check whether an external API endpoint is configured
 */
export function isEndpointConfigured(endpointKey) {
  return Boolean(BUSINESS_CONFIG.integrations[endpointKey]);
}

