'use client';

import { Suspense } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import ScrollReveal from '@/components/scroll-reveal';
import ContactForm from '@/components/contact-form';

const socials = [
  { name: 'Instagram', href: '#', icon: 'ph/instagram-logo', handle: '@projectnova' },
  { name: 'WhatsApp', href: '#', icon: 'ph/whatsapp-logo', handle: '+91 98765 43210' },
  { name: 'YouTube', href: '#', icon: 'ph/youtube-logo', handle: 'Project NOVA' },
  { name: 'Discord', href: '#', icon: 'ph/discord-logo', handle: 'nova community' },
  { name: 'Email', href: '#', icon: 'ph/envelope', handle: 'hello@projectnova.in' },
];

const faqItems = [
  { q: 'How do I book a service?', a: 'Fill out the contact form or message us on WhatsApp/Instagram. We will get back to you within 24 hours to schedule a session.' },
  { q: 'Is remote service safe?', a: 'Yes. We create a system restore point before any changes. You can watch the entire session live. Nothing happens without your approval.' },
  { q: 'What do I need for remote service?', a: 'A stable internet connection and a few hours of free time. We use TeamViewer or AnyDesk — you share access and watch everything live.' },
  { q: 'Do I need to back up my files?', a: 'Yes. Before any service, back up important files. We can guide you on what to back up, but the backup itself is your responsibility.' },
  { q: 'What if I am not satisfied?', a: 'Let us know within 48 hours and we will fix any issues at no additional cost. We verify everything works before marking a service complete.' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">Get In Touch</h1>
          <p className="text-lg text-muted-foreground mb-8 lg:mb-10 max-w-2xl">
            Ready to transform your laptop? Fill out the form or reach out on social media.
          </p>
        </ScrollReveal>

        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="rounded-2xl border border-accent/15 bg-surface/30 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-accent">Connect With Us</h2>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="flex items-center gap-3 group"
                >
                  <div className="h-10 w-10 rounded-full border border-surface/30 bg-surface/40 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                    <img src={`https://api.iconify.design/${s.icon}.svg?color=%23E9D985`} alt={s.name} className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-accent/15 bg-surface/30 p-6">
              <h2 className="text-lg font-semibold text-accent mb-4">Quick FAQ</h2>
              <div className="space-y-3">
                {faqItems.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-accent transition-colors list-none flex items-center gap-2">
                      <span className="text-accent/60 group-open:rotate-90 transition-transform">&rsaquo;</span>
                      {item.q}
                    </summary>
                    <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed pl-5">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-accent/15 bg-surface/30 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-accent mb-6">Send Us a Message</h2>
            <Suspense fallback={<div className="h-96 rounded-xl bg-surface/20 animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
