# Services Reference

## Data Source
`src/data/services.ts` — `services` object with 9 categories, exported as typed records.

## Categories & Services

### windows (8)
Windows Installation, Reinstallation, License Setup, Microsoft Office, Office License, Driver Installation, Windows Updates, Software Cleanup

### optimization (7)
Basic Debloat, Advanced Debloat, New Laptop Cleanup, Deep Cleanup, Startup Optimization, Browser Optimization, Performance Tuning

### customization (7)
Wallpapers, Themes, Icons, Cursor Packs, Rainmeter, Widgets, Taskbar Customization

### productivity (5)
Obsidian Setup, Obsidian Sync, Study Productivity Pack, Cloud Drive Setup, Multi Device Sync

### developer (8)
VS Code Setup, Git Setup, GitHub Setup, Python, Java, C/C++, Android Studio, Ollama

### linux (6)
Ubuntu, Linux Mint, Fedora, Manjaro, Dual Boot, Linux Customization

### gaming (6)
Steam Setup, Epic Games Setup, Discord Setup, Gaming Optimization, Driver Optimization, Game Installation

### troubleshooting (6)
Windows Not Booting, Blue Screen, Driver Issues, Storage Issues, Software Errors, General Troubleshooting

### customServices (1)
Any Technical Request

## URL Slugs
Each service gets a slug: `name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')`
e.g. "VS Code Setup" → `/services/vs-code-setup`

## Routing
- `/services` — full catalog with category sidebar filter + search
- `/services/[slug]` — detail page with pricing badge, related services, breadcrumbs

## Booking Flow
- **"Book" button** on service cards → `/contact?service=ServiceName`
- Contact form reads `useSearchParams()` → auto-selects category + service in cascading dropdowns
- 50+ services organized under 9 categories
