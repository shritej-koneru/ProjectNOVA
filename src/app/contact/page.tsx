'use client';

import { Suspense } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import ScrollReveal from '@/components/scroll-reveal';
import ContactForm from '@/components/contact-form';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/project_novaservices/', icon: 'ph/instagram-logo', handle: '@project_novaservices' },
  { name: 'WhatsApp', href: 'https://wa.me/919704149889', icon: 'ph/whatsapp-logo', handle: '9704149889' },
  { name: 'Email', href: '#', icon: 'ph/envelope', handle: 'projectnovaservices@gmail.com' },
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
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col justify-center">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <ScrollReveal>
          <h1 className="text-3xl md:text-5xl font-bold text-accent mb-3">Get In Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 lg:mb-14 max-w-2xl">
            Ready to transform your laptop? Fill out the form or reach out on social media.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 lg:gap-12 xl:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <div className="group relative overflow-visible rounded-2xl bg-surface/30">
              <GlowingEffect className="rounded-[inherit]" glow disabled={false} spread={14} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="p-6 lg:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-accent">Connect With Us</h2>
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="h-11 w-11 rounded-full border border-surface/30 bg-surface/40 flex items-center justify-center text-accent group-hover:border-accent/30 transition-colors shrink-0">
                      <img src={`https://api.iconify.design/${s.icon}.svg?color=currentColor`} alt={s.name} className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="group relative overflow-visible rounded-2xl bg-surface/30">
              <GlowingEffect className="rounded-[inherit]" glow disabled={false} spread={14} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="p-6 lg:p-8">
                <h2 className="text-lg font-semibold text-accent mb-5">Quick FAQ</h2>
                <div className="space-y-3">
                  {faqItems.map((item) => (
                    <details key={item.q} className="group">
                      <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-accent transition-colors list-none flex items-center gap-2">
                        <span className="text-accent/60 group-open:rotate-90 transition-transform shrink-0">&rsaquo;</span>
                        {item.q}
                      </summary>
                      <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed pl-5">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-visible rounded-2xl bg-surface/30">
            <GlowingEffect className="rounded-[inherit]" glow disabled={false} spread={14} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="p-6 lg:p-10">
              <h2 className="text-lg font-semibold text-accent mb-6">Send Us a Message</h2>
              <Suspense fallback={<div className="h-96 rounded-xl bg-surface/20 animate-pulse" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
