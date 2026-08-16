'use client';

import { motion } from 'framer-motion';
import { standardFacts } from '@/data/content';
import ScrollReveal from '@/components/scroll-reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const doubled = [...standardFacts, ...standardFacts];

  return (
    <section id="testimonials" className="py-20 bg-background overflow-hidden relative">
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-accent text-center">The Nova Standard</h2>
          <p className="text-muted-foreground text-center mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            What you can count on from every session — no fine print.
          </p>
        </ScrollReveal>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        {reducedMotion ? (
          <div className="flex flex-wrap justify-center gap-6 px-6">
            {standardFacts.map((text, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] overflow-visible bg-surface/30 border border-surface/30 rounded-xl p-6 text-center"
              >
                <GlowingEffect className="rounded-[inherit]" glow disabled={false} spread={18} proximity={64} inactiveZone={0.01} borderWidth={4} />
                <span aria-hidden="true" className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 36,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ width: 'max-content' }}
          >
            {doubled.map((text, i) => (
              <div
                key={`${text}-${i}`}
                className="group relative flex-shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] overflow-visible bg-surface/30 border border-surface/30 rounded-xl p-6 text-center"
              >
                <GlowingEffect className="rounded-[inherit]" glow disabled={false} spread={18} proximity={64} inactiveZone={0.01} borderWidth={4} />
                <span aria-hidden="true" className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
