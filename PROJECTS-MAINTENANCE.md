# Project solutions page

Public route: `/projects`. Static source: `dist/projects.html`. Navigation throughout the existing site now points to this route. The existing home project gallery remains available at `/#projects`.

Run `node build-projects.cjs` to regenerate this page from the current site's header/footer, update navigation and emit the application/drawing content. Then run `node build-seo.cjs` and `node verify-seo.cjs` to update and validate the sitemap. Styles and interactions live in `dist/assets/project-solutions.css` and `dist/assets/project-solutions.js`.

The supplied Word design was used for the five applications, six drawing types (drainage and ventilation removed; second item changed to floor plan), service scope and six-stage workflow. Design fees, revision counts, delivery dates and implementation support require project-specific agreement. The competitor's images, fees and capability claims were not reused.

The floor-plan and system graphics are original conceptual SVG diagrams, explicitly labelled as illustrative and not for construction. Replace these with approved ELVARO engineering samples when available. Existing hotel, residential, commercial and outdoor project photographs were retained. Villa and smart scene images are AI concept visualizations labelled on the page. Scene buttons provide a visual simulation; they do not operate devices.

The project form reuses the existing Formcarry endpoint and shared submission handler. It was checked for required fields and integration; no test enquiry was sent to the company.

## Generated visual

Mode: built-in image generation. Project asset: `dist/assets/project-solutions-villa.jpg` (optimized JPEG). Original generation prompt:

Use case: photorealistic-natural. Create one ultra-wide architectural visualization photograph, 3:2 landscape high resolution, for ELVARO Lighting luxury B2B lighting and whole-home smart solutions website. Beautiful contemporary villa living room at blue hour, warm 3000K concealed linear cove LED lighting tracing ceiling edges, precise recessed anti-glare spotlights, wall washing on textured ivory stone, warm walnut cabinetry with illuminated shelves, softly lit staircase on right, a small elegant wall mounted black smart home touch panel clearly visible in near foreground at right with subtle simple illuminated control symbols, curtains beside full height glass, landscaped courtyard visible beyond windows, low cream sofa, sophisticated restrained copper and chocolate palette. Architectural lighting is hero subject and demonstrably shapes the space. Photorealistic premium architectural editorial photography, balanced realistic exposure, fine material texture, no people, no logos, no text, no watermark. Broad darkish negative space on left for web headline overlay. No science fiction holograms.
