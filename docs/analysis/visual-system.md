# Visual System for Project NOVA

This document defines the refined visual system for Project NOVA, covering color, typography, spacing, glassmorphism, and component styling guidelines.

## Color System

### Primary Palette
| Name       | Hex     | Usage                                              |
|------------|---------|----------------------------------------------------|
| Background | #050816 | Page background, main container background         |
| Surface    | #0B1120 | Cards, dialogs, elevated surfaces                  |
| Primary    | #00C2FF | Primary actions, links, accent highlights          |
| Secondary  | #8B5CF6 | Secondary actions, alternate accents               |
| Accent     | #38BDF8 | Tertiary accents, hover states, interactive cues   |
| Text       | #FFFFFF | Primary text content                               |
| Muted      | #94A3B8 | Secondary text, subtitles, de-emphasized content   |

### Neutral Variations
- **Text on Surface**: For text inside cards/surfaces, use `#FFFFFF` at 90-95% opacity (`text-white/90`) for primary text, `#94A3B8` at 70-80% opacity for muted text.
- **Borders**: Use `border-surface/30` for default borders, `border-accent/50` for hovered/focused states.
- **Shadows**: Use `shadow-sm` for subtle elevation; avoid heavy shadows to maintain the glassy aesthetic.
- **Gradients**: 
  - Primary gradient: `bg-gradient-to-r from-[#00C2FF] to-[#8B5CF6]`
  - Secondary gradient: `bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8]`
  - Background gradient: `bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#050816]` (already defined in globals.css as `.gradient-bg`)

### Interactive States
- **Hover**: Increase surface opacity to `/60`, accent borders to `/50`, use gradient animations where appropriate.
- **Focus**: Use `ring-2 ring-accent/50` for focus rings.
- **Pressed/Active**: Reduce surface opacity to `/40` or apply a slight scale transform (`scale-95`).

### Implementation in Tailwind
Update `tailwind.config.js` to include these colors as CSS variables or directly in the theme. However, since we already have a `colors` object in `src/data/site-config.ts`, we can generate Tailwind colors from that object via a plugin or update the CSS variables in `globals.css`.

Recommended: Update the `:root` and `.dark` selectors in `globals.css` to use the defined hex values, then use Tailwind's `hsl()` or `rgb()` functions. For simplicity, we can convert hex to HSL and update the variables.

## Typography

### Font Family
- **Headings**: `Inter Tight` (a condensed variant of Inter for tight letter spacing)
- **Body**: `Inter` (regular width)
- **Fallback**: `system-ui, sans-serif`

### Type Scale
| Size      | Rem Value | Usage                              | Weight | Line Height | Letter Spacing |
|-----------|-----------|------------------------------------|--------|-------------|----------------|
| Heading 1 | 3rem      | Main page titles                   | 800    | 1.1         | -0.05em        |
| Heading 2 | 2.25rem   | Section titles                     | 700    | 1.2         | -0.025em       |
| Heading 3 | 1.875rem  | Subsection titles                  | 600    | 1.3         | 0              |
| Heading 4 | 1.5rem    | Card titles, medium headings       | 600    | 1.4         | 0              |
| Heading 5 | 1.25rem   | Small headings                     | 500    | 1.5         | 0              |
| Heading 6 | 1rem      | Subtle headings                    | 500    | 1.6         | 0              |
| Body LG   | 1.125rem  | Body text (large)                  | 400    | 1.7         | 0              |
| Body      | 1rem      | Body text (default)                | 400    | 1.75        | 0              |
| Body SM   | 0.875rem  | Helper text, captions              | 400    | 1.6         | 0              |
| Body XS   | 0.75rem   | Footnotes, extra small text        | 400    | 1.5         | 0              |

### Weights
- **Light**: 300 (rarely used)
- **Regular**: 400
- **Medium**: 500
- **Semi-bold**: 600
- **Bold**: 700
- **Extra-bold**: 800 (for headings only)

### Line Heights & Letter Spacing
- Use unitless line heights for scalability.
- Tight letter spacing (`-0.05em` to `0`) for headings to improve density; normal spacing for body.

### Implementation
Configure Tailwind's `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, and `lineHeight` in `tailwind.config.js` under `theme.extend`. Alternatively, use utility classes consistently.

## Spacing

### Base Unit
4px = 0.25rem (Tailwind's default unit)

### Spacing Scale
Use Tailwind's default spacing scale (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64) which multiples of 0.25rem.

### Layout Guidelines
- **Container**: Max width `7rem` (28rem?) Actually, from tailwind.config.js: container padding `2rem` and screens `2xl: 1400px`. We'll keep that.
- **Section Padding**: Vertical padding `py-16` (desktop), `py-12` (tablet), `py-8` (mobile). Adjust based on content density.
- **Section Gap**: Between sections, use `mt-20` or `space-y-20` for large gaps; `mt-12` for medium.
- **Component Internal Padding**: 
  - Cards: `p-6` (desktop), `p-4` (mobile)
  - Buttons: `px-6 py-3` (medium), `px-4 py-2` (small)
  - Inputs: `px-4 py-3`
- **Gap Between Elements**: Use `space-x-4` for horizontal gaps, `space-y-4` for vertical gaps; adjust as needed.

### Implementation
Use Tailwind's `p`, `m`, `gap`, `space-x`, `space-y` utilities consistently.

## Glassmorphism System

### Base Glass Class
```css
.glass {
  @apply bg-surface/50 backdrop-blur-md border border-surface/30 rounded-lg p-6;
}
```
- **bg-surface/50**: Surface color at 50% opacity for a translucent background.
- **backdrop-blur-md**: Applies a blur to the background behind the element.
- **border-surface/30**: Subtle border to define the edge.
- **rounded-lg**: Consistent border radius.
- **p-6**: Comfortable padding inside.

### Variations
- **.glass-hover**: On hover, increase background opacity to `/60` and border to `/50`.
- **.glass-darker**: For darker emphasis, use `bg-surface/30`.
- **.glass-light**: For lighter sections, use `bg-surface/60` with a lighter border.
- **.glass-transition**: Add `transition-colors duration-300` for smooth hover effects.

### Usage
Apply to navigation bars, cards, modals, dropdowns, and any elevated surface that should exhibit the glass effect.

### Implementation
Add these classes to `globals.css` or as utility classes via Tailwind plugins.

## Component Styling Guidelines

### Buttons
- **Primary Button**: 
  - Background: `bg-primary`
  - Text: `text-primary-foreground` (white)
  - Hover: `bg-primary/90`
  - Border: `border border-transparent`
  - Radius: `rounded-lg`
  - Padding: `px-6 py-3`
  - Transition: `transition-colors duration-200`
- **Secondary Button**:
  - Background: `bg-surface/60`
  - Text: `text-accent`
  - Hover: `bg-accent/20`
  - Border: `border border-accent/30`
- **Ghost Button**:
  - Background: `transparent`
  - Text: `text-accent`
  - Hover: `bg-accent/10`
  - No border by default; optional `border border-accent/20` on hover.

### Inputs & Textareas
- **Base**: 
  - Background: `bg-surface/50`
  - Border: `border border-surface/30`
  - Text: `text-text`
  - Placeholder: `placeholder-muted/50`
  - Radius: `rounded-lg`
  - Padding: `px-4 py-3`
  - Focus: `ring-2 ring-accent/50 border-border-transparent`
- **Hover**: Slightly increase background opacity to `/60`.

### Cards
- **Service Card** (as seen): 
  - Base: `flex flex-col items-center justify-between h-full bg-surface/50 backdrop-blur-md border border-surface/30 rounded-lg p-6 group`
  - Hover: `hover:bg-surface/60 hover:border-accent/50 transition-colors`
  - Inner elements: Use `text-accent` for category headings, `text-muted` for body.
- **Pricing Card**: 
  - Outer border: `border border-surface/30 rounded-lg overflow-hidden`
  - Header: `flex items-center justify-between px-6 py-4 bg-surface/50 cursor-pointer hover:bg-surface/60`
  - Body: `divide-y divide-surface/20` with `px-6 py-4` rows.
- **Testimonial Card**:
  - Base: `bg-surface/50 backdrop-blur-md border border-surface/30 rounded-lg p-8 text-center`
  - Animation: Use framer-motion for entrance/exit animations.

### Navigation Bar
- **Sticky Glassmorphism Nav**: 
  - `bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-surface/20`
  - Logo: `text-accent`
  - Nav links: `text-muted hover:text-accent transition-colors`
  - Mobile drawer: `bg-surface/90 backdrop-blur-md` with similar link styling.

### Footer
- Background: `bg-surface/90` or `bg-surface/80` for a slightly elevated feel.
- Text: `text-muted` for secondary info, `text-accent` for links/highlights.
- Borders: `border-t border-surface/20` if needed.

### Animations Integration
- Use GSAP and Framer Motion for scroll-triggered animations as per the design philosophy.
- Avoid generic fade-ins; prefer cinematic transitions, scroll-linked storytelling, layered depth, smooth parallax, and section pinning.
- Ensure animations are performant (use `will-change`, limit to properties that can be composited).

### Accessibility
- Ensure sufficient contrast ratios:
  - Text on surface: `#FFFFFF` on `#0B1120` ratio > 7:1 (AAA)
  - Muted text: `#94A3B8` on `#0B1120` ratio ~ 4.5:1 (AA for large text, consider increasing weight or size for body)
  - Interactive elements: Provide clear focus states (`ring-2 ring-accent/50`).
- Respect reduced motion preferences using `@media (prefers-reduced-motion: reduce)`.

## Implementation Steps

1. **Update CSS Variables**: Modify `globals.css` `:root` and `.dark` sections to use the defined hex colors (converted to HSL). Alternatively, create a script to generate variables from the `colors` object in `site-config.ts`.
2. **Update Tailwind Configuration**: Extend the theme with the defined type scale, spacing (if custom), and any new utility classes (like glass variations).
3. **Refactor Components**: Apply the updated color and spacing utilities consistently across all components.
4. **Add Glass Variations**: Define new utility classes for glass effects in `globals.css` or via a Tailwind plugin.
5. **Audit Accessibility**: Test contrast ratios and adjust as needed.
6. **Document Usage**: Ensure all team members refer to this visual system when creating or modifying components.

## Files to Update
- `src/app/globals.css` - Color variables and glass utility classes
- `tailwind.config.js` - Theme extension for typography, spacing, and potential new utilities
- Components in `src/components/` - Apply refined styles
- `src/data/site-config.ts` - May serve as the single source for color and typography values (consider generating Tailwind config from this)

## Conclusion
This visual system provides a cohesive framework to achieve the dark futuristic, premium aesthetic inspired by Apple Vision Pro, Linear, Arc Browser, and Awwwards-winning websites. By adhering to these guidelines, Project NOVA will maintain visual consistency, enhance user experience, and meet performance and accessibility goals.