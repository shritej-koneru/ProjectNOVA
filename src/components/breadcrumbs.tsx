'use client';

import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-muted-foreground/40">/</span>}
              {isLast || !item.href ? (
                <span className={isLast ? 'text-foreground font-medium' : ''}>{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
