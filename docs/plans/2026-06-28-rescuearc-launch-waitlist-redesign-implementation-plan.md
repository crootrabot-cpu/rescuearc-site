# RescueArc Launch Waitlist Redesign Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Redesign the existing RescueArc static concept site into a premium launch-style waitlist page for pro coastal safety buyers, with an email-only CTA and an explicit concept-stage honesty boundary.

**Architecture:** Keep the site static and lightweight: rewrite `index.html` around a launch-first information hierarchy, upgrade `assets/style.css` for a more premium conversion-oriented surface, and extend `assets/app.js` only for hero media toggles and honest waitlist-form behavior. Reuse existing generated visuals where they strengthen the launch story, but do not add fake checkout, fake traction, or fake backend success states.

**Tech Stack:** HTML, CSS, vanilla JavaScript, existing SVG/image assets, Python `http.server`, `curl`, headless Firefox for screenshots, Git.

**User Task / Story:** As a coastal-safety buyer or interested operator, I want to understand RescueArc quickly and join a priority waitlist, so I can track launch progress without being misled about product readiness.
**User Need:** A premium, credible, low-friction landing page that makes the product feel desirable and serious while staying honest that it is still concept-stage.
**Critical Journey / Golden Flow:**
1. User lands on the hero and immediately understands RescueArc as a premium coastal safety product concept.
2. User sees who it is for: lifeguard teams, marinas/docks, and coastal operators.
3. User understands the product + system wedge: better throwability, rack/station logic, and deployment story.
4. User reaches a simple email-only waitlist form and understands what action they can take now.
5. User sees explicit honesty language that the product is concept-stage, not certified, and not available for purchase yet.
**Acceptance Checks:**
- The page contains a visible launch-style CTA such as `Join priority waitlist`.
- The page contains trust/use-case labels for lifeguard teams, marinas/docks, and coastal operators.
- The page contains product reveal, system story, deployment proof, and waitlist sections.
- The page contains explicit honesty/status language stating concept-stage / not certified / not available for purchase.
- The page verifies locally and with screenshots on desktop and phone-width layouts.
**Out of Scope / No-gos:** No checkout, no payments, no fake preorder confirmation, no fabricated customer proof, no backend dependency required for first implementation.

**Exposure Target:** `preview-only`
**Risk If Wrong:** The page could imply unjustified product maturity or fake waitlist capture, damaging trust.
**Rollback / Disable Path:** Revert the redesign commit(s) or restore the previous `index.html`, `assets/style.css`, and `assets/app.js` from git.
**Watch Signals:**
- Error: broken anchors, broken image references, JS errors, non-working form validation states
- Latency / performance: oversized hero media causing visibly slow first paint
- Product: users cannot tell what action to take now or believe they successfully signed up when no backend exists

**Content Contract:**
- Screen purpose line: premium launch-style waitlist page for a concept-stage coastal safety product
- Primary action label: `Join priority waitlist`
- Input labels: `Email address`
- Helper / instruction text: concise early-access/waitlist framing, not crowdfunding or checkout framing
- State copy: Loading `Joining waitlist…`; Empty `Enter your email address`; Error `Please enter a valid email address` and `Prototype only — waitlist submission is not wired yet`; Success only if a real endpoint exists
- Trust / risk copy: concept-stage, not certified yet, not currently available for purchase

**Checkpoint Cadence:**
- **Shape Checkpoint:** final section order, primary CTA, and honesty boundary are locked before major markup rewrite
- **Kickoff Checkpoint:** selected visuals, section copy skeleton, and form behavior rules exist in repo before polish
- **Demo Checkpoint:** a locally served page shows hero, trust band, product/system sections, waitlist block, and honesty footer end-to-end
- **Release + Review Checkpoint:** screenshots and local verification prove the launch page hierarchy works without fake signup or fake checkout behavior

---

### Task 1: Freeze the launch-page content map

**Objective:** Rewrite the page structure on paper first so implementation follows the approved launch hierarchy instead of drifting.

**Files:**
- Modify: `index.html`
- **Journey Step(s):** `[GF1, GF2, GF3, GF4, GF5]`
- **Acceptance Mapping:** `[CTA, audience labels, core sections, honesty language]`
- **Content Mapping:** primary action label, helper text, trust/risk copy
- **User-facing reason:** Locks the exact story order before styling or JS changes start.

**Step 1: Replace the current section order in `index.html`**
- Remove the concept-first opening structure that leads with invention memo language.
- Rebuild the page in this order:
  1. sticky header
  2. launch hero
  3. immediate trust/use-case band
  4. product reveal
  5. system story
  6. deployment proof
  7. concise category-opening/problem section
  8. waitlist conversion block
  9. honesty/status footer

**Step 2: Rewrite nav labels to match the new flow**
Use a smaller, launch-oriented nav such as:
- `Why it matters`
- `System`
- `Deployment`
- `Waitlist`

**Step 3: Verify the outline exists in source**
Run: `python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
for needle in ['Join priority waitlist', 'For lifeguard teams', 'Email address']:
    print(needle, needle in html)
PY`
Expected: all markers print `True` once the content skeleton is in place.

**Step 4: Commit**
```bash
git add index.html
git commit -m "feat: reshape RescueArc page into launch waitlist structure"
```

### Task 2: Build the launch hero markup

**Objective:** Create the new premium hero with dominant visual, launch copy, and the primary CTA.

**Files:**
- Modify: `index.html`
- **Journey Step(s):** `[GF1, GF4]`
- **Acceptance Mapping:** `[launch CTA, hero hierarchy]`
- **Content Mapping:** `Join priority waitlist`, `See deployment system`
- **User-facing reason:** The user should understand the product category and next action immediately.

**Step 1: Replace the current concept-stage hero copy**
Include:
- eyebrow or short context line for premium coastal safety
- launch-style headline
- short value proposition
- primary CTA button: `Join priority waitlist`
- secondary CTA button: `See deployment system`

**Step 2: Pair the hero with one dominant visual**
Prefer one of the strongest generated launch visuals already in the repo, likely from:
- `visuals/outputs/premium-investor-brand-hero-set-B/B4-seated-chair-system-worldbuilding.png`
- or another chosen premium hero image promoted into the page

**Step 3: Keep caveats out of the hero body**
Do not front-load certification or non-purchase disclaimers in the main hero copy. Those belong lower on the page.

**Step 4: Verify hero markers**
Run: `grep -n "Join priority waitlist\|See deployment system" index.html || true`
Expected: both CTA strings present in the hero block.

**Step 5: Commit**
```bash
git add index.html
git commit -m "feat: add RescueArc launch hero"
```

### Task 3: Add the immediate trust/use-case band

**Objective:** Show who the page is for without fake logos or fake certifications.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- **Journey Step(s):** `[GF2]`
- **Acceptance Mapping:** `[audience labels]`
- **Content Mapping:** `For lifeguard teams`, `For marinas and docks`, `For coastal operators`
- **User-facing reason:** Removes audience ambiguity fast.

**Step 1: Add a compact trust band below the hero**
Use 3 premium labels/cards/chips with the exact audience language approved in the spec.

**Step 2: Style the band to feel declarative, not testimonial-like**
Avoid logo clouds, made-up proof bars, or faux badges.

**Step 3: Verify audience markers**
Run: `python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text()
for needle in ['For lifeguard teams', 'For marinas and docks', 'For coastal operators']:
    print(needle, needle in html)
PY`
Expected: all `True`.

**Step 4: Commit**
```bash
git add index.html assets/style.css
git commit -m "feat: add pro coastal trust band"
```

### Task 4: Build the product reveal section

**Objective:** Make the RescueArc object itself feel premium, throwable, and serious.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- **Journey Step(s):** `[GF3]`
- **Acceptance Mapping:** `[product reveal section]`
- **User-facing reason:** The user needs to understand the product object, not just the abstract idea.

**Step 1: Add a product reveal block**
Include:
- product-beauty image
- short headline
- concise copy about throwability vs ring buoy awkwardness

**Step 2: Wire in the product-beauty image**
Prefer:
- `visuals/outputs/premium-investor-brand-hero-set-B/B2-smaller-vortex-product-beauty.png`

**Step 3: Keep copy tight**
Do not let this section turn into a spec sheet or patent memo.

**Step 4: Commit**
```bash
git add index.html assets/style.css
git commit -m "feat: add RescueArc product reveal section"
```

### Task 5: Build the system story section

**Objective:** Explain the chair/station/rack repeated-shot rescue workflow.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- **Journey Step(s):** `[GF3]`
- **Acceptance Mapping:** `[system story section]`
- **User-facing reason:** This is the business wedge, not just the object.

**Step 1: Add a system section with 3–4 short steps or cards**
Possible structure:
- elevated scan position
- instant rack access
- repeated-shot response
- swim-out second, not first

**Step 2: Pair the section with the strongest station/worldbuilding visual**
Prefer:
- `visuals/outputs/premium-investor-brand-hero-set-B/B4-seated-chair-system-worldbuilding.png`

**Step 3: Preserve the repeated-shot logic**
Make sure the copy clearly says this is not a one-throw-only story.

**Step 4: Commit**
```bash
git add index.html assets/style.css
git commit -m "feat: add RescueArc system story section"
```

### Task 6: Build the deployment proof section

**Objective:** Show compact throwable state plus inflated flotation state as one coherent product story.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- Modify: `assets/app.js`
- **Journey Step(s):** `[GF3]`
- **Acceptance Mapping:** `[deployment proof section]`
- **User-facing reason:** Helps the user understand what happens after the throw.

**Step 1: Add a deployment proof block**
Use either:
- one strong static frame plus explanatory captions, or
- a simple toggle between compact/impact/inflated states if the interaction remains very lightweight

**Step 2: Keep JS minimal**
If reusing the existing toggle pattern, extend it carefully rather than adding a framework or multi-step UI.

**Step 3: Keep claim language aspirational but honest**
Do not imply proven reliability or certified performance.

**Step 4: Commit**
```bash
git add index.html assets/style.css assets/app.js
git commit -m "feat: add RescueArc deployment proof section"
```

### Task 7: Compress the old problem/roadmap into a concise category-opening section

**Objective:** Keep the “why current tools are weak” argument without reverting to essay mode.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- **Journey Step(s):** `[GF3]`
- **Acceptance Mapping:** `[why current tools are weak section]`
- **User-facing reason:** Gives the category opening without losing launch momentum.

**Step 1: Reduce the current long-form problem copy**
Keep only the strongest lines:
- ring buoys are trusted but awkward projectiles
- first-throw distance and accuracy matter
- RescueArc reframes the first contact attempt

**Step 2: Demote or compress the roadmap**
Either remove it from the main page or compress it into a much lighter “What comes next” note below the launch story.

**Step 3: Commit**
```bash
git add index.html assets/style.css
git commit -m "feat: compress concept copy into concise category section"
```

### Task 8: Add the email-only waitlist block with honest static behavior

**Objective:** Add the conversion surface without pretending the waitlist is wired if it is not.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- Modify: `assets/app.js`
- **Journey Step(s):** `[GF4, GF5]`
- **Acceptance Mapping:** `[waitlist block, honesty boundary]`
- **Content Mapping:** `Email address`, `Join priority waitlist`, validation/error copy
- **User-facing reason:** Gives the user a concrete next action without lying about backend state.

**Step 1: Add a single-field form**
Required fields/elements:
- label: `Email address`
- email input
- submit button: `Join priority waitlist`
- message area for validation/error/prototype-not-wired feedback

**Step 2: Add client-side behavior in `assets/app.js`**
Behavior rules:
- empty submit -> `Enter your email address`
- invalid email -> `Please enter a valid email address`
- if no real endpoint exists -> `Prototype only — waitlist submission is not wired yet`
- do not show fake success

**Step 3: Add minimal visual states**
Style focus, error, and info states clearly.

**Step 4: Verify form behavior manually**
Run a local preview, submit:
- empty form
- invalid email
- valid email
Expected: honest local state messages, no fake success.

**Step 5: Commit**
```bash
git add index.html assets/style.css assets/app.js
git commit -m "feat: add honest static waitlist form"
```

### Task 9: Add the honesty/status footer

**Objective:** Make the trust boundary explicit before the page ends.

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`
- **Journey Step(s):** `[GF5]`
- **Acceptance Mapping:** `[honesty/status language]`
- **Content Mapping:** concept-stage, not certified, not available for purchase
- **User-facing reason:** Prevents the polished page from over-claiming product maturity.

**Step 1: Add a visible honesty block near the page end**
Required points:
- concept-stage / preview-only
- not certified yet
- not currently available for purchase

**Step 2: Make it visually clear but not panicky**
This should read as trust-building clarity, not legal junk.

**Step 3: Verify honesty markers**
Run: `python3 - <<'PY'
from pathlib import Path
html = Path('index.html').read_text().lower()
for needle in ['concept-stage', 'not certified', 'not currently available for purchase']:
    print(needle, needle in html)
PY`
Expected: all `True` or equivalent approved wording.

**Step 4: Commit**
```bash
git add index.html assets/style.css
git commit -m "feat: add RescueArc honesty footer"
```

### Task 10: Polish the premium visual system for the new hierarchy

**Objective:** Upgrade the CSS so the new page reads like a premium launch page instead of a reused concept page.

**Files:**
- Modify: `assets/style.css`
- **Journey Step(s):** `[GF1, GF2, GF3, GF4, GF5]`
- **Acceptance Mapping:** `[desktop/mobile hierarchy]`
- **User-facing reason:** The launch hierarchy has to feel intentional, not like old sections rearranged.

**Step 1: Rework spacing and typography around the new hero**
Increase separation between hero, trust band, and conversion blocks.

**Step 2: Create section-specific styling for**
- launch hero
- trust band
- product reveal
- system story
- deployment proof
- waitlist form
- honesty block

**Step 3: Remove or downplay legacy concept-page styling that no longer fits**
Examples: overbearing roadmap grids, compare blocks, or memo-like proof strips if they clutter the launch feel.

**Step 4: Commit**
```bash
git add assets/style.css
git commit -m "style: polish RescueArc launch waitlist surface"
```

### Task 11: Verify locally with real HTML markers

**Objective:** Prove the redesigned page serves correctly and contains the required content markers.

**Files:**
- No source changes unless fixes are needed.
- **Journey Step(s):** `[GF1, GF2, GF3, GF4, GF5]`
- **Acceptance Mapping:** `[all acceptance checks]`
- **Release / ops reason:** Confirms the preview artifact actually matches the plan before visual review.

**Step 1: Start a local preview**
Run: `python3 -m http.server 8047`

**Step 2: Verify HTTP response**
Run: `curl -I http://127.0.0.1:8047/`
Expected: `HTTP/1.0 200 OK` or equivalent 200 response.

**Step 3: Verify page markers**
Run:
```bash
python3 - <<'PY'
from urllib.request import urlopen
html = urlopen('http://127.0.0.1:8047/').read().decode('utf-8', 'ignore')
needles = [
    'Join priority waitlist',
    'For lifeguard teams',
    'For marinas and docks',
    'For coastal operators',
    'Email address',
    'concept-stage',
]
for needle in needles:
    print({'needle': needle, 'present': needle in html})
PY
```
Expected: each marker returns `present: True` or approved equivalent.

**Step 4: Stop the preview server**
Terminate the server cleanly.

### Task 12: Capture desktop and phone screenshots for hierarchy review

**Objective:** Produce visual proof that the redesign works at presentation level, not just in source code.

**Files:**
- Create: `visuals/verification/launch-waitlist-desktop.png`
- Create: `visuals/verification/launch-waitlist-mobile.png`
- **Journey Step(s):** `[GF1, GF4, GF5]`
- **Acceptance Mapping:** `[desktop/mobile hierarchy]`
- **Release / ops reason:** Screenshots provide the fastest quality gate for the preview-only artifact.

**Step 1: Start local preview again if needed**
Run: `python3 -m http.server 8047`

**Step 2: Capture desktop screenshot**
Run:
```bash
firefox --headless --screenshot /home/fabric-02-rabot/Desktop/AI/rescuearc-site/visuals/verification/launch-waitlist-desktop.png --window-size 1600,2200 http://127.0.0.1:8047/
```

**Step 3: Capture mobile-width screenshot**
Run:
```bash
firefox --headless --screenshot /home/fabric-02-rabot/Desktop/AI/rescuearc-site/visuals/verification/launch-waitlist-mobile.png --window-size 430,2200 http://127.0.0.1:8047/
```

**Step 4: Stop preview server**
Terminate the local server cleanly.

**Step 5: Review the screenshots**
Check:
- hero dominance still reads on desktop and mobile
- trust band does not collapse badly
- waitlist block remains obvious
- honesty copy remains visible and not buried

### Task 13: Final cleanup and handoff note

**Objective:** Leave the redesign in a preview-ready, reviewable state.

**Files:**
- Modify: `README.md` (only if a short preview note is useful)
- **Journey Step(s):** `[GF1, GF2, GF3, GF4, GF5]`
- **Acceptance Mapping:** `[preview-ready artifact]`
- **Release / ops reason:** Makes the preview state explicit and prevents confusion about what is or is not real.

**Step 1: Add or update a short preview note if needed**
State that the current page is a launch-style waitlist concept surface and whether the waitlist form is wired or prototype-only.

**Step 2: Confirm no fake commerce language remains**
Search for terms like `buy now`, `preorder`, `checkout`, `reserve yours`.

**Step 3: Commit final cleanup**
```bash
git add README.md index.html assets/style.css assets/app.js visuals/verification
git commit -m "docs: finalize RescueArc launch waitlist preview handoff"
```

## Critical Journey Verification
1. Open the locally served page.
2. Confirm the hero reads as a premium launch surface and shows `Join priority waitlist` above the fold.
3. Confirm the audience band clearly shows lifeguard teams, marinas/docks, and coastal operators.
4. Confirm the product reveal, system story, and deployment proof sections all appear in that order.
5. Submit the waitlist form empty, invalid, and valid to confirm honest static behavior.
6. Confirm the page explicitly states concept-stage / not certified / not available for purchase before the page ends.

## Content Contract Check
- Screen purpose remains a premium launch-style waitlist page for a concept-stage coastal safety product.
- Primary action label remains `Join priority waitlist` unless intentionally revised and re-approved.
- Input label remains `Email address`.
- The core form states include visible empty/invalid/prototype-only messaging, with no fake success state when no endpoint exists.
- Trust/risk copy stating concept-stage, not certified, and not available for purchase appears before the page ends.
- Most likely drift to prevent: generic CTA swaps (`Learn more`, `Submit`) or dishonest success toasts.

## Release Readiness / Ship Note
- Exposure target remains `preview-only`.
- Rollback path is git revert or restore of pre-redesign `index.html`, `assets/style.css`, and `assets/app.js`.
- First watch signals: broken media references, broken form states, hidden honesty copy, or launch hierarchy collapse on mobile.
- Still mocked/local-only: waitlist submission unless a real endpoint is intentionally wired later.

## Checkpoint Cadence Check
- **Shape Checkpoint:** section order, CTA, and honesty boundary must be locked before the main rewrite.
- **Kickoff Checkpoint:** hero/product/system assets and copy skeleton must exist before styling polish.
- **Demo Checkpoint:** first working local page with launch hero, trust band, core sections, form, and honesty footer.
- **Release + Review Checkpoint:** screenshots plus HTML-marker verification confirm preview readiness.
- The full cadence is active for this redesign because the main risk is polished-but-dishonest drift, not raw implementation difficulty.
