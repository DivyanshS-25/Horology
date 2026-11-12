# HOROLOGY — Private Appointment & Consultation System (Phase 07)

## 1. Overview & Purpose

The **Private Appointment Request Experience** (`#/appointment`) allows collectors, prospective buyers, and consignors to request dedicated, one-on-one horological consultations with HOROLOGY specialists. 

Whether examining a specific timepiece in an atelier setting, discussing collection curation over an encrypted video link, or conducting a preliminary valuation discussion by telephone, the experience provides a disciplined, elegant scheduling interface that respects the collector's time.

Crucially, because HOROLOGY runs statically without an automated backend calendaring system, the appointment workflow adheres strictly to **honest scheduling semantics**:
- It never promises instant calendar confirmation (e.g. no fake "Booking Confirmed! Appointment ID #98721").
- It captures client availability windows, validates scheduling constraints (e.g. blocking past and same-day dates), formats the request with full timezone awareness, and prepares the dispatch via the **Transmission Modal**.

---

## 2. Route & Query Parameter Integration

- **Canonical Route:** `#/appointment`
- **Controller Module:** `pages/appointment.js`
- **Query Parameter Pre-population:**
  - `?watchId=<watch_id>` or `?ref=<reference_or_slug>`: Pre-populates the consultation with a specific watch from the HOROLOGY catalog (e.g. `#/appointment?watchId=omega-speedmaster-pro`).

### Watch Pre-population Flow:
When navigated to with a watch identifier (such as from the Individual Watch Detail page's *"Schedule Private Viewing"* CTA):
1. `pages/appointment.js` queries `HOROLOGY_WATCHES.find(w => w.id === watchId || w.reference === ref)`.
2. If found, a dedicated **Selected Watch Card** is rendered at the top of the appointment form, displaying:
   - High-resolution watch thumbnail
   - Manufacture house and model name
   - Reference number and production year
   - Certified price in INR
   - **"Change / Remove Watch"** action button allowing the collector to clear the association without leaving the form.
3. If no query parameter is provided, the card defaults to a selectable prompt: *"Consultation regarding general collection or multiple timepieces."*

---

## 3. Structured Consultation Domains

The appointment request form is organized into five disciplined modules:

### A. Consultation Purpose
Interactive selection cards defining the consultation objective:
1. **Specific Timepiece Examination:** In-depth physical inspection, caseback opening review, or timegrapher reading.
2. **General Collection Consultation:** Guidance on starting or curating a balanced mechanical watch portfolio.
3. **Valuation & Consignment Advisory:** In-person or virtual condition review for potential sale or consignment.
4. **Sizing, Strap & Fitting Consultation:** Bracelet adjustment or bespoke strap selection.

### B. Consultation Format & Venue
1. **Private Atelier Viewing:** Conducted in an unhurried, private setting with horological loupes, timing machines, and white-glove handling.
2. **Virtual Video Consultation:** Encrypted high-definition video link with direct macro camera feeds of watch movements and dial details.
3. **Private Telephone Consultation:** Direct telephone dialogue with a senior horological specialist.

### C. Date & Time Window Mechanics
- **Past-Date Rejection:** The date input enforces a strict `min` attribute calculated dynamically at client runtime:
  ```javascript
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  // Applied to <input type="date" min="${minDateStr}">
  ```
  This ensures collectors cannot select past dates or same-day surprise appointments.
- **Curated Time Windows:** Rather than rigid 15-minute slots, appointments are grouped into dignified consultation windows:
  - `Morning (10:00 – 12:00)`
  - `Midday (12:00 – 14:00)`
  - `Afternoon (14:00 – 16:30)`
  - `Late Afternoon (16:30 – 18:30)`
- **Timezone Detection:** Automatically detects client timezone via `Intl.DateTimeFormat().resolvedOptions().timeZone` with manual override options for international collectors.

### D. Client Information & Discretion Preferences
- Full Name, Email Address (required, validated).
- Telephone Number (optional, validated for minimum international digits).
- Preferred Communication Mode: Email, Phone, or WhatsApp.
- Special Horological Requests / Notes (e.g., requesting specific timing positions or bracelet link additions).

---

## 4. Two-Phase Request & Transmission Workflow

### Step 1: Client Request Composition
The collector fills out the form with instantaneous inline validation. If mandatory fields are omitted, `.has-error` styles highlight the field and focus is set automatically.

### Step 2: Request Review Screen
Upon clicking *"Review Appointment Details"*, the view transitions into an unhurried review mode displaying:
- Timepiece selection (if applicable)
- Consultation purpose and format
- Selected date, time window, and timezone
- Client contact details
- Edit buttons allowing quick jumps back to adjust details.

### Step 3: Transparent Request Dispatch
Upon confirming the review, `handleFormSubmission()` is triggered with the structured appointment payload:
```json
{
  "categoryKey": "appointment",
  "categoryTitle": "Private Consultation Request",
  "timestamp": "2026-11-12T16:42:00.000Z",
  "client": {
    "name": "Julian Vance",
    "email": "julian.vance@horology-club.example",
    "phone": "+91 98200 12345",
    "preferredContact": "Email"
  },
  "data": {
    "consultationPurpose": "Specific Timepiece Examination",
    "consultationFormat": "Private Atelier Viewing",
    "preferredDate": "2026-11-15",
    "preferredWindow": "Afternoon (14:00 – 16:30)",
    "clientTimezone": "Asia/Kolkata",
    "associatedWatch": "Omega Speedmaster Professional (Ref. 311.30.42.30.01.001)"
  }
}
```

The **Transmission Modal** opens, explaining:
> *"Your private appointment request has been structured and prepared for our advisory team. Because appointments require manual diary coordination to ensure unhurried privacy, our team will review the requested slot and respond within 24 business hours to confirm arrangements."*

The collector can copy the request to their clipboard or launch their default mail client with a single click.

---

## 5. Responsive Behavior & RFC 5545 Readiness

- **Mobile Formatting:** Single-column layout with stacked radio cards and native touch-friendly date picker controls.
- **Calendar Standard Readiness:** The structured appointment payload is designed to map directly to standard iCalendar (`.ics` / RFC 5545) event objects when integrated with future backend calendar microservices (`BUSINESS_CONFIG.integrations.appointmentEndpoint`).

