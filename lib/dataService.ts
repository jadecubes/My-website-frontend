import type { Post } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type FetchOpts = { signal?: AbortSignal };

export async function fetchPosts(tag?: string, opts?: FetchOpts): Promise<Post[]> {
  const params = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const res = await fetch(`${API_URL}/api/posts${params}`, {
    next: { revalidate: 60 },
    signal: opts?.signal,
  });
  if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`);
  return res.json();
}

export function getPostCoverImage(post: Post): string | null {
  return post.media?.find(m => m.collection_name === 'cover')?.original_url ?? null;
}
