'use client';

import Link from 'next/link';
import type { Project } from '@/types';
import { projects } from '@/lib/api';

interface PortfolioCardProps {
  project: Project;
  featured?: boolean;
}

export function PortfolioCard({ project, featured = false }: PortfolioCardProps) {
  const cover = projects.coverImage(project);

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <article
        className="card-lift rounded-sm overflow-hidden cursor-pointer"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div className={`img-zoom-container ${featured ? 'h-80 md:h-96' : 'h-56 sm:h-64'}`}>
          {cover ? (
            <img
              src={cover}
              alt={project.title}
              loading="lazy"
              className="img-zoom w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-subtle)' }}
            >
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--fg-3)' }}>
                No image
              </span>
            </div>
          )}
          <div className="img-overlay" />
          {project.category && (
            <div className="absolute bottom-4 left-4 z-10">
              <span
                className="text-xs px-2 py-0.5 rounded-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {project.category.name}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h2
            className={`font-serif mb-2 leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
            style={{ color: 'var(--fg)', fontWeight: 400 }}
          >
            {project.title}
          </h2>
          {project.description && (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-2)', lineHeight: '1.75' }}>
              {project.description}
            </p>
          )}
          <div className="mt-5 flex items-center gap-2">
            <span className="text-xs font-sans tracking-widest uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
              View project
            </span>
            <span className="text-xs" style={{ color: 'var(--accent)' }}>→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
