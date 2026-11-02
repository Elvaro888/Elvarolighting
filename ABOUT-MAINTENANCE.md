# About Us implementation and image guide

## Existing site and scope

- Buildless static HTML, CSS and vanilla JavaScript; no frontend framework, package manager, bundler or client router.
- Deployed root: `dist/`. Source page: `dist/about.html`; existing links use `/about.html` and the hosting platform also serves the clean `/about` URL. No canonical tags existed on this page; this convention is preserved.
- Header and footer are embedded in the HTML. Their markup and existing scripts are retained byte-for-byte. No product page, global stylesheet, routing behavior or navigation behavior is changed by this redesign.
- Existing styles: inline shared base rules, `/assets/detail.css` and `/assets/warm-theme.css`. Brand tokens include cream `#f5eee7`, copper `#a66328`, brown `#30251e`, warm paper `#fffaf5`, Arial typography. About-only styling adds warm white `#fafaf8` and restrained neutral surfaces.
- Photography remains under the existing `/assets/` convention, in a dedicated `/assets/about/` directory. No framework-style `/public/` directory is needed.
- Existing Google tag, viewport settings, footer inquiry form, product navigation and mobile menu are retained. The About breadcrumb has a local reset to avoid the shared mobile `nav` selector.

## Files

- `dist/about.html`: generated semantic eight-section page.
- `build-about.cjs`: reusable buildless page generator. Reads the existing page and replaces only About content/metadata; safe to rerun.
- `dist/assets/about/about-config.json`: **edit this file** for all image paths, alt text, labels, captions, patent/certificate metadata, project information and internal editorial notes.
- `dist/assets/about/about-images.json`: generated public image registry, including responsive sidecars. Do not edit directly.
- `dist/assets/about/about.css`: scoped styles; no shared component changes.
- `dist/assets/about/about.js`: lazy image hydration, missing-image fallback and accessible modal enlargement.
- `verify-about.cjs`: focused structure, source-scope, metadata and header/footer checks.
- `dist/assets/about/*.jpg`: supplied photographs and documents, optimized for the web, with `-640.jpg` responsive derivatives for populated slots.

## Page sections

1. Architectural hero, using the client-provided entrance project photograph.
2. Company positioning, team experience, business scope and B2B audiences.
3. Manufacturing and quality photo grid, with six visible image positions.
4. R&D and the actual patent-wall photo.
5. Three static supplied certificates, distinguishing management-system and product-conformity documents.
6. Four project image cards plus three detailed client-supplied engineering case summaries.
7. Four professional partnership values.
8. Dark contact CTA to existing `/contact.html#quote` and `/products/index.html` routes.

No video element, fake video image, stock factory image or fabricated patent/certificate has been added.

## Complete primary image manifest

All paths below are relative to `dist/assets/about/`. Suggested dimensions describe source files; responsive layout scales them down.

| Filename | Recommended source size | Layout ratio | Initial state |
| --- | --- | --- | --- |
| `about-hero.jpg` | 1920 × 800 | 12:5 | Supplied architectural project photo; responsive crop |
| `about-company.jpg` | 1200 × 900 | 4:3 | Supplied showroom photograph |
| `factory-overview.jpg` | 1600 × 1200 | 4:3 | Supplied production-floor photograph |
| `factory-workshop.jpg` | 1200 × 900 | 4:3 | Supplied workshop photograph |
| `factory-assembly.jpg` | 1200 × 900 | 4:3 | Supplied assembly photograph |
| `factory-testing.jpg` | 1200 × 900 | 4:3 | Supplied test-area photograph |
| `factory-aging.jpg` | 1200 × 900 | 4:3 | Supplied powered aging-test photograph |
| `factory-packaging.jpg` | 1200 × 900 | 4:3 | Supplied packaging and dispatch photograph |
| `patent-wall.jpg` | 1600 × 900 | 16:9, contain | Supplied patent-wall image, uncropped |
| `certificate-01.jpg` | 1600px wide or original scan | 3:4, contain | Supplied CE_01: LVD product conformity |
| `certificate-02.jpg` | 1600px wide or original scan | 3:4, contain | Supplied CE_02: ISO 9001 management-system document |
| `certificate-03.jpg` | 1600px wide or original scan | 3:4, contain | Supplied CE_03: RoHS product conformity |
| `project-01.jpg` | 1500 × 1000 | 3:2 | Supplied hotel photograph |
| `project-02.jpg` | 1500 × 1000 | 3:2 | Supplied residential project image |
| `project-03.jpg` | 1500 × 1000 | 3:2 | Supplied commercial project photograph |
| `project-04.jpg` | 1500 × 1000 | 3:2 | Supplied outdoor entrance photograph |

Documents are fitted inside the layout without cropping text. Natural image proportions are retained in the enlargement dialog. Keep the original high-resolution documents in the company's records.

## Replacing images

1. Place a genuine photograph or scan under the expected primary filename in `dist/assets/about/`. A previously empty slot automatically checks that path when it approaches the viewport and replaces its placeholder only after the file loads successfully. It never inserts a visibly broken image.
2. For a different filename, update `file` in `about-config.json`. Update meaningful `alt`, `label`, captions and appropriate metadata. Keep `ratio` stable unless intentionally redesigning the image area.
3. For existing responsive photographs, replace **both** the main image and its `-640.jpg` derivative. Alternatively remove an obsolete derivative before rebuilding so it cannot show an outdated image. For newly populated slots, an optional 640px-wide derivative is recommended.
4. Run `node build-about.cjs` and `node verify-about.cjs`. This regenerates markup and `about-images.json` from the central configuration; no page-layout changes are required.
5. Publish through the existing Sites source/package workflow. Uploading a file locally does not modify the hosted Site until publication.

Every image position reserves its aspect ratio before loading. The gallery uses native dialog focus containment, Escape to close, a close button and focus restoration. Missing photographs do not become clickable. Motion preferences are respected.

The current section functions are independent: a future real factory video can be added as a new component without refactoring these photo slots. No empty video component is shipped.

## Factual scope and confirmations still needed

- 20+ years and 100+ projects describe **team experience**, as supplied by the client, not an invented company incorporation date.
- Facility ownership, employee count, area, capacity, revenue, export-country totals and equipment specifications are not claimed.
- The three certificate scans are displayed only within their stated scopes. ISO number and validity are transcribed from the supplied scan; live issuer status and surveillance have not been independently verified. LVD and RoHS conformity documents do not establish blanket approval for every product. They are not mislabeled as independent laboratory reports.
- Individual patent titles, types, numbers, owners and current status await original documents. No patent count is inferred from the display wall.
- Three detailed cases are based on client-provided information: Chengyun Technology / City Cloud & Big Data Industrial Base (started March 2023, Binjiang/Hangzhou, >3,000 custom lighting units); Yueqing H-b12 / H-b15-1 nightscape (completed March 2020, >10,000 units); Qijia Ship Lock facade lighting (completed 2022, >3,000 units).
- Confirm official English project names, permission to publish, precise company/team role and which photograph belongs to each named case. Existing four portfolio images are not automatically assigned to those three cases.
- Qingdao SCO Summit, Hangzhou G20 Summit and the stated Wuhan sports event remain unpublished as verified examples. Confirm event identity, dates, project names and exact team participation first.
- The user removed individual-patent and extra-certificate placeholder slots. All remaining image positions are populated.

## Validation

- Existing checks: `node verify-details.cjs`, `node verify-analytics.cjs`.
- Focused check: `node verify-about.cjs`.
- JavaScript syntax: `node --check build-about.cjs` and `node --check dist/assets/about/about.js`.
- No package.json, lint configuration, TypeScript setup or framework build exists. Therefore lint and type checks are not available; no dependency was added.
- Browser QA: reviewed at 1440 × 900, 768 × 1024 and 390 × 844. No horizontal overflow observed. Real image/modal loading, Escape close, focus restoration and mobile certificate enlargement checked. A shared mobile breadcrumb styling conflict was fixed within About-only CSS.
- Screenshots are saved outside the site source at `J:/ELVARO/github/about-review/desktop.png` and `mobile.png`.

The general positioning reference was https://www.entaled.com/; no text, image, branding or page layout was copied.

## Latest revision — 2026-11-02

The individual four-patent placeholder gallery has been removed. The patent wall remains. Certificate slots 04–06 are removed; the three supplied certificates are static thumbnails without enlargement buttons or original-image links. This is a presentation change, not a guarantee that a browser cannot retrieve a displayed image.

`factory-aging.jpg` now uses the supplied aging-test photo. `factory-packaging.jpg` now uses the supplied dispatch photo and is captioned Packaging & Dispatch. Both include 640px responsive derivatives. The page now has 16 populated image positions and no missing-image slots. The central configuration and generic fallback remain reusable. Earlier manifest rows for patent-01 to patent-04 and certificate-04 to certificate-06 are retired.

The CTA uses warm beige #e7d6c3 with dark text, distinct from the unchanged dark-brown footer.
