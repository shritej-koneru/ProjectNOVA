"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
}

const DESKTOP_VISIBLE = 7;
const DESKTOP_HALF = 3;
const MOBILE_VISIBLE = 3;
const MOBILE_HALF = 1;

const MOBILE_BREAKPOINT = 640;

function fanPositions(isMobile: boolean) {
  if (isMobile) {
    return [
      { rot: -14, scale: 0.88, x: -8, y: 0.5, zIndex: 1 },
      { rot: 0,   scale: 1.0,  x: 0,  y: 0.0, zIndex: 10 },
      { rot: 14,  scale: 0.88, x: 8,  y: 0.5, zIndex: 1 },
    ];
  }
  return [
    { rot: -24, scale: 0.75, x: -18, y: 3.5, zIndex: 1 },
    { rot: -16, scale: 0.83, x: -12, y: 2.0, zIndex: 2 },
    { rot: -8,  scale: 0.92, x: -6, y: 0.8, zIndex: 3 },
    { rot: 0,   scale: 1.0,  x: 0,  y: 0.0, zIndex: 10 },
    { rot: 8,   scale: 0.92, x: 6,  y: 0.8, zIndex: 3 },
    { rot: 16,  scale: 0.83, x: 12, y: 2.0, zIndex: 2 },
    { rot: 24,  scale: 0.75, x: 18, y: 3.5, zIndex: 1 },
  ];
}

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.35;
  if (width < 640) return 0.45;
  if (width < 768) return 0.55;
  if (width < 1024) return 0.7;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 16 * 16;
  else if (width < 640) idealPx = 18 * 16;
  else if (width < 768) idealPx = 20 * 16;
  else if (width < 1024) idealPx = 22 * 16;
  else idealPx = 24 * 16;

  const available = window.innerHeight * 0.55;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number, positions: ReturnType<typeof fanPositions>) {
  if (slot < positions.length) return positions[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 18,
    y: absDistance * absDistance * 3.5,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-white/10 bg-white/5 backdrop-blur-[16px] text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-white/25 hover:text-white/80 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-white/[0.04] before:pointer-events-none";

export default function SocialCards({ cards }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());
  const isMobileRef = useRef(false);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (mobile !== isMobileRef.current) {
        isMobileRef.current = mobile;
        setIsMobile(mobile);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const MAX_VISIBLE = isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE;
  const HALF = isMobile ? MOBILE_HALF : DESKTOP_HALF;
  const positions = fanPositions(isMobile);
  const isTouchDevice = isMobile;

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (!needsPagination) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, needsPagination, MAX_VISIBLE, HALF, cards]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot, positions);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    const animEase = isMobile ? "power2.out" : "elastic.out(1.05,.78)";
    const animDuration = isMobile ? 0.5 : 1.2;

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          xPercent: -50,
          yPercent: -50,
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, y: `${5 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: animDuration, ease: animEase, delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 24 : -24;
          gsap.set(card, { xPercent: -50, yPercent: -50, x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 30 : -30, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -24 : 24;
        gsap.to(card, { xPercent: -50, yPercent: -50, x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -30 : 30, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    const centerSlot = visibleEntries.length >> 1;
    let activeSlot: number | null = null;
    let leaveTimer: NodeJS.Timeout | null = null;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.0 * hM;
            targetScale *= 1.15;
            gsap.set(el, { boxShadow: '0 0 40px rgba(233,217,133,0.25), 0 8px 32px rgba(0,0,0,0.4)' });
          } else {
            gsap.set(el, { boxShadow: 'none' });
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 4.0 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
          gsap.set(el, { boxShadow: 'none' });
        }

        gsap.to(el, {
          xPercent: -50, yPercent: -50,
          x: `${targetX}rem`, y: `${targetY}rem`, rotation: targetRot, scale: targetScale,
          duration: 0.5, delay, ease: "elastic.out(1,.75)", overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers: { el: HTMLElement; handler: () => void }[] = [];
    if (!isTouchDevice) {
      visibleEntries.forEach(({ el, slot }) => {
        const handler = () => {
          if (isAnimating.current) return;
          if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
          if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
        };
        el.addEventListener("mouseenter", handler);
        enterHandlers.push({ el, handler });
      });

      const onMouseLeave = () => {
        if (isAnimating.current) return;
        if (leaveTimer) clearTimeout(leaveTimer);
        leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
      };
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
        container.removeEventListener("mouseleave", onMouseLeave);
        if (leaveTimer) clearTimeout(leaveTimer);
      };
    }
  }, [centerIndex, totalCards, getVisibleMap, needsPagination, isMobile, positions, isTouchDevice]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className="flex flex-col items-center w-full relative z-20">
      <style>{`
        .fan-card .card-overlay { transition: opacity 0.35s ease; }
        .fan-card:hover .card-overlay { opacity: 0.2 !important; }
        .fan-card .card-label { transition: opacity 0.35s ease, transform 0.35s ease; }
        .fan-card:hover .card-label { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
      <div className="flex items-center justify-center w-full max-w-7xl mx-auto">
        <div ref={containerRef} className="relative w-full" style={{ minHeight: isMobile ? '16rem' : '24rem' }}>
          {cards.map((card, index) => {
            const image = (
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <img src={card.imgUrl} loading="lazy" alt={card.alt || `Card ${index}`} className="absolute inset-0 w-full h-full object-cover z-10" />
                <div className="card-overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent z-20" />
                <div className="absolute top-0 left-0 right-0 z-30 p-3">
                  <p className="card-label text-white text-xs sm:text-sm font-semibold drop-shadow-lg opacity-90 translate-y-0.5">{card.alt}</p>
                </div>
              </div>
            );
            return card.linkUrl ? (
              card.linkUrl.startsWith("http") ? (
                <a key={index} href={card.linkUrl} target="_blank" rel="noopener noreferrer" className="fan-card absolute left-1/2 top-1/2 block cursor-pointer w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 aspect-video">{image}</a>
              ) : (
                <Link key={index} href={card.linkUrl} className="fan-card absolute left-1/2 top-1/2 block cursor-pointer w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 aspect-video">{image}</Link>
              )
            ) : (
              <div key={index} className="fan-card absolute left-1/2 top-1/2 w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 aspect-video">{image}</div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-white/80 scale-[1.3]" : "bg-white/15"}`} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
