# HOROLOGY — Centralized Business Configuration Specification (Phase 07)

## 1. Overview & Architectural Role

`js/config.js` acts as the single source of truth for all brand metadata, contact channels, external service integrations, and legal disclosures across the HOROLOGY Single-Page Application.

In strict compliance with the **Honest Information Principle** established in the HOROLOGY Master Directives:
- **Zero Synthetic Information:** Fictitious telephone numbers, fake company registration identifiers, invented founder biographies, fabricated street addresses, or synthetic business operating hours are strictly prohibited.
- **Null Safety & Progressive Enhancement:** Any business channel or external endpoint not explicitly confirmed by the marketplace operator must remain `null`. The user interface is built to gracefully suppress unconfigured channels or seamlessly pivot to static-safe fallback workflows (such as client-side email dispatch and clipboard payloads).

---

## 2. Configuration Schema (`BUSINESS_CONFIG`)

```javascript
export const BUSINESS_CONFIG = {
  // Brand Identity Tokens
  brand: {
    name: 'HOROLOGY',
    tagline: 'Beyond Time. Beyond Ordinary.',
    description: 'A considered sanctuary of certified pre-owned mechanical chronometers. Verified with forensic horological rigor and transparent timegrapher telemetry.',
    themeColor: '#07111F',
    accentColor: '#8DB8E8',
    surfaceColor: '#102238',
    copyrightYear: 2026,
    version: '1.7.0'
  },

  // Contact Channels
  // Only explicitly verified channels are populated; all others remain null.
  contact: {
    email: 'concierge@horology.example',
    phone: null,     // Set to verified telephone string (e.g. '+44 20 7946 0912') when established
    whatsapp: null,  // Set to verified WhatsApp international string when established
    address: null,   // Set to verified atelier address when physical showroom opens
    hours: null      // Set to verified operating schedule string when established
  },

  // Social & Community Presence
  social: {
    instagram: null,
    youtube: null,
    twitter: null,
    linkedin: null
  },

  // Third-Party Integrations & Microservice Endpoints
  // While null, all forms operate via honest client-side transmission modal.
  integrations: {
    formSubmissionEndpoint: null, // e.g. 'https://api.horology.example/v1/enquiry'
    appointmentEndpoint: null,    // e.g. 'https://api.horology.example/v1/appointment'
    uploadServiceEndpoint: null,  // e.g. 'https://api.horology.example/v1/upload'
    analyticsId: null
  },

  // Legal & Regulatory Disclosures
  legal: {
    companyRegistrationName: 'HOROLOGY Pre-Owned Timepieces',
    jurisdiction: 'United Kingdom / European Union / International',
    copyrightNotice: '© 2026 HOROLOGY. All rights reserved.',
    trademarkDisclaimer: 'HOROLOGY is an independent pre-owned luxury watch dealer and is not affiliated, authorized, associated, or endorsed by Rolex SA, Montres Tudor SA, The Swatch Group (Omega SA), or Seiko Watch Corporation.'
  }
};
```

---

## 3. Truthfulness Helper API

To prevent repetitive null-checking boilerplate in page controllers and UI components, `js/config.js` exports three safe helper utilities:

### `hasContactValue(channelKey)`
Returns `true` only if the specified contact channel exists in `BUSINESS_CONFIG.contact` and contains a non-empty string.
```javascript
import { hasContactValue } from '../js/config.js';

if (hasContactValue('phone')) {
  // Render telephone widget
}
```

### `getContactValue(channelKey, fallback = '')`
Safely retrieves the configured channel string or returns a safe fallback if unconfigured.
```javascript
import { getContactValue } from '../js/config.js';

const email = getContactValue('email', 'enquiries@horology.example');
```

### `isEndpointConfigured(endpointKey)`
Checks whether a given integration microservice URL is configured.
```javascript
import { isEndpointConfigured } from '../js/config.js';

if (isEndpointConfigured('formSubmissionEndpoint')) {
  // Send asynchronous fetch POST
} else {
  // Open static transmission modal
}
```

---

## 4. UI Consumption Matrix

| Configuration Token | Primary Consumers | Fallback Behavior when `null` |
| :--- | :--- | :--- |
| `brand.name` / `brand.tagline` | Header, Footer, SEO metadata, Page titles | Static string constants |
| `contact.email` | Contact page, Sell/Consign wizard, Appointment modal, Footer | Fallback mailto recipient |
| `contact.phone` | Contact page, Mobile drawer, Institutional footer | Channel item suppressed |
| `contact.whatsapp` | Contact page, Mobile drawer | Channel item suppressed |
| `contact.address` | Contact page, Appointment venue card | Replaced with "Private Atelier by Prior Appointment" |
| `contact.hours` | Contact page, Appointment schedule | Replaced with "Consultations Scheduled Individually" |
| `integrations.*` | `js/forms.js` unified submission adapter | Transparent Transmission Modal with copy & mailto |
| `legal.trademarkDisclaimer` | `#/legal/disclaimer`, Footer, Inspection Dossiers | Prominent non-affiliation legal notice banner |

