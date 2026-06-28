# RescueArc Concept Site Design

**Goal**
Ship a public, phone-friendly static concept site for a throwable inflatable rescue device that tells one strong story fast: ring buoys are bad projectiles, lifeguards need faster first-contact options, and RescueArc is a concept-stage answer with a serious commercialization roadmap behind it.

## Product framing
RescueArc is currently being presented as a **concept-stage rescue hardware company**, not as a finished product, not as a preorder page, and not as a fake-certified lifesaving device.

## Assumed first buyer
Default assumption for this first site: **lifeguard organizations / municipalities / professional water-safety operators first**, with broader marine and family-safety markets later.

## Primary audience
- Drake reviewing the invention story on phone
- Friends, collaborators, and early believers
- Potential operators, engineers, and investors who need the wedge explained clearly

## Success criteria
- The page explains the concept in seconds, not minutes.
- The lifeguard-chair rack scenario is vivid and memorable.
- The site is honest about patent and prototype risk.
- The site includes a clear roadmap instead of empty marketing fluff.
- The artifact has a real public URL.

## Chosen approach
**Static GitHub Pages concept site** with editorial product storytelling, custom vector schematic assets, and roadmap sections.

This is the right first pass because it is:
- fast to publish
- easy to share
- easy to restyle later
- honest about concept-stage status
- sufficient for story + roadmap without pretending backend/product readiness

## Information architecture
1. Hero
   - working title and core line
   - immediate articulation of the rescue wedge
   - toggle between hero scenario and deployment sequence
2. Problem / category critique
   - why ring buoys are still weak projectiles
   - why existing adjacent rescue categories do not fully own this story
3. Lifeguard scenario
   - chair-side rack concept
   - repeated throw shots
   - swim-out second, throw first
4. Prototype schematic
   - shell, gas core, trigger, bladder, inflated geometry
5. Patent / IP reality
   - broad concept is crowded; narrow wedge matters
6. Full roadmap
   - invention definition
   - IP triage
   - prototype architecture
   - performance proof
   - manufacturability
   - go-to-market / capital
7. Current status footer
   - preview-only concept artifact

## Build shape
- static HTML/CSS/JS only
- custom SVG visuals instead of fake screenshots
- no forms
- no checkout
- no auth
- no external APIs

## File structure
- `index.html`
- `assets/style.css`
- `assets/app.js`
- `assets/lifeguard-scene.svg`
- `assets/deployment-sequence.svg`
- `assets/prototype-architecture.svg`
- `.nojekyll`
- `README.md`
- docs under `docs/superpowers/specs/`, `docs/plans/`, and `docs/research/`

## Visual direction
- premium editorial landing-page feel
- navy / sand / water palette
- Georgia serif headlines, clean sans body
- diagram-forward instead of generic stock imagery
- couch-distance readable sectioning and buttons

## Mobile requirements
- single-column stack below tablet sizes
- large tap targets
- no dense tiny labels
- strong vertical narrative rhythm
- important honesty lines visible without deep scrolling

## Honesty rules
- do not claim certification
- do not claim patentability certainty
- do not claim manufacturability is solved
- do not imply commerce is live

## Out of scope for this first live cut
- email capture
- investor portal
- real patent search packet with attorney-level review
- actual CAD/CAM files
- store / preorder infrastructure
- compliance documentation
