# Shynli Move-Out Cleaning Deployment

## Production Target

- Domain: `shynlimoveoutcleaning.com`
- GitHub repo: `https://github.com/miralitys/shynlimoveoutcleaning.git`
- Hosting: Render Static Site
- Lead destination: `https://shynlicleaningservice.com/quote`

## Render Settings

Use these settings if creating/configuring the service manually in Render:

- Service type: `Static Site`
- Branch: `main`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Custom Domain: `shynlimoveoutcleaning.com`
- Optional Custom Domain: `www.shynlimoveoutcleaning.com`
- Redirect/Rewrites:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: `Rewrite`

Render applies rewrite rules only when a matching static file does not already exist, so assets, `robots.txt`, and `sitemap.xml` should still be served directly.

## Repository Shape

The GitHub repo should contain the contents of this folder at the repo root:

- `package.json`
- `package-lock.json`
- `index.html`
- `src/`
- `public/`
- `render.yaml`

Do not push the entire Obsidian vault to `miralitys/shynlimoveoutcleaning`.

## Pre-Deploy Checks

Run before pushing a production deploy:

```bash
npm run lint
npm run build
```

After Render deploys, verify:

- `https://shynlimoveoutcleaning.com/`
- `https://shynlimoveoutcleaning.com/sitemap.xml`
- `https://shynlimoveoutcleaning.com/robots.txt`
- a deep URL, for example `/naperville/move-out-cleaning-cost`
- quote links and quote form handoff to `https://shynlicleaningservice.com/quote`

The production sitemap for this standalone move-out site contains exactly `356` unique URLs on `https://shynlimoveoutcleaning.com`.
