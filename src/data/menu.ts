function icon(name: string) {
  return `https://api.iconify.design/${name}.svg?color=%23E9D985&height=40`;
}

function desc(name: string, detail: string) {
  return { name, price: '', description: detail };
}

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export const menuItems: MenuSection[] = [
  {
    section: 'QUICK SERVICES',
    items: [
      { name: 'App Installation', price: '₹99', description: 'Install any software or application you need — from browsers to productivity tools, IDEs to creative suites. Fast, clean installation with no bloat.', image: icon('ph/download') },
      { name: 'Driver Installation', price: '₹99', description: 'Install and update critical system drivers — GPU, chipset, audio, network, and peripherals. Ensures hardware works at peak performance.', image: icon('ph/cpu') },
      { name: 'Browser Setup & Sync', price: '₹99', description: 'Browser configured with your preferred extensions, bookmarks imported, privacy settings locked in, and sync enabled across devices.', image: icon('ph/globe') },
      { name: 'Printer Setup', price: '₹149', description: 'Printer drivers installed, network or USB connection configured, and test page printed. Wired and wireless printer support.', image: icon('ph/printer') },
      { name: 'Microsoft Office Installation', price: '₹199', description: 'Full Office suite installation including Word, Excel, PowerPoint, and OneNote. Configured with your Microsoft account and ready to use.', image: icon('ph/file-text') },
      { name: 'PDF & Student Tools Setup', price: '₹99', description: 'PDF reader, editor, OCR tools, citation managers, and essential student software all installed and configured for academic work.', image: icon('ph/books') },
    ]
  },
  {
    section: 'CLEANUP & DEBLOATING',
    items: [
      { name: 'Basic Debloat', price: '₹199', description: 'Remove common bloatware, disable startup junk, clean temporary files, and reclaim disk space. Quick refresh that makes an immediate difference.', image: icon('ph/trash') },
      { name: 'Advanced Debloat & Optimization', price: '₹399', description: 'Deep system-wide cleanup — telemetry disabled, scheduled tasks audited, background apps removed, hidden Windows features stripped out.', image: icon('ph/gauge') },
      { name: 'New Laptop Cleanup', price: '₹499', description: 'Brand new laptops come with 20+ pre-installed apps. We remove all manufacturer bloatware, trial software, and promotional clutter completely.', image: icon('ph/package') },
      { name: 'Deep Cleanup & Refresh', price: '₹599', description: 'Comprehensive system audit — temp files, orphaned registry entries, old updates, cache files, unused language packs, and disabled services all cleaned.', image: icon('ph/sparkle') },
    ]
  },
  {
    section: 'PERFORMANCE BOOST',
    items: [
      { name: 'Basic Speed-Up Package', price: '₹299', description: 'Startup optimization, service tuning, visual effects adjustment, and disk cleanup. Noticeably faster boot and everyday responsiveness.', image: icon('ph/rocket') },
      { name: 'Advanced Performance Package', price: '₹499', description: 'Everything in Basic plus CPU/GPU tuning, RAM optimization, network latency reduction, SSD trim optimization, and power plan configuration.', image: icon('ph/lightning') },
      { name: 'Ultimate Performance Package', price: '₹799', description: 'Maximum system performance — full debloat, registry optimization, driver updates, advanced power tuning, game mode, and benchmark verification.', image: icon('ph/crown') },
    ]
  },
  {
    section: 'DESKTOP CUSTOMIZATION',
    items: [
      { name: 'Aesthetic Pack', price: '₹199', description: 'Curated wallpaper set, custom theme, icon pack, and cursor set. Clean, modern look that transforms your desktop experience instantly.', image: icon('ph/paint-brush') },
      { name: 'Premium Desktop Makeover', price: '₹499', description: 'Full desktop transformation including Rainmeter widgets, custom taskbar, animated wallpapers, icon packs, and system-wide theme.', image: icon('ph/palette') },
      { name: 'Anime / Gaming Theme Setup', price: '₹699', description: 'Fully themed desktop around your favorite anime, game, or aesthetic. Custom icons, wallpapers, widgets, cursors, and sound schemes.', image: icon('ph/game-controller') },
    ]
  },
  {
    section: 'WINDOWS & SOFTWARE',
    items: [
      { name: 'Windows Installation', price: '₹299', description: 'Clean install of Windows OS with latest updates, essential drivers, and optimized settings. Bloat-free and ready for daily use.', image: icon('ph/windows-logo') },
      { name: 'Windows Reinstallation', price: '₹499', description: 'Full system wipe and reinstall. Fresh Windows with all drivers, updates, and performance tweaks applied. Like a new laptop.', image: icon('ph/arrow-clockwise') },
      { name: 'Windows License Setup', price: '₹99', description: 'Activate Windows with a genuine license key. We handle product key installation, activation troubleshooting, and verification.', image: icon('ph/key') },
      { name: 'Microsoft Office Installation', price: '₹199', description: 'Full Office suite — Word, Excel, PowerPoint, OneNote. Configured with your account and ready for academic or professional use.', image: icon('ph/file-text') },
      { name: 'Office License Setup', price: '₹99', description: 'Activate Office with your license key or 365 subscription. All apps authenticated, updated, and ready for use.', image: icon('ph/key') },
      { name: 'Fresh Laptop Setup', price: '₹799', description: 'Complete new laptop setup — Windows optimized, drivers installed, essential software loaded, browser configured, and backup system in place.', image: icon('ph/star') },
    ]
  },
  {
    section: 'PRODUCTIVITY',
    items: [
      { name: 'Obsidian Setup', price: '₹199', description: 'Obsidian vault with folder structure, essential plugins, and beginner template. Your personal knowledge management system, ready to go.', image: icon('ph/note') },
      { name: 'Obsidian Sync Setup', price: '₹399', description: 'Sync your Obsidian vault across laptop, phone, and tablet. Encrypted, versioned, and available everywhere you need it.', image: icon('ph/arrow-circle-up') },
      { name: 'Study Productivity Pack', price: '₹599', description: 'Complete student productivity suite — Obsidian, Todoist, Notion, calendar, habit tracker, Pomodoro timer. All pre-configured together.', image: icon('ph/student') },
      { name: 'Cloud Drive Setup', price: '₹199', description: 'Google Drive, OneDrive, or Dropbox configured with selective sync, auto-backup, and folder organization. Files accessible from anywhere.', image: icon('ph/cloud-arrow-up') },
      { name: 'Multi Device Sync Setup', price: '₹399', description: 'Seamless sync across all devices — bookmarks, passwords, notes, settings, and files shared between laptop, phone, and tablet.', image: icon('ph/devices') },
    ]
  },
  {
    section: 'DEVELOPER',
    items: [
      { name: 'Beginner Developer Pack', price: '₹299', description: 'VS Code, Git, GitHub CLI, and Python configured. Perfect starting point for first-year CSE students jumping into coding.', image: icon('ph/code') },
      { name: 'Full Developer Pack', price: '₹599', description: 'Complete dev environment — VS Code, Git, Python, Java, Node.js, Docker, database tools. Multi-language, ready for any project.', image: icon('ph/code-block') },
      { name: 'Android Development Pack', price: '₹799', description: 'Android Studio, SDK, emulator, Gradle, and ADB configured. Full Android dev environment for building and testing apps.', image: icon('ph/device-mobile') },
      { name: 'AI Development Pack', price: '₹999', description: 'Python ML stack (PyTorch/TensorFlow), Jupyter, Ollama, CUDA setup, and AI tools. Run and develop AI models locally on your laptop.', image: icon('ph/robot') },
    ]
  },
  {
    section: 'LINUX',
    items: [
      { name: 'Linux Installation', price: '₹399', description: 'Install Ubuntu, Mint, Fedora, or Manjaro with drivers, essential apps, and developer tools. Blazing fast Linux ready for daily use.', image: icon('ph/terminal') },
      { name: 'Linux + Student Setup', price: '₹699', description: 'Linux with Obsidian, browser, coding tools, cloud sync, and productivity suite. Perfect for students switching to Linux full-time.', image: icon('ph/student') },
      { name: 'Dual Boot Setup', price: '₹799', description: 'Windows + Linux dual boot with GRUB. Proper partition sizing, boot configuration, and seamless OS switching for the best of both worlds.', image: icon('ph/layout') },
      { name: 'Linux Customization Pack', price: '₹299', description: 'Desktop theme, icon pack, terminal customization (starship/fish/zsh), window manager tweaks, and productivity workflow enhancements.', image: icon('ph/palette') },
    ]
  },
  {
    section: 'GAMING',
    items: [
      { name: 'Game Launcher Setup', price: '₹199', description: 'Steam, Epic Games, and Discord installed and configured. Log in, sync your library, and start playing immediately.', image: icon('ph/game-controller') },
      { name: 'Game Installation', price: '₹99–₹299', description: 'Install any game from your library. We handle large downloads, proper install locations, and optimal settings for your hardware.', image: icon('ph/download') },
      { name: 'Large Game Installation', price: '₹299–₹599', description: 'Install large games (50GB+) with download management, integrity verification, and performance optimization for your specific GPU.', image: icon('ph/download') },
      { name: 'Gaming Performance Pack', price: '₹599', description: 'GPU driver tuning, graphics optimization, game mode config, background process cleanup, and network latency reduction for maximum FPS.', image: icon('ph/lightning') },
      { name: 'Complete Gaming Setup', price: '₹799', description: 'Everything a gamer needs — launchers installed, drivers optimized, game settings tuned, Discord ready, streaming tools configured, and benchmarks run.', image: icon('ph/crown') },
    ]
  },
  {
    section: 'TROUBLESHOOTING',
    items: [
      { name: 'Windows Not Booting', price: '₹399+', description: 'Diagnose and repair boot failures — black screen, infinite loading, boot loops, and corrupt system files. Recovery media and system restore expertise.', image: icon('ph/warning') },
      { name: 'Blue Screen Troubleshooting', price: '₹299+', description: 'BSOD error analysis from dump files. Identify and fix the root cause — driver conflicts, hardware issues, memory errors, or corrupt system files.', image: icon('ph/warning-circle') },
      { name: 'Driver Issues', price: '₹199', description: 'Fix driver conflicts, yellow exclamation marks, device not working, or outdated drivers. Rollback, update, or replace as needed.', image: icon('ph/cpu') },
      { name: 'Storage Full Issues', price: '₹199', description: 'Free up disk space, identify space hogs, move files, clean temp data, and configure storage optimization. Reclaim gigabytes of wasted space.', image: icon('ph/hard-drive') },
      { name: 'Slow Laptop Diagnosis', price: '₹199', description: 'Full system analysis to identify performance bottlenecks — CPU, RAM, disk, or thermal throttling. Actionable recommendations to speed things up.', image: icon('ph/magnifying-glass') },
      { name: 'Software Errors', price: '₹199', description: 'Fix application crashes, installation errors, DLL errors, and compatibility issues. Get your software working reliably and consistently.', image: icon('ph/bug') },
      { name: 'General Troubleshooting', price: '₹199–₹499', description: 'Any technical issue — WiFi problems, peripheral issues, performance degradation, virus cleanup, or just a slow laptop that needs expert attention.', image: icon('ph/wrench') },
    ]
  },
  {
    section: 'BUNDLES',
    items: [
      { name: 'Student Starter Pack', price: '₹399', description: 'Basic debloat + Office installation + browser setup + cloud drive. The perfect starting bundle for any college student.', image: icon('ph/backpack') },
      { name: 'Coding Starter Pack', price: '₹799', description: 'VS Code + Git/GitHub + Python/Java + Linux installation + Obsidian. Everything a first-year CSE student needs, pre-configured.', image: icon('ph/code') },
      { name: 'Linux Explorer Pack', price: '₹799', description: 'Linux installation + student setup + customization + dual boot. Complete Linux transition package for students exploring open source.', image: icon('ph/terminal-window') },
      { name: 'New Laptop Package', price: '₹999', description: 'Full new laptop setup — debloat, Windows optimization, essential software, browser, cloud sync, and performance tuning. Ready from day one.', image: icon('ph/laptop') },
      { name: 'Complete Laptop Transformation', price: '₹1299', description: 'Ultimate package — Windows reinstall, advanced debloat, gaming setup, developer environment, Linux dual boot, Obsidian sync, and performance tuning.', image: icon('ph/star') },
    ]
  },
  {
    section: 'CUSTOM SERVICES',
    items: [
      { name: 'Small Task', price: '₹99–₹199', description: 'Quick technical requests — single software install, setting adjustment, file organization, or minor troubleshooting. 30-minute tasks.', image: icon('ph/clock') },
      { name: 'Medium Task', price: '₹299–₹599', description: 'Moderate complexity — system configuration, multi-app setup, customization work, or detailed troubleshooting. 1-2 hour tasks.', image: icon('ph/clock') },
      { name: 'Large Task', price: '₹699–₹1499', description: 'Complex projects — full system overhauls, dual boot setups, development environments, or custom configurations. 2+ hour tasks.', image: icon('ph/clock-countdown') },
      { name: 'Special Projects', price: 'Custom Quote', description: 'Unique technical projects outside standard offerings. Custom software setups, automation scripts, specialized configurations — just ask.', image: icon('ph/sparkle') },
    ]
  }
];

export interface FeaturedPackage {
  name: string;
  price: string;
  description: string;
  image: string;
  features: string[];
}

export const featuredPackages: FeaturedPackage[] = [
  {
    name: 'Student Starter Pack',
    price: '₹399',
    description: 'Essential setup for students getting started',
    image: icon('ph/backpack'),
    features: ['Basic Debloat', 'Office Installation', 'Browser Setup', 'Cloud Drive Setup']
  },
  {
    name: 'Coding Starter Pack',
    price: '₹799',
    description: 'Complete development environment setup',
    image: icon('ph/code'),
    features: ['VS Code Setup', 'Git/GitHub Setup', 'Python/Java Setup', 'Linux Installation', 'Obsidian Setup']
  },
  {
    name: 'Complete Laptop Transformation',
    price: '₹1299',
    description: 'Ultimate package for maximum performance',
    image: icon('ph/star'),
    features: ['Windows Installation', 'Advanced Debloat', 'Performance Tuning', 'Gaming Setup', 'Developer Environment', 'Linux Dual Boot', 'Obsidian Sync']
  }
];
