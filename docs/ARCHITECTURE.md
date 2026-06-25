# Architecture

## Folder Structure
```
src/
  app/                          # Next.js App Router pages
    layout.tsx                  # Root layout: Navbar + Footer + fonts
    page.tsx                    # Home page (renders HomePage component)
    globals.css                 # Tailwind + CSS variables + utilities
    about/page.tsx              # /about
    contact/page.tsx            # /contact
    services/
      page.tsx                  # /services (catalog)
      [slug]/page.tsx           # /services/:slug (detail)
    api/contact/route.ts        # POST handler for form submissions
  components/
    ui/shader-animation.tsx     # Three.js WebGL shader (desktop only)
    breadcrumbs.tsx             # Breadcrumb nav for sub-pages
    contact-form.tsx            # Cascading category→service booking form
    faq-item.tsx                # Accordion item (used by FAQ and Terms)
    filter-modal.tsx            # Category filter (deprecated? check usage)
    footer.tsx                  # 4-column footer
    home-page.tsx               # Home page composition
    navbar.tsx                  # Fixed glassmorphism navbar
    scroll-reveal.tsx           # IntersectionObserver fade-in wrapper
    service-modal.tsx           # Service detail modal (legacy)
    welcome-popup.tsx           # Session-based welcome modal
  sections/                     # Full-page sections (used by pages)
    hero.tsx                    # Hero with shader + laptop mockup
    scroll-story.tsx            # 10-scene scroll-driven storytelling
    stats.tsx                   # Trust highlights (4 cards, no numbers)
    testimonials.tsx            # Infinite marquee testimonials
    services.tsx                # Services grid (home page)
    pricing.tsx                 # Pricing tables
    faq.tsx                     # FAQ accordion
    contact.tsx                 # Contact form wrapper
    terms.tsx                   # Terms accordion
  data/                         # Static content data
    content.ts                  # Hero, scenes, testimonials, FAQ, CTA
    services.ts                 # Service definitions (9 categories, 50+ items)
    menu.ts                     # Pricing data
    navigation.ts               # Nav items, CTA, logo
    site-config.ts              # Brand info, contact, social
    terms.ts                    # Terms sections
    scene-palettes.ts           # Color gradient interpolation
  hooks/
    useReducedMotion.ts         # prefers-reduced-motion detection
```

## Data Flow
```
docs/*.md  ──(manual)──>  src/data/*.ts  ──(import)──>  components/sections
```

Content is authored in Markdown under `docs/`, then manually synced to TypeScript data files under `src/data/`. No CMS — static data for simplicity and Lighthouse score.

## Routing
```
/               →  HomePage (Hero + ScrollStory + Featured + Stats + Testimonials + CTA)
/services       →  ServicesPage (grid + filter + search)
/services/:slug →  ServiceDetailPage (breadcrumbs + detail + related)
/about          →  AboutPage (mission + story + values + CTA)
/contact        →  ContactPage (socials + FAQ + booking form)
```

## Key Components
- **Navbar:** Fixed top, glassmorphism on scroll (>20px), dropdown on hover, mobile drawer, active via `usePathname()`
- **Footer:** 4-column responsive grid, gradient divider, social icons
- **ContactForm:** Two cascading selects (Category → Service), reads `?service=` from URL, wrapped in `<Suspense>`
- **WelcomePopup:** Session-stored, shows lag disclaimer + contact links + OK button
- **Breadcrumbs:** Auto-renders on sub-pages, last item bold, separator `/`
