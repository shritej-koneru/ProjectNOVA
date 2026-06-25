# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is Project NOVA (Notebook Optimization, Virtualization & Advancement) - a premium student-focused laptop transformation service website. The site tells an interactive scroll story showing a laptop transforming from slow/cluttered to a powerful workstation.

## Tech Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- GSAP & ScrollTrigger
- Framer Motion

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code (if configured)
npm run lint
```

### Testing
```bash
# Run tests (if configured)
npm test

# Run a single test file
npm test -- path/to/test-file.test.ts

# Run tests in watch mode
npm run test:watch
```

### Code Quality
```bash
# Format code (if Prettier configured)
npm run format

# Check for TypeScript errors
npm run type-check
```

## Project Structure (Based on BUILD_PROMPT.md)
- `/docs` - Contains all content files (PROJECT.md, BRAND.md, DESIGN.md, SERVICES.md, etc.)
- Components will be organized by feature/service
- Pages will follow Next.js app router structure
- Animations will use GSAP/ScrollTrigger for scroll storytelling
- UI components will use shadcn/ui customized for Project NOVA theme

## Key Development Areas
1. **Scroll Story Implementation** - Sections 1-10 from BUILD_PROMPT.md need GSAP/ScrollTrigger animations
2. **Service Cards** - Dynamically generated from `/docs/SERVICES.md`
3. **Pricing Tables** - Generated from `/docs/MENU_LIST.md`
4. **Testimonials** - From `/docs/CONTENT.md` with animated component
5. **FAQ** - From `/docs/CONTENT.md`
6. **Contact Form** - Premium experience with specific fields and dropdowns
7. **Terms Section** - Clean collapsible from `/docs/TERMS.md`

## Styling Guidelines
- Dark futuristic theme with Blue/Cyan/Purple glow system
- Glassmorphism effects
- Premium startup aesthetic (Apple Vision Pro, Linear, Arc Browser inspiration)
- Use Tailwind CSS with custom configurations
- Customize shadcn/ui components to match brand

## Performance Requirements
- Target 95+ Lighthouse score
- Optimize images, animations, fonts, bundle size
- Use lazy loading and dynamic imports
- Implement WCAG AA accessibility

## Important Notes
- Do NOT write code until after agent approvals (per BUILD_PROMPT.md)
- First complete all agent analyses: Brand Strategist, UX Architect, Motion Designer, Visual Designer, Frontend Architect, Conversion Specialist
- Merge findings and wait for approval before coding
- Customize integrated components (Background Gradient, Shader Animation, Container Scroll, Animated Testimonials, Hero Dithering CTA) to match Project NOVA