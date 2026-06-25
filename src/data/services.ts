// Services data with descriptions and placeholder images
const placeholders = {
  windows: 'https://api.iconify.design/ph/windows-logo.svg?color=%23E9D985&height=60',
  setup: 'https://api.iconify.design/ph/gear-six.svg?color=%23E9D985&height=60',
  tune: 'https://api.iconify.design/ph/gauge.svg?color=%23E9D985&height=60',
  brush: 'https://api.iconify.design/ph/paint-brush.svg?color=%23E9D985&height=60',
  code: 'https://api.iconify.design/ph/code.svg?color=%23E9D985&height=60',
  terminal: 'https://api.iconify.design/ph/terminal.svg?color=%23E9D985&height=60',
  gamepad: 'https://api.iconify.design/ph/game-controller.svg?color=%23E9D985&height=60',
  wrench: 'https://api.iconify.design/ph/wrench.svg?color=%23E9D985&height=60',
  sparkle: 'https://api.iconify.design/ph/sparkle.svg?color=%23E9D985&height=60',
};

export interface ServiceItem {
  name: string;
  description: string;
  image: string;
}

export interface ServiceCategory {
  title: string;
  services: ServiceItem[];
}

export const services: Record<string, ServiceCategory> = {
  windows: {
    title: 'WINDOWS',
    services: [
      { name: 'Windows Installation', description: 'Clean install of the latest Windows OS with optimized settings. All bloatware removed, privacy tweaks applied, and essential updates pre-installed for a fresh start.', image: placeholders.windows },
      { name: 'Windows Reinstallation', description: 'Full system wipe and reinstall. Your laptop gets a factory-fresh Windows experience with all the latest drivers, security patches, and performance tweaks.', image: placeholders.windows },
      { name: 'Windows License Setup', description: 'Activate your Windows with a genuine license. We handle the product key installation, activation troubleshooting, and verification so everything is official.', image: placeholders.windows },
      { name: 'Microsoft Office Installation', description: 'Full Office suite installation including Word, Excel, PowerPoint, and OneNote. Configured with your account, default templates, and sync settings.', image: placeholders.setup },
      { name: 'Office License Setup', description: 'Activate Microsoft Office with your license key or subscription. We ensure all apps are authenticated, updated, and ready for academic work.', image: placeholders.setup },
      { name: 'Driver Installation', description: 'Install and update all critical drivers — chipset, GPU, audio, network, and peripherals. Ensures maximum hardware compatibility and performance.', image: placeholders.setup },
      { name: 'Windows Updates', description: 'Bring your system fully up to date with all critical and optional Windows Updates. We ensure no pending updates linger in the background.', image: placeholders.windows },
      { name: 'Software Cleanup', description: 'Remove bloatware, pre-installed junk, and unnecessary background services. Free up disk space and reclaim system resources for what matters.', image: placeholders.tune },
    ]
  },
  optimization: {
    title: 'OPTIMIZATION',
    services: [
      { name: 'Basic Debloat', description: 'Remove common bloatware, disable startup junk, and clean temporary files. A quick refresh that makes an immediate difference in boot speed and responsiveness.', image: placeholders.tune },
      { name: 'Advanced Debloat', description: 'Deep system-wide cleanup including disabled telemetry, scheduled tasks, background apps, and hidden Windows features you never use. Maximum resource recovery.', image: placeholders.tune },
      { name: 'New Laptop Cleanup', description: 'Your brand new laptop comes with 20+ apps you never asked for. We strip away all manufacturer bloatware, trial software, and promotional clutter.', image: placeholders.tune },
      { name: 'Deep Cleanup', description: 'Comprehensive system audit and cleanup. Removes temp files, orphaned registry entries, old updates, cache files, and unused language packs.', image: placeholders.tune },
      { name: 'Startup Optimization', description: 'Audit and optimize everything that runs at boot. Reduce startup time from minutes to seconds by disabling non-essential services and delayed startup tasks.', image: placeholders.tune },
      { name: 'Browser Optimization', description: 'Configure your browser for speed and privacy. Remove extensions, disable tracking, enable hardware acceleration, and set optimal cache/prefetch settings.', image: placeholders.setup },
      { name: 'Performance Tuning', description: 'Fine-tune Windows visual effects, processor scheduling, virtual memory, power plan, and background services for maximum performance in your workflow.', image: placeholders.tune },
    ]
  },
  customization: {
    title: 'CUSTOMIZATION',
    services: [
      { name: 'Wallpapers', description: 'Curated high-resolution wallpapers matching your aesthetic — minimal, cyberpunk, nature, anime, or abstract. Ultrawide and dual-monitor supported.', image: placeholders.brush },
      { name: 'Themes', description: 'Complete visual theme overhaul including window borders, accent colors, sound schemes, and system fonts. Consistent, premium look across the entire OS.', image: placeholders.brush },
      { name: 'Icons', description: 'Replace default system icons with custom icon packs. Consistent style across desktop, file explorer, taskbar, and start menu for a cohesive look.', image: placeholders.brush },
      { name: 'Cursor Packs', description: 'Custom cursor sets with smooth animations and modern designs. Match your setup aesthetic from minimalist to gaming-focused styles.', image: placeholders.brush },
      { name: 'Rainmeter', description: 'Beautiful desktop widgets — system monitors, clocks, music visualizers, weather, and calendar. Fully customized to match your chosen theme.', image: placeholders.brush },
      { name: 'Widgets', description: 'Launcher widgets, app shortcuts, folder organization tools, and desktop notes. Boost productivity with quick-access information on your desktop.', image: placeholders.brush },
      { name: 'Taskbar Customization', description: 'Center taskbar icons, transparent taskbar, custom colors, icon grouping, and quick launch toolbar. A clean, modern taskbar experience.', image: placeholders.brush },
    ]
  },
  productivity: {
    title: 'PRODUCTIVITY',
    services: [
      { name: 'Obsidian Setup', description: 'Complete Obsidian vault setup with folder structure, essential plugins, and a beginner-friendly template. Your second brain, ready to go.', image: placeholders.setup },
      { name: 'Obsidian Sync', description: 'Configure Obsidian Sync across all your devices — laptop, phone, and tablet. Your notes available everywhere with version history and encryption.', image: placeholders.setup },
      { name: 'Study Productivity Pack', description: 'Full productivity suite including Obsidian, Todoist, Notion, calendar sync, habit tracker, and Pomodoro timer. Everything a student needs, pre-configured.', image: placeholders.setup },
      { name: 'Cloud Drive Setup', description: 'Set up Google Drive, OneDrive, or Dropbox with selective sync, automatic backups, and folder organization. Access your files from anywhere.', image: placeholders.setup },
      { name: 'Multi Device Sync', description: 'Synchronize bookmarks, passwords, notes, settings, and files across your laptop, phone, and tablet. Seamless workflow across all devices.', image: placeholders.setup },
    ]
  },
  developer: {
    title: 'DEVELOPER',
    services: [
      { name: 'VS Code Setup', description: 'VS Code configured with essential extensions, themes, settings sync, and language-specific tooling. Ready for web, Python, or any stack.', image: placeholders.code },
      { name: 'Git Setup', description: 'Git installed and configured with your profile, SSH keys, global gitignore, aliases, and essential tooling. Version control, ready to use.', image: placeholders.code },
      { name: 'GitHub Setup', description: 'GitHub CLI configured, SSH authentication set up, and repositories cloned. Push, pull, and collaborate from day one.', image: placeholders.code },
      { name: 'Python', description: 'Python environment with pyenv, virtualenv, pip, and essential packages for data science, web dev, or automation. Jupyter notebook included.', image: placeholders.code },
      { name: 'Java', description: 'JDK, Maven/Gradle, and IntelliJ or VS Code configured. Complete Java development environment for academic or professional projects.', image: placeholders.code },
      { name: 'C/C++', description: 'MinGW, GCC, or MSVC toolchain with CMake and debugger configured. Build and compile C/C++ projects right out of the gate.', image: placeholders.code },
      { name: 'Android Studio', description: 'Android Studio with SDK, emulator, and essential plugins. Configured Gradle builds, ADB debugging, and device emulation for Android development.', image: placeholders.code },
      { name: 'Ollama', description: 'Local AI setup with Ollama — run LLMs like Llama, Mistral, or Gemma on your laptop. No cloud dependency, full privacy, offline AI.', image: placeholders.code },
    ]
  },
  linux: {
    title: 'LINUX',
    services: [
      { name: 'Ubuntu', description: 'Ubuntu installation with essential apps, drivers, and developer tools. Clean, optimized, and ready for daily use including gaming and development.', image: placeholders.terminal },
      { name: 'Linux Mint', description: 'Linux Mint setup with Cinnamon desktop. Familiar interface, multimedia codecs, and all the tools you need for a smooth transition from Windows.', image: placeholders.terminal },
      { name: 'Fedora', description: 'Fedora Workstation with latest packages and developer-focused configuration. Great for those who want cutting-edge software with stability.', image: placeholders.terminal },
      { name: 'Manjaro', description: 'Arch-based Manjaro with AUR access and rolling updates. The power of Arch with user-friendly configuration and all essential tools pre-installed.', image: placeholders.terminal },
      { name: 'Dual Boot', description: 'Set up Windows + Linux dual boot with GRUB bootloader. Proper partition sizing, boot order configuration, and seamless OS switching.', image: placeholders.terminal },
      { name: 'Linux Customization', description: 'Desktop environment themes, icon packs, terminal customization with starship/fish, window manager tweaks, and productivity tools tailored to your workflow.', image: placeholders.terminal },
    ]
  },
  gaming: {
    title: 'GAMING',
    services: [
      { name: 'Steam Setup', description: 'Steam installed and configured with your library, download settings, in-game overlay, and cloud save sync. Ready for your gaming library.', image: placeholders.gamepad },
      { name: 'Epic Games Setup', description: 'Epic Games Launcher configured with your account, game library, and download optimization. Claim and play your free games immediately.', image: placeholders.gamepad },
      { name: 'Discord Setup', description: 'Discord installed with push-to-talk, noise suppression, game activity status, and server organization. Configured for clear voice comms while gaming.', image: placeholders.gamepad },
      { name: 'Gaming Optimization', description: 'GPU driver tuning, graphics settings optimization, background process cleanup, and game mode configuration for maximum FPS in your favorite titles.', image: placeholders.gamepad },
      { name: 'Driver Optimization', description: 'Latest GPU drivers with optimal control panel settings. NVIDIA ShadowPlay, AMD Adrenalin, or Intel Arc tuned for performance over quality.', image: placeholders.gamepad },
      { name: 'Game Installation', description: 'Install any game from Steam, Epic, or other platforms. Large game downloads managed efficiently with proper install locations and settings.', image: placeholders.gamepad },
    ]
  },
  troubleshooting: {
    title: 'TROUBLESHOOTING',
    services: [
      { name: 'Windows Not Booting', description: 'Diagnose and repair boot issues including black screen, infinite loading, boot loop, and corrupt system files. Get your system running again.', image: placeholders.wrench },
      { name: 'Blue Screen', description: 'Analyze BSOD error codes, dump files, and crash logs. Identify root cause and apply fixes — driver conflicts, hardware issues, or corrupt system files.', image: placeholders.wrench },
      { name: 'Driver Issues', description: 'Fix driver conflicts, yellow exclamation marks, device not working, and outdated drivers. Roll back, update, or replace problematic drivers.', image: placeholders.wrench },
      { name: 'Storage Issues', description: 'Full disk, slow file access, partition errors, and disk health checks. Clean up, defrag/trim, and optimize your storage for speed and capacity.', image: placeholders.wrench },
      { name: 'Software Errors', description: 'Fix application crashes, installation errors, DLL missing errors, and compatibility issues. Get your software working reliably again.', image: placeholders.wrench },
      { name: 'General Troubleshooting', description: 'Any technical issue not covered above. WiFi problems, peripheral issues, performance degradation, or just a slow laptop that needs expert attention.', image: placeholders.wrench },
    ]
  },
  customServices: {
    title: 'CUSTOM SERVICES',
    services: [
      { name: 'Any technical request', description: 'Have something unique in mind? Any technical service, configuration, or setup not listed — just ask. We will evaluate and provide a custom solution.', image: placeholders.sparkle },
    ]
  }
};

export const allServices = Object.values(services).flatMap(category =>
  category.services.map(service => ({
    name: service.name,
    category: category.title
  }))
);

// Descriptions keyed by service name for easy lookup
export const serviceDetails: Record<string, ServiceItem> = {};
for (const cat of Object.values(services)) {
  for (const svc of cat.services) {
    serviceDetails[svc.name] = svc;
  }
}
