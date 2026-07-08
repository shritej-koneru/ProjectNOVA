'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/breadcrumbs';
import ScrollReveal from '@/components/scroll-reveal';
import { termsSections } from '@/data/terms';

export default function TermsPage() {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedIds(termsSections.map((s) => s.id));
  const collapseAll = () => setExpandedIds([]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />

        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-3">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Please read these terms carefully before requesting any service.
          </p>
        </ScrollReveal>

        <div className="flex gap-3 mb-8">
          <button
            onClick={expandAll}
            className="rounded-full border border-accent/30 bg-accent/12 px-5 py-2.5 text-sm font-medium text-accent shadow-sm transition-all hover:bg-accent/20 hover:shadow-accent/10 hover:shadow-md active:scale-[0.97]"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="rounded-full border border-surface/30 bg-surface/20 px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-accent/25 hover:text-accent hover:bg-accent/8 hover:shadow-md active:scale-[0.97]"
          >
            Collapse All
          </button>
        </div>

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
                <h2 className="font-semibold text-accent pr-4">{section.title}</h2>
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
    </div>
  );
}
