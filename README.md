# ELVARO Lighting

Official website for Zhejiang Jindalai Lighting Technology Co., Ltd.

## Deployment

Static HTML/CSS/JavaScript site. Vercel framework: Other; repository root; no build/install command; output directory: `dist`. `vercel.json` enables clean URLs, including `/about` and product routes.

## Source snapshot

Website source synchronized from commit `146a539a934290caabb34d8188eeb9a443c4e694` on 2026-11-04, including the updated About page, real factory and project photographs, product imagery and official social profile links. Additional repository files are retained.

## Maintenance

Serve `dist` as the web root. Editing utilities live at repository root; some one-time migrations require original local assets. See `ABOUT-MAINTENANCE.md` for About image and content configuration.

## Verification

Run `node verify-details.cjs` and `node verify-analytics.cjs`.

## Forms

Forms use the existing public Formcarry endpoint. No private frontend credentials are required. Never commit API tokens, `.env` files or authentication state.
