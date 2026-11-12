# HOROLOGY — Known Issues & Mitigations

| ID | Issue Description | Impact | Mitigation / Status |
|---|---|---|---|
| KI-01 | Browser ES modules require an HTTP server origin (will fail if opened via raw `file:///` protocol due to CORS) | Local execution restriction | Documented requirement to use static HTTP server (e.g., Python `http.server`, VS Code Live Server, or preview server) |
| KI-02 | GitHub Pages 404 on hard reload with pushState routing | Deep links break on refresh | Solved by strictly adopting hash-based routing (`#/route`) with `404.html` fallback redirector |
| KI-03 | Demonstration data could be mistaken for actual vendor inventory | Brand & legal misrepresentation | Solved by architectural Honesty Layer: `DEMONSTRATION RECORD` badge and explicit status flags on all non-certified readings |
