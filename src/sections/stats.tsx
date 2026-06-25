'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/scroll-reveal';

const highlights = [
  { title: 'Hand-Crafted', description: 'Every setup is done manually in a live session — no scripts, no automation.' },
  { title: 'Student Built', description: 'Designed by students who understand the academic workflow and budget.' },
  { title: 'Full Transparency', description: 'You watch every change live. Restore point created before we start.' },
  { title: 'Results Guaranteed', description: 'If you do not see a difference, we keep tuning until you do.' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-accent mb-4 text-center">Why Students Trust NOVA</h2>
          <p className="text-muted-foreground text-center mb-8 lg:mb-12 max-w-xl mx-auto">
            Real care, real results — built for the student experience
          </p>
        </ScrollReveal>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-accent/15 bg-surface/30 p-6 text-center hover:border-accent/30 transition-colors"
            >
              <h3 className="font-semibold text-accent mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
