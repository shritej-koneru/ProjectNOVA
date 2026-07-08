# UX Architecture for Project NOVA

## Information Architecture

### Site Map
- Home (Hero)
- Scroll Story (Scenes 1-10)
- Services
- Pricing (Packages)
- Testimonials
- FAQ
- Terms
- Contact

### Content Organization
- **Hero**: Headline, subheadline, primary CTA (Get Started), secondary CTA (Explore Services)
- **Scroll Story**: 10 sections, each with title and description, animated via GSAP/ScrollTrigger
  - Scene 1: Your Laptop Deserves Better
  - Scene 2: Too Much Junk
  - Scene 3: Debloated. Optimized. Ready.
  - Scene 4: Fresh Windows Setup
  - Scene 5: Explore Linux
  - Scene 6: Best Of Both Worlds
  - Scene 7: Ready To Build
  - Scene 8: Knowledge Everywhere
  - Scene 9: Game Ready
  - Scene 10: Your Ultimate Student Setup
- **Services**: Dynamically generated service cards categorized from `/docs/SERVICES.md`:
  - Windows (Installation, Reinstallation, License Setup, Office, Drivers, Updates, Cleanup)
  - Optimization (Debloat, Startup, Browser, Performance Tuning)
  - Customization (Wallpapers, Themes, Icons, Cursor, Rainmeter, Widgets, Taskbar)
  - Productivity (Obsidian, Sync, Study Pack, Cloud Drive, Multi-Device Sync)
  - Developer (VS Code, Git, GitHub, Python, Java, C/C++, Android Studio, Ollama)
  - Linux (Ubuntu, Mint, Fedora, Manjaro, Dual Boot, Customization)
  - Gaming (Steam, Epic Games, Discord, Optimization, Drivers, Game Installation)
  - Troubleshooting (Boot Issues, Blue Screen, Drivers, Storage, Software Errors, General)
  - Custom Services (Any technical request not listed)
- **Pricing**: Organized by tiers and bundles from `/docs/MENU_LIST.md`:
  - Quick Services
  - Cleanup & Debloating
  - Performance Boost
  - Desktop Customization
  - Windows & Software
  - Productivity
  - Developer
  - Linux
  - Gaming
  - Troubleshooting
  - Bundles (Student Starter, Coding Starter, Linux Explorer, New Laptop Package, Complete Laptop Transformation)
  - Custom Services (Small/Medium/Large Task, Special Projects)
- **Testimonials**: Quotes from students sourced from `/docs/CONTENT.md`
- **FAQ**: Accordion of common questions from `/docs/CONTENT.md`
- **Terms**: Collapsible sections for legal terms from `/docs/TERMS.md`
- **Contact**: Premium form with fields and dropdowns as specified in BUILD_PROMPT.md:
  - Fields: Name, Phone Number, Email, College Year, Branch, Requested Service, Requirement Description, Preferred Time
  - Dropdown options for Requested Service: Windows Setup, Linux Installation, Dual Boot, Gaming Setup, Developer Setup, Obsidian Sync, Performance Optimization, Custom Service

## Navigation Structure

### Desktop Navigation
- **Type**: Sticky glassmorphism navbar
- **Position**: Fixed top, full width
- **Components**:
  - **Logo** (left): "Project NOVA"
  - **Menu** (center): Horizontal list of links:
    - Home (links to hero section)
    - Services (links to services section)
    - Packages (links to pricing section)
    - Linux (links to Linux scene/section)
    - Gaming (links to gaming scene/section)
    - Developer (links to developer scene/section)
    - FAQ (links to FAQ section)
    - Terms (links to terms section)
    - Contact (links to contact section)
  - **CTA Button** (right): "Get Started" (prominent, links to contact section or scrolls to contact form)
- **Behavior**: 
  - On scroll, navbar remains visible with glassmorphism effect (background blur, transparent)
  - Active section highlighting based on scroll position
  - Smooth scroll animation for anchor links

### Mobile Navigation
- **Type**: Slide-out drawer (off-canvas menu) triggered by hamburger icon
- **Hamburger Icon**: Located in navbar (left or right, typically left)
- **Drawer Content**:
  - Logo: "Project NOVA" (top)
  - Menu items (vertical stack): Same as desktop menu
  - CTA Button: "Get Started" (prominent at bottom or after menu items)
  - Close icon (top corner)
- **Behavior**:
  - Drawer slides in from left/right (typically left) over content
  - Background may be dimmed or blurred
  - Menu items tappable, navigating to respective sections
  - CTA button triggers contact form scroll/open
  - Escaping drawer via tap outside, close icon, or back button

## User Journey

### New Visitor Flow
1. **Arrival**: User lands on homepage, immediately sees hero section with headline "Transform Your Laptop. Unlock Its Potential." and subheadline listing service categories.
2. **Primary CTA**: "Get Started" button encourages immediate conversion; secondary CTA "Explore Services" invites exploration.
3. **Scroll Engagement**: As user scrolls, they enter the scroll story – an cinematic experience showing laptop transformation from slow/cluttered to powerful workstation across 10 scenes.
4. **Scene Progression**: Each scene presents a problem/solution narrative with titles and descriptions, building curiosity and desire.
5. **Post-Story Exploration**: After completing the scroll story, user encounters:
   - **Services Section**: Detailed cards allowing exploration of specific service categories.
   - **Pricing Section**: Transparent pricing tiers and bundles to evaluate investment.
   - **Testimonials**: Social proof from fellow students.
   - **FAQ**: Answers to common concerns, reducing hesitation.
   - **Terms**: Transparent service agreements building trust.
6. **Conversion**: User completes contact form to initiate service inquiry.

### Returning Visitor Flow
- **Direct Access**: Use navigation menu to jump straight to Services, Pricing, or Contact.
- **Skipped Story**: May bypass scroll story if already familiar with offering.
- **Quick Conversion**: Primary CTA in navbar or hero enables fast contact initiation.

## Conversion Flow

### Primary Conversion Goal
- **Contact Form Submission**: Generate service inquiries for laptop transformation.

### Conversion Elements & Optimization
1. **Hero Section CTAs**:
   - **Primary** ("Get Started"): Direct visual contrast, positioned above fold, scrolls to contact form.
   - **Secondary** ("Explore Services"): Less prominent, scrolls to services section for deeper exploration.
2. **Scroll Story Integration**:
   - Subtle visual cues or micro-interactions suggesting "Learn more about this service" after relevant scenes (e.g., after Linux scene, highlight Linux services).
   - Avoid interrupting narrative but provide gentle pathways to conversion.
3. **Services Section**:
   - Each service card includes a clear action (e.g., "View Details", "Get This Service") leading to more info or contact.
   - Categorization helps users quickly find relevant offerings.
4. **Pricing Section**:
   - Each package/tier includes a prominent call-to-action (e.g., "Select Package", "Get Started") that scrolls to or highlights contact form.
   - Bundle presentations encourage higher-value conversions.
5. **Testimonials & FAQ**:
   - Testimonials build credibility; FAQ addresses objections, moving users closer to decision.
   - FAQ accordion allows users to seek specific information without leaving page.
6. **Terms Section**:
   - Transparent terms reduce perceived risk, increasing trust in providing contact information.
7. **Contact Form**:
   - Premium experience with clear field labels, logical grouping, and inline validation.
   - Dropdown for "Requested Service" aligns with service categories, helping users articulate needs.
   - Submit button with clear value proposition (e.g., "Book My Setup").

### Micro-Conversions (Engagement Metrics)
- Clicking on service category in navigation
- Expanding FAQ items
- Viewing service details
- Reviewing pricing bundles
- Watching scroll story completion
- Engaging with testimonial slider (if implemented)

## Mobile Navigation Details
- **Hamburger Icon**: 44x44pt minimum touch target, placed in navbar for thumb reach.
- **Drawer Width**: Approximately 75% of screen width or max 320px, leaving content visible underneath for context.
- **Animation**: Smooth slide-in (200-300ms) with subtle fade.
- **Menu Items**: 
  - Minimum height 48px for touch targets.
  - Clear visual indication of active section.
  - Dividers or spacing between groups (e.g., core sections vs. legal).
- **CTA in Drawer**: 
  - "Get Started" button spans full width of drawer, prominent color.
  - Positioned at bottom for easy thumb reach after browsing menu.
- **Interaction**:
  - Tap outside drawer or on overlay closes menu.
  - Back button (if in history) closes drawer.
  - Lock body scroll when drawer open to prevent background scrolling.

## Accessibility Considerations
- **Keyboard Navigation**:
  - Tab order follows logical sequence: logo → menu items → CTA → page content.
  - Menu accessible via Enter/Space keys.
  - Trap focus in mobile menu when open.
  - Close menu with Escape key.
- **ARIA Attributes**:
  - Hamburger button: `aria-label="Open menu"`, `aria-expanded` state.
  - Menu container: `role="navigation"` or `aria-label="Primary navigation"`.
  - Menu items: `role="menuitem"`.
- **Reduced Motion**:
  - Respect `prefers-reduced-motion` media query.
  - Scroll story animations may be reduced or disabled; provide static alternative.
  - Animate only if motion is preferred.
- **Color Contrast**:
  - Text and icons meet WCAG AA contrast ratios (minimum 4.5:1 for normal text).
  - Glassmorphism backgrounds evaluated for contrast against overlay.
- **Form Accessibility**:
  - Each form field has associated `<label>`.
  - Input errors announced via ARIA live regions.
  - Clear focus outlines for interactive elements.
- **Semantic HTML**:
  - Use appropriate sectioning elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Heading hierarchy follows logical order (H1 for site title or page title, H2 for sections, etc.).
- **Viewport**:
  - Ensure content is readable and usable at various screen sizes without horizontal scroll.

## Implementation Notes
- **Scroll Story as Primary Narrative**: The 10-scene scroll story is the central experience; navigation items provide alternative access paths but should not distract from the story flow.
- **Anchor Linking**: Ensure smooth scroll behavior for internal links; consider offset for fixed navbar height.
- **Performance**: Implement lazy loading for images below the fold; defer non-critical animations.
- **Mobile-First Approach**: Design navigation and interactions for touch screens first, then enhance for desktop.
- **Progressive Enhancement**: Core functionality (navigation, content access) works without JavaScript; animations and micro-interactions enhance experience.

---
*This UX architecture delivers a premium, student-focused journey that transforms a service website into an interactive story, guiding users from awareness to conversion through clear information architecture, intuitive navigation, and trust-building elements.*