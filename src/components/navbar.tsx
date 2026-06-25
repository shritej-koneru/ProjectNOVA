'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navigation, logo, cta } from '@/data/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/70 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-surface/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 max-w-7xl">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
            N
          </div>
          <span className="text-lg font-bold text-accent">{logo.text}</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((nav) => {
            const isActive = pathname === nav.href || pathname.startsWith(nav.href + '/');
            if ('children' in nav && nav.children) {
              const isOpen = openDropdown === nav.name;
              return (
                <div
                  key={nav.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(nav.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={nav.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/12 text-accent'
                        : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {nav.name}
                    <svg className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                  </Link>
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-surface/20 bg-surface/90 backdrop-blur-xl shadow-2xl p-1.5 space-y-0.5">
                      {nav.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            pathname === child.href
                              ? 'bg-accent/12 text-accent'
                              : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={nav.name}
                href={nav.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent/12 text-accent'
                    : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                }`}
              >
                {nav.name}
              </Link>
            );
          })}
          <Link
            href={cta.href}
            className="ml-3 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            {cta.text}
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-muted-foreground hover:text-accent p-2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative ml-auto w-full max-w-xs bg-surface/95 backdrop-blur-md border-l border-surface/20 p-6 space-y-1 overflow-y-auto">
            {navigation.map((nav) => {
              if ('children' in nav && nav.children) {
                return (
                  <div key={nav.name} className="space-y-1">
                    <Link
                      href={nav.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                        pathname === nav.href
                          ? 'bg-accent/12 text-accent'
                          : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      {nav.name}
                    </Link>
                    <div className="ml-4 space-y-0.5 border-l border-surface/20 pl-3">
                      {nav.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2.5 rounded-lg text-sm transition-colors min-h-[40px] flex items-center ${
                            pathname === child.href
                              ? 'bg-accent/12 text-accent'
                              : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={nav.name}
                  href={nav.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    pathname === nav.href
                      ? 'bg-accent/12 text-accent'
                      : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {nav.name}
                </Link>
              );
            })}
            <Link
              href={cta.href}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 mt-4 min-h-[44px] flex items-center justify-center"
            >
              {cta.text}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
