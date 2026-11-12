# HOROLOGY — DEPLOYMENT READINESS & STATIC HOSTING VERIFICATION

**Target Host:** GitHub Pages / AWS S3 + CloudFront / Cloudflare Pages / Netlify / Vercel Static  
**Architecture:** Zero-Build Static Vanilla ES Module Single-Page Application  
**Deployment Status:** 100% Ready for Production Deployment  
**File Location:** `docs/DEPLOYMENT_READINESS.md`

---

## 1. Static Deployment Architecture

HOROLOGY is intentionally architected as a pure, zero-build static Single-Page Application. It requires:
- **No Node.js runtime on the production server.**
- **No compilation, transpilation, or bundling step.**
- **No database backend or cloud functions.**

All logic runs client-side via native modern browser technologies (Native ES Modules, Web Audio API, Canvas 2D API, Web Storage API).

---

## 2. GitHub Pages Strict Compatibility Checklist

| Architectural Requirement | Implementation Strategy | Verification Result |
| :--- | :--- | :--- |
| **Hash-Based Routing (`#/route`)** | Client router (`js/router.js`) listens to `window.addEventListener('hashchange')`. | **PASS** — Deep routes like `#/collection`, `#/watch/rolex-submariner-126610ln`, and `#/inspection/demo-omega-31130423001001` refresh without `404` errors on static servers. |
| **Relative Asset Resolution** | All asset paths in `index.html`, `js/assets.js`, and stylesheets use relative prefixes (`./css/...`, `./assets/...`). | **PASS** — Operates identically whether hosted at repository root (`domain.com/`) or GitHub Pages subdirectory (`user.github.io/horology/`). |
| **Native Module Imports** | All JavaScript files use explicit `.js` extensions in import statements (`import { store } from './state.js'`). | **PASS** — Supported natively across Chrome, Safari, Firefox, and Edge. |
| **Manifest-Driven Assets** | `asset-manifest.json` and `js/assets.js` gracefully map image keys to local paths with in-memory procedural SVG fallbacks. | **PASS** — Zero broken image links or `404` console errors. |
| **Dedicated 404 Recovery** | Route `/404` and unmatched paths render `pages/not-found.js` with a dignified observatory recovery button. | **PASS** — Graceful recovery from malformed hash URLs. |

---

## 3. Directory Layout for Static Hosting

```
HOROLOGY/
├── index.html                   # Single entry point
├── asset-manifest.json          # Semantic asset registry
├── css/                         # 14 Modular scoped stylesheets
│   ├── tokens.css               # Obsidian Luxury design tokens
│   ├── reset.css                # Box-sizing & normalization
│   ├── typography.css           # Tri-font hierarchy
│   ├── global.css               # Obsidian canvas & radial gradients
│   ├── layout.css               # Fluid grid & container utilities
│   ├── components.css           # Vault cards, buttons, badges, hotspots
│   ├── home.css                 # Masterwork band & hero layout
│   ├── marketplace.css          # Catalog grid & faceted filters
│   ├── watch-detail.css         # 58/42 split & specs matrix
│   ├── inspection-dossier.css   # 8-stage timeline & microscopic loupe
│   ├── collector-tools.css      # Wishlist, compare, & finder styles
│   ├── business-forms.css       # Consign & appointment wizards
│   ├── navigation.css           # Persistent header & mobile drawer
│   ├── animations.css           # Hardware-accelerated keyframes
│   ├── responsive.css           # Breakpoint overrides
│   └── print.css                # A4 archival certification engine
├── js/                          # Vanilla ES Modules
│   ├── app.js                   # Application bootstrap
│   ├── router.js                # Hash router with lifecycles
│   ├── state.js                 # Centralized pub/sub store
│   ├── audio.js                 # Web Audio API synthesis engine
│   ├── assets.js                # Manifest-driven asset resolver
│   ├── components.js            # Reusable UI component builders
│   ├── navigation.js            # Header & mobile drawer controller
│   ├── data.js                  # Watch catalog & brand database
│   ├── forms.js                 # Form validation & session manager
│   ├── utilities.js             # Currency, price, & string utilities
│   └── features/                # Simulation engines
│       ├── movementSim.js       # Balance wheel oscillator
│       └── timegrapher.js       # Witschi acoustic trace generator
├── pages/                       # 16 Page view modules (22 sitemap routes)
│   ├── home.js                  # Homepage & Featured Masterwork
│   ├── catalog.js               # Marketplace & Brand Collections
│   ├── watch-detail.js          # Individual watch intelligence
│   ├── dossier.js               # Archival inspection dossier
│   ├── movement-lab.js          # Escapement science & simulators
│   ├── wishlist.js              # Saved collection vault
│   ├── compare.js               # Side-by-side comparison matrix
│   ├── finder.js                # 9-step watch consultation
│   ├── recently-viewed.js       # Chronological viewed shelf
│   ├── consign.js               # Sell / Consign multi-step wizard
│   ├── contact.js               # Private concierge contact
│   ├── appointment.js           # Private viewing scheduler
│   ├── about.js                 # Curatorial philosophy
│   ├── legal.js                 # Tabbed governance policies
│   └── not-found.js             # 404 Error boundary view
└── docs/                        # Complete technical documentation suite
```

---

## 4. Local Verification & Preview Instructions

To preview or test the project locally, run any standard static file server from the repository root:

### Option A: Using PowerShell (Windows Built-in)
```powershell
powershell -File .\scratch\server.ps1 -port 8080
```
Then navigate to `http://localhost:8080/`.

### Option B: Using Node.js `npx serve`
```bash
npx serve .
```

### Option C: Using Python 3
```bash
python -m http.server 8080
```

---

## 5. Instructions for Enabling GitHub Pages

1. Commit and push all files to your GitHub repository `main` branch.
2. In the GitHub repository, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Within 60 seconds, GitHub Pages will deploy the website live at `https://<username>.github.io/<repo-name>/`.
6. Open the deployed URL; verify that `index.html` loads the Obsidian Luxury theme and that navigating to `#/collection` or `#/movement-lab` works instantly.

