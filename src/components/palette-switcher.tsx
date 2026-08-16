'use client';

import { useState, useRef, useEffect } from 'react';
import { palettes } from '@/data/scene-palettes';
import { setActivePalette, derivePalette, applyPalette, getGradientColor } from '@/data/scene-palettes';

export default function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const select = (i: number) => {
    setActivePalette(i);
    setActiveIdx(i);
    setOpen(false);
    const p = derivePalette(getGradientColor(0));
    applyPalette(p);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-surface/20 bg-surface/40 text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
        title="Switch palette"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-surface/20 bg-surface/90 backdrop-blur-xl shadow-2xl p-2 space-y-1 z-50">
          {palettes.map((p, i) => (
            <button
              key={p.name}
              onClick={() => select(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                i === activeIdx ? 'bg-accent/12 text-accent' : 'text-muted-foreground hover:text-accent hover:bg-accent/5'
              }`}
            >
              <span className="flex gap-0.5">
                {p.stops.map((s, j) => {
                  const [h, sat, light] = s.split(' ');
                  return (
                    <span
                      key={j}
                      className="h-4 w-4 rounded-full border border-white/10"
                      style={{ background: `hsl(${h} ${sat} ${light})` }}
                    />
                  );
                })}
              </span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
