---
target: Project NOVA homepage
total_score: 22
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 4
timestamp: 2026-08-16T12-35-17Z
slug: src-app-page-tsx
---
Method: dual-agent (A: ses_ff577afebffekzwVr9jtecmyUG · B: ses_ff5779d36ffe73UAx4WqB5p26y)

# Critique: Project NOVA Homepage

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Story progress bar, form loading state good; no scene counter in the 10-scene tunnel; palette shifts silently mid-scroll |
| 2 | Match System / Real World | 3 | Student-friendly copy, but "N.O.V.A." never expanded, no price signal, interior-design palette names |
| 3 | User Control and Freedom | 2 | Modals exit well, but forced welcome popup and a 900svh pinned story with no skip/jump affordance |
| 4 | Consistency and Standards | 2 | Three coexisting color systems; hero "Get Started" outlined vs navbar filled; footer "FAQ" links to /about |
| 5 | Error Prevention | 3 | Form well-constrained; free-text "Preferred Time" and the popup's performance doubt undermine it |
| 6 | Recognition Rather Than Recall | 3 | All actions labeled; hero hover-swap is a dead `<a href="#">` that jumps to page top |
| 7 | Flexibility and Efficiency | n/a | Single-purpose persuasion surface; no repeatable expert task to accelerate |
| 8 | Aesthetic and Minimalist Design | 2 | GlowingEffect on every card incl. Terms rows; identical section compositions; decoration competes with information |
| 9 | Error Recovery | 2 | Modals recover cleanly; conversion path dumps user onto formsubmit.co on failure |
| 10 | Help and Documentation | 2 | Real, high-value FAQ is off-homepage and not surfaced near booking; footer mislabels it |
| **Total** | | **22 / 36** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment:** Category-interchangeable shell around a genuinely product-specific spine. The 10-scene scroll story (slow laptop → bloatware → debloated → fresh Windows → Linux → dual-boot → dev env → Obsidian → game-ready → ultimate student setup) is authored for this product and maps 1:1 to PRODUCT.md; the bespoke mock screens are real design work. Everything around it is the standard premium-dark startup template: every section uses the same radial-blob + glass card + GlowingEffect composition. Specificity holes: no price identity despite a real ₹ menu, no student identity beyond one heading, brand acronym never expanded, "Virtualization" never surfaces, and four color systems coexist (navy-gold site-config, neutral gray :root, blue shader, palette stops).

**Deterministic scan:** CLI scan (regex engine over TSX): clean, 0 findings (verified the run had teeth via a controlled snippet). Browser pass (live-server + detect.js on :3000, fresh tab): 21 in-page findings — 3 `low-contrast` (REAL: navbar CTA 4.24:1, popup OK 4.24:1, white "N" tile 2.31:1), 6 `gpt-thin-border-wide-shadow` (advisory), 3 `clipped-overflow-container` (mostly false positives — decorative clipping), 1 `overused-font` (Inter, taste signal), 2 `skipped-heading` (REAL: h2→h4), 3 `nested-cards` (2 deliberate laptop-window metaphor, 1 genuine nesting creep). Page console: 0 errors, 0 warnings.

**Visual overlays:** detect.js injected successfully and overlay chips were confirmed in the DOM ("low contrast text", "nested cards", "hairline border with wide shadow", "positioned child clipped by overflow container"). The live server was stopped after capture. The detector also missed several things the source review caught (hero dead `animate-dither` class, gold-baked iconify SVGs, hardcoded blues in hero TextReveal, marquee on the testimonial strip).

## Overall Impression

The site is credible as "expensive web design" but not yet as "the place that makes my laptop fast." The scroll story is an emotional peak built for this exact business; the trust layer around it (popup, fake-feeling testimonials, no price, no reassurance at booking) is where the student conversion leaks. The single biggest opportunity: surface honest proof and price near the conversion moment, and stop the interface from arguing with itself across four color identities.

## What's Working

1. **The scroll story is genuinely product-authored** — ten scenes with bespoke animated mock screens (typing terminal, dual-boot panels, FPS bars, sync rings) encode "transform, don't just fix." It is the one thing a competitor could not reuse unchanged.
2. **Serious reduced-motion and a11y hygiene** — `prefers-reduced-motion` is threaded through hero, story, and testimonials with static fallbacks; modals have focus traps, Esc, and focus restore; the token/palette system is a real dynamic-theming architecture.
3. **Honest, risk-transparent copy** — the FAQ discloses backup liability, update-revert risk, and the 48-hour fix window in plain student language; the visual layer hasn't caught up to this voice yet.

## Priority Issues

- **[P1] The welcome popup front-loads doubt** (`welcome-popup.tsx:44-50`): a full-screen modal on first visit tells visitors the site "may feel slightly laggy" and asks them to tolerate it — the highest-attention moment is spent seeding doubt about the product, and the overlay has no `role="dialog"`, focus trap, Escape, or focus restore. *Fix:* delete it, or replace with a real value modal (student offer); demote the lag disclaimer to a dismissible banner after value is shown. *Command:* `/impeccable delight`
- **[P1] Hero headline fights itself** (`hero.tsx:41-88`, `cascade-text.tsx:118-125`): screen readers hear the hover copy ("Refresh Every Component…") while sighted users see the real headline (WCAG 1.3.1/4.1.2); the reveal is a dead `<a href="#">` that jumps to top; `whitespace-nowrap` clips the message at ≤~390px; the `animate-dither` dot references a class that doesn't exist. *Fix:* span not anchor, aria-name = rendered text, allow wrap on mobile. *Command:* `/impeccable harden` + `/impeccable adapt`
- **[P1] Contrast failures on the primary conversion controls** (detector-confirmed): navbar "Get Started" 4.24:1, popup OK 4.24:1, white "N" on the primary→accent gradient 2.31:1 — all under WCAG AA 4.5:1, and the 45% lightness primary reproduces the failure across every palette. *Fix:* darken primary (~40%), add a contrast guard in `derivePalette()`. *Command:* `/impeccable colorize`
- **[P1] Conversion is under-weighted and price/trust anchors are absent**: the only filled primary CTA is at the very bottom; the hero "Get Started" is outlined and reads secondary; no price anywhere despite a real ₹ menu; the booking form gives zero reassurance (no response-time promise, no free-quote line, no WhatsApp shortcut, ends with a captcha notice). *Fix:* filled hero CTA, a "from ₹…" anchor in the story/final CTA, trust microcopy under the button. *Command:* `/impeccable bolder`
- **[P2] Placeholder testimonials presented as proof** (`testimonials.tsx:33-51`): 5/5 dot-"stars" with no attribution, quotes explicitly illustrative per PRODUCT.md, and the infinite marquee visibly repeats the same quotes at the wrap seam — a skepticism grenade on a trust-critical page. *Fix:* replace with honest proof (before/after boot-time numbers, a recorded session) or drop ratings; surface 2-3 real FAQ answers beside the final CTA. *Command:* `/impeccable clarify`
- **[P2] Visual noise floor and a disorienting palette shift**: GlowingEffect decorates every card (~20 document-level pointermove/scroll listeners on the homepage alone); the scroll-story hue shift retints the semantic accent mid-page and the palette switcher lets users permanently tint the brand taupe; hardcoded gold iconify SVGs and hero blues ignore palette switching. *Fix:* differentiate section compositions, kill glow on secondary content, and decide the story palette's relationship to brand color. *Command:* `/impeccable quieter`

## Persona Red Flags

**Jordan (confused first-timer):** The popup greets them with a WebGL lag disclaimer they read literally as "this won't work on my laptop." Hovering the headline swaps the words and shows a link cursor; clicking jumps to the top. "Why Students Trust NOVA" appears before anyone has explained what NOVA is — the acronym is never expanded. Two plausible CTAs, no price to tell them if they can afford it, and a 10-dot progress row with no labels and no click behavior.

**Riley (deliberate stress-tester):** Scrolls the testimonial marquee 30 seconds and catches the same 5 placeholder quotes repeating — correctly concludes the reviews are fabricated. Clicks the hero headline link, gets a jump-to-top, logs a broken link. Cross-checks colors and finds four identities (site-config navy-gold, neutral gray :root, blue shader, palette stops) — none authoritative. Clicks footer "FAQ" → lands on /about; "Privacy" → Terms. Submits the contact form with garbage in the free-text "Preferred Time" → no inline validation; failure exits the site to formsubmit.co.

**Casey (distracted mobile user):** The 900svh pinned story is nine screens of scroll with per-frame state updates on a mid-range student phone. The scroll-indicator label appears on hover only, so on touch it's a mystery arrow. "Book My Setup" is reachable only after ~12 screens — no thumb-zone CTA. The palette switcher button is 36px, under the site's own 44px target.

## Minor Observations

- Featured services take the first 2 of 3 object-order categories; Developer, Linux, and Gaming — the story's emotional peaks — are absent from the homepage's own showcase.
- Three CTA labels for one action: "Get Started" (navbar), "Get Started" (hero), "Book My Setup" (final).
- Testimonial "stars" are round dots whose `aria-label` claims "5 out of 5 stars" the visuals don't show.
- Hero `<img>` without width/height — CLS risk in the LCP frame.
- The final CTA is a strong peak immediately diluted by a generic 4-column footer with 15+ links and a mislabeled FAQ link.
- The detector's `overused-font` flagged Inter, which DESIGN.md declares; a taste signal, not a defect.

## Questions to Consider

- What if the first 5 seconds showed the end state — the transformed, fast laptop — instead of a disclaimer popup over a slow shader?
- What if the story's palette shift followed the laptop's transformation (grey/cluttered → debloated → full color) instead of user-selectable interior-design palettes?
- If the testimonials are placeholders, what honest proof could replace them — a recorded live-tuning session, before/after boot-time numbers?
- Why does "Virtualization" sit in the brand name yet never appear in the product story?
