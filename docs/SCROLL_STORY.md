# Scroll Story — 10 Scenes

## Overview
The scroll story is the centerpiece of the home page. Users scroll through a `min-h-[900svh]` container. The content stays `position: sticky` while the progress indicator and scene text update based on scroll position.

## Technical Implementation
- **Container:** `min-h-[900svh]` with `position: sticky top-0` inner div
- **Scroll tracking:** `useScroll({ target: containerRef, offset: ['start start', 'end end'] })`
- **Scene detection:** `useMotionValueEvent` fires only when `Math.floor(v * n)` changes (scene boundary)
- **Palette:** On scene change, `applyPalette(derivePalette(getGradientColor(v)))` updates CSS variables (skipped on mobile)
- **Progress bar:** `useTransform(scrollYProgress, [0, 1], [0, 1])` on a `scaleX` bar

## Scene Screens
Each of the 10 scenes renders a different screen inside the laptop mockup:

| Scene | Component | Content |
|---|---|---|
| 1 | `SlowScreen` | Animated status bars, pulsing dots, disk/boot/fan warnings |
| 2 | `BloatwareScreen` | Grid of bloatware cards with X icons |
| 3 | `OptimizationScreen` | Progress bars with percentages |
| 4 | `InstallScreen` | Spinning loader + progress bar + feature labels |
| 5 | `LinuxScreen` | Distro cards with colored icons |
| 6 | `DualBootScreen` | Floating Windows/Linux labels with gradient divider |
| 7 | `DeveloperScreen` | Terminal-style lines with typewriter effect |
| 8 | `SyncScreen` | Rotating orbit rings around center label |
| 9 | `GamingScreen` | FPS bar chart + gaming platform badges |
| 10 | `FinalScreen` | 5 achievement cards with pulsing icons |

## Mobile Behavior
- All infinite animations (`repeat: Infinity`) replaced with static elements
- Scene transitions: shorter duration, `opacity`-only, `mode='wait'`
- Floating chips: `hidden md:block` (hidden on mobile)
- No palette changes
- No floating laptop animation (`y: [0, -10, 0]` skipped)

## Scene Labels
```
Scene 1: 96% disk, 42s boot, fan noise, low battery
Scene 2: Trialware, Updater, Toolbar, OEM apps, Popups
Scene 3: Clean startup, Services tuned, Cache cleared, Drivers checked
Scene 4: Windows, Drivers, Updates, Recovery point
Scene 5: Ubuntu, Mint, Fedora, Manjaro
Scene 6: Windows, Linux, Shared files
Scene 7: VS Code, GitHub, Python, Java, Android Studio, Ollama
Scene 8: Obsidian, Cloud Sync, Laptop, Mobile
Scene 9: Steam, Epic Games, Discord, GPU drivers, FPS tuned
Scene 10: Study, Code, Create, Game, Sync
```
