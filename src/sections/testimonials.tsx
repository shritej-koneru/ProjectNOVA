'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/content';
import ScrollReveal from '@/components/scroll-reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-accent text-center">What Students Tell Us</h2>
        </ScrollReveal>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        {reducedMotion ? (
          <div className="flex flex-wrap justify-center gap-6 px-6">
            {testimonials.map((text, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] bg-surface/30 border border-surface/30 rounded-xl p-6 text-center"
              >
                <p className="text-muted-foreground italic text-sm leading-relaxed">&ldquo;{text}&rdquo;</p>
                <div className="mt-4 flex justify-center gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="h-2 w-2 rounded-full bg-accent/40" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ width: 'max-content' }}
          >
            {doubled.map((text, i) => (
              <div
                key={`${text}-${i}`}
                className="flex-shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] bg-surface/30 border border-surface/30 rounded-xl p-6 text-center"
              >
                <p className="text-muted-foreground italic text-sm leading-relaxed">&ldquo;{text}&rdquo;</p>
                <div className="mt-4 flex justify-center gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="h-2 w-2 rounded-full bg-accent/40" />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
