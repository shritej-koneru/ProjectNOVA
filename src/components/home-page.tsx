'use client';

import Hero from '@/sections/hero';
import ScrollStory from '@/sections/scroll-story';
import Stats from '@/sections/stats';
import Testimonials from '@/sections/testimonials';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/data/services';
import ScrollReveal from '@/components/scroll-reveal';
import WelcomePopup from '@/components/welcome-popup';

const featuredServices = (() => {
  const result: { name: string; description: string; image: string; category: string; slug: string }[] = [];
  const categories = Object.values(services);
  for (const cat of categories) {
    for (const svc of cat.services.slice(0, 2)) {
      const slug = svc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      result.push({ ...svc, category: cat.title, slug });
      if (result.length >= 6) break;
    }
    if (result.length >= 6) break;
  }
  return result;
})();

export default function HomePage() {
  return (
    <>
      <WelcomePopup />
      <Hero />
      <ScrollStory />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-accent mb-4 text-center">Featured Services</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Our most popular laptop transformation services
            </p>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/services/${svc.slug}`}
                  className="group block bg-surface/30 border border-surface/30 rounded-2xl p-6 transition-all hover:border-accent/40 hover:bg-surface/60 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.08)]"
                >
                  <div className="h-14 w-14 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={svc.image} alt="" className="h-7 w-7 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-xs text-accent/60 mb-1.5 font-medium uppercase tracking-wider">{svc.category}</div>
                  <h4 className="font-semibold text-foreground text-sm mb-2 group-hover:text-accent transition-colors">{svc.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{svc.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-8 py-3.5 text-accent font-medium hover:bg-accent/10 transition-all"
            >
              View All Services
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <Stats />

      <Testimonials />

      <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Ready To Transform Your Laptop?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Get your setup optimized, customized, and ready for anything.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 sm:px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
            >
              Book My Setup
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
