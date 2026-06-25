'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useCallback } from 'react';

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  image: string;
  description: string;
}

export default function ServiceModal({ open, onClose, name, image, description }: ServiceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', trapFocus);

      requestAnimationFrame(() => {
        const btn = dialogRef.current?.querySelector<HTMLElement>('button');
        btn?.focus();
      });
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', trapFocus);
    };
  }, [open, trapFocus]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            className="relative w-full max-w-lg bg-surface/95 backdrop-blur-xl border border-accent/20 rounded-2xl overflow-hidden shadow-[0_0_60px_hsl(var(--accent)/0.12)]"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="relative h-48 bg-gradient-to-br from-primary/20 via-surface to-secondary/20 flex items-center justify-center">
              <img src={image} alt={name} className="h-20 w-20 object-contain opacity-80" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-accent mb-3">{name}</h3>
              <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                {description.split('\n\n').map((block, i) => (
                  <p key={i}>
                    {block.split('\n').map((line, j) => [
                      j > 0 && <br key={`br-${j}`} />,
                      <span key={`line-${j}`}>{line}</span>,
                    ])}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
