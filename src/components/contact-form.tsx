'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { services } from '@/data/services';

const categoryEntries = Object.entries(services);

const collegeYears = ['FY', 'SY', 'TY', 'BE', 'ME', 'PhD', 'Other'];

const branches = ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];

function Input({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        id={id}
        {...props}
        className="w-full px-4 py-3 bg-surface/50 border border-surface/30 rounded-lg text-foreground placeholder-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors"
      />
    </div>
  );
}

function Select({ id, label, children, className, ...props }: { id: string; label: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-1.5">{label}</label>
      <select
        id={id}
        {...props}
        className={`w-full px-4 py-3 rounded-lg text-foreground placeholder-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors ${className || 'bg-surface/50 border border-surface/30'}`}
      >
        {children}
      </select>
    </div>
  );
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedCategory = categoryEntries.find(([, cat]) =>
    cat.services.some(s => s.name === preselectedService)
  )?.[0] || '';
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory);
  const [selectedService, setSelectedService] = useState(preselectedService);

  const currentServices = categoryEntries.find(([key]) => key === selectedCategory)?.[1]?.services || [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Server error');

      setSubmitted(true);
      setError(false);
    } catch {
      setError(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="text-accent text-xl font-semibold">Thank you! We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface/30 backdrop-blur-sm border border-surface/20 rounded-xl p-8">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm" role="alert">
          Failed to send. Please try again.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input id="contact-name" label="Name" name="name" type="text" required />
        <Input id="contact-phone" label="Phone Number" name="phone" type="tel" required />
        <Input id="contact-email" label="Email" name="email" type="email" required />
        <Select id="contact-college-year" label="College Year" name="collegeYear" required>
          <option value="">Select year</option>
          {collegeYears.map((y) => <option key={y} value={y}>{y}</option>)}
        </Select>
        <Select id="contact-branch" label="Branch" name="branch" required>
          <option value="">Select branch</option>
          {branches.map((b) => <option key={b} value={b}>{b}</option>)}
        </Select>
        <Select id="contact-category" label="Category" name="category" required
          value={selectedCategory}
          onChange={e => { setSelectedCategory(e.target.value); setSelectedService(''); }}
        >
          <option value="">Select category</option>
          {categoryEntries.map(([key, cat]) => (
            <option key={key} value={key}>{cat.title}</option>
          ))}
        </Select>
        <Select id="contact-service" label="Service" name="service" required
          value={selectedService}
          onChange={e => setSelectedService(e.target.value)}
          disabled={!selectedCategory}
          className={`w-full px-4 py-3 rounded-lg text-foreground placeholder-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors ${
            selectedCategory
              ? 'bg-surface/50 border border-surface/30'
              : 'bg-surface/20 border border-surface/10 text-muted-foreground/40 cursor-not-allowed'
          }`}
        >
          <option value="">{selectedCategory ? 'Select service' : 'Choose a category first'}</option>
          {currentServices.map((svc) => (
            <option key={svc.name} value={svc.name}>{svc.name}</option>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="contact-description" className="block text-sm font-medium text-muted-foreground mb-1.5">Requirement Description</label>
        <textarea id="contact-description" name="description" rows={4} required className="w-full px-4 py-3 bg-surface/50 border border-surface/30 rounded-lg text-foreground placeholder-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors resize-none" />
      </div>
      <Input id="contact-preferred-time" label="Preferred Time (optional)" name="preferredTime" type="text" />
      <button type="submit" className="w-full py-3 bg-accent/20 hover:bg-accent/30 text-accent font-medium rounded-lg transition-colors border border-accent/30">
        Submit
      </button>
    </form>
  );
}
