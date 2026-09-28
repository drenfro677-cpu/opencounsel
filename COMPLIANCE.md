# Legal posture — what this project actually covers

OpenCounsel is not a law firm, not an insurer, and not a “U.S. Legal Shield.”
It does not indemnify you for scraping Google, Westlaw, Lexis, or any site that forbids automated access.

If a vendor sold you copy that says they “assume legal responsibility for scraping search engine results,” that is their contract, not ours.

## What we do

1. Call CourtListener’s published REST API (official interface, documented terms and rate limits).
2. Label every research row with the cluster URL and citation[] fields CourtListener returned.
3. Verify cites only with q=citation:"VOLUME REPORTER PAGE".
4. Do not crawl Westlaw, Lexis, Bloomberg, Google SERPs, or clerk portals.

## What we do not do

No HTML harvest. No proxy farm. No ToS-bypass layer. No indemnification rider. No defense of cease-and-desist letters over scraping.

CourtListener terms apply to every call: you own requests made with your token; no FCRA use; no multi-accounting to dodge rate limits.
https://www.courtlistener.com/terms
