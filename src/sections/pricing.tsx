'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, featuredPackages } from '@/data/menu';
import type { MenuItem } from '@/data/menu';
import ScrollReveal from '@/components/scroll-reveal';
import ServiceModal from '@/components/service-modal';
import FilterModal from '@/components/filter-modal';
import type { FilterState } from '@/components/filter-modal';

interface MenuItemWithSection extends MenuItem {
  section: string;
}

function parsePrice(price: string): number | null {
  const m = price.match(/₹(\d+)/);
  if (!m) return null;
  const vals = m[1].split('–').map(Number).filter(n => !isNaN(n));
  return vals.length > 0 ? Math.min(...vals) : null;
}

function matchesPriceRange(price: string, range: string | null): boolean {
  if (!range) return true;
  const num = parsePrice(price);
  if (num === null) return range === 'custom';
  switch (range) {
    case 'under200': return num < 200;
    case '200to499': return num >= 200 && num <= 499;
    case '500plus': return num >= 500;
    case 'custom': return false;
    default: return true;
  }
}

export default function Pricing() {
  const sections = useMemo(() => [{ section: 'ALL' } as const, ...menuItems], []);
  const [activeSection, setActiveSection] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ priceRange: null, sort: null });
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const closeFilter = useCallback(() => setFilterOpen(false), []);

  const allItems = useMemo(() => menuItems.flatMap(s => s.items.map(item => ({ ...item, section: s.section }))), []);

  const filteredItems = useMemo(() => {
    let items: MenuItemWithSection[] = activeSection === 'ALL'
      ? [...allItems]
      : (menuItems.find(s => s.section === activeSection)?.items.map(item => ({ ...item, section: activeSection })) ?? []);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q));
    }

    items = items.filter(item => matchesPriceRange(item.price, filters.priceRange));

    if (filters.sort) {
      items = [...items].sort((a, b) => {
        switch (filters.sort) {
          case 'az': return a.name.localeCompare(b.name);
          case 'za': return b.name.localeCompare(a.name);
          case 'priceLow': return (parsePrice(a.price) ?? Infinity) - (parsePrice(b.price) ?? Infinity);
          case 'priceHigh': return (parsePrice(b.price) ?? 0) - (parsePrice(a.price) ?? 0);
          default: return 0;
        }
      });
    }
    return items;
  }, [activeSection, searchQuery, filters, allItems]);

  const hasActiveFilters = filters.priceRange !== null || filters.sort !== null;
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? filteredItems : filteredItems.slice(0, 12);
  const hasMore = filteredItems.length > 12;

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-accent mb-6 text-center">Pricing & Packages</h2>
        </ScrollReveal>

        {/* Search + Filter bar */}
        <div className="flex items-center gap-3 max-w-xl mx-auto mb-8">
          <div className="relative flex-1">
            <img
              src="https://api.iconify.design/ph/magnifying-glass.svg?color=%2394A3B8&height=16"
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-surface/30 border border-surface/30 rounded-xl text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-accent text-xs">✕</button>
            )}
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${
              hasActiveFilters
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-surface/30 bg-surface/30 text-muted-foreground hover:border-accent/30 hover:text-accent/70'
            }`}
          >
            <img src={`https://api.iconify.design/ph/funnel.svg?color=${hasActiveFilters ? 'E9D985' : '94A3B8'}&height=16`} alt="" className="h-4 w-4" />
            Filters
            {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {sections.map((s) => {
            const isActive = activeSection === s.section;
            return (
              <motion.button
                key={s.section}
                onClick={() => setActiveSection(s.section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-xl border px-4 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-accent/60 bg-accent/15 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.15)]'
                    : 'border-surface/30 bg-surface/30 text-muted-foreground hover:border-accent/30 hover:text-accent/70'
                }`}
              >
                {s.section === 'ALL' ? 'All Services' : s.section}
              </motion.button>
            );
          })}
        </div>

        {/* Filtered items */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-12" role="status" aria-live="polite">No services match your search or filter criteria.</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${searchQuery}-${filters.priceRange}-${filters.sort}-${showAll}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mb-16"
              role="list"
              aria-label="Filtered services"
              aria-live="polite"
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayItems.map((item, i) => (
                <motion.button
                  key={`${item.section}::${item.name}`}
                  onClick={() => setSelected(item)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.025 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative bg-surface/30 border border-surface/30 rounded-2xl p-6 text-left transition-all hover:border-accent/40 hover:bg-surface/60 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.08)]"
                  role="listitem"
                >
                  <div className="h-12 w-12 mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={item.image} alt="" className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{item.name}</h4>
                    <span className="shrink-0 text-xs font-medium text-accent/70">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.description}</p>
                </motion.button>
              ))}
              </div>
              {hasMore && !showAll && (
                <motion.div className="flex justify-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <button
                    onClick={() => setShowAll(true)}
                    className="rounded-full border border-accent/30 bg-accent/8 px-8 py-3 text-sm font-medium text-accent transition-all hover:bg-accent/15 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Load More ({filteredItems.length - 12} remaining)
                  </button>
                </motion.div>
              )}
              {showAll && hasMore && (
                <motion.div className="flex justify-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    onClick={() => setShowAll(false)}
                    className="rounded-full border border-surface/30 bg-surface/30 px-8 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-accent hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Show Less
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Featured packages */}
        <ScrollReveal>
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-accent mb-6">Featured Packages</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPackages.map((pkg, i) => (
                <motion.button
                  key={pkg.name}
                  onClick={() => setSelected({
                    name: pkg.name,
                    price: pkg.price,
                    description: pkg.description + '\n\n' + pkg.features.map(f => '• ' + f).join('\n'),
                    image: pkg.image
                  })}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group bg-surface/30 border border-surface/30 rounded-2xl p-6 text-left transition-all hover:border-accent/40 hover:bg-surface/60 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.08)]"
                >
                  <div className="h-14 w-14 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={pkg.image} alt="" className="h-7 w-7 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-semibold text-accent mb-1">{pkg.name}</h4>
                  <p className="text-accent/50 text-sm mb-3">{pkg.price}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pkg.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ServiceModal open={!!selected} onClose={close} name={selected?.name ?? ''} image={selected?.image ?? ''} description={(selected && 'features' in selected && selected.features) ? selected.description : selected?.description ?? ''} />
      <FilterModal open={filterOpen} onClose={closeFilter} filters={filters} onApply={setFilters} onClear={() => setFilters({ priceRange: null, sort: null })} />
    </section>
  );
}
