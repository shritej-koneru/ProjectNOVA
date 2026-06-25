export interface ScenePalette {
  background: string;
  foreground: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  mutedForeground: string;
}

const gradientStops = [
  '210 96% 40%',  // #0466c8 Smart Blue
  '210 96% 33%',  // #0353a4 Steel Azure
  '211 97% 25%',  // #023e7d Regal Navy
  '212 100% 17%', // #002855 Prussian Blue
  '219 100% 14%', // #001845 Prussian Blue
  '219 100% 10%', // #001233 Prussian Blue
  '220 29% 28%',  // #33415c Twilight Indigo
  '220 15% 43%',  // #5c677d Blue Slate
  '222 11% 54%',  // #7d8597 Slate Grey
  '223 11% 63%',  // #979dac Cool Steel
];

function parseHSL(hsl: string) {
  const [h, s, l] = hsl.trim().split(/\s+/).map(v => parseFloat(v));
  return { h, s, l };
}

function lerpHSL(a: string, b: string, t: number): string {
  const { h: h1, s: s1, l: l1 } = parseHSL(a);
  const { h: h2, s: s2, l: l2 } = parseHSL(b);
  let dh = h2 - h1;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = ((h1 + dh * t) % 360 + 360) % 360;
  const s = s1 + (s2 - s1) * t;
  const l = l1 + (l2 - l1) * t;
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
}

export function getGradientColor(t: number): string {
  const n = gradientStops.length - 1;
  const idx = t * n;
  const lo = Math.min(n, Math.max(0, Math.floor(idx)));
  const hi = Math.min(n, Math.max(0, Math.ceil(idx)));
  const frac = idx - lo;
  return lerpHSL(gradientStops[lo], gradientStops[hi], frac);
}

export function derivePalette(base: string): ScenePalette {
  const { h, s, l } = parseHSL(base);
  const sat = (m: number) => Math.round(Math.min(s * m, 100));
  const hue = h;
  return {
    background: `${hue} ${sat(0.8)}% 16%`,
    foreground: `${hue} ${sat(0.3)}% 86%`,
    surface: `${hue} ${sat(0.8)}% 12%`,
    primary: `${hue} ${sat(1)}% 45%`,
    secondary: `${hue} ${sat(0.8)}% 38%`,
    accent: `${hue} ${sat(0.7)}% 68%`,
    mutedForeground: `${hue} ${sat(0.3)}% 72%`,
  };
}

export function applyPalette(palette: ScenePalette) {
  const root = document.documentElement;
  root.style.setProperty('--background', palette.background);
  root.style.setProperty('--foreground', palette.foreground);
  root.style.setProperty('--surface', palette.surface);
  root.style.setProperty('--primary', palette.primary);
  root.style.setProperty('--secondary', palette.secondary);
  root.style.setProperty('--accent', palette.accent);
  root.style.setProperty('--muted-foreground', palette.mutedForeground);
}
