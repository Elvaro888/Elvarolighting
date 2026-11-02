# ELVARO Lighting

Official website for Zhejiang Jindalai Lighting Technology Co., Ltd.

## Deployment

Static website. Vercel framework: Other; project root: repository root; build and install commands: none; output directory: `dist`. Routing is defined in `vercel.json`.

## Source snapshot

Synced from the current hosted website source commit `64eab06f27c7e9409b3cfdad332fd955b31979db` on 2026-11-02. Includes the latest product photographs, backlighting, garden lighting, product directory and About page.

## Verification

Run `node verify-details.cjs`, `node verify-analytics.cjs` and `node verify-about.cjs`.

## Forms

Product inquiry forms use the existing public Formcarry endpoint. No private API credentials are required in the frontend.

Root scripts are editing and verification utilities; some are one-time migrations requiring original local image files. Serve `dist` as the web root.
