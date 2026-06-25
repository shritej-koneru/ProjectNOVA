'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { storyScenes } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getGradientColor, derivePalette, applyPalette } from '@/data/scene-palettes';

const sceneLabels: Record<number, string[]> = {
  1: ['96% disk', '42s boot', 'fan noise', 'low battery'],
  2: ['Trialware', 'Updater', 'Toolbar', 'OEM apps', 'Popups'],
  3: ['Clean startup', 'Services tuned', 'Cache cleared', 'Drivers checked'],
  4: ['Windows', 'Drivers', 'Updates', 'Recovery point'],
  5: ['Ubuntu', 'Mint', 'Fedora', 'Manjaro'],
  6: ['Windows', 'Linux', 'Shared files'],
  7: ['VS Code', 'GitHub', 'Python', 'Java', 'Android Studio', 'Ollama'],
  8: ['Obsidian', 'Cloud Sync', 'Laptop', 'Mobile'],
  9: ['Steam', 'Epic Games', 'Discord', 'GPU drivers', 'FPS tuned'],
  10: ['Study', 'Code', 'Create', 'Game', 'Sync'],
};

export default function ScrollStory() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const lastScene = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(storyScenes.length - 1, Math.max(0, Math.floor(v * storyScenes.length)));
    if (next === lastScene.current) return;
    lastScene.current = next;
    setActiveIndex(next);
    if (!reducedMotion) {
      applyPalette(derivePalette(getGradientColor(v)));
    }
  });

  const scene = storyScenes[activeIndex];

  return (
    <section ref={containerRef} className="relative min-h-[900svh] bg-background text-foreground">
      <div className="sticky top-0 flex min-h-svh items-center will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.20),transparent_32%),radial-gradient(circle_at_78%_72%,hsl(var(--secondary)/0.18),transparent_34%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--surface)),hsl(var(--background)))]" />
        <div className="absolute inset-0 bg-[url('/hero-shader.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
        <motion.div style={{ scaleX: progressScale }} className="absolute left-0 top-0 z-30 h-1 w-full origin-left bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-10 lg:py-24">
          <div className="min-h-[320px] lg:min-h-[440px]">
            <AnimatePresence mode={reducedMotion ? 'wait' : 'popLayout'}>
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: reducedMotion ? 8 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? -8 : -20 }}
                transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-6xl">
                  {scene.title}
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
                  {scene.description}
                </p>
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-8 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Explore Our Services
                </motion.button>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 grid max-w-sm grid-cols-5 gap-2">
              {storyScenes.map((item, i) => (
                <span key={item.id} className={`h-1.5 rounded-full transition-colors duration-300 ${i <= activeIndex ? 'bg-accent' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>

          <motion.div
            className="relative mx-auto flex w-full max-w-2xl items-center justify-center will-change-transform"
            animate={reducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          >
            <div className="absolute h-72 w-72 md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem] rounded-full bg-accent/20 blur-3xl" />
            <div className="relative z-10 w-full max-w-[460px] rounded-[1.5rem] border border-accent/30 bg-surface/75 p-3 shadow-[0_36px_140px_hsl(var(--primary)/0.24)] backdrop-blur-xl sm:max-w-[560px] sm:rounded-[2rem] sm:p-4">
              <div className="rounded-[1.2rem] border border-white/10 bg-background/90 p-3 shadow-inner sm:rounded-[1.4rem] sm:p-4">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-accent/80" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-secondary/80" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-primary/80" />
                  <span className="ml-auto h-2 w-20 sm:w-24 rounded-full bg-accent/30" />
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0.1 : 0.25 }}
                    className="min-h-[260px] sm:min-h-[310px]"
                  >
                    <SceneScreen id={scene.id} labels={sceneLabels[scene.id]} reducedMotion={reducedMotion} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mx-auto mt-3 h-2.5 sm:h-3 w-36 sm:w-48 rounded-b-3xl bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
            <FloatingChips keyPrefix={scene.id} labels={sceneLabels[scene.id]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingChips({ keyPrefix, labels }: { keyPrefix: number; labels: string[] }) {
  const positions = [
    'left-0 top-8', 'right-4 top-14',
    'left-8 bottom-20', 'right-0 bottom-28',
    'left-1/3 top-0', 'right-1/4 bottom-4',
  ];
  return (
    <>
      {labels.slice(0, 6).map((label, i) => (
        <motion.div
          key={`${keyPrefix}-${label}`}
          initial={{ opacity: 0, y: 20 + i * 4, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.9 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className={`absolute z-20 hidden rounded-full border px-3 py-2 text-xs font-medium shadow-2xl backdrop-blur-md md:block md:px-4 md:py-2.5 md:text-sm ${positions[i]} ${
            keyPrefix <= 2 ? 'border-accent/40 bg-accent/15 text-accent' : 'border-accent/25 bg-accent/8 text-accent'
          }`}
        >
          {label}
        </motion.div>
      ))}
    </>
  );
}

function SceneScreen({ id, labels, reducedMotion }: { id: number; labels: string[]; reducedMotion: boolean }) {
  if (id === 1) return <SlowScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 2) return <BloatwareScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 3) return <OptimizationScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 4) return <InstallScreen title="Installing Windows" labels={labels} reducedMotion={reducedMotion} />;
  if (id === 5) return <LinuxScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 6) return <DualBootScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 7) return <DeveloperScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 8) return <SyncScreen labels={labels} reducedMotion={reducedMotion} />;
  if (id === 9) return <GamingScreen labels={labels} reducedMotion={reducedMotion} />;
  return <FinalScreen labels={labels} reducedMotion={reducedMotion} />;
}

function SlowScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative space-y-3 overflow-hidden rounded-2xl border border-accent/25 bg-accent/8 p-4 sm:p-5">
    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
    <div className="mb-2 sm:mb-3 flex items-center gap-2">
      {reducedMotion ? <span className="h-3 w-3 rounded-full bg-accent/60" /> : <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="h-3 w-3 rounded-full bg-accent/60" />}
      <div className="h-3 flex-1 rounded bg-accent/25" />
      <div className="h-3 w-16 rounded bg-accent/15" />
    </div>
    {labels.map((l, i) => (
      <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-2 sm:gap-3">
        {reducedMotion ? <span className="h-2 w-2 shrink-0 rounded-full bg-accent/60" /> : <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }} className="h-2 w-2 shrink-0 rounded-full bg-accent/60" />}
        <div className="h-3 flex-1 rounded bg-accent/15" />
        <span className="text-xs text-accent/70 truncate">{l}</span>
      </motion.div>
    ))}
    {reducedMotion ? <div className="mt-3 sm:mt-4 h-2 w-3/5 rounded-full bg-accent/20" /> : <motion.div className="mt-3 sm:mt-4 h-2 w-3/5 rounded-full bg-accent/20" animate={{ width: ['60%', '40%', '60%'] }} transition={{ repeat: Infinity, duration: 4 }} />}
  </div>;
}

function BloatwareScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative grid grid-cols-2 gap-2 sm:gap-3">
    <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
    {labels.map((l, i) => (
      <motion.div
        key={l} initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        className="relative rounded-xl sm:rounded-2xl border border-accent/20 bg-accent/8 p-3 sm:p-4 text-xs sm:text-sm text-accent"
      >
        <div className="mb-2 sm:mb-3 h-6 w-6 sm:h-8 sm:w-8 rounded-xl bg-accent/20 flex items-center justify-center text-xs font-bold text-accent/50">✕</div>
        {l}
      </motion.div>
    ))}
  </div>;
}

function OptimizationScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="space-y-3">
    {labels.map((l, i) => (
      <motion.div key={l} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl sm:rounded-2xl border border-secondary/25 bg-secondary/10 p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <span>{l}</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }}>{78 + i * 5}%</motion.span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <motion.div initial={{ width: 0 }} animate={{ width: `${78 + i * 5}%` }} transition={{ duration: reducedMotion ? 0.3 : 0.8, delay: 0.15 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }} className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
        </div>
      </motion.div>
    ))}
  </div>;
}

function InstallScreen({ title, labels, reducedMotion }: { title: string; labels: string[]; reducedMotion: boolean }) {
  return <div className="space-y-3 sm:space-y-4">
    <div className="relative rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/10 p-4 sm:p-5 overflow-hidden">
      <div className="absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-primary/20 blur-xl" />
      <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-primary flex items-center gap-2">
        {reducedMotion ? <span className="inline-block h-3 w-3 rounded-full border-2 border-primary border-t-transparent" /> : <motion.span animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="inline-block h-3 w-3 rounded-full border-2 border-primary border-t-transparent" />}
        {title}
      </p>
      <div className="h-2.5 sm:h-3 w-full rounded-full bg-primary/20">
        <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: reducedMotion ? 0.3 : 1.2, ease: [0.25, 0.1, 0.25, 1] }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {labels.map((l, i) => (
        <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }} className="rounded-xl border border-white/8 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-muted-foreground">{l}</motion.div>
      ))}
    </div>
  </div>;
}

function LinuxScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
    <div className="absolute -right-6 top-1/2 h-32 w-32 rounded-full bg-secondary/15 blur-3xl" />
    {labels.map((l, i) => (
      <motion.div
        key={l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.07 }}
        className="relative rounded-2xl sm:rounded-3xl border border-secondary/25 bg-secondary/10 p-4 sm:p-6 text-center"
      >
        {reducedMotion ? (
          <div className="mx-auto mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-secondary to-accent" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
            className="mx-auto mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-secondary to-accent"
          />
        )}
        <p className="text-base sm:text-lg font-semibold text-secondary-foreground">{l}</p>
      </motion.div>
    ))}
  </div>;
}

function DualBootScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative flex min-h-64 sm:min-h-72 items-center justify-center">
    {reducedMotion ? (
      <div className="absolute left-0 sm:left-2 top-6 sm:top-8 rounded-3xl border border-primary/30 bg-primary/10 px-4 sm:px-6 py-5 sm:py-6 text-primary text-xs sm:text-sm font-medium">{labels[0]}</div>
    ) : (
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute left-0 sm:left-2 top-6 sm:top-8 rounded-3xl border border-primary/30 bg-primary/10 px-4 sm:px-6 py-5 sm:py-6 text-primary text-xs sm:text-sm font-medium">{labels[0]}</motion.div>
    )}
    {reducedMotion ? (
      <div className="absolute bottom-6 sm:bottom-8 right-0 sm:right-2 rounded-3xl border border-secondary/30 bg-secondary/10 px-4 sm:px-6 py-5 sm:py-6 text-secondary-foreground text-xs sm:text-sm font-medium">{labels[1]}</div>
    ) : (
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-6 sm:bottom-8 right-0 sm:right-2 rounded-3xl border border-secondary/30 bg-secondary/10 px-4 sm:px-6 py-5 sm:py-6 text-secondary-foreground text-xs sm:text-sm font-medium">{labels[1]}</motion.div>
    )}
    {reducedMotion ? (
      <div className="h-1 w-44 sm:w-56 rotate-[-22deg] rounded-full bg-gradient-to-r from-primary via-accent to-secondary" />
    ) : (
      <motion.div className="h-1 w-44 sm:w-56 rotate-[-22deg] rounded-full bg-gradient-to-r from-primary via-accent to-secondary" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 3 }} />
    )}
    {reducedMotion ? (
      <div className="absolute rounded-full border border-accent/30 bg-accent/10 px-3 sm:px-5 py-2 sm:py-2.5 text-accent text-xs sm:text-sm font-medium">{labels[2]}</div>
    ) : (
      <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute rounded-full border border-accent/30 bg-accent/10 px-3 sm:px-5 py-2 sm:py-2.5 text-accent text-xs sm:text-sm font-medium">{labels[2]}</motion.div>
    )}
  </div>;
}

function DeveloperScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative grid gap-2">
    <div className="absolute -left-4 top-1/3 h-20 w-20 rounded-full bg-accent/8 blur-2xl" />
    {labels.map((l, i) => (
      <motion.div
        key={l} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
        className="rounded-xl border border-accent/20 bg-black/25 p-2.5 sm:p-3 font-mono text-xs sm:text-sm text-accent"
      >
        {reducedMotion ? (
          <>
            <span className="text-muted-foreground">$ </span>
            <span className="break-all">{l}</span>
          </>
        ) : (
          <>
            <span className="text-muted-foreground">$ </span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.05 }}>
              {l.split('').map((ch, j) => <motion.span key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.05 + j * 0.015 }}>{ch}</motion.span>)}
            </motion.span>
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="inline-block h-3 sm:h-4 w-1.5 sm:w-2 bg-accent/70 ml-0.5 align-text-bottom" />
          </>
        )}
      </motion.div>
    ))}
  </div>;
}

function SyncScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative flex min-h-64 sm:min-h-72 items-center justify-center">
    {reducedMotion ? <div className="rounded-full border border-accent/30 bg-accent/10 p-6 sm:p-8 text-center text-accent font-medium text-xs sm:text-sm">{labels[0]}</div> : <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="rounded-full border border-accent/30 bg-accent/10 p-6 sm:p-8 text-center text-accent font-medium text-xs sm:text-sm">{labels[0]}</motion.div>}
    {reducedMotion ? <div className="absolute h-44 w-44 sm:h-52 sm:w-52 rounded-full border border-dashed border-accent/25" /> : <motion.div className="absolute h-44 w-44 sm:h-52 sm:w-52 rounded-full border border-dashed border-accent/25" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} />}
    {reducedMotion ? <div className="absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full border border-dashed border-accent/15" /> : <motion.div className="absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full border border-dashed border-accent/15" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} />}
    {labels.slice(1).map((l, i) => {
      const positions = ['top-2 left-3 sm:left-4', 'bottom-2 sm:bottom-4 left-3 sm:left-4', 'bottom-2 sm:bottom-4 right-3 sm:right-4'];
      return <div key={l} className={`absolute rounded-2xl border border-white/10 bg-white/8 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-muted-foreground backdrop-blur-sm ${positions[i]}`}>{l}</div>;
    })}
  </div>;
}

function GamingScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="space-y-3 sm:space-y-4">
    <div className="rounded-2xl sm:rounded-3xl border border-secondary/25 bg-secondary/10 p-4 sm:p-6">
      <div className="mb-3 sm:mb-4 flex items-end gap-1 sm:gap-1.5">
        {[48, 72, 92, 126, 144].map((h, i) => (
          <motion.div
            key={h}
            initial={{ height: 0 }} animate={{ height: h / 3 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: i * 0.08 }}
            className="w-full rounded-t-lg bg-gradient-to-t from-secondary to-accent"
          />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">Performance (FPS)</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {labels.slice(0, 3).map((l, i) => (
        <motion.span key={l} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} className="rounded-full bg-white/8 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground">{l}</motion.span>
      ))}
    </div>
  </div>;
}

function FinalScreen({ labels, reducedMotion }: { labels: string[]; reducedMotion: boolean }) {
  return <div className="relative grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
    <div className="absolute -right-4 -bottom-4 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
    {labels.map((l, i) => (
      <motion.div
        key={l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        className="relative rounded-2xl sm:rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 to-secondary/10 p-4 sm:p-5 text-center text-accent shadow-xl shadow-accent/10"
      >
        {reducedMotion ? <div className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/30" /> : <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
          className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/30"
        />}
        <span className="text-xs sm:text-sm font-medium">{l}</span>
      </motion.div>
    ))}
  </div>;
}
