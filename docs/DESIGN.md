# Design System

## Inspiration
- Apple Vision Pro / MacBook pages
- Linear (project management UI)
- Stripe (documentation)
- Arc Browser
- Awwwards-winning dark-theme sites

## Theme
Dark futuristic, premium startup aesthetic.

## Visual Style
- Glassmorphism (backdrop-blur, semi-transparent surfaces)
- Soft gradients (radial + linear overlays)
- Premium typography (Inter Tight + Inter)
- Large, intentional spacing
- Minimalistic, content-focused
- Glow system (box-shadow with accent color)

## Color System

Not hardcoded hex values — all colors are HSL CSS custom properties derived from the scroll story's current gradient position.

**Dynamic palette function** (`scene-palettes.ts`):
- `getGradientColor(t)` — interpolates along 10-stop blue→slate gradient
- `derivePalette(base)` — computes 7 CSS variables from a single HSL color
- `applyPalette(palette)` — writes to `document.documentElement` CSS custom properties

**Base state (before scroll):**
```
--background: 210 77% 16%
--foreground: 210 29% 86%
--primary: 210 96% 45%
--secondary: 210 77% 38%
--accent: 210 67% 68%
--surface: 210 77% 12%
--muted-foreground: 210 29% 72%
```

## Layout
- Max-width container: `max-w-7xl` with responsive padding (`px-4 sm:px-6 lg:px-8`)
- Mobile-first breakpoints: unprefixed (mobile), `sm:`, `md:`, `lg:`, `xl:`
- Single column on mobile, multi-column on larger screens
- Sticky navbar with glassmorphism on scroll

## Navigation
- **Desktop:** Horizontal with dropdown (Services → 8 sub-items)
- **Mobile:** Hamburger → full-height drawer with backdrop blur
- Active page detection via `usePathname()`
- CTA button: "Get Started" → `/contact`

## Footer
- 4-column grid: Brand + Social / Services / Company / Support
- Gradient divider
- Responsive: 1 col (mobile) → 2 col (sm) → 4 col (md) → 5 col (lg)

## Components
- **Breadcrumbs:** Rendered on all sub-pages, last item bold
- **ScrollReveal:** Fade-in on scroll via IntersectionObserver
- **WelcomePopup:** Session-stored welcome modal with lag disclaimer

## Touch Targets
- Minimum 44×44px on mobile (WCAG 2.5.5)
- `touch-action: manipulation` on all interactive elements
