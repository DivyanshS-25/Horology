# HOROLOGY — Contact & Advisory System Architecture (Phase 07)

## 1. Overview & Architectural Role

The **Contact HOROLOGY** experience (`#/contact`) serves as a private, unhurried advisory channel connecting horological collectors and enthusiasts directly with the HOROLOGY curation team. In alignment with the brand ethos (*"Beyond Time. Beyond Ordinary."*) and the Midnight Navy design system (`#07111F` / `#8DB8E8` / `#263A50`), the contact interface rejects generic, transactional support forms in favor of an authoritative, dignified client consultation environment.

The system is governed by two uncompromising core principles:
1. **Absolute Factual Truthfulness:** No fabricated business telephone numbers, fictitious boutique addresses, or synthetic business hours are ever displayed. Only verified contact channels configured in `js/config.js` are rendered to the client.
2. **Deterministic Client Transmission:** When hosted on static infrastructure (such as GitHub Pages) without an active API integration endpoint, client inquiries are securely prepared, structured, and presented via the accessible **Transmission Modal** with clipboard copy and native `mailto:` client invocation, guaranteeing zero false "message sent" illusions.

---

## 2. Route & Parameter Specifications

- **Canonical Route:** `#/contact`
- **Controller Module:** `pages/contact.js`
- **Dynamic Query Parameters Supported:**
  - `?category=<category_slug>`: Pre-selects the inquiry topic in the category dropdown (e.g. `#/contact?category=sourcing`, `#/contact?category=viewing`).
  - `?subject=<url_encoded_string>`: Pre-populates the inquiry subject line or contextual heading when transitioning from product cards, editorial journals, or comparison trays.

### Permitted Category Mappings:
| Category Slug | Form Label | Contextual Routing |
| :--- | :--- | :--- |
| `general` | General Collector Inquiry | Standard introductory correspondence |
| `sourcing` | Timepiece Acquisition & Sourcing | Requesting unlisted references from archive |
| `authentication` | Verification & Forensic Dossier Audit | Inquiries regarding timegrapher or dossier records |
| `consign` | Selling & Consignment Advisory | Preliminary discussion before formal submission |
| `viewing` | Private Appointment & Viewing | Pre-booking questions regarding physical inspection |
| `press` | Editorial & Academic Collaboration | Horological research and publishing inquiries |

---

## 3. UI/UX Structure & Visual Hierarchy

The Contact page is structured into three clear, responsive layout tiers:

### Tier A: Editorial Hero
- **Visual Backdrop:** Direction C atmospheric watchmaker macro imagery (`HZ-HERO-002`) rendered at `0.15` opacity with Midnight Navy radial vignettes.
- **Eyebrow:** `PRIVATE CLIENT CONSULTATION` (uppercase JetBrains Mono with 0.15em letter-spacing).
- **Headline:** *"Inquiries & Horological Advisory."* (Cormorant Garamond, 2.5rem).
- **Prose:** Contextual explanation emphasizing considered, unhurried attention to mechanical horology.

### Tier B: Asymmetric Content Grid (12-Column Desktop Layout)
1. **Inquiry Dispatcher Form (7 Columns Desktop):**
   - Category selector with accessible `<label>` and `<select>`.
   - Client identity fields: Full Name, Email Address (required with RFC 5322 validation), Telephone Number (optional, supporting international formats).
   - Detailed Message `<textarea>` with placeholder guiding collectors on relevant details (reference numbers, box/paper status, or timeline).
   - Contextual Notice: Transparent disclosure confirming static transmission mechanics.
   - Primary Action Button: "Prepare My Inquiry &rarr;".

2. **Institutional Advisory & Verified Channels (5 Columns Desktop):**
   - **Operating Philosophy Card:** Highlighting Geneva, Bienne, and Shizukuishi watchmaking heritage and dedicated advisory approach.
   - **Direct Channels Container (Conditional):** Built using `hasContactValue()` and `getContactValue()` from `js/config.js`. If a field is `null` (e.g. phone or address), its card is suppressed entirely. If configured, active links (`mailto:`, `tel:`, WhatsApp) are displayed.
   - **Alternative Paths Shelf:** Direct navigation pills to `#/watch-finder`, `#/sell-consign`, and `#/appointment`.

### Tier C: Horological Resource Quick-Links
A four-card resource grid at the base of the page directing users to self-service discovery:
- **Intelligent Watch Finder:** 9-step guided advisory consultation.
- **Sell or Consign Timepiece:** Structured submission wizard.
- **Schedule Private Viewing:** Atelier and virtual appointment requests.
- **Curated Collection:** Direct access to active chronometer inventory.

---

## 4. Validation Engine & Submission Architecture

The Contact system leverages the unified validation and submission pipeline defined in `js/forms.js`:

```javascript
// Validation check before dispatch
if (!clientName) {
  highlightError('contactName', 'Please provide your full name.');
  return;
}
if (!clientEmail || !isValidEmail(clientEmail)) {
  highlightError('contactEmail', 'Please enter a valid email address.');
  return;
}
if (clientPhone && !isValidPhone(clientPhone)) {
  highlightError('contactPhone', 'Please enter a valid telephone number.');
  return;
}
```

### Transmission Payload Schema
Upon successful client-side validation, `handleFormSubmission()` constructs a structured payload:
```json
{
  "categoryKey": "sourcing",
  "categoryTitle": "Acquisition & Sourcing Inquiry",
  "timestamp": "2026-11-12T16:40:00.000Z",
  "client": {
    "name": "Alex Mercer",
    "email": "alex.mercer@collector.example",
    "phone": "+44 20 7946 0912",
    "country": null,
    "preferredContact": "Email",
    "message": "Inquiring about 1998 Omega Speedmaster Professional 3570.50 archival availability."
  },
  "data": {
    "inquiryCategory": "Timepiece Acquisition & Sourcing",
    "referenceRequested": "Omega Speedmaster Professional"
  }
}
```

### Transmission Adapter Behavior
1. **API Integration Mode:** If `BUSINESS_CONFIG.integrations.formSubmissionEndpoint` is non-null, a secure `POST` request is dispatched.
2. **Static Mode (Default):** Invokes `openTransmissionModal(payload)`. The modal displays the pre-formatted inquiry text, provides a one-click **Copy to Clipboard** button, and generates a pre-filled `mailto:` link addressing `BUSINESS_CONFIG.contact.email`.

---

## 5. Responsive Behavior & Accessibility

- **Mobile Viewports (&le; 768px):** Form and Advisory columns collapse into a single vertical sequence. Form inputs enforce a strict `16px` font size to prevent iOS Safari auto-zooming.
- **Touch Target Compliance:** All interactive buttons, select dropdowns, and channel links exceed 44px &times; 44px tap target areas.
- **ARIA & Keyboard Navigation:**
  - Form errors receive immediate focus via `el.focus()` and append accessible `.field-error-msg` containers.
  - Transmission modal traps focus within `#modalPortal` and closes cleanly on `Esc` key or backdrop interaction.

