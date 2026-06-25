'use client';

import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

const socialLinks = [
  { name: 'Instagram', href: '#', icon: 'ph/instagram-logo' },
  { name: 'WhatsApp', href: '#', icon: 'ph/whatsapp-logo' },
  { name: 'YouTube', href: '#', icon: 'ph/youtube-logo' },
  { name: 'Discord', href: '#', icon: 'ph/discord-logo' },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface/30">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
                N
              </div>
              <span className="text-lg font-bold text-accent">{siteConfig.name}</span>
            </Link>
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-surface/30 bg-surface/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent"
                >
                  <img src={`https://api.iconify.design/${s.icon}.svg?color=%23E9D985`} alt={s.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wider text-accent uppercase">Services</h4>
            <nav className="space-y-3">
              <Link href="/services" className="block text-sm text-muted-foreground transition-colors hover:text-accent">All Services</Link>
              <Link href="/services?category=windows" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Windows</Link>
              <Link href="/services?category=optimization" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Optimization</Link>
              <Link href="/services?category=linux" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Linux</Link>
              <Link href="/services?category=gaming" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Gaming</Link>
              <Link href="/services?category=developer" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Developer</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wider text-accent uppercase">Company</h4>
            <nav className="space-y-3">
              <Link href="/about" className="block text-sm text-muted-foreground transition-colors hover:text-accent">About</Link>
              <Link href="/contact" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Contact</Link>
              <Link href="/services#pricing" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Pricing</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-wider text-accent uppercase">Support</h4>
            <nav className="space-y-3">
              <Link href="/contact" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Get Help</Link>
              <Link href="/about" className="block text-sm text-muted-foreground transition-colors hover:text-accent">FAQ</Link>
              <Link href="/about" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Terms</Link>
              <Link href="/about" className="block text-sm text-muted-foreground transition-colors hover:text-accent">Privacy</Link>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface/20 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-xs text-muted-foreground/60">Built for students, by students.</p>
        </div>
      </div>
    </footer>
  );
}
