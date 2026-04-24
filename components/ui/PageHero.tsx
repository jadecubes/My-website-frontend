'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface PageHeroProps {
  label: string;
  /**
   * ReactNode so callers can pass either `"Portfolio"` or styled JSX
   * (e.g. `<>Making things<br /><span className="italic">with intention.</span></>`).
   */
  title: ReactNode;
  description: string;
  imageUrl: string;
  imagePosition?: string;
  onScrollDown?: () => void;
}

export function PageHero({
  label,
  title,
  description,
  imageUrl,
  imagePosition = 'center 40%',
  onScrollDown,
}: PageHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    const done = () => { if (!cancelled) setLoaded(true); };
    img.onload = done;
    // Fail graceful so the UI isn't stuck at opacity 0 if the pre-load errors.
    img.onerror = done;
    img.src = imageUrl;
    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  const handleScroll = () => {
    if (onScrollDown) {
      onScrollDown();
      return;
    }
    const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: 'smooth' });
  };

  const parallaxOffset = scrollY * 0.38;

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: imagePosition,
          transform: `translateY(${parallaxOffset}px) scale(1.12)`,
          transformOrigin: 'center top',
          opacity: loaded ? 1 : 0,
          transition: loaded ? 'opacity 1.2s ease' : 'none',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end pb-16 sm:pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16">
          <p
            className="text-xs uppercase tracking-[0.22em] mb-5 animate-fade-up"
            style={{ color: 'rgba(255,255,255,0.5)', animationDelay: '0.2s', opacity: 0 }}
          >
            {label}
          </p>

          <h1
            className="font-serif leading-none mb-7 animate-fade-up"
            style={{
              color: '#f5f1ea',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
              animationDelay: '0.35s',
              opacity: 0,
            }}
          >
            {title}
          </h1>

          <p
            className="animate-fade-up"
            style={{
              color: 'rgba(245,241,234,0.6)',
              lineHeight: '1.9',
              maxWidth: '520px',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              animationDelay: '0.55s',
              opacity: 0,
            }}
          >
            {description}
          </p>

          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: '0.75s', opacity: 0 }}
          >
            <button
              type="button"
              onClick={handleScroll}
              className="scroll-hint group inline-flex items-center gap-3"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span
                className="inline-block h-px transition-all duration-500 group-hover:w-12"
                style={{ backgroundColor: 'currentColor', width: '24px' }}
              />
              <span className="tracking-[0.18em] uppercase text-xs">Scroll to explore</span>
              <ArrowDown
                size={13}
                className="transition-transform duration-500 group-hover:translate-y-1"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  );
}
