'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { services, type ServiceItem } from '@/data/services';
import { menuItems } from '@/data/menu';
import Breadcrumbs from '@/components/breadcrumbs';
import ScrollReveal from '@/components/scroll-reveal';

type ServiceKey = keyof typeof services;
const categoryKeys = Object.keys(services) as ServiceKey[];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function lookupPrice(serviceName: string): string {
  for (const section of menuItems) {
    for (const item of section.items) {
      if (item.name === serviceName) return item.price;
    }
  }
  return '';
}

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceKey | 'all'>('all');

  const allServices = useMemo(() => {
    const result: (ServiceItem & { category: string; categoryKey: ServiceKey; slug: string; price: string })[] = [];
    for (const key of categoryKeys) {
      for (const svc of services[key].services) {
        const slug = slugify(svc.name);
        result.push({
          ...svc,
          category: services[key].title,
          categoryKey: key,
          slug,
          price: lookupPrice(svc.name),
        });
      }
    }
    return result;
  }, []);

  const filtered = useMemo(() => {
    let items = allServices;
    if (activeCategory !== 'all') {
      items = items.filter(s => s.categoryKey === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return items;
  }, [allServices, activeCategory, search]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">Our Services</h1>
          <p className="text-muted-foreground text-lg mb-8 lg:mb-10 max-w-2xl">
            Every service is hand-delivered in a live remote session. You watch, we work.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-1">
              <div className="mb-4">
                <input
                  type="search"
                  placeholder="Search services..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-surface/30 bg-surface/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  activeCategory === 'all' ? 'bg-accent/12 text-accent font-medium' : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                }`}
              >
                All Services
                <span className="float-right text-xs opacity-60">{allServices.length}</span>
              </button>
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    activeCategory === key ? 'bg-accent/12 text-accent font-medium' : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {services[key].title}
                  <span className="float-right text-xs opacity-60">{services[key].services.length}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No services found</p>
                <p className="text-sm mt-1">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((svc, i) => (
                  <div
                    key={svc.slug}
                    className="group relative bg-surface/30 border border-surface/30 rounded-2xl p-5 transition-all hover:border-accent/40 hover:bg-surface/60 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.08)]"
                  >
                    <Link href={`/services/${svc.slug}`} className="block">
                      <div className="h-12 w-12 mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <img src={svc.image} alt="" className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[10px] text-accent/60 mb-1 font-medium uppercase tracking-wider">{svc.category}</div>
                      <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-accent transition-colors">{svc.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">{svc.description}</p>
                    </Link>
                    <div className="flex items-center justify-between">
                      {svc.price && <span className="text-xs font-semibold text-accent">{svc.price}</span>}
                      <Link
                        href={`/contact?service=${encodeURIComponent(svc.name)}`}
                        className="text-xs text-accent/70 hover:text-accent transition-colors font-medium"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
