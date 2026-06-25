'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

export type PriceRange = 'under200' | '200to499' | '500plus' | 'custom' | null;
export type SortOption = 'az' | 'za' | 'priceLow' | 'priceHigh' | null;

export interface FilterState {
  priceRange: PriceRange;
  sort: SortOption;
}

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
}

const priceRanges = [
  { label: 'All Prices', value: null },
  { label: 'Under ₹200', value: 'under200' as const },
  { label: '₹200 – ₹499', value: '200to499' as const },
  { label: '₹500+', value: '500plus' as const },
  { label: 'Custom Quote', value: 'custom' as const },
];

const sortOptions = [
  { label: 'Default', value: null },
  { label: 'A → Z', value: 'az' as const },
  { label: 'Z → A', value: 'za' as const },
  { label: 'Price: Low → High', value: 'priceLow' as const },
  { label: 'Price: High → Low', value: 'priceHigh' as const },
];

export default function FilterModal({ open, onClose, filters, onApply, onClear }: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) setLocalFilters(filters);
  }, [open, filters]);

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

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    onClear();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Filter and sort options"
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm bg-surface/95 backdrop-blur-xl border border-accent/20 rounded-2xl p-6 shadow-[0_0_60px_hsl(var(--accent)/0.12)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-accent">Filter</h3>
              <button onClick={onClose} className="h-10 w-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white text-xs" aria-label="Close">✕</button>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Price range">
                  {priceRanges.map((pr) => (
                    <button
                      key={pr.label}
                      onClick={() => setLocalFilters(prev => ({ ...prev, priceRange: pr.value }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        localFilters.priceRange === pr.value
                          ? 'bg-accent/20 text-accent border border-accent/40'
                          : 'bg-surface/50 text-muted-foreground border border-surface/30 hover:border-accent/30'
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sort By</h4>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Sort order">
                  {sortOptions.map((so) => (
                    <button
                      key={so.label}
                      onClick={() => setLocalFilters(prev => ({ ...prev, sort: so.value }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        localFilters.sort === so.value
                          ? 'bg-accent/20 text-accent border border-accent/40'
                          : 'bg-surface/50 text-muted-foreground border border-surface/30 hover:border-accent/30'
                      }`}
                    >
                      {so.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={handleClear} className="flex-1 px-4 py-2.5 rounded-xl border border-surface/30 bg-surface/40 text-muted-foreground text-sm hover:text-accent transition-colors">Clear</button>
              <button onClick={handleApply} className="flex-1 px-4 py-2.5 rounded-xl bg-accent/15 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/25 transition-colors">Apply</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
