# Techstack - AIFabriek.be

## 1) Architectuurprincipes
- CMS-agnostisch ontwerp: contentmodel los van uitvoeringslaag
- Meetbaarheid vanaf dag 1 (traffic, funnel, revenue)
- Agent-werk met controlepunten i.p.v. blind automation
- Modulaire vendor-keuzes voor snelle iteratie

## 2) Core Agent Orchestration
- Paperclip: control plane voor org chart, doelen, budgetten, taakbeheer
- OpenClaw: multi-agent routing en geïsoleerde workspaces
- Hermes: learning loops, skill management en continue verbetering

## 3) Execution Adapters
- Codex/Claude/Gemini voor planning, code, research en documentatie
- n8n voor integraties en event-gedreven automations
- Shell/workspace jobs voor gestructureerde uitvoering

## 4) Content Platform
Optie A (snelle time-to-market):
- WordPress (managed hosting)
- SEO plugins + editorial workflow

Optie B (schaalbaar composable):
- Headless CMS + frontend framework
- API-first content distributie

Keuzecriteria:
- Publicatiesnelheid
- SEO operationele eenvoud
- Integratiecomplexiteit met agent workflows
- Totale onderhoudskost

## 5) Data & Analytics
- GA4 voor gedrag en funnel events
- Google Search Console voor SEO query en indexatie-inzicht
- UTM discipline op outreach en campagnes
- KPI-dashboard op content -> lead -> omzet

## 6) CRM, Marketing & Sales
- GoHighLevel (whitelabel teammade.ai)
- Segmentatie, nurturing, pipeline-automation
- Tiered aanbod: instap, AI CRM, maatwerk

## 7) AI Tooling & Routing
- OpenRouter voor model routing/cost-performance balancing
- Vendor mix op basis van taaktype (kwaliteit, snelheid, kost)

## 8) Security & Governance Baseline
- Principle of least privilege voor agent credentials
- Logging op agent acties en publicatiestappen
- Menselijke approval gate voor publicatie en prijscommunicatie
- Geheimenbeheer buiten codebase

## 9) Aanbevolen startconfiguratie
- Fase 1: WordPress + GHL + GA4/GSC + Paperclip/OpenClaw/Hermes
- Fase 2: Geautomatiseerde content pipeline met strengere QA
- Fase 3: Productized agent services en uitbreidbare app-laag
