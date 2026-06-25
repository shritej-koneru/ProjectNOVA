# Motion System Plan for Project NOVA

## 1. Scroll Storytelling Plan

### Overview
Project NOVA presents an interactive scroll story where the user experiences a laptop transformation from slow/cluttered to a powerful workstation as they scroll. The story is divided into 10 distinct scenes, each representing a stage in the transformation journey.

### Scene Breakdown
Based on `/docs/BUILD_PROMPT.md` (lines 229-330) and `/src/data/content.ts`:

| Scene | Title | Description | Transformation Focus |
|-------|-------|-------------|----------------------|
| 1 | Your Laptop Deserves Better | Slow startup times, unnecessary software, cluttered storage, and poor performance | Problem identification |
| 2 | Too Much Junk | Most laptops come overloaded with software you never asked for | Bloatware invasion |
| 3 | Debloated. Optimized. Ready. | Remove unnecessary applications, improve startup speed, and create a cleaner system | Optimization process |
| 4 | Fresh Windows Setup | Clean installations, drivers, updates, and a properly configured environment | Windows installation |
| 5 | Explore Linux | Ubuntu, Mint, Fedora, and Manjaro setups tailored to your needs | Linux installation |
| 6 | Best Of Both Worlds | Dual boot environments that combine Windows and Linux | Dual boot animation |
| 7 | Ready To Build | Developer environments configured with everything you need to start coding. | Developer setup |
| 8 | Knowledge Everywhere | Obsidian, cloud sync, and productivity systems across all your devices. | Obsidian sync |
| 9 | Game Ready | Gaming launchers, drivers, optimization, and performance tuning. | Gaming setup |
| 10 | Your Ultimate Student Setup | A laptop configured for studying, coding, gaming, and productivity. | Final transformation |

### Narrative Flow & Pacing
- Each scene occupies a vertical scroll section with consistent height (100vh) for predictable storytelling
- Scenes progress linearly, each building upon the previous transformation step
- Pacing varies by scene complexity: simpler concepts (Scenes 1-2) may have shorter duration, while complex transformations (Scenes 6-8) may have extended scroll duration
- Story beats are reinforced with visual metaphors and progressive laptop evolution

## 2. GSAP Strategy

### Plugin Registration
- Register `ScrollTrigger` plugin globally via `useGSAP` hook in each scene component or centralized registration
- Consider registering additional plugins if needed (e.g., `CSSRulePlugin` for pseudo-element animations)

### Reduced Motion Handling
- Implement prefers-reduced-motion media query detection (already in `/src/lib/animations.ts`)
- Provide fallback animations that respect user preferences:
  - Replace motion-based animations with instant state changes or cross-fades
  - Disable parallax effects and scrub-based animations
  - Maintain essential transitions but with zero duration
- Use the `useReducedMotionSafeGSAP` hook pattern for component-level safety

### Animation Configurations
- Centralized configuration in `/src/lib/animations.ts`:
  - Durations: fast (0.3s), medium (0.6s), slow (1.0s)
  - Easing: smooth (power3.out), verySmooth (power4.out), elastic, bounce
- Extend with scene-specific presets as needed

### Timeline Usage
- Use GSAP timelines for complex scene animations requiring sequential steps
- Nest timelines within ScrollTrigger callbacks for scroll-bound sequences
- Utilize `staggerChildren` for animating groups of elements (e.g., service cards, feature lists)

## 3. ScrollTrigger Strategy

### Implementation Pattern
Each scene follows this pattern:
1. Create a GSAP context bound to the scene container
2. Register ScrollTrigger plugin within the context
3. Define ScrollTrigger instances for:
   - Pinning (when applicable)
   - Parallax effects (scrubbed)
   - Enter/leave animations (toggleActions)
   - Progress-based animations (for complex transformations)

### Trigger Points
- **Start**: Typically `'top top'` for pinning scenes, `'top center'` for entrance animations
- **End**: Calculated based on scene duration (e.g., `'+=1000px'` for pinned scenes, `'bottom top'` for exit animations)
- **Scrub**: `true` for smooth parallax, numeric values (0.5) for delayed follow-through
- **Toggle Actions**: 
  - Entrance: `'play none none reverse'` (play on enter, reverse on leave)
  - For pinned sections: often `'play none none none'` to maintain state while pinned

### Scene-Specific Strategies
- **Scenes 1, 4, 5, 7, 8, 9, 10**: Pin the container for extended storytelling (1000-2000px scroll distance)
- **Scenes 2, 3, 6**: May use standard scroll-triggered animations without pinning for quicker transitions
- All scenes use scrubbed parallax for background/depth layers
- Entrance animations for key text/content elements using fade/slide combinations

## 4. Parallax System

### Depth Layering
Implement 3-5 layers of parallax for immersive depth:
1. **Background** (farthest): Slowest movement (0.1x-0.3x scroll speed)
   - Gradient backgrounds, distant graphics
2. **Midground**: Moderate movement (0.4x-0.6x scroll speed)
   - Primary scene elements, schematic diagrams
3. **Foreground** (closest): Fastest movement (0.7x-1.0x scroll speed)
   - Text, interactive elements, laptop mockups
4. **UI Overlay**: Fixed position (0x scroll speed)
   - Navigation, persistent CTAs

### Implementation
- Use `yPercent` transforms on absolutely positioned elements within relatively positioned containers
- Bind to ScrollTrigger with `scrub: true` for smooth, synchronized movement
- Vary speed by adjusting the end value in `fromTo` animations (e.g., `yPercent: [-10, 10]` vs `yPercent: [-30, 30]`)
- Apply different parallax strengths per scene to match narrative intensity

### Performance Considerations
- Use `will-change: transform` on parallax elements
- Limit parallax to 3-5 layers maximum to prevent overdraw
- Disable parallax when prefers-reduced-motion is active

## 5. Pinned Sections

### Pinning Strategy
- Pin scenes that require extended storytelling time (Scenes 1, 4, 5, 7, 8, 9, 10)
- Typical pin duration: 1000-2000px of scroll progress (equivalent to 1-2 viewport heights)
- Use `pinSpacing: false` to maintain natural scroll flow without extra space
- Set `markers: false` in production (true only for debugging)

### Pin Implementation
```javascript
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: '+=1500px', // Adjust per scene needs
  pin: true,
  pinSpacing: false,
});
```

### Content Within Pinned Sections
- While pinned, internal elements animate via:
  - Scroll-scrubbed parallax layers
  - Progress-based transformations (e.g., laptop evolution timeline)
  - Sequential reveals tied to scroll position
- Maintain interactive elements (if any) with careful z-index management

## 6. Transitions

### Scene-to-Scene Transitions
- **Primary Method**: Natural scroll progression with entrance/exit animations
- **Entrance Animations**: 
  - Fade-in combined with subtle upward slide (20px)
  - Duration: 0.6-1.0s, easing: power3.out
  - Triggered when scene reaches 'top center'
- **Exit Animations**:
  - Fade-out with optional downward slide
  - Duration: 0.3-0.5s (quicker exit)
  - Triggered when scene leaves viewport

### Internal Scene Transitions
- For complex scenes (e.g., dual boot setup, developer environment):
  - Use horizontal timelines within pinned sections
  - Animate progress bars, step indicators, or transformation sequences
  - Tie animation progress to scroll position within the pinned area
- Example: Laptop transformation timeline
  - 0%: Original slow laptop
  - 25%: After debloating
  - 50%: Windows installed
  - 75%: Linux dual boot ready
  - 100%: Final optimized workstation

### Special Effects Transitions
- ** Shader Transitions**: For scenes requiring visual metamorphosis (use with Background Gradient and Shader Animation components)
- **Morphing**: Between SVG icons representing different software/services
- **Particle Systems**: For bloatware removal or optimization bursts (use sparingly per animation rules)

### Cross-Scene Continuity
- Maintain visual elements that evolve across scenes (e.g., laptop model)
- Use FLIP technique for smooth transitions of persistent elements between scenes
- Ensure consistent lighting and perspective across 3D/renders

## 7. Animation Rules Compliance

### Adherence to ANIMATIONS.md
- ✅ Smooth transitions: Using GSAP's native smoothing and appropriate easings
- ✅ Pinned sections: Implemented per plan above
- ✅ GSAP ScrollTrigger: Core animation driver
- ✅ Parallax depth: Multi-layer system implemented
- ✅ Glassmorphism: Handled in visual system, but animations respect the style (soft, subtle movements)
- ✅ Scroll-driven storytelling: Entire system built around scroll progression

### Avoidances
- ❌ Generic fade-ins: Enhanced with combined properties (fade + slide + scale)
- ❌ Template feel: Custom animations per scene narrative
- ❌ Cheap effects: No excessive spinning; effects purpose-driven
- ❌ Excessive spinning animations: Avoided per guidelines

## 8. Performance & Accessibility

### Performance Optimization
- Limit concurrent animations per viewport (max 3-4 simultaneous)
- Use `requestAnimationFrame` via GSAP's internal timing
- Enable lazy evaluation for offscreen animations
- Consider `liaison` or similar for scroll position sharing if needed

### Accessibility (WCAG AA)
- Respect prefers-reduced-motion: all animations disabled or substituted
- Ensure keyboard navigability remains unaffected by scroll jacking
- Maintain logical tab order without reliance on animation-triggered visibility
- Provide equivalent information for purely animational content (if any)

## 9. Integration Notes

### Components to Animate
- **Background Gradient Animation**: Apply parallax to gradient layers
- **Shader Animation**: Use as background layer with depth-based movement
- **Container Scroll Animation**: Leverage existing pinning and parallax patterns
- **Animated Testimonials**: Staggered entrance as scene content
- **Hero Dithering CTA**: Special entrance animation in initial hero section

### Customization for Project NOVA
- Color palette: Blue/Cyan/Purple glow system applied to animation elements
- Motion style: Cinematic, easing towards smooth deceleration (power outs)
- Duration calibration: Match to narrative beats (slower for revelation moments)

---
*This motion system plan delivers the interactive scroll storytelling required for Project NOVA's laptop transformation narrative while adhering to the specified animation style and performance requirements.*