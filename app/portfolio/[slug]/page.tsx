import { projects } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await projects.get(slug);
    const cover = projects.coverImage(project);
    return {
      title: `${project.title} — Ethos Studio`,
      description: project.description ?? undefined,
      openGraph: {
        title: project.title,
        description: project.description ?? undefined,
        images: cover ? [cover] : [],
      },
    };
  } catch {
    return { title: 'Project — Ethos Studio' };
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project;
  try {
    project = await projects.get(slug);
  } catch {
    notFound();
  }

  const cover = projects.coverImage(project);
  const gallery = projects.galleryImages(project);

  return (
    <div className="page-enter pt-32">
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="mb-10">
          <Link
            href="/portfolio"
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--fg-3)', letterSpacing: '0.1em' }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--fg)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--fg-3)')}
          >
            ← Back to portfolio
          </Link>
        </div>

        {project.category && (
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}>
            {project.category.name}
          </p>
        )}

        <h1
          className="font-serif text-5xl sm:text-6xl mb-8"
          style={{ color: 'var(--fg)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: '1.05' }}
        >
          {project.title}
        </h1>

        {project.description && (
          <p className="text-base max-w-2xl mb-12" style={{ color: 'var(--fg-2)', lineHeight: '1.85' }}>
            {project.description}
          </p>
        )}

        {cover && (
          <div className="img-zoom-container rounded-sm mb-8" style={{ maxHeight: '680px' }}>
            <img
              src={cover}
              alt={project.title}
              className="img-zoom w-full object-cover"
              style={{ maxHeight: '680px' }}
            />
          </div>
        )}

        {gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {gallery.map(image => (
              <div key={image.id} className="img-zoom-container rounded-sm">
                <img
                  src={image.original_url}
                  alt={project.title}
                  loading="lazy"
                  className="img-zoom w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
