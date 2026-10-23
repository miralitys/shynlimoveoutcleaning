# Move-out cleaning migration

Version: 2026-10-23.1.

The old 371-URL website, application source, assets and committed dist directory are preserved for rollback. Public web-domain bindings move from Render Static Site `srv-d810a6vaqgkc73ahfkd0` to existing Docker Node service `srv-d80u9tnlk1mc739ucneg`. Keep DNS unchanged. Do not edit the main site.

`redirects.mjs` defines root-city, service, topic, legal, quote and guide mappings. Its byte-identical deployed copy is `moveout-redirects.mjs` in `miralitys/shynlicom`. The Node handler returns an empty HTTP 301 before static and API handlers. It matches the public apex/www hostnames and the reserved `/__moveout_redirect/` verification prefix on `shynlicom.onrender.com`.

The HTTPS apex goes directly to the final main-site URL. Render's automatic HTTP upgrade and www normalization may add hops for other variants. Query encoding, order, repeated keys and empty values are preserved.

The retained Render Static Site has an empty build command and publishes its existing committed `dist` directory. This actual configuration is retained and reflected in render.yaml. Add `X-Robots-Tag: noindex` on `/*` only to that retained Static Site after moving the public domains. Public 301 responses do not add noindex.

## Verification

- `npm run test:redirects`: all explicit mappings, all 42 cities, specialist exceptions, quote/guide precedence, normalization, query strings and all 371 original sitemap entries.
- `npm run audit:redirects`: full live-domain CSV and JSON chains for the old sitemap, ten additional paths, canonical sitemap.xml and robots.txt, two legacy discovery filenames and all four hostname/protocol variants.
- `AUDIT_ORIGIN=http://127.0.0.1:4188 AUDIT_HOST=shynlimoveoutcleaning.com AUDIT_PHASE=local npm run audit:redirects`: local Node audit with real destination checks.

The two prefixed legacy discovery filenames are unlisted paths and therefore use the requested service fallback. The canonical sitemap.xml and robots.txt redirect to the corresponding main-site files.

## Rollback

Remove the move-out apex/www bindings from the shared Node service and reattach the apex to retained Static Site `srv-d810a6vaqgkc73ahfkd0`. Verify www and wait for both certificates. Remove the retained-origin noindex header. Keep the empty build command and committed dist publication directory. Check that the old pages return 200. No DNS change is needed.

Pre-migration source revision: `43e14195f8cd18d05e4009358e8756340af62f83`.

`MOVEOUT_REDIRECT_ENABLED=false` disables this hostname handler. Restoring old content requires the Static Site bindings. Cached 301s may persist for the configured one-hour cache lifetime. The other migrated domains have independent handlers.
