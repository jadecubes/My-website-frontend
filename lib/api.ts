import type { PaginatedResponse, Project, Service } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type FetchOpts = { signal?: AbortSignal };

export async function fetchProjects(
  category?: string,
  opts?: FetchOpts,
): Promise<PaginatedResponse<Project>> {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${API_URL}/api/projects${params}`, {
    next: { revalidate: 60 },
    signal: opts?.signal,
  });
  if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);
  return res.json();
}

export async function fetchProject(slug: string, opts?: FetchOpts): Promise<Project> {
  const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
    signal: opts?.signal,
  });
  if (!res.ok) throw new Error(`Failed to fetch project (${res.status})`);
  return res.json();
}

export async function fetchServices(opts?: FetchOpts): Promise<Service[]> {
  const res = await fetch(`${API_URL}/api/services`, {
    next: { revalidate: 3600 },
    signal: opts?.signal,
  });
  if (!res.ok) throw new Error(`Failed to fetch services (${res.status})`);
  return res.json();
}

export async function sendContactMessage(
  data: { name: string; email: string; subject?: string; body: string },
  opts?: FetchOpts,
) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: opts?.signal,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Failed to send message (${res.status}): ${body}`);
  }
  return res.json();
}

export function getCoverImage(project: Project): string | null {
  return project.media?.find(m => m.collection_name === 'cover')?.original_url ?? null;
}

export function getGalleryImages(project: Project) {
  return project.media?.filter(m => m.collection_name === 'gallery') ?? [];
}
