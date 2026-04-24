'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', backgroundColor: 'var(--bg-subtle)' }} className="mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="font-serif text-2xl mb-4" style={{ color: 'var(--fg)', fontStyle: 'italic' }}>
              Ethos Studio
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
              Professional graphic design — posters, banners, infographics, and product visuals made with intention.
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
                  href="mailto:hello@ethostudio.com"
                  className="link-muted flex items-center gap-2 text-sm"
                >
                  <Mail size={14} />
                  hello@ethostudio.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>© 2025 Ethos Studio. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>Made with intention.</p>
        </div>
      </div>
    </footer>
  );
}
