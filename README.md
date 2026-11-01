# ELVARO Lighting

Website for Zhejiang Jindalai Lighting Technology Co., Ltd.

## Files
- dist/: deployable static HTML, CSS, JavaScript and images.
- dist/products/: category pages; details/: product detail pages.
- dist/support/: Catalog and FAQ.
- dist/assets/inquiry.js: shared Formcarry handler.
- .openai/hosting.json: existing Sites identity.
- Root .cjs files: development editing utilities and checks. Some are one-time migrations; do not rerun indiscriminately.

## Preview
Serve dist as the web root (asset paths are absolute):

    python -m http.server 8080 --directory dist

Open http://localhost:8080.

## Check

    node verify-details.cjs

## Forms
Browser submissions go to Formcarry bhQE2jVx_QB ("Alice su"). This public endpoint ID requires no frontend secret. Never commit API keys or OAuth credentials.

The handler includes validation, honeypot, duplicate submission prevention, timeout and success/error feedback, plus source page and selected product information.

Integration is deployed; real browser submission and email delivery verification remain outstanding.

## Content
Product entries and imagery are illustrative references. Official photos, models, specifications, PDF catalogue and social account links are pending.

## Deployment
Use dist as the static root. The intended domain elvarolighting.com has not been connected.

Private preview: https://elvaro-lighting.selectgnat.chatgpt.site

## Google Analytics
All 30 HTML pages include the Google tag once in the head using measurement ID G-QM772ND6E4.

Run node verify-analytics.cjs to validate tag coverage, placement and initialization.
The measurement ID is public. No visitor form fields or inquiry content are sent as custom analytics parameters.
Actual data receipt must be confirmed in the Google Analytics Realtime report.
