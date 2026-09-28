# OpenCounsel

Public operating system for self-represented litigants, court self-help centers, and legal-aid clinics.

Not a law firm. Not legal advice. CiteLock will not treat a citation as real until CourtListener returns a matching opinion cluster.

## Live workbench

Open `index.html`, or deploy this folder to Vercel / GitHub Pages.

- Litigant workbench — debt defense + eviction playbooks
- Live CourtListener v4 search
- CiteLock — reporter cites verified against the public corpus
- Clinic supervision desk

## Deploy

### Vercel

```
npx vercel --yes
```

Serverless routes:

- `GET /api/search?q=`
- `GET /api/citelock?cite=`

If those routes are missing (plain GitHub Pages), the browser calls CourtListener directly. CourtListener currently reflects `Access-Control-Allow-Origin`.

### GitHub Pages

Settings → Pages → Deploy from GitHub Actions (workflow in `.github/workflows/pages.yml`).

## Data

Opinion search is provided by [CourtListener](https://www.courtlistener.com/) / [Free Law Project](https://free.law/). Please be gentle with the public API. Production deployments should use a membership token in `COURTLISTENER_API_TOKEN`.

## Repo

https://github.com/drenfro677-cpu/opencounsel
