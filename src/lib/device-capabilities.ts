'use client';

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

const DEFAULT_CAPS: DeviceCapabilities = {
  isMobile: false,
  isLowEnd: false,
  prefersReducedMotion: false,
};

// Discrete GPUs we should NOT downgrade even if the string looks integrated-ish.
const DISCRETE_GPU_RE =
  /\b(rx|rtx|gtx|quadro|arc|pro)\b/i;

// Integrated / weak / software renderers. Matched only after the discrete
// check above, so a "Radeon (TM) RX 570" never gets downgraded but a
// "AMD Radeon (TM) Graphics" iGPU does.
const WEAK_GPU_RE =
  /(llvmpipe|swiftshader|software renderer|software rasterizer|basic render|intel|uhd graphics|hd graphics|iris|radeon(?:\(tm\))? graphics|radeon hd|radeon(?:\(tm\))? vega|radeon r[2-7]|mali|adreno|powervr)/i;

function probeWeakGpu(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return false;

    const renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    if (!renderer) return false;
    if (DISCRETE_GPU_RE.test(renderer)) return false;
    return WEAK_GPU_RE.test(renderer);
  } catch {
    return false;
  }
}

function computeCapabilities(): DeviceCapabilities {
  const width = window.innerWidth;
  const isMobile = width > 0 && width < 768;

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav = navigator as Navigator & { deviceMemory?: number };
  const deviceMemory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : undefined;
  const hardwareConcurrency = nav.hardwareConcurrency;

  const lowMemory = deviceMemory !== undefined && deviceMemory <= 4;
  const lowCores = hardwareConcurrency !== undefined && hardwareConcurrency <= 4;
  const weakGpu = probeWeakGpu();

  const isLowEnd = isMobile || lowMemory || lowCores || weakGpu || prefersReducedMotion;

  return {
    isMobile,
    isLowEnd,
    prefersReducedMotion,
    deviceMemory,
    hardwareConcurrency,
  };
}

let cached: DeviceCapabilities | null = null;

export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') return DEFAULT_CAPS;
  if (!cached) cached = computeCapabilities();
  return cached;
}

import { useEffect, useState } from 'react';

// Starts with the safe defaults (matching SSR markup) and flips to the real
// capabilities after mount, so server-rendered and hydrated DOM never diverge.
export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>(DEFAULT_CAPS);
  useEffect(() => {
    setCaps(getDeviceCapabilities());
  }, []);
  return caps;
}
