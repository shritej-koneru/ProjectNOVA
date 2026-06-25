'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/site-config';

const socials = siteConfig.socialLinks.filter(s => ['Instagram', 'WhatsApp'].includes(s.name));
const email = siteConfig.contactInfo.email;

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('welcome-dismissed');
    if (!dismissed) setShow(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('welcome-dismissed', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-accent/20 bg-surface/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-white mb-4">
              N
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Thank You for Visiting!</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This website uses WebGL shaders and a scroll-driven storytelling experience. On some devices, these effects may feel slightly laggy.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              If the website is not fully operable on your device, please reach out to us:
            </p>
            <div className="space-y-2.5 mb-6">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <img src={`https://api.iconify.design/${s.icon}.svg?color=%23E9D985`} alt="" className="h-4 w-4 shrink-0" />
                  {s.handle}
                </a>
              ))}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <img src={`https://api.iconify.design/ph/envelope-simple.svg?color=%23E9D985`} alt="" className="h-4 w-4 shrink-0" />
                {email}
              </a>
            </div>
            <div className="flex justify-end">
              <button
                onClick={dismiss}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
