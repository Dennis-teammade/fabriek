# AIFabriek Website Foundation (v1)

Minimal Astro baseline for homepage, article publishing, and lead capture.

## Requirements

- Node.js 20+
- npm 10+

## Setup

```bash
cp .env.example .env
npm install
```

## Run Locally

```bash
npm run dev
```

Default local URL: `http://localhost:4321`

## Build for Production

```bash
npm run build
npm run preview
```

## Content Model

- Blog source files live in `content/blog/*.md`
- Required frontmatter: `title`, `slug`, `description`
- Optional frontmatter: `meta_title`, `meta_description`, `meta_image`, `canonical_url`
- `meta_image` accepts an absolute URL or root-relative path (example: `/social/my-article-cover.jpg`).

## SEO + Social Metadata Baseline

Central SEO defaults are handled in `src/lib/seo.ts` and consumed by `src/layouts/BaseLayout.astro`.

- Canonical URL, Open Graph, and Twitter tags are emitted on all pages.
- Homepage and blog articles use explicit SEO config via the `seo` prop.
- Blog articles can override title/description/image/canonical in markdown frontmatter.
- `robots.txt` is generated at build time from configured site origin (`SITE_URL` in `astro.config.mjs`), so sitemap host stays aligned with deployment.

## Lead Capture

Lead forms are available on `/contact` and `/resources`, both posting to `PUBLIC_LEAD_FORM_ENDPOINT`.

- If endpoint is set: form uses direct POST to that endpoint.
- If endpoint is empty: form does not submit and shows fallback instructions.
- `/resources` also sends lead-magnet attribution fields by default.

Payload fields:
- `name`
- `email`
- `company`
- `source`

Contact-specific fields:
- `role`
- `bottleneck`

Resources-specific fields:
- `lead_magnet` (`ai-ops-intake-blueprint`)
- `conversion_page` (`/resources`)

Optional env:
- `PUBLIC_RESOURCES_LEAD_SOURCE=resources-lead-magnet` (override hidden source value for `/resources`)

## Deploy Assumptions

- Static deploy target (Cloudflare Pages, Netlify, Vercel static, or S3+CDN)
- Set `SITE_URL` and `PUBLIC_LEAD_FORM_ENDPOINT` in deployment env
- Publish output directory: `dist/`

SEO verification checklist after build/deploy:

1. Run `npm run build`.
2. Confirm `dist/robots.txt` exists and includes `Sitemap: <SITE_URL>/sitemap-index.xml`.
3. Confirm `dist/sitemap-index.xml` exists and URLs are emitted on the canonical host.
4. Open `dist/index.html` and one `dist/blog/<slug>/index.html`, then verify:
   - one canonical tag
   - `og:title`, `og:description`, `og:url`, `og:image`
   - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
5. In browser devtools on deployed pages, verify those tags resolve to expected production values.

## GA4 + Consent-Gated Instrumentation

GA4 is wired globally in `src/layouts/BaseLayout.astro`, but only initializes after explicit cookie consent (`accepted`) is stored in browser localStorage.

Required env variables:

- `PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX` in production
- `PUBLIC_ENABLE_ANALYTICS_IN_DEV=false` by default

Guardrails:

- No measurement IDs are hardcoded in source.
- If `PUBLIC_GA4_MEASUREMENT_ID` is empty, no consent banner or GA script logic is injected.
- In development (`npm run dev`), analytics stays off unless `PUBLIC_ENABLE_ANALYTICS_IN_DEV=true`.
- Consent choice is persisted as `aifabriek_cookie_consent` with values `accepted` or `rejected`.

Conversion events:

- `primary_cta_click`: emitted when the homepage primary CTA button is clicked.
- `contact_form_submit`: emitted when the contact form submit action is triggered.
- `resources_optin_submit`: emitted when `/resources` lead-magnet opt-in submit is triggered.

Validation steps:

1. Run `npm run dev` with `PUBLIC_GA4_MEASUREMENT_ID` set.
2. Open the site in a fresh/private browser session and confirm no request to `googletagmanager.com` happens before consent.
3. Click `Accepteren` in the consent banner, then confirm `gtag/js` loads and GA requests begin.
4. Click the primary CTA on `/` and confirm a `primary_cta_click` event in GA4 DebugView/Tag Assistant.
5. Submit the form on `/contact` and confirm a `contact_form_submit` event in GA4 DebugView/Tag Assistant.
6. Submit the form on `/resources` and confirm a `resources_optin_submit` event in GA4 DebugView/Tag Assistant.
7. Repeat in a fresh/private session and click `Weigeren`; confirm GA scripts/events do not fire.

Resources flow verification:

1. Keep `PUBLIC_LEAD_FORM_ENDPOINT` empty and load `/resources`; confirm submit is prevented and fallback note remains visible.
2. Set `PUBLIC_LEAD_FORM_ENDPOINT` to a test webhook and submit `/resources`; confirm posted payload includes `source`, `lead_magnet`, and `conversion_page`.
3. Confirm success state appears inline on `/resources` after a successful request.

## Google Search Console Setup + Verification

1. Open Google Search Console and add property for `SITE_URL` (recommended: Domain property).
2. Choose verification method:
   - Preferred: DNS TXT verification at your DNS provider.
   - Fallback: HTML tag verification in the site `<head>` (temporary until DNS is ready).
3. After verification, submit sitemap URL:
   - `${SITE_URL}/sitemap-index.xml` if your deployment emits sitemap index.
   - `${SITE_URL}/sitemap.xml` otherwise.
4. Confirm indexing baseline:
   - Run URL Inspection on `/`, `/blog`, and one `/blog/<slug>` page.
   - Request indexing for any critical page shown as undiscovered.
5. Operational checks after each publish:
   - GSC Performance report has impressions/click data trend.
   - GSC Pages report does not show critical coverage errors for key URLs.
   - Manual check in browser source confirms canonical + description are present.
