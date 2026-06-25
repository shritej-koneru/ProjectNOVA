'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { services, serviceDetails } from '@/data/services';
import { menuItems } from '@/data/menu';
import Breadcrumbs from '@/components/breadcrumbs';

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function findServiceBySlug(slug: string) {
  for (const [key, cat] of Object.entries(services)) {
    for (const svc of cat.services) {
      if (slugify(svc.name) === slug) {
        return { ...svc, category: cat.title, categoryKey: key };
      }
    }
  }
  return null;
}

function lookupPrice(serviceName: string): string {
  for (const section of menuItems) {
    for (const item of section.items) {
      if (item.name === serviceName) return item.price;
    }
  }
  return '';
}

function getRelated(slug: string, categoryKey: string, currentName: string) {
  const cat = services[categoryKey as keyof typeof services];
  if (!cat) return [];
  return cat.services
    .filter(s => s.name !== currentName)
    .slice(0, 3)
    .map(s => ({ ...s, slug: slugify(s.name) }));
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = findServiceBySlug(slug);
  const price = service ? lookupPrice(service.name) : '';
  const related = service ? getRelated(slug, service.categoryKey, service.name) : [];

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-accent mb-3">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you are looking for does not exist.</p>
          <Link href="/services" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]} />

        <div className="rounded-2xl border border-accent/20 bg-surface/30 p-8 md:p-10">
          <div className="flex items-start gap-5 mb-6">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <img src={service.image} alt="" className="h-8 w-8 opacity-80" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-accent/60 mb-1.5 font-medium uppercase tracking-wider">{service.category}</div>
              <h1 className="text-3xl font-bold text-foreground">{service.name}</h1>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

          {price && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/8 px-5 py-3 mb-8">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <span className="text-xl font-bold text-accent">{price}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?service=${encodeURIComponent(service.name)}`}
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Book This Service
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-accent/30 px-8 py-3.5 text-sm font-medium text-accent transition-all hover:bg-accent/10"
            >
              Browse All Services
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-accent mb-6">Related Services</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((svc) => (
                <Link
                  key={svc.name}
                  href={`/services/${svc.slug}`}
                  className="group block rounded-xl border border-surface/30 bg-surface/20 p-5 transition-all hover:border-accent/30 hover:bg-surface/40"
                >
                  <div className="h-10 w-10 mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={svc.image} alt="" className="h-5 w-5 opacity-70" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{svc.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{svc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
