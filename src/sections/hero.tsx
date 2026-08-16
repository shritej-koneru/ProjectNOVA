'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { hero } from '@/data/content';
import { TextReveal } from '@/components/ui/cascade-text';

const ShaderAnimation = dynamic(() => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return Promise.resolve({ default: () => <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #0466c8 0%, #001845 40%, #222E50 100%)' }} /> });
  }
  return import('@/components/ui/shader-animation').then(m => ({ default: m.ShaderAnimation }));
}, { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-0">
        <ShaderAnimation />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
        <div className="text-center lg:text-left">
          <motion.p
            className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-accent/80"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Project N.O.V.A.
          </motion.p>
          <motion.h1
            className="flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 44, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextReveal
              as="span"
              text="Transform Your"
              hoverText="Refresh Every"
              fontSize="clamp(2.8rem, 8vw, 4.75rem)"
              color="#e8edf3"
              hoverPalette={["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6", "#0077b6"]}
              staggerDelay={18}
              duration={280}
              direction="up"
              wrap
              className="!font-heading !font-bold !normal-case !tracking-tight leading-[0.9]"
            />
            <TextReveal
              as="span"
              text="Laptop."
              hoverText="Component."
              fontSize="clamp(2.8rem, 8vw, 4.75rem)"
              color="#e8edf3"
              hoverPalette={["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6", "#0077b6"]}
              staggerDelay={18}
              duration={280}
              direction="up"
              wrap
              className="!font-heading !font-bold !normal-case !tracking-tight leading-[0.9]"
            />
            <TextReveal
              as="span"
              text="Unlock Its"
              hoverText="Maximize Daily"
              fontSize="clamp(2.8rem, 8vw, 4.75rem)"
              color="#0077b6"
              hoverPalette={["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"]}
              staggerDelay={18}
              duration={280}
              direction="up"
              wrap
              className="!font-heading !font-bold !normal-case !tracking-tight leading-[0.9]"
            />
            <TextReveal
              as="span"
              text="Potential."
              hoverText="Performance."
              fontSize="clamp(2.8rem, 8vw, 4.75rem)"
              color="#0077b6"
              hoverPalette={["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"]}
              staggerDelay={18}
              duration={280}
              direction="up"
              wrap
              className="!font-heading !font-bold !normal-case !tracking-tight leading-[0.9]"
            />
          </motion.h1>
          <motion.p
            className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground lg:mx-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.description}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-[#0077b6] px-6 sm:px-8 py-3.5 font-semibold text-white shadow-[0_0_40px_rgba(0,119,182,0.45)] transition hover:bg-[#00659e] hover:shadow-[0_0_60px_rgba(0,119,182,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {hero.primaryCta}
                <span className="h-2.5 w-2.5 rounded-full bg-white/80 animate-dither" />
              </span>
              <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/30 blur-lg transition duration-700 group-hover:translate-x-[340%]" />
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/10 bg-surface/50 px-5 sm:px-7 py-3 font-semibold text-muted-foreground backdrop-blur transition hover:border-accent/30 hover:text-foreground"
            >
              {hero.secondaryCta}
            </Link>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-col items-center gap-4 lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="font-semibold text-accent">Packs from ₹399</span>
              <span aria-hidden="true" className="text-muted-foreground/50">&middot;</span>
              <span>single services from ₹99</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/70 lg:justify-start">
              <li className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                Free quote before any work
              </li>
              <li className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                Restore point secured first
              </li>
              <li className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                48-hour follow-up at no cost
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-10 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative rounded-[1.5rem] border border-accent/30 bg-surface/70 p-3 shadow-[0_40px_140px_hsl(var(--primary)/0.28)] backdrop-blur-xl sm:rounded-[2rem] sm:p-4">
            <div className="rounded-[1.2rem] border border-white/10 bg-background/95 p-3 sm:p-5 sm:rounded-[1.5rem]">
              <div className="mb-3 sm:mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-accent" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-secondary" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-primary" />
                <span className="ml-auto h-2 w-20 sm:w-28 rounded-full bg-accent/30" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {['Windows tuned', 'Linux ready', 'Dev stack', 'Game mode'].map((item) => (
                  <div key={item} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                    <div className="mb-3 sm:mb-4 h-7 w-7 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-primary to-secondary" />
                    <p className="text-xs sm:text-sm font-medium text-foreground">{item}</p>
                    <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 rounded-full bg-accent/20">
                      <div className="h-full w-4/5 rounded-full bg-accent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-3 sm:mt-4 h-2.5 sm:h-3 w-32 sm:w-48 rounded-b-3xl bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
