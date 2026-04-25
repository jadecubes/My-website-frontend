'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { fetchNavLinks } from '@/lib/api';
import type { NavLink as NavLinkType } from '@/types';

export function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLinkType[] | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const controller = new AbortController();
    fetchNavLinks({ signal: controller.signal })
      .then(links => setNavLinks(links))
      .catch(err => {
        if (err?.name !== 'AbortError') {
          // eslint-disable-next-line no-console
          console.error('Failed to load nav links', err);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl tracking-wide"
            style={{ color: 'var(--fg)', fontStyle: 'italic', letterSpacing: '0.04em' }}
          >
            Ethos Studio
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks?.map(link => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className="link-muted text-sm font-sans tracking-widest uppercase"
                  style={{
                    letterSpacing: '0.1em',
                    fontWeight: isActive ? 500 : 300,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ color: 'var(--fg-2)', border: '1px solid var(--line)' }}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggle} aria-label="Toggle theme" style={{ color: 'var(--fg-2)' }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" style={{ color: 'var(--fg)' }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-16 md:hidden" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="flex flex-col px-8 pt-10 gap-8">
            {navLinks?.map(link => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-3xl text-left"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--fg)', fontStyle: 'italic' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
