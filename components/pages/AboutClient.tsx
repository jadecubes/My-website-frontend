'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const skills = [
  { category: 'Design', items: ['Poster design', 'Banner design', 'Infographic design', 'Product design', 'Typography'] },
  { category: 'Tools', items: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'] },
  { category: 'Process', items: ['Concept', 'Prepare', 'Retouch', 'Finalise'] },
];

export function AboutClient() {
  const sectionRef = useScrollAnimation();
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <PageHero
        label="About"
        title={
          <>
            Hello,
            <br />
            <span style={{ fontStyle: 'italic' }}>I design things.</span>
          </>
        }
        description="Ethos Studio is a graphic design practice focused on creating visual work that communicates clearly and looks beautiful."
        imageUrl="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imagePosition="center 25%"
        onScrollDown={scrollToContent}
      />

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div>
            <div className="space-y-5 text-base" style={{ color: 'var(--fg-2)', lineHeight: '1.85' }}>
              <p>
                Ethos Studio is a graphic design practice focused on creating visual work that communicates clearly and looks beautiful. From posters to product packaging, every piece is made with intention.
              </p>
              <p>
                The work spans print and digital — posters, banners, flyers, infographics, and product appearance design. Each project begins with understanding what needs to be said, then finding the most direct and beautiful way to say it.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-sm"
                style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)', letterSpacing: '0.06em' }}
              >
                Get in touch
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-sm"
                style={{ border: '1px solid var(--line)', color: 'var(--fg-2)', letterSpacing: '0.06em' }}
              >
                View portfolio
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="img-zoom-container rounded-sm" style={{ height: '520px' }}>
              <img
                src="https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Studio"
                className="img-zoom w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-sm hidden lg:block"
              style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--line)' }}
            />
          </div>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          {skills.map((group, i) => (
            <div key={group.category} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}>
                {group.category}
              </p>
              <ul className="space-y-2">
                {group.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--fg-2)' }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--line)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="py-16 my-16 rounded-sm px-8 sm:px-12"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--line)' }}
        >
          <p className="font-serif text-3xl sm:text-4xl leading-snug max-w-2xl" style={{ color: 'var(--fg)', fontWeight: 300 }}>
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>&ldquo;</span>
            Good design is not about decoration. It is about finding the clearest, most beautiful way to communicate an idea.
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>&rdquo;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
