'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { PageHero } from '@/components/ui/PageHero';
import { fetchProjects } from '@/lib/api';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Project } from '@/types';

const LATEST_COUNT = 6;

export function HomeClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const gridRef = useScrollAnimation();
  const latestRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ac = new AbortController();
    fetchProjects(undefined, { signal: ac.signal })
      .then(res => {
        if (ac.signal.aborted) return;
        setProjects(res.data.slice(0, LATEST_COUNT));
        setLoading(false);
      })
      .catch(err => {
        if (ac.signal.aborted || err?.name === 'AbortError') return;
        console.error('fetchProjects failed', err);
        setError(true);
        setLoading(false);
      });
    return () => ac.abort();
  }, []);

  const scrollToLatest = () => {
    latestRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <PageHero
        label="Studio"
        title={
          <>
            Making things
            <br />
            <span style={{ fontStyle: 'italic', color: '#d4a96a' }}>with intention.</span>
          </>
        }
        description="A small graphic-design studio working on posters, banners, infographics, and product visuals — always with care for the work and the people behind it."
        imageUrl="https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imagePosition="center 30%"
        onScrollDown={scrollToLatest}
      />

      <section ref={latestRef} className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              className="font-serif text-4xl mb-2"
              style={{ color: 'var(--fg)', fontWeight: 300 }}
            >
              Latest work
            </h2>
            <p className="text-sm" style={{ color: 'var(--fg-3)' }}>
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
          <Link
            href="/portfolio"
            className="link-muted text-xs uppercase tracking-widest self-start sm:self-end"
            style={{ letterSpacing: '0.15em' }}
          >
            View all →
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: LATEST_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm animate-pulse"
                  style={{ height: 280, backgroundColor: 'var(--bg-subtle)' }}
                />
              ))
            : projects.map((project, i) => (
                <div
                  key={project.id}
                  className="reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <PortfolioCard project={project} featured={i === 0} />
                </div>
              ))}
        </div>

        {!loading && error && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl" style={{ color: 'var(--fg-3)', fontStyle: 'italic' }}>
              Couldn&apos;t load latest work right now.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl" style={{ color: 'var(--fg-3)', fontStyle: 'italic' }}>
              Nothing here yet.
            </p>
          </div>
        )}
      </section>

      <section
        className="py-24"
        style={{ backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--line)' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}>
              Explore
            </p>
            <h2 className="font-serif text-5xl mb-6" style={{ color: 'var(--fg)', fontWeight: 300, lineHeight: '1.1' }}>
              Categories
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {[
                { label: 'Artworks', desc: 'Visual work — paintings, drawings, and digital experiments.' },
                { label: 'Projects', desc: 'Software — tools, experiments, and things I built.' },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex-1 p-6 rounded-sm card-lift cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--fg)', fontWeight: 400 }}>
                    {item.label}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--fg-2)', lineHeight: '1.7' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
