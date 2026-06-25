'use client';

import { motion } from 'framer-motion';
import { faq } from '@/data/content';
import FAQItem from '@/components/faq-item';
import ScrollReveal from '@/components/scroll-reveal';

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-8 lg:mb-12 text-center">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          {faq.map((item) => (
            <motion.div
              key={item.question}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
