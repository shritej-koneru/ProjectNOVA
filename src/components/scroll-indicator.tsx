'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const IDLE_DELAY = 2000;
const BOTTOM_THRESHOLD = 120;

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const isNearBottom = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      return scrollTop + viewportHeight >= pageHeight - BOTTOM_THRESHOLD;
    };

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const scheduleReveal = () => {
      clearTimer();

      if (isNearBottom()) {
        setVisible(false);
        return;
      }

      timerRef.current = window.setTimeout(() => {
        if (!isNearBottom()) {
          setVisible(true);
        }
      }, IDLE_DELAY);
    };

    const onScroll = () => {
      setVisible(false);
      scheduleReveal();
    };

    const onResize = () => {
      if (isNearBottom()) {
        clearTimer();
        setVisible(false);
      }
    };

    scheduleReveal();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      clearTimer();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 inset-x-0 z-[60] flex justify-center"
        >
          <motion.button
            type="button"
            aria-label="Scroll"
            className="group pointer-events-auto flex items-center overflow-hidden rounded-full border border-accent/25 bg-surface/75 shadow-[0_10px_30px_hsl(var(--primary)/0.18)] backdrop-blur-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex h-11 w-11 items-center justify-center text-accent/95">
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="text-lg leading-none"
              >
                ↓
              </motion.span>
            </span>
            <span className="max-w-0 overflow-hidden pr-0 text-xs font-semibold uppercase tracking-[0.28em] text-accent/90 opacity-0 transition-all duration-300 ease-out group-hover:max-w-24 group-hover:pr-4 group-hover:opacity-100">
              Scroll
            </span>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
