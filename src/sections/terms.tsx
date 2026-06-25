'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { termsSections } from '@/data/terms';
import ScrollReveal from '@/components/scroll-reveal';

export default function Terms() {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="terms" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-8 lg:mb-12 text-center">
            Terms of Service
          </h2>
        </ScrollReveal>
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
            hidden: {},
          }}
        >
          {termsSections.map((section) => (
            <motion.div
              key={section.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="border border-surface/30 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(section.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/50 transition-colors min-h-[48px] text-left"
                aria-expanded={expandedIds.includes(section.id)}
                aria-controls={`terms-content-${section.id}`}
              >
                <h3 className="font-semibold text-accent pr-4">{section.title}</h3>
                <span className="text-muted-foreground text-sm shrink-0">
                  {expandedIds.includes(section.id) ? '▲' : '▼'}
                </span>
              </button>
              {expandedIds.includes(section.id) && (
                <motion.div
                  id={`terms-content-${section.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="px-6 pb-4 text-muted-foreground space-y-3"
                >
                  {section.content.map((line, lineIndex) => (
                    <p key={`${section.id}-${lineIndex}`}>{line}</p>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
