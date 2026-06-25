# Animations & Performance

## Animation Engine
**Framer Motion 12.40** — chosen over GSAP for:
- Native React integration (no ref-based element selection)
- WAAPI-backed animations (compositor thread for transforms/opacity)
- Built-in `useScroll`, `useTransform`, `AnimatePresence`
- `whileInView` with pooled IntersectionObserver
- TypeScript support

## Hero Section
- **Shader animation** (Three.js WebGL) — fullscreen gradient with animated lines
  - Desktop only (<768px gets a static CSS radial-gradient)
  - Paused via IntersectionObserver when out of view
  - `powerPreference: 'low-power'`, `antialias: false`
- Fade-in stagger for badge, heading, description, CTAs
- Floating CSS animation for the laptop mockup (`animate-dither`)

## Scroll Story
- 10 scenes tracking progress through a `min-h-[900svh]` container
- Scene detection via `useScroll` + `useMotionValueEvent` — updates only on scene change (not every pixel)
- Scene transitions via `AnimatePresence mode="popLayout"`
- Laptop float: CSS `motion.div` `animate={{ y: [0, -10, 0] }}` (WAAPI, compositor thread)
- Progress bar: `useTransform(scrollYProgress, [0, 1], [0, 1])`
- Floating chips: animated in/out on scene change (hidden on mobile)

## Mobile Performance Optimizations
| Technique | Implementation |
|---|---|
| Three.js skipped on mobile | `window.innerWidth < 768` check in dynamic import factory |
| No spring physics | `useSpring` removed; raw `scrollYProgress` used directly |
| No palette updates on mobile | `reducedMotion` check skips `applyPalette` |
| All `repeat: Infinity` disabled | Static fallbacks when `prefers-reduced-motion: reduce` |
| Simpler scene transitions | Shorter duration, `opacity`-only, `mode='wait'` |
| Touch delay eliminated | `touch-action: manipulation` on all interactive elements |
| IntersectionObserver on shader | Pauses rAF when hero out of view |

## Reduced Motion
- `useReducedMotion` hook reads `prefers-reduced-motion: reduce`
- When active: disables all infinite animations, spring physics, palette shifts, parallax
- Scene screens render static elements instead of animated ones
- `html { scroll-behavior: smooth }` disabled via `@media (prefers-reduced-motion: reduce)`

## CSS Animations
- `.animate-float` — gentle 6s y-axis bob (globals.css)
- `.animate-dither` — pulse effect on hero CTA dot
- Scene screen progress bars — Framer Motion `animate={{ width }}` on mount
- All GPU-composited: only `transform` and `opacity` animated

## What to Avoid
- Scrolling-linked `useTransform` for decorative effects (was: laptopY, laptopRotate, glowScale — removed)
- GSAP — not used anywhere. Framer Motion only.
- Heavy rAF loops that don't check visibility
- CSS `backdrop-filter` on sticky parents (creates containing block for `fixed` children)
