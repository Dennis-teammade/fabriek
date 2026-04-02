# Month 1 Email Fundament

## Objective
Build a practical GHL email/CRM baseline that converts inbound interest from AIFabriek into qualified sales calls with clear reporting.

## ICP Focus
- Primary: Belgian KMO owners and decision-makers.
- Secondary: Operations and marketing leads in 5-50 employee companies.
- Exclusions: hobby users and non-commercial info seekers.

## Funnel Architecture
1. Lead Capture
- Sources: website forms, lead magnet opt-ins, outreach handoff.
- Required fields: first name, email, company, role, source, interest topic.
- Form standard: one primary CTA per page, explicit value proposition, low friction.

2. Data Model and Tags
- Lifecycle tags:
  - `lifecycle_new_lead`
  - `lifecycle_engaged`
  - `lifecycle_mql`
  - `lifecycle_sql`
  - `lifecycle_customer`
- Source tags:
  - `src_website`
  - `src_leadmagnet`
  - `src_outreach`
  - `src_social`
- Intent tags:
  - `intent_ai_basics`
  - `intent_ai_ops`
  - `intent_ai_sales`
  - `intent_ai_automation`
- Hygiene tags:
  - `status_unsubscribed`
  - `status_bounced`
  - `status_needs_cleanup`

3. Core Automations
- Welcome Sequence (D0, D2, D5)
  - D0: welcome + immediate quick win + CTA to diagnostic call.
  - D2: practical case example for Belgian KMO context.
  - D5: objection handling + next-step CTA.
- KMO Drip Sequence (2 emails/week for 3 weeks)
  - Week 1: authority and trust (no hype, practical outcomes).
  - Week 2: implementation path and common pitfalls.
  - Week 3: conversion push with explicit scheduling CTA.
- Re-engagement trigger
  - If no opens/clicks in 21 days, send 2-step reactivation branch.

## Message Framework
- Tone: pragmatic expert, no-nonsense, concrete examples.
- Structure per email:
  - Problem in one sentence.
  - Practical insight or mini framework.
  - Simple CTA (one action only).
- CTA library:
  - Book 20-min AI Ops scan.
  - Download implementation checklist.
  - Reply with current bottleneck.

## QA and Governance Checklist
- Trigger logic validated in test contacts before publish.
- Every automation has owner, goal, entry condition, and exit condition.
- UTM and source mapping checked for all links.
- Unsubscribe and compliance text present in every outbound email.
- Naming convention enforced: `aif_{funnel}_{step}_{version}`.

## KPI Dashboard Baseline
- Weekly input metrics:
  - New leads by source.
  - Tag coverage completeness.
- Flow performance:
  - Open rate by step.
  - Click-through rate by step.
  - Sequence completion rate.
- Revenue pipeline:
  - Lead -> MQL conversion.
  - MQL -> booked call conversion.
  - Booked call volume per source.

## 14-Day Execution Plan
- Day 1-2: finalize data model, fields, and tagging rules.
- Day 3-5: build welcome and drip automations in GHL.
- Day 6: QA pass with internal test records.
- Day 7: publish v1 flows.
- Day 8-10: analyze early performance and patch drop-offs.
- Day 11-14: optimize subject lines, CTA placement, and re-engagement branch.

## Handoff
- Execution owner: Email & CRM Agent once approval is granted.
- Dependencies:
  - Website lead capture endpoints from Website Operations Agent.
  - Lead magnet and article CTA inputs from content pipeline.
