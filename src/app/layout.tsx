import './globals.css';
import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' });

export const metadata: Metadata = {
  title: 'Project NOVA - Notebook Optimization, Virtualization & Advancement',
  description: 'Premium student-focused laptop transformation service. Transform your laptop from slow and cluttered to a powerful workstation.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} scroll-smooth antialiased`} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
