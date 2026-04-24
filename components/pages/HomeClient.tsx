'use client';

import { useEffect, useRef, useState } from 'react';
import { PostCard } from '@/components/ui/PostCard';
import { TagFilter } from '@/components/ui/TagFilter';
import { PageHero } from '@/components/ui/PageHero';
import { fetchPosts } from '@/lib/dataService';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Post } from '@/types';

const heroTags = ['abstract', 'minimalism', 'design', 'code', 'painting', 'typography'];

export function HomeClient() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useScrollAnimation();
  const postsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ac = new AbortController();
    fetchPosts(undefined, { signal: ac.signal })
      .then(data => {
        if (ac.signal.aborted) return;
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        if (ac.signal.aborted || err?.name === 'AbortError') return;
        console.error('fetchPosts failed', err);
        setLoading(false);
      });
    return () => ac.abort();
  }, []);

  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts;

  return (
    <div>
      <PageHero
        label="Art & Code"
        title={
          <>
            Making things
            <br />
            <span style={{ fontStyle: 'italic', color: '#d4a96a' }}>with intention.</span>
          </>
        }
        description="A journal at the intersection of visual art and software craft. Notes on process, experiments in form, and occasional meditations on why any of it matters."
        imageUrl="https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imagePosition="center 30%"
        onScrollDown={scrollToPosts}
      />

      <section ref={postsRef} className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              className="font-serif text-4xl mb-2"
              style={{ color: 'var(--fg)', fontWeight: 300 }}
            >
              Latest
            </h2>
            <p className="text-sm" style={{ color: 'var(--fg-3)' }}>
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
        </div>

        <div className="mb-10">
          <TagFilter tags={heroTags} activeTag={activeTag} onSelect={setActiveTag} />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm animate-pulse"
                  style={{ height: 280, backgroundColor: 'var(--bg-subtle)' }}
                />
              ))
            : filtered.map((post, i) => (
                <div
                  key={post.id}
                  className="reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <PostCard post={post} featured={i === 0 && !activeTag} />
                </div>
              ))}
        </div>

        {!loading && filtered.length === 0 && (
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
