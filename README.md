# Sangram Kumar Nahak | Cinematic GIS & LiDAR Portfolio

This is the updated cinematic portfolio website. It keeps the six-scene scroll-controlled film and the visual motion-design layer, with a smoother scroll-to-film response and refreshed profile details.

## Latest updates

- **Smoother scroll-driven film:** the video playhead now follows scrolling with frame-rate-independent easing, so the motion feels consistent on 60 Hz, 90 Hz and 120 Hz displays.
- **Cleaner video seeking:** video seeks are paced to the source film's 24 fps cadence instead of issuing redundant seeks on every animation frame.
- **Lighter CAD rendering:** the transparent wireframe, LiDAR point-cloud and terrain layer is rendered at a controlled 30 fps to reduce work during scrolling.
- **Smoother navigation:** section links use smooth scrolling, while the site respects the visitor's reduced-motion preference.
- **Updated experience:** the profile now says **6+ years of experience**.
- **Updated location:** the profile now says **Bengaluru, Karnataka, India**.

## New in this version

- **Live survey HUD (desktop):** bottom-left readout showing the current scene (01–06), Bengaluru coordinates with a subtle drift, and a point counter that climbs toward 1.7 billion as you scroll.
- **Scene dots:** a right-edge dot navigation with hover labels that mirrors the top menu and highlights the active section.
- **Copy-email button:** one click copies your email with a small confirmation toast (clipboard fallback included).
- **SEO and sharing:** Open Graph/Twitter tags, a Person JSON-LD block, an inline favicon and a `<noscript>` fallback so crawlers and no-JS visitors still see your name, role and contact.
- **Performance:** DOM lookups and media queries are cached instead of repeated every frame.
- **Before deploying:** change `og:image` in `index.html` to an absolute URL (for example `https://yourdomain.com/media/poster.jpg`) so link previews work on LinkedIn/WhatsApp.

- **Keyboard shortcuts:** press **J / K** (or **] / [**) to jump to the next or previous scene.
- **Hosting files:** `_headers` (Netlify/Cloudflare Pages) caches the film and assets for a year and adds basic security headers; `robots.txt` allows indexing. Add a `sitemap.xml` once you have your domain.

- **Loader rebuilt:** the name animation now starts at first paint (markup is in the HTML, not built by JavaScript), waits for the Anton font so letters never appear invisible, shows an eased progress bar with a minimum display time, and exits with a staggered lift-off. A 30 s failsafe removes it if anything goes wrong.
- **Production hardening:** all config text is HTML-escaped, resize handlers are debounced, per-frame DOM lookups are cached, and visitors with Data Saver on get the lighter video.

## Existing visual features

- **Animated opening name:** “SANGRAM KUMAR NAHAK” reveals letter by letter with subtle 3D depth/extrusion.
- **Kinetic section typography:** headings and supporting text ease into view as each section becomes active.
- **3D display typography:** technical phrases such as “LiDAR · POINT CLOUD” and “3D TERRAIN · DIGITAL MODELS” float in perspective during the matching film moments.
- **Transparent CAD motion:** a procedural canvas layer draws animated wireframe solids, LiDAR point-cloud scans and a flowing terrain mesh.
- **Responsive and reduced-motion behavior:** effects scale down on small screens and are suppressed where the visitor requests reduced motion.
- **Pointer light:** a soft amber/cyan glow follows the cursor on desktop without blocking links or controls.
- **Project-card depth:** project cards tilt gently toward the pointer and reveal a soft CAD-like light sweep on hover.
- **LiDAR scan sweep:** a faint horizontal scan beam crosses the cinematic layer to add a surveying/point-cloud feel.
- **Micro-interactions:** buttons, contact links, active navigation and statistic counters have subtle motion and light responses.

The CAD visuals are generated in the browser with Canvas 2D perspective projection. No Three.js/WebGL dependency or additional 3D model assets are required.

## Preview locally

1. Extract the ZIP.
2. Open a terminal in the extracted folder.
3. Run:

   ```bash
   cd site
   python3 -m http.server 8000
   ```

4. Open `http://localhost:8000`.

Use a local web server rather than opening `index.html` directly, because the page loads the video assets with `fetch()` for its loading progress display.

## Deploy

Upload the **contents** of the `site` folder to Netlify, Vercel, GitHub Pages, or another static hosting provider. Keep the `media` folder beside `index.html`, `app.js`, `config.js`, and `style.css` so the video and résumé paths continue to work.

## Customize

- Edit profile details, project cards, skills, experience, education, contact links, and CV path in `site/config.js`.
- Edit animation timing and scene transitions in `site/app.js`.
- Edit colors, typography, and responsive styles in `site/style.css`.

The original film and résumé assets from the uploaded site are retained. The résumé PDF itself has not been edited; replace `site/media/resume.pdf` with your updated CV when you have a refreshed PDF.
