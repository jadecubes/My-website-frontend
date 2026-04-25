import type { PaginatedResponse, Project } from '@/types';
import { API_URL, type FetchOpts } from './_internal';

export const projects = {
  async list(category?: string, opts?: FetchOpts): Promise<PaginatedResponse<Project>> {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_URL}/api/projects${params}`, {
      next: { revalidate: 60 },
      signal: opts?.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);
    return res.json();
  },

  async get(slug: string, opts?: FetchOpts): Promise<Project> {
    const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
      signal: opts?.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch project (${res.status})`);
    return res.json();
  },

  coverImage(project: Project): string | null {
    return project.media?.find(m => m.collection_name === 'cover')?.original_url ?? null;
  },

  galleryImages(project: Project) {
    return project.media?.filter(m => m.collection_name === 'gallery') ?? [];
  },
};
