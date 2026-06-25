# Frontend Architecture for Project NOVA

## 1. Component Hierarchy

### Atomic Design Structure
Following atomic design principles for scalable and maintainable component organization:

#### Atoms (Basic Building Blocks)
- `ui/button.tsx` - Primary, secondary, ghost button variants
- `ui/input.tsx` - Form inputs with labels, validation states
- `ui/textarea.tsx` - Form textareas with labels, validation states
- `ui/select.tsx` - Form select dropdowns
- `ui/logo.tsx` - Project NOVA logo with hover/active states
- `ui/link.tsx` - Styled internal/external links
- `ui/icon.tsx` - SVG icon component with size/color props

#### Molecules (Combinations of Atoms)
- `ui/form-field.tsx` - Label + input/textarea/select with validation
- `ui/form-row.tsx` - Grid layout for form fields (responsive)
- `ui/badge.tsx` - Status indicators (popular, new, featured)
- `ui/glass-card.tsx` - Glassmorphism card with hover effects
- `ui/nav-link.tsx` - Navigation link with active state
- `ui/page-section.tsx` - Section container with padding/margin

#### Organisms (Complex UI Components)
- `components/navbar.tsx` - Sticky glassmorphism navigation
- `components/service-card.tsx` - Service category card with hover
- `components/pricing-table.tsx` - Pricing accordion/toggle component
- `components/testimonial-card.tsx` - Animated testimonial card
- `components/faq-item.tsx` - FAQ accordion item
- `components/contact-form.tsx` - Premium contact form with validation
- `components/scroll-reveal.tsx` - Scroll-triggered reveal animation

#### Templates (Page-Level Layouts)
- `sections/hero.tsx` - Hero section with CTA buttons
- `sections/scene*.tsx` - Individual scroll story scenes (1-10)
- `sections/services.tsx` - Services grid section
- `sections/pricing.tsx` - Pricing plans section
- `sections/testimonials.tsx` - Testimonials carousel/grid
- `sections/faq.tsx` - FAQ accordion section
- `sections/terms.tsx` - Terms collapsible section
- `sections/contact.tsx` - Contact form section

#### Pages (Complete Pages)
- `app/page.tsx` - Main homepage (scroll story + sections)
- `app/layout.tsx` - Root layout with metadata providers

### Component Organization
```
src/
├── app/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # Reusable UI atoms/molecules
│   ├── navbar.tsx        # Navigation organism
│   ├── contact-form.tsx  # Contact form organism
│   ├── scroll-reveal.tsx # Animation helper
│   └── ...               # Other UI components
├── sections/
│   ├── hero.tsx          # Hero template
│   ├── scene1.tsx        # Scene 1 template
│   ├── ...               # Other scenes
│   ├── services.tsx      # Services template
│   ├── pricing.tsx       # Pricing template
│   ├── testimonials.tsx  # Testimonials template
│   ├── faq.tsx           # FAQ template
│   ├── terms.tsx         # Terms template
│   └── contact.tsx       # Contact template
├── data/                 # Data files (services, menu, content, etc.)
├── lib/                  # Utility functions (animations, helpers)
├── hooks/                # Custom React hooks
└── styles/               # CSS/Tailwind configuration
```

## 2. Project Structure

### Next.js 15 App Router Structure
- Uses Next.js 15 App Router for server components, streaming, and route groups
- All components are client components (`'use client'`) due to intensive animations
- Route groups not needed for single-page scroll story implementation

### File Organization Principles
1. **Separation of Concerns**: Data, components, styles, and logic separated
2. **Scalability**: Easy to add new scenes, services, or sections
3. **Maintainability**: Consistent naming and organization patterns
4. **Performance**: Lazy loading and code splitting where beneficial
5. **Developer Experience**: Clear paths for finding and modifying code

### Key Directories
- `src/app/` - Next.js pages and layout
- `src/components/` - Reusable UI components (atoms, molecules, organisms)
- `src/sections/` - Page sections/templates
- `src/data/` - JSON/TS data files for content
- `src/lib/` - Utility functions (animation helpers, formatters)
- `src/hooks/` - Custom React hooks (animation, form handling)
- `src/styles/` - CSS files and Tailwind configuration

### Data Flow
1. Static data from `src/data/*.ts` files
2. Passed as props to sections/components
3. Client-state managed with React hooks (useState, useEffect)
4. Form submissions handled client-side (with planned backend integration)

## 3. Performance Strategy

### Core Performance Goals
- Target 95+ Lighthouse score
- Optimize for First Contentful Paint (FCP) < 1.8s
- Optimize for Largest Contentful Paint (LCP) < 2.5s
- Minimize Cumulative Layout Shift (CLS) < 0.1
- Optimize for Total Blocking Time (TBT) < 150ms

### Optimization Techniques

#### Code Splitting & Lazy Loading
- **Route-based splitting**: Automatic with Next.js App Router
- **Component-level lazy loading**: `dynamic()` for heavy components
- **Image optimization**: Next.js Image component with priority/lazy loading
- **Font optimization**: Self-hosted fonts with `font-display: swap`

#### Bundle Optimization
- **Tree shaking**: ES modules and PurgeCSS for unused styles
- **Code minimization**: Built-in Next.js/Webpack optimizations
- **Dependency audit**: Regular review of package sizes
- **External libraries**: Only essential libraries (GSAP, Framer Motion, etc.)

#### Asset Optimization
- **Images**: Compressed WebP/AVIF formats, responsive sizes
- **Animations**: Hardware-accelerated transforms (translate, scale, opacity)
- **Fonts**: WOFF2 format, preload critical fonts
- **SVGs**: Inline for icons, optimized for performance

#### Rendering Optimization
- **Server Components**: Where possible (limited due to animation requirements)
- **Streaming**: Suspense boundaries for progressive loading
- **Selective hydration**: Prioritize above-the-fold content
- **Animation timing**: Respect `prefers-reduced-motion` media query

#### Specific Performance Implementations
1. **GSAP Optimization**:
   - Use `gsap.context()` for cleanup
   - Limit concurrent animations per viewport
   - Use `requestAnimationFrame` via GSAP's internal timing
   - Enable lazy evaluation for offscreen animations

2. **ScrollTrigger Optimization**:
   - Utilize `scrollerProxy()` for smooth scrolling
   - Batch DOM reads/writes
   - Use `markers: false` in production

3. **Framer Motion Optimization**:
   - Use `variants` for reusable animations
   - Leverage `useReducedMotion` hook
   - Animate only transform/opacity properties when possible

4. **Image Optimization**:
   - Next.js `next/image` with `priority` for hero/above-fold
   - `loading="lazy"` for below-fold images
   - `sizes` attribute for responsive serving
   - WebP/AVIF format conversion

5. **Font Optimization**:
   - Self-host Inter and Inter Tight via `@next/font`
   - `preload` for critical fonts
   - `font-display: swap` to prevent FOIT

6. **CSS Optimization**:
   - Tailwind JIT compilation
   - PurgeCSS for unused styles
   - CSS variables for theme colors
   - Minimize `@apply` in favor of utility classes

### Performance Monitoring
- Lighthouse CI in CI/CD pipeline
- Web Vitals tracking (FCP, LCP, CLS, FID, TBT)
- Bundle analysis with `next-bundle-analyzer`
- Regular performance budget reviews

## 4. Responsive Architecture

### Breakpoints Strategy
Following mobile-first approach with Tailwind breakpoints:
- `sm`: 640px (small phones, portrait tablets)
- `md`: 768px (tablets, small laptops)
- `lg`: 1024px (laptops, small desktops)
- `xl`: 1280px (desktops, large screens)
- `2xl`: 1400px (large desktops, ultra-wide)

### Layout Adaptations

#### Navigation System
- **Desktop** (`lg+`): Sticky horizontal navbar with glassmorphism
- **Tablet** (`md` to `lg`): Horizontal navbar with condensed spacing
- **Mobile** (`<md`): Slide-out drawer (off-canvas) hamburger menu
  - Hamburger icon (44x44pt minimum touch target)
  - Drawer width: 75% of screen or max 320px
  - Body scroll locked when drawer open
  - Escape key/backdrop tap to close

#### Content Sections
- **Hero Section**:
  - Desktop: Max-width container, centered content
  - Mobile: Full-width, increased vertical padding
  - Text size scaling: Headings decrease on smaller screens
  
- **Scroll Story Sections**:
  - Desktop: 100vh height per scene, pinning for extended scenes
  - Tablet: Reduced height (80vh) to accommodate touch targets
  - Mobile: Further reduced height (70vh), simplified parallax
  - All: Consistent vertical padding, touch-friendly interactions

- **Services Section**:
  - Desktop: 4-column grid (lg+), 2-column (md), 1-column (sm)
  - Card dimensions: Minimum height for consistent appearance
  - Touch targets: Minimum 48x48px for interactive elements

- **Pricing Section**:
  - Desktop: Accordion sections with expanded/collapsed states
  - Tablet: Toggle between accordion and card views
  - Mobile: Card view with clear pricing hierarchy

- **Testimonials Section**:
  - Desktop: Grid or carousel with navigation
  - Tablet: Slider with dots navigation
  - Mobile: Single-item carousel with swipe gestures

- **FAQ Section**:
  - Desktop: Multi-column accordion
  - Tablet: Single-column with expanded height
  - Mobile: Single-column with larger tap targets

- **Contact Section**:
  - Desktop: Two-column form grid (label/input pairs)
  - Tablet: Stacked form with appropriate spacing
  - Mobile: Full-width form fields with increased padding

### Responsive Implementation Patterns
1. **Grid Systems**: Tailwind's `grid-cols-{breakpoint}` utilities
2. **Flexbox**: Responsive flex direction changes (`flex-row` to `flex-col`)
3. **Spacing**: Responsive padding/margin (`px-{breakpoint}`, `py-{breakpoint}`)
4. **Typography**: Responsive text sizes (`text-{breakpoint}`, `leading-{breakpoint}`)
5. **Visibility**: Conditional rendering with `hidden {breakpoint}` utilities
6. **Touch Targets**: Minimum 48x48px interactive elements on touch devices
7. **Hover States**: Disable or modify hover effects on touch devices

### Performance Considerations for Responsiveness
- **Conditional Loading**: Load different assets based on screen size
- **Image Optimization**: Different sizes for different breakpoints
- **Animation Complexity**: Reduce animation layers on mobile devices
- **Touch Events**: Optimize touch event listeners (passive where possible)
- **Viewport Units**: Use `vh`, `vw` with max/min limitations where needed

## 5. Accessibility Architecture

### WCAG 2.1 AA Compliance Target
Project NOVA aims to meet WCAG 2.1 AA standards for accessibility.

### Core Accessibility Principles
1. **Perceivable**: Information and UI components presentable to all senses
2. **Operable**: UI components operable by all users
3. **Understandable**: Information and UI understandable
4. **Robust**: Content robust enough for varied user agents

### Specific Accessibility Implementations

#### Semantic HTML
- Proper heading hierarchy (H1-H6) following document outline
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA landmarks where semantic elements insufficient
- Lists for navigation, features, testimonials, etc.
- Button elements for actions (not divs with click handlers)

#### Keyboard Navigation
- Logical tab order following visual flow
- Visible focus indicators for all interactive elements
- Skip navigation link (visually hidden but available to screen readers)
- Enter/Space key activation for buttons and links
- Escape key to close modals/drawers/menus
- Arrow key navigation for carousels/grids where applicable
- Trap focus in modal dialogs and mobile menus

#### Screen Reader Support
- ARIA labels for icon buttons and ambiguous controls
- ARIA live regions for dynamic content (form validation messages)
- Proper form labeling with `<label>` elements
- ARIA-describedby for complex form fields with instructions
- Role attributes for custom widgets (if any)
- Language attributes (`lang="en"`) on HTML element

#### Color and Contrast
- Minimum 4.5:1 contrast ratio for normal text (AA)
- Minimum 3:1 contrast ratio for large text (AA)
- Minimum 3:1 contrast ratio for UI components and graphical objects
- Text over images: Ensure sufficient contrast or use text backgrounds
- Focus indicators: Minimum 3:1 contrast against adjacent colors
- Avoid color-only conveying of information (use icons/text as well)

#### Typography and Readability
- Base font size: 1rem (16px) minimum for body text
- Line height: Minimum 1.5 for paragraph text
- Letter spacing: Avoid excessive tracking that reduces readability
- Text scaling: Support up to 200% text size increase without loss of content/functionality
- Font choice: Inter and Inter Tight for excellent readability
- Avoid all caps for extended text (use small-caps or proper capitalization)

#### Motion and Animation
- **Reduced Motion Support**: 
  - Respect `prefers-reduced-motion: reduce` media query
  - Replace motion-based animations with cross-fades or instant changes
  - Disable parallax effects when reduced motion preferred
  - Maintain essential transitions but with zero duration
  - Use `useReducedMotionSafeGSAP` hook pattern
- **Animation Safety**:
  - No flashing/content that could trigger seizures (< 3Hz)
  - No auto-playing content > 5 seconds without pause mechanism
  - Animation duration respect user preferences where possible
  - Provide equivalent information for purely animational content

#### Form Accessibility
- Explicit labels for all form fields (`<label>` or `aria-label`)
- Required field indicators (visual and programmatic - `aria-required`)
- Error identification and suggestions (ARIA live regions)
- Logical tab order through form fields
- Clear instructions and examples where needed
- Input formatting assistance (placeholders, patterns, inputmode)
- Auto-complete attributes where appropriate (`autocomplete="name"` etc.)
- Fieldset and legend for grouping related fields
- Clear submit button indicating action ("Submit", "Send Message")

#### Touch and Pointer Input
- Minimum touch target size: 48x48dp (approximately 48x48px)
- Sufficient spacing between touch targets (minimum 8dp)
- Support for pointer events where beneficial
- No reliance on pointer-only events (hover, etc.)
- Consider long-press alternatives for complex gestures

#### Language and Readability
- Clear, simple language in instructions and error messages
- Avoid jargon where possible; explain technical terms
- Consistent navigation and interaction patterns
- Predictable UI behavior (similar components behave similarly)
- Clear headings and labels for screen reader navigation
- Skip links to bypass repetitive navigation

### Accessibility Testing Strategy
1. **Automated Testing**:
   - ESLint plugin for JSX accessibility (`eslint-plugin-jsx-a11y`)
   - axe-core integration in development/build process
   - Lighthouse accessibility audits in CI/CD
   - Color contrast checking in build process

2. **Manual Testing**:
   - Keyboard-only navigation testing
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Color blindness simulation testing
   - Zoom and text size testing (200%, 400%)
   - Touch device testing (various screen sizes)

3. **User Testing**:
   - Testing with users of diverse abilities
   - Feedback collection and iteration
   - Accessibility statement and feedback mechanism

### Accessibility Implementation Guidelines

#### Component-Level Guidelines
- **Buttons**: 
  - Native `<button>` element preferred
  - Clear accessible name (text content or aria-label)
  - Visible focus outline (minimum 3px width, contrasting color)
  - Disabled state with proper aria-disabled
  
- **Links**:
  - Distinguishable from non-link text (underline or distinct color)
  - Clear indication of external links (icon + screen reader text)
  - Same behavior as keyboard Enter and mouse click
  
- **Form Fields**:
  - Associated `<label>` element (for, id matching)
  - Clear error messages associated via aria-describedby
  - Required fields marked with `aria-required="true"` and visual indicator
  - Input types that invoke appropriate keyboards (email, tel, etc.)
  
- **Navigation**:
  - `<nav>` landmark with aria-label if multiple navs present
  - Skip link to main content (first focusable element)
  - Current page indication via `aria-current="page"`
  
- **Images**:
  - Decorative images: `aria-hidden="true"` or empty alt (`alt=""`)
  - Informative images: Descriptive alt text
  - Functional images (buttons): Alt text describes action
  
- **Custom Components**:
  - Proper ARIA roles, states, and properties
  - Keyboard operability matching visual interaction
  - Focus management for modal/dialog elements
  
#### Page-Level Guidelines
- **Document Structure**:
  - Single H1 per page (site title or page title)
  - Logical heading sequence (no skipping levels)
  - Landmark regions for navigation, main, complementary, footer
  
- **Language and Orientation**:
  - `lang` attribute on `<html>` element
  - Page title reflects content and purpose
  - Logical tab order following visual flow
  
- **Timing and Updates**:
  - No time limits unless essential (with ability to extend/disable)
  - Moving/auto-updating content controllable by user
  
- **Seizure and Physical Reactions**:
  - No content flashing more than 3 times per second
  - No content that could trigger physical reactions

### Accessibility in Animations and Interactions
- **Scroll-Based Animations**:
  - Provide static equivalent for users preferring reduced motion
  - Ensure content remains accessible and readable without animations
  - Priority: Information access over visual effects
  
- **Parallax Effects**:
  - Disable when `prefers-reduced-motion: reduce`
  - Ensure content readability without parallax layers
  - Maintain logical reading order
  
- **Entrance/Exit Animations**:
  - Respect reduced motion preferences
  - Maintain content accessibility during animation states
  - Avoid trapping focus in animating elements
  
- **Interactive Elements**:
  - Visible focus indicators during all interaction states
  - Clear indication of interactive vs. static elements
  - Predictable response to user actions

### Accessibility Documentation and Maintenance
- **Accessibility Statement**: Public page detailing compliance level and feedback mechanism
- **Testing Checklist**: Manual and automated tests for releases
- **Training**: Developer and designer accessibility awareness
- **Issue Tracking**: Accessibility bugs prioritized equally with other bugs
- **Continuous Improvement**: Regular audits and updates based on feedback and guidelines