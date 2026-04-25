'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { siteSettings } from '@/lib/api';
import type { SiteSettings } from '@/types';

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    siteSettings.get({ signal: controller.signal })
      .then(data => setSettings(data))
      .catch(err => {
        if (err?.name !== 'AbortError') {
          // eslint-disable-next-line no-console
          console.error('Failed to load site settings', err);
        }
      });
    return () => controller.abort();
  }, []);

  const footerEmail = settings?.footer_email ?? 'hello@ethostudio.com';

  return (
    <footer style={{ borderTop: '1px solid var(--line)', backgroundColor: 'var(--bg-subtle)' }} className="mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="font-serif text-2xl mb-4" style={{ color: 'var(--fg)', fontStyle: 'italic' }}>
              {settings?.site_name ?? 'Ethos Studio'}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
              {settings?.tagline ?? 'Professional graphic design — posters, banners, infographics, and product visuals made with intention.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
                Navigate
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Portfolio', href: '/portfolio' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="link-muted text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
                Contact
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${footerEmail}`}
                  className="link-muted flex items-center gap-2 text-sm"
                >
                  <Mail size={14} />
                  {footerEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>{settings?.copyright ?? '© 2026 Ethos Studio. All rights reserved.'}</p>
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>Made with intention.</p>
        </div>
      </div>
    </footer>
  );
}
