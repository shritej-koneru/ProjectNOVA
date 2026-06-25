# PROJECT N.O.V.A.

**Notebook Optimization, Virtualization & Advancement**

> Transform. Optimize. Advance.

A premium student-focused laptop transformation service website. Turn slow, cluttered machines into powerful, personalized workstations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (customized) |
| Animation | Framer Motion 12.40 |
| 3D | Three.js (hero shader, desktop only) |
| Icons | Iconify (Phosphor icons) |
| Fonts | Inter + Inter Tight (`next/font/google`) |

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, 10-scene Scroll Story, Featured Services, Stats, Testimonials, CTA |
| `/services` | Full service catalog with category filter + search |
| `/services/:slug` | Service detail with pricing, related services, breadcrumbs |
| `/about` | Mission, story, values, final CTA |
| `/contact` | Social links, quick FAQ, cascading booking form |

## Getting Started

```bash
# install dependencies
npm install

# start development server
npm run dev

# build for production
npm run build

# start production server
npm start

# lint
npm run lint
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages + layout
    layout.tsx            # Root layout: Navbar, Footer, fonts
    globals.css           # Tailwind + CSS custom properties + utilities
    about/page.tsx        # /about
    contact/page.tsx      # /contact
    services/
      page.tsx            # /services (catalog with filter + search)
      [slug]/page.tsx     # /services/:slug (detail)
    api/contact/route.ts  # POST handler for form submissions
  components/             # Reusable React components
    navbar.tsx            # Fixed glassmorphism navbar with dropdown
    footer.tsx            # 4-column responsive footer
    contact-form.tsx      # Cascading Category → Service booking form
    breadcrumbs.tsx       # Sub-page breadcrumb navigation
    welcome-popup.tsx     # Session-stored welcome modal
    scroll-reveal.tsx     # IntersectionObserver fade-in wrapper
    faq-item.tsx          # Accordion item component
    ui/shader-animation.tsx  # Three.js WebGL shader (desktop only)
  sections/               # Full-page sections composed into pages
    hero.tsx              # Hero with shader + laptop mockup
    scroll-story.tsx      # 10-scene scroll-driven storytelling
    services.tsx          # Featured services grid (home)
    stats.tsx             # Trust highlights (4 qualitative cards)
    testimonials.tsx      # Infinite marquee testimonials
    pricing.tsx           # Pricing tables
    faq.tsx               # FAQ accordion
    contact.tsx           # Contact form wrapper
    terms.tsx             # Terms accordion
  data/                   # Static content (no CMS)
    content.ts            # Hero, scenes, testimonials, FAQ, CTA copy
    services.ts           # 9 categories, 50+ services
    menu.ts               # Pricing records
    navigation.ts         # Nav items, CTA button
    site-config.ts        # Brand info, social links
    terms.ts              # Terms of Service sections
    scene-palettes.ts     # 10-stop blue→slate gradient interpolation
  hooks/
    useReducedMotion.ts   # prefers-reduced-motion detection
docs/                     # Design and content documentation
```

## Key Features

### Scroll Story
10 scenes in a `min-h-[900svh]` container. Content stays `position: sticky` while progress-based scene transitions update the text, laptop screen, and color palette. Built entirely with Framer Motion's `useScroll` and `useTransform`.

### Dynamic Palette
A single 10-stop blue→slate gradient drives all CSS custom properties. As the user scrolls through the story, `getGradientColor(t)` interpolates the base color and `derivePalette()` computes 7 CSS variables (`--background`, `--foreground`, `--primary`, etc.).

### Cascading Booking Form
The contact form uses two dependent select elements. Choosing a category (Windows, Linux, Gaming, etc.) populates the service dropdown with relevant options. The `?service=` URL parameter pre-fills both from "Book" button clicks on service pages.

### Mobile Performance
- Three.js shader replaced with CSS gradient on screens <768px (avoids 400 kB THREE download)
- Springs and transforms replaced with CSS compositor-thread animations
- All `repeat: Infinity` animations disabled when `prefers-reduced-motion: reduce`
- `touch-action: manipulation` eliminates 300 ms tap delay

## Design System

**Palette:** Smart Blue `#0466c8` → Cool Steel `#979dac` (10 stops)

**Theme:** Dark futuristic, glassmorphism, soft gradients, large spacing

**Typography:** Inter Tight (headings) + Inter (body)

**Logo:** Placeholder gradient badge with "N" monogram

## Performance Targets

- Lighthouse mobile: 90+ Performance, 95+ Accessibility
- Total Blocking Time: <200 ms
- First Load JS: ~100–170 kB per page

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). JavaScript required for scroll story and animations. Falls back to static content with `prefers-reduced-motion: reduce`.
