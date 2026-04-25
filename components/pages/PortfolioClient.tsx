'use client';

import { useEffect, useRef, useState } from 'react';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { TagFilter } from '@/components/ui/TagFilter';
import { PageHero } from '@/components/ui/PageHero';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { projects as projectsApi } from '@/lib/api';
import type { Project } from '@/types';

const categories = ['Poster', 'Banner', 'Flyer', 'Infographic', 'Product'];
const categorySlugs = new Set(categories.map(c => c.toLowerCase()));

export function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const gridRef = useScrollAnimation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only forward the category to the API if it matches a known slug.
    // Prevents arbitrary user-influenced strings reaching the backend
    // (defense in depth — the backend still validates, but this keeps
    // the URL clean and avoids useless round trips).
    const slug = activeCategory?.toLowerCase();
    const safeSlug = slug && categorySlugs.has(slug) ? slug : undefined;

    const ac = new AbortController();
    setLoading(true);
    setError(false);

    projectsApi.list(safeSlug, { signal: ac.signal })
      .then(data => {
        if (ac.signal.aborted) return;
        setProjects(data.data);
        setLoading(false);
      })
      .catch(err => {
        if (ac.signal.aborted || err?.name === 'AbortError') return;
        console.error('projects.list failed', err);
        setError(true);
        setLoading(false);
      });

    return () => ac.abort();
  }, [activeCategory]);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <PageHero
        label="Work"
        title="Portfolio"
        description="A collection of graphic design work — posters, banners, infographics, and product visuals."
        imageUrl="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imagePosition="center 35%"
        onScrollDown={scrollToContent}
      />

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="mb-10">
          <TagFilter tags={categories} activeTag={activeCategory} onSelect={setActiveCategory} />
        </div>

        <div className="mb-6">
          <p className="text-xs" style={{ color: 'var(--fg-3)' }}>
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-sm animate-pulse" style={{ height: 280, backgroundColor: 'var(--bg-subtle)' }} />
              ))
            : projects.map((project, i) => {
                const isFeatured = i === 0 && !activeCategory;
                return (
                  <div
                    key={project.id}
                    className={`reveal ${isFeatured ? 'sm:col-span-2' : ''}`}
                    style={{ transitionDelay: `${i * 0.07}s` }}
                  >
                    <PortfolioCard project={project} featured={isFeatured} />
                  </div>
                );
              })}
        </div>

        {!loading && error && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl" style={{ color: 'var(--fg-3)', fontStyle: 'italic' }}>
              Could not load projects. Please try again later.
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
      </div>
    </div>
  );
}
