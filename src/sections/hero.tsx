'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { hero } from '@/data/content';

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
            className="font-heading text-4xl font-bold leading-[0.95] tracking-tight text-foreground md:text-5xl lg:text-7xl"
            initial={{ opacity: 0, y: 44, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.headline}
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {hero.subheadline}
            </span>
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
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full border border-accent/40 bg-accent/15 px-5 sm:px-7 py-3 font-semibold text-accent shadow-[0_0_40px_hsl(var(--accent)/0.18)] backdrop-blur transition hover:bg-accent/25"
            >
              <span className="relative z-10 flex items-center gap-3">
                {hero.primaryCta}
                <span className="h-2.5 w-2.5 rounded-full bg-accent animate-dither" />
              </span>
              <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/20 blur-lg transition duration-700 group-hover:translate-x-[340%]" />
            </a>
            <Link
              href="#services"
              className="rounded-full border border-white/10 bg-surface/50 px-5 sm:px-7 py-3 font-semibold text-muted-foreground backdrop-blur transition hover:border-accent/30 hover:text-foreground"
            >
              {hero.secondaryCta}
            </Link>
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
