# Performance Guide

## Targets
- Lighthouse mobile: 90+ Performance, 95+ Accessibility
- Total Blocking Time: <200ms on mid-range Android
- First Load JS: <180 kB

## Known Constraints
- Framer Motion adds ~45 kB to bundle (shared chunk)
- Three.js adds ~150 kB (loaded async, desktop only)
- 10-scene scroll story adds DOM complexity

## Mobile Optimizations Applied

### Three.js Shader
- **Code-split:** `dynamic()` checks `window.innerWidth < 768` — returns a CSS gradient div, never downloads THREE chunk
- **Out-of-view pause:** IntersectionObserver stops rAF when hero not visible
- **Low-power GPU:** `powerPreference: 'low-power'`, `antialias: false`
- **Pixel ratio capped:** `Math.min(window.devicePixelRatio, 1)`

### Scroll Story
- **No spring physics** — raw `scrollYProgress` used directly
- **Scene-boundary updates only** — `useMotionValueEvent` checks scene changed before `setActiveIndex`
- **No palette on mobile** — `reducedMotion &&` check skips `applyPalette()`
- **Static laptop** — removed `useTransform` for y/rotate/scale; replaced with CSS animation
- **All infinite animations disabled** — every `repeat: Infinity` has a static fallback

### CSS & Layout
- `touch-action: manipulation` on buttons/links/inputs — eliminates 300ms tap delay
- `will-change: transform` on sticky container and laptop
- All animations on `transform` and `opacity` only (GPU compositor properties)
- `content-visibility: auto` utility available for offscreen sections
- Reduced motion media query respected

### Bundle
- Tree-shaken via `import { motion, ... }` (not `import *`)
- Dynamic imports for Three.js and heavy components
- Iconify SVGs loaded on-demand (no icon library bundle)
- `next/font` with `display: swap` and self-hosting

## Profiling Checklist
- [ ] Check `useScroll` event listener count in DevTools Performance tab
- [ ] Verify THREE chunk is NOT loaded on mobile (Network tab)
- [ ] Confirm `prefers-reduced-motion: reduce` disables all infinite animations
- [ ] Test on real mid-range Android (not just DevTools emulation)
- [ ] Check for layout thrashing in Performance tab (purple bars)
- [ ] Verify backdrop-filter doesn't create containing blocks for fixed children
