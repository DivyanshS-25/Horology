# HOROLOGY — Shared Form System & Submission Architecture (Phase 07)

## 1. Architectural Philosophy

HOROLOGY is designed and deployed as a **zero-build, static Single-Page Application (SPA)** compatible with GitHub Pages hosting. In static hosting environments:
- There is no native server-side runtime (e.g. Node.js, Python, PHP) to handle arbitrary multipart form uploads or store user database records.
- Storing personally identifiable information (PII) or large binary image blobs in browser `localStorage` introduces severe privacy vulnerabilities and causes immediate browser quota exhaustion crashes (`QuotaExceededError` at 5MB limits).
- Deceiving users with simulated progress bars, fake reference numbers (e.g. *"Inquiry #48912 Submitted!"*), or pretend server confirmations degrades collector trust and violates luxury horological standards.

To solve this challenge, Phase 07 introduces a unified, transparent **Shared Form System** implemented in `js/forms.js` and styled in `css/business-forms.css`.

---

## 2. Core Subsystems

The Shared Form System comprises five deeply integrated subsystems:

```
[ Client Input ]
       │
       ▼
1. Validation Engine (RFC email, intl phone, file constraints)
       │
       ▼
2. Client-Side Image Selector (Object URLs, 10MB limit, 6 images max)
       │
       ▼
3. Scoped Session Storage (sessionStorage, zero PII in localStorage)
       │
       ▼
4. Structured Payload Builder (Normalized JSON schema across forms)
       │
       ▼
5. Unified Transmission Adapter
     ┌─┴────────────────────────┐
     ▼                          ▼
[ Live API POST ]      [ Transmission Modal ]
(if configured)        • Formatted Text Dossier
                       • One-Click Clipboard Copy
                       • Pre-filled mailto: Client
```

---

## 3. Subsystem Detailed Specifications

### 1. Validation Engine (`isValidEmail`, `isValidPhone`, `validateSelectedFile`)
- **Email Validation:** RFC 5322 compliant regular expression testing both username and domain segments with TLD length checks.
- **Phone Validation:** Permissive international parser. When empty, passes cleanly (optional field). When provided, strips non-numeric characters and enforces an international length between 7 and 15 digits, allowing leading `+`, spaces, hyphens, and brackets.
- **File Validation (`PHOTO_CONSTRAINTS`):**
  - **Allowed Extensions:** `.jpg`, `.jpeg`, `.png`, `.webp`.
  - **MIME Types:** `image/jpeg`, `image/png`, `image/webp`.
  - **Max File Size:** 10 MB per file (`10 * 1024 * 1024` bytes).
  - **Max File Count:** 6 photographs per submission.
  - Invalid files trigger localized user-friendly error banners without crashing the session.

### 2. Client-Side Image Selection & Thumbnail Previewer
- In-memory `File` objects are stored in an active session array (`selectedFilesStore = []`).
- Instantaneous previews are generated using native `URL.createObjectURL(file)`.
- When a user removes a thumbnail via the &times; remove button, `URL.revokeObjectURL(previewUrl)` is immediately called to release browser memory.
- **Strict Constraint:** Binary files or base64 strings are **never** serialized into browser storage.

### 3. Session-Scoped Progress Preservation
- To prevent data loss if a collector accidentally clicks an external link or refreshes the page, form state is cached in browser `sessionStorage` under prefixed keys (`horology_temp_sell_consign_v1`).
- `sessionStorage` is automatically purged when the browser tab closes, ensuring no permanent PII persists on public or shared terminals.
- When an inquiry is submitted or completed, `clearFormSession()` explicitly deletes the cached keys.

### 4. Structured Payload Builder (`formatEnquiryPlainText`)
All form controllers normalize their data into a canonical payload schema:
```typescript
interface HorologyFormPayload {
  categoryKey: string;
  categoryTitle: string;
  timestamp: string; // ISO 8601
  client: {
    name: string;
    email: string;
    phone?: string | null;
    country?: string | null;
    preferredContact?: string;
    message?: string | null;
  };
  data: Record<string, any>;
  files?: Array<{ name: string; size: number; type: string }>;
}
```

The payload builder transforms this schema into an elegant, formatted plain-text horological dossier formatted for reading in email clients or text editors:
```
==================================================
HOROLOGY — SELL OR CONSIGN TIMEPIECE SUBMISSION
Submitted: Thu, 12 Nov 2026 16:45:00 GMT
==================================================

CLIENT DETAILS:
  Name: Arthur Pendelton
  Email: a.pendelton@horology.example
  Phone: +44 7700 900123
  Preferred Contact: Email

ENQUIRY SPECIFICS:
  Preference: Consignment
  Manufacturer: ROLEX
  Model: Submariner Date
  Reference Number: 126610LN
  Production Year: 2022
  Condition Grade: Excellent
  Included Items: Original Box, Original Papers, Hang Tags

SELECTED PHOTOGRAPHS (To be shared):
  [1] dial-macro-front.jpg (3.24 MB)
  [2] caseback-serial-obscured.jpg (2.85 MB)

==================================================
HOROLOGY — Beyond Time. Beyond Ordinary.
```

### 5. Unified Transmission Adapter (`handleFormSubmission`, `openTransmissionModal`)
When the user submits an inquiry:
1. `handleFormSubmission()` inspects `BUSINESS_CONFIG.integrations[endpointKey]`.
2. If an API endpoint is provided, an asynchronous HTTP `POST` request is sent.
3. If unconfigured or if the network request fails, it opens the accessible **Transmission Modal** (`#modalPortal`):
   - **Dialog Backdrop:** Blurred Midnight Navy overlay (`rgba(7, 17, 31, 0.8)`).
   - **Pre-formatted Dossier Window:** Read-only monospaced code container with the complete formatted inquiry.
   - **Action Bar:**
     - **"Copy to Clipboard":** Copies the entire formatted payload to the system clipboard via `navigator.clipboard.writeText()` with affirmative visual button feedback.
     - **"Open in Email Application":** Automatically constructs an encoded `mailto:` link populated with recipient (`BUSINESS_CONFIG.contact.email`), subject line, and the formatted message body.
     - **Transparency Notice:** Reminds the user to attach their selected image files directly to the opened email draft.

---

## 4. UI Component Architecture (`css/business-forms.css`)

The system introduces dedicated CSS components adhering to the Midnight Navy palette:
- `.wizard-progress-track`: Multi-step progress bar with dynamic inline width transition.
- `.wizard-pill-trail`: Horizontal clickable breadcrumb trail showing step numbers and status (`.active`, `.completed`).
- `.form-options-grid`: Card-based interactive option selectors with bespoke radio dots (`.option-radio-dot`).
- `.photo-dropzone`: Drag-and-drop file target with hover highlight and file-type restrictions.
- `.photo-preview-grid`: Responsive thumbnail grid with hover delete triggers.
- `.review-summary-box`: Two-column summary cards with inline "Edit" jump links.
- `.field-error-msg`: Accessible inline error notifications rendered in muted red (`#E07A7A`).

