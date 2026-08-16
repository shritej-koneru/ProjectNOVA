---
name: Project NOVA
description: Transform. Optimize. Advance. — a premium, cinematic dark console for a student-focused laptop transformation service.
colors:
  void-charcoal: "#292929"
  ash-white: "#dbdbdb"
  graphite-well: "#1f1f1f"
  pitch-gray: "#242424"
  carbon-fiber: "#333333"
  smoke-steel: "#737373"
  slate-smoke: "#616161"
  silver-echo: "#adadad"
  snow-white: "#f2f2f2"
  storm-mist: "#b8b8b8"
  fogline: "#404040"
  alarm-red: "#ef4343"
typography:
  display:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 8vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
  "3xl": "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "40px"
  section: "80px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.smoke-steel}"
    textColor: "{colors.snow-white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "20px 32px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.smoke-steel}"
    textColor: "{colors.snow-white}"
    rounded: "{rounded.full}"
  button-ghost:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.storm-mist}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  button-hero:
    backgroundColor: "{colors.silver-echo}"
    textColor: "{colors.silver-echo}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  input-field:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.ash-white}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  nav-link:
    textColor: "{colors.storm-mist}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.silver-echo}"
    textColor: "{colors.silver-echo}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  service-card:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.ash-white}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  service-modal:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.ash-white}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.storm-mist}"
    rounded: "{rounded.xl}"
    padding: "12px 20px"
  chip-active:
    backgroundColor: "{colors.silver-echo}"
    textColor: "{colors.silver-echo}"
    rounded: "{rounded.xl}"
    padding: "12px 20px"
  chip-pill:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.storm-mist}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  palette-toggle:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.storm-mist}"
    rounded: "{rounded.lg}"
    height: "36px"
    width: "36px"
---

# Design System: Project NOVA

## Overview

**Creative North Star: "The Nova Forge"**

Project NOVA is a premium, cinematic dark console — a near-black glass workbench where a student's laptop gets reforged into something better. The aesthetic is technical and trustworthy but never cold: layered glass slabs, a single ambient accent, glow light doing the depth work that heavy shadows normally do, and a scroll-driven story that recolorizes the entire interface as you read it. It borrows the restrained, content-first density of premium hardware launch pages (Apple, Linear, Stripe, Arc) and runs it through a student-friendly lens that honors the "technical, trustworthy, modern, premium" brand personality.

Everything sits on a dark tonal ladder built from one base HSL color: deep background (16%), darker surface wells (12%), a mid-tone primary (45%) for actions, a brighter accent (68%) for highlights, and soft text roles at 86% and 72%. Because every color is an HSL CSS custom property derived from that single base at runtime, the site can drift hue as the scroll story progresses or when the owner switches among candidate palettes (Purple Navy, Warm Taupe, Dusty Rose). The current canonical base is achromatic gray; the palette machinery is the system, not the gray.

Motion is cinematic and purposeful — eased reveals (cubic-bezier(0.22, 1, 0.36, 1)), a pinned 10-scene scroll narrative, cursor-tracked glow borders, shimmer sweeps, dithering dots — but always tamed by prefers-reduced-motion, and touch targets stay at least 44×44px because students browse on laptops and phones alike. Confirmed visual rejections: no hard black drop shadows on interactive surfaces, no large accent-colored fills, no letter-spaced headlines.

**Key Characteristics:**
- Palette-driven color: all colors are HSL CSS variables written at runtime from a single base color (currently grayscale).
- Glassmorphism as material: backdrop-blur surfaces, translucent hairlines, layered tonal slabs.
- Glow-as-structure: accent box-shadows, text-shadows, and blurred radial glows replace heavy drop shadows.
- Cinematic scroll story: 10 pinned scenes recolorize the site and crossfade titles as you scroll.
- Inter Tight display / Inter body: bold tight headings, wide-tracked uppercase labels.
- 44px touch targets and full reduced-motion support.

## Colors

A near-black, achromatic gray world lit by a single ambient accent; the whole palette is generated at runtime as HSL CSS custom properties from one base color, so hue drifts with scroll while the lightness ladder stays fixed.

### Primary
- **Smoke Steel** (#737373): The workhorse action color at 45% lightness. Fills pill CTAs ("Get Started", "Explore Our Services"), progress bars, and gradient partners (primary→secondary→accent). On hover it fades to 90% opacity. Deliberately mid-tone — confident but neutral.

### Secondary
- **Slate Smoke** (#616161): The darker gradient partner at 38% lightness. Completes the primary→secondary→accent progress bar, tints scene panels at 10–15% alpha, and shares dual-boot cards with primary.

### Neutral
- **Void Charcoal** (#292929): Page background (16%). Never lighter than any surface; the anchor of the ladder.
- **Graphite Well** (#1f1f1f): Surface (12%) — the darkest token; cards, glass slabs, drawers, and inputs sit on it.
- **Pitch Gray** (#242424): Card / popover (14%), between background and surface.
- **Carbon Fiber** (#333333): Muted fills (20%).
- **Fogline** (#404040): Borders and inputs (25%); the standard 1px hairline.
- **Ash White** (#dbdbdb): Foreground text (86%).
- **Storm Mist** (#b8b8b8): Muted foreground (72%) — secondary text, placeholders.
- **Snow White** (#f2f2f2): Primary foreground (95%) — text on primary buttons.
- **Alarm Red** (#ef4343): Destructive (0 84% 60%), reserved for destructive actions.

### Dynamic Palette Behavior
Every color is consumed as `hsl(var(--X))`. `derivePalette(base)` in `scene-palettes.ts` computes the 7 runtime variables — `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--surface`, `--muted-foreground` — from a single base HSL color, and `applyPalette()` writes them to the document root. Saturation tapers as lightness moves away from 50%. The canonical resting base is grayscale; the owner can switch to candidate palettes (Purple Navy, Warm Taupe, Dusty Rose). New screens must reference only the variables.

### Named Rules
**The Live Palette Rule.** Every color in a new screen must come from the 7 runtime CSS variables (`hsl(var(--background))`, `hsl(var(--accent))`, …). A hardcoded hex on a screen will not recolorize with the scroll story and will silently break the palette system.

**The Value Ladder Rule.** The derivePalette lightness values are fixed — background 16%, surface 12%, primary 45%, secondary 38%, accent 68%, foreground 86%, muted foreground 72%. Respect the ladder; don't invent new lightnesses outside the derivePalette formula.

**The Accent Restraint Rule.** The accent (the brightest non-white role) is reserved for highlights: active nav, borders, glows, kicker text, small dots. It must never be a large filled area — its rarity is the point.

## Typography

**Display Font:** Inter Tight (fallback system-ui, sans-serif)
**Body Font:** Inter (fallback system-ui, sans-serif)
**Mono:** system mono stack, reserved for the terminal scenes in the scroll story (developer setup), never for UI copy.

**Character:** Inter Tight — a condensed, technical grotesque — carries the confident engineering voice; Inter adds readable warmth for long body copy. The pairing reads "precision engineering, student-friendly", which is exactly the brand: technical, trustworthy, modern, premium.

### Hierarchy
- **Display** (700, clamp(2.8rem, 8vw, 4.75rem), 0.9, tracking -0.025em): The hero lines ("Transform Your Laptop." / "Unlock Its Potential.") only. Bold, tight, no uppercase.
- **Headline** (700, clamp(1.875rem, 4vw, 3.75rem), 1.25): Scroll-story scene titles.
- **Title** (700, 1.5rem, 1.25): Section headings ("Our Services"), card titles, modal names.
- **Body** (400, 1rem, 1.625): paragraphs and descriptions; the hero lead steps up to text-lg (1.125rem) with leading-8 (2rem).
- **Label** (600, 0.875rem, letter-spacing 0.05em, uppercase): kickers, footer column headers, form labels. The hero kicker is wider at 0.35em.

### Named Rules
**The Tight-Headline Rule.** Display and headline text stays 700-weight with tight line-height (0.9–1.25) and tight tracking. Never letter-space or reduce the weight of headings; that voice belongs to Inter Tight.

**The One-Kicker Rule.** Uppercase, wide-tracked labels are the only letter-spaced text on the site, and they're reserved for small labels (kickers, footer headers, form labels). Body and headings never letter-space.

## Layout

The site runs a max-width container of 1280px (max-w-7xl) with responsive gutters of 16px (px-4) → 24px (sm:px-6) → 32px (lg:px-8), and 40px on the hero (lg:px-10). The fixed navbar is 64px tall (h-16); main content offsets by pt-16.

Sections are generously spaced (py-20, 80px), mobile-first single column, multi-column from sm/md/lg: the hero grid splits into 0.95fr/1.05fr on lg; services cards go 1 → 2 (sm) → 3 (lg); the footer 1 → 2 (sm) → 4 (md) → 5 (lg). The scroll story is the structural centerpiece: a 900svh pinned container with a sticky viewport and an lg grid of 0.9fr/1.1fr.

Breakpoints are mobile-first Tailwind: sm 640px, md 768px, lg 1024px, xl 1280px. Interactive targets keep a 44×44px minimum on touch (WCAG 2.5.5) with touch-action: manipulation everywhere. Density is airy and content-focused; rhythm stacks on a 12/16/24/32px gap ladder.

## Elevation & Depth

Depth is a hybrid that leans tonal: flat dark surfaces layered background → surface → glass, plus accent-colored glow. There are essentially no hard drop shadows on interactive elements — black-based shadows appear only behind overlays and floating menus.

### Shadow Vocabulary
- **Hairline separator** (`0 1px 0 rgba(255,255,255,0.06)`): the scrolled navbar's bottom edge.
- **CTA glow** (`0 0 40px hsl(var(--accent)/0.18)`): hero primary CTA; the accent glow is the signature device.
- **Primary lift** (`shadow-lg shadow-primary/25`, hover `shadow-xl shadow-primary/30`): solid pill CTAs.
- **Card hover glow** (`0 8px 40px hsl(var(--accent)/0.12)`): service cards on hover.
- **Ambient window glow** (`0 40px 140px hsl(var(--primary)/0.28)`, story `0 36px 140px hsl(var(--primary)/0.24)`): the hero and story mock windows.
- **Modal halo** (`0 0 60px hsl(var(--accent)/0.12)`): the service modal.
- **Text glow** (`0 0 10px/20px/30px` of primary at 0.5/0.3/0.2 or accent at 0.45/0.25/0.14): reserved for accent headline moments.

### Named Rules
**The Glow-As-Structure Rule.** Interactive depth is conveyed with accent-colored glow shadows and backdrop blur — never hard black drop shadows on buttons or cards. Black/opacity shadows are only for overlays and floating menus.

**The Flat-By-Default Rule.** Surfaces rest flat (bg-surface/30 or lower, hairline borders). Glow and blur appear only as a response to state — hover, scroll, or focus.

## Shapes

The form language is soft glass slabs: every interactive surface is a rounded rectangle with a 1px translucent hairline, and radius grows outward in a strict ladder. Buttons and small chips are fully round pills (9999px); inputs and nav links sit at 8px (rounded-lg); inner panels at 12px (rounded-xl); cards at 16px (rounded-2xl); scene cards at 16–24px; and the signature mock windows land at 24px → 32px (rounded-[1.5rem] → rounded-[2rem]) with inner windows at 19.2px (rounded-[1.2rem]).

Borders are 1px hairlines: border-surface/30 by default, border-accent/20–40 when highlighted, border-white/10 on inner windows. The recurring silhouette is the browser-window mock: a glass slab with three status dots (accent/secondary/primary), a caption bar, and a rounded-b-3xl gradient stand.

### Named Rules
**The Layered Radius Rule.** Radius grows from the inside out — inputs (8px) < inner panels (12px) < cards (16px) < mock windows (24–32px). Never invert the order; an input must never be rounder than the card that contains it.

**The Pills-Are-CTA Rule.** Fully-round pills (9999px) belong to call-to-action buttons and small floating chips only. Ladder radii belong to inputs, links, and cards.

## Components

### Buttons
- **Shape:** pill (9999px); padding from px-5 py-2.5 (20/10px) in the nav to px-8 py-4 (32/16px) in the story CTA; label type (600).
- **Primary:** background primary, text snow white, glow `shadow-lg shadow-primary/25`; hover background primary at 90% opacity plus `shadow-xl shadow-primary/30`; focus-visible ring-2 ring-accent.
- **Ghost / Secondary:** background surface/50, border white/10, text storm-mist; hover border-accent/30 and text foreground.
- **Hero glass CTA:** border-accent/40, background accent/15, text accent, backdrop blur, glow `0 0 40px accent/18`; on hover a shimmer band (white/20, blur-lg) sweeps across.

### Chips
- **Filter (services):** active = border-accent/60, background accent/15, text accent, plus `0 0 20px accent/15` glow; inactive = border-surface/30, background surface/30, text storm-mist, hover border-accent/30. Count badge is a rounded-full pill (accent/20 when active).
- **Floating story chips:** rounded-full border-accent/40 (or /25), background accent/15 (or /8), text accent, backdrop blur, shadow-2xl.
- **Palette dots:** 16px (h-4 w-4) rounded-full with border-white/10.

### Cards / Containers
- **Corner Style:** rounded-2xl (16px).
- **Background:** surface/30 over the background (a glass slab); service card hover lifts to surface/60.
- **Border:** border-surface/30; hover border-accent/40.
- **Glow Strategy:** service cards add a cursor-tracked conic border (GlowingEffect: border-width 4, spread 18, proximity 64), a hover glow `0 8px 40px accent/12`, a shimmer sweep, and two ping dots.
- **Internal Padding:** p-6 (24px) service cards; p-8 (32px) contact form; p-3/4 (12/16px) mock windows.

### Inputs / Fields
- **Style:** background surface/50, border-surface/30, rounded-lg (8px), padding 16/12px (px-4 py-3), text foreground, placeholder storm-mist.
- **Focus:** no outline; focus-visible ring-2 ring-accent/50.
- **Disabled:** background surface/20, border-surface/10, text storm-mist/40, cursor-not-allowed (dependent service select).
- **Submit:** the contact form's submit is accent-tinted — background accent/20, text accent, border-accent/30, rounded-lg; hover background accent/30.

### Navigation
- **Style:** fixed glass header, 64px; at rest background surface/40 with backdrop-blur-md; scrolled background surface/70 with backdrop-blur-xl plus the hairline separator.
- **Links:** padding 12/8px (px-3 py-2), rounded-lg (8px), text-sm; rest storm-mist, hover text-accent with accent/5 background, active accent/12 background with accent text.
- **Dropdown (Services):** rounded-xl (12px), border-surface/20, background surface/90, backdrop-blur-xl, shadow-2xl, width 192px (w-48).
- **Mobile:** hamburger (44×44px) → full-height drawer (max-w-xs, surface/95, backdrop-blur-md, border-l surface/20) over a black/60 backdrop-blur-sm overlay; the CTA pill fills the width.

### Signature: The Browser-Window Mock
The hero and each scroll-story scene present a laptop-style glass window: an outer slab rounded-[1.5rem→2rem] with border-accent/30, background surface/75, backdrop-blur-xl, and an ambient primary glow behind; an inner window rounded-[1.2rem→1.5rem] with border-white/10, background background/90–95, and shadow-inner; three status dots (accent/secondary/primary); a caption bar; a rounded-b-3xl gradient stand; and floating glass chips orbiting the story version. This silhouette is the site's single most recognizable object — reuse it for future product windows.

### Signature: The Scroll Story
A 10-scene pinned narrative (min-h-[900svh], sticky viewport) that recolorizes the entire site as you scroll via applyPalette, crossfades scene titles and mock screens, tracks progress with a 1px bar (origin-left gradient primary→secondary→accent), and exposes a 5-dot scene counter. All motion collapses to static states under prefers-reduced-motion.

## Do's and Don'ts

### Do:
- **Do** consume every color through the runtime CSS variables (`hsl(var(--accent))`, etc.) so palette switching and scroll recolorization keep working.
- **Do** keep the value ladder fixed: background 16%, surface 12%, primary 45%, secondary 38%, accent 68%, foreground 86%, muted foreground 72%.
- **Do** make every CTA a full pill with semibold label type and an accent or primary glow shadow.
- **Do** apply focus-visible rings — ring-2 ring-accent/50 on inputs, ring-2 ring-accent on buttons — and drop the default outline.
- **Do** keep interactive targets ≥44×44px and respect prefers-reduced-motion (disable palette crossfade, shader, floating and glow animation; keep the story readable statically).
- **Do** grow radius outward (8 → 12 → 16 → 24–32px) from inputs to mock windows.

### Don't:
- **Don't** hardcode hex values in new screens — the palette system will not recolorize them.
- **Don't** fill large areas with the accent; it is for text, borders, glows, and active states.
- **Don't** use hard black drop shadows on buttons or cards — glow shadows and hairline borders carry depth.
- **Don't** letter-space headlines or body; tracking belongs to uppercase kickers only.
- **Don't** introduce a new font family — Inter Tight (headings) + Inter (body); system mono only inside terminal scenes.
- **Don't** invert the radius ladder or give an input a larger radius than the card that contains it.
