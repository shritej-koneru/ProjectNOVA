# Graph Report - .  (2026-06-21)

## Corpus Check
- Corpus is ~2,719 words - fits in a single context window. You may not need a graph.

## Summary
- 45 nodes · 38 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.82)
- Token cost: 31,420 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Brand and Design System|Brand and Design System]]
- [[_COMMUNITY_Project Dependencies|Project Dependencies]]
- [[_COMMUNITY_Animations|Animations]]
- [[_COMMUNITY_Content Sections|Content Sections]]
- [[_COMMUNITY_Navigation|Navigation]]
- [[_COMMUNITY_Project Info|Project Info]]
- [[_COMMUNITY_Services|Services]]
- [[_COMMUNITY_Terms and Conditions|Terms and Conditions]]
- [[_COMMUNITY_Development Guidelines|Development Guidelines]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]

## God Nodes (most connected - your core abstractions)
1. `Repair ShopWebsite` - 4 edges
2. `BRAND` - 4 edges
3. `DESIGN` - 4 edges
4. `ANIMATIONS` - 3 edges
5. `CONTENT` - 3 edges
6. `MENU_LIST` - 3 edges
7. `PROJECT` - 3 edges
8. `SERVICES` - 3 edges
9. `TERMS` - 3 edges
10. `CSS Transitions` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Spacing System` --semantically_similar_to--> `Logo Usage`  [INFERRED] [semantically similar]
  docs/DESIGN.md → docs/BRAND.md
- `Color Palette` --semantically_similar_to--> `Color System`  [INFERRED] [semantically similar]
  docs/BRAND.md → docs/DESIGN.md
- `Typography` --semantically_similar_to--> `Typography Scale`  [INFERRED] [semantically similar]
  docs/BRAND.md → docs/DESIGN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Design System Core** — docs_brand_color_palette, docs_brand_typography, docs_design_color_system, docs_design_typography_scale, docs_design_spacing_system [INFERRED 0.85]

## Communities (10 total, 1 thin omitted)

### Community 0 - "Brand and Design System"
Cohesion: 0.24
Nodes (10): BRAND, Color Palette, Logo Usage, Typography, Voice and Tone, DESIGN, Color System, Layout Principles (+2 more)

### Community 1 - "Project Dependencies"
Cohesion: 0.40
Nodes (5): Repair ShopWebsite, react, react-dom, react-scripts, web-vitals

### Community 2 - "Animations"
Cohesion: 0.67
Nodes (4): ANIMATIONS, CSS Animations, CSS Transitions, Framer Motion

### Community 3 - "Content Sections"
Cohesion: 0.50
Nodes (4): CONTENT, Contact Information, Service Descriptions, Testimonials

### Community 4 - "Navigation"
Cohesion: 0.50
Nodes (4): MENU_LIST, Contact CTA, Main Navigation, Service Links

### Community 5 - "Project Info"
Cohesion: 0.50
Nodes (4): PROJECT, Key Features, Target Audience, Tech Stack

### Community 6 - "Services"
Cohesion: 0.50
Nodes (4): SERVICES, Diagnostic Services, Preventive Maintenance, Repair Services

### Community 7 - "Terms and Conditions"
Cohesion: 0.50
Nodes (4): TERMS, Disclaimer, Governing Law, Liability Limitation

### Community 8 - "Development Guidelines"
Cohesion: 0.67
Nodes (3): BUILD_PROMPT, AI Development Guidelines, Component Standards

## Knowledge Gaps
- **25 isolated node(s):** `motion`, `react`, `react-dom`, `react-scripts`, `web-vitals` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `motion`, `react`, `react-dom` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._