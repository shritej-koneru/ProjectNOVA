'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/breadcrumbs';
import ScrollReveal from '@/components/scroll-reveal';
import { siteConfig } from '@/data/site-config';

const values = [
  { title: 'Student-First', description: 'Built by students, for students. We understand the academic grind and budget.' },
  { title: 'Transparent', description: 'No hidden fees, no automated scripts. Every change documented and approved.' },
  { title: 'Premium Quality', description: 'Hand-crafted setups with attention to every detail. Not mass-produced.' },
  { title: 'Always Learning', description: 'We stay current with the latest tech so your setup is always ahead.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">About Project NOVA</h1>
          <p className="text-lg text-muted-foreground mb-8 lg:mb-12 max-w-2xl">{siteConfig.description}</p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 mb-12 lg:mb-16">
          <div className="rounded-2xl border border-accent/15 bg-surface/30 p-8">
            <h2 className="text-xl font-bold text-accent mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every student deserves a laptop that works as hard as they do. We transform slow, cluttered machines into powerful, 
              personalized workstations — because your laptop should accelerate your potential, not hold you back.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/15 bg-surface/30 p-8">
            <h2 className="text-xl font-bold text-accent mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Project NOVA started in a college dorm room. We saw fellow students struggling with bloated laptops, 
              broken dev environments, and setups that made studying harder. So we fixed them — one laptop at a time.
            </p>
          </div>
        </div>

        <ScrollReveal>
          <h2 className="text-2xl font-bold text-accent mb-8 text-center">What We Stand For</h2>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 mb-12 lg:mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-accent/15 bg-surface/30 p-6"
            >
              <h3 className="font-semibold text-accent mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>

        <ScrollReveal>
          <h2 className="text-2xl font-bold text-accent mb-8 text-center">Our Promise</h2>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-3 mb-12 lg:mb-16">
          {[
            { title: 'System Restore Point', description: 'Before any customization, we create a full system restore point. Your data stays intact and you can revert anytime.' },
            { title: 'Live Session Access', description: 'You watch everything in real-time via remote desktop. No blind work — every change is visible and approved by you.' },
            { title: '48-Hour Satisfaction Guarantee', description: 'Not happy with something? Let us know within 48 hours and we fix it at no extra cost. No questions asked.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-accent/15 bg-surface/30 p-6"
            >
              <h3 className="font-semibold text-accent mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/8 to-secondary/5 p-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to transform your laptop?</h2>
          <p className="text-muted-foreground mb-6">Join 500+ students who already upgraded their setup.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
          >
            Get Started
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ScrollReveal>
          <div className="rounded-2xl border border-accent/15 bg-surface/30 p-8 text-center">
            <h2 className="text-2xl font-bold text-accent mb-8">Who you are working with?</h2>
            <img src="https://github.com/shritej-koneru.png" alt="Shritej" className="h-20 w-20 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-1">Shritej</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Every repair, tune-up, and tweak is done personally by Shritej — no scripts, no automation. You get hands-on, human attention.
            </p>
            <a
              href="https://bit.ly/shritej-koneru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Portfolio
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
