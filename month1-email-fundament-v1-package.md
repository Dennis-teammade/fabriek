# Maand 1 E-mailfundament v1 (Belgische KMO-leads)

## 1. Sprintresultaat

Bouw in GoHighLevel (GHL) een productieklare welcome- en nurture-basis die nieuwe leads systematisch naar ingeplande calls brengt, met meetbare conversie per stap en duidelijke eigenaarschap per opvolgactie.

Definition of done:
- Welcome- en nurture-automations staan live met geteste triggercondities.
- Lifecycle- en sourcetags worden automatisch gezet en bijgewerkt.
- Het KPI-dashboard rapporteert open/click/reply/booked-call per bron en per sequencestap.

## 2. Lifecyclefases en tagtaxonomie

### Lifecyclefases (single source of truth)
- `lifecycle_new_lead`: nieuwe inbound contactpersoon, nog niet betrokken.
- `lifecycle_engaged`: heeft geopend, geklikt of gereageerd in de eerste sequence.
- `lifecycle_mql`: expliciet intentsignaal (reply, intentveld in formulier, high-intent click).
- `lifecycle_sql`: call geboekt of rechtstreeks salesgesprek gestart.
- `lifecycle_customer`: deal gewonnen / actieve klant.

Regel: een contact mag historische tags behouden, maar heeft exact één actuele lifecycletag.

### Sourcetags
- `src_website`
- `src_leadmagnet`
- `src_outreach`
- `src_linkedin`
- `src_referral`

### Intenttags
- `intent_ai_basics`
- `intent_ai_ops`
- `intent_ai_sales`
- `intent_ai_automation`

### Gedragstags
- `beh_opened_welcome`
- `beh_clicked_offer`
- `beh_replied_sequence`
- `beh_booked_call`
- `beh_no_engagement_21d`

### Hygiënetags
- `status_unsubscribed`
- `status_bounced`
- `status_invalid_email`

## 3. Triggermap (GHL-implementatie)

### Trigger A - Nieuwe lead intake
Entry conditions:
- Form submit of inbound webhook met geldig e-mailadres.

Actions:
1. Zet sourcetag op basis van UTM/source-veld.
   - Fallback als bron ontbreekt: `src_website`.
2. Zet één intenttag op basis van formulierselectie (fallback: `intent_ai_basics`).
3. Zet lifecycle op `lifecycle_new_lead`.
4. Voeg contact toe aan workflow `aif_email_welcome_v1`.

### Trigger B - Promotie bij engagement
Entry conditions:
- Open, click of reply in welcome-/nurturemails.

Actions:
1. Voeg overeenkomstige gedragstag toe.
2. Promoveer lifecycle naar `lifecycle_engaged` als huidige fase `lifecycle_new_lead` is.

### Trigger C - MQL-kwalificatie
Entry conditions (één van):
- Reply bevat koopintentie.
- Click op high-intent CTA (`/book-call`, `/pricing`, `/diagnostic`).
- Formulierveld toont implementatietiming <= 90 dagen.

Actions:
1. Zet lifecycle op `lifecycle_mql`.
2. Maak taak voor manuele opvolging binnen 1 werkdag.

### Trigger D - SQL-conversie
Entry conditions:
- Calendar booking afgerond.

Actions:
1. Voeg `beh_booked_call` toe.
2. Zet lifecycle op `lifecycle_sql`.
3. Stop resterende nurturemails.

### Trigger E - Re-engagementvertakking
Entry conditions:
- Geen opens, clicks of replies binnen 21 dagen na eerste verzending.

Actions:
1. Voeg `beh_no_engagement_21d` toe.
2. Start `aif_email_reengage_v1` (vertakking van 2 stappen).
3. Indien nog inactief na die vertakking: pauzeer verzendingen gedurende 30 dagen.

## 4. Welcome- en nurturesequence (copy-ready)

Cadans:
- Welcome: dag 0, dag 2, dag 5
- Nurture: week 2 en week 3 (2 e-mails per week)

Tone of voice:
- No-nonsense, praktisch, Belgische KMO-context, één CTA per e-mail.

### E-mail W0 (dag 0) - Welkom + snelle winst
Onderwerpopties:
- `Welkom - 1 snelle AI-win voor je team`
- `Start hier: minder handwerk deze week`

Body outline:
- Bevestig inschrijving/context.
- Quick win: kies één repetitief proces om eerst te automatiseren.
- CTA: boek een AI Ops-scan van 20 minuten met 3 concrete verbeterpunten.

Primary CTA link tag:
- `cta_book_scan_w0`

### E-mail W1 (dag 2) - Praktijkcase
Onderwerpopties:
- `Hoe een KMO leadopvolging sneller maakte`
- `Praktijkvoorbeeld: minder manuele opvolging`

Body outline:
- Minicase met proces voor/na.
- Benadruk eenvoudige uitrol boven complexe tooling.
- CTA: antwoord met je grootste bottleneck in 1 zin (we antwoorden met een eerste aanpak).

Primary CTA link tag:
- `cta_reply_bottleneck_w1`

### E-mail W2 (dag 5) - Bezwaren opvangen
Onderwerpopties:
- `Geen tijd voor AI-projecten? Dit werkt wel`
- `Klein starten zonder tool-chaos`

Body outline:
- Pak de meest voorkomende bezwaren aan (tijd, complexiteit, teamadoptie).
- Toon een haalbaar uitrolpad van 2 weken.
- CTA: plan een diagnostische call met concrete volgende stap voor de komende 14 dagen.

Primary CTA link tag:
- `cta_book_diagnostic_w2`

### E-mail N1 (week 2) - Autoriteit
Onderwerpopties:
- `Waarom workflows beter werken dan losse prompts`
- `Van losse AI-trucs naar stabiele workflows`

Topic:
- Waarom workflows beter werken dan losse prompts in KMO-operaties.

CTA:
- Download de workflow-checklist (1 pagina).

Primary CTA link tag:
- `cta_download_checklist_n1`

### E-mail N2 (week 2) - Implementatieroadmap
Onderwerpopties:
- `Je 30-dagen roadmap zonder AI-chaos`
- `Zo start je in 4 weken met meetbare impact`

Topic:
- 30-dagenroadmap: lead capture, follow-upautomatisering, rapportering.

CTA:
- Reply met het proces dat je eerst wilt verbeteren.

Primary CTA link tag:
- `cta_reply_process_n2`

### E-mail N3 (week 3) - KPI-lens
Onderwerpopties:
- `Welke AI-KPI's tellen echt voor KMO's`
- `Waar je funnel vandaag lekt (en hoe je het fixt)`

Topic:
- Welke metrics echt tellen en waar teams pijplijnmomentum verliezen.

CTA:
- Boek een KPI-teardown call.

Primary CTA link tag:
- `cta_book_kpi_teardown_n3`

### E-mail N4 (week 3) - Conversiepush
Onderwerpopties:
- `Laatste stap: wil je dit samen uitrollen?`
- `Plan deze week je implementatiecall`

Topic:
- Aanbodbrug met duidelijke volgende stap en tijdsgebonden uitnodiging.

CTA:
- Boek deze week een call.

Primary CTA link tag:
- `cta_book_call_n4`

## 5. KPI-instrumentatieplan (open/reply/click/booked-call)

### Trackingschema
- Contacteigenschappen:
  - `first_source`
  - `current_lifecycle`
  - `last_engagement_at`
  - `booked_call_at`
- Eventtags:
  - send/open/click/reply-events per e-mail
  - CTA-specifieke clicktags vanuit links

### Wekelijkse dashboardblokken
1. Volume:
- Nieuwe leads per bron.
- Leads die de welcomesequence instromen.

2. Engagement:
- Open rate per stap = unieke opens / delivered.
- Click rate per stap = unieke clicks / delivered.
- Reply rate per stap = unieke replies / delivered.
- Let op: open rate is richtinggevend (mail privacy features kunnen opens overschatten); stuur beslissingen primair op click/reply/booked call.

3. Pijplijn:
- New lead -> engaged.
- Engaged -> MQL.
- MQL -> booked call.
- Booked calls per bron en intent.

4. Kwaliteitscontroles:
- Bounce rate per bron.
- Unsubscribe rate per sequencestap.

### KPI-doelen voor maand 1
- Open rate: >= 45% op welcome e-mail 0.
- Click rate: >= 8% op kern-CTA-mails.
- Reply rate: >= 6% over welcome + nurture.
- Booked-call rate: >= 3% van alle nieuwe leads.

## 6. Buildplan in 10 dagen

Dag 1-2:
- Configureer custom fields, tags en lifecycle-automatieregels.

Dag 3-4:
- Bouw `aif_email_welcome_v1` met alle vertakkingscondities.

Dag 5-6:
- Bouw `aif_email_nurture_v1` + re-engagementvertakking.

Dag 7:
- QA-pass op 10 interne testcontacten (alle hoofdpaden).

Dag 8:
- Publiceer naar een traffic-slice van 20% (gecontroleerde uitrol).

Dag 9-10:
- Evalueer eerste metrics en verbeter zwakke onderwerpregels/CTA-stappen.

## 7. QA-checklist voor lancering

- Elke workflow heeft duidelijke entry- en exitcriteria.
- Lifecyclepromotie en suppressielogica voorkomen dubbele verzendingen.
- Unsubscribe- en bounceafhandeling stoppen alle promotionele verzendingen.
- Alle CTA-links bevatten UTM + stapidentificatie.
- Testmatrix dekt: nieuwe lead, engaged lead, MQL-jump, booked-call stop, no-engagementvertakking.
- Consent/logging is aantoonbaar: opt-in bron + timestamp + juridische basis per contact.

## 8. Redactionele QA-notes (Editor)

Status: QA uitgevoerd op structuur, duidelijkheid, consistentie en CTA-kracht.

### Must-fix (voor livegang)
- Voeg een expliciete compliance-check toe in GHL: bewijsbare opt-in (bron + timestamp + juridische basis) als verplichte gate voor promotionele verzending.
- Zorg dat elk nurturebericht exact één primaire CTA-tag heeft (nu consistent gemaakt in deze versie, nog te implementeren in GHL-links zelf).

### Nice-to-have (na livegang)
- Voeg per e-mail een korte PS-variant toe voor niet-klikkers (zelfde CTA, andere invalshoek) voor snellere iteratie.
- Splits rapportering ook op segment `micro-KMO` vs `KMO 10-50` zodra volume dit toelaat.

### Eindstatus
- Go/No-go: **GO met voorwaarden**.
- Voorwaarde: publiceer pas wanneer beide must-fix punten technisch bevestigd zijn in workflowtests.
