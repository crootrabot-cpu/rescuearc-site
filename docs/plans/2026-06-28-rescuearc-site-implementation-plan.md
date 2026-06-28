# RescueArc Site Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build and publish a polished static concept website for RescueArc with invention story, prototype schematic, patent/IP reality, and commercialization roadmap.

**Architecture:** A single static GitHub Pages site with custom SVG assets, lightweight JS for hero-state switching, and supporting docs for design, research, and implementation planning. The site must stay honest about concept-stage risk while still feeling ambitious and premium.

**Tech Stack:** HTML, CSS, vanilla JavaScript, SVG, Git, GitHub Pages, Python `http.server`, `curl`, `gh` CLI.

**User Task / Story:** As Drake, I want a real live website for this rescue invention so I can show the idea, the schematic logic, and the full roadmap without hand-waving.
**User Need:** A premium, shareable surface that explains the billionaire-scale story while staying grounded on patent, prototype, and proof risk.
**Critical Journey / Golden Flow:**
1. User lands on hero and immediately understands the wedge.
2. User sees the lifeguard chair rack scenario and why it markets well.
3. User understands the prototype architecture and IP reality.
4. User reads the roadmap and sees a disciplined path to commercialization.
5. User leaves with a live link and supporting docs that feel real.
**Acceptance Checks:**
- The page contains the core product line `Throw farther. Reach faster. Float on impact.`
- The page contains the lifeguard rack scenario and repeated-shot story.
- The page contains the prototype architecture section and IP reality section.
- The page contains a six-phase roadmap.
- The public URL resolves and serves the expected hero and roadmap markers.
**Out of Scope / No-gos:** No fake preorder, no fake patent claim, no fake certification, no backend theater.

**Exposure Target:** `preview-only`
**Risk If Wrong:** The site could make the concept look more solved than it really is, or bury the real engineering/compliance risk under pretty founder theater.
**Rollback / Disable Path:** Revert the repo to the previous commit or disable GitHub Pages for the repo.
**Watch Signals:**
- Error: public HTML fetch returns non-200 or missing key markers
- Latency / performance: hero and SVG assets load quickly on the public page
- Product: user can open the page and understand the core wedge without explanation

**Checkpoint Cadence:**
- **Shape Checkpoint:** story, buyer assumption, and honesty line are frozen before visual build.
- **Kickoff Checkpoint:** hero copy, section structure, and roadmap blocks exist in the repo before polish.
- **Demo Checkpoint:** a locally served version shows the hero, scenario, schematic, and roadmap end-to-end.
- **Release + Review Checkpoint:** GitHub Pages is live and the public route proves the same markers as local.

---

### Task 1: Create the project skeleton
**Objective:** Create the final site folder structure and documentation paths.

**Files:**
- Create: `index.html`
- Create: `assets/style.css`
- Create: `assets/app.js`
- Create: `assets/lifeguard-scene.svg`
- Create: `assets/deployment-sequence.svg`
- Create: `assets/prototype-architecture.svg`
- Create: `.nojekyll`
- Create: `README.md`
- Create: `docs/superpowers/specs/2026-06-28-rescuearc-concept-design.md`
- Create: `docs/plans/2026-06-28-rescuearc-site-implementation-plan.md`
- Create: `docs/research/2026-06-28-rescuearc-prior-art-and-roadmap.md`

### Task 2: Write the hero and core story sections
**Objective:** Build the public-facing invention narrative in `index.html`.

**Files:**
- Modify: `index.html`

### Task 3: Build the custom SVG illustration set
**Objective:** Create the lifeguard scenario, deployment sequence, and prototype cutaway assets.

**Files:**
- Modify: `assets/lifeguard-scene.svg`
- Modify: `assets/deployment-sequence.svg`
- Modify: `assets/prototype-architecture.svg`

### Task 4: Implement the visual system
**Objective:** Make the site feel premium and phone-usable.

**Files:**
- Modify: `assets/style.css`

### Task 5: Add the tiny interaction layer
**Objective:** Toggle hero scene/deployment states.

**Files:**
- Modify: `assets/app.js`

### Task 6: Add the roadmap and research note
**Objective:** Preserve the commercialization logic outside the landing page too.

**Files:**
- Modify: `docs/research/2026-06-28-rescuearc-prior-art-and-roadmap.md`
- Modify: `README.md`

### Task 7: Verify local preview
**Objective:** Prove the site serves correctly before publish.

**Files:**
- No source changes unless fixes are needed.

**Verification commands:**
```bash
python3 -m http.server 8046
curl -I http://127.0.0.1:8046/
curl -s http://127.0.0.1:8046/ | grep -E 'Throw farther|Lifeguard scenario|Full roadmap'
```

### Task 8: Create repo and push
**Objective:** Publish the artifact into a dedicated GitHub repo.

**Files:**
- Create: `.gitignore`
- Modify: local git metadata

### Task 9: Enable GitHub Pages and verify live route
**Objective:** Make the site publicly reachable and prove the public page contains the expected markers.

**Verification commands:**
```bash
gh api -X POST repos/crootrabot-cpu/rescuearc-site/pages -f source[branch]=main -f source[path]=/
python3 - <<'PY'
import sys, time, urllib.request
url = 'https://crootrabot-cpu.github.io/rescuearc-site/'
needles = ['Throw farther. Reach faster. Float on impact.', 'The chair-side rack changes the whole pitch.', 'Website first for story. Proof next for reality.']
for attempt in range(1, 16):
    try:
        html = urllib.request.urlopen(url, timeout=20).read().decode('utf-8', 'ignore')
        ok = all(n in html for n in needles)
        print({'attempt': attempt, 'ok': ok, 'length': len(html)})
        if ok:
            sys.exit(0)
    except Exception as exc:
        print({'attempt': attempt, 'error': str(exc)})
    time.sleep(6)
sys.exit(1)
PY
```

## Critical Journey Verification
1. Open the public page.
2. Confirm the hero line is present.
3. Confirm the lifeguard scenario section is present.
4. Confirm the prototype schematic section is present.
5. Confirm the roadmap section is present.
6. Confirm the honesty/status footer is present.

## Release Readiness / Ship Note
- Exposure target remains `preview-only`.
- Risk if wrong remains concept-overstatement.
- Rollback is repo revert or Pages disable.
- Fragility is mainly product truth, not website runtime.
