'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/contact-form';
import ScrollReveal from '@/components/scroll-reveal';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-8 lg:mb-12 text-center">
            Get In Touch
          </h2>
        </ScrollReveal>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-muted-foreground text-center mb-8 lg:mb-12 max-w-xl mx-auto">
            Have questions or ready to transform your laptop? Reach out to us
            using the form below, and we'll get back to you shortly.
          </p>
        </motion.div>
        <motion.div
          className="mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
