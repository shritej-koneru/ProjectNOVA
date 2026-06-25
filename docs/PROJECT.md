# Project Overview

## Name
PROJECT N.O.V.A. — Notebook Optimization, Virtualization & Advancement

## Tagline
Transform. Optimize. Advance.

## Mission
A premium student-focused laptop transformation service. We turn slow, cluttered machines into powerful, personalized workstations.

## Core Message
Your laptop should work for you, not against you.

## Target Audience
- Engineering & CSE students
- Gamers
- Developers
- Linux enthusiasts
- Productivity-focused students

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (customized)
- **Animation:** Framer Motion 12.40
- **3D:** Three.js (hero shader, desktop only)
- **Icons:** Iconify (Phosphor icons)

## Architecture
Multi-page site (not single-page):

| Route | Description |
|---|---|
| `/` | Home — Hero, Scroll Story, Featured Services, Stats, Testimonials, CTA |
| `/services` | Full service catalog with category filter + search |
| `/services/[slug]` | Service detail with pricing, related services |
| `/about` | Mission, story, values, CTA |
| `/contact` | Social links, FAQ, cascading booking form |

## Key Design Decisions
1. **Multi-page** over single-page — competitors (Tweakify, KRX, WinRevive) prove small sites need fewer pages
2. **Framer Motion** over GSAP — React-native, WAAPI-backed, simpler integration
3. **Blue→Slate gradient** palette instead of per-scene hue shifts — single identity, less cognitive load
4. **Cascading dropdowns** (Category → Service) in contact form — 50+ services need progressive disclosure
5. **No counting stats** — replaced with qualitative trust cards to avoid overclaiming

## Build Size
- First Load JS: ~100 kB shared + 50-70 kB per page
- All 7 routes compile: `/`, `/about`, `/contact`, `/services`, `/services/[slug]`, `/api/contact`, `/_not-found`

## Goals
1. **Primary:** Generate service inquiries through the contact form
2. **Secondary:** Build trust and showcase technical expertise
