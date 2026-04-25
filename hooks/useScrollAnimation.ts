'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    const observed = new WeakSet<Element>();
    const observeReveals = () => {
      el.querySelectorAll('.reveal').forEach(item => {
        if (!observed.has(item)) {
          observed.add(item);
          io.observe(item);
        }
      });
    };

    observeReveals();

    // .reveal children may be added asynchronously (e.g. after a fetch
    // resolves). Without a MutationObserver, late-added elements never get
    // the visible class and remain at opacity 0 forever.
    const mo = new MutationObserver(observeReveals);
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return ref;
}
