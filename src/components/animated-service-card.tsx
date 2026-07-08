'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedServiceCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'button';
  onClick?: () => void;
}

export default function AnimatedServiceCard({
  children,
  className,
  as: Tag = 'div',
  onClick,
}: AnimatedServiceCardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-surface/30 bg-surface/30 active:border-accent/40 active:bg-surface/60 transition-colors duration-300',
        'hover:border-accent/40 hover:bg-surface/60 hover:shadow-[0_8px_40px_hsl(var(--accent)/0.12)]',
        className,
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none max-md:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="absolute -inset-[100%] animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-accent/8 to-transparent skew-x-[-20deg]" />
        <div className="absolute top-0 left-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 pointer-events-none max-md:hidden">
        <span className="absolute top-4 right-8 h-2 w-2 rounded-full bg-accent/60 animate-ping" style={{ animationDuration: '2s' }} />
        <span className="absolute bottom-8 left-6 h-1.5 w-1.5 rounded-full bg-primary/50 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <span className="absolute top-1/3 left-3 h-1 w-1 rounded-full bg-accent/40 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </Tag>
  );
}
