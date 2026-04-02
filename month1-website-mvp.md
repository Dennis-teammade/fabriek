# Month 1 Website MVP

## Objective
Launch a lean AIFabriek website foundation that captures leads, supports content publishing, and enables fast iteration without engineering bottlenecks.

## MVP Deliverables
- Live landing page with one core offer and clear CTA.
- Blog template ready for Dutch long-form articles.
- Lead capture form connected to CRM intake model.
- Publishing QA workflow and release checklist.
- GA4 + GSC baseline instrumentation.

## Information Architecture
- `/` Home / authority landing page.
- `/blog` article index.
- `/blog/<slug>` article template.
- `/resources` lead magnets and downloadable assets.
- `/contact` frictionless consultation CTA.

## Messaging Blueprint (Homepage)
- Hero: practical AI outcomes for Belgian KMOs.
- Proof section: concrete implementation examples.
- Offer section: AI scan / CRM conversion sprint.
- Content section: latest articles and lead magnet CTA.
- Final CTA: single conversion action (book call or download).

## Lead Capture and Form Integration
- Primary conversion event: form submit (`lead_primary`).
- Required fields: name, email, company, role, biggest bottleneck.
- Routing:
  - Store contact in CRM.
  - Apply source and intent tags.
  - Trigger welcome sequence handoff.

## Blog and Content Operations
- Publish first 5 article slots with consistent template:
  - Problem statement.
  - Practical framework.
  - Belgian KMO examples.
  - CTA block to lead magnet / call.
- Editorial states: draft -> review -> approved -> published.
- Metadata checklist: title tag, meta description, H1, internal links, canonical.

## Technical SEO Baseline
- XML sitemap enabled and submitted to GSC.
- Robots.txt and indexability checks.
- Core performance checks on mobile and desktop.
- Schema starter set:
  - Organization
  - Article
  - FAQ (where applicable)

## QA Checklist Before Publish
- Form submit path tested end-to-end.
- CTA links and tracking params validated.
- Mobile rendering verified for homepage and article template.
- Broken links, missing metadata, and duplicate H1 issues cleared.
- Analytics events visible in real-time debug.

## KPI Baseline (First 30 Days)
- Traffic:
  - Organic sessions
  - Branded vs non-branded share
- Conversion:
  - Landing page conversion rate
  - Blog-to-lead conversion rate
- Content:
  - Published article count
  - Avg. time on article pages

## 14-Day Execution Sequence
- Day 1-2: IA and homepage wireframe decisions.
- Day 3-5: landing page + blog template build.
- Day 6: form and CRM pipeline integration.
- Day 7: analytics + SEO baseline setup.
- Day 8-10: publish first 2 articles and validate conversion path.
- Day 11-14: publish remaining 3 articles and optimize CTA placement.

## Ownership and Dependencies
- Execution owner after approval: Website Operations Agent.
- Dependencies:
  - Content pipeline for first 5 article drafts.
  - Email & CRM automation for post-submit nurture.
