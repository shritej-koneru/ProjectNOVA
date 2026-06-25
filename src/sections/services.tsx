'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services, type ServiceItem } from '@/data/services';
import ScrollReveal from '@/components/scroll-reveal';
import ServiceModal from '@/components/service-modal';

type ServiceKey = keyof typeof services;
const categoryKeys = Object.keys(services) as ServiceKey[];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceKey>(categoryKeys[0]);
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const hash = window.location.hash.toLowerCase().replace('#services:', '') as ServiceKey;
    if (hash && categoryKeys.includes(hash)) setActiveCategory(hash);
    const onHashChange = () => {
      const h = window.location.hash.toLowerCase().replace('#services:', '') as ServiceKey;
      if (h && categoryKeys.includes(h)) setActiveCategory(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const close = useCallback(() => setSelected(null), []);

  const active = services[activeCategory];
  const categoryEntries = Object.entries(services);

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-10 lg:mb-16 text-center">Our Services</h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categoryEntries.map(([key, category]) => {
            const k = key as ServiceKey;
            const isActive = activeCategory === k;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(k)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-accent/60 bg-accent/15 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.15)]'
                    : 'border-surface/30 bg-surface/30 text-muted-foreground hover:border-accent/30 hover:text-accent/70'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category.title}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-accent/20 text-accent' : 'bg-surface/50 text-muted-foreground'
                  }`}>{category.services.length}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                {active.services.length} {active.services.length === 1 ? 'service' : 'services'}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.services.map((svc, i) => (
                <motion.button
                  key={svc.name}
                  onClick={() => setSelected(svc)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative bg-surface/30 border border-surface/30 rounded-2xl p-6 text-left transition-all hover:border-accent/40 hover:bg-surface/60 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.08)]"
                >
                  <div className="h-14 w-14 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={svc.image} alt="" className="h-7 w-7 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2 group-hover:text-accent transition-colors">{svc.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{svc.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ServiceModal
        open={!!selected}
        onClose={close}
        name={selected?.name ?? ''}
        image={selected?.image ?? ''}
        description={selected?.description ?? ''}
      />
    </section>
  );
}
